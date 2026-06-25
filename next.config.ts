import type { NextConfig } from "next";

// For GitHub Pages project sites the app is served from /<repo>. Set
// PAGES_BASE_PATH=/kfa-simulator in the Pages build. Empty for Vercel/root.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Fully static site: no server runtime, no AI, no cost. `next build` emits `out/`.
  output: "export",
  // Static export can't use the server image optimizer.
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
