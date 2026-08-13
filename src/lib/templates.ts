import { Template, ScreenshotLayer, TextLayer } from "@/lib/types";

// ─── Canvas dimensions (1290×2796) ────────────────────────────────────────────
const W = 1290;
const H = 2796;

// Helper: screenshot zone layer
function screenshotZone(
  x: number,
  y: number,
  w: number,
  h: number,
  label = "Drop your screenshot here",
  radius = 40,
): Omit<ScreenshotLayer, "id"> {
  return {
    type: "screenshot",
    src: undefined,
    x, y, width: w, height: h,
    rotation: 0,
    opacity: 1,
    objectFit: "cover",
    cornerRadius: radius,
    showDeviceFrame: false,
    label,
  };
}

// Helper: screenshot with device frame + shadow
function screenshotWithFrame(
  x: number,
  y: number,
  w: number,
  h: number,
  label = "Drop your screenshot here",
): Omit<ScreenshotLayer, "id"> {
  return {
    ...screenshotZone(x, y, w, h, label, 55),
    showDeviceFrame: true,
    shadow: { blur: 80, spread: 0, color: "rgba(0,0,0,0.35)", offsetX: 0, offsetY: 20 },
  };
}

// Helper: text layer
function textLayer(
  content: string,
  x: number, y: number, w: number, h: number,
  opts: Partial<Omit<TextLayer, "id" | "type" | "content" | "x" | "y" | "width" | "height">>
): Omit<TextLayer, "id"> {
  return {
    type: "text",
    content, x, y, width: w, height: h,
    fontSize: 90,
    fontFamily: "Geist Sans",
    fontWeight: 700,
    color: "#ffffff",
    align: "left",
    lineHeight: 1.15,
    letterSpacing: -1.5,
    rotation: 0,
    opacity: 1,
    ...opts,
  };
}

// ─── TEMPLATES ─────────────────────────────────────────────────────────────────

export const DEFAULT_TEMPLATES: Template[] = [

  // ── 1. Blank ────────────────────────────────────────────────────────────────
  {
    id: "blank",
    name: "Blank",
    description: "Start from scratch",
    category: "Basic",
    layout: "text-only",
    tags: ["blank", "empty", "custom"],
    previewColor: "#1e1b4b",
    previewGradient: ["#6366f1", "#8b5cf6"],
    screens: [
      {
        name: "Screen 1",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#6366f1", position: 0 }, { color: "#8b5cf6", position: 100 }] },
        },
        layers: [],
      },
    ],
  },

  // ── 2. Screenshot Top — text bottom ─────────────────────────────────────────
  {
    id: "screenshot-top",
    name: "App on Top",
    description: "Screenshot top 65%, feature text below",
    category: "Classic",
    layout: "screenshot-top",
    tags: ["screenshot", "classic", "top"],
    previewColor: "#0f172a",
    previewGradient: ["#1e293b", "#0f172a"],
    screens: [
      {
        name: "Feature 1",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#0f172a", position: 0 }, { color: "#1e293b", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(
            Math.round(W * 0.08), // x: 8% padding
            Math.round(H * 0.04), // y: 4% from top
            Math.round(W * 0.84), // width: 84%
            Math.round(H * 0.58), // height: 58% of screen
          ),
          textLayer("Feature headline", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 260, {
            fontSize: 100, fontWeight: 800, color: "#f8fafc",
          }),
          textLayer("One line that explains your feature clearly", Math.round(W * 0.08), Math.round(H * 0.77), Math.round(W * 0.84), 160, {
            fontSize: 52, fontWeight: 400, color: "rgba(148,163,184,0.9)", lineHeight: 1.4,
          }),
        ],
      },
      {
        name: "Feature 2",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#0f172a", position: 0 }, { color: "#1e293b", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Another great feature", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 260, {
            fontSize: 100, fontWeight: 800, color: "#f8fafc",
          }),
          textLayer("Short and punchy description text here", Math.round(W * 0.08), Math.round(H * 0.77), Math.round(W * 0.84), 160, {
            fontSize: 52, fontWeight: 400, color: "rgba(148,163,184,0.9)", lineHeight: 1.4,
          }),
        ],
      },
      {
        name: "Feature 3",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#0f172a", position: 0 }, { color: "#1e293b", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Third key feature", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 260, {
            fontSize: 100, fontWeight: 800, color: "#f8fafc",
          }),
          textLayer("Keep it simple and to the point", Math.round(W * 0.08), Math.round(H * 0.77), Math.round(W * 0.84), 160, {
            fontSize: 52, fontWeight: 400, color: "rgba(148,163,184,0.9)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 3. Screenshot Bottom — text top ─────────────────────────────────────────
  {
    id: "screenshot-bottom",
    name: "Text on Top",
    description: "Feature text top, screenshot below",
    category: "Classic",
    layout: "screenshot-bottom",
    tags: ["screenshot", "text-top", "bottom"],
    previewColor: "#1a0533",
    previewGradient: ["#7c3aed", "#4c1d95"],
    screens: [
      {
        name: "Feature 1",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#4c1d95", position: 0 }, { color: "#1a0533", position: 100 }] },
        },
        layers: [
          textLayer("Your App.\nYour Rules.", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 380, {
            fontSize: 120, fontWeight: 800, color: "#ffffff", lineHeight: 1.05,
          }),
          textLayer("Describe your key benefit in one sentence", Math.round(W * 0.08), Math.round(H * 0.245), Math.round(W * 0.84), 160, {
            fontSize: 52, fontWeight: 400, color: "rgba(221,214,254,0.85)", lineHeight: 1.4,
          }),
          screenshotWithFrame(
            Math.round(W * 0.08),
            Math.round(H * 0.38),
            Math.round(W * 0.84),
            Math.round(H * 0.56),
          ),
        ],
      },
      {
        name: "Feature 2",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#4c1d95", position: 0 }, { color: "#1a0533", position: 100 }] },
        },
        layers: [
          textLayer("Built for\nspeed.", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 380, {
            fontSize: 120, fontWeight: 800, color: "#ffffff", lineHeight: 1.05,
          }),
          textLayer("Fast, intuitive, and powerful", Math.round(W * 0.08), Math.round(H * 0.245), Math.round(W * 0.84), 160, {
            fontSize: 52, fontWeight: 400, color: "rgba(221,214,254,0.85)", lineHeight: 1.4,
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.38), Math.round(W * 0.84), Math.round(H * 0.56)),
        ],
      },
    ],
  },

  // ── 4. Screenshot Float — right side ────────────────────────────────────────
  {
    id: "screenshot-float",
    name: "Float Right",
    description: "Text left, phone floating right",
    category: "Modern",
    layout: "screenshot-float",
    tags: ["float", "modern", "side-by-side"],
    previewColor: "#022c22",
    previewGradient: ["#064e3b", "#065f46"],
    screens: [
      {
        name: "Feature 1",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#064e3b", position: 0 }, { color: "#022c22", position: 100 }] },
        },
        layers: [
          textLayer("Track\nEverything", Math.round(W * 0.06), Math.round(H * 0.15), Math.round(W * 0.52), 400, {
            fontSize: 110, fontWeight: 800, color: "#ecfdf5", lineHeight: 1.05,
          }),
          textLayer("Monitor every metric that matters to you", Math.round(W * 0.06), Math.round(H * 0.35), Math.round(W * 0.52), 200, {
            fontSize: 46, fontWeight: 400, color: "rgba(167,243,208,0.85)", lineHeight: 1.5,
          }),
          // Floating screenshot — right side, slightly cropped
          {
            ...screenshotWithFrame(
              Math.round(W * 0.48),
              Math.round(H * 0.08),
              Math.round(W * 0.65),
              Math.round(H * 0.75),
            ),
            cornerRadius: 60,
          },
        ],
      },
    ],
  },

  // ── 5. Screenshot Full — bleed with overlay ──────────────────────────────────
  {
    id: "screenshot-full",
    name: "Full Screen",
    description: "Screenshot fills canvas, text overlay at bottom",
    category: "Modern",
    layout: "screenshot-full",
    tags: ["fullscreen", "overlay", "immersive"],
    previewColor: "#1c1917",
    previewGradient: ["#292524", "#1c1917"],
    screens: [
      {
        name: "Hero",
        background: { type: "solid", color: "#000000" },
        layers: [
          // Full bleed screenshot
          screenshotZone(0, 0, W, Math.round(H * 0.78), "Drop your screenshot here", 0),
          // Gradient overlay on bottom
          {
            type: "shape" as const,
            shape: "rectangle" as const,
            x: 0,
            y: Math.round(H * 0.5),
            width: W,
            height: Math.round(H * 0.5),
            fill: "linear-gradient(to-b, transparent, #000000)",
            rotation: 0,
            opacity: 1,
          },
          textLayer("Your App's\nHero Shot", Math.round(W * 0.08), Math.round(H * 0.76), Math.round(W * 0.84), 300, {
            fontSize: 110, fontWeight: 900, color: "#ffffff", lineHeight: 1.05,
          }),
          textLayer("One bold line that sells the app", Math.round(W * 0.08), Math.round(H * 0.885), Math.round(W * 0.84), 150, {
            fontSize: 50, fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 6. Split — 2 screenshots ─────────────────────────────────────────────────
  {
    id: "screenshot-split",
    name: "Split View",
    description: "Two screenshots side by side with feature text",
    category: "Modern",
    layout: "screenshot-split",
    tags: ["split", "two-screens", "comparison"],
    previewColor: "#1e1b4b",
    previewGradient: ["#3730a3", "#1e1b4b"],
    screens: [
      {
        name: "Comparison",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#1e1b4b", position: 0 }, { color: "#312e81", position: 100 }] },
        },
        layers: [
          textLayer("Before vs After", Math.round(W * 0.08), Math.round(H * 0.06), Math.round(W * 0.84), 200, {
            fontSize: 96, fontWeight: 800, color: "#e0e7ff", lineHeight: 1.1,
          }),
          textLayer("See the difference it makes", Math.round(W * 0.08), Math.round(H * 0.17), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(199,210,254,0.8)", lineHeight: 1.4,
          }),
          // Left screenshot
          screenshotWithFrame(
            Math.round(W * 0.03),
            Math.round(H * 0.26),
            Math.round(W * 0.465),
            Math.round(H * 0.62),
            "Screenshot 1",
          ),
          // Right screenshot
          screenshotWithFrame(
            Math.round(W * 0.505),
            Math.round(H * 0.26),
            Math.round(W * 0.465),
            Math.round(H * 0.62),
            "Screenshot 2",
          ),
        ],
      },
    ],
  },

  // ── 7. Minimal — centered text only ─────────────────────────────────────────
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean text-only with a bold single message",
    category: "Basic",
    layout: "text-only",
    tags: ["minimal", "clean", "text"],
    previewColor: "#f8fafc",
    previewGradient: ["#ffffff", "#f1f5f9"],
    screens: [
      {
        name: "Tagline",
        background: { type: "solid", color: "#ffffff" },
        layers: [
          textLayer("Simple.\nPowerful.\nYours.", Math.round(W * 0.08), Math.round(H * 0.22), Math.round(W * 0.84), 600, {
            fontSize: 130, fontWeight: 900, color: "#0f172a", lineHeight: 1.05, letterSpacing: -3,
          }),
          textLayer("The app that does more with less.", Math.round(W * 0.08), Math.round(H * 0.56), Math.round(W * 0.84), 150, {
            fontSize: 52, fontWeight: 400, color: "#64748b", lineHeight: 1.4, letterSpacing: 0,
          }),
        ],
      },
    ],
  },

  // ── Category-specific templates ───────────────────────────────────────────────

  // 8. Fitness
  {
    id: "fitness",
    name: "Fitness App",
    description: "Bold energetic layout — screenshot top, stats below",
    category: "Health",
    layout: "screenshot-top",
    tags: ["fitness", "workout", "sport", "health"],
    previewColor: "#052e16",
    previewGradient: ["#065f46", "#10b981"],
    screens: [
      {
        name: "Dashboard",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#052e16", position: 0 }, { color: "#065f46", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.57)),
          textLayer("Track Every\nRep & Run", Math.round(W * 0.08), Math.round(H * 0.655), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#ecfdf5", lineHeight: 1.05,
          }),
          textLayer("Your AI-powered fitness companion", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(167,243,208,0.85)", lineHeight: 1.4,
          }),
        ],
      },
      {
        name: "Workouts",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#052e16", position: 0 }, { color: "#065f46", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.57)),
          textLayer("500+ Guided\nWorkouts", Math.round(W * 0.08), Math.round(H * 0.655), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#ecfdf5", lineHeight: 1.05,
          }),
          textLayer("From beginner to elite athlete", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(167,243,208,0.85)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // 9. Finance
  {
    id: "finance",
    name: "Finance & Banking",
    description: "Sleek dark theme — floating screenshot with data highlights",
    category: "Finance",
    layout: "screenshot-float",
    tags: ["finance", "crypto", "banking", "money"],
    previewColor: "#0c0a09",
    previewGradient: ["#0f172a", "#1e293b"],
    screens: [
      {
        name: "Portfolio",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#0f172a", position: 0 }, { color: "#020617", position: 100 }] },
        },
        layers: [
          textLayer("Your\nMoney.\nYour\nRules.", Math.round(W * 0.06), Math.round(H * 0.1), Math.round(W * 0.5), 560, {
            fontSize: 110, fontWeight: 700, color: "#f8fafc", lineHeight: 1.05,
          }),
          textLayer("Crypto & stocks in one place", Math.round(W * 0.06), Math.round(H * 0.38), Math.round(W * 0.5), 150, {
            fontSize: 46, fontWeight: 400, color: "rgba(148,163,184,0.85)", lineHeight: 1.5,
          }),
          {
            ...screenshotWithFrame(Math.round(W * 0.44), Math.round(H * 0.07), Math.round(W * 0.65), Math.round(H * 0.76)),
            cornerRadius: 55,
          },
        ],
      },
      {
        name: "Analytics",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#0f172a", position: 0 }, { color: "#020617", position: 100 }] },
        },
        layers: [
          textLayer("Real-time\nAnalytics", Math.round(W * 0.06), Math.round(H * 0.1), Math.round(W * 0.5), 400, {
            fontSize: 110, fontWeight: 700, color: "#f8fafc", lineHeight: 1.05,
          }),
          textLayer("Track your portfolio in real time", Math.round(W * 0.06), Math.round(H * 0.3), Math.round(W * 0.5), 150, {
            fontSize: 46, fontWeight: 400, color: "rgba(148,163,184,0.85)", lineHeight: 1.5,
          }),
          {
            ...screenshotWithFrame(Math.round(W * 0.44), Math.round(H * 0.07), Math.round(W * 0.65), Math.round(H * 0.76)),
            cornerRadius: 55,
          },
        ],
      },
    ],
  },

  // 10. Social
  {
    id: "social",
    name: "Social App",
    description: "Vibrant gradient — text bottom, screenshot fills the top",
    category: "Social",
    layout: "screenshot-top",
    tags: ["social", "community", "chat", "friends"],
    previewColor: "#4a044e",
    previewGradient: ["#7e22ce", "#db2777"],
    screens: [
      {
        name: "Feed",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#4a044e", position: 0 }, { color: "#9d174d", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Connect &\nGrow Together", Math.round(W * 0.08), Math.round(H * 0.665), Math.round(W * 0.84), 280, {
            fontSize: 100, fontWeight: 800, color: "#ffffff", lineHeight: 1.08,
          }),
          textLayer("Join millions sharing their passion", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(255,255,255,0.78)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // 11. E-Commerce
  {
    id: "ecommerce",
    name: "Shopping App",
    description: "Light airy layout with product screenshot",
    category: "Shopping",
    layout: "screenshot-bottom",
    tags: ["ecommerce", "shopping", "store", "marketplace"],
    previewColor: "#fff1f2",
    previewGradient: ["#fecdd3", "#fff1f2"],
    screens: [
      {
        name: "Discover",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#fff1f2", position: 0 }, { color: "#fce7f3", position: 100 }] },
        },
        layers: [
          textLayer("Shop\nSmarter,\nLive Better", Math.round(W * 0.08), Math.round(H * 0.07), Math.round(W * 0.84), 480, {
            fontSize: 115, fontWeight: 800, color: "#881337", lineHeight: 1.05, letterSpacing: -2,
          }),
          textLayer("1M+ products delivered to your door", Math.round(W * 0.08), Math.round(H * 0.265), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(136,19,55,0.7)", lineHeight: 1.4, letterSpacing: 0,
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.37), Math.round(W * 0.84), Math.round(H * 0.565)),
        ],
      },
    ],
  },

  // 12. Gaming
  {
    id: "gaming",
    name: "Gaming",
    description: "Dark neon — screenshot center-top with glow effect",
    category: "Entertainment",
    layout: "screenshot-top",
    tags: ["gaming", "game", "neon", "dark"],
    previewColor: "#020617",
    previewGradient: ["#1e0a3c", "#0f172a"],
    screens: [
      {
        name: "Lobby",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#020617", position: 0 }, { color: "#1e0a3c", position: 60 }, { color: "#0f172a", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.57)),
          textLayer("Level Up\nYour Game", Math.round(W * 0.08), Math.round(H * 0.655), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 900, color: "#c084fc", lineHeight: 1.05,
          }),
          textLayer("Compete. Win. Dominate the leaderboard.", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(192,132,252,0.7)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 13. Dating App ──────────────────────────────────────────────────────────
  {
    id: "dating",
    name: "Dating App",
    description: "Vibrant gradient with romantic vibes",
    category: "Social",
    layout: "screenshot-top",
    tags: ["dating", "social", "romance", "vibrant"],
    previewColor: "#be185d",
    previewGradient: ["#f472b6", "#ec4899", "#be185d"],
    screens: [
      {
        name: "Match",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#f472b6", position: 0 }, { color: "#ec4899", position: 50 }, { color: "#be185d", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Find Your\nPerfect Match", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#ffffff", lineHeight: 1.05,
          }),
          textLayer("Connect with people who share your interests", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(255,255,255,0.85)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 14. Food Delivery ───────────────────────────────────────────────────────
  {
    id: "food-delivery",
    name: "Food Delivery",
    description: "Appetizing layout for food apps",
    category: "Shopping",
    layout: "screenshot-bottom",
    tags: ["food", "delivery", "restaurant", "order"],
    previewColor: "#fb923c",
    previewGradient: ["#fed7aa", "#fb923c"],
    screens: [
      {
        name: "Menu",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#fed7aa", position: 0 }, { color: "#fb923c", position: 100 }] },
        },
        layers: [
          textLayer("Your favorite\nfood, delivered", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 320, {
            fontSize: 110, fontWeight: 800, color: "#7c2d12", lineHeight: 1.05,
          }),
          textLayer("Fast delivery from local restaurants", Math.round(W * 0.08), Math.round(H * 0.24), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(124,45,18,0.75)", lineHeight: 1.4,
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.38), Math.round(W * 0.84), Math.round(H * 0.56)),
        ],
      },
    ],
  },

  // ── 15. Travel & Tourism ────────────────────────────────────────────────────
  {
    id: "travel",
    name: "Travel & Tourism",
    description: "Adventurous layout with scenic vibes",
    category: "Entertainment",
    layout: "screenshot-full",
    tags: ["travel", "tourism", "adventure", "vacation"],
    previewColor: "#0284c7",
    previewGradient: ["#38bdf8", "#0284c7"],
    screens: [
      {
        name: "Explore",
        background: { type: "solid", color: "#0c4a6e" },
        layers: [
          screenshotZone(0, 0, W, Math.round(H * 0.7), "Drop your screenshot here", 0),
          {
            type: "shape" as const,
            shape: "rectangle" as const,
            x: 0,
            y: Math.round(H * 0.45),
            width: W,
            height: Math.round(H * 0.55),
            fill: "linear-gradient(to-b, transparent, #0c4a6e)",
            rotation: 0,
            opacity: 1,
          },
          textLayer("Explore the\nworld with us", Math.round(W * 0.08), Math.round(H * 0.74), Math.round(W * 0.84), 300, {
            fontSize: 110, fontWeight: 900, color: "#ffffff", lineHeight: 1.05,
          }),
          textLayer("Book flights, hotels, and experiences", Math.round(W * 0.08), Math.round(H * 0.875), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(255,255,255,0.8)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 16. Meditation & Wellness ───────────────────────────────────────────────
  {
    id: "meditation",
    name: "Meditation & Wellness",
    description: "Calm and peaceful design",
    category: "Health",
    layout: "screenshot-bottom",
    tags: ["meditation", "wellness", "calm", "mindfulness"],
    previewColor: "#818cf8",
    previewGradient: ["#c7d2fe", "#818cf8"],
    screens: [
      {
        name: "Breathe",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#c7d2fe", position: 0 }, { color: "#a5b4fc", position: 50 }, { color: "#818cf8", position: 100 }] },
        },
        layers: [
          textLayer("Find your\ninner peace", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 320, {
            fontSize: 110, fontWeight: 700, color: "#312e81", lineHeight: 1.05,
          }),
          textLayer("Guided meditation for stress relief", Math.round(W * 0.08), Math.round(H * 0.24), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(49,46,129,0.7)", lineHeight: 1.4,
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.38), Math.round(W * 0.84), Math.round(H * 0.56)),
        ],
      },
    ],
  },

  // ── 17. Music Streaming ─────────────────────────────────────────────────────
  {
    id: "music",
    name: "Music Streaming",
    description: "Dynamic layout for music apps",
    category: "Entertainment",
    layout: "screenshot-top",
    tags: ["music", "streaming", "audio", "playlist"],
    previewColor: "#10b981",
    previewGradient: ["#34d399", "#10b981"],
    screens: [
      {
        name: "Now Playing",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#065f46", position: 0 }, { color: "#064e3b", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("100M+ Songs\nAd-Free", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#d1fae5", lineHeight: 1.05,
          }),
          textLayer("Stream unlimited music, anytime, anywhere", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(209,250,229,0.75)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 18. E-Learning ──────────────────────────────────────────────────────────
  {
    id: "elearning",
    name: "E-Learning",
    description: "Educational layout with progress focus",
    category: "Education",
    layout: "screenshot-top",
    tags: ["education", "learning", "courses", "study"],
    previewColor: "#4f46e5",
    previewGradient: ["#6366f1", "#4f46e5"],
    screens: [
      {
        name: "Course",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#4f46e5", position: 0 }, { color: "#3730a3", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Learn anything,\nanytime", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#ffffff", lineHeight: 1.05,
          }),
          textLayer("1000+ courses from expert instructors", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(255,255,255,0.8)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 19. Real Estate ─────────────────────────────────────────────────────────
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Professional layout for property apps",
    category: "Business",
    layout: "screenshot-bottom",
    tags: ["real estate", "property", "home", "apartment"],
    previewColor: "#0f766e",
    previewGradient: ["#5eead4", "#0f766e"],
    screens: [
      {
        name: "Property",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#ccfbf1", position: 0 }, { color: "#5eead4", position: 50 }, { color: "#0f766e", position: 100 }] },
        },
        layers: [
          textLayer("Find your\ndream home", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 320, {
            fontSize: 110, fontWeight: 800, color: "#134e4a", lineHeight: 1.05,
          }),
          textLayer("Search thousands of listings in your area", Math.round(W * 0.08), Math.round(H * 0.24), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(19,78,74,0.7)", lineHeight: 1.4,
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.38), Math.round(W * 0.84), Math.round(H * 0.56)),
        ],
      },
    ],
  },

  // ── 20. Productivity ────────────────────────────────────────────────────────
  {
    id: "productivity",
    name: "Productivity",
    description: "Clean layout for task management",
    category: "Business",
    layout: "screenshot-float",
    tags: ["productivity", "tasks", "todo", "planner"],
    previewColor: "#dc2626",
    previewGradient: ["#fca5a5", "#dc2626"],
    screens: [
      {
        name: "Tasks",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#fee2e2", position: 0 }, { color: "#fca5a5", position: 50 }, { color: "#dc2626", position: 100 }] },
        },
        layers: [
          textLayer("Get more\ndone, daily", Math.round(W * 0.06), Math.round(H * 0.15), Math.round(W * 0.52), 400, {
            fontSize: 110, fontWeight: 800, color: "#7f1d1d", lineHeight: 1.05,
          }),
          textLayer("Organize tasks, set reminders, achieve goals", Math.round(W * 0.06), Math.round(H * 0.35), Math.round(W * 0.52), 200, {
            fontSize: 46, fontWeight: 400, color: "rgba(127,29,29,0.75)", lineHeight: 1.5,
          }),
          {
            ...screenshotWithFrame(
              Math.round(W * 0.48),
              Math.round(H * 0.08),
              Math.round(W * 0.65),
              Math.round(H * 0.75),
            ),
            cornerRadius: 60,
          },
        ],
      },
    ],
  },

  // ── 21. AI Chatbot ──────────────────────────────────────────────────────────
  {
    id: "ai-chatbot",
    name: "AI Chatbot",
    description: "Futuristic AI assistant layout",
    category: "Technology",
    layout: "screenshot-top",
    tags: ["ai", "chatbot", "assistant", "tech"],
    previewColor: "#7c3aed",
    previewGradient: ["#a78bfa", "#7c3aed"],
    screens: [
      {
        name: "Chat",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#1e1b4b", position: 0 }, { color: "#4c1d95", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Your AI\ncompanion", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#e9d5ff", lineHeight: 1.05,
          }),
          textLayer("Chat with advanced AI, get instant answers", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(233,213,255,0.75)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 22. Weather ─────────────────────────────────────────────────────────────
  {
    id: "weather",
    name: "Weather",
    description: "Clean weather app design",
    category: "Utility",
    layout: "screenshot-split",
    tags: ["weather", "forecast", "climate", "utility"],
    previewColor: "#0ea5e9",
    previewGradient: ["#7dd3fc", "#0ea5e9"],
    screens: [
      {
        name: "Forecast",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#7dd3fc", position: 0 }, { color: "#38bdf8", position: 50 }, { color: "#0ea5e9", position: 100 }] },
        },
        layers: [
          textLayer("Accurate weather\nforecasts", Math.round(W * 0.08), Math.round(H * 0.06), Math.round(W * 0.84), 280, {
            fontSize: 100, fontWeight: 800, color: "#075985", lineHeight: 1.05,
          }),
          textLayer("Hourly and 7-day predictions", Math.round(W * 0.08), Math.round(H * 0.185), Math.round(W * 0.84), 100, {
            fontSize: 48, fontWeight: 400, color: "rgba(7,89,133,0.7)", lineHeight: 1.4,
          }),
          screenshotWithFrame(Math.round(W * 0.055), Math.round(H * 0.28), Math.round(W * 0.425), Math.round(H * 0.655)),
          screenshotWithFrame(Math.round(W * 0.52), Math.round(H * 0.28), Math.round(W * 0.425), Math.round(H * 0.655)),
        ],
      },
    ],
  },

  // ── 23. Photo Editor ────────────────────────────────────────────────────────
  {
    id: "photo-editor",
    name: "Photo Editor",
    description: "Creative layout for photo editing apps",
    category: "Creative",
    layout: "screenshot-full",
    tags: ["photo", "editor", "creative", "filters"],
    previewColor: "#ea580c",
    previewGradient: ["#fb923c", "#ea580c"],
    screens: [
      {
        name: "Edit",
        background: { type: "solid", color: "#7c2d12" },
        layers: [
          screenshotZone(0, 0, W, Math.round(H * 0.72), "Drop your screenshot here", 0),
          {
            type: "shape" as const,
            shape: "rectangle" as const,
            x: 0,
            y: Math.round(H * 0.48),
            width: W,
            height: Math.round(H * 0.52),
            fill: "linear-gradient(to-b, transparent, #7c2d12)",
            rotation: 0,
            opacity: 1,
          },
          textLayer("Professional\nphoto editing", Math.round(W * 0.08), Math.round(H * 0.75), Math.round(W * 0.84), 300, {
            fontSize: 110, fontWeight: 900, color: "#ffffff", lineHeight: 1.05,
          }),
          textLayer("Powerful tools, stunning results", Math.round(W * 0.08), Math.round(H * 0.88), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(255,255,255,0.8)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 24. News Reader ─────────────────────────────────────────────────────────
  {
    id: "news",
    name: "News Reader",
    description: "Editorial layout for news apps",
    category: "Media",
    layout: "screenshot-top",
    tags: ["news", "media", "articles", "reading"],
    previewColor: "#1f2937",
    previewGradient: ["#374151", "#1f2937"],
    screens: [
      {
        name: "Headlines",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#374151", position: 0 }, { color: "#1f2937", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Stay informed,\nstay ahead", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#f9fafb", lineHeight: 1.05,
          }),
          textLayer("Breaking news from trusted sources", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(249,250,251,0.75)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 25. Crypto Trading ──────────────────────────────────────────────────────
  {
    id: "crypto",
    name: "Crypto Trading",
    description: "Modern fintech for cryptocurrency",
    category: "Finance",
    layout: "screenshot-top",
    tags: ["crypto", "trading", "bitcoin", "fintech"],
    previewColor: "#f59e0b",
    previewGradient: ["#fbbf24", "#f59e0b"],
    screens: [
      {
        name: "Portfolio",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#0c0a09", position: 0 }, { color: "#1c1917", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Trade crypto\nwith confidence", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#fbbf24", lineHeight: 1.05,
          }),
          textLayer("Buy, sell, and track 100+ cryptocurrencies", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(251,191,36,0.75)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 26. Pet Care ────────────────────────────────────────────────────────────
  {
    id: "pet-care",
    name: "Pet Care",
    description: "Friendly layout for pet apps",
    category: "Lifestyle",
    layout: "screenshot-bottom",
    tags: ["pet", "animals", "care", "veterinary"],
    previewColor: "#f97316",
    previewGradient: ["#fdba74", "#f97316"],
    screens: [
      {
        name: "Profile",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#ffedd5", position: 0 }, { color: "#fdba74", position: 50 }, { color: "#f97316", position: 100 }] },
        },
        layers: [
          textLayer("Everything\nfor your pet", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 320, {
            fontSize: 110, fontWeight: 800, color: "#7c2d12", lineHeight: 1.05,
          }),
          textLayer("Track health, find vets, book appointments", Math.round(W * 0.08), Math.round(H * 0.24), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(124,45,18,0.7)", lineHeight: 1.4,
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.38), Math.round(W * 0.84), Math.round(H * 0.56)),
        ],
      },
    ],
  },

  // ── 27. Recipe & Cooking ────────────────────────────────────────────────────
  {
    id: "recipe",
    name: "Recipe & Cooking",
    description: "Delicious layout for recipe apps",
    category: "Lifestyle",
    layout: "screenshot-top",
    tags: ["recipe", "cooking", "food", "chef"],
    previewColor: "#ef4444",
    previewGradient: ["#fca5a5", "#ef4444"],
    screens: [
      {
        name: "Recipe",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#fee2e2", position: 0 }, { color: "#fca5a5", position: 50 }, { color: "#ef4444", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Cook like\na pro", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#7f1d1d", lineHeight: 1.05,
          }),
          textLayer("1000+ recipes with step-by-step guides", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(127,29,29,0.75)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 28. Parking ─────────────────────────────────────────────────────────────
  {
    id: "parking",
    name: "Parking",
    description: "Simple utility for parking apps",
    category: "Utility",
    layout: "screenshot-float",
    tags: ["parking", "car", "navigation", "utility"],
    previewColor: "#0891b2",
    previewGradient: ["#67e8f9", "#0891b2"],
    screens: [
      {
        name: "Find Spot",
        background: {
          type: "gradient",
          gradient: { direction: "to-br", stops: [{ color: "#cffafe", position: 0 }, { color: "#67e8f9", position: 50 }, { color: "#0891b2", position: 100 }] },
        },
        layers: [
          textLayer("Find parking\nin seconds", Math.round(W * 0.06), Math.round(H * 0.15), Math.round(W * 0.52), 400, {
            fontSize: 110, fontWeight: 800, color: "#164e63", lineHeight: 1.05,
          }),
          textLayer("Real-time availability, easy payment", Math.round(W * 0.06), Math.round(H * 0.35), Math.round(W * 0.52), 200, {
            fontSize: 46, fontWeight: 400, color: "rgba(22,78,99,0.75)", lineHeight: 1.5,
          }),
          {
            ...screenshotWithFrame(
              Math.round(W * 0.48),
              Math.round(H * 0.08),
              Math.round(W * 0.65),
              Math.round(H * 0.75),
            ),
            cornerRadius: 60,
          },
        ],
      },
    ],
  },

  // ── 29. Calendar & Events ───────────────────────────────────────────────────
  {
    id: "calendar",
    name: "Calendar & Events",
    description: "Organized layout for calendar apps",
    category: "Business",
    layout: "screenshot-top",
    tags: ["calendar", "events", "schedule", "planner"],
    previewColor: "#8b5cf6",
    previewGradient: ["#c4b5fd", "#8b5cf6"],
    screens: [
      {
        name: "Schedule",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#ede9fe", position: 0 }, { color: "#c4b5fd", position: 50 }, { color: "#8b5cf6", position: 100 }] },
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.04), Math.round(W * 0.84), Math.round(H * 0.58)),
          textLayer("Never miss\nan event", Math.round(W * 0.08), Math.round(H * 0.66), Math.round(W * 0.84), 280, {
            fontSize: 105, fontWeight: 800, color: "#4c1d95", lineHeight: 1.05,
          }),
          textLayer("Smart calendar with reminders and sync", Math.round(W * 0.08), Math.round(H * 0.78), Math.round(W * 0.84), 130, {
            fontSize: 48, fontWeight: 400, color: "rgba(76,29,149,0.75)", lineHeight: 1.4,
          }),
        ],
      },
    ],
  },

  // ── 30. Job Search ──────────────────────────────────────────────────────────
  {
    id: "job-search",
    name: "Job Search",
    description: "Professional layout for job platforms",
    category: "Business",
    layout: "screenshot-bottom",
    tags: ["job", "career", "hiring", "recruitment"],
    previewColor: "#0f172a",
    previewGradient: ["#334155", "#0f172a"],
    screens: [
      {
        name: "Browse",
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#f1f5f9", position: 0 }, { color: "#cbd5e1", position: 50 }, { color: "#64748b", position: 100 }] },
        },
        layers: [
          textLayer("Your dream job\nawaits", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 320, {
            fontSize: 110, fontWeight: 800, color: "#0f172a", lineHeight: 1.05,
          }),
          textLayer("Thousands of opportunities, one platform", Math.round(W * 0.08), Math.round(H * 0.24), Math.round(W * 0.84), 130, {
            fontSize: 50, fontWeight: 400, color: "rgba(15,23,42,0.7)", lineHeight: 1.4,
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.38), Math.round(W * 0.84), Math.round(H * 0.56)),
        ],
      },
    ],
  },
];

export const TEMPLATE_CATEGORIES = [
  "All",
  "Basic",
  "Classic",
  "Modern",
  "Health",
  "Finance",
  "Social",
  "Shopping",
  "Entertainment",
  "Education",
  "Business",
  "Technology",
  "Utility",
  "Media",
  "Creative",
  "Lifestyle",
];

// Layout display metadata for UI
export const LAYOUT_META: Record<string, { icon: string; label: string; description: string }> = {
  "screenshot-top":    { icon: "⬆️", label: "App Top",     description: "Screenshot top, text below" },
  "screenshot-bottom": { icon: "⬇️", label: "App Bottom",  description: "Text top, screenshot below" },
  "screenshot-float":  { icon: "✨", label: "Float Right",  description: "Screenshot floats beside text" },
  "screenshot-full":   { icon: "🖼️", label: "Full Screen", description: "Screenshot fills the canvas" },
  "screenshot-split":  { icon: "⬛", label: "Split View",   description: "Two screenshots side by side" },
  "text-only":         { icon: "✍️", label: "Text Only",   description: "No screenshot zone" },
};
