import { create } from "zustand";
import { Layer, Screen, ScreenSet, Background, MockupSettings } from "@/lib/types";
import { nanoid } from "@/lib/utils";

interface HistoryEntry {
  screenSets: ScreenSet[];
}

interface EditorStore {
  // Current project context
  projectId: string | null;
  screenSets: ScreenSet[];

  // Active selection
  activeSetId: string | null;
  activeScreenId: string | null;
  activeLayerId: string | null;

  // UI state
  zoom: number;
  showGrid: boolean;
  showGuides: boolean;

  // History (undo/redo)
  history: HistoryEntry[];
  historyIndex: number;

  // Actions: project loading
  loadProject: (projectId: string, screenSets: ScreenSet[]) => void;
  getActiveSet: () => ScreenSet | undefined;
  getActiveScreen: () => Screen | undefined;
  getActiveLayer: () => Layer | undefined;

  // Actions: selection
  setActiveSet: (id: string) => void;
  setActiveScreen: (id: string) => void;
  setActiveLayer: (id: string | null) => void;

  // Actions: screens
  addScreen: (setId: string) => void;
  deleteScreen: (setId: string, screenId: string) => void;
  updateScreen: (setId: string, screenId: string, updates: Partial<Screen>) => void;
  reorderScreens: (setId: string, screenIds: string[]) => void;

  // Actions: background
  updateBackground: (setId: string, screenId: string, background: Background) => void;
  updateScreenBackground: (setId: string, screenId: string, background: Background) => void;
  updateAllScreensBackground: (setId: string, background: Background) => void;

  // Actions: layers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addLayer: (setId: string, screenId: string, layer: any) => void;
  updateLayer: (setId: string, screenId: string, layerId: string, updates: Partial<Layer>) => void;
  deleteLayer: (setId: string, screenId: string, layerId: string) => void;
  reorderLayers: (setId: string, screenId: string, layerIds: string[]) => void;
  duplicateLayer: (setId: string, screenId: string, layerId: string) => void;

  // Actions: mockup
  updateMockup: (setId: string, updates: Partial<MockupSettings>) => void;
  // Actions: device
  updateDevice: (setId: string, deviceId: string, preset: { width: number; height: number; name: string }) => void;

  // Actions: UI
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleGuides: () => void;

  // Actions: history
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushHistory: () => void;

  // Actions: templates
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyTemplate: (setId: string, template: any) => void;

  // Actions: screen sets
  addScreenSet: (store: "ios" | "android") => void;
  removeScreenSet: (setId: string) => void;
}

const MAX_HISTORY = 50;

export const useEditorStore = create<EditorStore>((set, get) => ({
  projectId: null,
  screenSets: [],
  activeSetId: null,
  activeScreenId: null,
  activeLayerId: null,
  zoom: 0.65,
  showGrid: false,
  showGuides: true,
  history: [],
  historyIndex: -1,

  loadProject: (projectId, screenSets) => {
    // ── Auto-migrate old Android screens to standard 1290×2796 (same as iOS) ─
    const STD_W = 1290;
    const STD_H = 2796;
    const migratedSets = screenSets.map((ss) => {
      if (ss.store !== "android") return ss;
      // Already correct — skip
      if (ss.screens.every((s) => s.width === STD_W && s.height === STD_H)) return ss;
      return {
        ...ss,
        preset: { ...ss.preset, width: STD_W, height: STD_H },
        screens: ss.screens.map((s) => {
          if (s.width === STD_W && s.height === STD_H) return s;
          // Scale layer positions proportionally
          const scaleX = STD_W / s.width;
          const scaleY = STD_H / s.height;
          return {
            ...s,
            width: STD_W,
            height: STD_H,
            layers: s.layers.map((l) => ({
              ...l,
              x: Math.round(l.x * scaleX),
              y: Math.round(l.y * scaleY),
              width: Math.round(l.width * scaleX),
              height: Math.round(l.height * scaleY),
            })),
          };
        }),
      };
    });

    const firstSet = migratedSets[0];
    const firstScreen = firstSet?.screens[0];
    set({
      projectId,
      screenSets: migratedSets,
      activeSetId: firstSet?.id ?? null,
      activeScreenId: firstScreen?.id ?? null,
      activeLayerId: null,
      history: [{ screenSets: migratedSets }],
      historyIndex: 0,
    });
  },

  getActiveSet: () => {
    const { screenSets, activeSetId } = get();
    return screenSets.find((s) => s.id === activeSetId);
  },

  getActiveScreen: () => {
    const { activeScreenId } = get();
    const set = get().getActiveSet();
    return set?.screens.find((s) => s.id === activeScreenId);
  },

  getActiveLayer: () => {
    const { activeLayerId } = get();
    const screen = get().getActiveScreen();
    return screen?.layers.find((l) => l.id === activeLayerId);
  },

  setActiveSet: (id) => set({ activeSetId: id, activeLayerId: null }),
  setActiveScreen: (id) => set({ activeScreenId: id, activeLayerId: null }),
  setActiveLayer: (id) => set({ activeLayerId: id }),

  addScreen: (setId) => {
    get().pushHistory();
    set((state) => {
      const sets = state.screenSets.map((ss) => {
        if (ss.id !== setId) return ss;
        const newScreen: Screen = {
          id: nanoid(),
          name: `Screen ${ss.screens.length + 1}`,
          width: ss.preset.width,
          height: ss.preset.height,
          background: { type: "solid", color: "#6366f1" },
          layers: [],
        };
        return { ...ss, screens: [...ss.screens, newScreen] };
      });
      const newScreen = sets.find((s) => s.id === setId)?.screens.slice(-1)[0];
      return {
        screenSets: sets,
        activeScreenId: newScreen?.id ?? state.activeScreenId,
      };
    });
  },

  deleteScreen: (setId, screenId) => {
    get().pushHistory();
    set((state) => {
      const sets = state.screenSets.map((ss) => {
        if (ss.id !== setId) return ss;
        const screens = ss.screens.filter((s) => s.id !== screenId);
        return { ...ss, screens };
      });
      const activeSet = sets.find((s) => s.id === setId);
      const newActiveScreen =
        activeSet?.screens.find((s) => s.id !== screenId) ??
        activeSet?.screens[0];
      return {
        screenSets: sets,
        activeScreenId:
          state.activeScreenId === screenId
            ? (newActiveScreen?.id ?? null)
            : state.activeScreenId,
      };
    });
  },

  updateScreen: (setId, screenId, updates) => {
    set((state) => ({
      screenSets: state.screenSets.map((ss) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              screens: ss.screens.map((s) =>
                s.id !== screenId ? s : { ...s, ...updates }
              ),
            }
      ),
    }));
  },

  reorderScreens: (setId, screenIds) => {
    set((state) => ({
      screenSets: state.screenSets.map((ss) => {
        if (ss.id !== setId) return ss;
        const reordered = screenIds.map(
          (id) => ss.screens.find((s) => s.id === id)!
        );
        return { ...ss, screens: reordered };
      }),
    }));
  },

  updateBackground: (setId, screenId, background) => {
    get().pushHistory();
    get().updateScreen(setId, screenId, { background });
  },

  updateScreenBackground: (setId, screenId, background) => {
    get().pushHistory();
    get().updateScreen(setId, screenId, { background });
  },

  updateAllScreensBackground: (setId, background) => {
    get().pushHistory();
    set((state) => ({
      screenSets: state.screenSets.map((ss) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              screens: ss.screens.map((s) => ({ ...s, background })),
            }
      ),
    }));
  },

  addLayer: (setId, screenId, layer) => {
    get().pushHistory();
    const newLayer = { ...layer, id: nanoid() } as Layer;
    set((state) => ({
      screenSets: state.screenSets.map((ss) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              screens: ss.screens.map((s) =>
                s.id !== screenId
                  ? s
                  : { ...s, layers: [...s.layers, newLayer] }
              ),
            }
      ),
      activeLayerId: newLayer.id,
    }));
  },

  updateLayer: (setId, screenId, layerId, updates) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set((state: any) => ({
      screenSets: state.screenSets.map((ss: any) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              screens: ss.screens.map((s: any) =>
                s.id !== screenId
                  ? s
                  : {
                      ...s,
                      layers: s.layers.map((l: any) =>
                        l.id !== layerId ? l : { ...l, ...updates }
                      ),
                    }
              ),
            }
      ),
    }));
  },

  deleteLayer: (setId, screenId, layerId) => {
    get().pushHistory();
    set((state) => ({
      screenSets: state.screenSets.map((ss) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              screens: ss.screens.map((s) =>
                s.id !== screenId
                  ? s
                  : { ...s, layers: s.layers.filter((l) => l.id !== layerId) }
              ),
            }
      ),
      activeLayerId:
        state.activeLayerId === layerId ? null : state.activeLayerId,
    }));
  },

  reorderLayers: (setId, screenId, layerIds) => {
    set((state) => ({
      screenSets: state.screenSets.map((ss) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              screens: ss.screens.map((s) => {
                if (s.id !== screenId) return s;
                const reordered = layerIds.map(
                  (id) => s.layers.find((l) => l.id === id)!
                );
                return { ...s, layers: reordered };
              }),
            }
      ),
    }));
  },

  duplicateLayer: (setId, screenId, layerId) => {
    get().pushHistory();
    set((state) => ({
      screenSets: state.screenSets.map((ss) => {
        if (ss.id !== setId) return ss;
        return {
          ...ss,
          screens: ss.screens.map((s) => {
            if (s.id !== screenId) return s;
            const layer = s.layers.find((l) => l.id === layerId);
            if (!layer) return s;
            const duplicate = { ...layer, id: nanoid(), x: layer.x + 10, y: layer.y + 10 } as Layer;
            const idx = s.layers.findIndex((l) => l.id === layerId);
            const newLayers = [...s.layers];
            newLayers.splice(idx + 1, 0, duplicate);
            return { ...s, layers: newLayers };
          }),
        };
      }),
    }));
  },

  updateMockup: (setId, updates) => {
    get().pushHistory();
    const DEFAULT_MOCKUP: MockupSettings = {
      device: "iphone-16-pro",
      color: "black",
      showFrame: true,
      showReflection: false,
      showShadow: true,
    };
    set((state) => ({
      screenSets: state.screenSets.map((ss) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              mockup: { ...DEFAULT_MOCKUP, ...ss.mockup, ...updates },
            }
      ),
    }));
  },

  updateDevice: (setId, deviceId, preset) => {
    set((state) => ({
      screenSets: state.screenSets.map((ss) =>
        ss.id !== setId
          ? ss
          : {
              ...ss,
              deviceId,
              preset: { ...ss.preset, width: preset.width, height: preset.height, name: preset.name },
            }
      ),
    }));
  },

  setZoom: (zoom) => set({ zoom: Math.min(2, Math.max(0.1, zoom)) }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleGuides: () => set((state) => ({ showGuides: !state.showGuides })),

  pushHistory: () => {
    const { screenSets, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ screenSets: JSON.parse(JSON.stringify(screenSets)) });
    if (newHistory.length > MAX_HISTORY) newHistory.shift();
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    set({ screenSets: history[newIndex].screenSets, historyIndex: newIndex });
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    set({ screenSets: history[newIndex].screenSets, historyIndex: newIndex });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  applyTemplate: (setId, template) => {
    const { screenSets, pushHistory } = get();
    pushHistory();
    set({
      screenSets: screenSets.map((ss) => {
        if (ss.id !== setId) return ss;
        const existingSrcs = ss.screens.flatMap((s) =>
          s.layers.filter((l) => l.type === "screenshot" && (l as any).src).map((l) => (l as any).src)
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newScreens = template.screens.map((tScreen: any, idx: number) => ({
          id: nanoid(),
          name: tScreen.name ?? `Screen ${idx + 1}`,
          width: ss.preset.width,
          height: ss.preset.height,
          caption: "",
          background: tScreen.background ?? { type: "solid", color: "#1a1a2e" },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          layers: (tScreen.layers ?? []).map((l: any) => {
            const id = nanoid();
            if (l.type === "screenshot" && existingSrcs[idx]) {
              return { ...l, id, src: existingSrcs[idx] };
            }
            return { ...l, id };
          }),
        }));
        return { ...ss, screens: newScreens };
      }),
    });
  },

  addScreenSet: (store) => {
    const { screenSets, pushHistory } = get();
    pushHistory();
    const isIOS = store === "ios";
    const newId = nanoid();
    const screenId = nanoid();
    const newSet: ScreenSet = {
      id: newId,
      name: isIOS ? "App Store (iOS)" : "Google Play (Android)",
      store,
      deviceId: isIOS ? "iphone-16-pro-max" : "pixel-9-pro-xl",
      preset: {
        name: isIOS ? 'iPhone 6.9"' : 'Android 6.7"',
        width: 1290,
        height: 2796,
        store,
        description: isIOS ? "App Store" : "Google Play",
      },
      mockup: {
        device: isIOS ? "iphone-16-pro-max" : "pixel-9-pro-xl",
        color: "Black",
        showFrame: true,
        showReflection: false,
        showShadow: true,
        squircle: false,
      },
      screens: [
        {
          id: screenId,
          name: "Screen 1",
          width: 1290,
          height: 2796,
          caption: "",
          background: { type: "gradient", gradient: { direction: "to-br", stops: [{ color: "#6366f1", position: 0 }, { color: "#8b5cf6", position: 100 }] } },
          layers: [],
        },
      ],
    };
    set({
      screenSets: [...screenSets, newSet],
      activeSetId: newId,
      activeScreenId: screenId,
    });
  },

  removeScreenSet: (setId) => {
    const { screenSets, activeSetId, pushHistory } = get();
    if (screenSets.length <= 1) return; // keep at least one set
    pushHistory();
    const newSets = screenSets.filter((ss) => ss.id !== setId);
    const newActiveSet = activeSetId === setId ? newSets[0] : newSets.find((ss) => ss.id === activeSetId);
    set({
      screenSets: newSets,
      activeSetId: newActiveSet?.id ?? null,
      activeScreenId: newActiveSet?.screens[0]?.id ?? null,
    });
  },
}));
