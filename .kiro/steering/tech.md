# Technology Stack

## Framework & Runtime

- **Next.js 15.4.3** with App Router
- **React 19.1.0** with TypeScript
- **Node.js** runtime environment

## Database & ORM

- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Drizzle Kit** for migrations and schema management

## Styling & UI

- **Tailwind CSS 4.1.11** for styling
- **Radix UI** components for accessible primitives
- **Framer Motion** for animations
- **Lucide React** and **React Icons** for iconography
- **next-themes** for dark/light theme support

## Development Tools

- **TypeScript 5.8.3** with strict configuration
- **ESLint** with Next.js and Prettier integration
- **Prettier** with import sorting plugin
- **Husky** for git hooks with lint-staged

## Storage & Email

- **AWS S3** for file storage
- **Resend** for email functionality

## Testing

- **Jest** with jsdom environment
- **React Testing Library** for component testing

## Common Commands

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

### Testing

```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Database

```bash
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database
```

## Build Configuration

- **Turbopack** for fast development builds
- **SWC** compiler for production optimization
- Console removal in production builds
- Server actions with 40mb body size limit
