'use client';

import React, { Component, ReactNode } from 'react';

import { AlertTriangle, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { reportReactError } from '@/lib/error-reporting';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showErrorDetails?: boolean;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  eventId?: string;
  retryCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: undefined,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      errorInfo,
    });

    // Report error using our error reporting system
    reportReactError(error, errorInfo, {
      severity: 'high',
      tags: {
        errorBoundary: 'true',
        showDetails: this.props.showErrorDetails?.toString() || 'false',
        retryCount: this.state.retryCount.toString(),
      },
    })
      .then(eventId => {
        this.setState(prevState => ({ ...prevState, eventId }));
      })
      .catch(reportingError => {
        console.error('Failed to report error:', reportingError);
      });

    // Check if this error should auto-retry
    if (this.shouldAutoRetry(error) && this.state.retryCount < 3) {
      console.log(
        `Auto-retrying error (attempt ${this.state.retryCount + 1}/3):`,
        error.message
      );
      this.performAutoRetry();
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  override componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys) {
        this.resetErrorBoundary();
      }
    }

    if (
      hasError &&
      resetOnPropsChange &&
      prevProps.children !== this.props.children
    ) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = window.setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        eventId: undefined,
        retryCount: prevState.retryCount + 1,
      }));
    }, 100);
  };

  // Auto-retry for certain types of errors
  private shouldAutoRetry = (error: Error): boolean => {
    const autoRetryErrors = [
      'ChunkLoadError',
      'Loading chunk',
      'Loading CSS chunk',
      'NetworkError',
      'Failed to fetch',
    ];

    return autoRetryErrors.some(
      pattern => error.message.includes(pattern) || error.name.includes(pattern)
    );
  };

  private performAutoRetry = () => {
    const maxRetries = 3;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      setTimeout(
        () => {
          this.resetErrorBoundary();
        },
        1000 * (retryCount + 1)
      ); // Exponential backoff
    }
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-[400px] flex items-center justify-center p-6'>
          <div className='max-w-md w-full text-center space-y-6'>
            <div className='mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
              <AlertTriangle className='w-8 h-8 text-red-600 dark:text-red-400' />
            </div>

            <div className='space-y-2'>
              <h2 className='text-xl font-semibold text-foreground'>
                Ops! Algo deu errado
              </h2>
              <p className='text-sm text-muted-foreground'>
                Encontramos um erro inesperado. Nossa equipe foi notificada e
                está trabalhando para resolver.
              </p>
            </div>

            {this.props.showErrorDetails && this.state.error && (
              <details className='text-left bg-muted/50 rounded-lg p-4'>
                <summary className='cursor-pointer text-sm font-medium mb-2'>
                  Detalhes técnicos
                </summary>
                <div className='text-xs font-mono text-muted-foreground space-y-1'>
                  <p>
                    <strong>Error:</strong> {this.state.error.message}
                  </p>
                  {this.state.eventId && (
                    <p>
                      <strong>ID:</strong> {this.state.eventId}
                    </p>
                  )}
                  {this.state.error.stack && (
                    <pre className='whitespace-pre-wrap break-all'>
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Button
                onClick={this.resetErrorBoundary}
                className='flex items-center gap-2'
              >
                <RefreshCcw className='w-4 h-4' />
                Tentar novamente
              </Button>

              <Button
                variant='outline'
                onClick={() => window.location.reload()}
              >
                Recarregar página
              </Button>
            </div>

            <p className='text-xs text-muted-foreground'>
              Se o problema persistir, entre em contato conosco.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para uso mais fácil em componentes funcionais
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    reportReactError(error, errorInfo || { componentStack: '' }, {
      severity: 'medium',
      tags: {
        manual: 'true',
      },
    }).catch(console.error);
  };
};
