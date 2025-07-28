# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product Overview

This is a **portfolio website for Paola Oliveira**, a UI/UX Designer. The application serves as a comprehensive showcase of her work, skills, and professional background.

### Key Features

- **Dynamic Content Management**: Admin interface for updating portfolio content without code changes
- **Portfolio Showcase**: Projects, services, skills, and tools display with filtering capabilities
- **Contact System**: Integrated contact form with email functionality via Resend API
- **Responsive Design**: Mobile-first approach with dark theme support
- **Performance Optimized**: Built with Next.js 15, lazy loading, and modern web technologies
- **Advanced SEO**: Structured data, dynamic sitemap, canonical URLs, and Open Graph optimization
- **Lazy Loading**: Intersection Observer-based loading with skeleton placeholders
- **Image Optimization**: Priority-based loading with responsive sizes and Next.js Image component

### Target Audience

- Potential clients looking for UI/UX design services
- Employers and recruiters in the design industry
- Fellow designers and creative professionals
- Anyone interested in Paola's design work and capabilities

### Content Sections

- Hero section with profile and introduction
- About section with personal background
- Projects portfolio with filtering capabilities
- Services offered with detailed descriptions
- Skills and tools expertise showcase
- Social media presence integration
- Contact information and form

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

**Framework & Runtime:**

- **Next.js 15.4.3** with App Router
- **React 19.1.0** with TypeScript
- **Node.js** runtime environment
- **TypeScript 5.8.3** with strict configuration

**Database & ORM:**

- **PostgreSQL** database with connection pooling
- **Drizzle ORM** for type-safe database operations
- **Drizzle Kit** for migrations and schema management
- **Server Actions** for data fetching with revalidation

**Styling & UI:**

- **Tailwind CSS 4.1.11** for styling with custom animations
- **Radix UI** components for accessible primitives
- **shadcn/ui** component patterns and design system
- **Framer Motion** for smooth animations and transitions
- **Lucide React** and **React Icons** for comprehensive iconography
- **next-themes** for dark/light theme support

**Storage & Communication:**

- **AWS S3** (Zenko-compatible) for file storage and image uploads
- **Resend** API for email functionality and contact forms
- **Sonner** for toast notifications
- **Zod** schemas for form and API validation

**Development Tools:**

- **pnpm** as package manager
- **ESLint** with Next.js and Prettier integration
- **Prettier** with import sorting plugin for code formatting
- **Husky** for git hooks with lint-staged
- **Turbopack** for fast development builds
- **SWC** compiler for production optimization

**Testing:**

- **Jest** with jsdom environment
- **React Testing Library** for component testing
- 80% coverage threshold for quality assurance
- **Current Coverage**: ~5% (needs improvement - see Development Notes)

**Authentication & Security:**

- **Simple Cookie-based Authentication**: Intentionally basic auth system for this portfolio project
  - Environment-configurable credentials (ADMIN_EMAIL, ADMIN_PASSWORD)
  - Secure cookie storage with 7-day expiration
  - Middleware-protected admin routes
  - **Note**: This authentication system is appropriate for a personal portfolio with single admin access
- **Input Validation**: Zod schemas for all forms and API inputs
- **Environment-based Configuration**: All sensitive data in environment variables

### Project Structure

#### Root Directory

- **Configuration files**: Package management (pnpm), build tools, linting, and formatting configs
- **Database migrations**: `drizzle/` contains SQL migrations and metadata
- **Environment files**: `.env` and `.env.local` for configuration

#### Source Code Organization (`src/`)

**App Router (`src/app/`):**

- **Next.js 15 App Router** structure with route-based organization
- **Route groups**: `/admin` for content management, `/login` for authentication
- **Global styles**: `globals.css` with Tailwind imports
- **Root layout**: Theme provider and global components setup
- `page.tsx` - Main portfolio page

**Components (`src/components/`):**

```
components/
├── admin/          # Admin interface components
│   ├── *-admin.tsx # CRUD interfaces for each content section
│   ├── icon-selector.tsx # React Icons picker component
│   ├── admin-header.tsx # Admin navigation and logout
│   └── image-upload.tsx # S3 image upload with drag-and-drop
├── animations/     # Reusable animation components (blur-fade, text-animate)
├── auth/          # Authentication related components
├── common/        # Shared utility components (theme, scroll indicators)
└── ui/            # Base UI components (shadcn/ui style)
```

**Sections (`src/sections/`):**
**Feature-based organization** - each major page section has its own folder:

```
sections/
├── about/         # About section components
├── contact/       # Contact form and validation
├── footer/        # Footer with navigation and copyright
├── hero/          # Hero section with profile and title
├── projects/      # Portfolio projects with filtering
├── services/      # Services offered
├── skills/        # Skills carousel
├── social/        # Social media links
└── tools/         # Tools and technologies
```

**Library Code (`src/lib/`):**

```
lib/
├── actions/       # Server actions for data operations
│   ├── admin-actions.ts # CRUD operations for all content types
│   ├── data-fetching.ts # Data retrieval functions
│   ├── send-email.ts # Email sending functionality
│   ├── upload-actions.ts # S3 image upload functionality
│   └── auth-actions.ts # Login/logout server actions
├── db/           # Database connection and schema
│   ├── schema.ts # Drizzle schema definitions for all tables
│   ├── connection.ts # PostgreSQL connection with pooling
│   └── seed.ts # Database seeding from static data files
├── storage/      # Storage configuration
│   └── s3-client.ts # Zenko S3-compatible client configuration
├── hooks/        # Custom React hooks
└── utils.ts      # Utility functions (cn for className merging)
```

**Testing (`src/__tests__/`):**

- **Jest configuration** with React Testing Library
- **Test utilities** for consistent testing setup
- **Example tests** demonstrating patterns

**Authentication & Middleware:**

- `src/middleware.ts` - Route protection middleware for admin routes

**Static Assets:**

- `public/` - Static files organized by content type
  - `headshot/` - Profile images
  - `projects/` - Project screenshots
  - `skills/` - Skill-related images
  - `tools/` - Tool icons and logos

#### Key Architectural Patterns

**Database Schema Pattern:**

- **Single table per content type** (hero, about, projects, etc.)
- **JSON columns** for arrays (tags, categories, paragraphs)
- **Serial IDs** as primary keys
- **Drizzle ORM** with type-safe queries

**Server Actions Pattern:**

- **'use server'** directive for server-side operations
- **CRUD operations** for each content type
- **revalidatePath()** for cache invalidation
- **Consistent error handling** with try/catch blocks

**Component Organization Pattern:**

- **Feature folders** group related components
- **Separation of concerns**: data fetching, UI, and business logic
- **Reusable animations** in dedicated folder
- **UI primitives** following shadcn/ui patterns

**Import Organization:**
Prettier plugin enforces import order:

1. React imports
2. Next.js imports
3. Third-party modules
4. Internal modules (@/ paths)
5. Relative imports

**File Naming Conventions:**

- **kebab-case** for files and folders
- **PascalCase** for React components
- **camelCase** for functions and variables
- **Descriptive names** that indicate purpose

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
- **Image Upload System**: Direct upload to Zenko S3-compatible storage with drag-and-drop
- **Ordering System**: Drag-and-drop ordering for navigation items
- **Rich Text Support**: JSON-based paragraph management
- **External Links**: Management of Figma, Dribbble, and Behance links

**Security:**

- Cookie-based authentication with configurable credentials
- Middleware protection for all admin routes
- Environment-based security configuration

### Recent Improvements (2025)

**SEO Optimization:**

- **Structured Data**: Schema.org markup for Person, Website, CreativeWork, and Organization
- **Dynamic Sitemap**: Database-driven sitemap generation with project URLs
- **Canonical URLs**: Proper canonical URL implementation for duplicate content prevention
- **Open Graph**: Corrected OG image references and comprehensive social media tags
- **Breadcrumb Navigation**: Structured data for improved search engine understanding

**Performance Optimization:**

- **Lazy Loading**: Intersection Observer-based loading with priority system (high/medium/low)
- **Skeleton Loading**: Custom skeleton components to prevent layout shift
- **Image Optimization**: Priority-based loading, responsive sizes, and lazy loading for non-critical images
- **Code Splitting**: React.lazy() implementation for non-critical sections
- **Bundle Analysis**: Optimized bundle size through progressive loading

**Developer Experience:**

- **TypeScript Configuration**: Currently using relaxed mode (strict mode is next priority)
- **Enhanced Error Handling**: Basic try/catch with plans for comprehensive error boundaries
- **Advanced Tooling**: Husky, lint-staged, and comprehensive formatting rules

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
- `SCALITY_ACCESS_KEY_ID` - Zenko S3 access key for image uploads
- `SCALITY_SECRET_ACCESS_KEY` - Zenko S3 secret key for image uploads

**Development Configuration:**

- TypeScript strict mode with comprehensive compiler options
- ESLint extends Next.js, TypeScript, and Prettier configurations
- Jest configured for component testing with 80% coverage threshold
- Next.js removes console logs in production builds
- Husky + lint-staged for pre-commit code quality checks

### Build Configuration

- **Turbopack** for fast development builds with hot reloading
- **SWC** compiler for production optimization and faster builds
- **Console removal** in production builds for cleaner output
- **Server actions** with 40mb body size limit for large file uploads
- **Next.js Image** optimization for automatic image compression and formats
- **Static optimization** for pages without server-side data requirements

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

### Image Upload System

**Zenko S3-Compatible Storage:**

- **Storage Endpoint**: Zenko S3-compatible storage at `https://l0la-storage.kyantech.com.br`
- **Bucket**: `portfolio-assets` for all uploaded images (auto-created)
- **Upload Component**: Drag-and-drop ImageUpload component with preview
- **File Validation**: Support for JPEG, PNG, WebP, SVG with 5MB size limit
- **Unique Naming**: UUID-based filenames to prevent conflicts
- **Public Access**: Uploaded images accessible via `https://l0la-storage.kyantech.com.br/portfolio-assets/[filename]`
- **Integration**: Replaces manual URL input fields in all admin forms
- **Setup**: Requires specific Zenko configuration (see ZENKO-SETUP.md)

**Upload Workflow:**

1. User drags/drops or selects image file in admin form
2. File is validated (type, size) on client-side
3. File is uploaded to Zenko S3 via server action
4. Public URL is returned and saved to database
5. Image preview is shown with remove option

### Development Notes

**Key Implementation Details:**

- Uses `@/` path alias for all src imports
- Portfolio showcases UI/UX design work for "Paola Oliveira"
- Responsive design with mobile-first approach
- Intersection Observer for scroll-based animations and lazy loading
- Next.js Image component for optimized image loading with priority settings
- Dark theme as default with system theme support disabled
- Lazy loading system with skeleton placeholders to prevent layout shift

**Important Components:**

- `LazySection` (`src/components/common/lazy-section.tsx`): Intersection Observer wrapper for performance
- `section-skeletons.tsx`: Custom skeleton loaders for each section type
- `lazy-sections.tsx`: React.lazy() wrappers for code splitting
- `structured-data.tsx`: SEO Schema.org markup components
- `ImageUpload` (`src/components/admin/image-upload.tsx`): S3-compatible file upload with drag-and-drop

**Next Development Priorities:**

1. **TypeScript Strict Mode**: Enable strict type checking (noImplicitAny, noImplicitReturns, etc.)
2. **Test Coverage**: Increase from current ~5% to target 80%
3. **Error Boundaries**: Implement comprehensive error handling
4. **Accessibility**: Improve ARIA attributes and keyboard navigation

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
4. Upload images via drag-and-drop or file picker
5. Changes immediately reflect on live site
6. Use icon picker for social links and visual elements

**Authentication Philosophy:**

The current cookie-based authentication system is **intentionally simple and appropriate** for this portfolio project:

- **Single Admin User**: Only Paola needs access, no multi-user complexity required
- **Portfolio Context**: This is a personal portfolio, not a multi-tenant SaaS application
- **Sufficient Security**: Environment-based credentials with secure cookies provide adequate protection
- **Maintenance**: Simple system reduces maintenance overhead and potential security holes
- **Performance**: No JWT overhead or complex session management needed

**Do NOT** implement complex authentication (JWT, OAuth, role-based access) as it would be over-engineering for this use case.

## Command Reference

### Development Commands

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality Commands

```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues automatically
pnpm format       # Format code with Prettier
pnpm format:check # Check formatting without making changes
```

### Testing Commands

```bash
pnpm test         # Run Jest tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
```

### Database Commands

```bash
pnpm db:generate  # Generate migrations from schema changes
pnpm db:push      # Push schema changes directly to database
pnpm db:migrate   # Run pending migrations
pnpm db:studio    # Open Drizzle Studio for database management
pnpm db:seed      # Seed database with initial data
```

### Workflow Tips

- Use `pnpm db:generate` after modifying schema in `src/lib/db/schema.ts`
- Use `pnpm db:push` for development or `pnpm db:migrate` for production
- Run `pnpm lint:fix` and `pnpm format` before committing changes
- Access database visually with `pnpm db:studio` at `http://localhost:4983`
- Reseed database with fresh data using `pnpm db:seed` when needed
