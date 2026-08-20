import React from "react";

export type CanvasBackgroundId =
  | "blueprint-gold"
  | "grid-blueprint"
  | "dots-subtle"
  | "dots-dense"
  | "grid-clean"
  | "crosshairs"
  | "isometric"
  | "ambient-glow"
  | "blank";

export interface CanvasBackgroundOption {
  id: CanvasBackgroundId;
  name: string;
  description: string;
  category: "dots" | "grid" | "creative" | "clean";
  className: string;
  style: React.CSSProperties;
  previewStyle: React.CSSProperties;
}

export const CANVAS_BACKGROUNDS: CanvasBackgroundOption[] = [
  {
    id: "blueprint-gold",
    name: "Blueprint Gold",
    description: "Luxury architectural gold grid with major & minor guidelines (Default)",
    category: "grid",
    className: "text-amber-500/20 dark:text-amber-400/20",
    style: {
      backgroundImage:
        "linear-gradient(to right, rgba(217, 119, 6, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.18) 1px, transparent 1px), linear-gradient(to right, rgba(245, 158, 11, 0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(245, 158, 11, 0.08) 0.5px, transparent 0.5px)",
      backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
    },
    previewStyle: {
      backgroundImage:
        "linear-gradient(to right, rgba(217, 119, 6, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.35) 1px, transparent 1px)",
      backgroundSize: "10px 10px",
    },
  },
  {
    id: "grid-blueprint",
    name: "Blueprint Grid",
    description: "Architectural major & minor grid lines",
    category: "grid",
    className: "text-foreground/10",
    style: {
      backgroundImage:
        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 0.5px, transparent 0.5px), linear-gradient(to bottom, currentColor 0.5px, transparent 0.5px)",
      backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
    },
    previewStyle: {
      backgroundImage:
        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      backgroundSize: "12px 12px",
    },
  },
  {
    id: "dots-subtle",
    name: "Fine Dots",
    description: "Classic subtle 24px dot matrix",
    category: "dots",
    className: "text-foreground/15",
    style: {
      backgroundImage: "radial-gradient(circle, currentColor 1.2px, transparent 1.2px)",
      backgroundSize: "24px 24px",
    },
    previewStyle: {
      backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
      backgroundSize: "8px 8px",
    },
  },
  {
    id: "dots-dense",
    name: "Bold Dots",
    description: "Prominent 32px spaced dot pattern",
    category: "dots",
    className: "text-foreground/25",
    style: {
      backgroundImage: "radial-gradient(circle, currentColor 1.8px, transparent 1.8px)",
      backgroundSize: "32px 32px",
    },
    previewStyle: {
      backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
      backgroundSize: "10px 10px",
    },
  },
  {
    id: "grid-clean",
    name: "Square Grid",
    description: "Clean graph paper grid pattern (Pătrățele)",
    category: "grid",
    className: "text-foreground/10",
    style: {
      backgroundImage:
        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    },
    previewStyle: {
      backgroundImage:
        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      backgroundSize: "8px 8px",
    },
  },
  {
    id: "crosshairs",
    name: "Technical Plus (+)",
    description: "Modern CAD crosshair coordinates",
    category: "creative",
    className: "text-foreground/20",
    style: {
      backgroundImage:
        "radial-gradient(circle, currentColor 1.2px, transparent 1.2px), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      backgroundSize: "32px 32px, 32px 32px, 32px 32px",
      backgroundPosition: "0 0, 16px 0, 0 16px",
    },
    previewStyle: {
      backgroundImage:
        "radial-gradient(circle, currentColor 1px, transparent 1px)",
      backgroundSize: "10px 10px",
    },
  },
  {
    id: "isometric",
    name: "Isometric 3D",
    description: "Diagonal isometric 3D perspective grid",
    category: "creative",
    className: "text-foreground/10",
    style: {
      backgroundImage:
        "linear-gradient(30deg, currentColor 1px, transparent 1px), linear-gradient(150deg, currentColor 1px, transparent 1px)",
      backgroundSize: "36px 62.35px",
    },
    previewStyle: {
      backgroundImage:
        "linear-gradient(30deg, currentColor 1px, transparent 1px), linear-gradient(150deg, currentColor 1px, transparent 1px)",
      backgroundSize: "12px 20.78px",
    },
  },
  {
    id: "ambient-glow",
    name: "Ambient Studio",
    description: "Subtle center glow with soft micro grid",
    category: "creative",
    className: "text-foreground/8",
    style: {
      backgroundImage:
        "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0%, transparent 70%), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      backgroundSize: "100% 100%, 28px 28px, 28px 28px",
    },
    previewStyle: {
      backgroundImage:
        "radial-gradient(circle at center, hsl(var(--primary) / 0.2) 0%, transparent 70%), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      backgroundSize: "100% 100%, 8px 8px, 8px 8px",
    },
  },
  {
    id: "blank",
    name: "Blank / Clean",
    description: "Pure solid background with zero distraction",
    category: "clean",
    className: "text-transparent",
    style: {
      backgroundImage: "none",
    },
    previewStyle: {
      backgroundImage: "none",
    },
  },
];

const STORAGE_KEY = "snapframe_canvas_bg";

export function getSavedCanvasBackground(): CanvasBackgroundId {
  if (typeof window === "undefined") return "blueprint-gold";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as CanvasBackgroundId;
    if (saved && CANVAS_BACKGROUNDS.some((bg) => bg.id === saved)) {
      return saved;
    }
  } catch {
    // fallback
  }
  return "blueprint-gold";
}

export function saveCanvasBackground(id: CanvasBackgroundId): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // fallback
  }
}

export function getCanvasBackground(id: CanvasBackgroundId): CanvasBackgroundOption {
  return (
    CANVAS_BACKGROUNDS.find((bg) => bg.id === id) ||
    CANVAS_BACKGROUNDS[0]
  );
}
