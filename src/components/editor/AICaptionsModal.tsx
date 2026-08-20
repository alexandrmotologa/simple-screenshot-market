"use client";

import { useState } from "react";
import { Sparkles, X, Loader2, CheckCircle2, Globe, AlertCircle, Link2, Search, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/lib/store/editorStore";
import { useLanguageStore, getLang } from "@/lib/store/languageStore";
import { useAuthStore } from "@/lib/store/authStore";
import { TextLayer } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── AI Provider with secure server fallback chain ─────────────────────────────
async function translateTexts(
  texts: string[],
  targetLang: string,
  mistralKey?: string,
  googleKey?: string
): Promise<string[]> {
  try {
    const res = await fetch("/api/ai/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        texts,
        targetLang,
        maxLength: 35,
        clientKeys: {
          gemini: googleKey || undefined,
          mistral: mistralKey || undefined,
        },
      }),
    });
    const data = await res.json();
    if (res.ok && data.translations && Array.isArray(data.translations)) {
      return data.translations;
    }
  } catch (e) {
    console.warn("AI translation error:", e);
  }
  return texts;
}

// ─── Component ─────────────────────────────────────────────────────────────────

interface AICaptionsModalProps {
  onClose: () => void;
}

export function AICaptionsModal({ onClose }: AICaptionsModalProps) {
  const { getActiveSet, getActiveScreen, updateLayerLocalization } = useEditorStore();
  const { projectLanguages } = useLanguageStore();
  const { user, setAuthModalOpen } = useAuthStore();
  const isGuest = Boolean(user && user.isAnonymous);

  const [mistralKey, setMistralKey] = useState(
    typeof window !== "undefined" ? (localStorage.getItem("snapframe_mistral_key") ?? "") : ""
  );
  const [googleKey, setGoogleKey] = useState(
    typeof window !== "undefined" ? (localStorage.getItem("snapframe_google_key") ?? "") : ""
  );
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(
    new Set(projectLanguages.filter((c) => c !== "en"))
  );
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [progress, setProgress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // URL scraping state
  const [activeTab, setActiveTab] = useState<"translate" | "scrape">("translate");
  const [appUrl, setAppUrl] = useState("");
  const [scrapeStatus, setScrapeStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [scrapedData, setScrapedData] = useState<{
    name: string; description: string; category: string;
    rating?: string; reviewCount?: string; developer?: string;
  } | null>(null);

  const nonEnglish = projectLanguages.filter((c) => c !== "en");
  const set = getActiveSet();
  const screen = getActiveScreen();
  const textLayers = (screen?.layers ?? []).filter(
    (l): l is TextLayer => l.type === "text"
  );

  const saveKeys = () => {
    if (mistralKey) localStorage.setItem("snapframe_mistral_key", mistralKey);
    if (googleKey) localStorage.setItem("snapframe_google_key", googleKey);
  };

  const handleGenerate = async () => {
    if (isGuest) {
      onClose();
      setAuthModalOpen(true);
      return;
    }
    if (!set || !screen || textLayers.length === 0) return;
    setStatus("loading");
    setErrorMsg("");
    saveKeys();

    const texts = textLayers.map((l) => l.content);
    const langs = Array.from(selectedLangs);

    try {
      for (const lang of langs) {
        const langInfo = getLang(lang);
        setProgress(`Translating to ${langInfo?.nativeName ?? lang}...`);
        const translated = await translateTexts(
          texts,
          langInfo?.name ?? lang,
          mistralKey || undefined,
          googleKey || undefined
        );
        translated.forEach((text, i) => {
          if (textLayers[i] && text) {
            updateLayerLocalization(set.id, screen.id, textLayers[i].id, lang, text);
          }
        });
      }
      setStatus("done");
    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
    }
  };

  // ── URL Scrape + AI Generate captions ────────────────────────────────────────
  const handleScrapeAndGenerate = async () => {
    if (isGuest) {
      onClose();
      setAuthModalOpen(true);
      return;
    }
    if (!appUrl.startsWith("http")) return;
    setScrapeStatus("loading");
    setScrapedData(null);
    try {
      const res = await fetch("/api/scrape-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: appUrl }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Scrape failed");
      setScrapedData(data);
      setScrapeStatus("done");
    } catch (e) {
      setScrapeStatus("error");
      setScrapedData(null);
      setErrorMsg(e instanceof Error ? e.message : "Scrape failed");
    }
  };

  const handleGenerateFromUrl = async () => {
    if (isGuest) {
      onClose();
      setAuthModalOpen(true);
      return;
    }
    if (!scrapedData || !set || !screen || textLayers.length === 0) return;
    setStatus("loading");
    setErrorMsg("");
    saveKeys();

    // Build a prompt that asks AI to write captions based on app metadata
    const systemContext = `App: "${scrapedData.name}"\nCategory: ${scrapedData.category}\nDescription: ${scrapedData.description}\nDeveloper: ${scrapedData.developer ?? ""}`;
    const texts = textLayers.map((l) => l.content);
    const langs = Array.from(selectedLangs).length > 0 ? Array.from(selectedLangs) : ["en"];

    const generateCaptionsPrompt = (lang: string) =>
      `You are a professional app store copywriter. Based on the app info below, rewrite the following UI screenshot texts to be compelling, concise, and relevant.\n${systemContext}\n\nTarget language: ${lang}\nExisting texts: ${JSON.stringify(texts)}\n\nReturn ONLY a JSON array of rewritten strings, same count, same order. No markdown, no explanations.`;

    try {
      for (const lang of langs) {
        const langInfo = getLang(lang);
        setProgress(`Generating captions for ${langInfo?.nativeName ?? lang}...`);
        const prompt = generateCaptionsPrompt(langInfo?.name ?? lang);

        let generated: string[] = texts;
        if (mistralKey) {
          try {
            const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${mistralKey}` },
              body: JSON.stringify({ model: "mistral-small-latest", messages: [{ role: "user", content: prompt }], temperature: 0.7, max_tokens: 1024 }),
            });
            const d = await res.json();
            const content = d.choices?.[0]?.message?.content ?? "[]";
            const match = content.match(/\[[\s\S]*\]/);
            generated = JSON.parse(match?.[0] ?? "[]");
          } catch { /* fallthrough to google */ }
        }
        if (generated === texts && googleKey) {
          try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleKey}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } }),
            });
            const d = await res.json();
            const content = d.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";
            const match = content.match(/\[[\s\S]*\]/);
            generated = JSON.parse(match?.[0] ?? "[]");
          } catch { /* no-op */ }
        }

        generated.forEach((text, i) => {
          if (textLayers[i] && text) {
            updateLayerLocalization(set.id, screen.id, textLayers[i].id, lang, text);
          }
        });
      }
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="font-semibold text-base">AI Captions</h2>
              <p className="text-xs text-muted-foreground">
                {activeTab === "translate" ? "Auto-translate text layers" : "Generate from App Store URL"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher & Content */}
        {isGuest ? (
          <div className="p-7 space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-foreground">Registered Feature Only</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                AI automated multi-language translation and App Store URL scraping are available for registered accounts. Sign in with Google or GitHub (100% Free) to unlock.
              </p>
            </div>
            <div className="flex gap-2.5 pt-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  setAuthModalOpen(true);
                }}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold gap-2 shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sign In (Free)</span>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex border-b border-border/40 px-6 gap-1">
              {(["translate", "scrape"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={cn(
                    "flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 -mb-px transition-all",
                    activeTab === t
                      ? "border-violet-500 text-violet-400"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t === "translate" ? <Globe className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                  {t === "translate" ? "Translate" : "From URL"}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* TAB: TRANSLATE */}
              {activeTab === "translate" && (
                <>
              {/* API Keys */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  API Keys (stored locally)
                </p>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Mistral API Key <span className="text-indigo-400">(recommended, fast)</span>
                    </label>
                    <input
                      type="password"
                      placeholder="sk-..."
                      value={mistralKey}
                      onChange={(e) => setMistralKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border/40 text-xs outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Google AI Studio Key <span className="text-green-400">(free, fallback)</span>
                    </label>
                    <input
                      type="password"
                      placeholder="AIza..."
                      value={googleKey}
                      onChange={(e) => setGoogleKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border/40 text-xs outline-none focus:border-green-500/50 transition-colors"
                    />
                  </div>
                </div>
                {!mistralKey && !googleKey && (
                  <p className="text-[11px] text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Without an API key, translations won&apos;t be generated automatically.
                  </p>
                )}
              </div>

              {/* Language selection */}
              {nonEnglish.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Target Languages
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {nonEnglish.map((code) => {
                      const lang = getLang(code);
                      const selected = selectedLangs.has(code);
                      return (
                        <button
                          key={code}
                          onClick={() => {
                            const next = new Set(selectedLangs);
                            selected ? next.delete(code) : next.add(code);
                            setSelectedLangs(next);
                          }}
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                            selected
                              ? "bg-violet-600 text-white ring-1 ring-violet-500"
                              : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span>{lang?.flag ?? "🌐"}</span>
                          <span>{lang?.nativeName ?? code}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-secondary/50 border border-border/40 text-xs text-muted-foreground">
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>Add target languages via the Language Bar above the canvas first.</span>
                </div>
              )}

              {/* Stats */}
              <div className="px-4 py-3 rounded-xl bg-secondary/50 border border-border/40 text-xs text-muted-foreground flex items-center justify-between">
                <span>{textLayers.length} text layers on this screen</span>
                <span>{selectedLangs.size} languages selected</span>
              </div>

              {/* Status */}
              {status === "loading" && (
                <div className="flex items-center gap-2 text-violet-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{progress}</span>
                </div>
              )}
              {status === "done" && (
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">Translations generated! Check Languages panel.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{errorMsg}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  {status === "done" ? "Close" : "Cancel"}
                </Button>
                <Button
                  className="flex-1 gap-2 bg-violet-600 hover:bg-violet-700 text-white"
                  onClick={handleGenerate}
                  disabled={status === "loading" || selectedLangs.size === 0 || textLayers.length === 0}
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate</>
                  )}
                </Button>
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* TAB: FROM URL                                                      */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "scrape" && (
            <>
              {/* API Keys (compact) */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  AI API Key (for caption generation)
                </p>
                <input
                  type="password"
                  placeholder="Mistral sk-... or Google AIza..."
                  value={mistralKey || googleKey}
                  onChange={(e) => setMistralKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border/40 text-xs outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" /> App URL
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://apps.apple.com/... or play.google.com/..."
                    value={appUrl}
                    onChange={(e) => setAppUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary/60 border border-border/40 text-xs outline-none focus:border-violet-500/50 transition-colors"
                  />
                  <button
                    onClick={handleScrapeAndGenerate}
                    disabled={!appUrl.startsWith("http") || scrapeStatus === "loading"}
                    className="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                  >
                    {scrapeStatus === "loading" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Search className="w-3.5 h-3.5" />
                    )}
                    Fetch
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Paste an App Store or Google Play URL. We&apos;ll extract the app name, description, and rating to generate better captions.
                </p>
              </div>

              {/* Scraped preview */}
              {scrapedData && (
                <div className="rounded-xl border border-border/50 bg-secondary/40 p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{scrapedData.name}</p>
                      {scrapedData.category && (
                        <p className="text-[11px] text-violet-400">{scrapedData.category}</p>
                      )}
                    </div>
                    {scrapedData.rating && (
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-amber-400">★ {scrapedData.rating}</p>
                        {scrapedData.reviewCount && (
                          <p className="text-[10px] text-muted-foreground">{scrapedData.reviewCount} reviews</p>
                        )}
                      </div>
                    )}
                  </div>
                  {scrapedData.description && (
                    <p className="text-[11px] text-muted-foreground line-clamp-3">{scrapedData.description}</p>
                  )}
                  {scrapedData.developer && (
                    <p className="text-[10px] text-muted-foreground">by {scrapedData.developer}</p>
                  )}
                </div>
              )}

              {scrapeStatus === "error" && (
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Language selection */}
              {nonEnglish.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Target Languages
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["en", ...nonEnglish].map((code) => {
                      const lang = getLang(code);
                      const selected = selectedLangs.has(code) || code === "en";
                      return (
                        <button
                          key={code}
                          onClick={() => {
                            if (code === "en") return;
                            const next = new Set(selectedLangs);
                            selected ? next.delete(code) : next.add(code);
                            setSelectedLangs(next);
                          }}
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                            selected || code === "en"
                              ? "bg-violet-600 text-white ring-1 ring-violet-500"
                              : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span>{lang?.flag ?? "🌐"}</span>
                          <span>{lang?.nativeName ?? code}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status */}
              {status === "loading" && (
                <div className="flex items-center gap-2 text-violet-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{progress}</span>
                </div>
              )}
              {status === "done" && (
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">Captions generated! Check Languages panel.</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  {status === "done" ? "Close" : "Cancel"}
                </Button>
                <Button
                  className="flex-1 gap-2 bg-violet-600 hover:bg-violet-700 text-white"
                  onClick={handleGenerateFromUrl}
                  disabled={!scrapedData || status === "loading" || textLayers.length === 0}
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate Captions</>
                  )}
                </Button>
              </div>
            </>
          )}

        </div>
        </>
      )}
      </div>
    </div>
  );
}
