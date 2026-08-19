// Server-side Unified AI Service with Multi-Provider Fallbacks
// Supports Google Gemini, OpenAI, Groq, and Mistral with automatic failover

export interface VisionScreenInput {
  index: number;
  base64OrUrl: string;
  name?: string;
}

export interface GeneratedScreenStory {
  index: number;
  headline: string;
  subcaption: string;
  detectedType: "hero" | "analytics" | "feature" | "darkmode" | "social" | "paywall" | "general";
  recommendedGradient: {
    stops: Array<{ color: string; position: number }>;
    direction: string;
  };
}

export interface StoreListingAIInput {
  appName: string;
  category?: string;
  nicheKeywords?: string;
  targetLang: string;
  screenHeadlines?: string[];
}

export interface StoreListingAIOutput {
  ios: {
    name: string; // <= 30 chars
    subtitle: string; // <= 30 chars
    promotionalText: string; // <= 170 chars
    keywords: string; // <= 100 chars
    description: string; // <= 4000 chars
    whatsNew: string; // <= 500 chars
  };
  android: {
    title: string; // <= 30 chars
    shortDescription: string; // <= 80 chars
    fullDescription: string; // <= 4000 chars
    whatsNew: string; // <= 500 chars
  };
}

// ─── HELPER: Enforce strict character limits ─────────────────────────────────
export function trimToLimit(text: string, maxLen: number): string {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return trimmed;
  // Try to cut at word boundary
  const sub = trimmed.slice(0, maxLen - 1);
  const lastSpace = sub.lastIndexOf(" ");
  if (lastSpace > maxLen * 0.7) {
    return sub.slice(0, lastSpace);
  }
  return sub;
}

// ─── API KEY RESOLUTION (env first, then optional client fallback) ───────────
export function getAIKeys(clientKeys?: { gemini?: string; openai?: string; mistral?: string; groq?: string }) {
  return {
    gemini: process.env.GEMINI_API_KEY || clientKeys?.gemini || "",
    openai: process.env.OPENAI_API_KEY || clientKeys?.openai || "",
    mistral: process.env.MISTRAL_API_KEY || clientKeys?.mistral || "",
    groq: process.env.GROQ_API_KEY || clientKeys?.groq || "",
  };
}

// ─── CALL GEMINI 1.5 / 2.0 FLASH ─────────────────────────────────────────────
export async function callGemini(
  prompt: string,
  apiKey: string,
  imagesBase64?: Array<{ mimeType: string; data: string }>,
  responseJson: boolean = true
): Promise<string> {
  const parts: any[] = [{ text: prompt }];

  if (imagesBase64 && imagesBase64.length > 0) {
    imagesBase64.forEach((img) => {
      parts.push({
        inlineData: {
          mimeType: img.mimeType || "image/png",
          data: img.data,
        },
      });
    });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 3000,
          responseMimeType: responseJson ? "application/json" : "text/plain",
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return text;
}

// ─── CALL OPENAI (GPT-4o / GPT-4o-mini) ──────────────────────────────────────
export async function callOpenAI(
  prompt: string,
  apiKey: string,
  imagesBase64?: Array<{ mimeType: string; data: string }>,
  responseJson: boolean = true
): Promise<string> {
  const content: any[] = [{ type: "text", text: prompt }];

  if (imagesBase64 && imagesBase64.length > 0) {
    imagesBase64.forEach((img) => {
      content.push({
        type: "image_url",
        image_url: {
          url: `data:${img.mimeType || "image/png"};base64,${img.data}`,
        },
      });
    });
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content }],
      temperature: 0.4,
      response_format: responseJson ? { type: "json_object" } : undefined,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

// ─── CALL GROQ (Llama 3.3 70B) ───────────────────────────────────────────────
export async function callGroq(prompt: string, apiKey: string, responseJson: boolean = true): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: responseJson ? { type: "json_object" } : undefined,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

// ─── CALL MISTRAL ────────────────────────────────────────────────────────────
export async function callMistral(prompt: string, apiKey: string, responseJson: boolean = true): Promise<string> {
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: responseJson ? { type: "json_object" } : undefined,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Mistral API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

// ─── UNIVERSAL RESILIENT AI RUNNER ──────────────────────────────────────────
export async function runAIWithFallbacks(
  prompt: string,
  clientKeys?: { gemini?: string; openai?: string; mistral?: string; groq?: string },
  imagesBase64?: Array<{ mimeType: string; data: string }>,
  responseJson: boolean = true
): Promise<string> {
  const keys = getAIKeys(clientKeys);
  const errors: string[] = [];

  // 1. Try Gemini (handles text and vision)
  if (keys.gemini) {
    try {
      return await callGemini(prompt, keys.gemini, imagesBase64, responseJson);
    } catch (e: any) {
      console.warn("Gemini AI attempt failed:", e.message);
      errors.push(`Gemini: ${e.message}`);
    }
  }

  // 2. Try OpenAI (handles text and vision)
  if (keys.openai) {
    try {
      return await callOpenAI(prompt, keys.openai, imagesBase64, responseJson);
    } catch (e: any) {
      console.warn("OpenAI attempt failed:", e.message);
      errors.push(`OpenAI: ${e.message}`);
    }
  }

  // 3. Try Groq (ultra fast text)
  if (keys.groq && (!imagesBase64 || imagesBase64.length === 0)) {
    try {
      return await callGroq(prompt, keys.groq, responseJson);
    } catch (e: any) {
      console.warn("Groq attempt failed:", e.message);
      errors.push(`Groq: ${e.message}`);
    }
  }

  // 4. Try Mistral
  if (keys.mistral && (!imagesBase64 || imagesBase64.length === 0)) {
    try {
      return await callMistral(prompt, keys.mistral, responseJson);
    } catch (e: any) {
      console.warn("Mistral attempt failed:", e.message);
      errors.push(`Mistral: ${e.message}`);
    }
  }

  throw new Error(`All AI providers failed or no API keys provided in .env.local. Errors: ${errors.join("; ")}`);
}
