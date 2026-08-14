"use client";

import { useEffect, useState } from "react";
import { Sparkles, ChevronDown, Check, Copy } from "lucide-react";
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

  const [appStoreData, setAppStoreData] = useState({
    name: project?.storeListing?.[activeLang]?.ios?.name || "",
    subtitle: project?.storeListing?.[activeLang]?.ios?.subtitle || "",
    description: project?.storeListing?.[activeLang]?.ios?.description || "",
    promotionalText: project?.storeListing?.[activeLang]?.ios?.promotionalText || "",
    whatsNew: project?.storeListing?.[activeLang]?.ios?.whatsNew || "",
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
          }
        }
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [appStoreData, playStoreData, projectId, updateProject, activeLang]);

  return (
    <div className="flex flex-col h-full relative">
      <div className="shrink-0 p-3 border-b border-border/30 flex flex-col gap-2">
        <div className="flex items-center justify-between">
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
                    className="flex items-center justify-between"
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
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3">
          <Accordion className="w-full space-y-3">
            
            {hasIOS && (
              <AccordionItem value="appstore" className="border border-border/40 bg-secondary/10 rounded-xl overflow-hidden px-3">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-500 p-1.5 rounded-lg text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 15c-.1-1.3 1.1-2 1.2-2.1-1.2-1.8-3-2-3.7-2.1-1.6-.2-3 1-3.9 1-.9 0-2-1-3.3-1-1.7 0-3.3 1-4.2 2.5-1.9 3.2-.5 8.1 1.4 10.7.9 1.3 2 2.7 3.3 2.7 1.3-.1 1.9-.9 3.4-.9 1.5 0 2 1 3.5 1 1.4 0 2.4-1.3 3.3-2.6 1.1-1.6 1.5-3.2 1.5-3.3-.1 0-2.4-.9-2.5-3.8zM14.8 7.3c.7-.9 1.2-2.2 1.1-3.4-1.1.1-2.5.7-3.3 1.7-.6.7-1.2 2-1 3.3 1.2.1 2.5-.6 3.2-1.6z"/></svg>
                    </div>
                    <span className="font-semibold text-xs">App Store</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-3 space-y-4">
                  <Field
                    label="App name"
                    maxLength={30}
                    value={appStoreData.name}
                    onChange={(v) => setAppStoreData({ ...appStoreData, name: v })}
                    placeholder="Name"
                  />
                  <Field
                    label="Subtitle"
                    maxLength={30}
                    value={appStoreData.subtitle}
                    onChange={(v) => setAppStoreData({ ...appStoreData, subtitle: v })}
                    placeholder="Subtitle"
                  />
                  <Field
                    label="Description"
                    maxLength={4000}
                    multiline
                    value={appStoreData.description}
                    onChange={(v) => setAppStoreData({ ...appStoreData, description: v })}
                    placeholder="Full app description"
                    minHeight="120px"
                  />
                  <Field
                    label="Promotional text"
                    maxLength={170}
                    value={appStoreData.promotionalText}
                    onChange={(v) => setAppStoreData({ ...appStoreData, promotionalText: v })}
                    placeholder="E.g. limited-time offer"
                  />
                  <Field
                    label="What's new"
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
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 p-1.5 rounded-lg text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2v20l17-10L4 2z"/></svg>
                    </div>
                    <span className="font-semibold text-xs">Google Play</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-3 space-y-4">
                  <Field
                    label="App title"
                    maxLength={50}
                    value={playStoreData.title}
                    onChange={(v) => setPlayStoreData({ ...playStoreData, title: v })}
                    placeholder="Title"
                  />
                  <Field
                    label="Short description"
                    maxLength={80}
                    multiline
                    value={playStoreData.shortDescription}
                    onChange={(v) => setPlayStoreData({ ...playStoreData, shortDescription: v })}
                    placeholder="Brief summary"
                    minHeight="60px"
                  />
                  <Field
                    label="Full description"
                    maxLength={4000}
                    multiline
                    value={playStoreData.fullDescription}
                    onChange={(v) => setPlayStoreData({ ...playStoreData, fullDescription: v })}
                    placeholder="Full description"
                    minHeight="140px"
                  />
                  <Field
                    label="What's new"
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

      <div className="shrink-0 p-3 border-t border-border/30">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/30 transition-all">
          <Sparkles className="w-4 h-4" />
          Generate with AI
        </button>
      </div>
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
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
  minHeight?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-foreground">{label}</label>
        <span className={cn("text-[10px]", value.length > maxLength ? "text-destructive font-bold" : "text-muted-foreground")}>
          {value.length} / {maxLength}
        </span>
      </div>
      <div className="relative group">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            placeholder={placeholder}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-2.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-indigo-500/50 resize-y"
            style={{ minHeight }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            placeholder={placeholder}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-2.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-indigo-500/50"
          />
        )}
        <button
          className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center hover:bg-secondary rounded text-muted-foreground"
          title="Copy to clipboard"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
