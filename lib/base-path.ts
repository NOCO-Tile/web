// Helper to get the base path for static assets
export const BASE_PATH = '/web'

// Helper function to prepend base path to asset URLs
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`
}
