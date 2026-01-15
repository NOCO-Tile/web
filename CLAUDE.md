# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 marketing website for NOCO Tile Co, a tile installation company serving Northern Colorado. The site is built with React 19, TypeScript, and Tailwind CSS v4, featuring a modern design system based on shadcn/ui components.

**Origin**: This codebase was exported from Vercel v0.app and is being converted into a static site for deployment on non-Vercel hosting platforms (GitHub Pages, Netlify, Cloudflare Pages, etc.).

## Development Commands

```bash
# Development
pnpm dev              # Start development server (default: http://localhost:3000)
pnpm build            # Build static site (outputs to ./out directory)
pnpm lint             # Run ESLint

# Package management
pnpm install          # Install dependencies (use pnpm, not npm)

# Static Export
# After running 'pnpm build', the ./out directory contains the complete
# static site ready for deployment to any static hosting provider
```

## Architecture & Structure

### Technology Stack
- **Framework**: Next.js 16 with App Router (configured for static export)
- **React**: v19.2.0 (latest)
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Theme**: next-themes for dark mode support
- **Analytics**: Currently disabled (Vercel Analytics commented out for static export)
- **Icons**: lucide-react
- **Forms**: react-hook-form with zod validation

### Directory Structure

```
app/
  layout.tsx      # Root layout with theme provider, Inter font, analytics
  page.tsx        # Home page - single-page marketing site
  globals.css     # Tailwind imports, custom CSS variables, theme definitions

components/
  ui/             # shadcn/ui components (~30+ components)
  header.tsx      # Fixed navigation header with phone CTA
  theme-provider.tsx  # next-themes wrapper
  theme-toggle.tsx    # Dark/light mode toggle button

lib/
  utils.ts        # cn() utility (clsx + tailwind-merge)

hooks/
  use-mobile.ts   # Mobile detection hook
  use-toast.ts    # Toast notifications hook

public/
  images/         # Site images
  icon-*.png      # Favicon variants for light/dark mode
  icon.svg        # SVG favicon
```

### Path Aliases

All imports use the `@/` alias pointing to the root directory:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### Styling System

- **Tailwind CSS v4**: Uses the new PostCSS-based architecture
- **Color System**: OKLCH color space with CSS custom properties
- **Theme Variables**: Defined in `app/globals.css` with light/dark variants
- **Custom Variant**: `.dark` class variant for dark mode styling
- **Utilities**:
  - `cn()` function in `lib/utils.ts` for conditional class merging
  - Custom cyan color utilities (cyan-500, cyan-600) for brand accent
- **Animations**: `tw-animate-css` plugin for additional animations

### Component Patterns

1. **All components use "use client" directive** - The site is entirely client-rendered
2. **shadcn/ui components**: Pre-built, customizable UI components in `components/ui/`
3. **Theme-aware**: Components respect light/dark mode via CSS variables
4. **Responsive**: Mobile-first design with responsive utilities
5. **Image optimization disabled**: `next.config.mjs` has `unoptimized: true`
6. **TypeScript strict mode**: All components are fully typed

### Current Page Structure (app/page.tsx)

Single-page marketing site with sections:
- Hero (full-screen with background image)
- About (two-column layout with image)
- Services (3-card grid)
- Portfolio (6-item grid)
- Contact/CTA (cyan accent background)
- Footer

## Configuration Notes

### Next.js Config
- **Static Export**: Configured with `output: 'export'` for static site generation
- TypeScript build errors are ignored (`ignoreBuildErrors: true`)
- Image optimization is disabled (`unoptimized: true`) - required for static export

### TypeScript
- Strict mode enabled
- Path alias: `@/*` maps to `./*`
- JSX runtime: `react-jsx` (new transform)
- Target: ES6

### Styling Configuration
- Tailwind config file is not present (v4 uses CSS-based config)
- PostCSS uses `@tailwindcss/postcss` plugin only
- Base color: neutral
- Border radius: 0.75rem (--radius)

## Important Context

- **v0 Export**: This project was exported from Vercel v0.app (mentioned in metadata)
- **Deployment**: Configured as a static site - the `out/` directory after build contains the complete site
- Phone number: (970) 685-8897
- Email: info@mysite.com (placeholder)
- Brand color: Cyan (specifically cyan-500 and cyan-600)
- Serves: Fort Collins, Loveland, Greeley, Windsor, CO areas

## Static Site Deployment

After running `pnpm build`, deploy the `out/` directory to any static host:
- **GitHub Pages**: Push to gh-pages branch or use GitHub Actions
- **Netlify**: Connect repo or drag-and-drop the `out/` folder
- **Cloudflare Pages**: Connect repo or use Wrangler CLI
- **AWS S3/CloudFront**: Upload `out/` contents to S3 bucket
- **Any web server**: Serve the `out/` directory as static files

### Adding Analytics (Optional)

Vercel Analytics is currently disabled. To add analytics:
1. **Google Analytics**: Add script to `app/layout.tsx`
2. **Plausible**: Add script tag or use next-plausible package
3. **Umami**: Self-hosted analytics option
4. **Simple Analytics**: Privacy-focused alternative

## When Making Changes

- Use pnpm for package management
- Maintain the shadcn/ui component structure
- Respect the existing color system (OKLCH with CSS variables)
- Keep "use client" directives on components
- Use the `cn()` utility for conditional classes
- Follow the existing component patterns in `components/ui/`
