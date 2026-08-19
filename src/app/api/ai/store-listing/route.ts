import { NextRequest, NextResponse } from "next/server";
import { runAIWithFallbacks, trimToLimit } from "@/lib/ai/aiService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      appName,
      category = "Productivity",
      nicheKeywords = "",
      targetLang = "en",
      screenHeadlines = [],
      clientKeys,
    } = body;

    const prompt = `You are a world-class App Store Optimization (ASO) specialist and copywriter.
Generate a complete, high-ranking, high-conversion App Store and Google Play store listing for the mobile app "${appName}".
Category: ${category}.
Niche / Key features: ${nicheKeywords || screenHeadlines.join(", ")}.
Target Language: ${targetLang} (Write naturally, natively and persuasively in this language).

CRITICAL APP STORE CONSTRAINTS (STRICT CHARACTER LIMITS):
- ios.name: Max 30 characters
- ios.subtitle: Max 30 characters
- ios.promotionalText: Max 170 characters
- ios.keywords: Max 100 characters (comma-separated high-volume keywords, no spaces after commas, e.g. "photos,mockup,editor,design,studio")
- ios.description: Max 4000 characters (Engaging markdown structure with emoji bullet points, feature breakdown, social proof)
- ios.whatsNew: Max 500 characters

CRITICAL GOOGLE PLAY CONSTRAINTS:
- android.title: Max 30 characters
- android.shortDescription: Max 80 characters
- android.fullDescription: Max 4000 characters
- android.whatsNew: Max 500 characters

Return a valid JSON object matching this structure:
{
  "ios": {
    "name": "...",
    "subtitle": "...",
    "promotionalText": "...",
    "keywords": "...",
    "description": "...",
    "whatsNew": "..."
  },
  "android": {
    "title": "...",
    "shortDescription": "...",
    "fullDescription": "...",
    "whatsNew": "..."
  }
}`;

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

    // Strictly enforce all store limits
    const safeOutput = {
      ios: {
        name: trimToLimit(parsed.ios?.name || appName, 30),
        subtitle: trimToLimit(parsed.ios?.subtitle || "Transform your app screenshots", 30),
        promotionalText: trimToLimit(parsed.ios?.promotionalText || `Get the latest version of ${appName}!`, 170),
        keywords: trimToLimit(parsed.ios?.keywords || "screenshots,mockup,appstore,editor", 100),
        description: trimToLimit(parsed.ios?.description || `${appName} helps you create stunning screenshots.`, 4000),
        whatsNew: trimToLimit(parsed.ios?.whatsNew || "Bug fixes and performance improvements.", 500),
      },
      android: {
        title: trimToLimit(parsed.android?.title || appName, 30),
        shortDescription: trimToLimit(parsed.android?.shortDescription || "Stunning App Store & Play Store screenshots", 80),
        fullDescription: trimToLimit(parsed.android?.fullDescription || `${appName} helps you create stunning screenshots.`, 4000),
        whatsNew: trimToLimit(parsed.android?.whatsNew || "Bug fixes and performance improvements.", 500),
      },
    };

    return NextResponse.json({ success: true, listing: safeOutput });
  } catch (error: any) {
    console.error("AI Store Listing error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate store listing" }, { status: 500 });
  }
}
