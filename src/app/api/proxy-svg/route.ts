import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = [
  "api.iconify.design",
  "cdn.simpleicons.org",
  "api.dicebear.com",
  "flagcdn.com",
  "raw.githubusercontent.com",
  "icongr.am",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const parsed = new URL(targetUrl);
    const isAllowed = ALLOWED_HOSTS.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );

    if (!isAllowed) {
      return new NextResponse("Host not allowed", { status: 403 });
    }

    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "SnapFrame-App/1.0",
        Accept: "image/svg+xml, image/*, */*",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return new NextResponse("Upstream error: " + res.statusText, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/svg+xml";
    const body = await res.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    return new NextResponse("Proxy error: " + (err?.message || "Unknown error"), { status: 500 });
  }
}
