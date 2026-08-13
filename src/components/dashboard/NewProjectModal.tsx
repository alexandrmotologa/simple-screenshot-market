"use client";

import { useState, useMemo } from "react";
import { X, Search, Check, Sparkles, ArrowRight, Monitor } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_TEMPLATES, TEMPLATE_CATEGORIES, LAYOUT_META } from "@/lib/templates";
import { useProjectStore } from "@/lib/store/projectStore";
import { cn } from "@/lib/utils";
import { Template } from "@/lib/types";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (projectId: string) => void;
}

// ── Layout Preview SVG ──────────────────────────────────────────────────────────
function LayoutPreview({ template }: { template: Template }) {
  const gradColors = template.previewGradient ?? [template.previewColor];
  const layout = template.layout;
  const id = `grad-${template.id}`;

  // Phone silhouette color
  const phoneColor = "rgba(255,255,255,0.18)";
  const phoneBg = "rgba(99,102,241,0.15)";
  const phoneBorder = "rgba(99,102,241,0.5)";
  const textColor = "rgba(255,255,255,0.8)";
  const textLight = "rgba(255,255,255,0.4)";

  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          {gradColors.length === 1 ? (
            <stop offset="0%" stopColor={gradColors[0]} />
          ) : gradColors.length === 2 ? (
            <>
              <stop offset="0%" stopColor={gradColors[0]} />
              <stop offset="100%" stopColor={gradColors[1]} />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor={gradColors[0]} />
              <stop offset="50%" stopColor={gradColors[1]} />
              <stop offset="100%" stopColor={gradColors[2] ?? gradColors[1]} />
            </>
          )}
        </linearGradient>
        <clipPath id={`clip-${template.id}`}>
          <rect width="120" height="160" rx="10" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="120" height="160" rx="10" fill={`url(#${id})`} />

      {/* Layout-specific phone + text arrangement */}
      {layout === "screenshot-top" && (
        <>
          {/* Phone zone top */}
          <rect x="16" y="8" width="88" height="88" rx="6" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="38" y="22" width="44" height="70" rx="5" fill={phoneColor} />
          <rect x="44" y="88" width="0" height="0" />
          {/* Text lines bottom */}
          <rect x="10" y="104" width="60" height="8" rx="3" fill={textColor} />
          <rect x="10" y="118" width="95" height="5" rx="2" fill={textLight} />
          <rect x="10" y="127" width="75" height="5" rx="2" fill={textLight} />
        </>
      )}
      {layout === "screenshot-bottom" && (
        <>
          {/* Text top */}
          <rect x="10" y="12" width="65" height="9" rx="3" fill={textColor} />
          <rect x="10" y="24" width="80" height="6" rx="2" fill={textColor} />
          <rect x="10" y="34" width="95" height="4" rx="2" fill={textLight} />
          {/* Phone bottom */}
          <rect x="16" y="46" width="88" height="106" rx="6" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="28" y="56" width="64" height="90" rx="5" fill={phoneColor} />
        </>
      )}
      {layout === "screenshot-float" && (
        <>
          {/* Text left */}
          <rect x="8" y="20" width="45" height="8" rx="3" fill={textColor} />
          <rect x="8" y="32" width="38" height="8" rx="3" fill={textColor} />
          <rect x="8" y="50" width="48" height="4" rx="2" fill={textLight} />
          <rect x="8" y="58" width="40" height="4" rx="2" fill={textLight} />
          {/* Phone right, slightly cropped */}
          <rect x="55" y="8" width="72" height="120" rx="6" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="63" y="16" width="56" height="106" rx="5" fill={phoneColor} />
        </>
      )}
      {layout === "screenshot-full" && (
        <>
          {/* Full screen image */}
          <rect x="0" y="0" width="120" height="110" fill={phoneBg} />
          <rect x="0" y="0" width="120" height="110" fill={phoneColor} />
          {/* Gradient overlay */}
          <rect x="0" y="60" width="120" height="100" fill="rgba(0,0,0,0.5)" />
          {/* Text overlay bottom */}
          <rect x="10" y="115" width="65" height="9" rx="3" fill={textColor} />
          <rect x="10" y="130" width="90" height="5" rx="2" fill={textLight} />
          <rect x="10" y="140" width="70" height="5" rx="2" fill={textLight} />
        </>
      )}
      {layout === "screenshot-split" && (
        <>
          {/* Text top */}
          <rect x="10" y="8" width="70" height="8" rx="3" fill={textColor} />
          <rect x="10" y="20" width="90" height="4" rx="2" fill={textLight} />
          {/* Two phones */}
          <rect x="4" y="32" width="54" height="118" rx="5" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.2" strokeDasharray="4 3" />
          <rect x="8" y="38" width="46" height="108" rx="4" fill={phoneColor} />
          <rect x="62" y="32" width="54" height="118" rx="5" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.2" strokeDasharray="4 3" />
          <rect x="66" y="38" width="46" height="108" rx="4" fill={phoneColor} />
        </>
      )}
      {layout === "text-only" && (
        <>
          <rect x="10" y="28" width="80" height="12" rx="4" fill={textColor} />
          <rect x="10" y="44" width="65" height="12" rx="4" fill={textColor} />
          <rect x="10" y="60" width="50" height="12" rx="4" fill={textColor} />
          <rect x="10" y="82" width="95" height="5" rx="2" fill={textLight} />
          <rect x="10" y="92" width="80" height="5" rx="2" fill={textLight} />
          <rect x="10" y="102" width="60" height="5" rx="2" fill={textLight} />
        </>
      )}

      {/* Layout badge */}
      <rect x="6" y="147" width="108" height="10" rx="4" fill="rgba(0,0,0,0.35)" />
      <text x="60" y="155" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">
        {LAYOUT_META[layout]?.label ?? layout}
      </text>
    </svg>
  );
}

export function NewProjectModal({ open, onClose, onCreated }: NewProjectModalProps) {
  const { createProject } = useProjectStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>("screenshot-top");
  const [projectName, setProjectName] = useState("My App Screenshots");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    return DEFAULT_TEMPLATES.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const handleCreate = async () => {
    if (!projectName.trim()) return;
    setCreating(true);
    try {
      const project = createProject(selectedTemplate, projectName.trim());
      onClose();
      onCreated(project.id);
    } finally {
      setCreating(false);
    }
  };

  const selectedTemplateObj = DEFAULT_TEMPLATES.find((t) => t.id === selectedTemplate);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-6xl h-[88vh] flex flex-col p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl">

        {/* Header */}
        <DialogHeader className="px-7 py-5 border-b border-border/50 shrink-0 flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-bold flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              New Project
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              Choose a layout — add your screenshots later
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogHeader>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left: Template browser */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-border/40">

            {/* Search + Categories */}
            <div className="px-5 py-3 space-y-3 border-b border-border/40 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search templates…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-9 text-sm bg-secondary/50 border-0 focus-visible:ring-1"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5">
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium transition-all",
                      category === cat
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                        : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Template grid */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-5 grid grid-cols-4 gap-4">
                {filtered.map((tpl) => {
                  const isSelected = selectedTemplate === tpl.id;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={cn(
                        "group relative flex flex-col gap-2 text-left transition-all duration-150 rounded-2xl p-2",
                        isSelected
                          ? "bg-primary/8 ring-2 ring-primary shadow-md shadow-primary/15"
                          : "hover:bg-secondary/60 ring-1 ring-transparent hover:ring-border/60"
                      )}
                    >
                      {/* Preview */}
                      <div
                        className="w-full overflow-hidden rounded-xl"
                        style={{ aspectRatio: "3/4" }}
                      >
                        <LayoutPreview template={tpl} />
                      </div>

                      {/* Selected badge */}
                      {isSelected && (
                        <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                      )}

                      {/* Info */}
                      <div className="px-1">
                        <p className={cn("text-xs font-semibold", isSelected ? "text-primary" : "text-foreground")}>
                          {tpl.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[9px] text-muted-foreground">{tpl.category}</span>
                          <span className="text-[9px] text-muted-foreground/50">·</span>
                          <span className="text-[9px] text-muted-foreground/70">
                            {tpl.screens.length} screen{tpl.screens.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Right: Configuration */}
          <div className="w-96 shrink-0 flex flex-col overflow-hidden border-l border-border/40">
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-6 space-y-6">

                {/* Selected template info */}
                {selectedTemplateObj && (
                  <div className="space-y-3">
                    <div className="w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
                      <LayoutPreview template={selectedTemplateObj} />
                    </div>
                    <div>
                      <p className="font-semibold">{selectedTemplateObj.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{selectedTemplateObj.description}</p>
                    </div>

                    {/* Layout type */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/50">
                      <Monitor className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-[10px] font-semibold text-foreground/80">
                          {LAYOUT_META[selectedTemplateObj.layout]?.label}
                        </p>
                        <p className="text-[9px] text-muted-foreground">
                          {LAYOUT_META[selectedTemplateObj.layout]?.description}
                        </p>
                      </div>
                    </div>

                    {/* Screenshot slots */}
                    {selectedTemplateObj.layout !== "text-only" && (
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-primary/6 border border-primary/15">
                        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <p className="text-[10px] text-primary/80 leading-relaxed">
                          This template has screenshot zones. Upload your app screenshots in the editor to fill them.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Project name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground/80">Project name</label>
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="My App Screenshots"
                    className="h-9 text-sm bg-secondary/50 border-border/50"
                    onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
                  />
                </div>

              </div>
            </ScrollArea>

            {/* Create button */}
            <div className="p-5 border-t border-border/40 shrink-0">
              <Button
                onClick={handleCreate}
                disabled={!projectName.trim() || creating}
                className="w-full h-11 font-semibold gap-2 shadow-lg shadow-primary/20"
                size="lg"
              >
                {creating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating…
                  </span>
                ) : (
                  <>
                    Create Project
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground mt-2">
                You can change the template layout later
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
