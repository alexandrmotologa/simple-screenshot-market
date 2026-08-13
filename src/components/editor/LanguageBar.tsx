"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Globe, Check, ChevronDown } from "lucide-react";
import { useLanguageStore, SUPPORTED_LANGUAGES, getLang } from "@/lib/store/languageStore";
import { cn } from "@/lib/utils";

export function LanguageBar() {
  const { activeLang, projectLanguages, setActiveLang, addLanguage, removeLanguage } =
    useLanguageStore();
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const available = SUPPORTED_LANGUAGES.filter(
    (l) => !projectLanguages.includes(l.code) &&
      (l.name.toLowerCase().includes(search.toLowerCase()) ||
       l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
       l.code.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="relative flex items-center gap-1 h-8 px-2 border-b border-border/40 bg-card/80 backdrop-blur-sm shrink-0 z-30">
      {/* Globe icon */}
      <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />

      {/* Language pills */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {projectLanguages.map((code) => {
          const lang = getLang(code);
          const isActive = code === activeLang;
          return (
            <div key={code} className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setActiveLang(code)}
                className={cn(
                  "flex items-center gap-1 h-5 px-2 rounded-md text-[11px] font-medium transition-all",
                  isActive
                    ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/30"
                    : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <span>{lang?.flag ?? "🌐"}</span>
                <span className="uppercase">{code}</span>
                {isActive && <Check className="w-2.5 h-2.5" />}
              </button>
              {code !== "en" && (
                <button
                  type="button"
                  onClick={() => removeLanguage(code)}
                  className="w-3.5 h-3.5 -ml-0.5 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                  title={`Remove ${lang?.name}`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add language button */}
      <div className="relative shrink-0" ref={pickerRef}>
        <button
          type="button"
          onClick={() => setShowPicker((v) => !v)}
          className={cn(
            "flex items-center gap-0.5 h-5 px-2 rounded-md text-[11px] font-medium transition-all",
            showPicker
              ? "bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/40"
              : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <Plus className="w-3 h-3" />
          <span>Add language</span>
          <ChevronDown className={cn("w-2.5 h-2.5 transition-transform", showPicker && "rotate-180")} />
        </button>

        {showPicker && (
          <div className="absolute top-full left-0 mt-1 w-60 bg-card border border-border/60 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
            {/* Search */}
            <div className="p-2 border-b border-border/40">
              <input
                autoFocus
                type="text"
                placeholder="Search languages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-secondary/70 border border-border/30 text-xs outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {/* Language list */}
            <div className="max-h-52 overflow-y-auto p-1">
              {available.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-3">
                  {search ? "No languages found" : "All languages added"}
                </p>
              ) : (
                available.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      addLanguage(lang.code);
                      setActiveLang(lang.code);
                      setShowPicker(false);
                      setSearch("");
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs hover:bg-secondary transition-colors text-left"
                  >
                    <span className="text-base shrink-0">{lang.flag}</span>
                    <span className="flex-1 font-medium">{lang.nativeName}</span>
                    <span className="text-muted-foreground uppercase text-[10px]">{lang.code}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active language indicator */}
      {activeLang !== "en" && (
        <div className="ml-auto shrink-0 flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5">
          <span>Editing:</span>
          <span className="font-semibold uppercase">{activeLang}</span>
        </div>
      )}
    </div>
  );
}
