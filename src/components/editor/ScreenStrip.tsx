"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { cn } from "@/lib/utils";
import { ScreenThumbnailCanvas } from "@/components/editor/ScreenThumbnailCanvas";
import { AppleStoreIcon, GooglePlayIcon, APP_STORE_LABEL, GOOGLE_PLAY_LABEL } from "@/components/icons/StoreIcons";

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

  const handleSelectScreen = (setId: string, screenId: string) => {
    setActiveSet(setId);
    setActiveScreen(screenId);

    // Scroll to the screen card in the main canvas if found
    const targetCard = document.querySelector(`[data-screen-id="${screenId}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  return (
    <div className="h-28 border-t border-border/60 bg-card/70 backdrop-blur-sm flex items-center gap-0 overflow-x-auto shrink-0 px-4 z-20">
      {screenSets.map((ss) => {
        const isIOS = ss.store === "ios";
        const isSetActive = activeSetId === ss.id;

        return (
          <div key={ss.id} className="flex items-center gap-2 mr-6 shrink-0">
            {/* Store Badge */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-lg cursor-pointer transition-all border shadow-xs",
                  isSetActive
                    ? isIOS
                      ? "bg-blue-500/15 text-blue-400 border-blue-500/40 ring-1 ring-blue-500/30"
                      : "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 ring-1 ring-emerald-500/30"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground border-border/50 hover:bg-secondary"
                )}
                onClick={() => {
                  setActiveSet(ss.id);
                  if (ss.screens[0]) setActiveScreen(ss.screens[0].id);
                }}
                title={isIOS ? APP_STORE_LABEL : GOOGLE_PLAY_LABEL}
              >
                {isIOS ? (
                  <AppleStoreIcon className="w-3 h-3 shrink-0" />
                ) : (
                  <GooglePlayIcon className="w-3 h-3 shrink-0" />
                )}
                <span>{isIOS ? "iOS" : "Android"}</span>
              </button>
            </div>

            {/* Screen live thumbnails */}
            <div className="flex items-center gap-2.5">
              {ss.screens.map((screen, idx) => {
                const isActive = activeSetId === ss.id && activeScreenId === screen.id;

                return (
                  <button
                    key={screen.id}
                    id={`screen-thumb-${screen.id}`}
                    type="button"
                    title={screen.name || `Screen ${idx + 1}`}
                    onClick={() => handleSelectScreen(ss.id, screen.id)}
                    className={cn(
                      "group relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 bg-background shadow-xs",
                      "w-[42px] h-[82px]",
                      isActive
                        ? "ring-2 ring-primary shadow-md shadow-primary/30 scale-105 border border-primary/50"
                        : "border border-border/70 hover:border-primary/50 hover:scale-105"
                    )}
                  >
                    {/* Live Rendered Canvas Thumbnail */}
                    <div className="w-full h-full pointer-events-none overflow-hidden">
                      <ScreenThumbnailCanvas
                        screen={screen}
                        screenSet={ss}
                        width={42}
                        height={82}
                      />
                    </div>

                    {/* Glassmorphic Screen Number Badge */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/60 backdrop-blur-xs py-0.5 pointer-events-none">
                      <span className="text-[9px] text-white/90 font-semibold font-mono">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Delete Screen Button */}
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
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 hover:bg-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                        title="Delete screen"
                      >
                        <Trash2 className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Add Screen Button */}
              {ss.screens.length < 10 && (
                <button
                  id={`add-screen-${ss.id}`}
                  type="button"
                  title="Add Screen"
                  onClick={() => addScreen(ss.id)}
                  className="w-[42px] h-[82px] rounded-xl border-2 border-dashed border-border/80 hover:border-primary/60 hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all shrink-0 shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
