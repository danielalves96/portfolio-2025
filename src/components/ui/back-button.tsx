'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: 'outline' | 'ghost' | 'default';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  className?: string;
  iconOnly?: boolean;
}

export function BackButton({
  href,
  onClick,
  children = 'Voltar',
  variant = 'outline',
  size = 'sm',
  className,
  iconOnly = false,
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  const buttonContent = iconOnly ? (
    <ArrowLeft className='h-4 w-4' />
  ) : (
    <>
      <ArrowLeft className='h-4 w-4 mr-2' />
      {children}
    </>
  );

  if (href && !onClick) {
    return (
      <Button variant={variant} size={size} className={className} asChild>
        <Link href={href}>{buttonContent}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      {buttonContent}
    </Button>
  );
}
