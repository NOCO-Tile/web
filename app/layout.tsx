import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next" // Disabled for static export
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NOCO Tile | Expert Tile Installation in Northern Colorado",
  description:
    "Transforming spaces across Northern Colorado into dreams. 20+ years of experience in tile installation for bathrooms, kitchens, and more.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="noco-tile-theme">
          <ThemeToggle />
          {children}
          {/* <Analytics /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
