/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash images
      },
        {
        protocol: "https",
        hostname: "plus.unsplash.com", // <-- Added this line
      },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
