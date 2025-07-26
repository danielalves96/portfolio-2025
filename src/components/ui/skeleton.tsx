import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    variant: {
      default: 'bg-muted',
      card: 'bg-card border',
      text: 'bg-muted/60',
      avatar: 'rounded-full bg-muted',
      button: 'bg-muted/80',
    },
    size: {
      sm: 'h-4',
      default: 'h-6',
      lg: 'h-8',
      xl: 'h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, size, ...props }: SkeletonProps) {
  return (
    <div
      data-slot='skeleton'
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// Specialized skeleton components for better visual hierarchy

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  width?: 'full' | 'half' | 'quarter' | 'three-quarters';
}

function SkeletonText({
  className,
  lines = 1,
  width = 'full',
  ...props
}: SkeletonTextProps) {
  const widthClasses = {
    full: 'w-full',
    half: 'w-1/2',
    quarter: 'w-1/4',
    'three-quarters': 'w-3/4',
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant='text'
          size='sm'
          className={cn(
            widthClasses[width],
            // Last line is typically shorter
            index === lines - 1 && lines > 1 && 'w-3/4'
          )}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showImage?: boolean;
  showActions?: boolean;
  textLines?: number;
}

function SkeletonCard({
  className,
  showImage = true,
  showActions = true,
  textLines = 3,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      data-slot='skeleton-card'
      className={cn('rounded-xl border bg-card p-6 space-y-4', className)}
      {...props}
    >
      {/* Header with title and optional actions */}
      <div className='flex items-start justify-between'>
        <div className='space-y-2 flex-1'>
          <Skeleton variant='text' size='default' className='w-3/4' />
          <Skeleton variant='text' size='sm' className='w-1/2' />
        </div>
        {showActions && (
          <Skeleton variant='button' size='sm' className='w-8 h-8 rounded-md' />
        )}
      </div>

      {/* Optional image */}
      {showImage && (
        <Skeleton variant='card' className='w-full h-48 rounded-lg' />
      )}

      {/* Content text */}
      <SkeletonText lines={textLines} />

      {/* Footer actions */}
      {showActions && (
        <div className='flex gap-2 pt-2'>
          <Skeleton variant='button' size='sm' className='w-20 h-8' />
          <Skeleton variant='button' size='sm' className='w-16 h-8' />
        </div>
      )}
    </div>
  );
}

interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  showAvatar?: boolean;
  showActions?: boolean;
}

function SkeletonList({
  className,
  items = 5,
  showAvatar = false,
  showActions = true,
  ...props
}: SkeletonListProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className='flex items-center gap-4 p-4 rounded-lg border bg-card'
        >
          {showAvatar && <Skeleton variant='avatar' className='w-10 h-10' />}

          <div className='flex-1 space-y-2'>
            <Skeleton variant='text' size='default' className='w-3/4' />
            <Skeleton variant='text' size='sm' className='w-1/2' />
          </div>

          {showActions && (
            <div className='flex gap-2'>
              <Skeleton variant='button' size='sm' className='w-8 h-8' />
              <Skeleton variant='button' size='sm' className='w-8 h-8' />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
}

function SkeletonTable({
  className,
  rows = 5,
  columns = 4,
  ...props
}: SkeletonTableProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {/* Table header */}
      <div
        className='grid gap-4 p-4 border-b bg-muted/30 rounded-t-lg'
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} variant='text' size='sm' className='w-3/4' />
        ))}
      </div>

      {/* Table rows */}
      <div className='space-y-2'>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className='grid gap-4 p-4 border-b last:border-b-0'
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant='text'
                size='sm'
                className={cn(
                  // Vary widths for more realistic appearance
                  colIndex === 0
                    ? 'w-full'
                    : colIndex === columns - 1
                      ? 'w-1/2'
                      : 'w-3/4'
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonList,
  SkeletonTable,
  skeletonVariants,
};
