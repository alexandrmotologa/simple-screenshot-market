import { cn } from "@/lib/utils";

interface SnapFrameLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  textClassName?: string;
}

export function SnapFrameLogo({
  className,
  size = 32,
  withText = false,
  textClassName,
}: SnapFrameLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none group", className)}>
      <svg
        style={{ width: size, height: size }}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
      >
        <defs>
          {/* Main Vibrant Glow Gradient */}
          <linearGradient id="sf-main-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="45%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          {/* Squircle Dark Metallic Body */}
          <linearGradient id="sf-bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>

          {/* Glossy Bevel Border */}
          <linearGradient id="sf-border-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.8" />
          </linearGradient>

          {/* Cyan Glow Accent */}
          <linearGradient id="sf-cyan-grad" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Ambient Glow Filter */}
          <filter id="sf-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. Squircle Outer Chassis ── */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="11"
          fill="url(#sf-bg-grad)"
          stroke="url(#sf-border-grad)"
          strokeWidth="1.5"
        />

        {/* Ambient Top Glow */}
        <ellipse cx="20" cy="8" rx="14" ry="5" fill="#8b5cf6" fillOpacity="0.25" />

        {/* ── 2. Device Mockup Frame (Phone Silhouette) ── */}
        <rect
          x="10.5"
          y="7"
          width="19"
          height="26"
          rx="4.5"
          fill="#090d16"
          fillOpacity="0.8"
          stroke="url(#sf-cyan-grad)"
          strokeWidth="1.2"
        />

        {/* Phone Dynamic Island Notch */}
        <rect x="16.5" y="8.5" width="7" height="1.5" rx="0.75" fill="#e0e7ff" fillOpacity="0.7" />

        {/* ── 3. Aperture / Camera Shutter Symbol (Snap) ── */}
        <g filter="url(#sf-glow)">
          {/* Outer Aperture Ring */}
          <circle
            cx="20"
            cy="20"
            r="6.5"
            stroke="url(#sf-main-grad)"
            strokeWidth="1.5"
          />

          {/* Shutter Blades Lines */}
          <path
            d="M17 14.5L23.5 17.5M25.5 18.5L22.5 25M23 25.5L16.5 22.5M14.5 21.5L17.5 15"
            stroke="url(#sf-border-grad)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Center Glowing Lens Core */}
          <circle cx="20" cy="20" r="2.4" fill="url(#sf-main-grad)" />
          <circle cx="19.2" cy="19.2" r="0.8" fill="#ffffff" fillOpacity="0.9" />
        </g>

        {/* ── 4. Corner Frame Brackets (Frame Studio) ── */}
        <path
          d="M5.5 12V8C5.5 6.61929 6.61929 5.5 8 5.5H12"
          stroke="url(#sf-main-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M28 5.5H32C33.3807 5.5 34.5 6.61929 34.5 8V12"
          stroke="url(#sf-main-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M5.5 28V32C5.5 33.3807 6.61929 34.5 8 34.5H12"
          stroke="url(#sf-main-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M28 34.5H32C33.3807 34.5 34.5 33.3807 34.5 32V28"
          stroke="url(#sf-main-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

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
