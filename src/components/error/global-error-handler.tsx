'use client';

import { useEffect } from 'react';

import { setupGlobalErrorHandling } from '@/lib/error-reporting';

export function GlobalErrorHandler() {
  useEffect(() => {
    // Setup global error handling on client side
    setupGlobalErrorHandling();
  }, []);

  // This component doesn't render anything
  return null;
}
