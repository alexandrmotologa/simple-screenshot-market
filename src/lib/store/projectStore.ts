import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project, Screen, Layer, ScreenSet } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import { ALL_TEMPLATES, BLANK_TEMPLATE } from "@/lib/templates";

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
        const ID_ALIASES: Record<string, string> = {
          "premium-dark": "template-28",
          "minimal-light": "template-29",
          "vibrant-playful": "template-30",
          "professional-blue": "template-31",
          "neon-cyber": "template-32",
          "dynamic-flow": "template-33",
        };
        const resolvedId = templateId ? (ID_ALIASES[templateId] ?? templateId) : null;
        const template = resolvedId
          ? ALL_TEMPLATES.find((t) => t.id === resolvedId)
          : null;

        const baseScreens = template?.screens && template.screens.length > 0
          ? template.screens
          : BLANK_TEMPLATE.screens;

        const generateScreens = (): Screen[] => {
          return baseScreens.map((ts: any, index: number) => ({
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
              showShadow: false,
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
              showShadow: false,
              frameType: "3d",
            },
            screens: generateScreens(),
          });
        }

        // Free tier project limit check (Max 3 projects for Free/Guest)
        try {
          const { useAuthStore } = require("@/lib/store/authStore");
          const { isPro, setUpgradeModalOpen } = useAuthStore.getState();
          if (!isPro && get().projects.length >= 3) {
            const { toast } = require("@/lib/store/toastStore");
            setUpgradeModalOpen(true);
            toast.info("Free plan includes up to 3 local projects. Upgrade to SnapFrame Pro for unlimited projects & multi-device cloud sync!");
            throw new Error("Free project limit reached (3 max).");
          }
        } catch (e: any) {
          if (e.message?.includes("Free project limit")) throw e;
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

        // Cloud sync if Pro subscriber
        try {
          const { useAuthStore } = require("@/lib/store/authStore");
          const { isPro, user } = useAuthStore.getState();
          if (isPro && user?.uid) {
            const { saveProjectToCloud } = require("@/lib/cloudProjectSync");
            saveProjectToCloud(user.uid, project);
          }
        } catch {}

        return project;
      },

      updateProject: (id, updates) => {
        let modifiedProject: Project | undefined;
        set((state) => {
          const updatedList = state.projects.map((p) => {
            if (p.id === id) {
              modifiedProject = { ...p, ...updates, updatedAt: Date.now() };
              return modifiedProject;
            }
            return p;
          });
          return { projects: updatedList };
        });

        // Cloud sync if Pro subscriber
        try {
          if (modifiedProject) {
            const { useAuthStore } = require("@/lib/store/authStore");
            const { isPro, user } = useAuthStore.getState();
            if (isPro && user?.uid) {
              const { saveProjectToCloud } = require("@/lib/cloudProjectSync");
              saveProjectToCloud(user.uid, modifiedProject);
            }
          }
        } catch {}
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));

        // Cloud sync if Pro subscriber
        try {
          const { useAuthStore } = require("@/lib/store/authStore");
          const { isPro, user } = useAuthStore.getState();
          if (isPro && user?.uid) {
            const { deleteProjectFromCloud } = require("@/lib/cloudProjectSync");
            deleteProjectFromCloud(user.uid, id);
          }
        } catch {}
      },

      duplicateProject: (id) => {
        // Free tier project limit check
        try {
          const { useAuthStore } = require("@/lib/store/authStore");
          const { isPro, setUpgradeModalOpen } = useAuthStore.getState();
          if (!isPro && get().projects.length >= 3) {
            const { toast } = require("@/lib/store/toastStore");
            setUpgradeModalOpen(true);
            toast.info("Free plan includes up to 3 local projects. Upgrade to SnapFrame Pro for unlimited projects & multi-device cloud sync!");
            throw new Error("Free project limit reached (3 max).");
          }
        } catch (e: any) {
          if (e.message?.includes("Free project limit")) throw e;
        }

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

        // Cloud sync if Pro subscriber
        try {
          const { useAuthStore } = require("@/lib/store/authStore");
          const { isPro, user } = useAuthStore.getState();
          if (isPro && user?.uid) {
            const { saveProjectToCloud } = require("@/lib/cloudProjectSync");
            saveProjectToCloud(user.uid, duplicate);
          }
        } catch {}

        return duplicate;
      },

      getProject: (id) => get().projects.find((p) => p.id === id),

      saveProjectThumbnail: (id, dataUrl) => {
        let modifiedProject: Project | undefined;
        set((state) => {
          const updatedList = state.projects.map((p) => {
            if (p.id === id) {
              modifiedProject = { ...p, thumbnail: dataUrl };
              return modifiedProject;
            }
            return p;
          });
          return { projects: updatedList };
        });

        // Cloud sync if Pro subscriber
        try {
          if (modifiedProject) {
            const { useAuthStore } = require("@/lib/store/authStore");
            const { isPro, user } = useAuthStore.getState();
            if (isPro && user?.uid) {
              const { saveProjectToCloud } = require("@/lib/cloudProjectSync");
              saveProjectToCloud(user.uid, modifiedProject);
            }
          }
        } catch {}
      },
    }),
    {
      name: "snapframe-projects",
    }
  )
);
