"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScreenSetRow } from "@/components/editor/ScreenSetRow";
import { StoreListing } from "@/components/editor/StoreListing";

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
      className="flex-1 overflow-auto bg-[#0c0c10]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="min-w-fit px-12 py-10 space-y-12">
        {screenSets.map((ss) => (
          <div key={ss.id} className="space-y-3">
            <ScreenSetRow screenSet={ss} />
          </div>
        ))}

        {/* Add Platform Set — always visible */}
        <div className="flex flex-col gap-4 pt-4 pb-8">
          {!hasIOS && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => addScreenSet("ios")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-blue-500/40 text-blue-500 hover:bg-blue-500/5 text-[13px] font-medium transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add iOS set
              </button>
              <span className="text-muted-foreground/50">{'>'}</span>
              <span className="text-[13px] text-muted-foreground/70">Reference Existing App</span>
              <div className="flex items-center w-80 px-2.5 py-1.5 rounded-lg border border-border/60 bg-background focus-within:border-primary/50 transition-colors">
                <input
                  type="url"
                  placeholder="https://apps.apple.com/.../id123..."
                  className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/40 text-foreground"
                />
              </div>
              <button className="px-4 py-1.5 rounded-lg bg-[#807D78] text-white text-[13px] font-medium">
                Show Screenshots
              </button>
            </div>
          )}
          {!hasAndroid && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => addScreenSet("android")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-green-500/40 text-green-500 hover:bg-green-500/5 text-[13px] font-medium transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Android set
              </button>
              <span className="text-muted-foreground/50">{'>'}</span>
              <span className="text-[13px] text-muted-foreground/70">Reference Existing App</span>
              <div className="flex items-center w-80 px-2.5 py-1.5 rounded-lg border border-border/60 bg-background focus-within:border-primary/50 transition-colors">
                <input
                  type="url"
                  placeholder="https://play.google.com/store/apps/details?id=..."
                  className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/40 text-foreground"
                />
              </div>
              <button className="px-4 py-1.5 rounded-lg bg-[#807D78] text-white text-[13px] font-medium">
                Show Screenshots
              </button>
            </div>
          )}
          {hasIOS && hasAndroid && (
            <p className="text-xs text-muted-foreground/50 italic">Both iOS and Android sets added</p>
          )}
        </div>

        <StoreListing />
      </div>
    </div>
  );
}

// ── Reference App Row ─────────────────────────────────────────────────────────
function ReferenceAppRow({ screenSet }: { screenSet: import("@/lib/types").ScreenSet }) {
  const { updateMockup } = useEditorStore();
  const [value, setValue] = useState(screenSet.referenceUrl ?? "");

  // Sync external url to screenSet via a hack: store in mockup for now
  // (a proper store action would be better but avoids store re-plumbing for now)
  const handleBlur = () => {
    // Store referenceUrl on the screenSet directly via a cast
    // This is a display-only field for now; persistence handled by projectStore sync
    (screenSet as import("@/lib/types").ScreenSet).referenceUrl = value.trim();
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
