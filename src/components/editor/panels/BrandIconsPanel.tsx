"use client";

import { useState, useMemo, useEffect } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SimpleIcon {
  name: string;
  slug: string;
  color: string;
}

// We use Simple Icons CDN for SVG logo images
const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

// Curated list of popular brand slugs
const POPULAR_BRANDS: SimpleIcon[] = [
  { name: "Apple", slug: "apple", color: "#000000" },
  { name: "Google", slug: "google", color: "#4285F4" },
  { name: "Meta", slug: "meta", color: "#0081FB" },
  { name: "Microsoft", slug: "microsoft", color: "#5E5E5E" },
  { name: "Amazon", slug: "amazon", color: "#FF9900" },
  { name: "Netflix", slug: "netflix", color: "#E50914" },
  { name: "Spotify", slug: "spotify", color: "#1DB954" },
  { name: "YouTube", slug: "youtube", color: "#FF0000" },
  { name: "TikTok", slug: "tiktok", color: "#000000" },
  { name: "Instagram", slug: "instagram", color: "#E4405F" },
  { name: "Twitter / X", slug: "x", color: "#000000" },
  { name: "LinkedIn", slug: "linkedin", color: "#0A66C2" },
  { name: "Reddit", slug: "reddit", color: "#FF4500" },
  { name: "Discord", slug: "discord", color: "#5865F2" },
  { name: "Slack", slug: "slack", color: "#4A154B" },
  { name: "Notion", slug: "notion", color: "#000000" },
  { name: "Figma", slug: "figma", color: "#F24E1E" },
  { name: "GitHub", slug: "github", color: "#181717" },
  { name: "Vercel", slug: "vercel", color: "#000000" },
  { name: "Stripe", slug: "stripe", color: "#635BFF" },
  { name: "Shopify", slug: "shopify", color: "#7AB55C" },
  { name: "PayPal", slug: "paypal", color: "#003087" },
  { name: "Airbnb", slug: "airbnb", color: "#FF5A5F" },
  { name: "Uber", slug: "uber", color: "#000000" },
  { name: "WhatsApp", slug: "whatsapp", color: "#25D366" },
  { name: "Telegram", slug: "telegram", color: "#26A5E4" },
  { name: "Snapchat", slug: "snapchat", color: "#FFFC00" },
  { name: "Pinterest", slug: "pinterest", color: "#BD081C" },
  { name: "Twitch", slug: "twitch", color: "#9146FF" },
  { name: "OpenAI", slug: "openai", color: "#000000" },
  { name: "Adobe", slug: "adobe", color: "#FF0000" },
  { name: "Canva", slug: "canva", color: "#00C4CC" },
  { name: "Dropbox", slug: "dropbox", color: "#0061FF" },
  { name: "1Password", slug: "1password", color: "#2A9D8F" },
  { name: "Duolingo", slug: "duolingo", color: "#58CC02" },
  { name: "Revolut", slug: "revolut", color: "#0075EB" },
  { name: "Wise", slug: "wise", color: "#9FE870" },
  { name: "Monzo", slug: "monzo", color: "#FF3000" },
  { name: "Nubank", slug: "nubank", color: "#820AD1" },
  { name: "Robinhood", slug: "robinhood", color: "#00C805" },
  { name: "Coinbase", slug: "coinbase", color: "#1652F0" },
  { name: "Binance", slug: "binance", color: "#F3BA2F" },
  { name: "Ethereum", slug: "ethereum", color: "#3C3C3D" },
  { name: "Bitcoin", slug: "bitcoin", color: "#F7931A" },
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#000000" },
  { name: "Vue.js", slug: "vuedotjs", color: "#4FC08D" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "Node.js", slug: "nodedotjs", color: "#339933" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "Android", slug: "android", color: "#3DDC84" },
  { name: "App Store", slug: "appstore", color: "#0D96F6" },
  { name: "Google Play", slug: "googleplay", color: "#414141" },
  { name: "Xcode", slug: "xcode", color: "#147EFB" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "AWS", slug: "amazonaws", color: "#FF9900" },
  { name: "Google Cloud", slug: "googlecloud", color: "#4285F4" },
  { name: "Firebase", slug: "firebase", color: "#FFCA28" },
  { name: "Supabase", slug: "supabase", color: "#3ECF8E" },
  { name: "Prisma", slug: "prisma", color: "#2D3748" },
  { name: "MongoDB", slug: "mongodb", color: "#47A248" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
];

export function BrandIconsPanel() {
  const [query, setQuery] = useState("");
  const { getActiveSet, getActiveScreen, addLayer } = useEditorStore();

  const filtered = useMemo(() => {
    if (!query.trim()) return POPULAR_BRANDS;
    const q = query.toLowerCase();
    return POPULAR_BRANDS.filter(
      (b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q)
    );
  }, [query]);

  const handleAdd = (brand: SimpleIcon) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) return;

    const proxyUrl = `/_next/image?url=${encodeURIComponent(`${SIMPLE_ICONS_CDN}/${brand.slug}`)}&w=256&q=75`;

    addLayer(set.id, screen.id, {
      type: "image" as const,
      src: proxyUrl,
      x: Math.round(screen.width / 2 - 120),
      y: Math.round(screen.height / 2 - 120),
      width: 240,
      height: 240,
      rotation: 0,
      opacity: 1,
    } as Parameters<typeof addLayer>[2]);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search */}
      <div className="p-3 border-b border-border/40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            id="brands-search"
            placeholder="Search brand or slug..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-8 text-xs"
          />
        </div>
      </div>

      {/* Grid */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3 grid grid-cols-3 gap-2">
          {filtered.map((brand) => (
            <button
              key={brand.slug}
              onClick={() => handleAdd(brand)}
              title={brand.name}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all hover:scale-[1.03] group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/_next/image?url=${encodeURIComponent(`${SIMPLE_ICONS_CDN}/${brand.slug}`)}&w=64&q=75`}
                alt={brand.name}
                className="w-7 h-7 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[9px] text-muted-foreground group-hover:text-foreground text-center leading-tight truncate w-full">
                {brand.name}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground text-center pb-4">
          Powered by Simple Icons
        </p>
      </ScrollArea>
    </div>
  );
}
