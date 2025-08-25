# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern, futuristic Next.js portfolio website for Talha Malik, featuring 3D animations, interactive bubble effects, and AI-themed styling. The project showcases a full-stack developer's skills with an emphasis on cutting-edge web technologies.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Common Development Tasks
```bash
# Install dependencies
npm install

# Clean build artifacts and reinstall
rm -rf .next node_modules package-lock.json && npm install

# Check TypeScript without emitting files
npx tsc --noEmit

# Run development server on specific port
npm run dev -- -p 3001
```

## Architecture Overview

### Framework & Core Technologies
- **Next.js 15.4.6** with App Router (app directory structure)
- **React 19** with React Server Components
- **TypeScript** for type safety
- **Tailwind CSS v4** with custom design tokens and animations
- **Framer Motion** for advanced animations and interactions
- **Three.js + React Three Fiber** for 3D graphics and models

### Project Structure
```
├── app/                          # Next.js App Router
│   ├── _components/             # Page-specific components
│   │   ├── hero-section.tsx     # Main landing section with 3D elements
│   │   ├── about-section.tsx    # About information
│   │   ├── projects-section.tsx # Portfolio projects showcase
│   │   └── contact-section.tsx  # Contact form and information
│   ├── globals.css             # Global styles and custom animations
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx               # Home page composition
├── components/                # Reusable UI components
│   ├── ui/                   # shadcn/ui components (auto-generated)
│   ├── 3d/                   # Three.js/React Three Fiber components
│   ├── bubble-effects.tsx    # Interactive bubble cursor and animations
│   ├── navbar.tsx           # Navigation component
│   ├── footer.tsx           # Footer component
│   └── loader.tsx           # Loading component
├── lib/                     # Utility functions
│   └── utils.ts            # cn() utility for class merging
└── public/                 # Static assets and SVG icons
```

### Design System & Theming
- **shadcn/ui** components with "new-york" style variant
- Custom **futuristic color palette** using OKLCH color space
- **Dark theme** optimized with electric purple/cyan accents
- **Custom fonts**: Orbitron (headings), Space Grotesk (body), JetBrains Mono (code)
- **Advanced CSS animations** with custom keyframes for sci-fi effects

### Key Features & Components

#### Interactive Bubble System
- `BubbleCursor`: Interactive cursor with trailing bubble effects
- `BubbleField`: Animated background bubbles with responsive optimization
- `BubbleSection`: Wrapper component with text inversion effects
- Performance optimizations for mobile devices and reduced motion preferences

#### 3D Integration
- Three.js canvas integration for 3D models and scenes
- `HeroRobotScene`: Main 3D robot model for hero section
- `SceneCanvas`: Reusable 3D scene wrapper component

#### Animation System
- **Framer Motion** for component animations and page transitions
- **Custom CSS keyframes**: matrix-rain, hologram, data-stream, cyber effects
- **Mix-blend-mode effects** for text inversion with bubble interactions
- **Responsive animation scaling** based on screen size and device performance

## Development Guidelines

### Component Organization
- Page-specific components go in `app/_components/`
- Reusable UI components go in `components/`
- 3D-related components go in `components/3d/`
- Follow the established naming conventions (kebab-case for files)

### Styling Conventions
- Use Tailwind classes with the `cn()` utility for conditional styling
- Leverage custom CSS classes defined in `globals.css` for complex animations
- Apply `text-invert` and `text-invert-soft` classes for bubble interaction effects
- Use `hover-through` class for elements that need to work with bubble overlays

### Performance Considerations
- **Bubble animations** are optimized for mobile devices (reduced count and duration)
- **3D components** should implement proper cleanup in useEffect
- **Animation variants** are memoized using useMemo to prevent recreation
- **Reduced motion** preferences are respected for accessibility

### Path Aliases
- `@/*` maps to root directory for clean imports
- Components can import from `@/components/`, `@/lib/`, etc.

### TypeScript Configuration
- Strict mode enabled with comprehensive type checking
- JSX preserved for Next.js handling
- Path mapping configured for `@/*` aliases

## Technology Stack Details

### UI Framework
- **shadcn/ui**: Modern component library with Radix UI primitives
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant API for components

### Animation & 3D
- **Framer Motion 12**: Advanced animation library with layout animations
- **Three.js**: 3D graphics library
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for React Three Fiber

### Development Tools
- **ESLint**: Next.js recommended configuration with TypeScript rules
- **PostCSS**: CSS processing with Tailwind CSS plugin
- **Turbopack**: Enabled for faster development builds

## Common Issues & Solutions

### Hydration Errors
- 3D components and complex animations can cause SSR/client mismatches
- Use `'use client'` directive for interactive components
- Implement proper loading states for 3D models

### Performance on Mobile
- Bubble animations automatically reduce on smaller screens
- 3D components may need conditional rendering based on device capabilities
- Monitor bundle size with interactive imports for Three.js components

### Styling Conflicts
- Use `cn()` utility consistently for class merging
- Test mix-blend-mode effects across different browsers
- Verify contrast ratios with the dark theme color palette

## Build & Deployment

### Production Build
The application builds to a static export compatible with various hosting platforms:
- Optimized for **Vercel** deployment (as indicated in README)
- Supports static site generation for marketing pages
- 3D assets and animations are production-optimized

### Environment Considerations
- No environment variables currently required
- All assets served from `/public` directory
- Font loading optimized with `next/font/google`
