"use client";

import { Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";

export function StoreListing() {
  const { screenSets } = useEditorStore();
  const hasIOS = screenSets.some((s) => s.store === "ios");
  const hasAndroid = screenSets.some((s) => s.store === "android");
  const [appStoreData, setAppStoreData] = useState({
    name: "",
    subtitle: "",
    description: "",
    promotionalText: "",
    whatsNew: "",
  });

  const [playStoreData, setPlayStoreData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    whatsNew: "",
  });

  return (
    <div className="mt-8 bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-medium px-2 py-1 hover:bg-secondary rounded cursor-pointer">
            US <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="h-4 w-px bg-border" />
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-none">Store listing</h3>
            <span className="text-xs text-muted-foreground">English</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          Generate with AI
        </button>
      </div>

      {/* Columns */}
      <div className={`grid gap-px bg-border ${hasIOS && hasAndroid ? "grid-cols-2" : "grid-cols-1"}`}>
        {/* App Store Column */}
        {hasIOS && (
        <div className="bg-card p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-500 p-1.5 rounded-md text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 15c-.1-1.3 1.1-2 1.2-2.1-1.2-1.8-3-2-3.7-2.1-1.6-.2-3 1-3.9 1-.9 0-2-1-3.3-1-1.7 0-3.3 1-4.2 2.5-1.9 3.2-.5 8.1 1.4 10.7.9 1.3 2 2.7 3.3 2.7 1.3-.1 1.9-.9 3.4-.9 1.5 0 2 1 3.5 1 1.4 0 2.4-1.3 3.3-2.6 1.1-1.6 1.5-3.2 1.5-3.3-.1 0-2.4-.9-2.5-3.8zM14.8 7.3c.7-.9 1.2-2.2 1.1-3.4-1.1.1-2.5.7-3.3 1.7-.6.7-1.2 2-1 3.3 1.2.1 2.5-.6 3.2-1.6z"/></svg>
            </div>
            <h4 className="font-semibold text-sm">App Store</h4>
          </div>

          <Field
            label="App name"
            maxLength={30}
            value={appStoreData.name}
            onChange={(v) => setAppStoreData({ ...appStoreData, name: v })}
            placeholder="App name as shown on the App Store"
          />
          <Field
            label="Subtitle"
            maxLength={30}
            value={appStoreData.subtitle}
            onChange={(v) => setAppStoreData({ ...appStoreData, subtitle: v })}
            placeholder="Short line under the app name"
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
            placeholder="Updateable any time without app review (e.g. limited-time offer)"
          />
          <Field
            label="What's new"
            maxLength={4000}
            multiline
            value={appStoreData.whatsNew}
            onChange={(v) => setAppStoreData({ ...appStoreData, whatsNew: v })}
            placeholder="What changed in this version"
            minHeight="80px"
          />
        </div>
        )}

        {/* Google Play Column */}
        {hasAndroid && (
        <div className="bg-card p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-green-500 p-1.5 rounded-md text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2v20l17-10L4 2z"/></svg>
            </div>
            <h4 className="font-semibold text-sm">Google Play</h4>
          </div>

          <Field
            label="App title"
            maxLength={50}
            value={playStoreData.title}
            onChange={(v) => setPlayStoreData({ ...playStoreData, title: v })}
            placeholder="Title on Google Play"
          />
          <Field
            label="Short description"
            maxLength={80}
            multiline
            value={playStoreData.shortDescription}
            onChange={(v) => setPlayStoreData({ ...playStoreData, shortDescription: v })}
            placeholder="Brief summary for listings"
            minHeight="60px"
          />
          <Field
            label="Full description"
            maxLength={4000}
            multiline
            value={playStoreData.fullDescription}
            onChange={(v) => setPlayStoreData({ ...playStoreData, fullDescription: v })}
            placeholder="Full description for the store"
            minHeight="140px"
          />
          <Field
            label="What's new"
            maxLength={500}
            multiline
            value={playStoreData.whatsNew}
            onChange={(v) => setPlayStoreData({ ...playStoreData, whatsNew: v })}
            placeholder="Release notes for this version"
            minHeight="80px"
          />
        </div>
        )}
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
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-medium text-foreground">{label}</label>
        <span className="text-xs text-muted-foreground">
          {value.length} / {maxLength}
        </span>
      </div>
      <div className="relative group">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            placeholder={placeholder}
            className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-y"
            style={{ minHeight }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            placeholder={placeholder}
            className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
        )}
        <button
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded text-muted-foreground"
          title="Copy to clipboard"
          onClick={() => navigator.clipboard.writeText(value)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
