import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3001',
      },
      {
        protocol: 'https',
        hostname: 'admin.avintech.com.mx',
      },
      {
        protocol: 'https',
        hostname: 'avintech.com.mx',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
}

export default nextConfig
