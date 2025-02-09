import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["product.hstatic.net", "localhost", ""],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5002",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
