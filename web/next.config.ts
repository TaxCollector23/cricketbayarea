import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cricketbayarea",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
