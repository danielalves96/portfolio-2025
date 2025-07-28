import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  AlertCircle,
  Archive,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Info,
  type LucideIcon,
  XCircle,
  Zap,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success:
          'border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 [a&]:hover:bg-green-200 dark:[a&]:hover:bg-green-900/50',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 [a&]:hover:bg-yellow-200 dark:[a&]:hover:bg-yellow-900/50',
        error:
          'border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 [a&]:hover:bg-red-200 dark:[a&]:hover:bg-red-900/50',
        info: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 [a&]:hover:bg-blue-200 dark:[a&]:hover:bg-blue-900/50',
        published:
          'border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        draft:
          'border-transparent bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400',
        archived:
          'border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        pending:
          'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        active:
          'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
        inactive:
          'border-transparent bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-400',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        default: 'px-2 py-0.5 text-xs',
        lg: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const statusIcons: Record<string, LucideIcon> = {
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
  info: Info,
  published: Eye,
  draft: EyeOff,
  archived: Archive,
  pending: Clock,
  active: Zap,
  inactive: XCircle,
};

interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  icon?: boolean | LucideIcon;
  pulse?: boolean;
}

function Badge({
  className,
  variant,
  size,
  asChild = false,
  icon = false,
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  const IconComponent = React.useMemo(() => {
    if (icon === false) return null;
    if (typeof icon === 'function') return icon;
    if (variant && statusIcons[variant]) return statusIcons[variant];
    return null;
  }, [icon, variant]);

  return (
    <Comp
      data-slot='badge'
      className={cn(
        badgeVariants({ variant, size }),
        pulse && 'animate-pulse',
        className
      )}
      {...props}
    >
      {IconComponent && <IconComponent className='h-3 w-3' />}
      {children}
    </Comp>
  );
}

interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status:
    | 'published'
    | 'draft'
    | 'archived'
    | 'pending'
    | 'active'
    | 'inactive'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  showIcon?: boolean;
  pulse?: boolean;
}

function StatusBadge({
  status,
  showIcon = true,
  pulse = false,
  children,
  ...props
}: StatusBadgeProps) {
  const defaultLabels: Record<string, string> = {
    published: 'Published',
    draft: 'Draft',
    archived: 'Archived',
    pending: 'Pending',
    active: 'Active',
    inactive: 'Inactive',
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    info: 'Info',
  };

  return (
    <Badge variant={status} icon={showIcon} pulse={pulse} {...props}>
      {children || defaultLabels[status] || status}
    </Badge>
  );
}

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status:
    | 'published'
    | 'draft'
    | 'archived'
    | 'pending'
    | 'active'
    | 'inactive'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  size?: 'sm' | 'default' | 'lg';
  pulse?: boolean;
}

function StatusDot({
  status,
  size = 'default',
  pulse = false,
  className,
  ...props
}: StatusDotProps) {
  const sizeClasses = {
    sm: 'h-2 w-2',
    default: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const colorClasses = {
    published: 'bg-green-500',
    draft: 'bg-gray-400',
    archived: 'bg-orange-500',
    pending: 'bg-yellow-500',
    active: 'bg-emerald-500',
    inactive: 'bg-slate-400',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <span
      className={cn(
        'inline-block rounded-full',
        sizeClasses[size],
        colorClasses[status],
        pulse && 'animate-pulse',
        className
      )}
      {...props}
    />
  );
}

interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spacing?: 'sm' | 'default' | 'lg';
  wrap?: boolean;
}

function BadgeGroup({
  children,
  spacing = 'default',
  wrap = true,
  className,
  ...props
}: BadgeGroupProps) {
  const spacingClasses = {
    sm: 'gap-1',
    default: 'gap-2',
    lg: 'gap-3',
  };

  return (
    <div
      className={cn(
        'flex items-center',
        spacingClasses[spacing],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, StatusBadge, StatusDot, BadgeGroup, badgeVariants };
