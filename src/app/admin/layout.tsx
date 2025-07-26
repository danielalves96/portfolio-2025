import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { isAuthenticated } from '@/lib/actions/auth-actions';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Dashboard',
    default: 'Admin Dashboard',
  },
  description: 'Painel administrativo para gerenciar dados do portfólio',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/login');
  }

  return <div className='min-h-screen bg-background'>{children}</div>;
}
