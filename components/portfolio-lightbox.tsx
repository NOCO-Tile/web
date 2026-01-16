"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { assetPath } from "@/lib/base-path"

export interface PortfolioItem {
  image: string
  alt: string
  title: string
  location: string
}

interface PortfolioLightboxProps {
  items: PortfolioItem[]
}

export function PortfolioLightbox({ items }: PortfolioLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex])

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null

  return (
    <>
      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={assetPath(item.image)}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.location}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-[95vw] w-auto h-auto max-h-[95vh] p-0 overflow-hidden">
          {selectedItem && (
            <div className="relative flex flex-col">
              {/* Image Container */}
              <div className="relative w-full max-h-[80vh] flex items-center justify-center bg-black/90">
                <Image
                  src={assetPath(selectedItem.image)}
                  alt={selectedItem.alt}
                  width={1200}
                  height={1200}
                  className="object-contain max-h-[80vh] w-auto"
                  priority
                />

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                  <span className="sr-only">Previous image</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                  <span className="sr-only">Next image</span>
                </Button>
              </div>

              {/* Image Info */}
              <div className="bg-background p-6">
                <DialogTitle className="text-xl font-semibold mb-1">{selectedItem.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedItem.location}
                </DialogDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedIndex! + 1} / {items.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
