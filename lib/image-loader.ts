export default function imageLoader({ src }: { src: string }) {
  // For static export with basePath, prepend it to the image src
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/web'
  return `${basePath}${src}`
}
