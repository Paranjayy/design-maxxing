/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow static file serving from public/items
  images: {
    unoptimized: true,
  },
  // Important: allow serving extracted HTML files from public
  async rewrites() {
    return [];
  },
};

export default nextConfig;
