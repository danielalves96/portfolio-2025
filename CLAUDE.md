# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager. Key commands:

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

## Architecture Overview

This is a Next.js 15 portfolio application using the App Router with the following key architectural decisions:

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with CSS-in-JS
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Animation**: Framer Motion
- **Theme**: next-themes for dark/light mode
- **Email**: Resend API for contact form
- **Testing**: Jest with React Testing Library
- **Package Manager**: pnpm

### Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/sections/` - Main page sections organized by domain with consistent data pattern
  - `hero/` - Hero section with hero-data.tsx, profile-image, social-links components
  - `about/` - About section with about-data.ts for editable content
  - `projects/` - Projects section with projects-data.ts, header, filters, card, info, image, social-links
  - `contact/` - Contact section with contact-validation.ts, form components
  - `skills/` - Skills carousel with skills-data.ts, skill-item components
  - `services/` - Services section with services-data.ts, header, service-item components
  - `social/` - Social section with social-data.tsx, social-item components
  - `tools/` - Tools section with tools-data.ts, header, tool-item components
  - `footer/` - Footer section with footer-data.ts, navigation, copyright components
- `src/components/` - Reusable React components
  - `ui/` - Base UI components (button, input, etc.)
  - `common/` - Common components (theme, scroll indicator, etc.)
  - `animations/` - Animation components (blur-fade, etc.)
- `src/lib/` - Utility functions and configurations
- `public/` - Static assets organized by type (headshot, projects, skills, tools)

### Key Patterns

- **Component Architecture**: Domain-driven sections with atomic components following clean code principles
- **Data Separation Pattern**: Each section has a `*-data.ts` file containing all editable content, making content management centralized and easy
- **Styling**: Utility-first Tailwind with `cn()` helper for conditional classes
- **Type Safety**: Strict TypeScript with comprehensive compiler options
- **Form Validation**: Zod schemas for API route validation
- **Theme System**: CSS variables with dark/light mode support

### Configuration Notes

- TypeScript configured with strict mode and comprehensive linting rules
- ESLint extends Next.js, TypeScript, and Prettier configurations
- Jest configured for component testing with 80% coverage threshold
- Next.js configured to remove console logs in production
- Husky + lint-staged for pre-commit hooks

### API Routes

- `POST /api/send` - Contact form submission using Resend
  - Requires `RESEND_API_KEY` environment variable
  - Validates input with Zod schema
  - Sends Portuguese-language emails

### Development Notes

- Uses `@/` path alias for src imports
- Portfolio showcases UI/UX design work for "Paola Oliveira"
- Responsive design with mobile-first approach
- Intersection Observer used for scroll-based animations
- Image optimization with Next.js Image component
