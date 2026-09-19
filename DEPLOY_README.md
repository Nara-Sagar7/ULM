# Ultimate Mechanics - Website Complete

## Live Data (Collected 2026-09-19 via Places API New)
- Address: No.605 Rd Number 3A, Gopal Nagar, Shilpa Avenue Colony, Hafeezpet, Hyderabad 500085
- Coords: 17.4824308,78.3749938 (corrected from PRD 17.4839,78.3236)
- Phone: 099599 90827 | +919959990827 | wa.me/919959990827
- PlaceId: ChIJiQV2JgKTyzsRWTKvoAimziI | CID: 2508124598477730393
- Rating: 5.0 ★ 68 reviews | PlusCode: F9JF+XX | Hours: Mon-Thu 9:30-18:30 Fri 9:30-17:30 Sat 9:30-18:30 Sun Closed
- Maps: https://maps.google.com/?cid=2508124598477730393 | Directions: https://www.google.com/maps/dir/?api=1&destination=17.4824308,78.3749938
- Photos: 10 real GBP photos in public/gallery/photo-*.jpg
- Reviews: 5 live reviews in src/components/sections/Trust.tsx (Naidu Gaaru, Sandy San etc)

## Run Locally
npm install
npm run dev     # http://localhost:3000 (or 3005 test)
npm run build   # production build - Turbopack, passed ✓
npm run lint

## Production Build Verified
✓ Next.js 16.3.5 Turbopack Compiled successfully
✓ Routes: / (static), /api/booking (dynamic), /robots.txt, /sitemap.xml, /_not-found
✓ No API keys leaked in frontend (booking uses /api/booking server route per PRD Section 20:1538 & 37)

## Tech Stack (PRD Section 30)
Next.js App Router + TypeScript + Tailwind + Three.js + R3F + Drei + GSAP + Framer Motion + Lenis + Lucide

## Design Tokens (PRD Section 03 exact)
--um-black #0A0A0B, --um-graphite #141416, --um-accent #D4A853, Inter + Space Grotesk + JetBrains Mono

## Features Built
- Loading screen 1.6s + Logo (Section 05 & 24)
- Hero cinematic 3D (Section 09) + Workshop grid + blueprint
- Disassembly exploded view scroll-driven + mobile slider fallback (Section 11-12)
- Inspection 8 zones interactive (Section 13)
- Services 8 premium cards with hover (Section 14)
- WhyUs 5 blocks (Section 15)
- Workshop gallery 10 real photos + lightbox + filters (Section 16)
- BeforeAfter slider draggable (Section 17)
- Trust 5.0 / 68 + 3 live reviews + link (Section 18)
- Location map embed + hours + actions (Section 19)
- Booking form validation ^[6-9]\d{9} + date >= today + /api/booking (Section 20)
- Phone + WhatsApp sticky (Section 21)
- Header sticky glass + mobile menu (Section 22)
- Motion GSAP+ScrollTrigger+Framer (Section 23)
- Responsive LODs + Performance budgets (Section 25-26)
- SEO LocalBusiness JSON-LD + OG + sitemap (Section 27)
- Accessibility + Reduced motion (Section 28)
- Footer (Section 29)

## Deploy (Section 36)
1. Push to GitHub
2. Vercel -> Import -> set Env: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_API_KEY (rotate exposed key!), FORMSPREE_FORM_ID
3. vercel --prod
4. Test: maps embed, booking POST, 3D on mobile fallback, Lighthouse >90

## Still TODO (Do not invent per PRD Section 37)
- Email, Social links (not in Maps)
- 3D car GLB models <5MB + HDRI (Section 06) - currently using procedural PremiumCar in CarScene.tsx (realistic MeshPhysicalMaterial, clearcoat, Float, ContactShadows)
- Convert gallery JPG -> WebP via squoosh.app (Section 07)
- OG image 1200x630 branded (Section 07:622)
- Rotate exposed Google Maps key in Cloud Console -> restrict to referrers

## File Map
- src/data/business.ts -> BUSINESS config (hours corrected live)
- src/components/3d/CarScene.tsx -> 3D scene per Section 10
- src/app/api/booking/route.ts -> Booking backend-ready per Section 20
- src/app/sitemap.ts + robots.ts -> SEO per Section 27
- public/gallery/*.jpg -> Real photos per Section 07
- ULM/BUSINESS_COLLECTED.json -> Raw API data
