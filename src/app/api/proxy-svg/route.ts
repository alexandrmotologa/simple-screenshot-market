import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimiter";

const ALLOWED_HOSTS = new Set([
  "api.iconify.design",
  "cdn.simpleicons.org",
  "api.dicebear.com",
  "flagcdn.com",
  "raw.githubusercontent.com",
  "icongr.am",
]);

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`proxy-svg:${ip}`, { limit: 120, windowMs: 60000, keyPrefix: "svg" });
  if (!rateLimit.success) {
    return new NextResponse("Too many proxy requests", { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const parsed = new URL(targetUrl);

    if (parsed.protocol !== "https:") {
      return new NextResponse("Only HTTPS resources are supported", { status: 400 });
    }

    const host = parsed.hostname.toLowerCase();
    const isExactMatch = ALLOWED_HOSTS.has(host);
    const isSubdomainMatch = Array.from(ALLOWED_HOSTS).some(
      (allowed) => host.endsWith("." + allowed) && !host.includes("..")
    );

    if (!isExactMatch && !isSubdomainMatch) {
      return new NextResponse("Host not allowed", { status: 403 });
    }

    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "SnapFrame-App/1.0",
        Accept: "image/svg+xml, image/*, */*",
      },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      return new NextResponse("Upstream resource fetch failed", { status: res.status });
    }

    const rawContentType = res.headers.get("content-type") || "image/svg+xml";
    // Sanitize content-type to image only
    const contentType = rawContentType.includes("svg")
      ? "image/svg+xml"
      : rawContentType.startsWith("image/")
      ? rawContentType
      : "image/svg+xml";

    const body = await res.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.warn("[Proxy SVG] Error:", error.message);
    return new NextResponse("Proxy request failed", { status: 500 });
  }
}
