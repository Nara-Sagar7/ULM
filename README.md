# ULM - Ultimate Mechanics Website
Premium Automotive Service & Inspection - Hafeezpet, Hyderabad
Built with Next.js 16, React 19, Three.js, Framer Motion, Tailwind CSS

## Live Features
- 3D Inspection (Engineered Exploded View) - scroll + ASSEMBLE/DISASSEMBLE slider, dark theme, WebGL fallback
- Interactive 8-Zone Inspection (ENGINE/BRAKES/SUSPENSION etc.) with per-zone camera
- Real workshop gallery (10 GBP photos from Google Maps, Places API 2026-09-19)
- Services with local images (no broken Unsplash), Workshop, Reviews, Location, Booking

## Tech Stack
- Next.js 16.3.5 (Turbopack), React 19.2.8, Three.js 0.186, @react-three/fiber 9.7, @react-three/drei 10.7, Framer Motion 13, Tailwind 4
- 3D: public/models/car-draco.glb (5.8MB) + public/textures/hdri-studio.hdr (1.6MB), procedural fallback PremiumCar for explode
- Images: public/gallery + public/images/workshop (local, unoptimized)

## Getting Started
```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
```

## Deploy
Vercel or any Node 20+ host. Set NEXT_PUBLIC_SITE_URL and GOOGLE_MAPS_API_KEY in .env.local (see .env.local example, not committed).

## Original ULM Docs
See C:\Users\sagar\Desktop\ULM\ for BUSINESS_COLLECTED.json, BUILD_PLAN.md etc. (local only, not pushed).

