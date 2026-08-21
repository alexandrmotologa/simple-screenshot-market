import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";
import net from "net";
import { checkRateLimit, getClientIp } from "@/lib/rateLimiter";

export const runtime = "nodejs";
export const maxDuration = 15;

interface ScrapedAppData {
  name: string;
  description: string;
  category: string;
  rating?: string;
  reviewCount?: string;
  developer?: string;
  error?: string;
}

function extractMeta(html: string, property: string): string {
  const og = html.match(new RegExp(`<meta[^>]+property=["']og:${property}["'][^>]+content=["']([^"']+)["']`, "i"));
  if (og) return og[1];
  const name = html.match(new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"));
  return name ? name[1] : "";
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : "";
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, " ");
}

/**
 * Validates whether an IP address is private, loopback, link-local, or cloud metadata.
 */
function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4) return true;

    // 0.0.0.0/8
    if (parts[0] === 0) return true;
    // 10.0.0.0/8
    if (parts[0] === 10) return true;
    // 127.0.0.0/8 (Loopback)
    if (parts[0] === 127) return true;
    // 169.254.0.0/16 (Link-local & AWS/GCP metadata)
    if (parts[0] === 169 && parts[1] === 254) return true;
    // 172.16.0.0/12
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    // 192.168.0.0/16
    if (parts[0] === 192 && parts[1] === 168) return true;
    // 100.64.0.0/10 (Carrier-grade NAT)
    if (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) return true;
    // Broadcast / Multicast
    if (parts[0] >= 224) return true;

    return false;
  }

  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    // Loopback ::1
    if (normalized === "::1" || normalized === "0:0:0:0:0:0:0:1") return true;
    // Unspecified ::
    if (normalized === "::") return true;
    // Unique local address fc00::/7
    if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
    // Link local fe80::/10
    if (normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb")) return true;
    // IPv4 mapped IPv6 (::ffff:127.0.0.1, etc.)
    if (normalized.startsWith("::ffff:")) {
      const v4Part = normalized.substring(7);
      return isPrivateIp(v4Part);
    }
    return false;
  }

  return true;
}

/**
 * Validates hostname against private/internal domains and resolves DNS to prevent SSRF and DNS rebinding.
 */
async function validateTargetUrl(urlStr: string): Promise<{ valid: boolean; reason?: string }> {
  try {
    const parsed = new URL(urlStr);

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return { valid: false, reason: "Only HTTP and HTTPS protocols are permitted." };
    }

    const hostname = parsed.hostname.toLowerCase().trim();

    // Basic domain blacklist
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".arpa") ||
      hostname.endsWith(".invalid") ||
      hostname.endsWith(".onion") ||
      hostname === "metadata.google.internal" ||
      hostname === "instance-data"
    ) {
      return { valid: false, reason: "Target hostname is restricted." };
    }

    // If hostname is directly an IP
    if (net.isIP(hostname)) {
      if (isPrivateIp(hostname)) {
        return { valid: false, reason: "Private or internal IP addresses are prohibited." };
      }
      return { valid: true };
    }

    // Resolve DNS to verify destination IP
    try {
      const lookupResult = await dns.lookup(hostname, { all: true });
      for (const entry of lookupResult) {
        if (isPrivateIp(entry.address)) {
          return { valid: false, reason: `Resolved IP address ${entry.address} is forbidden.` };
        }
      }
    } catch {
      return { valid: false, reason: "Could not resolve target hostname." };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: "Malformed URL provided." };
  }
}

async function scrapeAppStore(url: string): Promise<ScrapedAppData> {
  const appIdMatch = url.match(/\/id(\d+)/);
  if (appIdMatch) {
    const apiUrl = `https://itunes.apple.com/lookup?id=${appIdMatch[1]}&entity=software`;
    try {
      const res = await fetch(apiUrl, {
        headers: { "User-Agent": "SnapFrame/1.0" },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const json = (await res.json()) as {
          resultCount: number;
          results: Array<{
            trackName: string;
            description: string;
            primaryGenreName: string;
            averageUserRating: number;
            userRatingCount: number;
            artistName: string;
          }>;
        };
        if (json.resultCount > 0) {
          const app = json.results[0];
          return {
            name: app.trackName ?? "",
            description: decodeHtml(app.description ?? "").slice(0, 600),
            category: app.primaryGenreName ?? "",
            rating: app.averageUserRating?.toFixed(1),
            reviewCount: app.userRatingCount?.toLocaleString(),
            developer: app.artistName ?? "",
          };
        }
      }
    } catch {
      /* fallthrough */
    }
  }

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (SnapFrame Scraper)" },
    signal: AbortSignal.timeout(8000),
  });
  const html = await res.text();
  return {
    name: extractMeta(html, "title") || extractTitle(html),
    description: decodeHtml(stripHtml(extractMeta(html, "description"))).slice(0, 600),
    category: "",
  };
}

async function scrapeGooglePlay(url: string): Promise<ScrapedAppData> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept-Language": "en-US",
    },
    signal: AbortSignal.timeout(8000),
  });
  const html = await res.text();
  const nameMatch =
    html.match(/"name":"([^"]{3,60})"/) ||
    html.match(/<h1[^>]*><span[^>]*>([^<]+)<\/span>/i);
  const name = nameMatch ? decodeHtml(nameMatch[1]) : extractMeta(html, "title");
  const ratingMatch = html.match(/"starRating":"([\d.]+)"/);
  const ratingCountMatch = html.match(/"ratingCount":"(\d+)"/);
  return {
    name,
    description: decodeHtml(stripHtml(extractMeta(html, "description"))).slice(0, 600),
    category: "",
    rating: ratingMatch ? ratingMatch[1] : undefined,
    reviewCount: ratingCountMatch ? parseInt(ratingCountMatch[1], 10).toLocaleString() : undefined,
  };
}

async function scrapeWebsite(url: string): Promise<ScrapedAppData> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SnapFrame/1.0)" },
    signal: AbortSignal.timeout(8000),
  });
  const html = await res.text();
  return {
    name: decodeHtml(extractMeta(html, "title") || extractTitle(html)),
    description: decodeHtml(stripHtml(extractMeta(html, "description"))).slice(0, 600),
    category: extractMeta(html, "application-name") || "",
  };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`scrape:${ip}`, { limit: 15, windowMs: 60000, keyPrefix: "scrape" });
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many scrape requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as { url?: string };
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "A valid URL string is required" }, { status: 400 });
    }

    const validation = await validateTargetUrl(url);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.reason || "Access to requested host is forbidden." },
        { status: 403 }
      );
    }

    let data: ScrapedAppData;
    if (url.includes("apps.apple.com") || url.includes("itunes.apple.com")) {
      data = await scrapeAppStore(url);
    } else if (url.includes("play.google.com")) {
      data = await scrapeGooglePlay(url);
    } else {
      data = await scrapeWebsite(url);
    }

    return NextResponse.json(data);
  } catch (e: unknown) {
    const err = e as Error;
    console.error("[ScrapeApp API] Error:", err.message);
    return NextResponse.json({ error: "Failed to scrape target application URL" }, { status: 500 });
  }
}
