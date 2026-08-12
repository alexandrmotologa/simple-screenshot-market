import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project, Screen, Layer, ScreenSet, Background, MockupSettings } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import { DEFAULT_TEMPLATES } from "@/lib/templates";

interface ProjectStore {
  projects: Project[];
  createProject: (templateId: string | null, name: string) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => Project;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],

      createProject: (templateId, name) => {
        const template = templateId
          ? DEFAULT_TEMPLATES.find((t) => t.id === templateId)
          : null;

        const defaultIosScreen: Screen = {
          id: nanoid(),
          name: "Screen 1",
          width: 1290,
          height: 2796,
          background: template?.screens[0]?.background ?? {
            type: "gradient",
            gradient: {
              direction: "to-br",
              stops: [
                { color: "#6366f1", position: 0 },
                { color: "#8b5cf6", position: 100 },
              ],
            },
          },
          layers: (template?.screens[0]?.layers ?? []).map((l) => ({
            ...l,
            id: nanoid(),
          })) as Layer[],
        };

        const iosSet: ScreenSet = {
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
            device: "iphone-16-pro",
            color: "black",
            showFrame: true,
            showReflection: false,
            showShadow: true,
          },
          screens: [defaultIosScreen],
        };

        const defaultAndroidScreen: Screen = {
          id: nanoid(),
          name: "Screen 1",
          width: 1290,
          height: 2796,
          background: template?.screens[0]?.background ?? {
            type: "gradient",
            gradient: {
              direction: "to-br",
              stops: [
                { color: "#6366f1", position: 0 },
                { color: "#8b5cf6", position: 100 },
              ],
            },
          },
          layers: (template?.screens[0]?.layers ?? []).map((l) => ({
            ...l,
            id: nanoid(),
          })) as Layer[],
        };

        const androidSet: ScreenSet = {
          id: nanoid(),
          store: "android",
          deviceId: "pixel-9-pro-xl",
          preset: {
            name: 'Android 6.7"',
            width: 1290,
            height: 2796,
            store: "android",
            description: "Google Play — standard portrait",
          },
          mockup: {
            device: "pixel-9-pro-xl",
            color: "black",
            showFrame: true,
            showReflection: false,
            showShadow: true,
          },
          screens: [defaultAndroidScreen],
        };


        const project: Project = {
          id: nanoid(),
          name,
          templateId,
          screenSets: [iosSet, androidSet],
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
    }),
    {
      name: "snapframe-projects",
    }
  )
);
