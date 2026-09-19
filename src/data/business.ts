export const business = {
  name: "ULTIMATE MECHANICS",
  shortName: "Ultimate Mechanics",
  tagline: "Premium Automotive Service & Inspection",
  description:
    "Professional automotive inspection, service and care with attention to every component that matters.",
  brandStatement: "PRECISION IN EVERY DETAIL.",
  heroHeadline: "ENGINEERED FOR\nTHE ROAD AHEAD.",
  heroSub: "Precision inspection. Expert automotive care.\nBuilt around your vehicle.",
  address: {
    line1: "No. 605, Road Number 3A,",
    line2: "Gopal Nagar, Shilpa Avenue Colony,",
    area: "Hafeezpet,",
    city: "Hyderabad,",
    state: "Telangana 500085",
    country: "India",
    full: "No. 605, Road Number 3A, Gopal Nagar, Shilpa Avenue Colony, Hafeezpet, Hyderabad, Telangana 500085, India",
    plusCode: "F9JF+XX Hyderabad, Telangana",
    coordinates: { lat: 17.4824308, lng: 78.3749938 },
    viewport: { lat: 17.4824359, lng: 78.3724189 },
  },
  contact: {
    phone: "099599 90827",
    phoneRaw: "9959990827",
    phoneHref: "tel:+919959990827",
    whatsappHref: "https://wa.me/919959990827?text=Hi%2C%20I%20would%20like%20to%20book%20a%20service%20at%20Ultimate%20Mechanics.",
  },
  maps: {
    // Verified live 2026-09-19 via Places API (New) - fetch-gmaps.js
    placeId: "ChIJiQV2JgKTyzsRWTKvoAimziI",
    cid: "2508124598477730393",
    googleMapsUri:
      "https://maps.google.com/?cid=2508124598477730393&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA",
    // Correct coords 17.4824308,78.3749938 from google maps.txt:1 (PRD Section 27:1928 had wrong 17.4839,78.3236)
    directionsUri: "https://www.google.com/maps/dir/?api=1&destination=17.4824308,78.3749938",
    // Embed: validated via Maps - for pixel perfect, replace with Share > Embed HTML. This pb is functional without API key.
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.0!2d78.3749938!3d17.4824308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sChIJiQV2JgKTyzsRWTKvoAimziI!2sUltimate%20mechanics!5e0!3m2!1sen!2sin!4v1726730000000!5m2!1sen!2sin",
    globalPlusCode: "7J9WF9JF+XX",
    viewport: { lat: 17.4824359, lng: 78.3724189 },
  },
  reputation: {
    rating: 5.0,
    reviewCount: 68,
    label: "Women-owned",
    category: "Car Inspection / Automobile Service & Repair Workshop",
  },
  hours: {
    note: "Live from Google Business Profile • Verified 2026-09-19 via Places API (New) • Next close: 2026-09-19T13:00:00Z",
    // Verified via fetch-gmaps.js - Monday 9:30 AM – 6:30 PM etc, Sunday Closed
    schedule: [
      { day: "Monday", open: "9:30 AM", close: "6:30 PM" },
      { day: "Tuesday", open: "9:30 AM", close: "6:30 PM" },
      { day: "Wednesday", open: "9:30 AM", close: "6:30 PM" },
      { day: "Thursday", open: "9:30 AM", close: "6:30 PM" },
      { day: "Friday", open: "9:30 AM", close: "5:30 PM" },
      { day: "Saturday", open: "9:30 AM", close: "6:30 PM" },
      { day: "Sunday", open: "Closed", close: "Closed" },
    ],
  },
  seo: {
    title: "Ultimate Mechanics | Premium Car Service & Inspection in Hyderabad",
    description:
      "Ultimate Mechanics in Hafeezpet, Hyderabad provides professional automotive inspection, servicing and vehicle care. Contact us to schedule your service.",
    keywords: [
      "Ultimate Mechanics Hyderabad",
      "Ultimate Mechanics Hafeezpet",
      "car service Hafeezpet",
      "car service Hyderabad",
      "car inspection Hyderabad",
      "automobile workshop Hyderabad",
      "car mechanic Hafeezpet",
    ],
  },
  nav: [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "3D INSPECTION", href: "#inspection" },
    { label: "WORKSHOP", href: "#workshop" },
    { label: "REVIEWS", href: "#reviews" },
    { label: "CONTACT", href: "#contact" },
  ],
  services: [
    {
      id: "01",
      title: "VEHICLE INSPECTION",
      desc: "Comprehensive multi-point inspection covering critical systems and roadworthiness.",
      icon: "Search",
    },
    {
      id: "02",
      title: "GENERAL SERVICE",
      desc: "Scheduled maintenance aligned to manufacturer intervals and driving conditions.",
      icon: "Wrench",
    },
    {
      id: "03",
      title: "DIAGNOSTIC CHECK",
      desc: "Advanced OBD and system diagnostics to identify faults before they escalate.",
      icon: "Activity",
    },
    {
      id: "04",
      title: "BRAKE INSPECTION",
      desc: "Detailed evaluation of pads, discs, calipers and hydraulic performance.",
      icon: "Disc3",
    },
    {
      id: "05",
      title: "ENGINE SERVICE",
      desc: "Precision engine care focused on performance, efficiency and longevity.",
      icon: "Cog",
    },
    {
      id: "06",
      title: "SUSPENSION CHECK",
      desc: "Assessment of shocks, springs and geometry for stability and comfort.",
      icon: "MoveVertical",
    },
    {
      id: "07",
      title: "ELECTRICAL DIAGNOSTICS",
      desc: "Tracing and resolving electrical faults with modern diagnostic thinking.",
      icon: "Zap",
    },
    {
      id: "08",
      title: "PREVENTIVE MAINTENANCE",
      desc: "Proactive care to reduce downtime and extend vehicle life.",
      icon: "ShieldCheck",
    },
  ],
  whyUs: [
    {
      title: "PRECISION",
      desc: "Every inspection begins with attention to detail.",
      k: "01",
    },
    {
      title: "TRANSPARENCY",
      desc: "Clear communication throughout the service process.",
      k: "02",
    },
    {
      title: "EXPERTISE",
      desc: "Automotive care focused on your vehicle's condition.",
      k: "03",
    },
    {
      title: "TECHNOLOGY",
      desc: "Modern diagnostic thinking for modern vehicles.",
      k: "04",
    },
    {
      title: "CARE",
      desc: "Your vehicle receives focused attention from inspection through completion.",
      k: "05",
    },
  ],
} as const;

export type Business = typeof business;
