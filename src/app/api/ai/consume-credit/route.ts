import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAdminConfigured, FieldValue } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, feature } = body;

    if (!uid) {
      return NextResponse.json(
        { allowed: false, message: "Missing uid parameter" },
        { status: 400 }
      );
    }

    // If Firebase Admin is not configured, simulate local dev
    if (!isAdminConfigured || !adminDb) {
      return NextResponse.json({
        allowed: true,
        isPro: false,
        remaining: 3,
        warning: "Admin SDK not configured, simulated credit deduction",
      });
    }

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Create user with 3 free credits and consume 1
      await userRef.set({
        uid,
        isPro: false,
        plan: null,
        subscriptionStatus: null,
        aiCredits: 2,
        usedAiCredits: 1,
        createdAt: Date.now(),
        lastAiUsedAt: Date.now(),
        lastAiFeature: feature || "general",
      });

      return NextResponse.json({
        allowed: true,
        isPro: false,
        remaining: 2,
        used: 1,
      });
    }

    const data = userDoc.data() || {};

    // 1. Pro users have unlimited AI
    if (data.isPro) {
      await userRef.update({
        lastAiUsedAt: Date.now(),
        lastAiFeature: feature || "general",
        usedAiCredits: FieldValue.increment(1),
      });

      // Append to credit logs subcollection
      try {
        await userRef.collection("credit_logs").add({
          feature: feature || "AI Vision Auto-Pilot",
          timestamp: Date.now(),
          cost: 0,
          isPro: true,
          remaining: 9999,
          status: "completed",
        });
      } catch (logErr) {
        console.warn("[ConsumeCredit] Failed to record credit log:", logErr);
      }

      return NextResponse.json({
        allowed: true,
        isPro: true,
        remaining: 9999,
        used: (data.usedAiCredits || 0) + 1,
      });
    }

    // 2. Free users check remaining credits
    const currentCredits = typeof data.aiCredits === "number" ? data.aiCredits : 3;

    if (currentCredits <= 0) {
      return NextResponse.json({
        allowed: false,
        isPro: false,
        remaining: 0,
        used: data.usedAiCredits || 3,
        reason: "credits_exhausted",
        message: "You have used all your free AI credits. Upgrade to Pro for unlimited AI generations.",
      });
    }

    // Deduct 1 credit
    await userRef.update({
      aiCredits: FieldValue.increment(-1),
      usedAiCredits: FieldValue.increment(1),
      lastAiUsedAt: Date.now(),
      lastAiFeature: feature || "general",
    });

    const remaining = currentCredits - 1;

    // Append to credit logs subcollection
    try {
      await userRef.collection("credit_logs").add({
        feature: feature || "AI Vision Auto-Pilot",
        timestamp: Date.now(),
        cost: 1,
        isPro: false,
        remaining,
        status: "completed",
      });
    } catch (logErr) {
      console.warn("[ConsumeCredit] Failed to record credit log:", logErr);
    }

    return NextResponse.json({
      allowed: true,
      isPro: false,
      remaining,
      used: (data.usedAiCredits || 0) + 1,
    });
  } catch (error: any) {
    console.error("[ConsumeCredit API] Error:", error);
    return NextResponse.json(
      { allowed: true, error: error.message || "Failed to consume credit" },
      { status: 200 }
    );
  }
}
