"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Heart, FileText, Lock } from "lucide-react";
import { SnapFrameLogo } from "@/components/ui/SnapFrameLogo";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40 dark:bg-card/20 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-border/40">
          {/* Brand Col */}
          <div className="space-y-3.5 sm:col-span-2 md:col-span-2">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group w-fit"
            >
              <SnapFrameLogo size={28} withText textClassName="text-base" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Design studio-quality App Store & Google Play screenshot sets in seconds. Privacy-first, cloud-synced, and built with modern device mockups.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground font-medium">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 text-foreground">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 text-foreground">
                <Zap className="w-3 h-3 text-amber-500" />
                Instant 4K Export
              </span>
            </div>
          </div>

          {/* Features Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Features</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-default">Curated App Templates</li>
              <li className="hover:text-foreground transition-colors cursor-default">Continuous Panorama Flow</li>
              <li className="hover:text-foreground transition-colors cursor-default">3D Device Mockups</li>
              <li className="hover:text-foreground transition-colors cursor-default">Multi-Language i18n</li>
              <li className="hover:text-foreground transition-colors cursor-default">Instant ZIP & PNG Export</li>
            </ul>
          </div>

          {/* Supported Platforms Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Supported Sizes</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-default">iPhone 6.9&quot; (16 Pro Max)</li>
              <li className="hover:text-foreground transition-colors cursor-default">iPhone 6.7&quot; & 6.5&quot; Displays</li>
              <li className="hover:text-foreground transition-colors cursor-default">Android Phone (1080×2400)</li>
              <li className="hover:text-foreground transition-colors cursor-default">iPad Pro 13&quot; & 11&quot;</li>
              <li className="hover:text-foreground transition-colors cursor-default">Custom Dimensions</li>
            </ul>
          </div>

          {/* Legal & Pricing */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Plans &amp; Legal</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium text-foreground"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Pricing &amp; Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/refunds"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-primary/80" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-primary/80" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/alexandrmotologa/simple-screenshot-market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            © {currentYear} SnapFrame. Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for mobile app makers. Resold by <strong>Paddle.com</strong>.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/pricing" className="hover:text-foreground transition-colors font-medium">
              Pricing
            </Link>
            <span className="w-1 h-1 rounded-full bg-border" />
            <Link href="/refunds" className="hover:text-foreground transition-colors">
              Refunds
            </Link>
            <span className="w-1 h-1 rounded-full bg-border" />
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="w-1 h-1 rounded-full bg-border" />
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
