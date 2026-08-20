"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  FileText,
  Lock,
  Globe,
  Film,
  Crown,
  Layers,
  Smartphone,
  Cpu,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { SnapFrameLogo } from "@/components/ui/SnapFrameLogo";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40 dark:bg-card/20 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-border/40">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group w-fit"
            >
              <SnapFrameLogo size={30} withText textClassName="text-lg" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Studio-grade App Store &amp; Google Play screenshot creator. Powered by AI Auto-Pilot, 3D device mockups, and seamless multi-language translation.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/80 border border-border/50 text-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/80 border border-border/50 text-foreground">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Instant 4K Export
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* AI & Creation Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-primary" />
              AI Studio
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  AI Vision Auto-Pilot
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-sky-400" />
                  40+ Languages i18n
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-purple-400" />
                  3D Pop-Out Cutout
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Film className="w-3 h-3 text-pink-400" />
                  Video &amp; GIF Exporter
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  AI ASO Metadata Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Sizes & Templates Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-primary" />
              Formats &amp; Sizes
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  iPhone 6.9&quot; (16 Pro Max)
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  iPhone 6.7&quot; &amp; 6.5&quot; Displays
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Android Phone (1080×2400)
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  iPad Pro 13&quot; &amp; 11&quot;
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Continuous Panorama Flow
                </Link>
              </li>
            </ul>
          </div>

          {/* Plans & Pricing Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Plans &amp; Pricing
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors font-medium text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-primary" />
                  Pricing Plans ($9/mo)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <span>SnapFrame Pro Annual</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400">Save 36%</span>
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  14-Day Money-Back
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Free Starter (3 AI Credits)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Open Source Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary" />
              Trust &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/terms" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <FileText className="w-3 h-3 text-primary/80" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Lock className="w-3 h-3 text-primary/80" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/alexandrmotologa/simple-screenshot-market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <GithubIcon className="w-3 h-3" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Merchant of Record and Payment Trust */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>© {currentYear} SnapFrame.</p>
            <span className="hidden sm:inline text-border">•</span>
            <p className="flex items-center gap-1 text-[11px]">
              <CreditCard className="w-3.5 h-3.5 text-primary/80" />
              Our order process is conducted by our online reseller <strong>Paddle.com</strong> (Merchant of Record).
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <Link href="/pricing" className="hover:text-foreground transition-colors">
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
