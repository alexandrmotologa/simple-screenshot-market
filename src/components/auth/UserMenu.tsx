"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { LogOut, User as UserIcon, Sparkles, ChevronDown, ShieldAlert, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, isLoading, isInitialized, setAuthModalOpen, signOutUser } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "h-8 px-3 rounded-xl bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 border border-indigo-500/30 text-xs font-semibold text-foreground flex items-center gap-2 opacity-80",
          className
        )}
      >
        <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
        <span>Sign In</span>
      </button>
    );
  }

  if (isLoading && !isInitialized) {
    return (
      <div className="w-8 h-8 rounded-full bg-secondary animate-pulse shrink-0" />
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => setAuthModalOpen(true)}
        className={cn(
          "h-8 px-3 rounded-xl bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 border border-indigo-500/30 hover:border-indigo-500/60 text-xs font-semibold text-foreground flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95",
          className
        )}
      >
        <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
        <span>Sign In</span>
      </button>
    );
  }

  const isAnonymous = user.isAnonymous;
  const displayName = user.displayName || (isAnonymous ? "Guest Creator" : "Creator");
  const email = user.email || (isAnonymous ? "Temporary session" : "");
  const photoURL = user.photoURL;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/60 transition-all outline-none cursor-pointer group shadow-xs">
        {photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoURL}
            alt={displayName}
            className="w-6 h-6 rounded-lg object-cover ring-1 ring-border"
          />
        ) : (
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col text-left max-w-28 truncate">
          <span className="text-xs font-semibold text-foreground truncate leading-tight">
            {displayName}
          </span>
          {isAnonymous && (
            <span className="text-[9px] text-amber-400 font-medium leading-none">
              Guest
            </span>
          )}
        </div>
        <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors ml-0.5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-2xl border border-border/80 rounded-2xl bg-card">
        <div className="p-2 space-y-0.5">
          <p className="text-xs font-bold text-foreground truncate">{displayName}</p>
          {email && (
            <p className="text-[11px] text-muted-foreground truncate font-mono">{email}</p>
          )}
        </div>

        {isAnonymous && (
          <>
            <DropdownMenuSeparator className="my-1" />
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] space-y-2 mb-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Guest Mode (30-day Auto Clean-up)</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Anonymous accounts older than 30 days are automatically deleted. Link with Google or GitHub to keep your projects permanently.
              </p>
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="w-full h-7 rounded-lg bg-amber-500 text-black text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-amber-400 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3 h-3" />
                <span>Upgrade Account</span>
              </button>
            </div>
          </>
        )}

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={() => router.push("/projects")}
          className="text-xs font-medium text-foreground hover:bg-secondary rounded-xl cursor-pointer p-2 flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>My Projects</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOutUser()}
          className="text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl cursor-pointer p-2 flex items-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
