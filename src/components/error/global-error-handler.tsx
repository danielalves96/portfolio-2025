'use client';

import { useEffect } from 'react';

import { setupGlobalErrorHandling } from '@/lib/error-reporting';

export function GlobalErrorHandler() {
  useEffect(() => {
    setupGlobalErrorHandling();
  }, []);
  return null;
}
