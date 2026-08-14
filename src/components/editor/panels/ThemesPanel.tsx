"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { THEMES } from "@/lib/themes";
import { ThemeId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function ThemesPanel() {
  const { themeId, applyThemeToProject } = useEditorStore();

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 gap-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Color Themes</h3>
        <p className="text-xs text-muted-foreground">
          Apply a global color palette to your entire project. This will update the backgrounds and text colors on all screens.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.values(THEMES).map((theme) => {
          const isActive = themeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => applyThemeToProject(theme.id as ThemeId)}
              className={cn(
                "relative group rounded-xl border text-left flex flex-col overflow-hidden transition-all",
                isActive ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
              )}
            >
              {/* Color preview bar */}
              <div 
                className="h-16 w-full flex items-center justify-center relative p-2"
                style={{ backgroundColor: theme.bg }}
              >
                <span 
                  className="text-xl font-bold tracking-tight" 
                  style={{ color: theme.fg }}
                >
                  Aa
                </span>
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 bg-primary rounded-full p-0.5">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              {/* Label */}
              <div className="p-2 bg-card border-t border-border/50 text-xs font-medium truncate">
                {theme.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
