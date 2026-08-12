// Core types for the SnapFrame application

export type StoreType = "ios" | "android";

export type LayerType = "text" | "image" | "screenshot" | "shape" | "flag" | "emoji" | "brand";

export type ShapeType = "rectangle" | "circle" | "rounded-rectangle";

export type TextAlign = "left" | "center" | "right";

export type BackgroundType = "solid" | "gradient" | "image";

export type GradientDirection =
  | "to-b"
  | "to-r"
  | "to-br"
  | "to-bl"
  | "to-tr"
  | "to-tl";

export interface GradientStop {
  color: string;
  position: number; // 0-100
}

export interface Background {
  type: BackgroundType;
  color?: string;
  gradient?: {
    direction: GradientDirection;
    stops: GradientStop[];
  };
  imageUrl?: string;
}

export interface TextLayer {
  id: string;
  type: "text";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  color: string;
  /** Optional gradient override: [startColor, endColor, direction] */
  gradientColor?: [string, string, "horizontal" | "vertical" | "diagonal"];
  align: TextAlign;
  lineHeight: number;
  letterSpacing: number;
  rotation: number;
  opacity: number;
  locked?: boolean;
  shadow?: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
}

export interface ImageLayer {
  id: string;
  type: "image";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  cornerRadius: number;
  locked?: boolean;
}

/**
 * ScreenshotLayer — the core concept of SnapFrame.
 * A reserved zone where the user's app screenshot is placed.
 * Shows a placeholder when no image is uploaded.
 * Can optionally have a device frame rendered on top.
 */
export interface ScreenshotLayer {
  id: string;
  type: "screenshot";
  /** The uploaded app screenshot (data URL or blob URL) */
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  /** How the image fills the zone */
  objectFit: "cover" | "contain" | "fill";
  /** Corner radius for clipping */
  cornerRadius: number;
  /** Whether to show a device frame overlay */
  showDeviceFrame: boolean;
  /** Drop shadow */
  shadow?: {
    blur: number;
    spread: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
  /** Slot label shown in placeholder (e.g. "Screenshot 1") */
  label?: string;
  locked?: boolean;
}

export interface ShapeLayer {
  id: string;
  type: "shape";
  shape: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  rotation: number;
  opacity: number;
  cornerRadius?: number;
  locked?: boolean;
}

export interface FlagLayer {
  id: string;
  type: "flag" | "emoji" | "brand";
  content: string; // emoji or SVG URL
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked?: boolean;
}

export type Layer = TextLayer | ImageLayer | ScreenshotLayer | ShapeLayer | FlagLayer;

// Device mockup definitions
export type DeviceColor = string; // e.g. "black", "white", "titanium-natural", "obsidian" etc.

export interface MockupSettings {
  device: string;
  color: DeviceColor;
  showFrame: boolean;
  showReflection: boolean;
  showShadow: boolean;
  /** Squircle (iOS-style rounded) corners for the card */
  squircle?: boolean;
  /** Show/hide screenshots (focus mode) */
  showScreenshots?: boolean;
}

// Store-specific size presets
export interface SizePreset {
  name: string;
  width: number;
  height: number;
  store: StoreType;
  description: string;
}

export const SIZE_PRESETS: SizePreset[] = [
  // iOS App Store
  {
    name: 'iPhone 6.9"',
    width: 1320,
    height: 2868,
    store: "ios",
    description: "Required for App Store",
  },
  {
    name: 'iPhone 6.7"',
    width: 1290,
    height: 2796,
    store: "ios",
    description: "App Store",
  },
  {
    name: 'iPhone 6.5"',
    width: 1242,
    height: 2688,
    store: "ios",
    description: "App Store",
  },
  {
    name: 'iPad Pro 12.9"',
    width: 2048,
    height: 2732,
    store: "ios",
    description: "App Store",
  },
  // Google Play
  {
    name: "Android 6.7\"",
    width: 1290,
    height: 2796,
    store: "android",
    description: "Google Play standard",
  },
];

// A single screen in a project
export interface Screen {
  id: string;
  name: string;
  /** Short caption shown above the headline, e.g. "Track Your Mood" */
  caption?: string;
  background: Background;
  layers: Layer[];
  mockup?: MockupSettings;
  width: number;
  height: number;
}

// A project contains multiple screen sets (one per store)
export interface ScreenSet {
  id: string;
  /** Display name for this set, e.g. "App Store (iOS)" */
  name?: string;
  store: StoreType;
  preset: SizePreset;
  mockup: MockupSettings;
  deviceId?: string;
  screens: Screen[];
  /** App Store / Play Store URL for reference */
  referenceUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  templateId: string | null;
  screenSets: ScreenSet[];
  createdAt: number;
  updatedAt: number;
  thumbnail?: string;
}

// Template definition
export interface TemplateScreen {
  name: string;
  background: Background;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layers: any[];
}

/** Visual layout style for template previews */
export type TemplateLayout =
  | "screenshot-top"      // screenshot top 65%, text bottom
  | "screenshot-bottom"   // text top, screenshot bottom 55%
  | "screenshot-float"    // screenshot floating center-right with shadow
  | "screenshot-full"     // screenshot full-bleed, text overlay
  | "screenshot-split"    // 2 screenshots side-by-side
  | "text-only";          // no screenshot zone (pure text/graphic)

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  previewColor: string;
  previewGradient?: [string, string]; // [from, to]
  layout: TemplateLayout;
  screens: TemplateScreen[];
}
