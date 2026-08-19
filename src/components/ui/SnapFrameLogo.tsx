import { cn } from "@/lib/utils";

interface SnapFrameLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  textClassName?: string;
}

export function SnapFrameLogo({
  className,
  size = 28,
  withText = false,
  textClassName,
}: SnapFrameLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      {/* Vector Icon Mark */}
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[1.5px] shadow-md shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300"
      >
        <div className="w-full h-full rounded-[10px] bg-[#0c0d14] flex items-center justify-center overflow-hidden relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-indigo-500/30 via-transparent to-transparent opacity-80" />

          {/* SVG Emblem: Smartphone Frame + Aperture Snap */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[82%] h-[82%] relative z-10 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          >
            <defs>
              <linearGradient id="sf-grad-1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="sf-grad-2" x1="32" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Phone Silhouette Frame */}
            <rect
              x="6.5"
              y="2.5"
              width="19"
              height="27"
              rx="4.5"
              stroke="url(#sf-grad-1)"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="opacity-90"
            />

            {/* Dynamic Island / Top Notch */}
            <line
              x1="13"
              y1="5.5"
              x2="19"
              y2="5.5"
              stroke="url(#sf-grad-1)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Camera / Screenshot Aperture Iris in Center */}
            <circle
              cx="16"
              cy="16.5"
              r="6.2"
              stroke="url(#sf-grad-2)"
              strokeWidth="1.5"
            />
            
            {/* Shutter Blade Diagonals */}
            <path
              d="M16 10.3L19.5 14M22.2 16.5L18.5 20M16 22.7L12.5 19M9.8 16.5L13.5 13"
              stroke="url(#sf-grad-1)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Inner Focal Center */}
            <circle
              cx="16"
              cy="16.5"
              r="2.2"
              fill="url(#sf-grad-1)"
            />
          </svg>
        </div>
      </div>

      {/* Typography */}
      {withText && (
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-300 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent",
              textClassName
            )}
          >
            Snap<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Frame</span>
          </span>
        </div>
      )}
    </div>
  );
}
