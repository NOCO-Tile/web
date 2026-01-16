"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { PortfolioLightbox } from "@/components/portfolio-lightbox"
import { Phone, Mail } from "lucide-react"
import Image from "next/image"
import { assetPath } from "@/lib/base-path"

// Curated selection of 15 best portfolio images from the full collection of 51
const portfolioItems = [
  { image: "/images/portfolio-01.jpg", alt: "Professional tile installation", title: "Bathroom Tile Work", location: "Fort Collins, CO" },
  { image: "/images/portfolio-05.jpg", alt: "Professional tile installation", title: "Custom Shower Design", location: "Loveland, CO" },
  { image: "/images/portfolio-08.jpg", alt: "Professional tile installation", title: "Kitchen Backsplash", location: "Greeley, CO" },
  { image: "/images/portfolio-11.jpg", alt: "Professional tile installation", title: "Floor Tile Installation", location: "Windsor, CO" },
  { image: "/images/portfolio-15.jpg", alt: "Professional tile installation", title: "Master Bath Renovation", location: "Fort Collins, CO" },
  { image: "/images/portfolio-19.jpg", alt: "Professional tile installation", title: "Decorative Tile Pattern", location: "Loveland, CO" },
  { image: "/images/portfolio-23.jpg", alt: "Professional tile installation", title: "Shower Surround", location: "Greeley, CO" },
  { image: "/images/portfolio-27.jpg", alt: "Professional tile installation", title: "Kitchen Remodel", location: "Windsor, CO" },
  { image: "/images/portfolio-31.jpg", alt: "Professional tile installation", title: "Bathroom Accent Wall", location: "Fort Collins, CO" },
  { image: "/images/portfolio-35.jpg", alt: "Professional tile installation", title: "Elegant Flooring", location: "Loveland, CO" },
  { image: "/images/portfolio-39.jpg", alt: "Professional tile installation", title: "Contemporary Bath", location: "Greeley, CO" },
  { image: "/images/portfolio-43.jpg", alt: "Professional tile installation", title: "Tile Feature Wall", location: "Windsor, CO" },
  { image: "/images/portfolio-46.jpg", alt: "Professional tile installation", title: "Modern Shower", location: "Fort Collins, CO" },
  { image: "/images/portfolio-49.jpg", alt: "Professional tile installation", title: "Luxury Bath Design", location: "Loveland, CO" },
  { image: "/images/portfolio-51.jpg", alt: "Professional tile installation", title: "Custom Tile Work", location: "Greeley, CO" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={assetPath("/images/hero-bathroom.jpg")}
            alt="Luxury bathroom tile work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-balance">The Art of Tile</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto text-pretty">
            Transforming spaces across Northern Colorado into dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-gray-500 hover:bg-blue-gray-600 text-white text-lg px-8 py-6 h-auto">
              <a href="#contact">Get Free Quote</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-2 border-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              <a href="#portfolio">View Our Work</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={assetPath("/images/bathroom-modern.jpg")}
                alt="Modern bathroom tile installation"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Welcome to NOCO Tile</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Where we specialize in making visions come to life. With 20+ years of experience, we pride ourselves on
                delivering exceptional results tailored to your unique vision.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Let us help you turn your aspirations into reality with our expert guidance and support. Contact us
                today to get started!
              </p>
              <Button asChild size="lg" className="mt-4">
                <a href="#contact">Learn More About Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Expert tile installation for every space in your home
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={assetPath("/images/hero-bathroom.jpg")}
                  alt="Bathroom tile installation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Bathroom Remodeling</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transform your bathroom into a luxurious retreat with our expert tile installation services.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={assetPath("/images/kitchen-backsplash.jpg")}
                  alt="Kitchen tile installation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Kitchen Backsplashes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create stunning focal points with custom tile backsplashes that complement your kitchen design.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={assetPath("/images/floor-tile.jpg")}
                  alt="Floor tile installation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Floor Installation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Durable and beautiful tile flooring solutions for any room in your home.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Recent Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Take a look at some of our completed projects showcasing quality craftsmanship
            </p>
          </div>

          <PortfolioLightbox items={portfolioItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-blue-gray-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-pretty">
            Call us today for a free, no-strings-attached quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:9706858897"
              className="flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity"
            >
              <Phone className="w-6 h-6" />
              (970) 685-8897
            </a>
            <span className="hidden sm:inline text-2xl opacity-50">|</span>
            <a
              href="mailto:info@mysite.com"
              className="flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity"
            >
              <Mail className="w-6 h-6" />
              info@mysite.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-3xl font-bold mb-4">NOCO Tile</div>
          <p className="text-muted-foreground mb-6">Serving Northern Colorado with Excellence</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
            <a href="tel:9706858897" className="hover:text-foreground transition-colors">
              (970) 685-8897
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:info@mysite.com" className="hover:text-foreground transition-colors">
              info@mysite.com
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NOCO Tile Co. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
