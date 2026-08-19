"use client";

import { X, Loader2, Sparkles, User as UserIcon, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";

export function AuthModal() {
  const {
    isAuthModalOpen,
    setAuthModalOpen,
    isLoading,
    authError,
    signInWithGoogle,
    signInWithGithub,
    signInAnonymous,
    user,
    linkWithGoogle,
    linkWithGithub,
  } = useAuthStore();

  if (!isAuthModalOpen) return null;

  const isAnonymous = user && user.isAnonymous;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={() => setAuthModalOpen(false)}
    >
      <div
        className="bg-card border border-border/80 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="text-center space-y-1.5 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {isAnonymous ? "Upgrade Your Account" : "Sign In to SnapFrame"}
            </h2>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              {isAnonymous
                ? "Link your Google or GitHub account to sync your projects across all your devices."
                : "Save projects to cloud, sync across devices, and power up with AI tools."}
            </p>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <span>{authError}</span>
              </div>
            </div>
          )}

          {/* Auth Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* Google Sign In */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => (isAnonymous ? linkWithGoogle() : signInWithGoogle())}
              className="w-full h-11 px-4 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary hover:border-border text-foreground text-xs font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50"
            >
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <span>{isAnonymous ? "Link Google Account" : "Continue with Google"}</span>
            </button>

            {/* GitHub Sign In */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => (isAnonymous ? linkWithGithub() : signInWithGithub())}
              className="w-full h-11 px-4 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary hover:border-border text-foreground text-xs font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50"
            >
              <GithubIcon className="w-4 h-4 shrink-0" />
              <span>{isAnonymous ? "Link GitHub Account" : "Continue with GitHub"}</span>
            </button>

            {/* Anonymous / Guest Mode Option */}
            {!user && (
              <>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/60" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                    <span className="bg-card px-2 text-muted-foreground/80">or try without account</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => signInAnonymous()}
                  className="w-full h-10 px-4 rounded-xl border border-dashed border-border/70 hover:border-primary/60 bg-transparent hover:bg-secondary/40 text-muted-foreground hover:text-foreground text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Continue as Guest (Anonymous)</span>
                </button>
              </>
            )}
          </div>

          {/* Privacy Note */}
          <div className="pt-2 text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted sessions · No tracking · Free forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
