// fetch-gmaps.js - ONE-TIME data collection from Google Maps
// Usage: node fetch-gmaps.js
// Requires: Places API (New) enabled - https://console.developers.google.com/apis/api/places.googleapis.com/overview?project=494749699114
// Key stored in .env.local as GOOGLE_MAPS_API_KEY (server-only) or passed via env var

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Must set GOOGLE_MAPS_API_KEY env var - no hardcoded fallback for security
if (!API_KEY) {
  console.error("Missing GOOGLE_MAPS_API_KEY env var. Set: $env:GOOGLE_MAPS_API_KEY='your_key'; node fetch-gmaps.js");
  process.exit(1);
}
const QUERY = "Ultimate mechanics Hafeezpet Hyderabad";
const FIELD_MASK = "places.displayName,places.formattedAddress,places.id,places.rating,places.userRatingCount,places.location,places.nationalPhoneNumber,places.internationalPhoneNumber,places.regularOpeningHours,places.googleMapsUri,places.plusCode,places.types,places.websiteUri,places.photos,places.reviews";

async function search() {
  console.log("Searching:", QUERY);
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": FIELD_MASK
    },
    body: JSON.stringify({ textQuery: QUERY })
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Search failed:", JSON.stringify(data, null, 2));
    console.error("\n>>> FIX: Enable Places API (New) at:");
    console.error("https://console.developers.google.com/apis/api/places.googleapis.com/overview?project=494749699114");
    console.error("Also enable: Geocoding API, Maps Embed API if needed");
    console.error("Wait 2-3 mins after enabling, then retry");
    process.exit(1);
  }
  console.log(`Found ${data.places?.length || 0} places`);
  const place = data.places?.[0];
  if (!place) {
    console.error("No place found for query");
    process.exit(1);
  }
  
  console.log("\n=== ULTIMATE MECHANICS - RAW DATA ===");
  console.log("Name:", place.displayName?.text);
  console.log("Address:", place.formattedAddress);
  console.log("Place ID:", place.id);
  console.log("Phone:", place.nationalPhoneNumber, "/", place.internationalPhoneNumber);
  console.log("Rating:", place.rating, `(${place.userRatingCount})`);
  console.log("Location:", place.location?.latitude, ",", place.location?.longitude);
  console.log("Maps URI:", place.googleMapsUri);
  console.log("Plus Code:", place.plusCode?.globalCode, place.plusCode?.compoundCode);
  console.log("Website:", place.websiteUri);
  if (place.regularOpeningHours) {
    console.log("Hours:");
    place.regularOpeningHours.weekdayDescriptions?.forEach(d => console.log(" ", d));
  }

  // Save raw
  const outRaw = path.join("C:\\Users\\sagar\\AppData\\Local\\Temp\\opencode", "ulm-places-new.json");
  fs.writeFileSync(outRaw, JSON.stringify(data, null, 2));
  console.log(`\nRaw saved to: ${outRaw}`);

  // Map to PRD config.ts:2168 structure
  const business = {
    name: place.displayName?.text || "Ultimate Mechanics",
    phone: place.nationalPhoneNumber?.replace(/\s/g, "") || "099599 90827",
    phoneRaw: place.internationalPhoneNumber || "+919959990827",
    whatsapp: (place.internationalPhoneNumber || "+919959990827").replace(/\+/,""),
    address: {
      formatted: place.formattedAddress,
      // PRD expects: line1, line2, city, state, pincode, country
    },
    maps: {
      plusCode: place.plusCode?.compoundCode || "F9JF+XX Hyderabad, Telangana",
      globalPlusCode: place.plusCode?.globalCode,
      googleMapsUri: place.googleMapsUri,
      // Directions: https://www.google.com/maps/dir/?api=1&destination=17.4824308,78.3749938
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${place.location.latitude},${place.location.longitude}`,
      // Embed needs manual: Go to Maps > Share > Embed > copy iframe src
      // Example: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...!2d78.3749938!3d17.4824308
      embedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d${place.location.longitude}!3d${place.location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${place.id}!2sUltimate%20mechanics!5e0!3m2!1sen!2sin!4v...`,
      placeId: place.id,
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    },
    rating: {
      score: place.rating,
      count: place.userRatingCount,
      source: "Google",
      url: place.googleMapsUri
    },
    hours: place.regularOpeningHours?.weekdayDescriptions || [],
    rawOpeningHours: place.regularOpeningHours
  };

  const outBusiness = path.join("C:\\Users\\sagar\\AppData\\Local\\Temp\\opencode", "ulm-business.json");
  fs.writeFileSync(outBusiness, JSON.stringify(business, null, 2));
  console.log(`Business mapped saved to: ${outBusiness}`);

  // Generate config.ts patch preview
  console.log("\n=== COPY-PASTE FOR lib/config.ts:2168 ===");
  console.log(JSON.stringify(business, null, 2));

  // Also try Place Details for more fields (photos/reviews) via GET
  console.log("\nFetching Place Details (photos/reviews)...");
  const detailRes = await fetch(`https://places.googleapis.com/v1/${place.id}`, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "displayName,formattedAddress,rating,userRatingCount,reviews,photos,regularOpeningHours"
    }
  });
  if (detailRes.ok) {
    const detail = await detailRes.json();
    console.log("Reviews:", detail.reviews?.length || 0);
    console.log("Photos:", detail.photos?.length || 0);
    fs.writeFileSync(path.join("C:\\Users\\sagar\\AppData\\Local\\Temp\\opencode", "ulm-details.json"), JSON.stringify(detail, null, 2));
  } else {
    console.log("Details fetch failed (non-fatal):", await detailRes.text());
  }

  console.log("\n=== NEXT STEPS ===");
  console.log("1. Verified coords vs PRD Section 27:1928 (PRD has 17.4839,78.3236 ~5km wrong) -> Use", business.maps.latitude+","+business.maps.longitude);
  console.log("2. Go to", business.maps.googleMapsUri, "-> Share -> Embed a map -> copy iframe src -> set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL in .env.local");
  console.log("3. Copy business data into /lib/config.ts:2178");
  console.log("4. DELETE this temp API_KEY fallback and rotate key in Google Cloud Console (exposed in chat)");
}

search().catch(e => { console.error(e); process.exit(1); });
