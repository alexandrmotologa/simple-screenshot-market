"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Apple, Smartphone } from "lucide-react";
import { findModel } from "@/lib/deviceModels";
import { ALL_DEVICES } from "@/lib/devices";

export function PlatformsPanel() {
  const { screenSets, addScreenSet, removeScreenSet } = useEditorStore();

  const iosSet = screenSets.find((s) => s.store === "ios");
  const androidSet = screenSets.find((s) => s.store === "android");

  const hasIOS = !!iosSet;
  const hasAndroid = !!androidSet;

  const handleToggle = (platform: "ios" | "android", currentStatus: boolean) => {
    if (currentStatus) {
      // Trying to remove
      if (screenSets.length <= 1) {
        alert("You must have at least one platform active.");
        return;
      }
      const setToRemove = screenSets.find((s) => s.store === platform);
      if (setToRemove) {
        removeScreenSet(setToRemove.id);
      }
    } else {
      // Trying to add
      addScreenSet(platform);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold mb-1">Platforms</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Enable or disable platforms for this project. Disabling a platform will remove its screens.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-background flex items-center justify-center text-foreground shadow-sm">
                  <Apple className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">iOS (App Store)</span>
                  <span className="text-[10px] text-muted-foreground">{iosSet?.mockup?.device ? ALL_DEVICES.find(d => d.id === iosSet.mockup!.device)?.name : findModel(iosSet?.deviceId || "")?.name || "iPhone"}</span>
                </div>
              </div>
              <Switch
                checked={hasIOS}
                onCheckedChange={() => handleToggle("ios", hasIOS)}
              />
            </div>

            <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-background flex items-center justify-center text-foreground shadow-sm">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Android (Google Play)</span>
                  <span className="text-[10px] text-muted-foreground">{androidSet?.mockup?.device ? ALL_DEVICES.find(d => d.id === androidSet.mockup!.device)?.name : findModel(androidSet?.deviceId || "")?.name || "Android"}</span>
                </div>
              </div>
              <Switch
                checked={hasAndroid}
                onCheckedChange={() => handleToggle("android", hasAndroid)}
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
