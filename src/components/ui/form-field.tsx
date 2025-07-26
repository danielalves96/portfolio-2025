'use client';

import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Label } from './label';

const formFieldVariants = cva('space-y-2', {
  variants: {
    state: {
      default: '',
      error: '',
      success: '',
      loading: '',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

const formFieldMessageVariants = cva('flex items-center gap-2 text-sm', {
  variants: {
    type: {
      error: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
      info: 'text-muted-foreground',
      loading: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

function FormField({
  className,
  label,
  description,
  error,
  success,
  required = false,
  loading = false,
  state,
  children,
  ...props
}: FormFieldProps) {
  // Determine the state based on props
  const fieldState = React.useMemo(() => {
    if (loading) return 'loading';
    if (error) return 'error';
    if (success) return 'success';
    return state || 'default';
  }, [loading, error, success, state]);

  // Generate unique IDs for accessibility
  const fieldId = React.useId();
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const successId = success ? `${fieldId}-success` : undefined;

  // Clone children to add accessibility attributes
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const ariaDescribedBy =
        [descriptionId, errorId, successId].filter(Boolean).join(' ') ||
        undefined;

      return React.cloneElement(child, {
        id: fieldId,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': fieldState === 'error' ? 'true' : undefined,
        'aria-required': required ? 'true' : undefined,
        disabled: (child.props as any)?.disabled || loading,
      } as any);
    }
    return child;
  });

  return (
    <div
      className={cn(formFieldVariants({ state: fieldState }), className)}
      {...props}
    >
      {/* Label */}
      {label && (
        <Label htmlFor={fieldId} className='flex items-center gap-1'>
          {label}
          {required && (
            <span className='text-destructive' aria-label='required'>
              *
            </span>
          )}
          {loading && (
            <Loader2 className='h-3 w-3 animate-spin text-muted-foreground' />
          )}
        </Label>
      )}

      {/* Description */}
      {description && (
        <FormFieldMessage
          id={descriptionId}
          type='info'
          icon={Info}
          message={description}
        />
      )}

      {/* Form Control */}
      <div className='relative'>
        {enhancedChildren}

        {/* Loading overlay for input fields */}
        {loading && (
          <div className='absolute inset-0 bg-background/50 rounded-md flex items-center justify-center pointer-events-none'>
            <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
          </div>
        )}
      </div>

      {/* Success Message */}
      {success && (
        <FormFieldMessage
          id={successId}
          type='success'
          icon={CheckCircle2}
          message={success}
        />
      )}

      {/* Error Message */}
      {error && (
        <FormFieldMessage
          id={errorId}
          type='error'
          icon={AlertCircle}
          message={error}
        />
      )}
    </div>
  );
}

interface FormFieldMessageProps {
  id?: string;
  type: 'error' | 'success' | 'info' | 'loading';
  icon?: React.ComponentType<{ className?: string }>;
  message: string;
  className?: string;
}

function FormFieldMessage({
  id,
  type,
  icon: Icon,
  message,
  className,
}: FormFieldMessageProps) {
  return (
    <div
      id={id}
      className={cn(formFieldMessageVariants({ type }), className)}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      {Icon && <Icon className='h-4 w-4 shrink-0' />}
      <span>{message}</span>
    </div>
  );
}

// Specialized form field components for common use cases

interface FormFieldGroupProps
  extends React.HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

function FormFieldGroup({
  className,
  title,
  description,
  children,
  ...props
}: FormFieldGroupProps) {
  return (
    <fieldset className={cn('space-y-4', className)} {...props}>
      {title && (
        <legend className='text-base font-medium leading-none'>{title}</legend>
      )}
      {description && (
        <p className='text-sm text-muted-foreground'>{description}</p>
      )}
      <div className='space-y-4'>{children}</div>
    </fieldset>
  );
}

interface FormFieldInlineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
}

function FormFieldInline({
  className,
  children,
  gap = 'md',
  ...props
}: FormFieldInlineProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn('flex flex-wrap items-end', gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Hook for form field state management
interface UseFormFieldStateOptions {
  initialValue?: string;
  validate?: (value: string) => string | undefined;
  debounceMs?: number;
}

function useFormFieldState({
  initialValue = '',
  validate,
  debounceMs = 300,
}: UseFormFieldStateOptions = {}) {
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState<string | undefined>();
  const [touched, setTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Debounced validation
  React.useEffect(() => {
    if (!validate || !touched) return;

    const timeoutId = setTimeout(() => {
      const validationError = validate(value);
      setError(validationError);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [value, validate, touched, debounceMs]);

  const handleChange = React.useCallback(
    (newValue: string) => {
      setValue(newValue);
      if (!touched) setTouched(true);
    },
    [touched]
  );

  const handleBlur = React.useCallback(() => {
    setTouched(true);
  }, []);

  const reset = React.useCallback(() => {
    setValue(initialValue);
    setError(undefined);
    setTouched(false);
    setLoading(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    loading,
    setLoading,
    handleChange,
    handleBlur,
    reset,
  };
}

export {
  FormField,
  FormFieldMessage,
  FormFieldGroup,
  FormFieldInline,
  useFormFieldState,
  formFieldVariants,
  formFieldMessageVariants,
};
