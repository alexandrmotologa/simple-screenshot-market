"use client";

import { useState, useMemo } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IconDef {
  name: string;
  slug: string;
  color: string;
}

const POPULAR_BRANDS: IconDef[] = [
  { name: "Apple", slug: "apple", color: "000000" },
  { name: "Google", slug: "google", color: "4285F4" },
  { name: "Meta", slug: "meta", color: "0081FB" },
  { name: "Microsoft", slug: "microsoft", color: "5E5E5E" },
  { name: "Amazon", slug: "amazon", color: "FF9900" },
  { name: "Netflix", slug: "netflix", color: "E50914" },
  { name: "Spotify", slug: "spotify", color: "1DB954" },
  { name: "YouTube", slug: "youtube", color: "FF0000" },
  { name: "TikTok", slug: "tiktok", color: "000000" },
  { name: "Instagram", slug: "instagram", color: "E4405F" },
  { name: "X / Twitter", slug: "x", color: "000000" },
  { name: "LinkedIn", slug: "linkedin", color: "0A66C2" },
  { name: "Reddit", slug: "reddit", color: "FF4500" },
  { name: "Discord", slug: "discord", color: "5865F2" },
  { name: "Slack", slug: "slack", color: "4A154B" },
  { name: "Notion", slug: "notion", color: "000000" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Shopify", slug: "shopify", color: "7AB55C" },
  { name: "PayPal", slug: "paypal", color: "003087" },
  { name: "Airbnb", slug: "airbnb", color: "FF5A5F" },
  { name: "Uber", slug: "uber", color: "000000" },
  { name: "WhatsApp", slug: "whatsapp", color: "25D366" },
  { name: "Telegram", slug: "telegram", color: "26A5E4" },
  { name: "Snapchat", slug: "snapchat", color: "FFFC00" },
  { name: "Pinterest", slug: "pinterest", color: "BD081C" },
  { name: "Twitch", slug: "twitch", color: "9146FF" },
  { name: "OpenAI", slug: "openai", color: "000000" },
  { name: "Adobe", slug: "adobe", color: "FF0000" },
  { name: "Canva", slug: "canva", color: "00C4CC" },
  { name: "Dropbox", slug: "dropbox", color: "0061FF" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextjs", color: "000000" },
  { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Android", slug: "android", color: "3DDC84" },
  { name: "Google Play", slug: "googleplay", color: "414141" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "AWS", slug: "amazonaws", color: "FF9900" },
  { name: "Firebase", slug: "firebase", color: "FFCA28" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
];

const UI_ICONS = [
  "home", "settings", "search", "user", "star", "heart", "check", "x", "info", "alert-triangle",
  "camera", "image", "video", "music", "mic", "bell", "calendar", "clock", "map-pin", "map",
  "phone", "mail", "message-circle", "message-square", "send", "share", "link", "download", "upload", "cloud",
  "lock", "unlock", "key", "shield", "power", "battery", "wifi", "bluetooth", "cast", "play",
  "pause", "square", "menu", "grid", "list", "filter", "arrow-up-down", "edit", "trash", "save",
  "folder", "file", "file-text", "paperclip", "bookmark", "tag", "shopping-cart", "credit-card", "wallet",
  "gift", "shopping-bag", "truck", "plane", "car", "bus", "train", "bike", "navigation", "compass"
].map(slug => ({ name: slug.replace(/-/g, " "), slug, color: "000000" }));

type Library = "brands" | "lucide" | "phosphor" | "material";

export function BrandIconsPanel() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Library>("brands");
  const { getActiveSet, getActiveScreen, addLayer } = useEditorStore();

  const filteredIcons = useMemo(() => {
    const source = tab === "brands" ? POPULAR_BRANDS : UI_ICONS;
    if (!query.trim()) return source;
    const q = query.toLowerCase();
    return source.filter((b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q));
  }, [query, tab]);

  const getIconUrl = (library: Library, slug: string, color: string) => {
    const hex = color.replace("#", "");
    switch (library) {
      case "brands":
        return `https://api.iconify.design/simple-icons/${slug}.svg?color=%23${hex}`;
      case "lucide":
        return `https://api.iconify.design/lucide/${slug}.svg?color=%23${hex}`;
      case "phosphor":
        return `https://api.iconify.design/ph/${slug}.svg?color=%23${hex}`;
      case "material":
        // simple mapping for common names, material might differ slightly from lucide but iconify has fuzzy matching on search, we'll just try direct
        // for better results, using `mdi` namespace
        return `https://api.iconify.design/mdi/${slug.replace(/-/g, "")}.svg?color=%23${hex}`;
    }
  };

  const handleAdd = (icon: IconDef) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) return;

    const url = getIconUrl(tab, icon.slug, icon.color);
    const proxyUrl = `/_next/image?url=${encodeURIComponent(url)}&w=256&q=75`;

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
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Tabs */}
      <div className="p-3 border-b border-border/40">
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto py-1">
            <TabsTrigger value="brands" className="text-[10px] py-1">Brands</TabsTrigger>
            <TabsTrigger value="lucide" className="text-[10px] py-1">Lucide</TabsTrigger>
            <TabsTrigger value="phosphor" className="text-[10px] py-1">Phosphor</TabsTrigger>
            <TabsTrigger value="material" className="text-[10px] py-1">Material</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border/40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            id="icons-search"
            placeholder="Search icons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-8 text-xs"
          />
        </div>
      </div>

      {/* Grid */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3 grid grid-cols-3 gap-2">
          {filteredIcons.map((icon) => (
            <button
              key={icon.slug}
              onClick={() => handleAdd(icon)}
              title={icon.name}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all hover:scale-[1.03] group"
            >
              <img
                src={`/_next/image?url=${encodeURIComponent(getIconUrl(tab, icon.slug, icon.color))}&w=64&q=75`}
                alt={icon.name}
                className="w-7 h-7 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[9px] text-muted-foreground group-hover:text-foreground text-center leading-tight truncate w-full capitalize">
                {icon.name}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground text-center pb-4 pt-4">
          Powered by Iconify
        </p>
      </ScrollArea>
    </div>
  );
}
