/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    env: {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fomo-engine-backend-800871339199.asia-east1.run.app',
    },
  }
  
  module.exports = nextConfig;