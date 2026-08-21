import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }, 300000);
}

export interface RateLimitOptions {
  limit: number; // max requests per window
  windowMs: number; // window size in milliseconds
  keyPrefix?: string;
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown-ip";
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions = { limit: 30, windowMs: 60000, keyPrefix: "rl" }
): {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const prefix = options.keyPrefix || "rl";
  const storeKey = `${prefix}:${key}`;
  const record = rateLimitStore.get(storeKey);

  if (!record || record.resetAt <= now) {
    // New or expired window
    rateLimitStore.set(storeKey, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return {
      success: true,
      limit: options.limit,
      remaining: options.limit - 1,
      resetAt: now + options.windowMs,
    };
  }

  if (record.count >= options.limit) {
    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: options.limit,
    remaining: options.limit - record.count,
    resetAt: record.resetAt,
  };
}
