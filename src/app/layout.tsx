import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapFrame — App Store Screenshot Generator",
  description:
    "Create stunning App Store and Google Play screenshots in minutes. Free online screenshot generator with device mockups, templates, and custom designs.",
  keywords: [
    "app store screenshots",
    "google play screenshots",
    "screenshot generator",
    "app mockup",
    "device frame",
    "ios screenshots",
    "android screenshots",
  ],
  openGraph: {
    title: "SnapFrame — App Store Screenshot Generator",
    description:
      "Create stunning App Store and Google Play screenshots in minutes.",
    type: "website",
    url: "https://snapframe.store",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
