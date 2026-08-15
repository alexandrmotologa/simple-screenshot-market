import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project, Screen, Layer, ScreenSet } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import { DEFAULT_TEMPLATES } from "@/lib/templates";

interface ProjectStore {
  projects: Project[];
  createProject: (templateId: string | null, name: string, platforms?: { ios: boolean; android: boolean }) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => Project;
  getProject: (id: string) => Project | undefined;
  saveProjectThumbnail: (id: string, dataUrl: string) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],

      createProject: (templateId, name, platforms = { ios: true, android: true }) => {
        const template = templateId
          ? DEFAULT_TEMPLATES.find((t) => t.id === templateId)
          : null;

        const baseScreens = template?.screens && template.screens.length > 0
          ? template.screens
          : [
              {
                id: "default",
                background: {
                  type: "gradient",
                  gradient: {
                    direction: "to-br",
                    stops: [
                      { color: "#6366f1", position: 0 },
                      { color: "#8b5cf6", position: 100 },
                    ],
                  },
                },
                layers: [
                  {
                    id: "default-screenshot",
                    type: "screenshot",
                    x: 129,
                    y: 699,
                    width: 1032,
                    height: 1957,
                    rotation: 0,
                    opacity: 1,
                    objectFit: "cover",
                    cornerRadius: 55,
                    showDeviceFrame: true,
                    label: "Drop your screenshot here",
                  }
                ],
              } as any
            ];

        const generateScreens = (): Screen[] => {
          return baseScreens.map((ts, index) => ({
            id: nanoid(),
            name: `Screen ${index + 1}`,
            width: 1290,
            height: 2796,
            background: { ...ts.background },
            layers: (ts.layers ?? []).map((l: Layer) => ({
              ...l,
              id: nanoid(),
            })),
          }));
        };

        const screenSets: ScreenSet[] = [];

        if (platforms.ios) {
          screenSets.push({
            id: nanoid(),
            store: "ios",
            preset: {
              name: 'iPhone 6.7"',
              width: 1290,
              height: 2796,
              store: "ios",
              description: "App Store",
            },
            mockup: {
              device: "iphone-17-pro-max",
              color: "black",
              showFrame: true,
              showReflection: true,
              showShadow: true,
              frameType: "3d",
            },
            screens: generateScreens(),
          });
        }

        if (platforms.android) {
          screenSets.push({
            id: nanoid(),
            store: "android",
            preset: {
              name: 'Android 6.7"',
              width: 1290,
              height: 2796,
              store: "android",
              description: "Google Play — standard portrait",
            },
            mockup: {
              device: "pixel-10-pro-xl",
              color: "Obsidian",
              showFrame: true,
              showReflection: true,
              showShadow: true,
              frameType: "3d",
            },
            screens: generateScreens(),
          });
        }

        const project: Project = {
          id: nanoid(),
          name,
          templateId,
          screenSets,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({ projects: [project, ...state.projects] }));
        return project;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },

      duplicateProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        if (!project) throw new Error("Project not found");

        const duplicate: Project = {
          ...project,
          id: nanoid(),
          name: `${project.name} (Copy)`,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          screenSets: project.screenSets.map((ss) => ({
            ...ss,
            id: nanoid(),
            screens: ss.screens.map((s) => ({
              ...s,
              id: nanoid(),
              layers: s.layers.map((l) => ({ ...l, id: nanoid() })),
            })),
          })),
        };

        set((state) => ({
          projects: [duplicate, ...state.projects],
        }));
        return duplicate;
      },

      getProject: (id) => get().projects.find((p) => p.id === id),

      saveProjectThumbnail: (id, dataUrl) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, thumbnail: dataUrl } : p
          ),
        }));
      },
    }),
    {
      name: "snapframe-projects",
    }
  )
);
