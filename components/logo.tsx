"use client"

import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { assetPath } from "@/lib/base-path"
import { useEffect, useState } from "react"

export function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch - only render after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show placeholder during SSR/hydration to prevent layout shift
  if (!mounted) {
    return (
      <div className="h-24 w-auto" aria-label="NOCO Tile">
        <div className="h-full w-24 bg-transparent" />
      </div>
    )
  }

  // Determine which logo to show based on theme
  const logoSrc = resolvedTheme === "dark"
    ? assetPath("/logo-dark.png")
    : assetPath("/logo-light.png")

  return (
    <a
      href="#"
      className="h-24 w-auto flex items-center"
      aria-label="NOCO Tile - Return to top"
    >
      <Image
        src={logoSrc}
        alt="NOCO Tile"
        height={96}
        width={96}
        className="h-full w-auto brightness-[0.3] contrast-[1.2] dark:brightness-100 dark:contrast-100"
        priority
      />
    </a>
  )
}
