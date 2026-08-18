"use client";

import { useState, useCallback } from "react";
import {
  Layers, Type, Square, Flag,
  Cpu, Upload, Grid3X3, X, Palette, Smile, Globe, User,
  Smartphone, LayoutList, LayoutTemplate
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TemplatesPanel } from "@/components/editor/panels/TemplatesPanel";
import { LayersPanel } from "@/components/editor/panels/LayersPanel";
import { TextPanel } from "@/components/editor/panels/TextPanel";
import { BackgroundPanel } from "@/components/editor/panels/BackgroundPanel";
import { FlagsPanel } from "@/components/editor/panels/FlagsPanel";
import { BrandIconsPanel } from "@/components/editor/panels/BrandIconsPanel";
import { AssetsPanel } from "@/components/editor/panels/AssetsPanel";
import { BlocksPanel } from "@/components/editor/panels/BlocksPanel";
import { StickersPanel } from "@/components/editor/panels/StickersPanel";
import { LocalizationPanel } from "@/components/editor/panels/LocalizationPanel";
import { CharactersPanel } from "@/components/editor/panels/CharactersPanel";
import { PlatformsPanel } from "@/components/editor/panels/PlatformsPanel";
import { ThemesPanel } from "@/components/editor/panels/ThemesPanel";
import { StoreListingPanel } from "@/components/editor/panels/StoreListingPanel";
import { cn } from "@/lib/utils";

type PanelId =
  | "templates"
  | "themes"
  | "platforms"
  | "layers"
  | "text"
  | "background"
  | "flags"
  | "brands"
  | "assets"
  | "blocks"
  | "stickers"
  | "languages"
  | "characters"
  | "store_listing"
  | null;

interface SidebarTool {
  id: NonNullable<PanelId>;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

interface SidebarGroup {
  name: string;
  tools: SidebarTool[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    name: "Structure & Style",
    tools: [
      { id: "templates", icon: LayoutTemplate, label: "Templates & Presets" },
      { id: "platforms", icon: Smartphone, label: "Platforms & Presets" },
      { id: "themes", icon: Palette, label: "Color Themes" },
      { id: "background", icon: Grid3X3, label: "Background & Mesh" },
      { id: "layers", icon: Layers, label: "Layer Order" },
    ],
  },
  {
    name: "Elements & Content",
    tools: [
      { id: "text", icon: Type, label: "Typography & Captions" },
      { id: "assets", icon: Upload, label: "My Screenshots & Assets" },
      { id: "blocks", icon: Square, label: "Block Elements & Shapes" },
      { id: "stickers", icon: Smile, label: "Stickers & Badges" },
      { id: "characters", icon: User, label: "3D Characters & Mascots" },
      { id: "brands", icon: Cpu, label: "Brand Icons" },
      { id: "flags", icon: Flag, label: "Country Flags" },
    ],
  },
  {
    name: "Global & Store",
    tools: [
      { id: "languages", icon: Globe, label: "Multi-Language (i18n)" },
      { id: "store_listing", icon: LayoutList, label: "Store Listing" },
    ],
  },
];

const PANEL_TITLES: Record<NonNullable<PanelId>, string> = {
  templates: "Templates & Presets",
  themes: "Color Themes",
  platforms: "Platforms & Devices",
  layers: "Layers",
  text: "Typography & Captions",
  background: "Background & Mesh",
  stickers: "Stickers & Badges",
  flags: "Country Flags",
  brands: "Brand Icons",
  assets: "Screenshots & Media",
  blocks: "Block Elements",
  languages: "Languages & Localization",
  characters: "3D Characters",
  store_listing: "Store Listing",
};

function renderPanel(panel: NonNullable<PanelId>) {
  switch (panel) {
    case "templates": return <TemplatesPanel />;
    case "themes": return <ThemesPanel />;
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
    case "store_listing": return <StoreListingPanel />;
  }
}

export function EditorSidebar() {
  const [activePanel, setActivePanel] = useState<PanelId>("platforms");

  const togglePanel = useCallback(
    (id: PanelId) => setActivePanel((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <div className="flex shrink-0 h-full z-30">
      {/* Icon Rail with Group Separators */}
      <div className="w-12 border-r border-border/50 bg-card/70 backdrop-blur-md flex flex-col items-center py-2.5 gap-2 overflow-y-auto overflow-x-hidden select-none">
        {SIDEBAR_GROUPS.map((group, gIdx) => (
          <div key={group.name} className="flex flex-col items-center gap-1 w-full">
            {gIdx > 0 && (
              <div className="w-6 h-[1px] bg-border/60 my-1" />
            )}

            {group.tools.map((tool) => {
              const isActive = activePanel === tool.id;
              return (
                <Tooltip key={tool.id}>
                  <TooltipTrigger
                    id={`sidebar-${tool.id}`}
                    type="button"
                    onClick={() => togglePanel(tool.id)}
                    className={cn(
                      "relative w-9 h-9 rounded-xl flex items-center justify-center transition-all text-sm outline-none",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 font-semibold scale-105"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    )}
                  >
                    <tool.icon className="w-4 h-4" />
                    {isActive && (
                      <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-l-full" />
                    )}
                  </TooltipTrigger>

                  <TooltipContent side="right" sideOffset={8} className="text-xs font-medium">
                    {tool.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>

      {/* Slide-out panel */}
      {activePanel && (
        <div className="w-72 border-r border-border/50 bg-card/95 backdrop-blur-md flex flex-col h-full shadow-2xl">
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {PANEL_TITLES[activePanel]}
            </h3>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="w-6 h-6 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Panel content */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {renderPanel(activePanel)}
          </div>
        </div>
      )}
    </div>
  );
}
