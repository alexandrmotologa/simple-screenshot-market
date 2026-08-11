// Core types for the SnapFrame application

export type StoreType = "ios" | "android";

export type LayerType = "text" | "image" | "shape" | "mockup";

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
  align: TextAlign;
  lineHeight: number;
  letterSpacing: number;
  rotation: number;
  opacity: number;
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
}

export type Layer = TextLayer | ImageLayer | ShapeLayer;

// Device mockup definitions
export type IosDevice =
  | "iphone-13-pro"
  | "iphone-15-pro"
  | "iphone-16-pro"
  | "iphone-16-pro-max"
  | "ipad-pro";

export type AndroidDevice =
  | "pixel-8-pro"
  | "pixel-9-pro"
  | "samsung-s24"
  | "samsung-s25"
  | "generic-android";

export type DeviceModel = IosDevice | AndroidDevice;

export type DeviceColor = "black" | "white" | "gold" | "purple" | "silver";

export interface MockupSettings {
  device: DeviceModel;
  color: DeviceColor;
  showFrame: boolean;
  showReflection: boolean;
  showShadow: boolean;
  screenshotUrl?: string; // URL of the uploaded app screenshot inside the mockup
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
    name: "Phone 9:16",
    width: 1080,
    height: 1920,
    store: "android",
    description: "Google Play standard",
  },
  {
    name: "Phone 20:9",
    width: 1080,
    height: 2400,
    store: "android",
    description: "Google Play modern",
  },
  {
    name: '7" Tablet',
    width: 1600,
    height: 2560,
    store: "android",
    description: "Google Play tablet",
  },
  {
    name: '10" Tablet',
    width: 2048,
    height: 2732,
    store: "android",
    description: "Google Play tablet",
  },
];

// A single screen in a project
export interface Screen {
  id: string;
  name: string;
  background: Background;
  layers: Layer[];
  mockup?: MockupSettings;
  width: number;
  height: number;
}

// A project contains multiple screens (one set per store)
export interface ScreenSet {
  id: string;
  store: StoreType;
  preset: SizePreset;
  mockup: MockupSettings;
  screens: Screen[];
}

export interface Project {
  id: string;
  name: string;
  templateId: string | null;
  screenSets: ScreenSet[];
  createdAt: number;
  updatedAt: number;
  thumbnail?: string; // base64 or URL
}

// Template definition
export interface TemplateScreen {
  name: string;
  background: Background;
  layers: Omit<Layer, "id">[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  previewColor: string; // for card background before image loads
  screens: TemplateScreen[];
}
