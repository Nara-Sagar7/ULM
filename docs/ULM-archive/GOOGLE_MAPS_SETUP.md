# Google Maps API - One-Time Setup

## Your Key
`AIzaSyBqfFgQRd7XFAesIwJ00DI9CVFZdYFpsko` (Project: 494749699114)
> WARNING: This key was shared in chat and must be ROTATED after collection. See Step 4.

## Problem
All Maps APIs tested are **DISABLED** for this project:
- Places API (New) -> PERMISSION_DENIED (needs enable)
- Places API Legacy -> REQUEST_DENIED ("switch to Places API (New)")
- Geocoding API -> REQUEST_DENIED
- Static Maps -> 403
Tested via `fetch-gmaps.js` and `curl.exe -s` - logs in `C:\Users\sagar\AppData\Local\Temp\opencode\ulm-run.log`

## Fix - 1 Click (2 mins)

1. **Enable Places API (New):**
   https://console.developers.google.com/apis/api/places.googleapis.com/overview?project=494749699114
   Click **ENABLE**

2. **Also enable (for PRD Section 33):**
   - Geocoding API: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?project=494749699114
   - Maps Embed API: https://console.cloud.google.com/apis/library/maps-embed-backend.googleapis.com?project=494749699114
   - Maps JavaScript API (optional if you want dynamic map): https://console.cloud.google.com/apis/library/maps-backend.googleapis.com?project=494749699114

3. **Wait 2-3 minutes** for propagation.

4. **Retry fetch:**
   ```powershell
   node "C:\Users\sagar\Desktop\ULM\fetch-gmaps.js"
   # or with env var (secure):
   $env:GOOGLE_MAPS_API_KEY="AIzaSyBqfFgQRd7XFAesIwJ00DI9CVFZdYFpsko"; node "C:\Users\sagar\Desktop\ULM\fetch-gmaps.js"
   ```

5. **Expected Output:**
   ```
   Name: Ultimate mechanics
   Address: No. 605, Road Number 3A, Gopal Nagar, Shilpa Avenue Colony, Hafeezpet, Hyderabad, Telangana 500085, India
   Place ID: places/ChIJ...
   Phone: 099599 90827 / +91 99599 90827
   Rating: 5.0 (68)
   Location: 17.4824308,78.3749938
   Maps URI: https://www.google.com/maps/place/...
   Plus Code: 7J9W... / F9JF+XX Hyderabad, Telangana
   Hours: Monday: 9:00 AM – 7:00 PM ...
   ```

## After Successful Fetch

1. **Save to config:**
   - Output auto-saved to `C:\Users\sagar\AppData\Local\Temp\opencode\ulm-business.json`
   - Copy into `lib/config.ts:2168` (BUSINESS object) - hours, rating.url, maps.plusCode, placeId, lat/lng

2. **Get Embed URL (still manual - no API needed):**
   - Visit: https://www.google.com/maps/place/Ultimate+mechanics/@17.4824308,78.3749938,17z
   - Click **Share > Embed a map > Copy HTML**
   - Extract `src="https://www.google.com/maps/embed?pb=..."`
   - Set in `.env.local`:
     ```
     NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=..."
     GOOGLE_MAPS_API_KEY="AIzaSyBqfFgQRd7XFAesIwJ00DI9CVFZdYFpsko" # server-only, delete after one-time fetch if you use static embed
     NEXT_PUBLIC_SITE_URL="https://ultimatemechanics.in"
     ```

3. **SECURITY - ROTATE KEY:**
   Since key was exposed in chat, go to:
   https://console.cloud.google.com/apis/credentials?project=494749699114
   - Click your key > **Regenerate** or **Delete and Create New**
   - Restrict new key: **Application restrictions > HTTP referrers > `ultimatemechanics.in/*`, `localhost:3000/*`**
   - **API restrictions > Restrict key > Select: Places API (New), Geocoding API, Maps Embed API**
   - Update `.env.local` and Vercel Env Vars with new key, never commit to Git.

## Manual Fallback (No API - 5 mins)
If you cannot enable API now, visit `google maps.txt` link manually and copy:
- [ ] Opening hours (Mon-Sun) - from "Hours" dropdown
- [ ] Phone verify: 099599 90827
- [ ] Review count verify: 68
- [ ] Photos: Save 8 workshop photos (right-click save)
- [ ] Reviews link: Click "68 reviews" > copy URL
- [ ] Embed HTML: Share > Embed a map
- Tell me values and I will fill `lib/config.ts` without API.

## Verification (PRD Section 36 & 27)
- PRD coords `Section 27:1928` are wrong (17.4839,78.3236 ~5km off). Correct is `17.4824308,78.3749938` from your `google maps.txt:1`
- After enable, `fetch-gmaps.js` will confirm and generate correct `directionsUrl: https://www.google.com/maps/dir/?api=1&destination=17.4824308,78.3749938`

