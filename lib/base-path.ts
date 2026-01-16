// Helper function for asset paths in public directory
// Public assets need the /web prefix for GitHub Pages
export function assetPath(path: string): string {
  return `/web${path}`
}
