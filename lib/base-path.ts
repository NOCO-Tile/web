// Helper to get the base path for static assets
// Only use /web in production (for GitHub Pages), empty string in development
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/web' : ''

// Helper function to prepend base path to asset URLs
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`
}
