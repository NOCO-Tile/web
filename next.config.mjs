/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // No basePath needed - GitHub Pages serves from /web/ automatically based on repo name
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
