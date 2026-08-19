import { NextRequest, NextResponse } from "next/server";
import { runAIWithFallbacks, trimToLimit } from "@/lib/ai/aiService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      texts, // Array of strings or object map
      targetLang, // e.g. "ro", "es", "de", "fr", "ja"
      maxLength = 40,
      context = "App Store screenshot marketing captions",
      clientKeys,
    } = body;

    if (!texts || (Array.isArray(texts) && texts.length === 0)) {
      return NextResponse.json({ error: "Texts are required" }, { status: 400 });
    }

    const isArray = Array.isArray(texts);
    const textList = isArray ? texts : Object.values(texts);

    const prompt = `You are a native copywriter and localization expert for mobile apps.
Translate and culturally adapt the following marketing texts into native, natural, high-converting ${targetLang}.
Context: ${context}.

CRITICAL INSTRUCTIONS:
- Do NOT translate literally word-by-word. Adapt idioms, marketing hooks, and phrasing so it feels natively written in ${targetLang}.
- STRICT LENGTH CONSTRAINT: Each translated text MUST NOT exceed ${maxLength} characters. If the direct translation in ${targetLang} is too long (e.g. in German or French), rewrite and condense it creatively to fit strictly under ${maxLength} characters!

Input texts:
${JSON.stringify(textList, null, 2)}

Return a JSON object with:
{
  "translations": [
    "translated string 1 under ${maxLength} chars",
    "translated string 2 under ${maxLength} chars"
  ]
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

    let finalTranslations: string[] = (parsed.translations || []).map((t: string) => trimToLimit(t, maxLength));

    // Fallback if array length mismatch
    if (finalTranslations.length !== textList.length) {
      finalTranslations = textList.map((t, idx) => finalTranslations[idx] || t);
    }

    let result: any = finalTranslations;
    if (!isArray && typeof texts === "object") {
      const keys = Object.keys(texts);
      const mapped: Record<string, string> = {};
      keys.forEach((k, i) => {
        mapped[k] = finalTranslations[i] || texts[k];
      });
      result = mapped;
    }

    return NextResponse.json({ success: true, translations: result });
  } catch (error: any) {
    console.error("AI Translation error:", error);
    return NextResponse.json({ error: error.message || "Failed to translate texts" }, { status: 500 });
  }
}
