'use client';

import React, { useEffect } from 'react';

import Link from 'next/link';

import { AlertTriangle, ArrowLeft, Bug, Home, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { reportAdminError } from '@/lib/error-reporting';

interface AdminErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminErrorPage({ error, reset }: AdminErrorPageProps) {
  useEffect(() => {
    console.error('Admin error page:', error);

    reportAdminError(error, {
      digest: error.digest,
      extra: {
        adminContext: window.location.pathname,
      },
    }).catch(reportingError => {
      console.error('Failed to report admin error:', reportingError);
    });
  }, [error]);

  const handleReportBug = () => {
    const subject = `Admin Error Report: ${error.message}`;
    const body = `
ERRO NO PAINEL ADMINISTRATIVO

Digest: ${error.digest || 'N/A'}
Mensagem: ${error.message}
Página: ${window.location.pathname}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}

Stack Trace:
${error.stack || 'N/A'}

Descrição do que estava fazendo:
[Descreva os passos que levaram ao erro]
    `.trim();

    const mailtoLink = `mailto:daniel@kyantech.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full text-center space-y-8'>
        <div className='mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
          <AlertTriangle className='w-10 h-10 text-red-600 dark:text-red-400' />
        </div>

        <div className='space-y-4'>
          <h1 className='text-2xl font-bold text-foreground'>
            Erro no Painel Administrativo
          </h1>
          <p className='text-muted-foreground max-w-md mx-auto'>
            Encontramos um problema no painel administrativo. O erro foi
            registrado automaticamente.
          </p>
        </div>

        <div className='bg-muted/30 border rounded-lg p-6 text-left'>
          <h3 className='font-semibold text-foreground mb-4 flex items-center gap-2'>
            <Bug className='w-4 h-4' />
            Informações do Erro
          </h3>

          <div className='space-y-3 text-sm'>
            <div>
              <span className='font-medium text-foreground'>Mensagem:</span>
              <div className='mt-1 font-mono bg-muted/50 p-3 rounded text-muted-foreground break-all'>
                {error.message}
              </div>
            </div>

            {error.digest && (
              <div>
                <span className='font-medium text-foreground'>Error ID:</span>
                <div className='mt-1 font-mono bg-muted/50 p-3 rounded text-muted-foreground'>
                  {error.digest}
                </div>
              </div>
            )}

            <div>
              <span className='font-medium text-foreground'>Página:</span>
              <div className='mt-1 font-mono bg-muted/50 p-3 rounded text-muted-foreground'>
                {typeof window !== 'undefined'
                  ? window.location.pathname
                  : 'N/A'}
              </div>
            </div>

            <div>
              <span className='font-medium text-foreground'>Timestamp:</span>
              <div className='mt-1 font-mono bg-muted/50 p-3 rounded text-muted-foreground'>
                {new Date().toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && error.stack && (
          <details className='text-left bg-muted/30 border rounded-lg p-4'>
            <summary className='cursor-pointer text-sm font-medium mb-3'>
              Stack Trace (desenvolvimento)
            </summary>
            <pre className='text-xs font-mono text-muted-foreground whitespace-pre-wrap break-all bg-muted/50 p-3 rounded'>
              {error.stack}
            </pre>
          </details>
        )}

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button onClick={reset} className='flex items-center gap-2'>
            <RefreshCcw className='w-4 h-4' />
            Tentar Novamente
          </Button>

          <Button variant='outline' onClick={() => window.location.reload()}>
            Recarregar Página
          </Button>

          <Button
            variant='outline'
            onClick={handleReportBug}
            className='flex items-center gap-2'
          >
            <Bug className='w-4 h-4' />
            Reportar Bug
          </Button>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t'>
          <Link href='/admin'>
            <Button variant='ghost' className='flex items-center gap-2'>
              <ArrowLeft className='w-4 h-4' />
              Dashboard Admin
            </Button>
          </Link>

          <Link href='/'>
            <Button variant='ghost' className='flex items-center gap-2'>
              <Home className='w-4 h-4' />
              Site Principal
            </Button>
          </Link>
        </div>

        <div className='text-xs text-muted-foreground space-y-1 pt-4'>
          <p>
            <strong>Suporte Técnico:</strong>{' '}
            <a
              href='mailto:daniel@kyantech.com.br'
              className='text-orange-500hover:underline'
            >
              daniel@kyantech.com.br
            </a>
          </p>
          <p>Para problemas urgentes, inclua o Error ID no email.</p>
        </div>
      </div>
    </div>
  );
}
