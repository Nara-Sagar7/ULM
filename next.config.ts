import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // FAST BUILD: skip type/lint on build, optimize imports
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei", "@react-three/fiber"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
