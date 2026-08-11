"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/lib/store/projectStore";
import { useEditorStore } from "@/lib/store/editorStore";
import { EditorLayout } from "@/components/editor/EditorLayout";

interface EditorPageProps {
  params: Promise<{ projectId: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const { projectId } = use(params);
  const router = useRouter();
  const getProject = useProjectStore((s) => s.getProject);
  const updateProject = useProjectStore((s) => s.updateProject);
  const { loadProject, screenSets } = useEditorStore();

  useEffect(() => {
    const project = getProject(projectId);
    if (!project) {
      router.replace("/");
      return;
    }
    loadProject(projectId, project.screenSets);
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save screenSets back to project store whenever they change
  useEffect(() => {
    if (screenSets.length > 0) {
      updateProject(projectId, { screenSets });
    }
  }, [screenSets]); // eslint-disable-line react-hooks/exhaustive-deps

  return <EditorLayout projectId={projectId} />;
}
