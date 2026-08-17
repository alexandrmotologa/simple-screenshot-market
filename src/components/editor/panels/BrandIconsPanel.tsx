"use client";

import { useState, useMemo } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/lib/store/toastStore";

interface IconDef {
  name: string;
  slug: string;
  color: string;
}

const POPULAR_BRANDS: IconDef[] = [
  { name: "Apple", slug: "apple", color: "000000" },
  { name: "Google", slug: "google", color: "4285F4" },
  { name: "Google Play", slug: "googleplay", color: "414141" },
  { name: "Android", slug: "android", color: "3DDC84" },
  { name: "OpenAI / ChatGPT", slug: "openai", color: "000000" },
  { name: "Anthropic / Claude", slug: "anthropic", color: "D97706" },
  { name: "Meta", slug: "meta", color: "0081FB" },
  { name: "Microsoft", slug: "microsoft", color: "5E5E5E" },
  { name: "Amazon", slug: "amazon", color: "FF9900" },
  { name: "Netflix", slug: "netflix", color: "E50914" },
  { name: "Spotify", slug: "spotify", color: "1DB954" },
  { name: "YouTube", slug: "youtube", color: "FF0000" },
  { name: "TikTok", slug: "tiktok", color: "000000" },
  { name: "Instagram", slug: "instagram", color: "E4405F" },
  { name: "X / Twitter", slug: "x", color: "000000" },
  { name: "Threads", slug: "threads", color: "000000" },
  { name: "LinkedIn", slug: "linkedin", color: "0A66C2" },
  { name: "Reddit", slug: "reddit", color: "FF4500" },
  { name: "Discord", slug: "discord", color: "5865F2" },
  { name: "Telegram", slug: "telegram", color: "26A5E4" },
  { name: "WhatsApp", slug: "whatsapp", color: "25D366" },
  { name: "Snapchat", slug: "snapchat", color: "FFFC00" },
  { name: "Pinterest", slug: "pinterest", color: "BD081C" },
  { name: "Twitch", slug: "twitch", color: "9146FF" },
  { name: "Slack", slug: "slack", color: "4A154B" },
  { name: "Notion", slug: "notion", color: "000000" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "GitLab", slug: "gitlab", color: "FC6D26" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "Firebase", slug: "firebase", color: "FFCA28" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Shopify", slug: "shopify", color: "7AB55C" },
  { name: "PayPal", slug: "paypal", color: "003087" },
  { name: "Airbnb", slug: "airbnb", color: "FF5A5F" },
  { name: "Uber", slug: "uber", color: "000000" },
  { name: "Adobe", slug: "adobe", color: "FF0000" },
  { name: "Canva", slug: "canva", color: "00C4CC" },
  { name: "Dropbox", slug: "dropbox", color: "0061FF" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
  { name: "Swift", slug: "swift", color: "F05138" },
  { name: "Kotlin", slug: "kotlin", color: "7F52FF" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "AWS", slug: "amazonaws", color: "FF9900" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
];

const UI_ICONS = [
  "home", "settings", "search", "user", "star", "heart", "check", "x", "info", "alert-triangle",
  "camera", "image", "video", "music", "mic", "bell", "calendar", "clock", "map-pin", "map",
  "phone", "mail", "message-circle", "message-square", "send", "share", "link", "download", "upload", "cloud",
  "lock", "unlock", "key", "shield", "power", "battery", "wifi", "bluetooth", "cast", "play",
  "pause", "square", "menu", "grid", "list", "filter", "arrow-up-down", "edit", "trash", "save",
  "folder", "file", "file-text", "paperclip", "bookmark", "tag", "shopping-cart", "credit-card", "wallet",
  "gift", "shopping-bag", "truck", "plane", "car", "bus", "train", "bike", "navigation", "compass",
  "zap", "award", "thumbs-up", "smile", "globe", "activity", "bar-chart", "pie-chart", "trending-up"
].map((slug) => ({ name: slug.replace(/-/g, " "), slug, color: "000000" }));

const PHOSPHOR_MAP: Record<string, string> = {
  home: "house",
  settings: "gear",
  search: "magnifying-glass",
  user: "user",
  star: "star",
  heart: "heart",
  check: "check",
  x: "x",
  info: "info",
  "alert-triangle": "warning",
  camera: "camera",
  image: "image",
  video: "video-camera",
  music: "music-notes",
  mic: "microphone",
  bell: "bell",
  calendar: "calendar",
  clock: "clock",
  "map-pin": "map-pin",
  map: "map-trifold",
  phone: "phone",
  mail: "envelope",
  "message-circle": "chat-circle",
  "message-square": "chat-centered-text",
  send: "paper-plane-tilt",
  share: "share-network",
  link: "link",
  download: "download-simple",
  upload: "upload-simple",
  cloud: "cloud",
  lock: "lock",
  unlock: "lock-open",
  key: "key",
  shield: "shield",
  power: "power",
  battery: "battery-charging",
  wifi: "wifi-high",
  bluetooth: "bluetooth",
  cast: "screencast",
  play: "play",
  pause: "pause",
  square: "square",
  menu: "list",
  grid: "squares-four",
  list: "list-bullets",
  filter: "funnel",
  "arrow-up-down": "arrows-down-up",
  edit: "pencil-simple",
  trash: "trash",
  save: "floppy-disk",
  folder: "folder",
  file: "file",
  "file-text": "file-text",
  paperclip: "paperclip",
  bookmark: "bookmark",
  tag: "tag",
  "shopping-cart": "shopping-cart",
  "credit-card": "credit-card",
  wallet: "wallet",
  gift: "gift",
  "shopping-bag": "tote",
  truck: "truck",
  plane: "airplane",
  car: "car",
  bus: "bus",
  train: "train",
  bike: "bicycle",
  navigation: "navigation-arrow",
  compass: "compass",
  zap: "lightning",
  award: "medal",
  "thumbs-up": "thumbs-up",
  smile: "smiley",
  globe: "globe",
  activity: "activity",
  "bar-chart": "chart-bar",
  "pie-chart": "chart-pie",
  "trending-up": "trend-up",
};

const MDI_MAP: Record<string, string> = {
  home: "home",
  settings: "cog",
  search: "magnify",
  user: "account",
  star: "star",
  heart: "heart",
  check: "check",
  x: "close",
  info: "information",
  "alert-triangle": "alert",
  camera: "camera",
  image: "image",
  video: "video",
  music: "music",
  mic: "microphone",
  bell: "bell",
  calendar: "calendar",
  clock: "clock",
  "map-pin": "map-marker",
  map: "map",
  phone: "phone",
  mail: "email",
  "message-circle": "message",
  "message-square": "chat",
  send: "send",
  share: "share-variant",
  link: "link",
  download: "download",
  upload: "upload",
  cloud: "cloud",
  lock: "lock",
  unlock: "lock-open",
  key: "key",
  shield: "shield",
  power: "power",
  battery: "battery",
  wifi: "wifi",
  bluetooth: "bluetooth",
  cast: "cast",
  play: "play",
  pause: "pause",
  square: "square",
  menu: "menu",
  grid: "view-grid",
  list: "format-list-bulleted",
  filter: "filter",
  "arrow-up-down": "swap-vertical",
  edit: "pencil",
  trash: "delete",
  save: "content-save",
  folder: "folder",
  file: "file",
  "file-text": "file-document",
  paperclip: "paperclip",
  bookmark: "bookmark",
  tag: "tag",
  "shopping-cart": "cart",
  "credit-card": "credit-card",
  wallet: "wallet",
  gift: "gift",
  "shopping-bag": "shopping",
  truck: "truck",
  plane: "airplane",
  car: "car",
  bus: "bus",
  train: "train",
  bike: "bike",
  navigation: "navigation",
  compass: "compass",
  zap: "flash",
  award: "trophy",
  "thumbs-up": "thumb-up",
  smile: "emoticon-happy",
  globe: "earth",
  activity: "pulse",
  "bar-chart": "chart-bar",
  "pie-chart": "chart-pie",
  "trending-up": "trending-up",
};

type Library = "brands" | "lucide" | "phosphor" | "material";

export function BrandIconsPanel() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Library>("brands");
  const [iconColor, setIconColor] = useState<"original" | "white" | "black">("original");
  const { getActiveSet, getActiveScreen, addLayer } = useEditorStore();

  const filteredIcons = useMemo(() => {
    const source = tab === "brands" ? POPULAR_BRANDS : UI_ICONS;
    if (!query.trim()) return source;
    const q = query.toLowerCase();
    return source.filter((b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q));
  }, [query, tab]);

  const getDirectIconUrl = (library: Library, slug: string, baseColor: string) => {
    const colorHex =
      iconColor === "white"
        ? "ffffff"
        : iconColor === "black"
        ? "000000"
        : baseColor.replace("#", "");

    switch (library) {
      case "brands":
        return `https://api.iconify.design/simple-icons/${slug}.svg?color=%23${colorHex}`;
      case "lucide":
        return `https://api.iconify.design/lucide/${slug}.svg?color=%23${colorHex}`;
      case "phosphor": {
        const phSlug = PHOSPHOR_MAP[slug] || slug;
        return `https://api.iconify.design/ph/${phSlug}.svg?color=%23${colorHex}`;
      }
      case "material": {
        const mdiSlug = MDI_MAP[slug] || slug;
        return `https://api.iconify.design/mdi/${mdiSlug}.svg?color=%23${colorHex}`;
      }
    }
  };

  const getProxiedUrl = (directUrl: string) => {
    return `/api/proxy-svg?url=${encodeURIComponent(directUrl)}`;
  };

  const handleAdd = (icon: IconDef) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) {
      toast.error("Select a screen first to place icon");
      return;
    }

    const directUrl = getDirectIconUrl(tab, icon.slug, icon.color);
    const proxyUrl = getProxiedUrl(directUrl);

    addLayer(set.id, screen.id, {
      type: "image" as const,
      src: proxyUrl,
      x: Math.round(screen.width / 2 - 120),
      y: Math.round(screen.height / 2 - 120),
      width: 240,
      height: 240,
      rotation: 0,
      opacity: 1,
      cornerRadius: 0,
    } as Parameters<typeof addLayer>[2]);

    useEditorStore.getState().recordHistory();
    toast.success(`Added ${icon.name} icon to canvas!`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Tabs */}
      <div className="p-3 border-b border-border/40 space-y-2">
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto py-1">
            <TabsTrigger value="brands" className="text-[10px] py-1">Brands</TabsTrigger>
            <TabsTrigger value="lucide" className="text-[10px] py-1">Lucide</TabsTrigger>
            <TabsTrigger value="phosphor" className="text-[10px] py-1">Phosphor</TabsTrigger>
            <TabsTrigger value="material" className="text-[10px] py-1">Material</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Color Switcher */}
        <div className="flex items-center justify-between text-[11px] px-1 text-muted-foreground">
          <span>Icon Color:</span>
          <div className="flex items-center gap-1 bg-secondary/80 p-0.5 rounded-lg border border-border/40">
            <button
              type="button"
              onClick={() => setIconColor("original")}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                iconColor === "original" ? "bg-primary text-primary-foreground font-semibold" : "hover:text-foreground"
              }`}
            >
              Original
            </button>
            <button
              type="button"
              onClick={() => setIconColor("black")}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                iconColor === "black" ? "bg-primary text-primary-foreground font-semibold" : "hover:text-foreground"
              }`}
            >
              Black
            </button>
            <button
              type="button"
              onClick={() => setIconColor("white")}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                iconColor === "white" ? "bg-primary text-primary-foreground font-semibold" : "hover:text-foreground"
              }`}
            >
              White
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border/40 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            id="icons-search"
            placeholder="Search icons (e.g. Apple, Google, Chat, Star)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-8 text-xs"
          />
        </div>
      </div>

      {/* Grid */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3 grid grid-cols-3 gap-2">
          {filteredIcons.map((icon) => {
            const directUrl = getDirectIconUrl(tab, icon.slug, icon.color);
            const proxyUrl = getProxiedUrl(directUrl);

            return (
              <button
                key={icon.slug}
                type="button"
                onClick={() => handleAdd(icon)}
                title={icon.name}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/80 border border-border/30 hover:border-primary/40 transition-all hover:scale-[1.03] group cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center p-0.5 rounded-lg bg-background/50 border border-border/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proxyUrl}
                    alt={icon.name}
                    loading="lazy"
                    className="w-6 h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[9.5px] text-muted-foreground group-hover:text-foreground text-center leading-tight truncate w-full capitalize font-medium">
                  {icon.name}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground text-center pb-4 pt-2">
          {filteredIcons.length} icons available · Powered by Iconify & Vector SVGs
        </p>
      </ScrollArea>
    </div>
  );
}
