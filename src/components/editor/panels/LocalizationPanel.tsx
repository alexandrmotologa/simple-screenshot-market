"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useLanguageStore, getLang, SUPPORTED_LANGUAGES } from "@/lib/store/languageStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TextLayer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Globe, Sparkles, Copy, Check } from "lucide-react";

export function LocalizationPanel() {
  const { getActiveSet, getActiveScreen, updateLayerLocalization, clearLayerLocalization } =
    useEditorStore();
  const { projectLanguages, activeLang, setActiveLang } = useLanguageStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const set = getActiveSet();
  const screen = getActiveScreen();

  const textLayers = (screen?.layers ?? []).filter(
    (l): l is TextLayer => l.type === "text"
  );

  const nonEnglish = projectLanguages.filter((c) => c !== "en");

  if (!set || !screen) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground p-6 text-center">
        <Globe className="w-8 h-8 opacity-30" />
        <p className="text-sm">No screen selected</p>
      </div>
    );
  }

  if (textLayers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground p-6 text-center">
        <Globe className="w-8 h-8 opacity-30" />
        <p className="text-sm font-medium">No text layers found</p>
        <p className="text-xs">Add text layers to this screen first, then translate them here.</p>
      </div>
    );
  }

  if (nonEnglish.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground p-6 text-center">
        <Globe className="w-8 h-8 opacity-30" />
        <p className="text-sm font-medium">No languages added yet</p>
        <p className="text-xs">Use the language bar above to add languages to your project.</p>
      </div>
    );
  }

  const copyOriginalToAll = (layer: TextLayer) => {
    nonEnglish.forEach((lang) => {
      if (!screen.localizations?.[lang]?.[layer.id]?.content) {
        updateLayerLocalization(set.id, screen.id, layer.id, lang, layer.content);
      }
    });
    setCopiedId(layer.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Language tab switcher */}
      <div className="flex gap-1 px-3 pt-3 pb-2 shrink-0 overflow-x-auto scrollbar-none border-b border-border/30">
        {nonEnglish.map((code) => {
          const lang = getLang(code);
          return (
            <button
              key={code}
              type="button"
              onClick={() => setActiveLang(code)}
              className={cn(
                "shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all",
                activeLang === code
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <span>{lang?.flag}</span>
              <span className="uppercase">{code}</span>
            </button>
          );
        })}
      </div>

      {/* Text layer list */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {textLayers.map((layer) => {
            const currentLang = activeLang === "en" ? "en" : activeLang;
            const localized = currentLang !== "en"
              ? (screen.localizations?.[currentLang]?.[layer.id]?.content ?? "")
              : layer.content;

            const hasTranslation = currentLang !== "en" &&
              !!screen.localizations?.[currentLang]?.[layer.id]?.content;

            return (
              <div key={layer.id} className="space-y-1.5">
                {/* Layer label */}
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider truncate max-w-32">
                    {layer.content.split("\n")[0].substring(0, 20) || "Text layer"}
                  </p>
                  <div className="flex items-center gap-1">
                    {!hasTranslation && currentLang !== "en" && (
                      <span className="text-[9px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-1">
                        Missing
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => copyOriginalToAll(layer)}
                      title="Copy original to all languages"
                      className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {copiedId === layer.id
                        ? <Check className="w-3 h-3 text-green-400" />
                        : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* EN base (read-only reference) */}
                <div className="px-2.5 py-1.5 rounded-lg bg-secondary/30 border border-border/20 text-xs text-muted-foreground font-mono leading-relaxed">
                  🇺🇸 {layer.content || <em>empty</em>}
                </div>

                {/* Translation field */}
                {currentLang !== "en" && (
                  <div className="relative">
                    <textarea
                      rows={Math.min(4, (localized.split("\n").length || 1) + 1)}
                      value={localized}
                      placeholder={`Translate to ${getLang(currentLang)?.nativeName ?? currentLang}...`}
                      onChange={(e) =>
                        updateLayerLocalization(set.id, screen.id, layer.id, currentLang, e.target.value)
                      }
                      onFocus={(e) => {
                        if (!localized) e.target.value = layer.content;
                      }}
                      className={cn(
                        "w-full px-2.5 py-1.5 rounded-lg text-xs outline-none resize-none leading-relaxed transition-all",
                        "bg-secondary/60 border text-foreground placeholder:text-muted-foreground",
                        hasTranslation
                          ? "border-indigo-500/30 bg-indigo-500/5"
                          : "border-border/40 hover:border-border/70 focus:border-indigo-500/50"
                      )}
                    />
                    {hasTranslation && (
                      <button
                        type="button"
                        onClick={() => clearLayerLocalization(set.id, screen.id, layer.id, currentLang)}
                        className="absolute top-1 right-1 text-[9px] text-muted-foreground hover:text-destructive transition-colors px-1 rounded"
                      >
                        clear
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* AI Generate hint */}
      <div className="shrink-0 p-3 border-t border-border/30">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Use <strong>✨ AI Captions</strong> to auto-generate translations for all languages at once.</span>
        </div>
      </div>
    </div>
  );
}
