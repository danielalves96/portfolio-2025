'use client';

import { useCallback } from 'react';

import { reportError } from '@/lib/error-reporting';

interface UseErrorBoundaryOptions {
  onError?: (error: Error) => void;
  context?: 'client' | 'server' | 'admin';
  tags?: Record<string, string>;
}

export function useErrorBoundary(options: UseErrorBoundaryOptions = {}) {
  const { onError, context = 'client', tags = {} } = options;

  const captureError = useCallback(
    (error: Error, extraInfo?: Record<string, any>) => {
      // Report error using our error reporting system
      reportError(error, {
        context,
        severity: 'medium',
        tags: {
          manual: 'true',
          ...tags,
        },
        extra: extraInfo,
      }).catch(console.error);

      // Call custom error handler if provided
      onError?.(error);

      // Re-throw to trigger error boundary
      throw error;
    },
    [onError, context, tags]
  );

  const captureAsyncError = useCallback(
    async (asyncFn: () => Promise<any>, fallback?: any) => {
      try {
        return await asyncFn();
      } catch (error) {
        if (error instanceof Error) {
          captureError(error);
        } else {
          captureError(new Error(String(error)));
        }
        return fallback;
      }
    },
    [captureError]
  );

  return {
    captureError,
    captureAsyncError,
  };
}
