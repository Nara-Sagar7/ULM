import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { business } from "@/data/business";

// PRD Section 04:251 - Exact fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: business.seo.title,
  description: business.seo.description,
  keywords: [...business.seo.keywords],
  authors: [{ name: "Ultimate Mechanics" }],
  creator: "Ultimate Mechanics",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ultimatemechanics.in"),
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ultimatemechanics.in",
    type: "website",
    locale: "en_IN",
    siteName: "Ultimate Mechanics",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ultimate Mechanics - Premium Car Service Hyderabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: business.seo.title,
    description: business.seo.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "AutomotiveBusiness", "LocalBusiness"],
    name: business.name,
    description: business.seo.description,
    url: "https://ultimatemechanics.example.com",
    telephone: business.contact.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1} ${business.address.line2}`,
      addressLocality: business.address.city.replace(",", ""),
      addressRegion: business.address.state,
      postalCode: "500085",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.coordinates.lat,
      longitude: business.address.coordinates.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.reputation.rating,
      reviewCount: business.reputation.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: "$$",
    openingHoursSpecification: business.hours.schedule
      .filter((h) => h.open !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    hasMap: business.maps.googleMapsUri,
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0B] text-white selection:bg-[#D4A853] selection:text-black">
        {children}
      </body>
    </html>
  );
}
