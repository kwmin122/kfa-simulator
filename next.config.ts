import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: no server runtime, no AI, no cost. `next build` emits `out/`.
  output: "export",
  // Static export can't use the server image optimizer.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
