'use client';

import React from 'react';

import { AlertTriangle, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SectionErrorFallbackProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function SectionErrorFallback({
  title = 'Erro na seção',
  description = 'Não foi possível carregar esta seção. Tente novamente em alguns instantes.',
  onRetry,
  showRetry = true,
}: SectionErrorFallbackProps) {
  return (
    <div className='flex items-center justify-center p-8 min-h-[200px]'>
      <div className='text-center space-y-4 max-w-md'>
        <div className='mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center'>
          <AlertTriangle className='w-6 h-6 text-orange-600 dark:text-orange-400' />
        </div>

        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>

        {showRetry && (
          <Button
            onClick={onRetry || (() => window.location.reload())}
            variant='outline'
            size='sm'
            className='flex items-center gap-2'
          >
            <RefreshCcw className='w-4 h-4' />
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  );
}

// Specialized fallbacks for different sections
export function ProjectsErrorFallback() {
  return (
    <SectionErrorFallback
      title='Erro ao carregar projetos'
      description='Não foi possível carregar os projetos do portfólio. Verifique sua conexão e tente novamente.'
    />
  );
}

export function ContactErrorFallback() {
  return (
    <SectionErrorFallback
      title='Erro no formulário de contato'
      description='Não foi possível carregar o formulário de contato. Você pode entrar em contato diretamente por email.'
    />
  );
}

export function AdminFormErrorFallback() {
  return (
    <SectionErrorFallback
      title='Erro no formulário administrativo'
      description='Não foi possível carregar o formulário. Verifique sua conexão e tente novamente.'
    />
  );
}
