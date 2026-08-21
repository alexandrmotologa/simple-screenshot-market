# 🚀 Deployment Guide (Vercel & Firebase)

This guide covers deploying SnapFrame to **Vercel** and connecting optional cloud services like Firebase.

---

## 1. Deploying to Vercel

SnapFrame is optimized for zero-config deployment on Vercel.

### Step 1: Import Repository
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository (`snapframe.store`).
4. Framework Preset will automatically detect **Next.js**.

### Step 2: Configure Environment Variables
In the **Environment Variables** section of the Vercel project setup (or in **Project Settings → Environment Variables**), add your configuration:

```env
# AI Superpowers (Gemini & Groq provide 100% permanent free tiers)
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
XAI_API_KEY=your_xai_grok_key_here          # Optional (Grok 3 / Grok 2 Vision)
OPENAI_API_KEY=your_openai_api_key_here     # Optional (GPT-4o-mini)

# Firebase Client Configuration (NEXT_PUBLIC_ for browser SDK)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-...

# Firebase Admin Service Account (Server-side token verification & cloud sync)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-app-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Paddle Billing Configuration (v2)
NEXT_PUBLIC_PADDLE_ENV=sandbox               # "sandbox" or "production"
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_...
NEXT_PUBLIC_PADDLE_PRICE_MONTHLY=pri_...
NEXT_PUBLIC_PADDLE_PRICE_ANNUAL=pri_...
PADDLE_WEBHOOK_SECRET_KEY=ntfset_...
```

> **Note on `FIREBASE_PRIVATE_KEY`:** You can paste the multi-line private key directly into Vercel's environment variable value field.

### Step 3: Deploy
Click **"Deploy"**. Vercel will build and launch your production deployment in under 2 minutes.

---

## 2. Setting Up Free API Keys for AI

### Google Gemini (Recommended - Text & Vision)
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **"Get API Key"**.
3. Create a new key and paste it as `GEMINI_API_KEY`.
4. Free Tier supports 1,500 requests/day, multimodal screenshot vision, copy generation, and multi-language translation.

### Groq Cloud (Recommended - Ultra-fast Text & Vision)
1. Go to [Groq Console](https://console.groq.com/).
2. Generate a free API key and set it as `GROQ_API_KEY`.
3. Powers high-speed copywriting and fallback Vision analysis.

### Mistral AI (Localization & Vision)
1. Go to [Mistral Console](https://console.mistral.ai/).
2. Generate an API key and add it as `MISTRAL_API_KEY`.

### xAI Grok (Optional)
1. Go to [xAI Console](https://console.x.ai/).
2. Add your API key as `XAI_API_KEY`.

---

## 3. Local Production Build Testing

Before pushing to production, you can verify your build locally:

```bash
# Type checking
npx tsc --noEmit

# Production build
npm run build

# Start local production server
npm run start
```
