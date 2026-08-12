"use client";

import { Type, Image as ImageIcon, Square, Smartphone, Layers, Move } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/lib/store/editorStore";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Tool = "select" | "text" | "image" | "shape" | "mockup" | "layers";

const TOOLS: { id: Tool; icon: React.ElementType; label: string; shortcut?: string }[] = [
  { id: "select", icon: Move, label: "Select", shortcut: "V" },
  { id: "text", icon: Type, label: "Add Text", shortcut: "T" },
  { id: "image", icon: ImageIcon, label: "Add Image", shortcut: "I" },
  { id: "shape", icon: Square, label: "Add Shape", shortcut: "S" },
  { id: "mockup", icon: Smartphone, label: "Device Mockup", shortcut: "M" },
  { id: "layers", icon: Layers, label: "Layers", shortcut: "L" },
];

export function EditorToolbar() {
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const { getActiveSet, getActiveScreen, addLayer } = useEditorStore();

  const handleTool = (tool: Tool) => {
    setActiveTool(tool);

    if (tool === "text") {
      const set = getActiveSet();
      const screen = getActiveScreen();
      if (!set || !screen) return;

      addLayer(set.id, screen.id, {
        type: "text",
        content: "Your Text Here",
        x: screen.width / 2 - 300,
        y: screen.height / 4,
        width: 600,
        height: 120,
        fontSize: 80,
        fontFamily: "Geist Sans",
        fontWeight: 700,
        color: "#ffffff",
        align: "center",
        lineHeight: 1.2,
        letterSpacing: 0,
        rotation: 0,
        opacity: 1,
      } as Omit<import("@/lib/types").TextLayer, "id">);
      setActiveTool("select");
    }

    if (tool === "shape") {
      const set = getActiveSet();
      const screen = getActiveScreen();
      if (!set || !screen) return;

      addLayer(set.id, screen.id, {
        type: "shape",
        shape: "rounded-rectangle",
        x: screen.width / 2 - 150,
        y: screen.height / 2 - 80,
        width: 300,
        height: 160,
        fill: "#6366f1",
        cornerRadius: 24,
        rotation: 0,
        opacity: 1,
      } as Omit<import("@/lib/types").ShapeLayer, "id">);
      setActiveTool("select");
    }
  };

  return (
    <div className="w-14 border-r border-border/60 bg-card/50 flex flex-col items-center py-3 gap-1 shrink-0">
      {TOOLS.slice(0, 4).map((tool) => (
        <Tooltip key={tool.id}>
          <TooltipTrigger>
            <button
              id={`tool-${tool.id}`}
              onClick={() => handleTool(tool.id)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeTool === tool.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <tool.icon className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2">
            {tool.label}
            {tool.shortcut && (
              <kbd className="text-[10px] bg-secondary px-1 py-0.5 rounded">{tool.shortcut}</kbd>
            )}
          </TooltipContent>
        </Tooltip>
      ))}

      <Separator className="w-8 my-1" />

      {TOOLS.slice(4).map((tool) => (
        <Tooltip key={tool.id}>
          <TooltipTrigger>
            <button
              id={`tool-${tool.id}`}
              onClick={() => handleTool(tool.id)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeTool === tool.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <tool.icon className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {tool.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
