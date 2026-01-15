"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-2xl font-bold text-foreground">NOCO Tile</div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground/70 hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#portfolio" className="text-foreground/70 hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Right side - Theme toggle and phone */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild className="bg-blue-gray-500 hover:bg-blue-gray-600 text-white">
              <a href="tel:9706858897" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (970) 685-8897
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
