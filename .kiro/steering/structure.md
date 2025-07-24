# Project Structure & Architecture

## Directory Organization

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── send/          # Email sending endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── magicui/          # Third-party UI components
│   ├── sections/         # Page section components
│   ├── ui/               # shadcn/ui components
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx  # Theme switcher component
└── lib/                  # Utility functions
    └── utils.ts          # Common utilities (cn function)

public/                   # Static assets
├── headshot/            # Profile images
├── projects/            # Project screenshots
├── skills/              # Skill illustrations
└── tools/               # Tool icons (SVG)
```

## Architecture Patterns

### Component Organization

- **Sections**: Large page sections (`hero-section.tsx`, `about-section.tsx`, etc.)
- **UI Components**: Reusable shadcn/ui components in `components/ui/`
- **Layout Components**: Theme provider and toggle components
- **Magic UI**: Third-party animation components

### File Naming Conventions

- **kebab-case** for all files and directories
- **PascalCase** for React component exports
- **Descriptive names** that indicate component purpose

### Import Structure (Prettier sorted)

1. React imports
2. Next.js imports
3. Third-party libraries
4. Internal imports with `@/` alias
5. Relative imports

### Styling Approach

- **Tailwind CSS** utility classes for styling
- **CSS Variables** for theme colors
- **Responsive design** with mobile-first approach
- **Dark/light theme** support throughout

### Component Patterns

- **Client components** marked with `'use client'` directive
- **Server components** by default (App Router)
- **Compound components** for complex UI elements
- **Custom hooks** for reusable logic (useEffect for scroll handling)

### Asset Management

- **Organized by type** in public directory
- **Optimized images** using Next.js Image component
- **SVG icons** for tools and social links
- **Consistent naming** for related assets

### State Management

- **React hooks** for local component state
- **Theme context** for global theme state
- **No external state management** (simple portfolio site)
