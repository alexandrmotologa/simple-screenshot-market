"use client";

import { useState, useMemo } from "react";
import { X, Search, Check, Sparkles, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates";
import { useProjectStore } from "@/lib/store/projectStore";
import { backgroundToCSS } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (projectId: string) => void;
}

export function NewProjectModal({ open, onClose, onCreated }: NewProjectModalProps) {
  const { createProject } = useProjectStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>("blank");
  const [projectName, setProjectName] = useState("My App Screenshots");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    return DEFAULT_TEMPLATES.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const handleCreate = async () => {
    if (!projectName.trim()) return;
    setCreating(true);
    try {
      const project = createProject(selectedTemplate, projectName.trim());
      onClose();
      onCreated(project.id);
    } finally {
      setCreating(false);
    }
  };

  const selectedTemplateObj = DEFAULT_TEMPLATES.find((t) => t.id === selectedTemplate);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-border/60 shrink-0">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Choose a Template
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-0.5">
            Pick a pre-designed theme or start from a blank canvas
          </p>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Left: template grid */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-border/60">
            {/* Search + category filters */}
            <div className="px-5 py-4 border-b border-border/40 space-y-3 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="template-search"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-secondary border-0"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                      category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Template grid */}
            <ScrollArea className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
                {filtered.map((template) => {
                  const isSelected = selectedTemplate === template.id;
                  const bgCSS =
                    template.id === "blank"
                      ? "linear-gradient(135deg, #1e1b4b, #312e81)"
                      : backgroundToCSS(template.screens[0].background);

                  return (
                    <button
                      key={template.id}
                      id={`template-${template.id}`}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={cn(
                        "group relative rounded-xl overflow-hidden aspect-[9/16] max-h-44 transition-all duration-200 text-left",
                        isSelected
                          ? "ring-2 ring-primary shadow-lg shadow-primary/25"
                          : "ring-1 ring-border hover:ring-primary/40 hover:shadow-md"
                      )}
                    >
                      {/* Background */}
                      <div
                        className="absolute inset-0"
                        style={{ background: bgCSS, backgroundSize: "cover" }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Check mark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}

                      {/* Labels */}
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p className="text-white font-semibold text-xs leading-tight">
                          {template.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="mt-1 text-[9px] h-4 px-1.5 bg-black/40 text-white/80 border-0"
                        >
                          {template.category}
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Right: project settings */}
          <div className="w-72 flex flex-col px-6 py-5 gap-5 shrink-0">
            {/* Preview */}
            <div
              className="w-full aspect-[9/16] max-h-40 rounded-xl overflow-hidden relative"
              style={{
                background:
                  selectedTemplateObj && selectedTemplateObj.id !== "blank"
                    ? backgroundToCSS(selectedTemplateObj.screens[0].background)
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-bold text-sm">
                  {selectedTemplateObj?.name ?? "Blank"}
                </p>
                <p className="text-white/70 text-xs mt-0.5">
                  {selectedTemplateObj?.description ?? "Start from scratch"}
                </p>
              </div>
            </div>

            {/* Project name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Project Name
              </label>
              <Input
                id="project-name-input"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My App Screenshots"
                className="bg-secondary border-0"
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>

            {/* What's included */}
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Includes</p>
              <ul className="space-y-1.5">
                {[
                  "App Store (iOS) set",
                  "Google Play (Android) set",
                  "Device mockup selector",
                  "Background editor",
                  "Text & image layers",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-2">
              <Button
                id="create-project-btn"
                onClick={handleCreate}
                disabled={creating || !projectName.trim()}
                className="w-full gap-2"
              >
                {creating ? (
                  "Creating..."
                ) : (
                  <>
                    Create Project
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
