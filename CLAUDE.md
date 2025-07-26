# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager. Key commands:

**Core Development:**

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

**Database Management:**

- `pnpm db:generate` - Generate Drizzle migrations from schema changes
- `pnpm db:push` - Push schema changes directly to database
- `pnpm db:migrate` - Run pending migrations
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm db:seed` - Seed database with initial data from static files

## Architecture Overview

This is a Next.js 15 portfolio application with a complete admin panel and database integration, using the App Router with the following key architectural decisions:

### Tech Stack

**Core Framework:**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.8.3 with strict mode enabled
- **Runtime**: React 19.1.0

**Database & Data Management:**

- **Database**: PostgreSQL with connection pooling
- **ORM**: Drizzle ORM with TypeScript schema
- **Migrations**: Drizzle Kit for schema management
- **Data Fetching**: Server Actions with revalidation

**Authentication & Security:**

- **Authentication**: Cookie-based session management
- **Authorization**: Middleware-protected admin routes
- **Environment**: Configurable admin credentials

**Styling & UI:**

- **Styling**: Tailwind CSS v4 with custom animations
- **Components**: Radix UI primitives with shadcn/ui components
- **Icons**: React Icons library with comprehensive icon selector
- **Animation**: Framer Motion for smooth transitions
- **Theme**: next-themes for dark/light mode support

**Communication:**

- **Email**: Resend API for contact form submissions
- **Notifications**: Sonner for toast notifications
- **Validation**: Zod schemas for form and API validation

**Development Tools:**

- **Package Manager**: pnpm
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint + Prettier + Husky pre-commit hooks
- **Build**: Turbopack for development

### Project Structure

**Core Application:**

- `src/app/` - Next.js App Router pages, API routes, and layouts
  - `admin/` - Complete admin panel with protected routes
  - `login/` - Authentication pages
  - `page.tsx` - Main portfolio page

**Admin System:**

- `src/components/admin/` - Admin-specific components
  - `*-admin.tsx` - CRUD interfaces for each content section
  - `icon-selector.tsx` - React Icons picker component
  - `admin-header.tsx` - Admin navigation and logout

**Authentication:**

- `src/components/auth/` - Authentication components
- `src/middleware.ts` - Route protection middleware
- `src/lib/actions/auth-actions.ts` - Login/logout server actions

**Database Layer:**

- `src/lib/db/` - Database configuration and schema
  - `schema.ts` - Drizzle schema definitions for all tables
  - `connection.ts` - PostgreSQL connection with pooling
  - `seed.ts` - Database seeding from static data files
- `drizzle/` - Migration files and metadata

**Content Sections:**

- `src/sections/` - Portfolio sections (now database-driven)
  - `hero/` - Hero section with profile and social links
  - `about/` - About section with editable biography
  - `projects/` - Projects with categories, tags, and external links
  - `services/` - Services offered with descriptions
  - `skills/` - Skills carousel with dynamic content
  - `tools/` - Tools and technologies showcase
  - `social/` - Social media presence section
  - `contact/` - Contact form with email integration
  - `footer/` - Footer with navigation and copyright

**Shared Components:**

- `src/components/ui/` - Base UI components (button, input, dialog, etc.)
- `src/components/common/` - Common components (theme toggle, admin float button)
- `src/components/animations/` - Animation components (blur-fade, text-animate)

**Utilities & Actions:**

- `src/lib/actions/` - Server actions for data operations
  - `admin-actions.ts` - CRUD operations for all content types
  - `data-fetching.ts` - Data retrieval functions
  - `send-email.ts` - Email sending functionality
- `src/lib/` - Utility functions and configurations
- `src/hooks/` - Custom React hooks

**Static Assets:**

- `public/` - Static files organized by content type
  - `headshot/` - Profile images
  - `projects/` - Project screenshots
  - `skills/` - Skill-related images
  - `tools/` - Tool icons and logos

### Database Schema

The application uses 11 main database tables:

**Core Content Tables:**

1. **about** - Personal information (name, city, role, biography paragraphs)
2. **hero** - Hero section (title lines, profile info, inspirational quote)
3. **contact** - Contact form configuration and email settings
4. **footer** - Footer copyright text and branding

**Dynamic Content Tables:** 5. **projects** - Portfolio projects with categories, tags, descriptions, and external links 6. **services** - Services offered with descriptions and images 7. **skills** - Skills list for carousel display 8. **tools** - Tools and technologies with names and icons 9. **social_section** - Social media showcase with descriptions

**Navigation & Links:** 10. **social_links** - Social media links in hero section with React Icons integration 11. **footer_navigation** - Footer navigation items with ordering

### Admin Panel Features

**Complete CRUD System:**

- Dashboard overview at `/admin` with section management
- Individual admin pages for each content type
- Real-time content editing with immediate preview
- Form validation and error handling
- Toast notifications for user feedback

**Advanced Features:**

- **React Icons Integration**: Comprehensive icon picker with search functionality
- **Image Management**: File path management for all images
- **Ordering System**: Drag-and-drop ordering for navigation items
- **Rich Text Support**: JSON-based paragraph management
- **External Links**: Management of Figma, Dribbble, and Behance links

**Security:**

- Cookie-based authentication with configurable credentials
- Middleware protection for all admin routes
- Environment-based security configuration

### Key Patterns & Changes from Original

**Database-First Architecture:**

- **Migration from Static to Dynamic**: All content moved from static `*-data.ts` files to PostgreSQL tables
- **Server Actions**: All CRUD operations use Next.js 15 server actions
- **Real-time Updates**: Content changes immediately reflect on the site via revalidation

**Admin-Driven Content Management:**

- **No-Code Editing**: Content creators can manage all site content without code changes
- **Visual Icon Selection**: React Icons integration replaces static SVG management
- **Structured Content**: JSON fields for complex content like paragraphs and categories

**Hybrid Data Approach:**

- **Seed Data**: Original `*-data.ts` files serve as seed data for database initialization
- **Dynamic Loading**: Components fetch data from database via server actions
- **Fallback Support**: Graceful handling of missing database content

### Configuration Notes

**Environment Variables Required:**

- `DATABASE_URL` - PostgreSQL connection string
- `ADMIN_EMAIL` - Admin login email (defaults to paolatoliveira@gmail.com)
- `ADMIN_PASSWORD` - Admin login password (defaults to P&d011217)
- `RESEND_API_KEY` - Resend API key for email functionality

**Development Configuration:**

- TypeScript strict mode with comprehensive compiler options
- ESLint extends Next.js, TypeScript, and Prettier configurations
- Jest configured for component testing with 80% coverage threshold
- Next.js removes console logs in production builds
- Husky + lint-staged for pre-commit code quality checks

### Authentication System

**Simple Cookie-Based Auth:**

- Login form at `/login` with email/password validation
- Secure cookie storage with configurable expiration (7 days)
- Middleware protection for all `/admin` routes
- Environment-based credential configuration

**Admin Access:**

- Protected admin dashboard with section overview
- Individual admin pages for each content type
- Floating admin button on main site when authenticated
- Logout functionality with cookie clearing

### Email Integration

**Resend API Integration:**

- Contact form submissions sent via Resend
- Portuguese-language email templates
- HTML email formatting with user data
- Form validation with Zod schemas
- Configurable sender/recipient settings

### Development Notes

**Key Implementation Details:**

- Uses `@/` path alias for all src imports
- Portfolio showcases UI/UX design work for "Paola Oliveira"
- Responsive design with mobile-first approach
- Intersection Observer for scroll-based animations
- Next.js Image component for optimized image loading
- Dark theme as default with system theme support disabled

**Database Workflow:**

1. Modify schema in `src/lib/db/schema.ts`
2. Generate migration with `pnpm db:generate`
3. Apply migration with `pnpm db:push` or `pnpm db:migrate`
4. Update seed data in `src/lib/db/seed.ts` if needed
5. Reseed database with `pnpm db:seed`

**Content Management Workflow:**

1. Access admin panel at `/admin` (requires authentication)
2. Select content section to edit
3. Use forms to create, update, or delete content
4. Changes immediately reflect on live site
5. Use icon picker for social links and visual elements
