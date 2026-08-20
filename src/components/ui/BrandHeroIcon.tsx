"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandHeroIconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
}

export function BrandHeroIcon({
  className,
  size = "lg",
  glow = true,
}: BrandHeroIconProps) {
  const dimensions = {
    sm: { box: "w-10 h-10 rounded-xl", svg: 24, glow: "blur-md" },
    md: { box: "w-14 h-14 rounded-2xl", svg: 32, glow: "blur-lg" },
    lg: { box: "w-20 h-20 rounded-3xl", svg: 48, glow: "blur-xl" },
    xl: { box: "w-24 h-24 rounded-[32px]", svg: 56, glow: "blur-2xl" },
  }[size];

  return (
    <div className={cn("relative inline-flex items-center justify-center select-none group", className)}>
      {/* Ambient Pulsing Gradient Glow */}
      {glow && (
        <div
          className={cn(
            "absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 group-hover:opacity-75 transition-opacity duration-700 rounded-full animate-pulse",
            dimensions.glow
          )}
        />
      )}

      {/* Floating Glassmorphic Container */}
      <motion.div
        animate={{
          y: [-3, 3, -3],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "relative flex items-center justify-center bg-card/90 dark:bg-card/80 backdrop-blur-2xl border border-white/20 dark:border-white/15 shadow-2xl overflow-hidden ring-1 ring-primary/20",
          dimensions.box
        )}
      >
        {/* Top Specular Gloss Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-3xl" />

        {/* Signature SnapFrame Animated Vector Graphics */}
        <svg
          style={{ width: dimensions.svg, height: dimensions.svg }}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-md"
        >
          <defs>
            {/* Primary Neon Gradient */}
            <linearGradient id="bhi-neon-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#6366f1" />
              <stop offset="75%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Device Body Fill */}
            <linearGradient id="bhi-phone-bg" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
            </linearGradient>

            {/* Glowing Aperture Ring Gradient */}
            <linearGradient id="bhi-aperture-grad" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>

          {/* ── 1. Secondary Layered Screen (Back Staging Tilt) ── */}
          <rect
            x="18"
            y="7"
            width="20"
            height="32"
            rx="5"
            fill="#6366f1"
            fillOpacity="0.25"
            stroke="url(#bhi-neon-grad)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            transform="rotate(8 28 23)"
          />

          {/* ── 2. Primary Foreground Smartphone Frame ── */}
          <rect
            x="11"
            y="9"
            width="22"
            height="33"
            rx="5.5"
            fill="url(#bhi-phone-bg)"
            stroke="url(#bhi-neon-grad)"
            strokeWidth="1.6"
          />

          {/* Dynamic Island Pill */}
          <rect x="18.5" y="11.5" width="7" height="1.8" rx="0.9" fill="#e0e7ff" fillOpacity="0.8" />

          {/* ── 3. Central Camera Aperture (Snap / Shutter) ── */}
          <g>
            {/* Outer Shutter Ring */}
            <circle
              cx="22"
              cy="25.5"
              r="7.5"
              stroke="url(#bhi-aperture-grad)"
              strokeWidth="1.5"
            />

            {/* Shutter Blade Geometry */}
            <path
              d="M18 19.5L25.5 22.5M28 23.5L24.5 31M25.5 31.5L18 28.5M15.5 27L18.5 19.5"
              stroke="url(#bhi-neon-grad)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Center Glowing Lens Core with Specular Light */}
            <circle cx="22" cy="25.5" r="2.8" fill="url(#bhi-neon-grad)" />
            <circle cx="21" cy="24.5" r="0.9" fill="#ffffff" fillOpacity="0.95" />
          </g>

          {/* ── 4. Corner Studio Framing Brackets ── */}
          <path
            d="M5 14V8C5 6.34315 6.34315 5 8 5H14"
            stroke="url(#bhi-neon-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M34 5H40C41.6569 5 43 6.34315 43 8V14"
            stroke="url(#bhi-neon-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M5 34V40C5 41.6569 6.34315 43 8 43H14"
            stroke="url(#bhi-neon-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M34 43H40C41.6569 43 43 41.6569 43 40V34"
            stroke="url(#bhi-neon-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Ambient Inner Bottom Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
