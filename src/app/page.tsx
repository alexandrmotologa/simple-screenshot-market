"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Layers, Clock, Copy, Trash2, ArrowRight, Sparkles, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { useProjectStore } from "@/lib/store/projectStore";
import { formatDate, backgroundToCSS } from "@/lib/utils";
import { Project } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const { projects, deleteProject, duplicateProject } = useProjectStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    setTimeout(() => {
      deleteProject(id);
      setDeletingId(null);
    }, 300);
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    duplicateProject(id);
  };

  const handleOpen = (id: string) => {
    router.push(`/editor/${id}`);
  };

  const getProjectPreviewBackground = (project: Project): string => {
    const firstScreen =
      project.screenSets[0]?.screens[0];
    if (!firstScreen) return "linear-gradient(135deg, #6366f1, #8b5cf6)";
    return backgroundToCSS(firstScreen.background);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg tracking-tight">SnapFrame</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => window.open("https://github.com/alexandrmotologa/simple-screenshot-market", "_blank")}
            >
              <Globe className="w-4 h-4 mr-1.5" />
              GitHub
            </Button>
            <Button
              id="new-project-btn"
              onClick={() => setShowNewProject(true)}
              className="gap-2"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero section — shown only when no projects */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Create stunning app screenshots
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
              Build beautiful App Store & Google Play screenshots with device mockups,
              templates, and a powerful drag-and-drop editor.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {[
                "📱 iOS & Android",
                "🎨 10+ Templates",
                "📐 Store-ready sizes",
                "💾 Export PNG/ZIP",
                "🔄 Undo / Redo",
                "🖼️ Device mockups",
              ].map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  {f}
                </span>
              ))}
            </div>

            <Button
              id="get-started-btn"
              size="lg"
              onClick={() => setShowNewProject(true)}
              className="gap-2 text-base px-6 h-12"
            >
              <Sparkles className="w-5 h-5" />
              Get Started — It's Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Projects grid */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Your Projects</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {projects.length} project{projects.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Button
                id="new-project-btn-2"
                onClick={() => setShowNewProject(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* New project card */}
              <button
                id="new-project-card"
                onClick={() => setShowNewProject(true)}
                className="group aspect-[9/16] max-h-64 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">New Project</span>
              </button>

              {/* Project cards */}
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleOpen(project.id)}
                  className={`group relative aspect-[9/16] max-h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ring-1 ring-border hover:ring-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-0.5 ${
                    deletingId === project.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {/* Background preview */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: getProjectPreviewBackground(project),
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Store badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {project.screenSets.map((ss) => (
                      <span
                        key={ss.id}
                        className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-wide"
                      >
                        {ss.store === "ios" ? "iOS" : "Android"}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleDuplicate(e, project.id)}
                      className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, project.id)}
                      className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-destructive/80 flex items-center justify-center text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold text-sm truncate">{project.name}</p>
                    <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {formatDate(project.updatedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <NewProjectModal
        open={showNewProject}
        onClose={() => setShowNewProject(false)}
        onCreated={(id) => router.push(`/editor/${id}`)}
      />
    </div>
  );
}
