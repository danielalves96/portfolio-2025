'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Home, LogOut, User } from 'lucide-react';

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';
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

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export default function AdminHeader({
  title = 'Painel Administrativo',
  subtitle = 'Gerencie o conteúdo do portfólio',
  breadcrumbs,
  actions,
}: AdminHeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await logoutAction();
      } catch {
        // This catch is for the redirect, which is expected behavior
      }
    });
  };

  const goToHomepage = () => {
    router.push('/');
  };

  return (
    <div className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      {/* Main Header */}
      <header className='border-b'>
        <div className='container mx-auto px-4 py-4 max-w-7xl'>
          <div className='flex items-center justify-between'>
            {/* Left side - Back button + Title and subtitle */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-4'>
                {/* Back button area - positioned before title */}
                {actions && (
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    {actions}
                  </div>
                )}
                <div className='min-w-0 flex-1'>
                  <h1 className='text-2xl font-bold tracking-tight text-foreground truncate'>
                    {title}
                  </h1>
                  {subtitle && (
                    <p className='text-sm text-muted-foreground mt-1 leading-relaxed'>
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - User menu */}
            <div className='flex items-center gap-2 ml-6'>
              <Button
                variant='ghost'
                size='sm'
                onClick={goToHomepage}
                className='hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground'
              >
                <Home className='h-4 w-4' />
                Ver Site
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='flex items-center gap-2 text-muted-foreground hover:text-foreground'
                  >
                    <User className='h-4 w-4' />
                    <span className='hidden md:inline font-medium'>
                      Paola Oliveira
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={goToHomepage}
                    className='sm:hidden'
                  >
                    <Home className='mr-2 h-4 w-4' />
                    Ver Site
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className='text-destructive focus:text-destructive'
                    disabled={isPending}
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    {isPending ? 'Saindo...' : 'Sair'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Section - Separate from header */}
      {breadcrumbs && (
        <div className='border-b bg-muted/30'>
          <div className='container mx-auto px-4 py-3 max-w-7xl'>
            <Breadcrumb items={breadcrumbs} />
          </div>
        </div>
      )}
    </div>
  );
}
