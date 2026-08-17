import { create } from "zustand";

export interface ToastItem {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title?: string;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 3000;

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

export const toast = {
  success: (message: string, title?: string) =>
    useToastStore.getState().addToast({ type: "success", message, title }),
  info: (message: string, title?: string) =>
    useToastStore.getState().addToast({ type: "info", message, title }),
  warning: (message: string, title?: string) =>
    useToastStore.getState().addToast({ type: "warning", message, title }),
  error: (message: string, title?: string) =>
    useToastStore.getState().addToast({ type: "error", message, title }),
};
