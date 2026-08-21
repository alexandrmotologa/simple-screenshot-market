import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-indigo-400 animate-pulse" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground font-medium animate-pulse tracking-wide uppercase">
        Loading SnapFrame...
      </p>
    </div>
  );
}
