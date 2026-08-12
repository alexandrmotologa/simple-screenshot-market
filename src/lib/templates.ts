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
