# Nativeframe MVP

A mobile-first Next.js MVP for creating TikTok, Instagram and X visual mockups entirely in the browser.

## Included

- Premium landing page
- Motion micro-interactions
- GSAP + ScrollTrigger reveals
- Local React Bits-style Spotlight Card source component
- TikTok / Instagram / X template studio
- Text + fake engagement controls
- Local image upload + zoom
- PNG export with `modern-screenshot`
- Google Identity Services button ready through `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- No image-generation API and no backend required for the visual workflow

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Google OAuth

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
```

For Google Cloud, configure your OAuth Web Client's Authorized JavaScript origins, for example:

- `http://localhost:3000`
- your future Vercel production URL

The current MVP keeps the decoded Google profile locally in the browser only. Because there is deliberately no database yet, this is not persistent lead storage. Add a real auth/data layer when validation warrants it.

## Product scope

The first product surface is social templates, not clothing mockups. The editor currently focuses on believable social preview graphics for TikTok, Instagram and X, with fast local export.
