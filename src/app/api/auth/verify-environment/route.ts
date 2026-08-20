import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAdminConfigured } from "@/lib/firebaseAdmin";
import { getEnvironmentLabel } from "@/lib/authEnvironment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email, displayName, photoURL, environment } = body;

    if (!uid || !environment) {
      return NextResponse.json(
        { allowed: false, message: "Missing required fields (uid, environment)." },
        { status: 400 }
      );
    }

    // If Firebase Admin is not configured (e.g. local without service account), pass through to client verification
    if (!isAdminConfigured || !adminDb) {
      return NextResponse.json({
        allowed: true,
        registeredEnvironment: environment,
        warning: "Admin SDK not configured, validated on client",
      });
    }

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const data = userDoc.data() || {};
      const registeredEnv = data.registeredEnvironment;

      if (registeredEnv && registeredEnv !== environment) {
        return NextResponse.json({
          allowed: false,
          registeredEnvironment: registeredEnv,
          message: `This account was registered on ${getEnvironmentLabel(
            registeredEnv
          )} and cannot be used on ${getEnvironmentLabel(
            environment
          )}. Please log in from the authorized environment.`,
        });
      }

      // Update login timestamps and environment
      await userRef.set(
        {
          registeredEnvironment: registeredEnv || environment,
          lastLoginAt: Date.now(),
          lastLoginEnvironment: environment,
        },
        { merge: true }
      );

      return NextResponse.json({
        allowed: true,
        registeredEnvironment: registeredEnv || environment,
        isPro: Boolean(data.isPro),
        plan: data.plan || null,
        subscriptionStatus: data.subscriptionStatus || null,
        aiCredits: typeof data.aiCredits === "number" ? data.aiCredits : 3,
        usedAiCredits: typeof data.usedAiCredits === "number" ? data.usedAiCredits : 0,
      });
    }

    // User doc does not exist yet (First time registration)
    // Check if another user document with the same email already exists on a different environment
    if (email) {
      const existingQuery = await adminDb
        .collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();

      if (!existingQuery.empty) {
        const existingData = existingQuery.docs[0].data();
        if (
          existingData.registeredEnvironment &&
          existingData.registeredEnvironment !== environment
        ) {
          return NextResponse.json({
            allowed: false,
            registeredEnvironment: existingData.registeredEnvironment,
            message: `An account with email ${email} is already registered on ${getEnvironmentLabel(
              existingData.registeredEnvironment
            )} and cannot be used on ${getEnvironmentLabel(
              environment
            )}.`,
          });
        }
      }
    }

    // Save new user profile with registered environment and 3 free AI welcome credits
    await userRef.set({
      uid,
      email: email || null,
      displayName: displayName || null,
      photoURL: photoURL || null,
      registeredEnvironment: environment,
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      lastLoginEnvironment: environment,
      isPro: false,
      plan: null,
      subscriptionStatus: null,
      aiCredits: 3, // 3 free welcome credits
      usedAiCredits: 0,
    });

    return NextResponse.json({
      allowed: true,
      registeredEnvironment: environment,
      isPro: false,
      plan: null,
      subscriptionStatus: null,
      aiCredits: 3,
      usedAiCredits: 0,
    });
  } catch (error: any) {
    console.error("[VerifyEnvironment API] Error:", error);
    return NextResponse.json(
      { allowed: true, error: error.message || "Internal server error" },
      { status: 200 }
    );
  }
}
