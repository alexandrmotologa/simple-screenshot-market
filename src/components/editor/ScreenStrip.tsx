"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { backgroundToCSS } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ScreenStrip() {
  const {
    screenSets,
    activeSetId,
    activeScreenId,
    setActiveSet,
    setActiveScreen,
    addScreen,
    deleteScreen,
  } = useEditorStore();

  return (
    <div className="h-28 border-t border-border/60 bg-card/50 flex items-center gap-0 overflow-x-auto shrink-0 px-4">
      {screenSets.map((ss) => (
        <div key={ss.id} className="flex items-center gap-2 mr-6">
          {/* Store label */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md cursor-pointer transition-colors",
                activeSetId === ss.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => {
                setActiveSet(ss.id);
                if (ss.screens[0]) setActiveScreen(ss.screens[0].id);
              }}
            >
              {ss.store === "ios" ? "iOS" : "Android"}
            </span>
          </div>

          {/* Screen thumbnails */}
          <div className="flex items-center gap-2">
            {ss.screens.map((screen, idx) => {
              const isActive =
                activeSetId === ss.id && activeScreenId === screen.id;
              const bgCSS = backgroundToCSS(screen.background);

              return (
                <button
                  key={screen.id}
                  id={`screen-thumb-${screen.id}`}
                  type="button"
                  title={screen.name}
                  onClick={() => {
                    setActiveSet(ss.id);
                    setActiveScreen(screen.id);
                  }}
                  className={cn(
                    "group relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-150",
                    "w-10 h-[72px]",
                    isActive
                      ? "ring-2 ring-primary shadow-lg shadow-primary/30 scale-105"
                      : "ring-1 ring-border hover:ring-primary/40 hover:scale-105"
                  )}
                >
                  <div
                    className="w-full h-full"
                    style={{ background: bgCSS, backgroundSize: "cover" }}
                  />
                  {/* Screen number badge */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/50 py-0.5">
                    <span className="text-[9px] text-white/80 font-medium">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Delete button */}
                  {ss.screens.length > 1 && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteScreen(ss.id, screen.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          deleteScreen(ss.id, screen.id);
                        }
                      }}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded bg-black/60 hover:bg-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Add screen button */}
            {ss.screens.length < 8 && (
              <button
                id={`add-screen-${ss.id}`}
                type="button"
                title="Add Screen"
                onClick={() => addScreen(ss.id)}
                className="w-10 h-[72px] rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
