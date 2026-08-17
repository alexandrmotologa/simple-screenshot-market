"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScreenSetRow } from "@/components/editor/ScreenSetRow";
import { cn } from "@/lib/utils";

export function HorizontalCanvas() {
  const { screenSets, zoom, setZoom } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStateRef = useRef<{
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);

  // Ctrl+Scroll to zoom
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        setZoom(zoom + delta);
      }
    },
    [zoom, setZoom]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Pan / Drag-to-scroll handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only drag on left click
    if (e.button !== 0) return;

    // Do not initiate pan if clicking on a screen card, button, input, select, textarea, etc.
    const target = e.target as HTMLElement | null;
    if (
      target?.closest(
        "[data-screen-card], [data-no-pan], button, input, textarea, select, [role='button'], a"
      )
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    setIsPanning(true);
    panStateRef.current = {
      startX: e.pageX,
      startY: e.pageY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!panStateRef.current || !containerRef.current) return;
      const dx = moveEvent.pageX - panStateRef.current.startX;
      const dy = moveEvent.pageY - panStateRef.current.startY;
      containerRef.current.scrollLeft = panStateRef.current.scrollLeft - dx;
      containerRef.current.scrollTop = panStateRef.current.scrollTop - dy;
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      panStateRef.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className={cn(
        "flex-1 overflow-auto bg-background transition-colors text-foreground/15",
        isPanning ? "cursor-grabbing select-none" : "cursor-grab"
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, currentColor 1.2px, transparent 1.2px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="min-w-fit px-12 py-10 space-y-12">
        {screenSets.map((ss) => (
          <div key={ss.id} className="space-y-3">
            <ScreenSetRow screenSet={ss} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reference App Row ─────────────────────────────────────────────────────────
function ReferenceAppRow({ screenSet }: { screenSet: import("@/lib/types").ScreenSet }) {
  const { updateScreenSet } = useEditorStore();
  const [value, setValue] = useState(screenSet.referenceUrl ?? "");

  const handleBlur = () => {
    updateScreenSet(screenSet.id, { referenceUrl: value.trim() });
  };

  const isIOS = screenSet.store === "ios";
  const placeholder = isIOS
    ? "https://apps.apple.com/app/id..."
    : "https://play.google.com/store/apps/details?id=...";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground whitespace-nowrap">Reference Existing App</span>
      <div className="flex items-center flex-1 max-w-sm gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/40 border border-border/30 hover:border-border/60 transition-colors">
        <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
        <input
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-xs outline-none text-muted-foreground placeholder:text-muted-foreground/50 focus:text-foreground"
        />
      </div>
    </div>
  );
}
