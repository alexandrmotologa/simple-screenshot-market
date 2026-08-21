import { NextRequest, NextResponse } from "next/server";
import { authorizeAIRequest } from "@/lib/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, mode = "auto-cutout", tolerance = 25 } = body;

    const authCheck = await authorizeAIRequest(req);
    if (!authCheck.success) {
      return authCheck.response;
    }

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      mode,
      tolerance,
      message: "Ready for client-side high-precision transparent canvas extraction",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("AI Cutout Error:", err.message);
    return NextResponse.json({ error: "Failed to process cutout" }, { status: 500 });
  }
}
