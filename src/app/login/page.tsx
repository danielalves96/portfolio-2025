import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import LoginForm from '@/components/auth/login-form';

import { isAuthenticated } from '@/lib/actions/auth-actions';

export const metadata: Metadata = {
  title: 'Login - Paola Oliveira Portfolio',
  description: 'Faça login para acessar o painel administrativo.',
};

export default async function LoginPage() {
  const authenticated = await isAuthenticated();

  // If user is already logged in, redirect to admin
  if (authenticated) {
    redirect('/admin');
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-foreground'>
            Painel Administrativo
          </h1>
          <p className='text-muted-foreground mt-2'>
            Faça login para gerenciar o conteúdo do site
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
