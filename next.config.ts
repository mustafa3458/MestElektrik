import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/MestElektrik",
  assetPrefix: "/MestElektrik/",
};

export default nextConfig;