# ULM V2 - Build Plan & PRD Gap Analysis

## Simple 10-Line Summary
1. **PRD is excellent & production-ready** (`ULM V2.txt:1` - 38 sections, all code + design tokens given) - luxury 3D workshop, not generic garage.
2. **Google Maps data NOW collected live** (`google maps.txt:1` -> `BUSINESS_COLLECTED.json:1`) via Places API (New) - hours, phone, rating, 10 photos, 5 reviews.
3. **Correct data verified:** Address `No.605 Rd 3A Gopal Nagar Hafeezpet 500085`, Phone `09959990827`, Coords `17.4824308,78.3749938`, Rating `5.0*68`, Hours `Mon-Thu 9:30-18:30 Fri 9:30-17:30 Sat 9:30-18:30 Sun Closed`.
4. **PRD error FIXED:** `Section 27:1928` coords `17.4839,78.3236` were ~5km wrong - now corrected.
5. **API key answer:** One-time use is enough for static embed (`NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`). Live sync needs key every time in Vercel (`GOOGLE_MAPS_API_KEY` server-only).
6. **Week 1 - Setup:** `Next.js 14 App Router + TS + Tailwind` + create `/lib/config.ts` from `lib-config-ready.ts:1` + `.env.local:1` + дизайн tokens `Section 03:127`, fonts `Section 04:238`, logo `Section 05:332`.
7. **Week 2 - Core 3D:** Hero cinematic `Section 09:712`, Disassembly exploded `Section 11:1078`, Reassembly `Section 12:1187`, Inspection `Section 13:1221` with `three@0.170 + @react-three/fiber + drei + gsap + framer-motion` `Section 10:793`.
8. **Week 3 - Sections:** Services `Section 14:1312` (8 cards), Why Us, Workshop Gallery (use `collected-photos/` + compress to WebP), Before/After `Section 17:1408`, Trust 5.0, Location `Section 19:1456` (embed `pb` + directions), Booking `Section 20:1495` (validation `^[6-9]\d{9}$`).
9. **Week 4 - Polish & Deploy:** Responsive fallbacks `Section 25:1742` (LOD0 80k <5MB, LOD1 40k, LOD2 15k, image fallback), performance `Section 26:1788` (<1.5s FCP, <300KB JS, >90 Lighthouse), SEO `Section 27:1908` (AutomotiveBusiness JSON-LD), deploy `Section 36:2345` to Vercel.
10. **Still MISSING (need owner input - do not invent per Section 01:88):** Email, social links, confirmed service list (8), booking backend choice (Formspree/SendGrid), domain, OG image `1200x630`, 3D model GLB `<5MB` + HDRI/ambientCG textures. **PRD is 95% complete - fill those 7 items and build immediately.**

---

## Detailed Build Order

### Phase 0 - Data Collection (DONE 2026-09-19)
- [x] Enable Places API (New) in `project 494749699114`
- [x] Run `node fetch-gmaps.js` -> verified placeId `ChIJiQV2JgKTyzsRWTKvoAimziI`, CID `2508124598477730393`
- [x] Extract hours, rating, address, phone, plusCode, 10 photos (`collected-photos/photo-1..10.jpg`), 5 reviews
- [x] Save to `BUSINESS_COLLECTED.json`, `lib-config-ready.ts`, `C:\Users\sagar\AppData\Local\Temp\opencode\ulm-*`
- [x] Correct PRD Section 27 coords
- [x] Generate `GOOGLE_MAPS_SETUP.md` + `.env.local` + `.gitignore`
- TODO: Rotate exposed key `AIza...psko` and restrict to HTTP referrers

### Phase 1 - Project Scaffold (Day 1-2)
```
npx create-next-app@latest ultimate-mechanics --typescript --tailwind --app
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @gsap/react framer-motion maath lucide-react
npm install -D @types/three gltf-transform
```
- Copy `lib-config-ready.ts` -> `lib/config.ts`
- Copy `.env.local`
- Implement `tailwind.config.ts:178` colors + `app/layout.tsx:256` fonts (Space Grotesk, Inter, JetBrains Mono) + `Section 03` CSS vars
- Create file structure `Section 31:2058`

### Phase 2 - Design System (Day 3-4)
- Logo: render `Section 05:333` SVG (primary, compact, mono, favicon 180x180)
- UI kit: `Button.tsx`, `Card.tsx` (glassmorphism), `Badge.tsx`, `SectionHeading.tsx`, `PhoneCTA.tsx`, `WhatsAppButton.tsx` (wa.me/919959990827)
- Motion: `PageLoader.tsx:1695` (1.5s ring), `SectionReveal.tsx:1624`, `LightSweep`, `Counter`
- Nav: `Navbar.tsx` sticky `bg-um-glass backdrop-blur-xl` `Section 22:1573`

### Phase 3 - 3D Automotive Experience (Day 5-12) - CORE FEATURE per Section 37
- `SceneCanvas.tsx:828` wrapper `dpr [1,1.5]`
- `HeroScene.tsx:943` with `WorkshopEnvironment` (rectAreaLight, plane 30x30, gridHelper), `HeroCamera` GSAP timeline 8s orbit, `ContactShadows`, `Bloom+Vignette`
- Download car model: Sketchfab searchable `Section 06:411` -> Draco compress `gltf-transform draco` -> verify <80k polys <5MB -> create LODs
- `CarModel.tsx:868` with `explosionOffsets` + `PerformanceMonitor.tsx:1044` auto LOD switch
- `DisassemblyScene.tsx:1102` scrollTrigger scrub 0-0.7 explode, 0.7-0.85 labels, 0.85-1 reassemble
- `InspectionScene.tsx` 8 zones `Section 13:1241` with `InspectionHotspot.tsx` click -> camera GSAP
- Fallbacks `Section 34:2253`: `hero-fallback.webp` 1920x1080, video <5MB, WebGL detect

### Phase 4 - Content Sections (Day 13-18)
- Hero `Section 09` headline "ENGINEERED FOR THE ROAD AHEAD." `text-5xl md:text-7xl`, CTAs BOOK A SERVICE #booking + EXPLORE OUR WORK #workshop
- Services `Section 14`: 8 cards from `data/services.ts`, hover `translateY(-4px)` `border-um-accent/30`
- Why Us `Section 15`: 5 blocks (Precision, Transparency, Expertise, Technology, Care)
- Workshop `Section 16`: Gallery 12 images `collected-photos/` (replace Unsplash Section 07), lightbox, filters All/Workshop/Work/Detail
- Before/After `Section 17`: Slider 4 pairs clip-path + "Representative example" caption
- Reviews `Section 18`: Display `5.0 (68)` + "VIEW GOOGLE REVIEWS" -> `https://maps.google.com/?cid=...` (use real 5 reviews in `BUSINESS_COLLECTED.json:reviewsCollected` if owner permits, else link only per IMPORTANT)
- Location `Section 19`: Map `filter grayscale invert`, address, GET DIRECTIONS, CALL WORKSHOP `tel:+919959990827`, BOOK A SERVICE
- Booking `Section 20`: fields + validation (`^[6-9]\d{9}$`) + `/api/booking` route (Formspree/SendGrid), states idle/loading/success/error

### Phase 5 - Optimization & Launch (Day 19-21)
- Assets `Section 35`: Draco, Squoosh WebP 80-85, KTX2, next/font display=swap, lazy 3D dynamic import, code split
- Performance `Section 26`: FCP <1.5s, LCP <2.5s, TTI <3.5s, CLS <0.1, JS <300KB, 3D <5MB, Lighthouse >90 all
- SEO `Section 27`: metadata `app/layout.tsx:1869`, JSON-LD `AutomotiveBusiness` with corrected lat 17.4824308 lng 78.3749938, OG 1200x630, sitemap, robots, H1->H3
- Accessibility `Section 28`: WCAG AA, keyboard, reduced-motion, aria, alt, contrast 4.5:1, 3D aria-labels
- Footer `Section 29`, Deployment checklist `Section 36:2321` (39 items)

---

## Gap Analysis - What's Still Required

| Category | Status | Source | Action |
|----------|--------|--------|--------|
| **Address, Phone, Coords, PlusCode, Rating, Hours, PlaceId, GoogleMapsUri, ReviewsCount, Photos** | ✅ COLLECTED | `BUSINESS_COLLECTED.json:1` live API | Copy to `lib/config.ts` |
| **Email** | ❌ Missing | Maps has no email | Ask owner - keep `''` if none per Section 32:2177 |
| **Social (IG/FB/YT)** | ❌ Missing | Not in Maps | Ask owner - omit if none per Section 29:2014 |
| **Services confirmed list (8)** | ⚠️ Placeholder | Maps shows generic category | Confirm with owner - make configurable `data/services.ts` per Section 14:1340 |
| **Prices** | ❌ Missing | - | Do NOT invent per Section 01:88 |
| **Website URL** | ❌ Missing | Maps has no website | Use `ultimatemechanics.in` if owned per Section 32:2221 |
| **OG Image `1200x630`** | ❌ Missing | Need create | Logo + tagline + dark bg per Section 07:622 |
| **3D Model GLB** | ❌ Missing | Sketchfab per Section 06 | Download free CC-BY + Draco -> `public/models/car-draco.glb` <5MB |
| **HDRI + PBR Textures** | ❌ Missing | Poly Haven + ambientCG per Section 06 | Download `hdri-studio.hdr` + 7 textures to `public/textures/` |
| **Workshop photos (12) + Before/After (8)** | ⚠️ Have 10 Maps photos but PRD wants 12+8 | `collected-photos/` vs Unsplash `Section 07:555` | Compress Maps photos to WebP + supplement with Unsplash if owner allows, add "Representative example" caption |
| **Booking backend** | ❌ Missing | Need choose | Set `FORMSPREE_FORM_ID` or `SENDGRID_API_KEY` per Section 33:2232 |
| **Domain + Vercel** | ❌ Missing | Need purchase | Deploy per Section 36:2345 |
| **API Key rotation** | ⚠️ Exposed | Chat history | Rotate `AIza...psko` at https://console.cloud.google.com/apis/credentials?project=494749699114 -> restrict to referrers |

**PRD Quality Bar `Section 38:2393` - After gaps filled: Premium, Cinematic, Technical, Modern, Trustworthy, Interactive, Fast, Responsive, SEO-ready, Conversion-focused - Ready to communicate "WE UNDERSTAND WHAT IS INSIDE YOUR CAR."**

---

## Asset Checklist (from PRD End)
- [x] Download HDRI - TODO
- [x] Download PBR textures - TODO
- [x] Download hero image - HAVE Maps photos
- [ ] Download 8 service card images - TODO (use Unsplash or Maps photos)
- [ ] Download 12 gallery images - PARTIAL (10 Maps photos)
- [ ] Download 8 before/after images - TODO
- [ ] Create OG image - TODO
- [ ] Compress all to WebP via Squoosh - TODO after download
- [ ] Compress 3D model with Draco - TODO after model selection
- [ ] Create LOD variants - TODO
- [ ] Test in glTF viewer - TODO

## Next Immediate Command
```powershell
# After enabling APIs, this already succeeded - next is to scaffold project:
npx create-next-app@latest ultimate-mechanics --typescript --tailwind --app --src-dir false --import-alias "@/*"
```
Then copy `lib-config-ready.ts` and `BUSINESS_COLLECTED.json` values.

