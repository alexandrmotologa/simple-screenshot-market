# 📸 SnapFrame — App Store & Google Play Screenshot Studio

> **SnapFrame** is an ultra-fast, professional, and open-source screenshot generator for mobile apps. Create stunning, high-converting App Store (iOS & iPadOS) and Google Play (Phone & Android Tablet) screenshot presentations in seconds with built-in AI Superpowers, panoramic multi-screen backgrounds, official vector device frames, and full Fastlane metadata export.

---

## ✨ Key Features

### 🤖 AI Superpowers Suite (Multi-Provider Engine)
- **✨ 1-Click Project Auto-Pilot:** Powered by AI Vision (`gemini-1.5-flash` / `gpt-4o-mini`). Analyzes your app screenshots and automatically populates high-converting headlines, benefit subtitles, and panoramic matching color gradients across all screens in 1 click.
- **📈 AI Store Listing & ASO Generator:** Generates full, compliant App Store and Google Play metadata in any target language with strict store character limit enforcement:
  - *iOS:* App Name (≤ 30c), Subtitle (≤ 30c), Promotional Text (≤ 170c), Keywords Bank (≤ 100c), Description & What's New.
  - *Android:* App Title (≤ 30c), Short Description (≤ 80c), Full Description & What's New.
- **🪄 AI Copywriter & Tone Switcher:** Instant tone adaptations (🚀 *High Energy*, ✨ *Minimalist*, 🎯 *Benefit-Driven*, 🔥 *FOMO / Social Proof*, 💼 *B2B Enterprise*), auto-shorten under 30 characters, and 5 alternative headline suggestions.
- **🎨 AI Magic Theme Matcher:** 1-click curated and generated App Store color palettes (*OLED Midnight*, *Clean Cupertino*, *Vibrant Sunset*, *Cyber Neon*, *Pastel Aurora*, *Emerald Matrix*).
- **🧼 Smart Clean Status Bar:** Automatically overlays a crisp vector status bar (9:41 AM, 100% battery, 5G, 4 signal bars) with light/dark theme toggle, ensuring 100% compliance with Apple Store guidelines.
- **🌍 Native Cultural Localization:** Contextual, idiom-aware marketing translations across 20+ languages with strict length constraints.

---

### 📱 Multi-Platform & Tablet Support
- **Apple iOS & iPadOS:** iPhone 17 Pro, 16 Pro, 15 Pro, 14, and iPad Pro 13" (2048 × 2732 px).
- **Google Play & Android Tablets:** Google Pixel 10 Pro, 9 Pro, Samsung Galaxy S25 Ultra, S24 Ultra, Samsung Galaxy Tab S9 Ultra, Galaxy Tab S7, and Galaxy Tab A.
- **Official Color Finishes:** Authentic HEX colors including *Natural Titanium*, *Desert Titanium*, *Obsidian*, *Porcelain*, *Titanium Gray*, *Ultramarine*, and more.
- **Proportional Scaling:** Adding a phone or tablet set automatically adapts and scales existing project templates proportionally.

---

### 🎨 Design & Canvas Capabilities
- **Continuous Panoramic Flow:** Connect seamless backgrounds, waves, gradients, or custom uploaded ultra-wide panoramas across multiple screens.
- **30+ Drag-and-Drop Block Elements:** Dynamic Islands, Live Activity workouts, iOS Toggle switches, Push Notification banners, Editors' Choice laurels, 30-Day Guarantee seals, Growth stats (+142%), and Before/After comparison cards.
- **20+ Google Fonts:** Inter, Montserrat, Poppins, Outfit, Space Grotesk, Syne, Playfair Display, and more.
- **Lossless 2D Canvas Engine:** 100% visual parity between the real-time editor, Live Store Simulator, PNG clipboard copy, and production 4K ZIP export.

---

### 📦 Pro Export Suite & Store Submission
- **Structured Multi-Platform ZIP:** Dedicated non-colliding folders:
  - `App Store (iPhone)/`
  - `App Store (iPad)/`
  - `Google Play (Phone)/`
  - `Google Play (Tablet)/`
- **Fastlane & App Store Connect Package:** Structured text files (`name.txt`, `subtitle.txt`, `description.txt`, `keywords.txt`, etc.) and `store_listing.json`.
- **Live Store Simulator:** Interactive Apple App Store and Google Play preview with device switching and instant multi-language preview.
- **GIF Animator:** Export animated showcase GIFs of your screenshot sets.
- **1-Click 4K PNG Clipboard Copy:** Instantly copy active screens to clipboard for Figma, Slack, or Notion.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) with undo/redo history stack & local persistence
- **Canvas Rendering:** Native HTML5 Canvas 2D with high-DPI supersampling
- **Export & Compression:** [JSZip](https://stuk.github.io/jszip/) & FileSaver
- **AI Backend:** Universal failover engine supporting Google Gemini, OpenAI, Groq, and Mistral

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/alexandrmotologa/simple-screenshot-market.git
cd simple-screenshot-market
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your desired API keys (only 1 AI key is needed by default):
```env
# Google Gemini (Recommended for Vision + Fast Text)
GEMINI_API_KEY=your_gemini_api_key_here

# Or OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration (Optional, for Cloud Saves & Admin)
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
simple-screenshot-market/
├── docs/                      # Comprehensive technical documentation
│   ├── ARCHITECTURE.md        # State management, canvas engine & layer pipeline
│   ├── AI_SUPERPOWERS.md      # AI multi-provider failover, Vision & ASO copilot
│   ├── DEVICES_AND_CANVAS.md  # Device matrix, vector frames, and tablet support
│   ├── EXPORT_AND_ASO.md      # Fastlane, store submission guidelines & ZIP builder
│   └── DEPLOYMENT.md          # Vercel & Firebase deployment guide
├── public/                    # Static assets, device mockups & fonts
│   └── mockups/               # SVG & PNG vector device frames
├── src/
│   ├── app/                   # Next.js App Router (pages & API routes)
│   │   ├── api/
│   │   │   └── ai/            # AI endpoints (vision-screens, copywriter, store-listing, translate, palette)
│   │   ├── editor/[projectId]/# Main interactive studio page
│   │   └── page.tsx           # Projects dashboard & template catalog
│   ├── components/
│   │   ├── editor/            # Canvas, toolbar, timeline, filmstrip & modals
│   │   │   ├── panels/        # Sidebar panels (Text, Background, Platforms, Blocks, StoreListing, Localization, etc.)
│   │   │   ├── AIAutoPilotModal.tsx
│   │   │   ├── ExportModal.tsx
│   │   │   └── StorePreviewModal.tsx
│   │   └── ui/                # UI primitives (buttons, dropdowns, inputs, dialogs)
│   └── lib/
│       ├── ai/                # Unified server-side AI provider service
│       ├── devices.ts         # Device database (iPhone, iPad, Pixel, Galaxy, Tabs)
│       ├── renderScreenToCanvas.ts # Universal 4K Canvas 2D rendering engine
│       ├── store/             # Zustand stores (editorStore, projectStore, languageStore)
│       └── types.ts           # Core TypeScript types & layer schemas
├── .env.example               # Environment variables template
└── package.json
```

---

## 📖 Documentation Index

For in-depth documentation, please explore the [`docs/`](./docs/) directory:
- [Technical Architecture & State Model](./docs/ARCHITECTURE.md)
- [AI Superpowers & Prompt Engine](./docs/AI_SUPERPOWERS.md)
- [Devices, Tablets & Vector Frames](./docs/DEVICES_AND_CANVAS.md)
- [Export Suite & ASO Metadata Guide](./docs/EXPORT_AND_ASO.md)
- [Deployment on Vercel & Firebase](./docs/DEPLOYMENT.md)

---

## 📄 License

This project is open-source under the MIT License. Feel free to use, modify, and build upon it!
