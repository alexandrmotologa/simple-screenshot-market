import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAdminConfigured } from "@/lib/firebaseAdmin";

export interface CreditLogEntry {
  id: string;
  feature: string;
  timestamp: number;
  cost: number;
  remaining: number;
  isPro: boolean;
  status: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "Missing uid parameter" }, { status: 400 });
    }

    // Default response when running in local dev / without Admin SDK
    if (!isAdminConfigured || !adminDb) {
      return NextResponse.json({
        user: {
          uid,
          isPro: false,
          plan: "free",
          subscriptionStatus: "active",
          aiCredits: 3,
          usedAiCredits: 0,
          createdAt: Date.now() - 86400000 * 5,
        },
        creditLogs: [
          {
            id: "log_welcome",
            feature: "Free Welcome Bonus Credits",
            timestamp: Date.now() - 86400000 * 5,
            cost: -3,
            remaining: 3,
            isPro: false,
            status: "credited",
          },
        ],
        transactions: [],
        paddlePortalUrl: "https://paddle.net",
      });
    }

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({
        user: {
          uid,
          isPro: false,
          plan: "free",
          subscriptionStatus: "active",
          aiCredits: 3,
          usedAiCredits: 0,
          createdAt: Date.now(),
        },
        creditLogs: [],
        transactions: [],
        paddlePortalUrl: "https://paddle.net",
      });
    }

    const userData = userDoc.data() || {};

    // Fetch latest 50 credit spending logs
    let creditLogs: CreditLogEntry[] = [];
    try {
      const logsSnap = await userRef
        .collection("credit_logs")
        .orderBy("timestamp", "desc")
        .limit(50)
        .get();

      creditLogs = logsSnap.docs.map((doc) => ({
        id: doc.id,
        feature: doc.data().feature || "AI Generation",
        timestamp: doc.data().timestamp || Date.now(),
        cost: doc.data().cost ?? 1,
        remaining: doc.data().remaining ?? 0,
        isPro: Boolean(doc.data().isPro),
        status: doc.data().status || "completed",
      }));
    } catch (e) {
      console.warn("[Billing API] Failed to query credit_logs:", e);
    }

    // Fetch transactions / invoices if recorded
    let transactions: any[] = [];
    try {
      const txSnap = await userRef
        .collection("transactions")
        .orderBy("timestamp", "desc")
        .limit(20)
        .get();

      transactions = txSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (e) {
      // Subcollection might be empty
    }

    // Determine Paddle customer portal link
    // Paddle provides self-serve buyer receipt / card management at paddle.net
    const paddlePortalUrl = "https://paddle.net";

    return NextResponse.json({
      user: {
        uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        isPro: Boolean(userData.isPro),
        plan: userData.plan || (userData.isPro ? "pro-monthly" : "free"),
        subscriptionStatus: userData.subscriptionStatus || (userData.isPro ? "active" : "free"),
        paddleCustomerId: userData.paddleCustomerId || null,
        paddleSubscriptionId: userData.paddleSubscriptionId || null,
        createdAt: userData.createdAt || Date.now(),
        aiCredits: typeof userData.aiCredits === "number" ? userData.aiCredits : 3,
        usedAiCredits: typeof userData.usedAiCredits === "number" ? userData.usedAiCredits : 0,
        canceledAt: userData.canceledAt || null,
        cancelReason: userData.cancelReason || null,
      },
      creditLogs,
      transactions,
      paddlePortalUrl,
    });
  } catch (error: any) {
    console.error("[Billing API] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch billing details" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, action, reason } = body;

    if (!uid) {
      return NextResponse.json({ error: "Missing uid parameter" }, { status: 400 });
    }

    if (action === "cancel_subscription") {
      if (isAdminConfigured && adminDb) {
        const userRef = adminDb.collection("users").doc(uid);
        await userRef.set(
          {
            subscriptionStatus: "canceled",
            isPro: false,
            canceledAt: Date.now(),
            cancelReason: reason || "User requested cancellation via account dashboard",
            updatedAt: Date.now(),
          },
          { merge: true }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your subscription has been canceled. You retain access until the end of your billing period.",
        paddlePortalUrl: "https://paddle.net",
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("[Billing API] POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process billing request" },
      { status: 500 }
    );
  }
}
