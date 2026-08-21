import { Template, ScreenshotLayer, TextLayer, ShapeLayer } from "@/lib/types";

const W = 1290;

function textLayer(
  content: string,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: Partial<Omit<TextLayer, "id" | "type" | "content" | "x" | "y" | "width" | "height">> = {}
): Omit<TextLayer, "id"> {
  return {
    type: "text",
    content,
    x,
    y,
    width: w,
    height: h,
    fontSize: 90,
    fontFamily: "Inter",
    fontWeight: 700,
    color: "#ffffff",
    align: "center",
    lineHeight: 1.15,
    letterSpacing: -1.5,
    rotation: 0,
    opacity: 1,
    ...opts,
  };
}

function shapeLayer(
  shape: import("@/lib/types").ShapeType,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  opts: Partial<Omit<ShapeLayer, "id" | "type" | "shape" | "x" | "y" | "width" | "height" | "fill">> = {}
): Omit<ShapeLayer, "id"> {
  return {
    type: "shape",
    shape,
    x,
    y,
    width: w,
    height: h,
    fill,
    rotation: 0,
    opacity: 1,
    ...opts,
  };
}

function screenshotWithFrame(
  x: number,
  y: number,
  w: number,
  h: number,
  label = "Drop your screenshot here",
  rotation = 0
): Omit<ScreenshotLayer, "id"> {
  return {
    type: "screenshot",
    src: undefined,
    x,
    y,
    width: w,
    height: h,
    rotation,
    opacity: 1,
    objectFit: "cover",
    cornerRadius: 55,
    showDeviceFrame: true,
    shadow: { blur: 80, spread: 0, color: "rgba(0,0,0,0.35)", offsetX: 0, offsetY: 20 },
    label,
  };
}

// ─── 6 PRO NICHE INDUSTRY TEMPLATES ──────────────────────────────────────────
export const NICHE_TEMPLATES: Template[] = [
  // 1. FINTECH & CRYPTO BLACK GOLD
  {
    id: "niche-fintech-crypto",
    name: "Fintech & Crypto Black Gold",
    description: "Ultra-luxury dark theme with gold gradients, portfolio tracking, and bank-grade security badges.",
    category: "Finance",
    previewColor: "#09090b",
    previewGradient: ["#09090b", "#1c1917", "#d97706"],
    layout: "screenshot-bottom",
    tags: ["fintech", "crypto", "luxury", "gold", "trading", "finance"],
    screens: [
      {
        name: "Crypto Portfolio",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#09090b", position: 0 },
              { color: "#18181b", position: 45 },
              { color: "#050507", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.3), 110, 520, 90, "rgba(217, 119, 6, 0.15)", {
            stroke: "rgba(245, 158, 11, 0.6)",
            strokeWidth: 2,
            cornerRadius: 100,
          }),
          textLayer("⚡ NEXT-GEN FINANCE", Math.round(W * 0.3), 126, 520, 90, {
            fontSize: 42,
            fontWeight: 800,
            color: "#fbbf24",
            letterSpacing: 2,
          }),
          textLayer("Smart Crypto\n& Stocks", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            gradientPresetId: "gold-luxury",
          }),
          textLayer("Track, trade, and compound your global assets in real-time.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#a1a1aa",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Portfolio Screen"),
        ],
      },
      {
        name: "Security Vault",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#0f172a", position: 0 },
              { color: "#020617", position: 100 },
            ],
            direction: "to-b",
          },
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.28), 110, 560, 90, "rgba(16, 185, 129, 0.15)", {
            stroke: "rgba(52, 211, 153, 0.6)",
            strokeWidth: 2,
            cornerRadius: 100,
          }),
          textLayer("🛡️ 256-BIT ENCRYPTION", Math.round(W * 0.28), 126, 560, 90, {
            fontSize: 40,
            fontWeight: 800,
            color: "#34d399",
            letterSpacing: 2,
          }),
          textLayer("Institutional\nVault Security", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Multi-signature cold storage with instant biometric face login.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#94a3b8",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Security Screen"),
        ],
      },
      {
        name: "Instant Transfers",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#18181b", position: 0 },
              { color: "#09090b", position: 100 },
            ],
            direction: "to-b",
          },
        },
        layers: [
          textLayer("Zero Fee\nGlobal Payouts", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            gradientPresetId: "emerald-glow",
          }),
          textLayer("Send instant payments to 140+ countries with 0% markup.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#a1a1aa",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Transfers Screen"),
        ],
      },
      {
        name: "Daily Yield",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#1e1b4b", position: 0 },
              { color: "#0f172a", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Earn 8.5% APY\nCompounded", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            gradientPresetId: "neon-cyberpunk",
          }),
          textLayer("Automated high-yield staking with daily automated payouts.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#cbd5e1",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Yield Screen"),
        ],
      },
      {
        name: "Social Proof",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#1c1917", position: 0 },
              { color: "#0c0a09", position: 100 },
            ],
            direction: "to-b",
          },
        },
        layers: [
          textLayer("★★★★★\nRated 4.9 by 2M+ Users", Math.round(W * 0.08), 220, Math.round(W * 0.84), 320, {
            fontSize: 100,
            fontWeight: 900,
            color: "#fbbf24",
          }),
          textLayer("Voted Best Mobile Banking & Investment App of 2026.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#d6d3d1",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Reviews Screen"),
        ],
      },
    ],
  },

  // 2. FITNESS & HEALTH HYPER NEON
  {
    id: "niche-fitness-hyper",
    name: "Fitness & Athletic Neon",
    description: "Vibrant high-energy neon gradients for workout trackers, gym routines, and nutrition apps.",
    category: "Health",
    previewColor: "#f43f5e",
    previewGradient: ["#f43f5e", "#fb923c", "#facc15"],
    layout: "screenshot-bottom",
    tags: ["fitness", "gym", "health", "workout", "nutrition", "neon"],
    screens: [
      {
        name: "AI Workouts",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#e11d48", position: 0 },
              { color: "#ea580c", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.3), 110, 520, 90, "rgba(255, 255, 255, 0.2)", {
            stroke: "rgba(255, 255, 255, 0.5)",
            strokeWidth: 2,
            cornerRadius: 100,
          }),
          textLayer("🔥 100% PERSONALIZED", Math.round(W * 0.3), 126, 520, 90, {
            fontSize: 40,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Crush Your Goals\nWith AI Coach", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Adaptive strength and cardio plans that evolve as you progress.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#fecdd3",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Workout Screen"),
        ],
      },
      {
        name: "Biometric Heart Rate",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#4f46e5", position: 0 },
              { color: "#7c3aed", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Real-Time\nHeart Zones", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            gradientPresetId: "electric-violet",
          }),
          textLayer("Instant sync with Apple Watch, Whoop, and Garmin sensors.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#e0e7ff",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Sensor Screen"),
        ],
      },
      {
        name: "Macro Scanner",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#059669", position: 0 },
              { color: "#10b981", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("1-Tap AI Meal\nCalorie Scanner", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Point your camera to log protein, carbs, and micronutrients instantly.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#d1fae5",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Meal Screen"),
        ],
      },
      {
        name: "Streak Badges",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#ea580c", position: 0 },
              { color: "#ca8a04", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Build Unstoppable\nHabits & Streaks", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Unlock athletic milestones and compete on global leaderboards.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#ffedd5",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Streak Screen"),
        ],
      },
      {
        name: "Try Free",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#db2777", position: 0 },
              { color: "#9333ea", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Start Your 14-Day\nFree Trial", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Join 3M+ athletes transforming their health every single day.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#fce7f3",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop CTA Screen"),
        ],
      },
    ],
  },

  // 3. PRODUCTIVITY & SAAS STUDIO
  {
    id: "niche-saas-productivity",
    name: "Productivity & SaaS Modern",
    description: "Sleek Linear/Raycast minimalist aesthetic with clean typography and focused device framing.",
    category: "Business",
    previewColor: "#0f172a",
    previewGradient: ["#0f172a", "#1e293b", "#334155"],
    layout: "screenshot-bottom",
    tags: ["saas", "productivity", "minimal", "linear", "clean", "software"],
    screens: [
      {
        name: "Workflow",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#090d16", position: 0 },
              { color: "#111827", position: 100 },
            ],
            direction: "to-b",
          },
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.32), 110, 480, 85, "rgba(255, 255, 255, 0.08)", {
            stroke: "rgba(255, 255, 255, 0.2)",
            strokeWidth: 1.5,
            cornerRadius: 100,
          }),
          textLayer("⌘ FAST COMMANDS", Math.round(W * 0.32), 126, 480, 85, {
            fontSize: 38,
            fontWeight: 700,
            color: "#e2e8f0",
          }),
          textLayer("Master Your\nDaily Workflow", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Lightning-fast keyboard shortcuts built for elite engineering teams.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#94a3b8",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Workflow Screen"),
        ],
      },
      {
        name: "AI Roadmaps",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#0f172a", position: 0 },
              { color: "#1e1b4b", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("AI Project\nSummaries", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            gradientPresetId: "electric-violet",
          }),
          textLayer("Turn complex meeting notes into actionable sprints in 5 seconds.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#94a3b8",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop AI Screen"),
        ],
      },
      {
        name: "Deep Focus",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#022c22", position: 0 },
              { color: "#064e3b", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Zero Distraction\nDeep Focus", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Block notification noise and achieve productive flow state.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#a7f3d0",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Focus Screen"),
        ],
      },
      {
        name: "Integrations",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#18181b", position: 0 },
              { color: "#27272a", position: 100 },
            ],
            direction: "to-b",
          },
        },
        layers: [
          textLayer("50+ Native\nTool Integrations", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Seamless real-time synchronization with GitHub, Figma, and Slack.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#a1a1aa",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Integrations Screen"),
        ],
      },
      {
        name: "Team Scale",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#1e1b4b", position: 0 },
              { color: "#312e81", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Built For Teams\nThat Move Fast", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Trusted by over 80,000 product creators around the globe.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#cbd5e1",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Team Screen"),
        ],
      },
    ],
  },

  // 4. SOCIAL & DATING POP
  {
    id: "niche-social-dating",
    name: "Social & Dating Spark",
    description: "Playful violet and warm sunset aesthetic with rich card highlights and social badges.",
    category: "Social",
    previewColor: "#a855f7",
    previewGradient: ["#a855f7", "#ec4899", "#f43f5e"],
    layout: "screenshot-bottom",
    tags: ["social", "dating", "chat", "community", "friends", "matching"],
    screens: [
      {
        name: "Match Finder",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#701a75", position: 0 },
              { color: "#be185d", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.28), 110, 560, 90, "rgba(255, 255, 255, 0.2)", {
            stroke: "rgba(255, 255, 255, 0.5)",
            strokeWidth: 2,
            cornerRadius: 100,
          }),
          textLayer("✨ 100% VERIFIED PROFILES", Math.round(W * 0.28), 126, 560, 90, {
            fontSize: 38,
            fontWeight: 800,
            color: "#ffffff",
          }),
          textLayer("Meet Real People\nNear You", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            gradientPresetId: "sunset-glow",
          }),
          textLayer("Discover authentic connections based on shared passions and vibes.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#fbcfe8",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Profile Screen"),
        ],
      },
      {
        name: "Live Audio Lounges",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#4c1d95", position: 0 },
              { color: "#6d28d9", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Live Voice\nAudio Lounges", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Hop into open voice rooms and chat about music, games, and art.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#ddd6fe",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Lounge Screen"),
        ],
      },
      {
        name: "Video Verification",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#0f766e", position: 0 },
              { color: "#0d9488", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("No Catfishing\nEver Again", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("AI 3D facial verification ensures everyone you see is genuine.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#ccfbf1",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Video Screen"),
        ],
      },
      {
        name: "Private Chat",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#831843", position: 0 },
              { color: "#9f1239", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("End-to-End\nEncrypted Chat", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Disappearing photos and private voice notes keep you safe.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#fce7f3",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Chat Screen"),
        ],
      },
      {
        name: "Join Free",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#9333ea", position: 0 },
              { color: "#db2777", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Find Your Vibe\nStart Today", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Over 10 million real conversations happening right now.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#f5d0fe",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Spark Screen"),
        ],
      },
    ],
  },

  // 5. E-COMMERCE & FOOD
  {
    id: "niche-ecommerce-food",
    name: "E-Commerce & Food Gourmet",
    description: "Warm amber and terracotta tones with rating badges, fast delivery tags, and discount pills.",
    category: "Shopping",
    previewColor: "#ea580c",
    previewGradient: ["#ea580c", "#f97316", "#fbbf24"],
    layout: "screenshot-bottom",
    tags: ["food", "ecommerce", "shopping", "delivery", "restaurant", "store"],
    screens: [
      {
        name: "Food Delivery",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#7c2d12", position: 0 },
              { color: "#c2410c", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.28), 110, 560, 90, "rgba(255, 255, 255, 0.2)", {
            stroke: "rgba(255, 255, 255, 0.5)",
            strokeWidth: 2,
            cornerRadius: 100,
          }),
          textLayer("🚀 20-MIN EXPRESS DELIVERY", Math.round(W * 0.28), 126, 560, 90, {
            fontSize: 36,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Craving Something\nDelicious?", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Top-rated artisan dishes and fresh groceries delivered to your door.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#ffedd5",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Food Screen"),
        ],
      },
      {
        name: "Live Tracking",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#1e293b", position: 0 },
              { color: "#334155", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Live Courier\nGPS Tracking", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Watch your courier on the live map with 1-minute ETA accuracy.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#cbd5e1",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Tracking Screen"),
        ],
      },
      {
        name: "Daily Deals",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#854d0e", position: 0 },
              { color: "#ca8a04", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Save Up To 50%\nEvery Weekend", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            gradientPresetId: "gold-luxury",
          }),
          textLayer("Exclusive chef perks and flash discounts for VIP members.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#fef08a",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Deals Screen"),
        ],
      },
      {
        name: "1-Tap Checkout",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#14532d", position: 0 },
              { color: "#15803d", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("1-Tap Instant\nApple Pay & Card", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Save favorite orders and check out in under 3 seconds.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#bbf7d0",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Checkout Screen"),
        ],
      },
      {
        name: "Claim Offer",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#9a3412", position: 0 },
              { color: "#ea580c", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Free Delivery On\nYour First 3 Orders", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Use promo code TASTY50 at checkout today.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#fed7aa",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Welcome Screen"),
        ],
      },
    ],
  },

  // 6. MEDITATION & MINDFULNESS
  {
    id: "niche-meditation-mindful",
    name: "Meditation & Calm Oasis",
    description: "Soothing pastel sage and ocean mesh gradients for sleep, mindfulness, and breathing.",
    category: "Lifestyle",
    previewColor: "#0d9488",
    previewGradient: ["#0f766e", "#14b8a6", "#99f6e4"],
    layout: "screenshot-bottom",
    tags: ["meditation", "sleep", "mindfulness", "breathe", "calm", "relax"],
    screens: [
      {
        name: "Mindfulness",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#134e4a", position: 0 },
              { color: "#0f766e", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.32), 110, 480, 85, "rgba(255, 255, 255, 0.15)", {
            stroke: "rgba(255, 255, 255, 0.4)",
            strokeWidth: 1.5,
            cornerRadius: 100,
          }),
          textLayer("🌿 CLINICALLY BACKED", Math.round(W * 0.32), 126, 480, 85, {
            fontSize: 38,
            fontWeight: 700,
            color: "#ffffff",
          }),
          textLayer("Breathe, Relax\n& Unwind", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Guided audio sessions designed to calm anxiety in 3 minutes.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#ccfbf1",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Meditate Screen"),
        ],
      },
      {
        name: "Sleep Soundscapes",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#1e1b4b", position: 0 },
              { color: "#312e81", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Fall Asleep In\nUnder 10 Minutes", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("3D binaural soundscapes and soothing bedtime story narrations.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#c7d2fe",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Sleep Screen"),
        ],
      },
      {
        name: "Box Breathing",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#064e3b", position: 0 },
              { color: "#047857", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Haptic Box\nBreathing", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Gentle phone vibrations guide your rhythm with your eyes closed.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#a7f3d0",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Breathe Screen"),
        ],
      },
      {
        name: "Mood Journal",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#1e293b", position: 0 },
              { color: "#0f172a", position: 100 },
            ],
            direction: "to-b",
          },
        },
        layers: [
          textLayer("Track Emotional\nWellbeing Daily", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Smart pattern recognition highlights what brings you the most joy.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#94a3b8",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Journal Screen"),
        ],
      },
      {
        name: "Peace of Mind",
        background: {
          type: "gradient",
          gradient: {
            stops: [
              { color: "#0f766e", position: 0 },
              { color: "#14b8a6", position: 100 },
            ],
            direction: "to-br",
          },
        },
        layers: [
          textLayer("Find Your Inner\nPeace Tonight", Math.round(W * 0.08), 240, Math.round(W * 0.84), 320, {
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
          }),
          textLayer("Over 5 million people sleep deeply every night with Calm Oasis.", Math.round(W * 0.1), 580, Math.round(W * 0.8), 160, {
            fontSize: 56,
            fontWeight: 500,
            color: "#99f6e4",
          }),
          screenshotWithFrame(Math.round(W * 0.08), 820, Math.round(W * 0.84), 1900, "Drop Oasis Screen"),
        ],
      },
    ],
  },
];
