import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@claude-viewer/shared'],
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname, '../../')
  }
};

export default nextConfig;
