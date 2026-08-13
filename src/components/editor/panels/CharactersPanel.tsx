"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { CHARACTERS, Character, getCharacterSvgString } from "@/lib/characters";
import { CharacterLayer } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  happy: "😊 Happy",
  waving: "👋 Waving",
  celebrating: "🎉 Celebrating",
  thinking: "🤔 Thinking",
  working: "💻 Working",
  sitting: "🪑 Sitting",
  standing: "🧍 Standing",
};

export function CharactersPanel() {
  const { activeSetId, activeScreenId, addLayer } = useEditorStore();
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(CHARACTERS.map((c) => c.category)))];
  const filtered =
    filter === "all" ? CHARACTERS : CHARACTERS.filter((c) => c.category === filter);

  const handleAdd = (char: Character) => {
    if (!activeSetId || !activeScreenId) return;
    const pose = char.poses[0];
    if (!pose) return;

    const svgContent = getCharacterSvgString(char.id, pose.id);

    const layer: CharacterLayer = {
      id: nanoid(),
      type: "character",
      characterId: char.id,
      poseId: pose.id,
      svgContent,
      x: 200,
      y: 600,
      width: 280,
      height: 350,
      rotation: 0,
      opacity: 1,
    };

    addLayer(activeSetId, activeScreenId, layer as import("@/lib/types").Layer);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Category filter */}
      <div className="px-3 pt-3 pb-2 shrink-0 border-b border-border/30">
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all",
                filter === cat
                  ? "bg-indigo-500 text-white"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Character grid */}
      <ScrollArea className="flex-1">
        <div className="p-3 grid grid-cols-2 gap-2">
          {filtered.map((char) => {
            const pose = char.poses[0];
            if (!pose) return null;
            const svgStr = getCharacterSvgString(char.id, pose.id);
            const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;

            return (
              <button
                key={char.id}
                type="button"
                onClick={() => handleAdd(char)}
                className={cn(
                  "group flex flex-col items-center gap-1.5 p-2 rounded-xl border border-border/40",
                  "bg-secondary/30 hover:bg-secondary/60 hover:border-indigo-500/30 transition-all",
                  "focus-visible:ring-2 focus-visible:ring-indigo-500"
                )}
                title={`Add ${char.name} — ${char.description}`}
              >
                {/* Character preview */}
                <div className="w-full aspect-[4/5] rounded-lg bg-secondary/50 overflow-hidden flex items-center justify-center relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dataUrl}
                    alt={char.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-xs font-semibold text-indigo-300 bg-indigo-900/80 px-2 py-0.5 rounded-md">
                      + Add
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {char.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Info footer */}
        <div className="px-3 pb-3">
          <p className="text-[10px] text-muted-foreground text-center">
            Open Peeps style · CC0 License · Click to add to canvas
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}
