'use client';

import React from 'react';

import Link from 'next/link';

import { AlertTriangle, ArrowLeft, Bug, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { reportAdminError } from '@/lib/error-reporting';

import { ErrorBoundary } from './error-boundary';

interface AdminErrorFallbackProps {
  error: Error;
  resetError: () => void;
  eventId?: string;
}

function AdminErrorFallback({
  error,
  resetError,
  eventId,
}: AdminErrorFallbackProps) {
  const handleReportBug = () => {
    const subject = `Bug Report: ${error.message}`;
    const body = `
Error ID: ${eventId || 'N/A'}
Error Message: ${error.message}
Stack Trace: ${error.stack || 'N/A'}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}

Descrição do que estava fazendo quando o erro ocorreu:
[Descreva aqui os passos que levaram ao erro]
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
            Encontramos um problema no painel administrativo. Este erro foi
            registrado e nossa equipe técnica foi notificada.
          </p>
        </div>

        <div className='bg-muted/30 border rounded-lg p-6 text-left'>
          <h3 className='font-semibold text-foreground mb-3 flex items-center gap-2'>
            <Bug className='w-4 h-4' />
            Detalhes do Erro
          </h3>

          <div className='space-y-3 text-sm'>
            <div>
              <span className='font-medium text-foreground'>Mensagem:</span>
              <p className='text-muted-foreground mt-1 font-mono bg-muted/50 p-2 rounded'>
                {error.message}
              </p>
            </div>

            {eventId && (
              <div>
                <span className='font-medium text-foreground'>ID do Erro:</span>
                <p className='text-muted-foreground mt-1 font-mono bg-muted/50 p-2 rounded'>
                  {eventId}
                </p>
              </div>
            )}

            <div>
              <span className='font-medium text-foreground'>Página:</span>
              <p className='text-muted-foreground mt-1 font-mono bg-muted/50 p-2 rounded'>
                {window.location.pathname}
              </p>
            </div>

            <div>
              <span className='font-medium text-foreground'>Timestamp:</span>
              <p className='text-muted-foreground mt-1 font-mono bg-muted/50 p-2 rounded'>
                {new Date().toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button onClick={resetError} className='flex items-center gap-2'>
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

        <div className='pt-6 border-t'>
          <Link href='/admin'>
            <Button variant='ghost' className='flex items-center gap-2'>
              <ArrowLeft className='w-4 h-4' />
              Voltar ao Dashboard
            </Button>
          </Link>
        </div>

        <div className='text-xs text-muted-foreground space-y-1'>
          <p>Se o problema persistir, entre em contato:</p>
          <p>
            <strong>Suporte Técnico:</strong>{' '}
            <a
              href='mailto:daniel@kyantech.com.br'
              className='text-primary hover:underline'
            >
              daniel@kyantech.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

interface AdminErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminErrorBoundary({
  children,
  fallback,
}: AdminErrorBoundaryProps) {
  return (
    <ErrorBoundary
      showErrorDetails={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        console.group('🔧 Admin Error Boundary');
        console.error('Admin Error:', error);
        console.error('Component Stack:', errorInfo.componentStack);
        console.error('Location:', window.location.href);
        console.groupEnd();

        reportAdminError(error, {
          componentStack: errorInfo.componentStack || '',
          extra: {
            adminPage: window.location.pathname,
          },
        }).catch(console.error);
      }}
      fallback={
        fallback || (
          <AdminErrorFallback
            error={new Error('Unknown admin error')}
            resetError={() => window.location.reload()}
          />
        )
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function withAdminErrorBoundary<P extends object>(
  Component: React.ComponentType<P>
) {
  const WrappedComponent = (props: P) => (
    <AdminErrorBoundary>
      <Component {...props} />
    </AdminErrorBoundary>
  );

  WrappedComponent.displayName = `withAdminErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
