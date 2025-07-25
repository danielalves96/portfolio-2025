'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validEmail = process.env.ADMIN_EMAIL || 'paolatoliveira@gmail.com';
  const validPassword = process.env.ADMIN_PASSWORD || 'P&d011217';

  if (email !== validEmail || password !== validPassword) {
    return { success: false, error: 'Credenciais inválidas' };
  }

  // Set authentication cookie
  const cookieStore = await cookies();
  cookieStore.set('auth-token', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect('/admin');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect('/');
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  return token?.value === 'authenticated';
}
