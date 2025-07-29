'use client';

import React, { useEffect } from 'react';

import Link from 'next/link';

import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { reportError } from '@/lib/error-reporting';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Global error page:', error);

    reportError(error, {
      digest: error.digest,
      context: 'client',
      severity: 'high',
      tags: {
        globalError: 'true',
        page: 'error',
      },
    }).catch(reportingError => {
      console.error('Failed to report global error:', reportingError);
    });
  }, [error]);

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-6'>
      <div className='max-w-lg w-full text-center space-y-8'>
        <div className='mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
          <AlertTriangle className='w-10 h-10 text-red-600 dark:text-red-400' />
        </div>

        <div className='space-y-4'>
          <h1 className='text-3xl font-bold text-foreground'>
            Algo deu errado
          </h1>
          <p className='text-muted-foreground'>
            Desculpe, encontramos um erro inesperado. Nossa equipe foi
            notificada e está trabalhando para resolver o problema.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className='text-left bg-muted/30 border rounded-lg p-4'>
            <summary className='cursor-pointer text-sm font-medium mb-2'>
              Detalhes do erro (desenvolvimento)
            </summary>
            <div className='text-xs font-mono text-muted-foreground space-y-2'>
              <div>
                <strong>Mensagem:</strong>
                <pre className='whitespace-pre-wrap break-all mt-1 bg-muted/50 p-2 rounded'>
                  {error.message}
                </pre>
              </div>
              {error.digest && (
                <div>
                  <strong>Digest:</strong>
                  <pre className='whitespace-pre-wrap break-all mt-1 bg-muted/50 p-2 rounded'>
                    {error.digest}
                  </pre>
                </div>
              )}
              {error.stack && (
                <div>
                  <strong>Stack:</strong>
                  <pre className='whitespace-pre-wrap break-all mt-1 bg-muted/50 p-2 rounded text-xs'>
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        )}

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button onClick={reset} className='flex items-center gap-2'>
            <RefreshCcw className='w-4 h-4' />
            Tentar novamente
          </Button>

          <Link href='/'>
            <Button
              variant='outline'
              className='flex items-center gap-2 w-full sm:w-auto'
            >
              <Home className='w-4 h-4' />
              Voltar ao início
            </Button>
          </Link>
        </div>

        <div className='pt-6 border-t space-y-2'>
          <p className='text-sm text-muted-foreground'>
            Se o problema persistir, entre em contato:
          </p>
          <p className='text-sm'>
            <a
              href='mailto:daniel@kyantech.com.br?subject=Erro no Portfolio - Paola Oliveira'
              className='text-orange-500hover:underline'
            >
              daniel@kyantech.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
