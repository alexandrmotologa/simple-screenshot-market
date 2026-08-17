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
  rotation = 0,
): Omit<ScreenshotLayer, "id"> {
  return {
    ...screenshotZone(x, y, w, h, label, 55),
    rotation,
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
    fontFamily: "Inter",
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
    description: "Deep elegant tones with premium 3D glows (10 Screens)",
    category: "Modern",
    layout: "screenshot-bottom",
    tags: ["dark", "premium", "modern", "glow"],
    previewColor: "#0f172a",
    previewGradient: ["#1e293b", "#020617"],
    screens: [
      // Screen 1: Hero Cover
      {
        name: "Hero Cover",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#1e1b4b", bottomLeft: "#020617", bottomRight: "#0f172a" },
          pattern: { type: "noise", color: "#ffffff", opacity: 0.03, size: 1, spacing: 1 }
        },
        layers: [
          shapeLayer("circle", W * 0.1, H * 0.32, W * 0.8, W * 0.8, "rgba(139,92,246,0.25)", { opacity: 0.8 }),
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 320, 85, "rgba(99, 102, 241, 0.25)", {
            stroke: "rgba(165, 180, 252, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("NEW RELEASE", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 320, 85, {
            fontSize: 48, fontWeight: 900, color: "#ffffff", align: "center", letterSpacing: 4
          }),
          textLayer("Redefining\nThe Future.", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("The all-in-one platform built for speed, elegance, and scale.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 2: Real-time Analytics
      {
        name: "Analytics",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e1b4b", topRight: "#0f172a", bottomLeft: "#020617", bottomRight: "#172554" },
          pattern: { type: "noise", color: "#ffffff", opacity: 0.03, size: 1, spacing: 1 }
        },
        layers: [
          shapeLayer("circle", W * 0.15, H * 0.35, W * 0.7, W * 0.7, "rgba(16,185,129,0.2)", { opacity: 0.7 }),
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 340, 85, "rgba(16, 185, 129, 0.2)", {
            stroke: "rgba(52, 211, 153, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("LIVE METRICS", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 340, 85, {
            fontSize: 48, fontWeight: 900, color: "#6ee7b7", align: "center", letterSpacing: 4
          }),
          textLayer("Live Analytics\nIn Real-Time", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Track your vital KPIs and growth metrics with zero latency.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 3: Angled Showcase
      {
        name: "Integration",
        background: {
          type: "mesh",
          mesh: { topLeft: "#020617", topRight: "#172554", bottomLeft: "#0f172a", bottomRight: "#1e1b4b" }
        },
        layers: [
          shapeLayer("circle", W * 0.05, H * 0.25, W * 0.9, W * 0.9, "rgba(59,130,246,0.22)", { opacity: 0.8 }),
          textLayer("Seamless\nIntegration", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Connect effortlessly with tools and workflows you already love.", Math.round(W * 0.08), Math.round(H * 0.215), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.33), Math.round(W * 0.86), 2200, "Drop Screenshot", -4),
        ],
      },
      // Screen 4: AI Powered
      {
        name: "AI Assistant",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#1e1b4b", bottomLeft: "#020617", bottomRight: "#311042" }
        },
        layers: [
          shapeLayer("circle", W * 0.1, H * 0.3, W * 0.8, W * 0.8, "rgba(236,72,153,0.22)", { opacity: 0.8 }),
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 320, 85, "rgba(236, 72, 153, 0.2)", {
            stroke: "rgba(244, 114, 182, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("AI POWERED", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 320, 85, {
            fontSize: 48, fontWeight: 900, color: "#f472b6", align: "center", letterSpacing: 4
          }),
          textLayer("Smarter Work\nWith Built-In AI", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Automate complex tasks with intuitive natural language prompts.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 5: Continuous Flow Left
      {
        name: "Flow (Left)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e1b4b", topRight: "#0f172a", bottomLeft: "#172554", bottomRight: "#020617" }
        },
        layers: [
          shapeLayer("circle", W * 0.3, H * 0.3, W * 0.8, W * 0.8, "rgba(99,102,241,0.25)", { opacity: 0.8 }),
          textLayer("Ultra Smooth\nExperience", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Engineered for buttery smooth 120Hz interactions.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          // Phone starts on this screen and extends off the right edge to meet Screen 6
          screenshotWithFrame(Math.round(W * 0.35), Math.round(H * 0.32), Math.round(W * 0.86), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 6: Continuous Flow Right
      {
        name: "Flow (Right)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#1e1b4b", bottomLeft: "#020617", bottomRight: "#172554" }
        },
        layers: [
          shapeLayer("circle", -W * 0.1, H * 0.3, W * 0.8, W * 0.8, "rgba(99,102,241,0.25)", { opacity: 0.8 }),
          textLayer("Every Pixel\nPerfected", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Crafted with obsessively precise attention to detail.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          // Phone continues from left edge of this screen
          screenshotWithFrame(Math.round(-W * 0.21), Math.round(H * 0.32), Math.round(W * 0.86), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 7: Security
      {
        name: "Security",
        background: {
          type: "mesh",
          mesh: { topLeft: "#020617", topRight: "#0f172a", bottomLeft: "#020617", bottomRight: "#0f172a" }
        },
        layers: [
          shapeLayer("circle", W * 0.1, H * 0.35, W * 0.8, W * 0.8, "rgba(59,130,246,0.2)", { opacity: 0.8 }),
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 360, 85, "rgba(59, 130, 246, 0.2)", {
            stroke: "rgba(96, 165, 250, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("END-TO-END", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 360, 85, {
            fontSize: 48, fontWeight: 900, color: "#93c5fd", align: "center", letterSpacing: 4
          }),
          textLayer("Bank-Grade\nEncryption", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Your private data stays yours, protected with AES-256 standards.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 8: Dark Mode Focus
      {
        name: "Dark Mode",
        background: {
          type: "solid",
          color: "#050508",
          pattern: { type: "grid", color: "#6366f1", opacity: 0.04, size: 1, spacing: 60 }
        },
        layers: [
          shapeLayer("circle", W * 0.1, H * 0.3, W * 0.8, W * 0.8, "rgba(168,85,247,0.2)", { opacity: 0.7 }),
          textLayer("Engineered For\nPure Dark Mode", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Deep blacks optimized for OLED screens and eye comfort.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 9: Social Proof
      {
        name: "Social Proof",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e1b4b", topRight: "#0f172a", bottomLeft: "#020617", bottomRight: "#1e1b4b" }
        },
        layers: [
          shapeLayer("circle", W * 0.1, H * 0.32, W * 0.8, W * 0.8, "rgba(245,158,11,0.18)", { opacity: 0.8 }),
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 360, 85, "rgba(245, 158, 11, 0.2)", {
            stroke: "rgba(251, 191, 36, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("★ ★ ★ ★ ★", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 360, 85, {
            fontSize: 52, fontWeight: 900, color: "#fbbf24", align: "center", letterSpacing: 6
          }),
          textLayer("Loved By Over\n1 Million Users", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Top rated app worldwide for effortless daily productivity.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 10: Call To Action
      {
        name: "Call to Action",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#311042", bottomLeft: "#020617", bottomRight: "#1e1b4b" }
        },
        layers: [
          shapeLayer("circle", W * 0.05, H * 0.25, W * 0.9, W * 0.9, "rgba(139,92,246,0.3)", { opacity: 0.8 }),
          textLayer("Start Your\nJourney Today", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Download now and experience the new gold standard.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#94a3b8", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
    ],
  },

  // ── 3. Minimal Light ────────────────────────────────────────────────────────
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean, high-contrast, airy design (10 Screens)",
    category: "Classic",
    layout: "screenshot-top",
    tags: ["light", "clean", "white", "minimal"],
    previewColor: "#f8fafc",
    previewGradient: ["#ffffff", "#e2e8f0"],
    screens: [
      // Screen 1: Top Mockup Intro
      {
        name: "Intro",
        background: {
          type: "solid",
          color: "#f8fafc",
          pattern: { type: "grid", color: "#0f172a", opacity: 0.03, size: 1, spacing: 60 }
        },
        layers: [
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.06), Math.round(W * 0.8), 1800, "Drop Screenshot"),
          textLayer("Simply\nBeautiful.", Math.round(W * 0.1), Math.round(H * 0.74), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Your application, stripped down to its perfect essence.", Math.round(W * 0.1), Math.round(H * 0.87), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
        ],
      },
      // Screen 2: Clarity Feature
      {
        name: "Clarity",
        background: {
          type: "solid",
          color: "#ffffff",
          pattern: { type: "dots", color: "#0f172a", opacity: 0.04, size: 2, spacing: 40 }
        },
        layers: [
          textLayer("Clarity In\nEvery Step", Math.round(W * 0.1), Math.round(H * 0.08), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Focus on what matters without the unnecessary clutter.", Math.round(W * 0.1), Math.round(H * 0.205), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.32), Math.round(W * 0.8), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 3: Effortless Navigation
      {
        name: "Navigation",
        background: { type: "solid", color: "#f1f5f9" },
        layers: [
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.06), Math.round(W * 0.8), 1800, "Drop Screenshot"),
          textLayer("Effortless\nNavigation", Math.round(W * 0.1), Math.round(H * 0.74), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Move through your tasks with unmatched fluid speed.", Math.round(W * 0.1), Math.round(H * 0.87), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
        ],
      },
      // Screen 4: Pure Focus
      {
        name: "Focus",
        background: { type: "solid", color: "#ffffff" },
        layers: [
          textLayer("Zero Clutter.\nPure Focus.", Math.round(W * 0.1), Math.round(H * 0.08), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("A distraction-free environment tailored for high productivity.", Math.round(W * 0.1), Math.round(H * 0.205), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.32), Math.round(W * 0.8), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 5: Continuous Split (Left)
      {
        name: "Panorama (Left)",
        background: { type: "solid", color: "#f8fafc" },
        layers: [
          textLayer("Designed For\nModern Life", Math.round(W * 0.1), Math.round(H * 0.08), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Synchronize seamlessly across all your personal devices.", Math.round(W * 0.1), Math.round(H * 0.205), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.38), Math.round(H * 0.32), Math.round(W * 0.82), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 6: Continuous Split (Right)
      {
        name: "Panorama (Right)",
        background: { type: "solid", color: "#f8fafc" },
        layers: [
          textLayer("Stay In\nPerfect Sync", Math.round(W * 0.1), Math.round(H * 0.08), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Instant updates and zero delay on cloud backups.", Math.round(W * 0.1), Math.round(H * 0.205), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(-W * 0.2), Math.round(H * 0.32), Math.round(W * 0.82), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 7: Smart Tools
      {
        name: "Smart Tools",
        background: { type: "solid", color: "#ffffff" },
        layers: [
          textLayer("Smart Tools\nBuilt Right In", Math.round(W * 0.1), Math.round(H * 0.08), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Everything you need in one clean, thoughtfully crafted space.", Math.round(W * 0.1), Math.round(H * 0.205), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.32), Math.round(W * 0.8), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 8: Contrast Slate Accent
      {
        name: "Theme Ready",
        background: { type: "solid", color: "#f1f5f9" },
        layers: [
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.06), Math.round(W * 0.8), 1800, "Drop Screenshot"),
          textLayer("Light Or Dark.\nYour Choice.", Math.round(W * 0.1), Math.round(H * 0.74), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Flawlessly switches according to your personal system settings.", Math.round(W * 0.1), Math.round(H * 0.87), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
        ],
      },
      // Screen 9: Privacy & Security
      {
        name: "Privacy",
        background: { type: "solid", color: "#ffffff" },
        layers: [
          textLayer("Private, Fast\n& Reliable", Math.round(W * 0.1), Math.round(H * 0.08), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Your information stays securely protected on your device.", Math.round(W * 0.1), Math.round(H * 0.205), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.32), Math.round(W * 0.8), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 10: Call to Action
      {
        name: "Get Started",
        background: { type: "solid", color: "#f8fafc" },
        layers: [
          screenshotWithFrame(Math.round(W * 0.1), Math.round(H * 0.06), Math.round(W * 0.8), 1800, "Drop Screenshot"),
          textLayer("Get Started\nIn Seconds.", Math.round(W * 0.1), Math.round(H * 0.74), Math.round(W * 0.8), 300, {
            fontSize: 135, fontWeight: 900, color: "#0f172a", lineHeight: 1.05
          }),
          textLayer("Download today and enjoy a clean, refreshed experience.", Math.round(W * 0.1), Math.round(H * 0.87), Math.round(W * 0.8), 180, {
            fontSize: 60, fontWeight: 500, color: "#64748b", lineHeight: 1.4
          }),
        ],
      },
    ],
  },

  // ── 4. Vibrant Playful ──────────────────────────────────────────────────────
  {
    id: "vibrant-playful",
    name: "Vibrant Playful",
    description: "Fun geometric shapes with energetic gradients (10 Screens)",
    category: "Social",
    layout: "screenshot-float",
    tags: ["fun", "vibrant", "shapes", "colorful"],
    previewColor: "#fb923c",
    previewGradient: ["#f43f5e", "#f59e0b"],
    screens: [
      // Screen 1: Hero
      {
        name: "Welcome",
        background: {
          type: "mesh",
          mesh: { topLeft: "#f43f5e", topRight: "#f97316", bottomLeft: "#fb923c", bottomRight: "#e11d48" }
        },
        layers: [
          shapeLayer("star", W * 0.78, H * 0.06, 160, 160, "rgba(255,255,255,0.35)", { rotation: 12 }),
          shapeLayer("circle", W * 0.06, H * 0.28, 120, 120, "rgba(255,255,255,0.25)"),
          textLayer("Make It\nFun & Easy!", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Connect, create, and share good vibes every single day.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 2: Squad / Social
      {
        name: "Squad",
        background: {
          type: "mesh",
          mesh: { topLeft: "#e11d48", topRight: "#db2777", bottomLeft: "#f43f5e", bottomRight: "#fb923c" }
        },
        layers: [
          shapeLayer("triangle", W * 0.8, H * 0.08, 140, 140, "rgba(255,255,255,0.3)", { rotation: -15 }),
          textLayer("Connect With\nYour Squad", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Real-time messaging, reaction stickers, and group fun.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot", 4),
        ],
      },
      // Screen 3: Rewards / Gamify
      {
        name: "Rewards",
        background: {
          type: "mesh",
          mesh: { topLeft: "#f97316", topRight: "#eab308", bottomLeft: "#f43f5e", bottomRight: "#f97316" }
        },
        layers: [
          shapeLayer("diamond", W * 0.76, H * 0.07, 150, 150, "rgba(255,255,255,0.35)", { rotation: 25 }),
          textLayer("Level Up\nYour Game", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Earn exclusive badges and trophies as you make daily progress.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 4: Fast Actions
      {
        name: "Speed",
        background: {
          type: "mesh",
          mesh: { topLeft: "#ec4899", topRight: "#f43f5e", bottomLeft: "#8b5cf6", bottomRight: "#f97316" }
        },
        layers: [
          shapeLayer("hexagon", W * 0.8, H * 0.06, 150, 150, "rgba(255,255,255,0.3)", { rotation: 10 }),
          textLayer("Lightning Fast\nInstant Fun", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Everything responds at your fingertips in zero seconds.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 5: Split Fun (Left)
      {
        name: "Share (Left)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#f43f5e", topRight: "#f97316", bottomLeft: "#ec4899", bottomRight: "#e11d48" }
        },
        layers: [
          shapeLayer("star", W * 0.1, H * 0.28, 120, 120, "rgba(255,255,255,0.3)"),
          textLayer("Share Magic\nInstantly", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Post stories and moments to all your favorite channels.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.38), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 6: Split Fun (Right)
      {
        name: "Share (Right)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#f97316", topRight: "#f43f5e", bottomLeft: "#e11d48", bottomRight: "#ec4899" }
        },
        layers: [
          shapeLayer("diamond", W * 0.8, H * 0.28, 130, 130, "rgba(255,255,255,0.3)", { rotation: 20 }),
          textLayer("Never Miss\nA Moment", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Real-time notifications keep you right in the action.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(-W * 0.22), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 7: Customization
      {
        name: "Express",
        background: {
          type: "mesh",
          mesh: { topLeft: "#8b5cf6", topRight: "#ec4899", bottomLeft: "#f43f5e", bottomRight: "#f97316" }
        },
        layers: [
          shapeLayer("star", W * 0.8, H * 0.07, 160, 160, "rgba(255,255,255,0.35)", { rotation: 18 }),
          textLayer("Express Your\nTrue Style", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Customize themes, avatars, and icons to match your vibe.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 8: Daily Streaks
      {
        name: "Streaks",
        background: {
          type: "mesh",
          mesh: { topLeft: "#f97316", topRight: "#f43f5e", bottomLeft: "#eab308", bottomRight: "#fb923c" }
        },
        layers: [
          shapeLayer("circle", W * 0.08, H * 0.28, 140, 140, "rgba(255,255,255,0.3)"),
          textLayer("Daily Streaks\n& Badges", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Build positive daily habits alongside your closest friends.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 9: Community
      {
        name: "Community",
        background: {
          type: "mesh",
          mesh: { topLeft: "#db2777", topRight: "#f97316", bottomLeft: "#f43f5e", bottomRight: "#8b5cf6" }
        },
        layers: [
          shapeLayer("star", W * 0.78, H * 0.06, 170, 170, "rgba(255,255,255,0.35)", { rotation: 15 }),
          textLayer("Join 500k+\nHappy Creators", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Discover endless creative ideas shared by the global family.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 10: Playful CTA
      {
        name: "Join Now",
        background: {
          type: "mesh",
          mesh: { topLeft: "#f43f5e", topRight: "#f97316", bottomLeft: "#8b5cf6", bottomRight: "#ec4899" }
        },
        layers: [
          shapeLayer("star", W * 0.75, H * 0.06, 180, 180, "rgba(255,255,255,0.4)", { rotation: 20 }),
          textLayer("Ready To Play?\nJoin Us Today!", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 130, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Download for free and jump right into the excitement.", Math.round(W * 0.08), Math.round(H * 0.21), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.35
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
    ],
  },

  // ── 5. Professional Blue ────────────────────────────────────────────────────
  {
    id: "professional-blue",
    name: "Professional Blue",
    description: "Sleek, trusted blue tones perfect for business/finance (10 Screens)",
    category: "Finance",
    layout: "screenshot-bottom",
    tags: ["blue", "corporate", "finance", "business"],
    previewColor: "#2563eb",
    previewGradient: ["#1e3a8a", "#2563eb"],
    screens: [
      // Screen 1: Hero
      {
        name: "Enterprise Hero",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#1e3a8a", bottomLeft: "#1e3a8a", bottomRight: "#2563eb" }
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 360, 85, "rgba(59, 130, 246, 0.25)", {
            stroke: "rgba(147, 197, 253, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("ENTERPRISE", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 360, 85, {
            fontSize: 48, fontWeight: 900, color: "#93c5fd", align: "center", letterSpacing: 4
          }),
          textLayer("Empower Your\nBusiness", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Next-generation financial operations and real-time ledger intelligence.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 2: Real-time Assets
      {
        name: "Assets",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e3a8a", topRight: "#0f172a", bottomLeft: "#2563eb", bottomRight: "#1e3a8a" }
        },
        layers: [
          textLayer("Track Assets\nIn Real-Time", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Monitor global portfolios and cash flow with bank-grade accuracy.", Math.round(W * 0.08), Math.round(H * 0.215), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 3: Automated Reports
      {
        name: "Smart Reports",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#2563eb", bottomLeft: "#1e3a8a", bottomRight: "#0f172a" }
        },
        layers: [
          textLayer("Automated\nSmart Reports", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Export executive summaries and compliance audits in one click.", Math.round(W * 0.08), Math.round(H * 0.215), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot", -3),
        ],
      },
      // Screen 4: Global Scale
      {
        name: "Global Scale",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e3a8a", topRight: "#0f172a", bottomLeft: "#0f172a", bottomRight: "#2563eb" }
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 360, 85, "rgba(59, 130, 246, 0.25)", {
            stroke: "rgba(147, 197, 253, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("GLOBAL", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 360, 85, {
            fontSize: 48, fontWeight: 900, color: "#93c5fd", align: "center", letterSpacing: 4
          }),
          textLayer("Built For\nGlobal Scale", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Multi-currency support and localized tax compliance built in.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 5: Continuous Team Sync (Left)
      {
        name: "Team (Left)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#1e3a8a", bottomLeft: "#1e3a8a", bottomRight: "#2563eb" }
        },
        layers: [
          textLayer("Seamless Team\nCollaboration", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Role-based permissions and granular team access controls.", Math.round(W * 0.08), Math.round(H * 0.215), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.38), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 6: Continuous Team Sync (Right)
      {
        name: "Team (Right)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e3a8a", topRight: "#0f172a", bottomLeft: "#2563eb", bottomRight: "#1e3a8a" }
        },
        layers: [
          textLayer("Instant Cloud\nSyncing", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Zero data loss with enterprise 99.99% uptime SLA.", Math.round(W * 0.08), Math.round(H * 0.215), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(-W * 0.22), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 7: Security
      {
        name: "Security",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#1e3a8a", bottomLeft: "#020617", bottomRight: "#0f172a" }
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 360, 85, "rgba(59, 130, 246, 0.25)", {
            stroke: "rgba(147, 197, 253, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("SOC-2 COMPLIANT", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 360, 85, {
            fontSize: 44, fontWeight: 900, color: "#93c5fd", align: "center", letterSpacing: 3
          }),
          textLayer("Bank-Grade\n256-Bit Security", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Biometric login, hardware keys, and encrypted cloud vaults.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 8: Integration Stack
      {
        name: "Integrations",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e3a8a", topRight: "#0f172a", bottomLeft: "#1e3a8a", bottomRight: "#2563eb" }
        },
        layers: [
          textLayer("Connect Your\nEntire Stack", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Pre-built webhooks and native REST APIs for modern workflows.", Math.round(W * 0.08), Math.round(H * 0.215), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 9: Trusted by Leaders
      {
        name: "Trust",
        background: {
          type: "mesh",
          mesh: { topLeft: "#0f172a", topRight: "#1e3a8a", bottomLeft: "#0f172a", bottomRight: "#2563eb" }
        },
        layers: [
          shapeLayer("rounded-rectangle", Math.round(W * 0.08), Math.round(H * 0.045), 360, 85, "rgba(59, 130, 246, 0.25)", {
            stroke: "rgba(147, 197, 253, 0.6)", strokeWidth: 3, cornerRadius: 100
          }),
          textLayer("INDUSTRY LEADER", Math.round(W * 0.08), Math.round(H * 0.045) + 16, 360, 85, {
            fontSize: 44, fontWeight: 900, color: "#93c5fd", align: "center", letterSpacing: 3
          }),
          textLayer("Trusted By\nFortune 500", Math.round(W * 0.08), Math.round(H * 0.095), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Powering top finance and technology enterprises globally.", Math.round(W * 0.08), Math.round(H * 0.23), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 10: Call to Action
      {
        name: "Scale Faster",
        background: {
          type: "mesh",
          mesh: { topLeft: "#1e3a8a", topRight: "#2563eb", bottomLeft: "#0f172a", bottomRight: "#1e3a8a" }
        },
        layers: [
          textLayer("Scale Faster\nStarting Today", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Get started today with a risk-free 14-day enterprise trial.", Math.round(W * 0.08), Math.round(H * 0.215), Math.round(W * 0.84), 180, {
            fontSize: 64, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.33), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
    ],
  },

  // ── 6. Neon Cyber ───────────────────────────────────────────────────────────
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Deep space aesthetic with bright neon glowing lines (10 Screens)",
    category: "Technology",
    layout: "screenshot-float",
    tags: ["neon", "cyber", "glow", "dark", "futuristic"],
    previewColor: "#06b6d4",
    previewGradient: ["#020617", "#000000"],
    screens: [
      // Screen 1: Initiate
      {
        name: "Initiate",
        background: {
          type: "solid",
          color: "#000000",
          pattern: { type: "dots", color: "#06b6d4", opacity: 0.15, size: 2, spacing: 50 }
        },
        layers: [
          shapeLayer("rectangle", 0, H * 0.65, W, 8, "#ec4899", { shadow: { blur: 20, color: "#ec4899", spread: 5, offsetX: 0, offsetY: 0 } }),
          shapeLayer("rectangle", W * 0.82, H * 0.08, 40, 40, "transparent", { stroke: "#06b6d4", strokeWidth: 4, cornerRadius: 8 }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.08), Math.round(W * 0.76), 2200, "Drop Screenshot"),
          textLayer("INITIATE\nSEQUENCE", Math.round(W * 0.08), Math.round(H * 0.70), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#ec4899", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Experience the next generation of uncompromised power.", Math.round(W * 0.08), Math.round(H * 0.83), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#06b6d4", lineHeight: 1.4, letterSpacing: 2
          }),
        ],
      },
      // Screen 2: System Override
      {
        name: "Override",
        background: {
          type: "solid",
          color: "#05050f",
          pattern: { type: "grid", color: "#ec4899", opacity: 0.08, size: 1, spacing: 60 }
        },
        layers: [
          shapeLayer("rectangle", 0, H * 0.28, W, 6, "#06b6d4", { shadow: { blur: 20, color: "#06b6d4", spread: 5, offsetX: 0, offsetY: 0 } }),
          textLayer("OVERRIDE\nSYSTEM", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#06b6d4", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Access unparalleled real-time telemetry and control.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#ec4899", lineHeight: 1.4, letterSpacing: 2
          }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.33), Math.round(W * 0.76), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 3: Hyper Performance
      {
        name: "Hyper Speed",
        background: { type: "solid", color: "#000000" },
        layers: [
          shapeLayer("circle", W * 0.8, H * 0.25, 120, 120, "#ec4899", { shadow: { blur: 30, color: "#ec4899", spread: 10, offsetX: 0, offsetY: 0 } }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.08), Math.round(W * 0.76), 2200, "Drop Screenshot"),
          textLayer("HYPER\nPERFORMANCE", Math.round(W * 0.08), Math.round(H * 0.70), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#06b6d4", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Sub-millisecond execution pipeline for power users.", Math.round(W * 0.08), Math.round(H * 0.83), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#ec4899", lineHeight: 1.4, letterSpacing: 2
          }),
        ],
      },
      // Screen 4: Realtime Telemetry
      {
        name: "Telemetry",
        background: {
          type: "solid",
          color: "#05050f",
          pattern: { type: "dots", color: "#ec4899", opacity: 0.12, size: 2, spacing: 50 }
        },
        layers: [
          shapeLayer("rectangle", 0, H * 0.28, W, 6, "#ec4899", { shadow: { blur: 20, color: "#ec4899", spread: 5, offsetX: 0, offsetY: 0 } }),
          textLayer("REALTIME\nTELEMETRY", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#ec4899", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Live visual spectrums and automated diagnostic feeds.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#06b6d4", lineHeight: 1.4, letterSpacing: 2
          }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.33), Math.round(W * 0.76), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 5: Quantum Sync (Left)
      {
        name: "Quantum (Left)",
        background: { type: "solid", color: "#000000" },
        layers: [
          shapeLayer("rectangle", 0, H * 0.28, W, 6, "#06b6d4", { shadow: { blur: 20, color: "#06b6d4", spread: 5, offsetX: 0, offsetY: 0 } }),
          textLayer("QUANTUM\nSYNC", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#06b6d4", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Distributed network state replicated across nodes.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#ec4899", lineHeight: 1.4, letterSpacing: 2
          }),
          screenshotWithFrame(Math.round(W * 0.38), Math.round(H * 0.33), Math.round(W * 0.76), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 6: Quantum Sync (Right)
      {
        name: "Quantum (Right)",
        background: { type: "solid", color: "#000000" },
        layers: [
          shapeLayer("rectangle", 0, H * 0.28, W, 6, "#06b6d4", { shadow: { blur: 20, color: "#06b6d4", spread: 5, offsetX: 0, offsetY: 0 } }),
          textLayer("ZERO\nLATENCY", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#ec4899", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Direct edge connectivity worldwide.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#06b6d4", lineHeight: 1.4, letterSpacing: 2
          }),
          screenshotWithFrame(Math.round(-W * 0.22), Math.round(H * 0.33), Math.round(W * 0.76), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 7: Encrypted Protocol
      {
        name: "Encryption",
        background: {
          type: "solid",
          color: "#05050f",
          pattern: { type: "grid", color: "#06b6d4", opacity: 0.08, size: 1, spacing: 60 }
        },
        layers: [
          shapeLayer("rectangle", 0, H * 0.65, W, 8, "#06b6d4", { shadow: { blur: 20, color: "#06b6d4", spread: 5, offsetX: 0, offsetY: 0 } }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.08), Math.round(W * 0.76), 2200, "Drop Screenshot"),
          textLayer("ENCRYPTED\nPROTOCOL", Math.round(W * 0.08), Math.round(H * 0.70), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#06b6d4", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Zero-knowledge architecture for total sovereign privacy.", Math.round(W * 0.08), Math.round(H * 0.83), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#ec4899", lineHeight: 1.4, letterSpacing: 2
          }),
        ],
      },
      // Screen 8: Modular Core
      {
        name: "Modular",
        background: { type: "solid", color: "#000000" },
        layers: [
          shapeLayer("rectangle", 0, H * 0.28, W, 6, "#ec4899", { shadow: { blur: 20, color: "#ec4899", spread: 5, offsetX: 0, offsetY: 0 } }),
          textLayer("MODULAR\nCORE", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#ec4899", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Hot-swap modules and customize every interface terminal.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#06b6d4", lineHeight: 1.4, letterSpacing: 2
          }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.33), Math.round(W * 0.76), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 9: Next-gen Architecture
      {
        name: "Architecture",
        background: {
          type: "solid",
          color: "#05050f",
          pattern: { type: "dots", color: "#06b6d4", opacity: 0.15, size: 2, spacing: 50 }
        },
        layers: [
          shapeLayer("rectangle", 0, H * 0.65, W, 8, "#ec4899", { shadow: { blur: 20, color: "#ec4899", spread: 5, offsetX: 0, offsetY: 0 } }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.08), Math.round(W * 0.76), 2200, "Drop Screenshot"),
          textLayer("NEXT-GEN\nSYSTEMS", Math.round(W * 0.08), Math.round(H * 0.70), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#ec4899", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Engineered without legacy compromises.", Math.round(W * 0.08), Math.round(H * 0.83), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#06b6d4", lineHeight: 1.4, letterSpacing: 2
          }),
        ],
      },
      // Screen 10: Enter The Future
      {
        name: "Finale",
        background: { type: "solid", color: "#000000" },
        layers: [
          shapeLayer("rectangle", 0, H * 0.28, W, 8, "#06b6d4", { shadow: { blur: 25, color: "#06b6d4", spread: 8, offsetX: 0, offsetY: 0 } }),
          textLayer("ENTER THE\nFUTURE", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 300, {
            fontSize: 130, fontWeight: 900, color: "#06b6d4", lineHeight: 1.05, letterSpacing: 5
          }),
          textLayer("Initialize your protocol today. Available on all platforms.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 400, color: "#ec4899", lineHeight: 1.4, letterSpacing: 2
          }),
          screenshotWithFrame(Math.round(W * 0.12), Math.round(H * 0.33), Math.round(W * 0.76), 2200, "Drop Screenshot"),
        ],
      },
    ],
  },

  // ── 7. Dynamic Flow ─────────────────────────────────────────────────────────
  {
    id: "dynamic-flow",
    name: "Dynamic Flow",
    description: "Creative split layout with text on the right and screenshot on the left (10 Screens)",
    category: "Creative",
    layout: "screenshot-float-reverse",
    tags: ["creative", "flow", "dynamic", "asymmetric"],
    previewColor: "#8b5cf6",
    previewGradient: ["#8b5cf6", "#ec4899"],
    screens: [
      // Screen 1: Stand Out
      {
        name: "Stand Out",
        background: {
          type: "mesh",
          mesh: { topLeft: "#7c3aed", topRight: "#db2777", bottomLeft: "#4f46e5", bottomRight: "#c026d3" }
        },
        layers: [
          shapeLayer("hexagon", W * 0.7, H * 0.05, 180, 180, "rgba(255,255,255,0.2)", { rotation: 15 }),
          textLayer("Stand\nOut.", Math.round(W * 0.58), Math.round(H * 0.14), Math.round(W * 0.38), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left"
          }),
          textLayer("Unleash the full potential of your creativity today.", Math.round(W * 0.58), Math.round(H * 0.28), Math.round(W * 0.38), 240, {
            fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, align: "left"
          }),
          screenshotWithFrame(Math.round(-W * 0.15), Math.round(H * 0.25), Math.round(W * 0.8), 2400, "Drop Screenshot"),
        ],
      },
      // Screen 2: Fluid Journey
      {
        name: "Smooth Journey",
        background: {
          type: "mesh",
          mesh: { topLeft: "#9333ea", topRight: "#7c3aed", bottomLeft: "#db2777", bottomRight: "#4f46e5" }
        },
        layers: [
          shapeLayer("diamond", W * 0.1, H * 0.06, 170, 170, "rgba(255,255,255,0.2)", { rotation: -20 }),
          textLayer("Smooth\nJourney", Math.round(W * 0.08), Math.round(H * 0.14), Math.round(W * 0.42), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left"
          }),
          textLayer("An experience so smooth it feels like pure magic.", Math.round(W * 0.08), Math.round(H * 0.28), Math.round(W * 0.42), 240, {
            fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, align: "left"
          }),
          screenshotWithFrame(Math.round(W * 0.42), Math.round(H * 0.25), Math.round(W * 0.8), 2400, "Drop Screenshot"),
        ],
      },
      // Screen 3: Infinite Possibilities
      {
        name: "Possibilities",
        background: {
          type: "mesh",
          mesh: { topLeft: "#4f46e5", topRight: "#9333ea", bottomLeft: "#c026d3", bottomRight: "#db2777" }
        },
        layers: [
          shapeLayer("star", W * 0.72, H * 0.06, 160, 160, "rgba(255,255,255,0.25)", { rotation: 18 }),
          textLayer("Infinite\nPower", Math.round(W * 0.58), Math.round(H * 0.14), Math.round(W * 0.38), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left"
          }),
          textLayer("Flexible tools configured to suit your unique imagination.", Math.round(W * 0.58), Math.round(H * 0.28), Math.round(W * 0.38), 240, {
            fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, align: "left"
          }),
          screenshotWithFrame(Math.round(-W * 0.15), Math.round(H * 0.25), Math.round(W * 0.8), 2400, "Drop Screenshot"),
        ],
      },
      // Screen 4: Creator Focus
      {
        name: "Creators",
        background: {
          type: "mesh",
          mesh: { topLeft: "#db2777", topRight: "#c026d3", bottomLeft: "#7c3aed", bottomRight: "#4f46e5" }
        },
        layers: [
          shapeLayer("circle", W * 0.1, H * 0.08, 150, 150, "rgba(255,255,255,0.2)"),
          textLayer("Built For\nCreators", Math.round(W * 0.08), Math.round(H * 0.14), Math.round(W * 0.42), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left"
          }),
          textLayer("Professional studio workflows in the palm of your hand.", Math.round(W * 0.08), Math.round(H * 0.28), Math.round(W * 0.42), 240, {
            fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, align: "left"
          }),
          screenshotWithFrame(Math.round(W * 0.42), Math.round(H * 0.25), Math.round(W * 0.8), 2400, "Drop Screenshot"),
        ],
      },
      // Screen 5: Flow Split (Left)
      {
        name: "Elegance (Left)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#7c3aed", topRight: "#db2777", bottomLeft: "#4f46e5", bottomRight: "#9333ea" }
        },
        layers: [
          textLayer("Unmatched\nElegance", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("A cohesive visual aesthetic designed to inspire.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.38), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 6: Flow Split (Right)
      {
        name: "Elegance (Right)",
        background: {
          type: "mesh",
          mesh: { topLeft: "#db2777", topRight: "#7c3aed", bottomLeft: "#9333ea", bottomRight: "#4f46e5" }
        },
        layers: [
          textLayer("Every Pixel\nPerfected", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Crafted to make your content look effortlessly stunning.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(-W * 0.22), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
      // Screen 7: Progress
      {
        name: "Progress",
        background: {
          type: "mesh",
          mesh: { topLeft: "#4f46e5", topRight: "#7c3aed", bottomLeft: "#c026d3", bottomRight: "#db2777" }
        },
        layers: [
          shapeLayer("star", W * 0.72, H * 0.06, 170, 170, "rgba(255,255,255,0.25)", { rotation: 12 }),
          textLayer("Daily\nGrowth", Math.round(W * 0.58), Math.round(H * 0.14), Math.round(W * 0.38), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left"
          }),
          textLayer("Track your evolution with dynamic visual charts.", Math.round(W * 0.58), Math.round(H * 0.28), Math.round(W * 0.38), 240, {
            fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, align: "left"
          }),
          screenshotWithFrame(Math.round(-W * 0.15), Math.round(H * 0.25), Math.round(W * 0.8), 2400, "Drop Screenshot"),
        ],
      },
      // Screen 8: Visual Audio
      {
        name: "Sensory",
        background: {
          type: "mesh",
          mesh: { topLeft: "#c026d3", topRight: "#4f46e5", bottomLeft: "#db2777", bottomRight: "#7c3aed" }
        },
        layers: [
          shapeLayer("triangle", W * 0.1, H * 0.06, 160, 160, "rgba(255,255,255,0.2)", { rotation: 15 }),
          textLayer("Sensory\nImmersion", Math.round(W * 0.08), Math.round(H * 0.14), Math.round(W * 0.42), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left"
          }),
          textLayer("Haptic feedback, dynamic soundscapes, and lush animations.", Math.round(W * 0.08), Math.round(H * 0.28), Math.round(W * 0.42), 240, {
            fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, align: "left"
          }),
          screenshotWithFrame(Math.round(W * 0.42), Math.round(H * 0.25), Math.round(W * 0.8), 2400, "Drop Screenshot"),
        ],
      },
      // Screen 9: Global Love
      {
        name: "Loved Globally",
        background: {
          type: "mesh",
          mesh: { topLeft: "#7c3aed", topRight: "#c026d3", bottomLeft: "#4f46e5", bottomRight: "#db2777" }
        },
        layers: [
          shapeLayer("diamond", W * 0.72, H * 0.06, 160, 160, "rgba(255,255,255,0.25)", { rotation: 25 }),
          textLayer("Loved\nGlobally", Math.round(W * 0.58), Math.round(H * 0.14), Math.round(W * 0.38), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, align: "left"
          }),
          textLayer("Ranked #1 creative app in over 80 countries.", Math.round(W * 0.58), Math.round(H * 0.28), Math.round(W * 0.38), 240, {
            fontSize: 56, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, align: "left"
          }),
          screenshotWithFrame(Math.round(-W * 0.15), Math.round(H * 0.25), Math.round(W * 0.8), 2400, "Drop Screenshot"),
        ],
      },
      // Screen 10: Call to Action
      {
        name: "Get Started",
        background: {
          type: "mesh",
          mesh: { topLeft: "#db2777", topRight: "#7c3aed", bottomLeft: "#4f46e5", bottomRight: "#c026d3" }
        },
        layers: [
          shapeLayer("star", W * 0.75, H * 0.06, 180, 180, "rgba(255,255,255,0.35)", { rotation: 20 }),
          textLayer("Unlock Your\nFull Potential", Math.round(W * 0.08), Math.round(H * 0.08), Math.round(W * 0.84), 360, {
            fontSize: 125, fontWeight: 900, color: "#ffffff", lineHeight: 1.05
          }),
          textLayer("Download today and create something unforgettable.", Math.round(W * 0.08), Math.round(H * 0.205), Math.round(W * 0.84), 180, {
            fontSize: 60, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4
          }),
          screenshotWithFrame(Math.round(W * 0.08), Math.round(H * 0.32), Math.round(W * 0.84), 2200, "Drop Screenshot"),
        ],
      },
    ],
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

import { FIGMA_TEMPLATES } from "./figmaTemplates";

const mappedFigmaTemplates: Template[] = FIGMA_TEMPLATES.map((ft) => {
  const maxScreenIndex = ft.screens.reduce((max, s) => Math.max(max, s.screenIndex), -1);
  const totalScreens = Math.max(5, maxScreenIndex + 1);

  // Derive a preview color from the background
  const previewColor =
    ft.background.type === "solid"
      ? (ft.background.color ?? "#1a1a2e")
      : ft.background.gradient?.stops?.[0]?.color ?? "#1a1a2e";

  const templateScreens: TemplateScreen[] = [];
  for (let i = 0; i < totalScreens; i++) {
    const screenData = ft.screens.find((s) => s.screenIndex === i);

    let allLayers: import("@/lib/types").Layer[] = [];

    if (screenData) {
      // Map each Figma device zone as a ScreenshotLayer
      const mockupLayers = screenData.mockups.map((m, mIdx) => {
        let rotation = 0;
        if (m.transform && m.transform.includes("rotate")) {
          const match = m.transform.match(/rotate\(([-0-9.]+)/);
          if (match) rotation = parseFloat(match[1]);
        }

        return {
          id: `mockup_${ft.id}_s${i}_${mIdx}`,
          type: "screenshot" as const,
          src: undefined,
          x: m.x,
          y: m.y,
          width: m.width,
          height: m.height,
          rotation: rotation,
          opacity: 1,
          objectFit: "cover" as const,
          cornerRadius: 54,
          showDeviceFrame: true,
          shadow: { blur: 80, spread: 0, color: "rgba(0,0,0,0.35)", offsetX: 0, offsetY: 20 },
          label: "Drop your screenshot here",
        };
      });

      // Layers from Figma: bg_shapes first, then texts/logo
      allLayers = [...mockupLayers, ...screenData.layers];
    }

    const figBg = screenData?.background ?? ft.background;

    let screenBg: import("@/lib/types").Background;
    if (figBg.type === "gradient" && figBg.gradient) {
      screenBg = {
        type: "gradient",
        gradient: {
          direction: figBg.gradient.direction as import("@/lib/types").GradientDirection,
          stops: figBg.gradient.stops.map((s) => ({
            color: s.color,
            position: s.position,
          })),
        },
      };
    } else {
      screenBg = {
        type: "solid",
        color: figBg.color ?? "#1a1a2e",
      };
    }

    templateScreens.push({
      name: `Screen ${i + 1}`,
      background: screenBg,
      layers: allLayers,
    });
  }

  return {
    id: ft.id,
    name: ft.name,
    description: "Imported from Figma",
    category: "Figma",
    tags: ["Figma", "Imported"],
    previewColor,
    layout: "screenshot-full",
    screens: templateScreens,
  };
});

// Append the mapped figma templates to the end
export const ALL_TEMPLATES: Template[] = [...DEFAULT_TEMPLATES, ...mappedFigmaTemplates];
