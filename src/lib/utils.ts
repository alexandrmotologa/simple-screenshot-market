import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Background } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a short unique ID (browser-safe, no crypto dependency) */
export function nanoid(size = 12): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const arr = new Uint8Array(size);
  crypto.getRandomValues(arr);
  for (const byte of arr) {
    result += chars[byte % chars.length];
  }
  return result;
}

/** Format a timestamp as a relative or absolute date string */
export function formatDate(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(ts).toLocaleDateString();
}

/** Convert a Background definition to a CSS background string for preview */
export function backgroundToCSS(bg: Background): string {
  if (bg.type === "solid" && bg.color) {
    return bg.color;
  }
  if (bg.type === "gradient" && bg.gradient) {
    const dirMap: Record<string, string> = {
      "to-b": "to bottom",
      "to-r": "to right",
      "to-br": "to bottom right",
      "to-bl": "to bottom left",
      "to-tr": "to top right",
      "to-tl": "to top left",
    };
    const dir = dirMap[bg.gradient.direction] ?? "to bottom";
    const stops = bg.gradient.stops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");
    return `linear-gradient(${dir}, ${stops})`;
  }
  if (bg.type === "image" && bg.imageUrl) {
    return `url(${bg.imageUrl})`;
  }
  return "#1e1b4b";
}
