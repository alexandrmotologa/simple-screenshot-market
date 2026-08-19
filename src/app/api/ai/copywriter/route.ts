import { NextRequest, NextResponse } from "next/server";
import { runAIWithFallbacks, trimToLimit } from "@/lib/ai/aiService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      action = "rewrite", // rewrite, shorten, punchy, emojis, ideas
      tone = "high-energy", // high-energy, b2b, minimalist, fomo, benefit-driven
      maxLength = 30, // character limit
      language = "en",
      niche,
      clientKeys,
    } = body;

    if (!text && action !== "ideas") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    let prompt = "";

    if (action === "ideas") {
      prompt = `You are a high-conversion mobile app copywriter for Apple App Store and Google Play.
Generate 5 punchy headline options for a mobile app in the "${niche || "productivity / lifestyle"}" niche.
Each headline MUST be in ${language}, highly engaging, and STRICTLY under ${maxLength} characters.

Return JSON:
{
  "options": [
    "Headline 1",
    "Headline 2",
    "Headline 3",
    "Headline 4",
    "Headline 5"
  ]
}`;
    } else {
      prompt = `You are an expert App Store marketing copywriter.
Task: ${action} the following text: "${text}".
Tone: ${tone}.
Target Language: ${language}.
CRITICAL CONSTRAINT: The output MUST be strictly under ${maxLength} characters in length (no exceptions!).

Return JSON:
{
  "result": "the rewritten text under ${maxLength} chars",
  "variations": ["alt 1 under ${maxLength} chars", "alt 2 under ${maxLength} chars", "alt 3 under ${maxLength} chars"]
}`;
    }

    const rawResponse = await runAIWithFallbacks(prompt, clientKeys, undefined, true);
    
    let parsed: any;
    try {
      parsed = JSON.parse(rawResponse);
    } catch {
      const match = rawResponse.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse AI response as JSON");
      }
    }

    if (parsed.result) {
      parsed.result = trimToLimit(parsed.result, maxLength);
    }
    if (parsed.variations && Array.isArray(parsed.variations)) {
      parsed.variations = parsed.variations.map((v: string) => trimToLimit(v, maxLength));
    }
    if (parsed.options && Array.isArray(parsed.options)) {
      parsed.options = parsed.options.map((o: string) => trimToLimit(o, maxLength));
    }

    return NextResponse.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error("AI Copywriter error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate copy" }, { status: 500 });
  }
}
