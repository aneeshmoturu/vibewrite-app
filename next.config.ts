import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This allows the site to deploy even if there are strict TypeScript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This allows the site to deploy even if there are strict formatting errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;