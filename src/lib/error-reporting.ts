// Note: We can't import env directly here as this runs on client-side too
// Will check NODE_ENV directly from process.env for client-side compatibility

export interface ErrorReport {
  eventId: string;
  message: string;
  stack?: string;
  digest?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  userId?: string;
  context?: 'client' | 'server' | 'admin';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

export interface ErrorLogger {
  reportError: (
    error: Error,
    context?: Partial<ErrorReport>
  ) => Promise<string>;
  reportMessage: (
    message: string,
    context?: Partial<ErrorReport>
  ) => Promise<string>;
}

class ClientErrorLogger implements ErrorLogger {
  async reportError(
    error: Error,
    context?: Partial<ErrorReport>
  ): Promise<string> {
    const eventId = context?.eventId || this.generateEventId();

    const report: ErrorReport = {
      eventId,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      context: 'client',
      severity: 'medium',
      ...context,
    };

    // For client-side, always log to console
    // In the future, this could send to a client-accessible endpoint
    console.group(`🚨 Client Error Report [${eventId}]`);
    console.error('Message:', report.message);
    console.error('Context:', report.context);
    console.error('Severity:', report.severity);
    console.error('URL:', report.url);
    console.error('Timestamp:', report.timestamp);
    if (report.stack) {
      console.error('Stack:', report.stack);
    }
    if (report.componentStack) {
      console.error('Component Stack:', report.componentStack);
    }
    if (report.tags) {
      console.error('Tags:', report.tags);
    }
    if (report.extra) {
      console.error('Extra:', report.extra);
    }
    console.groupEnd();

    return eventId;
  }

  async reportMessage(
    message: string,
    context?: Partial<ErrorReport>
  ): Promise<string> {
    const error = new Error(message);
    return this.reportError(error, context);
  }

  private generateEventId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

class ServerErrorLogger implements ErrorLogger {
  async reportError(
    error: Error,
    context?: Partial<ErrorReport>
  ): Promise<string> {
    const eventId = context?.eventId || this.generateEventId();

    const report: ErrorReport = {
      eventId,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      context: 'server',
      severity: 'medium',
      ...context,
    };

    // For server-side in production, you could send to monitoring service
    // For now, just log to console
    console.group(`🚨 Server Error Report [${eventId}]`);
    console.error('Message:', report.message);
    console.error('Context:', report.context);
    console.error('Severity:', report.severity);
    console.error('Timestamp:', report.timestamp);
    if (report.stack) {
      console.error('Stack:', report.stack);
    }
    if (report.tags) {
      console.error('Tags:', report.tags);
    }
    if (report.extra) {
      console.error('Extra:', report.extra);
    }
    console.groupEnd();

    return eventId;
  }

  async reportMessage(
    message: string,
    context?: Partial<ErrorReport>
  ): Promise<string> {
    const error = new Error(message);
    return this.reportError(error, context);
  }

  private generateEventId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Create logger instance based on environment
// Use process.env directly for client-side compatibility
export const errorLogger: ErrorLogger =
  typeof window !== 'undefined'
    ? // Client-side: use client logger
      new ClientErrorLogger()
    : // Server-side: use server logger (could be enhanced for production)
      new ServerErrorLogger();

// Convenience functions
export const reportError = (
  error: Error,
  context?: Partial<ErrorReport>
): Promise<string> => {
  return errorLogger.reportError(error, context);
};

export const reportMessage = (
  message: string,
  context?: Partial<ErrorReport>
): Promise<string> => {
  return errorLogger.reportMessage(message, context);
};

// React Error Boundary integration
export const reportReactError = (
  error: Error,
  errorInfo: React.ErrorInfo,
  context?: Partial<ErrorReport>
): Promise<string> => {
  return reportError(error, {
    componentStack: errorInfo.componentStack || '',
    context: 'client',
    severity: 'high',
    tags: {
      errorBoundary: 'true',
    },
    ...context,
  });
};

// Server-side error reporting
export const reportServerError = (
  error: Error,
  request?: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
  },
  context?: Partial<ErrorReport>
): Promise<string> => {
  return reportError(error, {
    context: 'server',
    severity: 'high',
    url: request?.url || 'server',
    tags: {
      method: request?.method || 'unknown',
    },
    extra: {
      headers: request?.headers,
    },
    ...context,
  });
};

// Admin-specific error reporting
export const reportAdminError = (
  error: Error,
  context?: Partial<ErrorReport>
): Promise<string> => {
  return reportError(error, {
    context: 'admin',
    severity: 'critical',
    tags: {
      admin: 'true',
    },
    ...context,
  });
};

// Global error handler setup
export const setupGlobalErrorHandling = () => {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', event => {
    reportError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
      severity: 'high',
      tags: {
        type: 'unhandledrejection',
      },
    });
  });

  // Handle global errors
  window.addEventListener('error', event => {
    reportError(event.error || new Error(event.message), {
      severity: 'high',
      tags: {
        type: 'globalerror',
        filename: event.filename,
        lineno: event.lineno?.toString(),
        colno: event.colno?.toString(),
      },
    });
  });
};
