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
      {/* Sleek Layered Screens Mark */}
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-sm shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/35 transition-all duration-200"
      >
        <div className="w-full h-full rounded-[10.5px] bg-card flex items-center justify-center overflow-hidden relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[78%] h-[78%]"
          >
            <defs>
              <linearGradient id="sf-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Back Card (Tilted layered screen) */}
            <rect
              x="6"
              y="2.8"
              width="12"
              height="16.5"
              rx="2.5"
              className="fill-indigo-500/25 stroke-indigo-400/60"
              strokeWidth="1.2"
              transform="rotate(7 12 11)"
            />

            {/* Front Card (Active Screen with gradient) */}
            <rect
              x="4.8"
              y="4.2"
              width="12.4"
              height="16.8"
              rx="2.8"
              fill="url(#sf-grad)"
            />

            {/* Dynamic Island Pill */}
            <rect
              x="8.8"
              y="5.8"
              width="4.4"
              height="1.2"
              rx="0.6"
              fill="white"
              fillOpacity="0.9"
            />

            {/* Screen UI Highlights */}
            <rect
              x="7.2"
              y="9"
              width="7.6"
              height="1.8"
              rx="0.9"
              fill="white"
              fillOpacity="0.45"
            />
            <rect
              x="7.2"
              y="12.2"
              width="5.2"
              height="1.4"
              rx="0.7"
              fill="white"
              fillOpacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {withText && (
        <span
          className={cn(
            "font-extrabold text-base tracking-tight text-foreground",
            textClassName
          )}
        >
          Snap<span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Frame</span>
        </span>
      )}
    </div>
  );
}
