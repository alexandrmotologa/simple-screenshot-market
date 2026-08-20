"use client";

import { toast } from "@/lib/store/toastStore";

declare global {
  interface Window {
    Paddle?: any;
  }
}

// Configurable Paddle IDs (Can be overridden via environment variables)
export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "test_token",
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV || "sandbox") as "sandbox" | "production",
  prices: {
    monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY || "pri_monthly_snapframe_pro",
    annual: process.env.NEXT_PUBLIC_PADDLE_PRICE_ANNUAL || "pri_annual_snapframe_pro",
  },
};

let paddleInitialized = false;

/**
 * Ensures Paddle.js is loaded and initialized in the browser
 */
export async function initializePaddle(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (paddleInitialized && window.Paddle) {
    return true;
  }

  return new Promise((resolve) => {
    // If Paddle script is already loaded
    if (window.Paddle) {
      try {
        window.Paddle.Environment.set(PADDLE_CONFIG.environment);
        window.Paddle.Initialize({
          token: PADDLE_CONFIG.clientToken,
          eventCallback: (data: any) => {
            console.log("[Paddle Event]", data);
          },
        });
        paddleInitialized = true;
        resolve(true);
        return;
      } catch (e) {
        console.warn("Paddle init error:", e);
        resolve(false);
        return;
      }
    }

    // Load Paddle.js dynamically
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      try {
        if (window.Paddle) {
          window.Paddle.Environment.set(PADDLE_CONFIG.environment);
          window.Paddle.Initialize({
            token: PADDLE_CONFIG.clientToken,
            eventCallback: (data: any) => {
              console.log("[Paddle Event]", data);
            },
          });
          paddleInitialized = true;
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        console.warn("Paddle setup error:", err);
        resolve(false);
      }
    };
    script.onerror = () => {
      console.warn("Failed to load Paddle.js script");
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

export interface CheckoutOptions {
  plan: "monthly" | "annual";
  userEmail?: string | null;
  userId?: string | null;
  onSuccess?: () => void;
}

/**
 * Opens Paddle Checkout Overlay
 */
export async function openPaddleCheckout({
  plan,
  userEmail,
  userId,
  onSuccess,
}: CheckoutOptions) {
  const isLoaded = await initializePaddle();
  const priceId = plan === "annual" ? PADDLE_CONFIG.prices.annual : PADDLE_CONFIG.prices.monthly;

  if (!isLoaded || !window.Paddle || PADDLE_CONFIG.clientToken === "test_token") {
    // Development / Demo Simulation mode if Paddle keys are not yet configured in .env
    console.log("[Paddle] Simulated Checkout in Demo/Dev mode for:", { plan, priceId, userEmail, userId });
    toast.info(`Opening test checkout for SnapFrame Pro (${plan === "annual" ? "$144/year" : "$19/month"})...`);
    
    // Simulate successful checkout in dev mode after short delay
    setTimeout(() => {
      toast.success("🎉 Payment simulated successfully! Welcome to SnapFrame Pro.");
      onSuccess?.();
    }, 1200);
    return;
  }

  try {
    window.Paddle.Checkout.open({
      settings: {
        displayMode: "overlay",
        theme: "dark",
        locale: "en",
        successUrl: typeof window !== "undefined" ? `${window.location.origin}/projects?checkout=success` : undefined,
      },
      items: [
        {
          priceId,
          quantity: 1,
        },
      ],
      customer: userEmail ? { email: userEmail } : undefined,
      customData: {
        user_id: userId || "",
        user_email: userEmail || "",
        plan,
      },
    });
  } catch (err: any) {
    console.error("Paddle Checkout error:", err);
    toast.error("Failed to open payment checkout. Please try again or contact support.");
  }
}
