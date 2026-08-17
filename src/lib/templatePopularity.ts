import { Template } from "@/lib/types";

const LOCAL_STORAGE_KEY = "snapframe_template_usage";

// Default base popularity scores for built-in templates
const BASE_POPULARITY_SEEDS: Record<string, number> = {
  "community-amber-sonic-flow": 160,
  "community-pure-dark-minimal": 150,
  "community-rubik-dark": 140,
  "community-lifestyle-warm-beige": 130,
  "community-ambient-glow-studio": 125,
  "community-bottom-colorbar-studio": 115,
  "community-dynamic-cyan-navy": 110,
  "community-rubik-light": 105,
  "dark-minimal": 95,
  "gradient-glow": 90,
  "clean-light": 85,
  "vibrant-blue": 80,
};

/**
 * Reads local usage counter for templates from LocalStorage
 */
export function getLocalTemplateUsage(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Increments the selection count for a template (+1)
 * Saves locally in LocalStorage and posts to /api/templates/popularity in the background
 */
export function recordTemplateSelection(templateId: string): void {
  if (!templateId || templateId === "blank") return;

  // 1. Update local storage
  if (typeof window !== "undefined") {
    try {
      const usage = getLocalTemplateUsage();
      usage[templateId] = (usage[templateId] || 0) + 1;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(usage));
    } catch (e) {
      console.warn("Could not save template usage to localStorage", e);
    }
  }

  // 2. Fire-and-forget sync to Firestore backend API
  try {
    fetch("/api/templates/popularity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId }),
    }).catch(() => {
      // Ignored if offline or not configured
    });
  } catch {
    // Ignored
  }
}

/**
 * Calculates a unified popularity score for a given template
 */
export function getTemplateScore(
  templateId: string,
  globalCounts: Record<string, number> = {}
): number {
  const base = BASE_POPULARITY_SEEDS[templateId] || 50;
  const global = globalCounts[templateId] || 0;
  const local = typeof window !== "undefined" ? (getLocalTemplateUsage()[templateId] || 0) : 0;
  return base + global * 10 + local * 5;
}

export type TemplateSortOption = "popularity" | "name-asc" | "name-desc" | "newest";

/**
 * Sorts and filters templates by query and sort option
 */
export function sortAndFilterTemplates(
  templates: Template[],
  query: string,
  sortBy: TemplateSortOption,
  globalCounts: Record<string, number> = {}
): Template[] {
  let list = [...templates];

  // Filter by search query
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter((t) => {
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }

  // Sort
  list.sort((a, b) => {
    if (sortBy === "popularity") {
      const scoreA = getTemplateScore(a.id, globalCounts);
      const scoreB = getTemplateScore(b.id, globalCounts);
      return scoreB - scoreA;
    }
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === "newest") {
      const isACommunity = a.tags?.includes("community") ? 1 : 0;
      const isBCommunity = b.tags?.includes("community") ? 1 : 0;
      return isBCommunity - isACommunity;
    }
    return 0;
  });

  return list;
}
