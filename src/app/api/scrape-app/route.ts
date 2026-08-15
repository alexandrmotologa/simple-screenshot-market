import { NextRequest, NextResponse } from "next/server";

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

async function scrapeAppStore(url: string): Promise<ScrapedAppData> {
  const appIdMatch = url.match(/\/id(\d+)/);
  if (appIdMatch) {
    const apiUrl = `https://itunes.apple.com/lookup?id=${appIdMatch[1]}&entity=software`;
    try {
      const res = await fetch(apiUrl, { headers: { "User-Agent": "SnapFrame/1.0" } });
      if (res.ok) {
        const json = await res.json() as {
          resultCount: number;
          results: Array<{
            trackName: string; description: string; primaryGenreName: string;
            averageUserRating: number; userRatingCount: number; artistName: string;
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
    } catch { /* fallthrough */ }
  }
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  return {
    name: extractMeta(html, "title") || extractTitle(html),
    description: decodeHtml(stripHtml(extractMeta(html, "description"))).slice(0, 600),
    category: "",
  };
}

async function scrapeGooglePlay(url: string): Promise<ScrapedAppData> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "Accept-Language": "en-US" },
  });
  const html = await res.text();
  const nameMatch = html.match(/"name":"([^"]{3,60})"/) || html.match(/<h1[^>]*><span[^>]*>([^<]+)<\/span>/i);
  const name = nameMatch ? decodeHtml(nameMatch[1]) : extractMeta(html, "title");
  const ratingMatch = html.match(/"starRating":"([\d.]+)"/);
  const ratingCountMatch = html.match(/"ratingCount":"(\d+)"/);
  return {
    name,
    description: decodeHtml(stripHtml(extractMeta(html, "description"))).slice(0, 600),
    category: "",
    rating: ratingMatch ? ratingMatch[1] : undefined,
    reviewCount: ratingCountMatch ? parseInt(ratingCountMatch[1]).toLocaleString() : undefined,
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
    const body = await req.json() as { url: string };
    const { url } = body;
    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
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
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Scrape failed" }, { status: 500 });
  }
}
