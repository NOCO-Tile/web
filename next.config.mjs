/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Only use basePath in production (for GitHub Pages deployment)
  basePath: process.env.NODE_ENV === 'production' ? '/web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/web' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
