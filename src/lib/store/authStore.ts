import { create } from "zustand";
import {
  User,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  linkWithPopup,
} from "firebase/auth";
import { auth, googleProvider, githubProvider, isFirebaseConfigured } from "@/lib/firebase";
import { toast } from "@/lib/store/toastStore";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authError: string | null;
  isInitialized: boolean;

  setAuthModalOpen: (open: boolean) => void;
  clearError: () => void;
  signInWithGoogle: () => Promise<User | null>;
  signInWithGithub: () => Promise<User | null>;
  signInAnonymous: () => Promise<User | null>;
  linkWithGoogle: () => Promise<User | null>;
  linkWithGithub: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Initialize listener on auth state changes if Firebase is configured
  if (typeof window !== "undefined" && isFirebaseConfigured && auth) {
    onAuthStateChanged(auth, (currentUser) => {
      set({
        user: currentUser,
        isLoading: false,
        isInitialized: true,
      });
    });
  }

  return {
    user: null,
    isLoading: isFirebaseConfigured,
    isAuthModalOpen: false,
    authError: null,
    isInitialized: false,

    setAuthModalOpen: (open) => set({ isAuthModalOpen: open, authError: null }),
    clearError: () => set({ authError: null }),

    signInWithGoogle: async () => {
      if (!auth || !googleProvider) {
        toast.error("Firebase Auth is not configured. Please check your credentials.");
        return null;
      }
      try {
        set({ isLoading: true, authError: null });
        const result = await signInWithPopup(auth, googleProvider);
        set({ user: result.user, isAuthModalOpen: false, isLoading: false });
        toast.success(`Welcome back, ${result.user.displayName || "Creator"}!`);
        return result.user;
      } catch (error: any) {
        console.error("Google Sign-In Error:", error);
        let message = error.message || "Failed to sign in with Google";
        if (error.code === "auth/popup-closed-by-user") {
          message = "Sign-in was cancelled.";
        } else if (error.code === "auth/account-exists-with-different-credential") {
          message = "An account already exists with this email address.";
        } else if (error.code === "auth/configuration-not-found") {
          message = "Google Sign-in is not enabled yet in Firebase Console.";
        }
        set({ authError: message, isLoading: false });
        toast.error(message);
        return null;
      }
    },

    signInWithGithub: async () => {
      if (!auth || !githubProvider) {
        toast.error("Firebase Auth is not configured. Please check your credentials.");
        return null;
      }
      try {
        set({ isLoading: true, authError: null });
        const result = await signInWithPopup(auth, githubProvider);
        set({ user: result.user, isAuthModalOpen: false, isLoading: false });
        toast.success(`Welcome back, ${result.user.displayName || "Developer"}!`);
        return result.user;
      } catch (error: any) {
        console.error("GitHub Sign-In Error:", error);
        let message = error.message || "Failed to sign in with GitHub";
        if (error.code === "auth/popup-closed-by-user") {
          message = "Sign-in was cancelled.";
        } else if (error.code === "auth/configuration-not-found") {
          message = "GitHub Sign-in is not enabled yet in Firebase Console.";
        }
        set({ authError: message, isLoading: false });
        toast.error(message);
        return null;
      }
    },

    signInAnonymous: async () => {
      if (!auth) {
        toast.error("Firebase Auth is not configured.");
        return null;
      }
      try {
        set({ isLoading: true, authError: null });
        const result = await signInAnonymously(auth);
        set({ user: result.user, isAuthModalOpen: false, isLoading: false });
        toast.info("Continuing in Guest Mode. Your projects will be saved locally.");
        return result.user;
      } catch (error: any) {
        console.error("Anonymous Sign-In Error:", error);
        let message = error.message || "Failed to start guest session";
        if (error.code === "auth/admin-restricted-operation") {
          message = "Anonymous Sign-in is not enabled in Firebase Console.";
        }
        set({ authError: message, isLoading: false });
        toast.error(message);
        return null;
      }
    },

    linkWithGoogle: async () => {
      const currentUser = auth?.currentUser;
      if (!auth || !googleProvider || !currentUser) return null;
      try {
        set({ isLoading: true, authError: null });
        const result = await linkWithPopup(currentUser, googleProvider);
        set({ user: result.user, isLoading: false, isAuthModalOpen: false });
        toast.success("Guest account successfully upgraded to Google!");
        return result.user;
      } catch (error: any) {
        console.error("Link Google Error:", error);
        set({ authError: error.message, isLoading: false });
        toast.error(error.message || "Failed to link Google account");
        return null;
      }
    },

    linkWithGithub: async () => {
      const currentUser = auth?.currentUser;
      if (!auth || !githubProvider || !currentUser) return null;
      try {
        set({ isLoading: true, authError: null });
        const result = await linkWithPopup(currentUser, githubProvider);
        set({ user: result.user, isLoading: false, isAuthModalOpen: false });
        toast.success("Guest account successfully upgraded to GitHub!");
        return result.user;
      } catch (error: any) {
        console.error("Link GitHub Error:", error);
        set({ authError: error.message, isLoading: false });
        toast.error(error.message || "Failed to link GitHub account");
        return null;
      }
    },

    signOutUser: async () => {
      if (!auth) return;
      try {
        set({ isLoading: true });
        await signOut(auth);
        set({ user: null, isLoading: false });
        toast.info("Signed out successfully.");
      } catch (error: any) {
        console.error("Sign-out Error:", error);
        set({ isLoading: false });
        toast.error("Failed to sign out.");
      }
    },
  };
});
