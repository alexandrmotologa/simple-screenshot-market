"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[SnapFrame Global Error]:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Application Error</h1>
            <p className="text-sm text-slate-400">
              A critical application error prevented the page from rendering properly.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Application</span>
          </button>
        </div>
      </body>
    </html>
  );
}
