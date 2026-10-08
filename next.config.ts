import type { NextConfig } from "next";

const isVercel = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: "standalone" }),
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
