'use client';

import { useState, useTransition } from 'react';

import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { loginAction } from '@/lib/actions/auth-actions';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await loginAction(formData);
        if (result && !result.success) {
          toast.error(result.error);
        }
      } catch {
        // This catch is for the redirect, which is expected behavior
      }
    });
  };

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center flex items-center justify-center gap-2'>
          <Lock className='h-5 w-5' />
          Login
        </CardTitle>
        <CardDescription className='text-center'>
          Digite suas credenciais para acessar o painel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium flex items-center gap-2'
            >
              <Mail className='h-4 w-4' />
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
              placeholder='Digite seu email'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='text-sm font-medium flex items-center gap-2'
            >
              <Lock className='h-4 w-4' />
              Senha
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                required
                className='w-full px-3 py-2 pr-10 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                placeholder='Digite sua senha'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4 text-muted-foreground' />
                ) : (
                  <Eye className='h-4 w-4 text-muted-foreground' />
                )}
              </button>
            </div>
          </div>

          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
