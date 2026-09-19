// /lib/config.ts - READY TO COPY - Filled from live Google Maps 2026-09-19
// This replaces the TODO placeholder in ULM V2.txt:2168 / Section 32
// Place this file in your Next.js project at lib/config.ts

export const BUSINESS = {
  name: 'Ultimate Mechanics',
  tagline: 'Precision in Every Detail.',
  secondaryTagline: 'Engineered for the Road Ahead.',
  phone: '099599 90827',
  phoneRaw: '+919959990827', // E.164 for tel: link
  whatsapp: '919959990827',
  whatsappUrl: `https://wa.me/919959990827?text=${encodeURIComponent('Hi, I would like to book a service at Ultimate Mechanics.')}`,
  email: '', // TODO: Add when available - not found in Maps

  address: {
    line1: 'No. 605, Road Number 3A',
    line2: 'Gopal Nagar, Shilpa Avenue Colony',
    city: 'Hafeezpet, Hyderabad',
    state: 'Telangana',
    pincode: '500085',
    country: 'India',
    formatted: 'No. 605, Road Number 3A, Gopal Nagar, Shilpa Avenue Colony, Hafeezpet, Hyderabad, Telangana 500085, India',
  },

  maps: {
    plusCode: 'F9JF+XX Hyderabad, Telangana, India',
    globalPlusCode: '7J9WF9JF+XX',
    latitude: 17.4824308,
    longitude: 78.3749938,
    placeId: 'ChIJiQV2JgKTyzsRWTKvoAimziI',
    cid: '2508124598477730393',
    // Verified via Places API (New) - matches google maps.txt:1
    // PRD Section 27:1928 had wrong coords 17.4839,78.3236 ~5km off - corrected
    googleMapsUri: 'https://maps.google.com/?cid=2508124598477730393&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=17.4824308,78.3749938',
    // For embed, get actual Share > Embed HTML from Maps page and paste below:
    // Go to https://www.google.com/maps/place/Ultimate+mechanics/@17.4824308,78.3749938,17z -> Share -> Embed a map
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.0!2d78.3749938!3d17.4824308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sChIJiQV2JgKTyzsRWTKvoAimziI!2sUltimate%20mechanics!5e0!3m2!1sen!2sin!4v1726730000000',
  },

  rating: {
    score: 5.0,
    count: 68,
    source: 'Google',
    url: 'https://maps.google.com/?cid=2508124598477730393&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA',
    reviewsUrl: 'https://www.google.com/maps/place/Ultimate+mechanics/@17.4824308,78.3749938,17z/data=!4m8!3m7!1s0x3bcb930226760589:0x22cea608a0af3259!8m2!3d17.4824308!4d78.3749938!9m1!1b1!16s%2Fg%2F11tx85j28p',
  },

  ownership: 'Women-owned' as const,

  hours: {
    monday: '9:30 AM – 6:30 PM',
    tuesday: '9:30 AM – 6:30 PM',
    wednesday: '9:30 AM – 6:30 PM',
    thursday: '9:30 AM – 6:30 PM',
    friday: '9:30 AM – 5:30 PM',
    saturday: '9:30 AM – 6:30 PM',
    sunday: 'Closed',
  },

  social: {
    instagram: '', // TODO: Add only if profiles exist per Section 32:2214
    facebook: '',
    youtube: '',
    linkedin: '',
  },
} as const;

// Helper for tel: and wa links
export const PHONE_TEL = `tel:${BUSINESS.phoneRaw}`;
export const WHATSAPP_URL = BUSINESS.whatsappUrl;
export const DIRECTIONS_URL = BUSINESS.maps.directionsUrl;
export const MAPS_EMBED_URL = BUSINESS.maps.embedUrl; // or from NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL env
