'use client';

import * as React from 'react';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

const formSectionVariants = cva(
  'border rounded-lg bg-card text-card-foreground',
  {
    variants: {
      variant: {
        default: 'border-border',
        outlined: 'border-2 border-border',
        ghost: 'border-transparent bg-transparent',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const formSectionHeaderVariants = cva(
  'flex items-center justify-between w-full text-left transition-colors',
  {
    variants: {
      interactive: {
        true: 'hover:bg-muted/50 rounded-md p-2 -m-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
);

interface FormSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formSectionVariants> {
  title: string;
  description?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  required?: boolean;
  children: React.ReactNode;
}

function FormSection({
  className,
  variant,
  size,
  title,
  description,
  collapsible = false,
  defaultExpanded = true,
  required = false,
  children,
  ...props
}: FormSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultExpanded);

  const sectionId = React.useId();
  const contentId = `${sectionId}-content`;
  const headerId = `${sectionId}-header`;

  if (!collapsible) {
    return (
      <div
        className={cn(formSectionVariants({ variant, size }), className)}
        {...props}
      >
        <FormSectionHeader
          id={headerId}
          title={title}
          description={description}
          required={required}
          interactive={false}
        />
        <div className='mt-4 space-y-4'>{children}</div>
      </div>
    );
  }

  return (
    <CollapsiblePrimitive.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(formSectionVariants({ variant, size }), className)}
      {...props}
    >
      <CollapsiblePrimitive.Trigger asChild>
        <FormSectionHeader
          id={headerId}
          title={title}
          description={description}
          required={required}
          interactive={true}
          isOpen={isOpen}
          aria-expanded={isOpen}
          aria-controls={contentId}
        />
      </CollapsiblePrimitive.Trigger>

      <CollapsiblePrimitive.Content
        id={contentId}
        className='data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden'
        aria-labelledby={headerId}
      >
        <div className='mt-4 space-y-4'>{children}</div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}

interface FormSectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  required?: boolean;
  interactive?: boolean;
  isOpen?: boolean;
}

function FormSectionHeader({
  className,
  title,
  description,
  required = false,
  interactive = false,
  isOpen,
  ...props
}: FormSectionHeaderProps) {
  return (
    <div
      className={cn(formSectionHeaderVariants({ interactive }), className)}
      {...props}
    >
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2'>
          <h3 className='text-base font-semibold leading-none tracking-tight'>
            {title}
          </h3>
          {required && (
            <span className='text-destructive text-sm' aria-label='required'>
              *
            </span>
          )}
        </div>
        {description && (
          <p className='text-sm text-muted-foreground mt-1'>{description}</p>
        )}
      </div>

      {interactive && (
        <div className='flex-shrink-0 ml-2'>
          {isOpen ? (
            <ChevronDown className='h-4 w-4 text-muted-foreground transition-transform' />
          ) : (
            <ChevronRight className='h-4 w-4 text-muted-foreground transition-transform' />
          )}
        </div>
      )}
    </div>
  );
}

interface FormSectionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
}

function FormSectionGroup({
  className,
  children,
  spacing = 'md',
  ...props
}: FormSectionGroupProps) {
  const spacingClasses = {
    sm: 'space-y-3',
    md: 'space-y-4',
    lg: 'space-y-6',
  };

  return (
    <div className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </div>
  );
}

interface FormSectionGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

function FormSectionGrid({
  className,
  columns = 2,
  gap = 'md',
  children,
  ...props
}: FormSectionGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn('grid', columnClasses[columns], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface UseFormSectionStateOptions {
  defaultExpanded?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

function useFormSectionState({
  defaultExpanded = true,
  onToggle,
}: UseFormSectionStateOptions = {}) {
  const [isOpen, setIsOpen] = React.useState(defaultExpanded);

  const toggle = React.useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      onToggle?.(newState);
      return newState;
    });
  }, [onToggle]);

  const open = React.useCallback(() => {
    setIsOpen(true);
    onToggle?.(true);
  }, [onToggle]);

  const close = React.useCallback(() => {
    setIsOpen(false);
    onToggle?.(false);
  }, [onToggle]);

  return {
    isOpen,
    toggle,
    open,
    close,
  };
}

export {
  FormSection,
  FormSectionHeader,
  FormSectionGroup,
  FormSectionGrid,
  useFormSectionState,
  formSectionVariants,
  formSectionHeaderVariants,
};
