import { Template, ScreenshotLayer, TextLayer, ShapeLayer, TemplateScreen } from "@/lib/types";

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

// Helper: shape layer
function shapeLayer(
  shape: import("@/lib/types").ShapeType,
  x: number, y: number, w: number, h: number,
  fill: string,
  opts: Partial<Omit<ShapeLayer, "id" | "type" | "shape" | "x" | "y" | "width" | "height" | "fill">> = {}
): Omit<ShapeLayer, "id"> {
  return {
    type: "shape",
    shape, x, y, width: w, height: h, fill,
    rotation: 0, opacity: 1,
    ...opts,
  };
}


// ─── TEMPLATES ─────────────────────────────────────────────────────────────────

export const DEFAULT_TEMPLATES: Template[] = [

  // ── 1. Blank ────────────────────────────────────────────────────────────────
  {
    id: "blank",
    name: "Blank",
    description: "Start from scratch (5 empty screens)",
    category: "Basic",
    layout: "text-only",
    tags: ["blank", "empty", "custom"],
    previewColor: "#1e1b4b",
    previewGradient: ["#6366f1", "#8b5cf6"],
    screens: Array.from({ length: 5 }).map((_, i) => ({
      name: `Screen ${i + 1}`,
      background: {
        type: "gradient",
        gradient: { direction: "to-br", stops: [{ color: "#6366f1", position: 0 }, { color: "#8b5cf6", position: 100 }] },
      },
      layers: [
        { ...screenshotWithFrame(129, 699, 1032, 1957) } as any
      ],
    })),
  },

  // ── 2. Premium Dark ─────────────────────────────────────────────────────────
  {
    id: "premium-dark",
    name: "Premium Dark",
    description: "Deep elegant tones with premium 3D glows",
    category: "Modern",
    layout: "screenshot-bottom",
    tags: ["dark", "premium", "modern", "glow"],
    previewColor: "#0f172a",
    previewGradient: ["#1e293b", "#020617"],
    screens: Array.from({ length: 5 }).map((_, i) => {
      const isFirst = i === 0;
      const glowColors = [
        "rgba(139,92,246,0.3)", // purple
        "rgba(59,130,246,0.3)", // blue
        "rgba(236,72,153,0.3)", // pink
        "rgba(16,185,129,0.3)", // emerald
        "rgba(245,158,11,0.3)"  // amber
      ];
      return {
        name: isFirst ? "Hero Cover" : `Feature ${i}`,
        background: {
          type: "mesh",
          mesh: {
            topLeft: "#0f172a",
            topRight: i % 2 === 0 ? "#1e1b4b" : "#0f172a",
            bottomLeft: "#020617",
            bottomRight: i % 2 !== 0 ? "#172554" : "#020617"
          },
          pattern: {
            type: "noise",
            color: "#ffffff",
            opacity: 0.04,
            size: 1,
            spacing: 1
          }
        },
        layers: [
          // Background Glow Blob
          shapeLayer("circle", W * 0.1, H * 0.3, W * 0.8, W * 0.8, glowColors[i], { opacity: 0.8 }),
          
          textLayer(
            isFirst ? "Redefining\nThe Future." : `Powerful Feature\nNumber ${i}`,
            Math.round(W * 0.08), Math.round(H * 0.1), Math.round(W * 0.84), 380,
            { fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05 }
          ),
          textLayer(
            isFirst ? "A short tagline describing your incredible application." : "Discover insights, stay connected, and boost productivity effortlessly.",
            Math.round(W * 0.08), Math.round(H * 0.28), Math.round(W * 0.84), 160,
            { fontSize: 50, fontWeight: 400, color: "rgba(148,163,184,0.9)", lineHeight: 1.4 }
          ),
          
          // Accent Pill
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.06), 200, 50, "rgba(255,255,255,0.1)", { 
            stroke: "rgba(255,255,255,0.2)", strokeWidth: 2, cornerRadius: 100 
          }),
          textLayer(isFirst ? "NEW" : "PRO", Math.round(W * 0.1), Math.round(H * 0.065), 160, 40, {
            fontSize: 28, fontWeight: 800, color: "#ffffff", align: "center", letterSpacing: 2
          }),

          screenshotWithFrame(
            Math.round(W * 0.08),
            Math.round(H * 0.42),
            Math.round(W * 0.84),
            2400,
            "Drop Screenshot"
          ),
        ],
      } as TemplateScreen;
    }),
  },

  // ── 3. Minimal Light ────────────────────────────────────────────────────────
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean, high-contrast, airy design",
    category: "Classic",
    layout: "screenshot-top",
    tags: ["light", "clean", "white", "minimal"],
    previewColor: "#f8fafc",
    previewGradient: ["#ffffff", "#e2e8f0"],
    screens: Array.from({ length: 5 }).map((_, i) => {
      const isFirst = i === 0;
      return {
        name: isFirst ? "Intro" : `Details ${i}`,
        background: {
          type: "solid",
          color: "#f8fafc",
          pattern: {
            type: "grid",
            color: "#0f172a",
            opacity: 0.03,
            size: 1,
            spacing: 60
          }
        },
        layers: [
          // Subtle background accent
          shapeLayer("circle", W * 0.5, -W * 0.2, W * 0.8, W * 0.8, "rgba(226,232,240,0.5)"),
          
          screenshotWithFrame(
            Math.round(W * 0.12),
            Math.round(H * 0.06),
            Math.round(W * 0.76),
            1800,
            "Drop Screenshot"
          ),
          textLayer(
            isFirst ? "Simply\nBeautiful." : `Clarity in\nEvery Step.`,
            Math.round(W * 0.12), Math.round(H * 0.75), Math.round(W * 0.76), 300,
            { fontSize: 140, fontWeight: 800, color: "#0f172a", lineHeight: 1.0 }
          ),
          textLayer(
            isFirst ? "Your application, stripped down to its perfect essence." : "Focus on what matters without the unnecessary clutter.",
            Math.round(W * 0.12), Math.round(H * 0.89), Math.round(W * 0.76), 160,
            { fontSize: 46, fontWeight: 500, color: "#64748b", lineHeight: 1.5 }
          ),
        ],
      } as TemplateScreen;
    }),
  },

  // ── 4. Vibrant Playful ──────────────────────────────────────────────────────
  {
    id: "vibrant-playful",
    name: "Vibrant Playful",
    description: "Fun geometric shapes with energetic gradients",
    category: "Social",
    layout: "screenshot-float",
    tags: ["fun", "vibrant", "shapes", "colorful"],
    previewColor: "#fb923c",
    previewGradient: ["#f43f5e", "#f59e0b"],
    screens: Array.from({ length: 5 }).map((_, i) => {
      const isFirst = i === 0;
      const shapes: import("@/lib/types").ShapeType[] = ["star", "triangle", "diamond", "hexagon", "crescent"];
      return {
        name: isFirst ? "Welcome" : `Feature ${i}`,
        background: {
          type: "mesh",
          mesh: {
            topLeft: i % 2 === 0 ? "#f43f5e" : "#e11d48",
            topRight: "#f97316",
            bottomLeft: "#f59e0b",
            bottomRight: i % 2 !== 0 ? "#f43f5e" : "#ec4899"
          }
        },
        layers: [
          // Floating Shapes in background
          shapeLayer(shapes[i % 5], W * 0.1, H * 0.05, 180, 180, "rgba(255,255,255,0.2)", { rotation: 15 * i }),
          shapeLayer(shapes[(i+1) % 5], W * 0.7, H * 0.8, 220, 220, "rgba(255,255,255,0.15)", { rotation: -20 * i }),
          
          textLayer(
            isFirst ? "Make It\nFun!" : `Enjoy Every\nMoment`,
            Math.round(W * 0.08), Math.round(H * 0.15), Math.round(W * 0.45), 400,
            { fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left" }
          ),
          textLayer(
            isFirst ? "The most vibrant app experience out there." : "Bring joy to your daily routines and tasks.",
            Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.42), 200,
            { fontSize: 48, fontWeight: 600, color: "rgba(255,255,255,0.8)", lineHeight: 1.4, align: "left" }
          ),
          
          screenshotWithFrame(
            Math.round(W * 0.45),
            Math.round(H * 0.25),
            Math.round(W * 0.8),
            2400,
            "Drop Screenshot"
          ),
        ],
      } as TemplateScreen;
    }),
  },

  // ── 5. Professional Blue ────────────────────────────────────────────────────
  {
    id: "professional-blue",
    name: "Professional Blue",
    description: "Sleek, trusted blue tones perfect for business/finance",
    category: "Finance",
    layout: "screenshot-top",
    tags: ["business", "finance", "blue", "trusted"],
    previewColor: "#1e3a8a",
    previewGradient: ["#2563eb", "#1e3a8a"],
    screens: Array.from({ length: 5 }).map((_, i) => {
      const isFirst = i === 0;
      return {
        name: isFirst ? "Overview" : `Detail ${i}`,
        background: {
          type: "gradient",
          gradient: { direction: "to-b", stops: [{ color: "#eff6ff", position: 0 }, { color: "#dbeafe", position: 100 }] },
          pattern: {
            type: "lines",
            color: "#bfdbfe",
            opacity: 0.5,
            size: 2,
            spacing: 40
          }
        },
        layers: [
          // Top accent bar
          shapeLayer("rectangle", 0, 0, W, 20, "#2563eb"),
          
          screenshotWithFrame(
            Math.round(W * 0.1),
            Math.round(H * 0.08),
            Math.round(W * 0.8),
            2400,
            "Drop Screenshot"
          ),
          
          // Clean data card behind text
          shapeLayer("rectangle", Math.round(W * 0.05), Math.round(H * 0.74), Math.round(W * 0.9), Math.round(H * 0.24), "#ffffff", {
            cornerRadius: 40,
            shadow: { blur: 40, color: "rgba(37,99,235,0.1)", spread: 0, offsetX: 0, offsetY: 20 }
          }),
          
          textLayer(
            isFirst ? "Secure.\nReliable.\Fast." : `Grow Your\nBusiness.`,
            Math.round(W * 0.12), Math.round(H * 0.77), Math.round(W * 0.76), 250,
            { fontSize: 90, fontWeight: 800, color: "#1e3a8a", lineHeight: 1.1 }
          ),
          textLayer(
            isFirst ? "Enterprise-grade features for everyone." : "Advanced analytics and trusted security protocols.",
            Math.round(W * 0.12), Math.round(H * 0.89), Math.round(W * 0.76), 160,
            { fontSize: 44, fontWeight: 500, color: "#64748b", lineHeight: 1.5 }
          ),
        ],
      } as TemplateScreen;
    }),
  },

  // ── 6. Neon Cyber ───────────────────────────────────────────────────────────
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Deep space aesthetic with bright neon glowing lines",
    category: "Entertainment",
    layout: "screenshot-full",
    tags: ["gaming", "cyber", "neon", "dark"],
    previewColor: "#000000",
    previewGradient: ["#020617", "#000000"],
    screens: Array.from({ length: 5 }).map((_, i) => {
      const isFirst = i === 0;
      return {
        name: isFirst ? "Enter" : `Level ${i}`,
        background: {
          type: "solid",
          color: "#000000",
          pattern: {
            type: "dots",
            color: "#06b6d4",
            opacity: 0.15,
            size: 2,
            spacing: 50
          }
        },
        layers: [
          // Cyber shapes
          shapeLayer("rectangle", 0, H * 0.65, W, 8, "#ec4899", { shadow: { blur: 20, color: "#ec4899", spread: 5, offsetX:0, offsetY:0 } }),
          shapeLayer("rectangle", W * 0.8, H * 0.1, 40, 40, "transparent", { stroke: "#06b6d4", strokeWidth: 4, cornerRadius: 8 }),
          shapeLayer("circle", W * 0.1, H * 0.85, 20, 20, "#06b6d4", { shadow: { blur: 20, color: "#06b6d4", spread: 5, offsetX:0, offsetY:0 } }),
          
          screenshotZone(0, 0, W, Math.round(H * 0.64), "Drop Screenshot", 0),
          
          textLayer(
            isFirst ? "INITIATE\nSEQUENCE" : `OVERRIDE\nSYSTEM`,
            Math.round(W * 0.08), Math.round(H * 0.7), Math.round(W * 0.84), 300,
            { fontSize: 130, fontWeight: 900, color: "#ec4899", lineHeight: 1.05, letterSpacing: 5 }
          ),
          textLayer(
            isFirst ? "Experience the next generation of power." : "Access unparalleled control and precision.",
            Math.round(W * 0.08), Math.round(H * 0.85), Math.round(W * 0.84), 150,
            { fontSize: 46, fontWeight: 400, color: "#06b6d4", lineHeight: 1.4, letterSpacing: 2 }
          ),
        ],
      } as TemplateScreen;
    }),
  },

  // ── 7. Dynamic Flow ─────────────────────────────────────────────────────────
  {
    id: "dynamic-flow",
    name: "Dynamic Flow",
    description: "Creative split layout with text on the right and screenshot on the left",
    category: "Creative",
    layout: "screenshot-float-reverse",
    tags: ["creative", "flow", "dynamic", "asymmetric"],
    previewColor: "#8b5cf6",
    previewGradient: ["#8b5cf6", "#ec4899"],
    screens: Array.from({ length: 5 }).map((_, i) => {
      const isFirst = i === 0;
      const shapes: import("@/lib/types").ShapeType[] = ["hexagon", "diamond", "star", "circle", "triangle"];
      return {
        name: isFirst ? "Welcome" : `Feature ${i}`,
        background: {
          type: "mesh",
          mesh: {
            topLeft: i % 2 === 0 ? "#7c3aed" : "#9333ea",
            topRight: "#db2777",
            bottomLeft: "#4f46e5",
            bottomRight: i % 2 !== 0 ? "#e11d48" : "#c026d3"
          }
        },
        layers: [
          shapeLayer(shapes[i % 5], W * 0.7, H * 0.05, 180, 180, "rgba(255,255,255,0.2)", { rotation: 15 * i }),
          shapeLayer(shapes[(i+1) % 5], W * 0.1, H * 0.8, 220, 220, "rgba(255,255,255,0.15)", { rotation: -20 * i }),
          
          textLayer(
            isFirst ? "Stand\nOut." : `Smooth\nJourney`,
            Math.round(W * 0.5), Math.round(H * 0.15), Math.round(W * 0.42), 400,
            { fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left" }
          ),
          textLayer(
            isFirst ? "Unleash the full potential of your creativity today." : "An experience so smooth it feels like magic.",
            Math.round(W * 0.5), Math.round(H * 0.32), Math.round(W * 0.42), 200,
            { fontSize: 48, fontWeight: 600, color: "rgba(255,255,255,0.8)", lineHeight: 1.4, align: "left" }
          ),
          
          screenshotWithFrame(
            Math.round(W * -0.25),
            Math.round(H * 0.25),
            Math.round(W * 0.8),
            2400,
            "Drop Screenshot"
          ),
        ],
      } as TemplateScreen;
    }),
  },
];

export const TEMPLATE_CATEGORIES = [
  'All',
  'Basic',
  'Classic',
  'Modern',
  'Health',
  'Finance',
  'Social',
  'Shopping',
  'Entertainment',
  'Education',
  'Business',
  'Technology',
  'Utility',
  'Media',
  'Creative',
  'Lifestyle',
];

// Layout display metadata for UI
export const LAYOUT_META: Record<string, { icon: string; label: string; description: string }> = {
  'screenshot-top':    { icon: '⬆️', label: 'App Top',     description: 'Screenshot top, text below' },
  'screenshot-bottom': { icon: '⬇️', label: 'App Bottom',  description: 'Text top, screenshot below' },
  'screenshot-float':  { icon: '✨', label: 'Float Right',  description: 'Screenshot floats beside text' },
  'screenshot-full':   { icon: '🖼️', label: 'Full Screen', description: 'Screenshot fills the canvas' },
  'screenshot-split':  { icon: '⬛', label: 'Split View',   description: 'Two screenshots side by side' },
  'text-only':         { icon: '✍️', label: 'Text Only',   description: 'No screenshot zone' },
};

