"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorStore } from "@/lib/store/editorStore";
import { ALL_TEMPLATES } from "@/lib/templates";
import { cn } from "@/lib/utils";
import type { Template } from "@/lib/types";

// ── Category definitions ────────────────────────────────────────────────────
const CATEGORIES = ["All", "Basic", "Classic", "Modern", "Bold", "Minimal"] as const;
type Category = (typeof CATEGORIES)[number];

// ── Template preview card ───────────────────────────────────────────────────
function TemplateCard({
  template,
  isApplied,
  onApply,
}: {
  template: Template;
  isApplied: boolean;
  onApply: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Preview gradient colors from template
  const [c1, c2] = template.previewGradient ?? [template.previewColor ?? "#1a1a2e", "#6366f1"];
  const gradientStyle = {
    background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
  };

  return (
    <button
      type="button"
      onClick={onApply}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative w-full text-left rounded-xl overflow-hidden border transition-all duration-200",
        isApplied
          ? "border-primary/70 ring-1 ring-primary/40"
          : "border-border/40 hover:border-border/80",
        "hover:scale-[1.01] active:scale-[0.99]"
      )}
    >
      {/* Visual preview */}
      <div
        className="relative h-32 flex flex-col"
        style={gradientStyle}
      >
        {/* Mock layout preview based on template layout */}
        <div className="absolute inset-0 p-3 flex flex-col justify-between">
          {/* Screenshot zone mock */}
          {template.layout !== "text-only" && (
            <div
              className={cn(
                "rounded-lg opacity-80 bg-white/20 backdrop-blur-sm border border-white/20",
                template.layout === "screenshot-top" ? "h-[60%]" :
                template.layout === "screenshot-bottom" ? "mt-auto h-[55%]" :
                template.layout === "screenshot-float" ? "mx-auto w-[55%] h-[75%]" :
                template.layout === "screenshot-full" ? "absolute inset-0 opacity-40" :
                "h-[65%]"
              )}
            />
          )}
          {/* Text mock lines */}
          <div className="space-y-1.5">
            <div className="h-2.5 rounded-full bg-white/60 w-3/4" />
            <div className="h-1.5 rounded-full bg-white/35 w-1/2" />
          </div>
        </div>

        {/* Hover overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full">
              Apply
            </span>
          </div>
        )}

        {/* Applied check */}
        {isApplied && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-3 py-2.5 bg-card/80">
        <p className="text-xs font-semibold text-foreground truncate">{template.name}</p>
        <p className="text-[10px] text-muted-foreground truncate mt-0.5">{template.description}</p>
      </div>
    </button>
  );
}

// ── Main panel ──────────────────────────────────────────────────────────────
export function TemplatesPanel() {
  const { getActiveSet, getActiveScreen, applyTemplate } = useEditorStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const activeSet = getActiveSet();
  const activeScreen = getActiveScreen();

  const filtered = useMemo(() => {
    return ALL_TEMPLATES.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const q = query.toLowerCase();
      const matchQ = !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q));
      return matchCat && matchQ;
    });
  }, [query, category]);

  const handleApply = (template: Template) => {
    if (!activeSet || !activeScreen) return;
    // Apply to ALL screens in the active set (replace layers and background)
    applyTemplate(activeSet.id, template);
    setAppliedId(template.id);
    // Reset applied indicator after 2s
    setTimeout(() => setAppliedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-border/40 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/70 border border-border/30">
          <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search templates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 px-3 py-2 overflow-x-auto shrink-0 border-b border-border/30">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all",
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* No active screen warning */}
      {(!activeSet || !activeScreen) && (
        <div className="flex flex-col items-center justify-center gap-2 flex-1 p-4 text-center">
          <Sparkles className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-xs text-muted-foreground">Select a screen to apply a template</p>
        </div>
      )}

      {/* Template grid */}
      {activeSet && activeScreen && (
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-3 grid grid-cols-2 gap-2.5">
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-8 text-xs text-muted-foreground">
                No templates found
              </div>
            )}
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isApplied={appliedId === template.id}
                onApply={() => handleApply(template)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
