import type { NextConfig } from "next";

const BASE = "/cricketbayarea";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE,
  },
};

export default nextConfig;
