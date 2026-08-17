import { NextResponse } from "next/server";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";

export async function GET() {
  if (!isFirebaseConfigured || !db) {
    return NextResponse.json({ success: true, counts: {}, configured: false });
  }

  try {
    const querySnapshot = await getDocs(collection(db, "template_stats"));
    const counts: Record<string, number> = {};
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (typeof data.count === "number") {
        counts[docSnap.id] = data.count;
      }
    });

    return NextResponse.json({ success: true, counts, configured: true });
  } catch (error: any) {
    console.warn("Firestore template stats fetch warning (check Firestore Rules):", error?.message || error);
    return NextResponse.json({ success: true, counts: {}, fallback: true, error: error?.message });
  }
}

export async function POST(req: Request) {
  try {
    const { templateId } = await req.json();
    if (!templateId || typeof templateId !== "string") {
      return NextResponse.json({ success: false, error: "Invalid templateId" }, { status: 400 });
    }

    if (!isFirebaseConfigured || !db) {
      return NextResponse.json({ success: true, configured: false, note: "Recorded locally (Firebase not configured yet)" });
    }

    const docRef = doc(db, "template_stats", templateId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        count: increment(1),
        lastUsedAt: new Date().toISOString(),
      });
    } else {
      await setDoc(docRef, {
        count: 1,
        templateId,
        createdAt: new Date().toISOString(),
        lastUsedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, templateId, configured: true });
  } catch (error: any) {
    console.warn("Firestore template stats update warning (check Firestore Rules):", error?.message || error);
    return NextResponse.json({ success: true, templateId: "local-fallback", fallback: true });
  }
}
