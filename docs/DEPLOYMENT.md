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
# AI Superpowers (At least 1 required for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
# or
OPENAI_API_KEY=your_openai_api_key_here

# Firebase Client Configuration (Optional)
FIREBASE_API_KEY=AIzaSy...
FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
FIREBASE_PROJECT_ID=your-app-id
FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=1234567890
FIREBASE_APP_ID=1:1234567890:web:...
FIREBASE_MEASUREMENT_ID=G-...

# Firebase Admin (Optional, for Server-side Cloud Storage)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-app-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Figma Import (Optional)
FIGMA_TOKEN=figd_...
```

> **Note on `FIREBASE_PRIVATE_KEY`:** You can paste the multi-line private key directly into Vercel's environment variable value field.

### Step 3: Deploy
Click **"Deploy"**. Vercel will build and launch your production deployment in under 2 minutes.

---

## 2. Setting Up Free API Keys for AI

### Google Gemini (Recommended)
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **"Get API Key"**.
3. Create a new key and paste it as `GEMINI_API_KEY`.
4. Provides a generous Free Tier supporting Vision analysis, copy generation, and multi-language translation.

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com/api-keys).
2. Generate a new secret key and add it as `OPENAI_API_KEY`.
3. Used with `gpt-4o-mini` for ultra-low token cost and rapid response times.

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
