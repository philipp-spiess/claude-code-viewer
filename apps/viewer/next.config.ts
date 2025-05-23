import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@claude-viewer/shared'],
  outputFileTracingRoot: require('path').join(__dirname, '../../'),
}

export default nextConfig
