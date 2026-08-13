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
      <DialogContent className="max-w-5xl h-[88vh] flex flex-col p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl">

        {/* Header */}
        <DialogHeader className="px-7 py-5 border-b border-border/50 shrink-0 flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold">Select a Theme</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a pre-designed theme for your screenshots
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {/* Body (Scrollable List) */}
        <ScrollArea className="flex-1 min-h-0 bg-secondary/20">
          <div className="p-8 space-y-12 max-w-4xl mx-auto">
            
            {themes.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div 
                  key={tpl.id} 
                  className={cn(
                    "flex flex-col gap-4 p-6 rounded-3xl transition-all border-2",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" 
                      : "border-transparent hover:bg-secondary hover:border-border"
                  )}
                  onClick={() => setSelectedTemplate(tpl.id)}
                >
                  <div className="flex items-center justify-between px-2 cursor-pointer">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{tpl.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{tpl.description}</p>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                    </div>
                  </div>

                  {/* 5 Screen Previews Row */}
                  <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 px-2 snap-x">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div 
                        key={index}
                        className="w-[140px] shrink-0 rounded-2xl overflow-hidden shadow-md snap-start"
                        style={{ aspectRatio: "3/4" }}
                      >
                        <LayoutPreview template={tpl} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Custom/Blank Project at the bottom */}
            <div 
              className={cn(
                "flex flex-col gap-4 p-6 rounded-3xl transition-all border-2 mb-12",
                selectedTemplate === "blank"
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" 
                  : "border-transparent hover:bg-secondary hover:border-border"
              )}
              onClick={() => setSelectedTemplate("blank")}
            >
              <div className="flex items-center justify-between px-2 cursor-pointer">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Create Custom Design</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Start Blank Project</p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  selectedTemplate === "blank" ? "border-primary bg-primary" : "border-muted-foreground/30"
                )}>
                  {selectedTemplate === "blank" && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                </div>
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-border/50 shrink-0 bg-card flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
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
          
          <div className="flex items-center gap-3">
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

