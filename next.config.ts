import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      new URL("https://raw.githubusercontent.com/PokeAPI/sprites/**"),
    ],
  },
};

export default nextConfig;
