# Design Document

## Overview

Este documento define o design para melhorias na interface administrativa do portfólio da Paola Oliveira. O foco está em criar uma experiência mais intuitiva, eficiente e visualmente atraente, mantendo consistência com o tema existente baseado em Tailwind CSS e componentes shadcn/ui.

## Architecture

### Design System Foundation

O design será baseado no sistema existente:

- **Tema**: Mantém as variáveis CSS customizadas existentes (oklch colors)
- **Componentes**: Utiliza e estende os componentes shadcn/ui existentes
- **Tipografia**: Open Sans (sans), Merriweather (serif), Geist Mono (mono)
- **Espaçamento**: Sistema baseado em 0.25rem (4px)
- **Bordas**: Radius 0rem (sharp corners) conforme tema atual

### Visual Hierarchy Improvements

1. **Densidade de Informação**
   - Reduzir densidade visual em listas longas
   - Usar espaçamento adequado entre elementos
   - Implementar agrupamento visual claro

2. **Tipografia Melhorada**
   - Hierarquia clara com tamanhos de fonte consistentes
   - Contraste adequado para legibilidade
   - Line-height otimizado para leitura

3. **Sistema de Cores Contextual**
   - Status colors para diferentes estados
   - Cores semânticas para ações (success, warning, error)
   - Uso consistente de primary/secondary colors

## Components and Interfaces

### 1. Enhanced Dashboard Layout

```typescript
interface DashboardLayoutProps {
  sections: AdminSection[];
  currentSection?: string;
  stats?: DashboardStats;
}

interface AdminSection {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  count: number | string;
  status?: 'active' | 'warning' | 'error';
  lastUpdated?: Date;
}
```

**Design Features:**

- Grid layout responsivo (1-2-3 colunas)
- Cards com hover states melhorados
- Indicadores de status visual
- Quick stats no header
- Breadcrumb navigation

### 2. Improved Form Components

```typescript
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
```

**Design Features:**

- Seções colapsáveis para formulários longos
- Validação em tempo real com feedback visual
- Progress indicators para formulários multi-step
- Auto-save indicators
- Field descriptions e help text

### 3. Enhanced Data Display Components

```typescript
interface DataCardProps {
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  actions?: ActionButton[];
  status?: 'draft' | 'published' | 'archived';
  metadata?: Record<string, any>;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  pagination?: PaginationConfig;
  filters?: FilterConfig[];
  sorting?: SortingConfig;
}
```

**Design Features:**

- Cards com aspect ratio consistente
- Thumbnails com fallbacks elegantes
- Badges para categorização
- Actions menu contextual
- Skeleton loading states

### 4. Modal and Dialog Improvements

```typescript
interface EnhancedModalProps {
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  scrollable?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

**Design Features:**

- Tamanhos responsivos
- Scroll interno quando necessário
- Footer fixo para ações
- Loading states durante operações
- Confirmação para ações destrutivas

### 5. Navigation and Layout Components

```typescript
interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

interface SidebarNavigationProps {
  sections: NavigationSection[];
  currentSection: string;
  collapsed?: boolean;
}
```

## Data Models

### Enhanced UI State Management

```typescript
interface UIState {
  loading: {
    global: boolean;
    sections: Record<string, boolean>;
    actions: Record<string, boolean>;
  };

  notifications: {
    toasts: Toast[];
    alerts: Alert[];
  };

  modals: {
    active: string | null;
    data: Record<string, any>;
  };

  preferences: {
    theme: 'light' | 'dark' | 'system';
    density: 'compact' | 'comfortable' | 'spacious';
    sidebarCollapsed: boolean;
  };
}

interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isValid: boolean;
}
```

### Improved Data Structures

```typescript
interface EnhancedProject extends Project {
  status: 'draft' | 'published' | 'archived';
  lastModified: Date;
  createdBy: string;
  version: number;
}

interface AdminMetadata {
  totalItems: number;
  publishedItems: number;
  draftItems: number;
  lastUpdate: Date;
  recentActivity: ActivityItem[];
}
```

## Error Handling

### User-Friendly Error States

1. **Form Validation Errors**
   - Inline validation com mensagens claras
   - Field-level error highlighting
   - Summary de erros no topo do formulário
   - Sugestões de correção quando possível

2. **Network and API Errors**
   - Retry mechanisms com feedback visual
   - Offline state detection
   - Graceful degradation
   - Error boundaries para componentes

3. **Empty States**
   - Ilustrações ou ícones contextuais
   - Mensagens encorajadoras
   - Call-to-action claro
   - Onboarding hints para novos usuários

### Error Recovery Patterns

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

interface RetryableAction {
  action: () => Promise<void>;
  maxRetries: number;
  retryDelay: number;
  onRetry?: (attempt: number) => void;
  onMaxRetriesReached?: () => void;
}
```

## Testing Strategy

### Visual Regression Testing

1. **Component Screenshots**
   - Diferentes estados (loading, error, success)
   - Variações de tema (light/dark)
   - Breakpoints responsivos
   - Estados de interação (hover, focus, active)

2. **User Flow Testing**
   - Jornadas completas de CRUD
   - Navegação entre seções
   - Formulários complexos
   - Upload de arquivos

### Accessibility Testing

1. **Keyboard Navigation**
   - Tab order lógico
   - Focus indicators visíveis
   - Atalhos de teclado
   - Screen reader compatibility

2. **Color and Contrast**
   - WCAG AA compliance
   - Color blindness considerations
   - High contrast mode support
   - Reduced motion preferences

### Performance Testing

1. **Loading Performance**
   - Skeleton loading states
   - Progressive loading
   - Image optimization
   - Bundle size monitoring

2. **Interaction Performance**
   - Form responsiveness
   - Modal animations
   - List virtualization para grandes datasets
   - Debounced search/filtering

## Implementation Approach

### Phase 1: Foundation Components

- Enhanced UI components (cards, forms, modals)
- Improved loading states
- Better error handling
- Responsive layout improvements

### Phase 2: Data Display Enhancements

- Redesigned list/grid views
- Better image handling
- Enhanced filtering/sorting
- Improved empty states

### Phase 3: User Experience Polish

- Micro-interactions
- Keyboard shortcuts
- Accessibility improvements
- Performance optimizations

### Design Tokens

```css
:root {
  /* Spacing Scale */
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */

  /* Typography Scale */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */

  /* Status Colors */
  --status-success: oklch(0.7 0.15 145);
  --status-warning: oklch(0.8 0.15 85);
  --status-error: var(--destructive);
  --status-info: var(--primary);
}
```

### Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

### Animation Guidelines

- **Duration**: 150ms para micro-interactions, 300ms para transições maiores
- **Easing**: ease-out para entrada, ease-in para saída
- **Reduced Motion**: Respeitar preferência do usuário
- **Performance**: Usar transform e opacity para animações
