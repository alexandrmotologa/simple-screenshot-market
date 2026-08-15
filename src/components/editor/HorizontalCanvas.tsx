"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScreenSetRow } from "@/components/editor/ScreenSetRow";

export function HorizontalCanvas() {
  const { screenSets, zoom, setZoom, addScreenSet, updateScreen } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);

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

  const hasIOS = screenSets.some((ss) => ss.store === "ios");
  const hasAndroid = screenSets.some((ss) => ss.store === "android");

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto bg-background"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.9,
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
