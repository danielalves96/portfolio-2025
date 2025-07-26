import React from 'react';

import Link from 'next/link';

import { ChevronRight, Home } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label='Breadcrumb' className={cn('flex items-center', className)}>
      <ol className='flex items-center text-sm'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && (
              <ChevronRight className='h-3.5 w-3.5 mx-2 text-muted-foreground/60 flex-shrink-0' />
            )}
            {item.current ? (
              <span
                className='font-medium text-foreground px-2 py-1 rounded-md bg-muted/50'
                aria-current='page'
              >
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className='text-muted-foreground hover:text-foreground transition-colors rounded-md flex items-center gap-1.5'
              >
                {index === 0 && <Home className='h-3.5 w-3.5 mr-1' />}
                {item.label}
              </Link>
            ) : (
              <span className='text-muted-foreground px-2 py-1'>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
