"use client";

import { useState, useMemo, useEffect } from "react";
import { X, Search, Check, Sparkles, ArrowRight, Monitor, Plus } from "lucide-react";
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

      <rect width="120" height="160" rx="10" fill={`url(#${id})`} />

      {layout === "screenshot-top" && (
        <>
          <rect x="16" y="8" width="88" height="88" rx="6" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="38" y="22" width="44" height="70" rx="5" fill={phoneColor} />
          <rect x="10" y="104" width="60" height="8" rx="3" fill={textColor} />
          <rect x="10" y="118" width="95" height="5" rx="2" fill={textLight} />
          <rect x="10" y="127" width="75" height="5" rx="2" fill={textLight} />
        </>
      )}
      {layout === "screenshot-bottom" && (
        <>
          <rect x="10" y="12" width="65" height="9" rx="3" fill={textColor} />
          <rect x="10" y="24" width="80" height="6" rx="2" fill={textColor} />
          <rect x="10" y="34" width="95" height="4" rx="2" fill={textLight} />
          <rect x="16" y="46" width="88" height="106" rx="6" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="28" y="56" width="64" height="90" rx="5" fill={phoneColor} />
        </>
      )}
      {layout === "screenshot-float" && (
        <>
          <rect x="8" y="20" width="45" height="8" rx="3" fill={textColor} />
          <rect x="8" y="32" width="38" height="8" rx="3" fill={textColor} />
          <rect x="8" y="50" width="48" height="4" rx="2" fill={textLight} />
          <rect x="8" y="58" width="40" height="4" rx="2" fill={textLight} />
          <rect x="55" y="8" width="72" height="120" rx="6" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="63" y="16" width="56" height="106" rx="5" fill={phoneColor} />
        </>
      )}
      {layout === "screenshot-float-reverse" && (
        <>
          <rect x="-7" y="8" width="72" height="120" rx="6" fill={phoneBg} stroke={phoneBorder} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="1" y="16" width="56" height="106" rx="5" fill={phoneColor} />
          <rect x="67" y="20" width="45" height="8" rx="3" fill={textColor} />
          <rect x="67" y="32" width="38" height="8" rx="3" fill={textColor} />
          <rect x="67" y="50" width="48" height="4" rx="2" fill={textLight} />
          <rect x="67" y="58" width="40" height="4" rx="2" fill={textLight} />
        </>
      )}
      {layout === "screenshot-full" && (
        <>
          <rect x="0" y="0" width="120" height="110" fill={phoneBg} />
          <rect x="0" y="0" width="120" height="110" fill={phoneColor} />
          <rect x="0" y="60" width="120" height="100" fill="rgba(0,0,0,0.5)" />
          <rect x="10" y="115" width="65" height="9" rx="3" fill={textColor} />
          <rect x="10" y="130" width="90" height="5" rx="2" fill={textLight} />
          <rect x="10" y="140" width="70" height="5" rx="2" fill={textLight} />
        </>
      )}
      {layout === "screenshot-split" && (
        <>
          <rect x="10" y="8" width="70" height="8" rx="3" fill={textColor} />
          <rect x="10" y="20" width="90" height="4" rx="2" fill={textLight} />
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
    </svg>
  );
}

export function NewProjectModal({ open, onClose, onCreated }: NewProjectModalProps) {
  const { createProject } = useProjectStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("My App Screenshots");
  const [platforms, setPlatforms] = useState<{ ios: boolean; android: boolean }>({ ios: true, android: true });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedTemplate(null);
      setProjectName("My App Screenshots");
      setPlatforms({ ios: true, android: true });
      setCreating(false);
    }
  }, [open]);

  // We filter out "blank" from the main list so we can append it at the bottom manually
  const themes = useMemo(() => {
    return DEFAULT_TEMPLATES.filter(t => t.id !== "blank");
  }, []);

  const handleCreate = async () => {
    if (!projectName.trim() || !selectedTemplate || (!platforms.ios && !platforms.android)) return;
    setCreating(true);
    try {
      const project = createProject(selectedTemplate, projectName.trim(), platforms);
      onClose();
      onCreated(project.id);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-5xl h-[88vh] flex flex-col p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl">

        {/* Header */}
        <DialogHeader className="px-7 py-5 border-b border-border/50 shrink-0 flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold">Select a Theme</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a pre-designed theme for your screenshots
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full -mr-2 -mt-2">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        {/* Body (Scrollable List) */}
        <ScrollArea className="flex-1 min-h-0 bg-secondary/20">
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {themes.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div 
                  key={tpl.id} 
                  className={cn(
                    "relative flex flex-col items-center gap-5 p-6 rounded-[2rem] transition-all cursor-pointer group",
                    isSelected 
                      ? "bg-primary/5 shadow-2xl shadow-primary/10 ring-2 ring-primary" 
                      : "bg-background shadow-md hover:shadow-xl hover:-translate-y-1 hover:ring-2 hover:ring-primary/30 border border-border/50"
                  )}
                  onClick={() => setSelectedTemplate(tpl.id)}
                >
                  {/* Selection indicator */}
                  <div className={cn(
                    "absolute top-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-10",
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-primary/50 bg-background/50 backdrop-blur"
                  )}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                  </div>

                  {/* Single Screen Preview */}
                  <div 
                    className="w-[160px] shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow mt-2 ring-1 ring-border/50"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <LayoutPreview template={tpl} />
                  </div>

                  {/* Text details */}
                  <div className="text-center mt-1 w-full px-2">
                    <h3 className="text-xl font-bold text-foreground">{tpl.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{tpl.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Custom/Blank Project at the bottom */}
            <div 
              className={cn(
                "relative flex flex-col items-center justify-center gap-4 p-6 rounded-[2rem] transition-all cursor-pointer group h-full min-h-[320px]",
                selectedTemplate === "blank"
                  ? "bg-primary/5 shadow-2xl shadow-primary/10 ring-2 ring-primary" 
                  : "bg-secondary/20 shadow-md border-2 border-dashed border-border hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary/40"
              )}
              onClick={() => setSelectedTemplate("blank")}
            >
              <div className={cn(
                "absolute top-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-10",
                selectedTemplate === "blank" ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
              )}>
                {selectedTemplate === "blank" && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
              </div>

              <div className="w-20 h-20 rounded-full bg-background shadow-sm border border-border/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Plus className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <div className="text-center w-full px-2">
                <h3 className="text-xl font-bold text-foreground">Custom Design</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Start with a blank canvas and create from scratch.</p>
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-border/50 shrink-0 bg-card flex items-end justify-between">
          <div className="flex items-end gap-4 flex-1">
            <div className="flex flex-col gap-1 w-full max-w-sm">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Project Name</label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My App Screenshots"
                className="h-10 text-base border-border/50 bg-secondary/30"
                onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
              />
            </div>
            
            <div className="w-px h-10 bg-border/50 mx-2" />
            
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Platforms</label>
              <div className="flex gap-2">
                <Button
                  variant={platforms.ios ? "default" : "outline"}
                  onClick={() => setPlatforms(prev => ({ ...prev, ios: !prev.ios }))}
                  className="h-10 px-4 font-medium"
                >
                  iOS
                </Button>
                <Button
                  variant={platforms.android ? "default" : "outline"}
                  onClick={() => setPlatforms(prev => ({ ...prev, android: !prev.android }))}
                  className="h-10 px-4 font-medium"
                >
                  Android
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-end gap-3 h-10">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-10 px-6 font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!projectName.trim() || !selectedTemplate || (!platforms.ios && !platforms.android) || creating}
              className="h-10 px-8 font-semibold gap-2 shadow-lg shadow-primary/20"
            >
              {creating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating…
                </span>
              ) : (
                <>
                  Select a Theme
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

