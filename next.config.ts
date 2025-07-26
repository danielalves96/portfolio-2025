import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [],
    serverActions: {
      bodySizeLimit: '40mb',
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'l0la-storage.kyantech.com.br',
      },
    ],
  },
};

export default nextConfig;
