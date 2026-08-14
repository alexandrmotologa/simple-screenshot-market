"use client";

import { useState, useCallback } from "react";
import {
  Layers, Type, Image as ImageIcon, Square, Flag,
  Cpu, Upload, Grid3X3, X, Layout, Smile, Globe, User,
  Smartphone
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayersPanel } from "@/components/editor/panels/LayersPanel";
import { TextPanel } from "@/components/editor/panels/TextPanel";
import { BackgroundPanel } from "@/components/editor/panels/BackgroundPanel";
import { FlagsPanel } from "@/components/editor/panels/FlagsPanel";
import { BrandIconsPanel } from "@/components/editor/panels/BrandIconsPanel";
import { AssetsPanel } from "@/components/editor/panels/AssetsPanel";
import { BlocksPanel } from "@/components/editor/panels/BlocksPanel";
import { TemplatesPanel } from "@/components/editor/panels/TemplatesPanel";
import { StickersPanel } from "@/components/editor/panels/StickersPanel";
import { LocalizationPanel } from "@/components/editor/panels/LocalizationPanel";
import { CharactersPanel } from "@/components/editor/panels/CharactersPanel";
import { PlatformsPanel } from "@/components/editor/panels/PlatformsPanel";
import { ThemesPanel } from "@/components/editor/panels/ThemesPanel";
import { cn } from "@/lib/utils";

type PanelId = "themes" | "platforms" | "layers" | "text" | "background" | "flags" | "brands" | "assets" | "blocks" | "templates" | "stickers" | "languages" | "characters" | null;

const SIDEBAR_TOOLS: { id: PanelId; icon: React.ElementType; label: string }[] = [
  { id: "themes", icon: Layout, label: "Themes" },
  { id: "templates", icon: Layout, label: "Templates" },
  { id: "platforms", icon: Smartphone, label: "Platforms" },
  { id: "layers", icon: Layers, label: "Layers" },
  { id: "text", icon: Type, label: "Text" },
  { id: "background", icon: Grid3X3, label: "Background" },
  { id: "languages", icon: Globe, label: "Languages" },
  { id: "characters", icon: User, label: "Characters" },
  { id: "stickers", icon: Smile, label: "Stickers" },
  { id: "blocks", icon: Square, label: "Block Elements" },
  { id: "assets", icon: Upload, label: "My Screenshots" },
  { id: "flags", icon: Flag, label: "Flags" },
  { id: "brands", icon: Cpu, label: "Brand Icons" },
];

const PANEL_TITLES: Record<NonNullable<PanelId>, string> = {
  themes: "Themes",
  templates: "Templates",
  platforms: "Platforms",
  layers: "Layers",
  text: "Text",
  background: "Background",
  stickers: "Stickers & Emojis",
  flags: "Flags",
  brands: "Brand icons",
  assets: "My Screenshots",
  blocks: "Block element",
  languages: "Languages & i18n",
  characters: "Characters",
};

function renderPanel(panel: NonNullable<PanelId>) {
  switch (panel) {
    case "themes": return <ThemesPanel />;
    case "templates": return <TemplatesPanel />;
    case "platforms": return <PlatformsPanel />;
    case "layers": return <LayersPanel />;
    case "text": return <TextPanel />;
    case "background": return <BackgroundPanel />;
    case "stickers": return <StickersPanel />;
    case "flags": return <FlagsPanel />;
    case "brands": return <BrandIconsPanel />;
    case "assets": return <AssetsPanel />;
    case "blocks": return <BlocksPanel />;
    case "languages": return <LocalizationPanel />;
    case "characters": return <CharactersPanel />;
  }
}

export function EditorSidebar() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);

  const togglePanel = useCallback(
    (id: PanelId) => setActivePanel((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <div className="flex shrink-0 h-full z-30">
      {/* Icon rail — use native title instead of Tooltip to avoid nested button issue */}
      <div className="w-11 border-r border-border/50 bg-card/70 flex flex-col items-center py-2 gap-0.5">
        {SIDEBAR_TOOLS.map((tool) => (
          <button
            key={tool.id}
            id={`sidebar-${tool.id}`}
            type="button"
            onClick={() => togglePanel(tool.id)}
            title={tool.label}
            className={cn(
              "relative w-9 h-9 rounded-xl flex items-center justify-center transition-all text-sm",
              activePanel === tool.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <tool.icon className="w-4 h-4" />
            {/* Active indicator */}
            {activePanel === tool.id && (
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-l-full" />
            )}
          </button>
        ))}
      </div>

      {/* Slide-out panel */}
      {activePanel && (
        <div className="w-72 border-r border-border/50 bg-card/90 backdrop-blur-sm flex flex-col h-full shadow-xl">
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
            <h3 className="text-sm font-semibold">{PANEL_TITLES[activePanel]}</h3>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="w-6 h-6 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Panel content */}
          <div className="flex-1 overflow-hidden">
            {renderPanel(activePanel)}
          </div>
        </div>
      )}
    </div>
  );
}
