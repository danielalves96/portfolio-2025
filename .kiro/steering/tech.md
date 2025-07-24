# Technology Stack

## Framework & Runtime

- **Next.js 15.4.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.8.3** - Type safety and development experience
- **Node.js** - Runtime environment

## Styling & UI

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style)
- **Framer Motion 12.23.9** - Animation library
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets
- **next-themes** - Dark/light theme support

## Development Tools

- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting with Next.js and Prettier integration
- **Prettier** - Code formatting with import sorting
- **pnpm** - Package manager

## Key Libraries

- **Radix UI** - Headless UI primitives
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional CSS classes
- **Zod** - Schema validation
- **Resend** - Email service integration

## Common Commands

### Development

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality

```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues automatically
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
```

## Build Configuration

- **SWC Compiler** - Fast TypeScript/JavaScript compilation
- **Console removal** in production builds
- **Path aliases** - `@/*` maps to `./src/*`
- **Strict TypeScript** configuration
