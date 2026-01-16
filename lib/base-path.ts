// Helper function for asset paths in public directory
// Public assets need the /web prefix for GitHub Pages in production only
export function assetPath(path: string): string {
  const prefix = process.env.NODE_ENV === 'production' ? '/web' : ''
  return `${prefix}${path}`
}
