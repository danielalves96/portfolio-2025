# Project Structure

## Root Directory

- **Configuration files**: Package management, build tools, linting, and formatting configs
- **Database migrations**: `drizzle/` contains SQL migrations and metadata
- **Environment files**: `.env` and `.env.local` for configuration

## Source Code Organization (`src/`)

### App Router (`src/app/`)

- **Next.js 15 App Router** structure
- **Route groups**: `/admin` for content management, `/login` for authentication
- **Global styles**: `globals.css` with Tailwind imports
- **Root layout**: Theme provider and global components setup

### Components (`src/components/`)

```
components/
├── admin/          # Admin interface components
├── animations/     # Reusable animation components (blur-fade, text-animate)
├── auth/          # Authentication related components
├── common/        # Shared utility components (theme, scroll indicators)
└── ui/            # Base UI components (shadcn/ui style)
```

### Sections (`src/sections/`)

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

### Library Code (`src/lib/`)

```
lib/
├── actions/       # Server actions for data operations
├── db/           # Database connection and schema
├── storage/      # AWS S3 client and setup
└── utils.ts      # Utility functions (cn for className merging)
```

### Testing (`src/__tests__/`)

- **Jest configuration** with React Testing Library
- **Test utilities** for consistent testing setup
- **Example tests** demonstrating patterns

## Key Architectural Patterns

### Database Schema

- **Single table per content type** (hero, about, projects, etc.)
- **JSON columns** for arrays (tags, categories, paragraphs)
- **Serial IDs** as primary keys
- **Drizzle ORM** with type-safe queries

### Server Actions Pattern

- **'use server'** directive for server-side operations
- **CRUD operations** for each content type
- **revalidatePath()** for cache invalidation
- **Consistent error handling** with try/catch blocks

### Component Organization

- **Feature folders** group related components
- **Separation of concerns**: data fetching, UI, and business logic
- **Reusable animations** in dedicated folder
- **UI primitives** following shadcn/ui patterns

### Import Organization

Prettier plugin enforces import order:

1. React imports
2. Next.js imports
3. Third-party modules
4. Internal modules (@/ paths)
5. Relative imports

### File Naming Conventions

- **kebab-case** for files and folders
- **PascalCase** for React components
- **camelCase** for functions and variables
- **Descriptive names** that indicate purpose
