# Design Document

## Overview

Este documento descreve a arquitetura e design para refatorar o portfólio da Paola Oliveira aplicando princípios de Clean Code. A refatoração manterá 100% da funcionalidade e aparência visual atual, mas implementará uma arquitetura robusta, escalável e maintível.

## Architecture

### Layered Architecture

Implementaremos uma arquitetura em camadas seguindo os princípios de Clean Architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │     Pages       │  │   Components    │  │   Layouts   │ │
│  │   (App Router)  │  │   (UI/Sections) │  │  (Wrappers) │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                     Business Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │     Hooks       │  │    Services     │  │   Stores    │ │
│  │  (Custom Logic) │  │  (API/External) │  │   (State)   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │     Models      │  │   Repositories  │  │   Adapters  │ │
│  │   (Types/DTOs)  │  │  (Data Access)  │  │ (External)  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure Redesign

```
src/
├── app/                           # Next.js App Router (Presentation)
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                    # UI Components (Presentation)
│   ├── ui/                       # Base UI components (shadcn/ui)
│   ├── common/                   # Shared components
│   ├── sections/                 # Page section components
│   ├── layouts/                  # Layout components
│   └── providers/                # Context providers
├── features/                      # Feature-based modules (Business)
│   ├── portfolio/                # Portfolio feature
│   │   ├── components/           # Feature-specific components
│   │   ├── hooks/                # Feature-specific hooks
│   │   ├── services/             # Feature-specific services
│   │   └── types/                # Feature-specific types
│   ├── contact/                  # Contact feature
│   └── theme/                    # Theme feature
├── shared/                        # Shared utilities (Cross-cutting)
│   ├── lib/                      # Utility functions
│   ├── hooks/                    # Shared custom hooks
│   ├── constants/                # Application constants
│   ├── types/                    # Shared type definitions
│   └── config/                   # Configuration files
├── data/                          # Data layer
│   ├── models/                   # Data models and DTOs
│   ├── repositories/             # Data access layer
│   └── adapters/                 # External service adapters
└── __tests__/                     # Test files
    ├── components/               # Component tests
    ├── features/                 # Feature tests
    └── shared/                   # Shared utility tests
```

## Components and Interfaces

### Component Architecture

#### 1. Atomic Design Pattern

```typescript
// Atoms: Basic building blocks
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Molecules: Simple combinations
interface SocialLinkProps {
  platform: SocialPlatform;
  url: string;
  size?: 'sm' | 'md' | 'lg';
}

// Organisms: Complex components
interface HeroSectionProps {
  profile: ProfileData;
  socialLinks: SocialLink[];
  quote: QuoteData;
}
```

#### 2. Composition Pattern

```typescript
// Compound components for complex UI
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  decorator?: React.ReactNode;
}

// Usage: <Section><Section.Header /><Section.Content /></Section>
```

#### 3. Render Props & Custom Hooks

```typescript
// Custom hooks for business logic
interface UseScrollIndicatorReturn {
  showIndicator: boolean;
  scrollProgress: number;
}

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

### Interface Definitions

#### Core Data Models

```typescript
// Portfolio data models
interface ProfileData {
  name: string;
  title: string;
  bio: string;
  image: ImageData;
  quote: QuoteData;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: ImageData;
  technologies: Technology[];
  links: ProjectLink[];
}

interface SkillData {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
}
```

#### Service Interfaces

```typescript
// Email service interface
interface EmailService {
  sendContactForm(data: ContactFormData): Promise<EmailResult>;
}

// Analytics service interface
interface AnalyticsService {
  trackEvent(event: AnalyticsEvent): void;
  trackPageView(page: string): void;
}
```

## Data Models

### Type System Design

#### 1. Strict Type Definitions

```typescript
// Enums for controlled values
enum SocialPlatform {
  LINKEDIN = 'linkedin',
  BEHANCE = 'behance',
  DRIBBBLE = 'dribbble',
  GITHUB = 'github',
}

enum SkillCategory {
  DESIGN = 'design',
  DEVELOPMENT = 'development',
  TOOLS = 'tools',
}

// Union types for variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ThemeMode = 'light' | 'dark' | 'system';
```

#### 2. Data Transfer Objects (DTOs)

```typescript
// API request/response types
interface ContactFormDTO {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface EmailResponseDTO {
  success: boolean;
  messageId?: string;
  error?: string;
}
```

#### 3. Domain Models

```typescript
// Rich domain models with validation
class ContactForm {
  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly message: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name.trim()) throw new Error('Name is required');
    if (!this.isValidEmail(this.email)) throw new Error('Invalid email');
    if (!this.message.trim()) throw new Error('Message is required');
  }

  toDTO(): ContactFormDTO {
    return {
      name: this.name,
      email: this.email,
      message: this.message,
      timestamp: new Date().toISOString(),
    };
  }
}
```

## Error Handling

### Error Boundary Strategy

#### 1. Global Error Boundary

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class GlobalErrorBoundary extends Component<Props, ErrorBoundaryState> {
  // Catches all unhandled errors in component tree
  // Provides fallback UI
  // Logs errors for monitoring
}
```

#### 2. Feature-Specific Error Boundaries

```typescript
// Isolated error handling for features
<ContactFormErrorBoundary>
  <ContactSection />
</ContactFormErrorBoundary>

<ProjectsErrorBoundary>
  <ProjectsSection />
</ProjectsErrorBoundary>
```

#### 3. Error Handling Patterns

```typescript
// Result pattern for operations that can fail
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Usage in services
async function sendEmail(
  data: ContactFormData
): Promise<Result<EmailResponse>> {
  try {
    const response = await emailService.send(data);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

## Testing Strategy

### Testing Pyramid

#### 1. Unit Tests (70%)

```typescript
// Component testing with React Testing Library
describe('HeroSection', () => {
  it('should render profile information correctly', () => {
    const mockProfile = createMockProfile();
    render(<HeroSection profile={mockProfile} />);

    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.title)).toBeInTheDocument();
  });
});

// Hook testing
describe('useScrollIndicator', () => {
  it('should hide indicator when scrolled', () => {
    const { result } = renderHook(() => useScrollIndicator());

    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 100 } });
    });

    expect(result.current.showIndicator).toBe(false);
  });
});
```

#### 2. Integration Tests (20%)

```typescript
// Feature integration tests
describe('Contact Form Integration', () => {
  it('should submit form and show success message', async () => {
    const mockEmailService = jest.fn().mockResolvedValue({ success: true });

    render(<ContactSection emailService={mockEmailService} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello!');

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });
});
```

#### 3. E2E Tests (10%)

```typescript
// Playwright/Cypress tests for critical user journeys
describe('Portfolio Navigation', () => {
  it('should navigate through all sections', () => {
    cy.visit('/');
    cy.get('[data-testid="hero-section"]').should('be.visible');

    cy.scrollTo('bottom');
    cy.get('[data-testid="contact-section"]').should('be.visible');

    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('have.class', 'dark');
  });
});
```

### Test Configuration

```typescript
// Jest configuration for different test types
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}',
    '<rootDir>/src/**/*.test.{ts,tsx}',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__tests__/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Performance Optimization

### Code Splitting Strategy

```typescript
// Route-based splitting (already implemented with App Router)
// Component-based splitting for heavy components
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

// Feature-based splitting
const PortfolioFeature = lazy(() => import('../features/portfolio'));
```

### Memoization Strategy

```typescript
// Expensive calculations
const memoizedSkillsData = useMemo(
  () => processSkillsData(rawSkillsData),
  [rawSkillsData]
);

// Component memoization
const MemoizedProjectCard = memo(
  ProjectCard,
  (prev, next) => prev.project.id === next.project.id
);
```

### Asset Optimization

```typescript
// Image optimization with Next.js Image component
<Image
  src={project.image.src}
  alt={project.image.alt}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL={project.image.blurDataURL}
  loading="lazy"
/>
```

## State Management

### State Architecture

```typescript
// Local state for UI interactions
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Shared state with Context API
interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Server state with React Query (if needed for future API calls)
const { data: projects, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
});
```

### Context Providers Structure

```typescript
// Nested providers for different concerns
<ThemeProvider>
  <AnalyticsProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </AnalyticsProvider>
</ThemeProvider>
```

## Migration Strategy

### Phase 1: Foundation

1. Setup new directory structure
2. Create base types and interfaces
3. Implement utility functions and constants
4. Setup testing infrastructure

### Phase 2: Component Refactoring

1. Refactor UI components with proper typing
2. Extract business logic into custom hooks
3. Implement error boundaries
4. Add comprehensive tests

### Phase 3: Feature Organization

1. Organize code into feature modules
2. Implement service layer
3. Add performance optimizations
4. Complete test coverage

### Phase 4: Quality Assurance

1. Code review and cleanup
2. Performance testing
3. Accessibility audit
4. Final integration testing

## Quality Gates

### Code Quality Metrics

- TypeScript strict mode compliance: 100%
- Test coverage: >80%
- ESLint violations: 0
- Performance budget: <100KB initial bundle
- Accessibility: WCAG 2.1 AA compliance

### Automated Checks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test && npm run build"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --findRelatedTests"
    ]
  }
}
```
