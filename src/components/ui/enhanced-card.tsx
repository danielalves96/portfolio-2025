'use client';

import * as React from 'react';

import Image from 'next/image';

import { cva, type VariantProps } from 'class-variance-authority';
import { ImageIcon, MoreHorizontal } from 'lucide-react';

import { Badge, BadgeGroup, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

// Enhanced card variants for different layouts
const enhancedCardVariants = cva('group transition-all duration-200', {
  variants: {
    layout: {
      default: '',
      compact: 'hover:shadow-md',
      featured: 'hover:shadow-lg ',
      list: 'hover:bg-accent/50',
    },
    density: {
      comfortable: '',
      compact: '',
      spacious: '',
    },
  },
  defaultVariants: {
    layout: 'default',
    density: 'comfortable',
  },
});

// Thumbnail component with fallback states
interface ThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackIcon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
  overlay?: React.ReactNode;
}

const thumbnailVariants = cva(
  'relative overflow-hidden rounded-lg bg-muted flex items-center justify-center',
  {
    variants: {
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-video',
        wide: 'aspect-[3/2]',
        tall: 'aspect-[2/3]',
      },
      size: {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-48 h-48',
      },
    },
    defaultVariants: {
      aspectRatio: 'square',
    },
  }
);

function Thumbnail({
  src,
  alt,
  aspectRatio,
  size,
  fallbackIcon: FallbackIcon = ImageIcon,
  loading = false,
  overlay,
  className,
  ...props
}: ThumbnailProps) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);

  if (loading) {
    return (
      <div
        className={cn(thumbnailVariants({ aspectRatio, size }), className)}
        {...props}
      >
        <Skeleton className='w-full h-full' />
      </div>
    );
  }

  return (
    <div
      className={cn(thumbnailVariants({ aspectRatio, size }), className)}
      {...props}
    >
      {src && !imageError ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              'object-cover transition-opacity duration-300',
              imageLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
          {imageLoading && (
            <Skeleton className='absolute inset-0 w-full h-full' />
          )}
        </>
      ) : (
        <FallbackIcon className='h-8 w-8 text-muted-foreground' />
      )}

      {overlay && (
        <div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          {overlay}
        </div>
      )}
    </div>
  );
}

// Metadata display component
interface MetadataProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    label: string;
    value: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  layout?: 'horizontal' | 'vertical' | 'grid';
  compact?: boolean;
}

function Metadata({
  items,
  layout = 'vertical',
  compact = false,
  className,
  ...props
}: MetadataProps) {
  const layoutClasses = {
    horizontal: 'flex flex-wrap gap-4',
    vertical: 'space-y-2',
    grid: 'grid grid-cols-2 gap-2',
  };

  return (
    <div className={cn(layoutClasses[layout], className)} {...props}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-2',
            compact ? 'text-xs' : 'text-sm'
          )}
        >
          {item.icon && (
            <item.icon
              className={cn('shrink-0', compact ? 'h-3 w-3' : 'h-4 w-4')}
            />
          )}
          <span className='text-muted-foreground font-medium'>
            {item.label}:
          </span>
          <span className='text-foreground'>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// Enhanced content card component
interface ContentCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof enhancedCardVariants> {
  title: string;
  description?: string;
  image?: string | null;
  imageAlt?: string;
  status?: 'published' | 'draft' | 'archived' | 'pending';
  tags?: string[];
  metadata?: Array<{
    label: string;
    value: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    variant?: 'default' | 'destructive';
  }>;
  loading?: boolean;
  featured?: boolean;
  onCardClick?: () => void;
}

function ContentCard({
  title,
  description,
  image,
  imageAlt,
  status,
  tags = [],
  metadata = [],
  actions = [],
  loading = false,
  featured = false,
  layout,
  density,
  onCardClick,
  className,
  ...props
}: ContentCardProps) {
  if (loading) {
    return (
      <Card
        className={cn(enhancedCardVariants({ layout, density }), className)}
      >
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='space-y-2 flex-1'>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
            </div>
            <Skeleton className='h-8 w-8 rounded-md' />
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='w-full h-48 rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-6 w-16 rounded-full' />
            <Skeleton className='h-6 w-20 rounded-full' />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        enhancedCardVariants({ layout, density }),
        onCardClick && 'cursor-pointer',
        featured && 'ring-2 ring-primary/20',
        className
      )}
      onClick={onCardClick}
      {...props}
    >
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='space-y-2 flex-1 min-w-0'>
            <div className='flex items-center '>
              <CardTitle className='line-clamp-2 p-0'>{title}</CardTitle>
              {status && <StatusBadge status={status} size='sm' />}
            </div>
            {description && (
              <CardDescription className='line-clamp-2'>
                {description}
              </CardDescription>
            )}
          </div>

          {actions.length > 0 && (
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='secondary' size='sm' className='rounded-md'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {actions.map((action, index) => (
                    <React.Fragment key={index}>
                      <DropdownMenuItem
                        onClick={e => {
                          e.stopPropagation();
                          action.onClick();
                        }}
                        className={cn(
                          action.variant === 'destructive' &&
                            'text-destructive focus:text-destructive'
                        )}
                      >
                        {action.icon && (
                          <action.icon className='h-4 w-4 mr-2' />
                        )}
                        {action.label}
                      </DropdownMenuItem>
                      {index < actions.length - 1 &&
                        action.variant === 'destructive' && (
                          <DropdownMenuSeparator />
                        )}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Image thumbnail */}
        {image !== undefined && (
          <Thumbnail
            src={image}
            alt={imageAlt || title}
            aspectRatio='square'
            className='w-full'
          />
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <BadgeGroup spacing='sm'>
            {tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant='secondary' size='sm'>
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant='outline' size='sm'>
                +{tags.length - 3} more
              </Badge>
            )}
          </BadgeGroup>
        )}

        {/* Metadata */}
        {metadata.length > 0 && <Metadata items={metadata} compact />}
      </CardContent>
    </Card>
  );
}

// List item variant for compact display
interface ContentListItemProps extends Omit<ContentCardProps, 'layout'> {
  compact?: boolean;
}

function ContentListItem({
  title,
  description,
  image,
  imageAlt,
  status,
  tags = [],
  metadata = [],
  actions = [],
  loading = false,
  compact = false,
  onCardClick,
  className,
  ...props
}: ContentListItemProps) {
  if (loading) {
    return (
      <div className='flex items-center gap-4 p-4 rounded-lg border bg-card'>
        <Skeleton className='w-16 h-16 rounded-lg shrink-0' />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-5 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group',
        onCardClick && 'cursor-pointer',
        className
      )}
      onClick={onCardClick}
      {...props}
    >
      {/* Thumbnail */}
      {image !== undefined && (
        <Thumbnail
          src={image}
          alt={imageAlt || title}
          size={compact ? 'sm' : 'md'}
          aspectRatio='square'
          className='shrink-0'
        />
      )}

      {/* Content */}
      <div className='flex-1 min-w-0 space-y-1'>
        <div className='flex items-center gap-2'>
          <h3
            className={cn(
              'font-medium line-clamp-1',
              compact ? 'text-sm' : 'text-base'
            )}
          >
            {title}
          </h3>
          {status && <StatusBadge status={status} size='sm' />}
        </div>

        {description && (
          <p
            className={cn(
              'text-muted-foreground line-clamp-1',
              compact ? 'text-xs' : 'text-sm'
            )}
          >
            {description}
          </p>
        )}

        {/* Tags and metadata in compact view */}
        {(tags.length > 0 || metadata.length > 0) && (
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            {tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant='secondary' size='sm'>
                {tag}
              </Badge>
            ))}
            {metadata.slice(0, 1).map((item, index) => (
              <span key={index}>
                {item.label}: {item.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div className='flex items-center gap-1'>
          {actions.slice(0, 2).map((action, index) => (
            <Button
              key={index}
              variant='outline'
              size='sm'
              onClick={e => {
                e.stopPropagation();
                action.onClick();
              }}
            >
              {action.icon && <action.icon className='h-3 w-3' />}
            </Button>
          ))}
          {actions.length > 2 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <MoreHorizontal className='h-3 w-3' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {actions.slice(2).map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={e => {
                      e.stopPropagation();
                      action.onClick();
                    }}
                    className={cn(
                      action.variant === 'destructive' &&
                        'text-destructive focus:text-destructive'
                    )}
                  >
                    {action.icon && <action.icon className='h-4 w-4 mr-2' />}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
}

export {
  ContentCard,
  ContentListItem,
  Thumbnail,
  Metadata,
  enhancedCardVariants,
  thumbnailVariants,
};
