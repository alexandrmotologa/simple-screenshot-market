"use client";

import { useRef } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { Layer, TextLayer, ShapeLayer } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trash2, Eye, EyeOff, Copy, GripVertical,
  Type, Square, Image as ImageIcon, Flag, Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

const LAYER_ICONS: Record<string, React.ElementType> = {
  text: Type,
  shape: Square,
  image: ImageIcon,
  flag: Flag,
  emoji: Flag,
  brand: Cpu,
};

function LayerRow({
  layer,
  screenSetId,
  screenId,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  layer: Layer;
  screenSetId: string;
  screenId: string;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDrop: (targetId: string) => void;
}) {
  const { activeLayerId, setActiveLayer, updateLayer, deleteLayer, duplicateLayer } = useEditorStore();
  const isActive = activeLayerId === layer.id;
  const Icon = LAYER_ICONS[layer.type] ?? Square;

  const label =
    layer.type === "text"
      ? (layer as TextLayer).content.slice(0, 24).replace(/\n/g, " ") || "Text"
      : layer.type === "shape"
      ? (layer as ShapeLayer).shape ?? "Shape"
      : layer.type;

  const isVisible = (layer.opacity ?? 1) > 0;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(layer.id)}
      onDragOver={(e) => { e.preventDefault(); onDragOver(e, layer.id); }}
      onDrop={() => onDrop(layer.id)}
      onClick={() => setActiveLayer(isActive ? null : layer.id)}
      className={cn(
        "group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all text-sm",
        isActive ? "bg-primary/10 text-primary ring-1 ring-primary/30" : "hover:bg-secondary text-foreground"
      )}
    >
      {/* Drag handle */}
      <GripVertical className="w-3 h-3 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground cursor-grab active:cursor-grabbing" />

      <Icon className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate text-xs">{label}</span>

      {/* Actions on hover */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          title={isVisible ? "Hide layer" : "Show layer"}
          onClick={(e) => {
            e.stopPropagation();
            updateLayer(screenSetId, screenId, layer.id, {
              opacity: isVisible ? 0 : 1,
            } as Parameters<typeof updateLayer>[3]);
          }}
          className="w-5 h-5 rounded flex items-center justify-center hover:bg-background"
        >
          {isVisible
            ? <Eye className="w-3 h-3 text-muted-foreground" />
            : <EyeOff className="w-3 h-3 text-muted-foreground" />
          }
        </button>
        <button
          type="button"
          title="Duplicate layer"
          onClick={(e) => { e.stopPropagation(); duplicateLayer(screenSetId, screenId, layer.id); }}
          className="w-5 h-5 rounded flex items-center justify-center hover:bg-background"
        >
          <Copy className="w-3 h-3 text-muted-foreground" />
        </button>
        <button
          type="button"
          title="Delete layer"
          onClick={(e) => { e.stopPropagation(); deleteLayer(screenSetId, screenId, layer.id); }}
          className="w-5 h-5 rounded flex items-center justify-center hover:bg-background"
        >
          <Trash2 className="w-3 h-3 text-destructive" />
        </button>
      </div>
    </div>
  );
}

export function LayersPanel() {
  const { getActiveSet, getActiveScreen, reorderLayers } = useEditorStore();
  const set = getActiveSet();
  const screen = getActiveScreen();
  const dragId = useRef<string | null>(null);
  const overIds = useRef<string[]>([]);

  if (!set || !screen) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
        <Square className="w-8 h-8 opacity-20" />
        <p className="text-sm">No screen selected</p>
      </div>
    );
  }

  // Layers are shown top-first (reversed for display)
  const layers = [...screen.layers].reverse();

  const handleDragStart = (id: string) => {
    dragId.current = id;
    overIds.current = screen.layers.map((l) => l.id);
  };

  const handleDragOver = (_e: React.DragEvent, targetId: string) => {
    if (!dragId.current || dragId.current === targetId) return;
    const sourceIdx = overIds.current.indexOf(dragId.current);
    const targetIdx = overIds.current.indexOf(targetId);
    if (sourceIdx === -1 || targetIdx === -1) return;
    const next = [...overIds.current];
    next.splice(sourceIdx, 1);
    next.splice(targetIdx, 0, dragId.current);
    overIds.current = next;
  };

  const handleDrop = (_targetId: string) => {
    if (!dragId.current) return;
    reorderLayers(set.id, screen.id, overIds.current);
    dragId.current = null;
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-1">
        {layers.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10 text-muted-foreground">
            <Type className="w-8 h-8 opacity-20" />
            <p className="text-xs text-center">
              No layers yet.<br />Add text, shapes or images from the sidebar.
            </p>
          </div>
        ) : (
          layers.map((layer) => (
            <LayerRow
              key={layer.id}
              layer={layer}
              screenSetId={set.id}
              screenId={screen.id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
