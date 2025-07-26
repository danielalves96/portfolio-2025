import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteção básica para rotas admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Por enquanto, apenas um aviso no console
    // Em produção, implementar autenticação adequada
    const response = NextResponse.next();

    // Adicionar headers de segurança para páginas admin
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set(
      'Cache-Control',
      'no-cache, no-store, must-revalidate'
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
