"use client"

import { useState, useEffect, useRef } from "react"
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
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [imageTransitioning, setImageTransitioning] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setIsImageLoaded(false)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    setIsImageLoaded(false)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null && !imageTransitioning) {
      setImageTransitioning(true)
      setIsImageLoaded(false)
      setTimeout(() => {
        setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
        setImageTransitioning(false)
      }, 150)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null && !imageTransitioning) {
      setImageTransitioning(true)
      setIsImageLoaded(false)
      setTimeout(() => {
        setSelectedIndex((selectedIndex + 1) % items.length)
        setImageTransitioning(false)
      }, 150)
    }
  }

  // Touch gesture handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      goToNext()
    } else if (distance < -minSwipeDistance) {
      goToPrevious()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex])

  // Preload adjacent images
  useEffect(() => {
    if (selectedIndex === null) return

    const preloadImage = (index: number) => {
      const img = new window.Image()
      img.src = assetPath(items[index].image)
    }

    // Preload previous and next images
    const prevIndex = (selectedIndex - 1 + items.length) % items.length
    const nextIndex = (selectedIndex + 1) % items.length

    preloadImage(prevIndex)
    preloadImage(nextIndex)
  }, [selectedIndex, items])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
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
        <DialogContent className="max-w-[100vw] sm:max-w-[90vw] lg:max-w-[85vw] w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] p-0 overflow-hidden">
          {selectedItem && (
            <div
              className="relative flex flex-col h-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image Container */}
              <div className="relative w-full flex-1 flex items-center justify-center bg-black/95 min-h-0 sm:min-h-[70vh]">
                <div
                  className={`relative w-full h-full transition-opacity duration-150 ${
                    isImageLoaded && !imageTransitioning ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={assetPath(selectedItem.image)}
                    alt={selectedItem.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw"
                    priority
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>

                {/* Loading indicator */}
                {!isImageLoaded && !imageTransitioning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={imageTransitioning}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-10 w-10 sm:h-12 sm:w-12 rounded-full disabled:opacity-50 touch-manipulation"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="sr-only">Previous image</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={imageTransitioning}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-10 w-10 sm:h-12 sm:w-12 rounded-full disabled:opacity-50 touch-manipulation"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="sr-only">Next image</span>
                </Button>
              </div>

              {/* Image Info */}
              <div className="bg-background p-4 sm:p-6 flex-shrink-0">
                <DialogTitle className="text-lg sm:text-xl font-semibold mb-1">{selectedItem.title}</DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                  {selectedItem.location}
                </DialogDescription>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
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
