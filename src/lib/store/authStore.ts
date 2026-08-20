import { create } from "zustand";
import {
  User,
  signInWithPopup,
  signInWithRedirect,
  linkWithPopup,
  linkWithRedirect,
  getRedirectResult,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { toast } from "@/lib/store/toastStore";
import { verifyAndSyncUserEnvironment } from "@/lib/authEnvironment";

interface AuthState {
  user: User | any | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authError: string | null;
  isInitialized: boolean;

  setAuthModalOpen: (open: boolean) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithGithub: () => Promise<User | null>;
  signInAnonymous: () => Promise<any>;
  linkWithGoogle: () => Promise<User | null>;
  linkWithGithub: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Attach auth listener and check redirect results on startup
  if (typeof window !== "undefined") {
    setTimeout(async () => {
      try {
        const { auth } = await getFirebaseAuth();
        if (auth) {
          try {
            await setPersistence(auth, browserLocalPersistence);
          } catch {}

          // Seamless check if user just returned from a redirect fallback
          try {
            const redirectResult = await getRedirectResult(auth);
            if (redirectResult?.user) {
              const verification = await verifyAndSyncUserEnvironment(redirectResult.user);
              if (!verification.allowed) {
                await signOut(auth);
                set({
                  user: null,
                  isLoading: false,
                  isAuthModalOpen: true,
                  authError: verification.error || "Account environment mismatch.",
                  isInitialized: true,
                });
                toast.error(verification.error || "Access denied for this environment.");
                return;
              }

              set({
                user: redirectResult.user,
                isLoading: false,
                isAuthModalOpen: false,
                isInitialized: true,
              });
              toast.success(`Welcome, ${redirectResult.user.displayName || "Creator"}!`);
              return;
            }
          } catch (redirectErr: any) {
            console.warn("Redirect result check:", redirectErr);
          }

          onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
              const verification = await verifyAndSyncUserEnvironment(currentUser);
              if (!verification.allowed) {
                await signOut(auth);
                set({
                  user: null,
                  isLoading: false,
                  isAuthModalOpen: false,
                  authError: verification.error || "Account environment mismatch.",
                  isInitialized: true,
                });
                toast.error(verification.error || "Access denied for this environment.");
                return;
              }

              set({
                user: currentUser,
                isLoading: false,
                isInitialized: true,
              });
            } else {
              const currentLocalUser = get().user;
              if (!currentLocalUser?.isAnonymous || currentLocalUser?.email) {
                set({ user: null, isLoading: false, isInitialized: true });
              } else {
                set({ isLoading: false, isInitialized: true });
              }
            }
          });
        } else {
          set({ isLoading: false, isInitialized: true });
        }
      } catch (err) {
        console.warn("Auth initialization error:", err);
        set({ isLoading: false, isInitialized: true });
      }
    }, 10);
  }

  return {
    user: null,
    isLoading: false,
    isAuthModalOpen: false,
    authError: null,
    isInitialized: false,

    setAuthModalOpen: (open) => set({ isAuthModalOpen: open, authError: null }),
    clearError: () => set({ authError: null }),

    initializeAuth: async () => {
      const { auth } = await getFirebaseAuth();
      return;
    },

    signInWithGoogle: async () => {
      try {
        set({ isLoading: true, authError: null });
        const { auth, googleProvider } = await getFirebaseAuth();

        if (!auth || !googleProvider) {
          const errMsg = "Firebase Auth credentials not found. Please check .env configuration.";
          set({ authError: errMsg, isLoading: false });
          toast.error(errMsg);
          return null;
        }

        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch {}

        try {
          console.log("[Auth] Starting Google authentication...");
          const result = await signInWithPopup(auth, googleProvider);
          console.log("[Auth] Google Sign-in Success:", result.user);

          // Environment validation & automatic user registration in Firestore
          const verification = await verifyAndSyncUserEnvironment(result.user);
          if (!verification.allowed) {
            await signOut(auth);
            const err = verification.error || "This account is not allowed on this environment.";
            set({ user: null, isAuthModalOpen: true, isLoading: false, authError: err });
            toast.error(err);
            return null;
          }

          set({ user: result.user, isAuthModalOpen: false, isLoading: false, authError: null });
          toast.success(`Welcome, ${result.user.displayName || result.user.email || "Creator"}!`);
          return result.user;
        } catch (popupErr: any) {
          // If popup is blocked by browser, seamlessly fallback to redirect
          if (popupErr.code === "auth/popup-blocked") {
            console.log("[Auth] Popup blocked, falling back to redirect...");
            await signInWithRedirect(auth, googleProvider);
            return null;
          }
          throw popupErr;
        }
      } catch (error: any) {
        console.error("Google Sign-In Error details:", error);

        // When popup is closed by user, smoothly reset state
        if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
          set({ isLoading: false, isAuthModalOpen: false, authError: null });
          return null;
        }

        let message = error.message || "Failed to sign in with Google";
        if (error.code === "auth/account-exists-with-different-credential") {
          message = "An account already exists with this email address.";
        } else if (error.code === "auth/configuration-not-found" || error.code === "auth/operation-not-allowed") {
          message = "Google Sign-In is not enabled yet in Firebase Console.";
        } else if (error.code === "auth/unauthorized-domain") {
          message = "This domain is not authorized in Firebase Console.";
        }

        set({ authError: message, isLoading: false });
        toast.error(message);
        return null;
      }
    },

    signInWithGithub: async () => {
      try {
        set({ isLoading: true, authError: null });
        const { auth, githubProvider } = await getFirebaseAuth();

        if (!auth || !githubProvider) {
          const errMsg = "Firebase Auth credentials not found. Please check .env configuration.";
          set({ authError: errMsg, isLoading: false });
          toast.error(errMsg);
          return null;
        }

        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch {}

        try {
          console.log("[Auth] Starting GitHub authentication...");
          const result = await signInWithPopup(auth, githubProvider);
          console.log("[Auth] GitHub Sign-in Success:", result.user);

          // Environment validation & automatic user registration in Firestore
          const verification = await verifyAndSyncUserEnvironment(result.user);
          if (!verification.allowed) {
            await signOut(auth);
            const err = verification.error || "This account is not allowed on this environment.";
            set({ user: null, isAuthModalOpen: true, isLoading: false, authError: err });
            toast.error(err);
            return null;
          }

          set({ user: result.user, isAuthModalOpen: false, isLoading: false, authError: null });
          toast.success(`Welcome, ${result.user.displayName || "Developer"}!`);
          return result.user;
        } catch (popupErr: any) {
          // If popup is blocked by browser, seamlessly fallback to redirect
          if (popupErr.code === "auth/popup-blocked") {
            console.log("[Auth] Popup blocked, falling back to redirect...");
            await signInWithRedirect(auth, githubProvider);
            return null;
          }
          throw popupErr;
        }
      } catch (error: any) {
        console.error("GitHub Sign-In Error details:", error);

        if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
          set({ isLoading: false, isAuthModalOpen: false, authError: null });
          return null;
        }

        let message = error.message || "Failed to sign in with GitHub";
        if (error.code === "auth/configuration-not-found" || error.code === "auth/operation-not-allowed") {
          message = "GitHub Sign-In is not enabled yet in Firebase Console.";
        } else if (error.code === "auth/unauthorized-domain") {
          message = "This domain is not authorized in Firebase Console.";
        }

        set({ authError: message, isLoading: false });
        toast.error(message);
        return null;
      }
    },

    signInAnonymous: async () => {
      try {
        set({ isLoading: true, authError: null });
        const { auth } = await getFirebaseAuth();

        if (auth) {
          try {
            const result = await signInAnonymously(auth);
            set({ user: result.user, isAuthModalOpen: false, isLoading: false });
            toast.info("Continuing in Guest Mode (30-day auto clean-up applies). Link an account to keep projects permanently.");
            return result.user;
          } catch (firebaseErr: any) {
            console.warn("Firebase Anonymous Sign-In fallback to local guest:", firebaseErr);
          }
        }

        // Local Guest Session Fallback (Zero network friction)
        const guestId = "guest_" + Math.random().toString(36).slice(2, 10);
        const guestUser = {
          uid: guestId,
          isAnonymous: true,
          displayName: "Guest Creator",
          email: null,
          photoURL: null,
        };
        set({ user: guestUser, isAuthModalOpen: false, isLoading: false });
        toast.info("Continuing in Guest Mode. Note: Anonymous accounts are subject to 30-day auto clean-up.");
        return guestUser;
      } catch (error: any) {
        console.error("Anonymous Sign-In Error:", error);
        const fallbackGuest = {
          uid: "guest_" + Date.now(),
          isAnonymous: true,
          displayName: "Guest Creator",
          email: null,
          photoURL: null,
        };
        set({ user: fallbackGuest, isAuthModalOpen: false, isLoading: false });
        toast.info("Continuing in Guest Mode.");
        return fallbackGuest;
      }
    },

    linkWithGoogle: async () => {
      try {
        set({ isLoading: true, authError: null });
        const { auth, googleProvider } = await getFirebaseAuth();
        if (!auth || !googleProvider) {
          const errMsg = "Firebase Auth credentials not found.";
          set({ authError: errMsg, isLoading: false });
          toast.error(errMsg);
          return null;
        }

        if (auth.currentUser && auth.currentUser.isAnonymous) {
          try {
            const result = await linkWithPopup(auth.currentUser, googleProvider);
            const verification = await verifyAndSyncUserEnvironment(result.user);
            if (!verification.allowed) {
              await signOut(auth);
              const err = verification.error || "Account environment mismatch.";
              set({ user: null, isAuthModalOpen: true, isLoading: false, authError: err });
              toast.error(err);
              return null;
            }
            set({ user: result.user, isAuthModalOpen: false, isLoading: false, authError: null });
            toast.success(`Account linked! Welcome, ${result.user.displayName || "Creator"}!`);
            return result.user;
          } catch (linkErr: any) {
            if (linkErr.code === "auth/credential-already-in-use") {
              // Account exists -> sign in directly
              return await get().signInWithGoogle();
            }
            if (linkErr.code === "auth/popup-blocked") {
              await linkWithRedirect(auth.currentUser, googleProvider);
              return null;
            }
            throw linkErr;
          }
        }
        return await get().signInWithGoogle();
      } catch (error: any) {
        if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
          set({ isLoading: false, isAuthModalOpen: false, authError: null });
          return null;
        }
        const message = error.message || "Failed to link Google account";
        set({ authError: message, isLoading: false });
        toast.error(message);
        return null;
      }
    },

    linkWithGithub: async () => {
      try {
        set({ isLoading: true, authError: null });
        const { auth, githubProvider } = await getFirebaseAuth();
        if (!auth || !githubProvider) {
          const errMsg = "Firebase Auth credentials not found.";
          set({ authError: errMsg, isLoading: false });
          toast.error(errMsg);
          return null;
        }

        if (auth.currentUser && auth.currentUser.isAnonymous) {
          try {
            const result = await linkWithPopup(auth.currentUser, githubProvider);
            const verification = await verifyAndSyncUserEnvironment(result.user);
            if (!verification.allowed) {
              await signOut(auth);
              const err = verification.error || "Account environment mismatch.";
              set({ user: null, isAuthModalOpen: true, isLoading: false, authError: err });
              toast.error(err);
              return null;
            }
            set({ user: result.user, isAuthModalOpen: false, isLoading: false, authError: null });
            toast.success(`Account linked! Welcome, ${result.user.displayName || "Developer"}!`);
            return result.user;
          } catch (linkErr: any) {
            if (linkErr.code === "auth/credential-already-in-use") {
              // Account exists -> sign in directly
              return await get().signInWithGithub();
            }
            if (linkErr.code === "auth/popup-blocked") {
              await linkWithRedirect(auth.currentUser, githubProvider);
              return null;
            }
            throw linkErr;
          }
        }
        return await get().signInWithGithub();
      } catch (error: any) {
        if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
          set({ isLoading: false, isAuthModalOpen: false, authError: null });
          return null;
        }
        const message = error.message || "Failed to link GitHub account";
        set({ authError: message, isLoading: false });
        toast.error(message);
        return null;
      }
    },

    signOutUser: async () => {
      try {
        set({ isLoading: true });
        const { auth } = await getFirebaseAuth();
        if (auth) {
          await signOut(auth);
        }
        set({ user: null, isLoading: false });
        toast.info("Signed out successfully.");
      } catch (error: any) {
        console.error("Sign-out Error:", error);
        set({ user: null, isLoading: false });
        toast.info("Signed out.");
      }
    },
  };
});
