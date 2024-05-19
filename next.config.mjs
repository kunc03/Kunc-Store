/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        hostname: 'cdn.dummyjson.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Remove trailing slash
  trailingSlash: true,

  // Clean URLs
  cleanUrls: true,
};

export default nextConfig;
