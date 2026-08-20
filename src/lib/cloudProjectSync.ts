import { doc, setDoc, deleteDoc, getDocs, collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { useProjectStore } from "@/lib/store/projectStore";
import { Project } from "@/lib/types";

let currentUnsub: Unsubscribe | null = null;
let isSyncing = false;

/**
 * Initializes real-time cloud synchronization for the user's projects from Firebase Firestore.
 * Automatically merges local and cloud projects and backs up guest projects to the cloud.
 */
export async function syncProjectsOnLogin(uid: string): Promise<void> {
  if (!uid || isSyncing) return;
  isSyncing = true;

  try {
    const db = await getFirebaseDb();
    if (!db) {
      isSyncing = false;
      return;
    }

    const projectsCol = collection(db, "users", uid, "projects");
    
    // 1. Fetch initial snapshot of cloud projects
    const snapshot = await getDocs(projectsCol);
    const cloudProjects: Project[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      if (data && data.id) {
        cloudProjects.push(data as Project);
      }
    });

    const localProjects = useProjectStore.getState().projects;

    // 2. Merge local + cloud projects (keyed by project ID)
    const mergedMap = new Map<string, Project>();
    
    // Add all cloud projects
    cloudProjects.forEach((p) => mergedMap.set(p.id, p));

    // Merge in any local projects (uploading local-only or newer projects)
    for (const lp of localProjects) {
      const existing = mergedMap.get(lp.id);
      if (!existing) {
        mergedMap.set(lp.id, lp);
        // Upload local guest project to cloud
        await saveProjectToCloud(uid, lp);
      } else {
        const localTime = new Date(lp.updatedAt || 0).getTime();
        const cloudTime = new Date(existing.updatedAt || 0).getTime();
        if (localTime > cloudTime) {
          mergedMap.set(lp.id, lp);
          await saveProjectToCloud(uid, lp);
        }
      }
    }

    const mergedList = Array.from(mergedMap.values());
    useProjectStore.setState({ projects: mergedList });

    // 3. Attach real-time snapshot listener for changes across other devices/tabs
    if (currentUnsub) {
      currentUnsub();
    }
    currentUnsub = onSnapshot(projectsCol, (snap) => {
      const remoteProjects: Project[] = [];
      snap.forEach((d) => {
        const data = d.data();
        if (data && data.id) {
          remoteProjects.push(data as Project);
        }
      });

      if (remoteProjects.length > 0) {
        useProjectStore.setState((state) => {
          const map = new Map<string, Project>();
          state.projects.forEach((p) => map.set(p.id, p));
          remoteProjects.forEach((rp) => {
            const current = map.get(rp.id);
            if (!current || new Date(rp.updatedAt || 0).getTime() >= new Date(current.updatedAt || 0).getTime()) {
              map.set(rp.id, rp);
            }
          });
          return { projects: Array.from(map.values()) };
        });
      }
    }, (error) => {
      console.warn("Firestore projects snapshot listener error:", error);
    });

  } catch (err) {
    console.warn("Cloud project sync error:", err);
  } finally {
    isSyncing = false;
  }
}

/**
 * Saves or updates a project in Firestore under users/{uid}/projects/{projectId}
 */
export async function saveProjectToCloud(uid: string, project: Project): Promise<void> {
  if (!uid || !project?.id) return;
  try {
    const db = await getFirebaseDb();
    if (!db) return;
    const projectRef = doc(db, "users", uid, "projects", project.id);
    await setDoc(projectRef, {
      ...project,
      updatedAt: project.updatedAt || new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn("Failed to save project to cloud:", err);
  }
}

/**
 * Deletes a project from Firestore under users/{uid}/projects/{projectId}
 */
export async function deleteProjectFromCloud(uid: string, projectId: string): Promise<void> {
  if (!uid || !projectId) return;
  try {
    const db = await getFirebaseDb();
    if (!db) return;
    const projectRef = doc(db, "users", uid, "projects", projectId);
    await deleteDoc(projectRef);
  } catch (err) {
    console.warn("Failed to delete project from cloud:", err);
  }
}

/**
 * Cleans up listeners on sign-out
 */
export function stopCloudSync(): void {
  if (currentUnsub) {
    currentUnsub();
    currentUnsub = null;
  }
}
