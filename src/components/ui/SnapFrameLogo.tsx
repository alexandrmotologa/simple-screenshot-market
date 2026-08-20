import { cn } from "@/lib/utils";

interface SnapFrameLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  textClassName?: string;
  variant?: "layers" | "viewfinder" | "monogram";
}

export function SnapFrameLogo({
  className,
  size = 28,
  withText = false,
  textClassName,
  variant = "viewfinder",
}: SnapFrameLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none group", className)}>
      {/* ── Variant 1: Viewfinder Frame (Camera Snap + Screenshot Frame) ── */}
      {variant === "viewfinder" && (
        <svg
          style={{ width: size, height: size }}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 group-hover:scale-105 transition-transform duration-200"
        >
          <defs>
            <linearGradient id="sf-vf-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="sf-vf-cyan" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>

          {/* Top-Left Framing Bracket */}
          <path
            d="M5 12V7C5 5.89543 5.89543 5 7 5H12"
            stroke="url(#sf-vf-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Top-Right Framing Bracket */}
          <path
            d="M20 5H25C26.1046 5 27 5.89543 27 7V12"
            stroke="url(#sf-vf-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Bottom-Left Framing Bracket */}
          <path
            d="M5 20V25C5 26.1046 5.89543 27 7 27H12"
            stroke="url(#sf-vf-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Bottom-Right Framing Bracket */}
          <path
            d="M20 27H25C26.1046 27 27 26.1046 27 25V20"
            stroke="url(#sf-vf-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Center Floating Gradient Mobile Screen */}
          <rect
            x="10.5"
            y="9"
            width="11"
            height="14"
            rx="2.5"
            fill="url(#sf-vf-grad)"
          />

          {/* Screen Camera Pill & Shutter Dot */}
          <rect x="13.5" y="10.5" width="5" height="1" rx="0.5" fill="white" fillOpacity="0.9" />
          <circle cx="16" cy="16" r="2.2" fill="white" fillOpacity="0.9" />
          <circle cx="16" cy="16" r="1" fill="#6366f1" />
        </svg>
      )}

      {/* ── Variant 2: Cascading Layered Screens ── */}
      {variant === "layers" && (
        <svg
          style={{ width: size, height: size }}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 group-hover:scale-105 transition-transform duration-200"
        >
          <defs>
            <linearGradient id="sf-lay-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect x="11" y="4" width="15" height="21" rx="3.5" fill="#818cf8" fillOpacity="0.3" transform="rotate(10 18.5 14.5)" />
          <rect x="6" y="6" width="15" height="21" rx="3.5" fill="url(#sf-lay-grad)" />
          <rect x="11" y="8" width="5" height="1.2" rx="0.6" fill="white" />
        </svg>
      )}

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
