"use client";

import { useEffect } from "react";
import { RotateCcw, AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[SnapFrame Error Boundary]:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-6 shadow-lg shadow-destructive/10">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        Something Went Wrong
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 text-sm">
        An unexpected error occurred while rendering this page. You can try reloading or returning to safety.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} variant="default" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
