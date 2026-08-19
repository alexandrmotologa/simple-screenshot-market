"use client";

import { useEffect, useState } from "react";
import { Sparkles, ChevronDown, Check, Copy, Loader2, Wand2, RefreshCw } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { useLanguageStore, getLang } from "@/lib/store/languageStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppleStoreIcon, GooglePlayIcon, APP_STORE_LABEL, GOOGLE_PLAY_LABEL } from "@/components/icons/StoreIcons";
import { toast } from "@/lib/store/toastStore";
import { TextLayer } from "@/lib/types";

export function StoreListingPanel() {
  const { projectId } = useParams<{ projectId: string }>();
  const getProject = useProjectStore((s) => s.getProject);
  const updateProject = useProjectStore((s) => s.updateProject);
  
  const project = getProject(projectId);
  const screenSets = useEditorStore((s) => s.screenSets);
  const hasIOS = screenSets.some((ss) => ss.store === "ios");
  const hasAndroid = screenSets.some((ss) => ss.store === "android");

  const { activeLang, projectLanguages, setActiveLang } = useLanguageStore();
  const currentLang = getLang(activeLang);

  const [isGenerating, setIsGenerating] = useState(false);

  const [appStoreData, setAppStoreData] = useState({
    name: project?.storeListing?.[activeLang]?.ios?.name || "",
    subtitle: project?.storeListing?.[activeLang]?.ios?.subtitle || "",
    description: project?.storeListing?.[activeLang]?.ios?.description || "",
    promotionalText: project?.storeListing?.[activeLang]?.ios?.promotionalText || "",
    whatsNew: project?.storeListing?.[activeLang]?.ios?.whatsNew || "",
    keywords: (project?.storeListing?.[activeLang]?.ios as any)?.keywords || "",
  });

  const [playStoreData, setPlayStoreData] = useState({
    title: project?.storeListing?.[activeLang]?.android?.title || "",
    shortDescription: project?.storeListing?.[activeLang]?.android?.shortDescription || "",
    fullDescription: project?.storeListing?.[activeLang]?.android?.fullDescription || "",
    whatsNew: project?.storeListing?.[activeLang]?.android?.whatsNew || "",
  });

  // Sync state if project or active language changes
  useEffect(() => {
    const listingForLang = project?.storeListing?.[activeLang];
    setAppStoreData({
      name: listingForLang?.ios?.name || "",
      subtitle: listingForLang?.ios?.subtitle || "",
      description: listingForLang?.ios?.description || "",
      promotionalText: listingForLang?.ios?.promotionalText || "",
      whatsNew: listingForLang?.ios?.whatsNew || "",
      keywords: (listingForLang?.ios as any)?.keywords || "",
    });
    setPlayStoreData({
      title: listingForLang?.android?.title || "",
      shortDescription: listingForLang?.android?.shortDescription || "",
      fullDescription: listingForLang?.android?.fullDescription || "",
      whatsNew: listingForLang?.android?.whatsNew || "",
    });
  }, [project?.storeListing, activeLang]);

  // Debounced auto-save to projectStore
  useEffect(() => {
    if (!projectId) return;
    const timer = setTimeout(() => {
      const existingStoreListing = useProjectStore.getState().getProject(projectId)?.storeListing || {};
      updateProject(projectId, {
        storeListing: {
          ...existingStoreListing,
          [activeLang]: {
            ios: appStoreData,
            android: playStoreData,
          },
        },
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [appStoreData, playStoreData, projectId, updateProject, activeLang]);

  // ── AI Generate Complete Store Listing ─────────────────────────────────────
  const handleAIGenerateListing = async () => {
    try {
      setIsGenerating(true);
      
      // Extract headlines from active screen set
      const activeSet = screenSets[0];
      const screenHeadlines: string[] = [];
      if (activeSet) {
        activeSet.screens.forEach((sc) => {
          const textLayers = sc.layers.filter((l): l is TextLayer => l.type === "text");
          if (textLayers[0]?.content) screenHeadlines.push(textLayers[0].content);
        });
      }

      const res = await fetch("/api/ai/store-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appName: project?.name || "Mobile App",
          category: "Productivity",
          targetLang: activeLang || "en",
          screenHeadlines,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate listing");
      }

      const listing = data.listing;
      if (listing.ios) {
        setAppStoreData({
          name: listing.ios.name || appStoreData.name,
          subtitle: listing.ios.subtitle || appStoreData.subtitle,
          promotionalText: listing.ios.promotionalText || appStoreData.promotionalText,
          keywords: listing.ios.keywords || appStoreData.keywords,
          description: listing.ios.description || appStoreData.description,
          whatsNew: listing.ios.whatsNew || appStoreData.whatsNew,
        });
      }

      if (listing.android) {
        setPlayStoreData({
          title: listing.android.title || playStoreData.title,
          shortDescription: listing.android.shortDescription || playStoreData.shortDescription,
          fullDescription: listing.android.fullDescription || playStoreData.fullDescription,
          whatsNew: listing.android.whatsNew || playStoreData.whatsNew,
        });
      }

      toast.success("AI generated full App Store & Google Play metadata!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "AI Listing generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="shrink-0 p-3 border-b border-border/30 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <span className="text-base">{currentLang?.flag}</span>
            <span className="uppercase">{activeLang}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {projectLanguages.map((code) => {
              const l = getLang(code);
              return (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setActiveLang(code)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{l?.flag}</span>
                    <span>{l?.name || code}</span>
                  </div>
                  <span className="text-muted-foreground uppercase text-[10px]">{code}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="text-[10px] text-muted-foreground font-mono uppercase">
          ASO Optimizer
        </span>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3 space-y-3">
          {/* Quick AI Trigger Banner */}
          <button
            type="button"
            onClick={handleAIGenerateListing}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 border border-indigo-500/30 hover:border-indigo-500/50 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-all shadow-xs cursor-pointer active:scale-[0.98]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Generating ASO metadata...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI Auto-Generate Store Listing</span>
              </>
            )}
          </button>

          <Accordion className="w-full space-y-3" defaultValue={["appstore", "playstore"]}>
            {hasIOS && (
              <AccordionItem value="appstore" className="border border-border/40 bg-secondary/10 rounded-xl overflow-hidden px-3">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-blue-500/15 text-blue-400 p-1.5 rounded-lg border border-blue-500/30 flex items-center justify-center">
                      <AppleStoreIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-xs text-foreground">{APP_STORE_LABEL}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-3 space-y-3">
                  <Field
                    label="App Name"
                    maxLength={30}
                    value={appStoreData.name}
                    onChange={(v) => setAppStoreData({ ...appStoreData, name: v })}
                    placeholder="Name (Max 30 chars)"
                  />
                  <Field
                    label="Subtitle"
                    maxLength={30}
                    value={appStoreData.subtitle}
                    onChange={(v) => setAppStoreData({ ...appStoreData, subtitle: v })}
                    placeholder="Subtitle (Max 30 chars)"
                  />
                  <Field
                    label="Keywords Bank"
                    maxLength={100}
                    value={appStoreData.keywords}
                    onChange={(v) => setAppStoreData({ ...appStoreData, keywords: v })}
                    placeholder="photos,mockup,editor,design,studio (Max 100 chars)"
                  />
                  <Field
                    label="Promotional Text"
                    maxLength={170}
                    value={appStoreData.promotionalText}
                    onChange={(v) => setAppStoreData({ ...appStoreData, promotionalText: v })}
                    placeholder="Special announcement or offer (Max 170 chars)"
                  />
                  <Field
                    label="Description"
                    maxLength={4000}
                    multiline
                    value={appStoreData.description}
                    onChange={(v) => setAppStoreData({ ...appStoreData, description: v })}
                    placeholder="Full app description formatted for App Store"
                    minHeight="120px"
                  />
                  <Field
                    label="What's New"
                    maxLength={4000}
                    multiline
                    value={appStoreData.whatsNew}
                    onChange={(v) => setAppStoreData({ ...appStoreData, whatsNew: v })}
                    placeholder="Release notes"
                    minHeight="80px"
                  />
                </AccordionContent>
              </AccordionItem>
            )}

            {hasAndroid && (
              <AccordionItem value="playstore" className="border border-border/40 bg-secondary/10 rounded-xl overflow-hidden px-3">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-emerald-500/15 text-emerald-400 p-1.5 rounded-lg border border-emerald-500/30 flex items-center justify-center">
                      <GooglePlayIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-xs text-foreground">{GOOGLE_PLAY_LABEL}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-3 space-y-3">
                  <Field
                    label="App Title"
                    maxLength={30}
                    value={playStoreData.title}
                    onChange={(v) => setPlayStoreData({ ...playStoreData, title: v })}
                    placeholder="Title (Max 30 chars)"
                  />
                  <Field
                    label="Short Description"
                    maxLength={80}
                    multiline
                    value={playStoreData.shortDescription}
                    onChange={(v) => setPlayStoreData({ ...playStoreData, shortDescription: v })}
                    placeholder="Brief summary (Max 80 chars)"
                    minHeight="60px"
                  />
                  <Field
                    label="Full Description"
                    maxLength={4000}
                    multiline
                    value={playStoreData.fullDescription}
                    onChange={(v) => setPlayStoreData({ ...playStoreData, fullDescription: v })}
                    placeholder="Full description"
                    minHeight="140px"
                  />
                  <Field
                    label="What's New"
                    maxLength={500}
                    multiline
                    value={playStoreData.whatsNew}
                    onChange={(v) => setPlayStoreData({ ...playStoreData, whatsNew: v })}
                    placeholder="Release notes"
                    minHeight="80px"
                  />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}

function Field({
  label,
  maxLength,
  value,
  onChange,
  placeholder,
  multiline,
  minHeight,
}: {
  label: string;
  maxLength: number;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  multiline?: boolean;
  minHeight?: string;
}) {
  const [copied, setCopied] = useState(false);
  const currentLength = (value || "").length;
  const isOver = currentLength > maxLength;
  const isClose = currentLength >= maxLength * 0.85 && !isOver;

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`Copied ${label}!`);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-mono text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded",
              isOver
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : isClose
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {currentLength} / {maxLength}
          </span>
          {value && (
            <button
              type="button"
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title={`Copy ${label}`}
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight: minHeight || "70px" }}
          className={cn(
            "w-full px-2.5 py-1.5 text-xs bg-secondary/50 border rounded-lg outline-none transition-all resize-y placeholder:text-muted-foreground/60 leading-relaxed font-sans",
            isOver
              ? "border-rose-500/60 focus:ring-1 focus:ring-rose-500/40"
              : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40"
          )}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-8 px-2.5 text-xs bg-secondary/50 border rounded-lg outline-none transition-all placeholder:text-muted-foreground/60 font-sans",
            isOver
              ? "border-rose-500/60 focus:ring-1 focus:ring-rose-500/40"
              : "border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40"
          )}
        />
      )}
    </div>
  );
}
