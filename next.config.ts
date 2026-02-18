import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow external image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
    // High quality optimization - no visible degradation
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Quality: 90 = near-lossless (default is 75)
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
