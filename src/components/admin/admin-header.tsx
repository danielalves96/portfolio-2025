'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Home, LogOut, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { logoutAction } from '@/lib/actions/auth-actions';

export default function AdminHeader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await logoutAction();
        // Success is handled by redirect, no need for toast here
      } catch {
        // This catch is for the redirect, which is expected behavior
        // Don't show any error message for redirects
      }
    });
  };

  const goToHomepage = () => {
    router.push('/');
  };

  return (
    <header className='border-b bg-card'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-semibold'>Painel Administrativo</h1>
            <p className='text-sm text-muted-foreground'>
              Gerencie o conteúdo do portfólio
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='flex items-center gap-2'
              >
                <User className='h-4 w-4' />
                <span className='hidden sm:inline'>Paola Oliveira</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={goToHomepage}>
                <Home className='mr-2 h-4 w-4' />
                Ver Site
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className='text-red-600'
                disabled={isPending}
              >
                <LogOut className='mr-2 h-4 w-4' />
                {isPending ? 'Saindo...' : 'Sair'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
