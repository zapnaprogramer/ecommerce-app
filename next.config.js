/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable typed routes at root level (no longer under experimental)
  typedRoutes: true,

  // Enable modern Next.js features
  serverActions: true,
  optimizePackageImports: true,

  // Fix workspace root confusion
  outputFileTracingRoot: __dirname,

  // Optional: Performance tweaks
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
