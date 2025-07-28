'use client';

import Link from 'next/link';

import { FileQuestion, Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-6'>
      <div className='max-w-lg w-full text-center space-y-8'>
        <div className='mx-auto w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center'>
          <FileQuestion className='w-10 h-10 text-orange-600 dark:text-orange-400' />
        </div>

        <div className='space-y-4'>
          <h1 className='text-4xl font-bold text-foreground'>404</h1>
          <h2 className='text-xl font-semibold text-foreground'>
            Página não encontrada
          </h2>
          <p className='text-muted-foreground'>
            Ops! A página que você está procurando não existe ou foi movida. Que
            tal explorar o portfólio da Paola?
          </p>
        </div>

        <div className='bg-muted/30 border rounded-lg p-6'>
          <h3 className='font-semibold text-foreground mb-4'>
            Navegação rápida:
          </h3>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <Link href='/#about' className='text-primary hover:underline'>
              Sobre Paola
            </Link>
            <Link href='/#projects' className='text-primary hover:underline'>
              Projetos
            </Link>
            <Link href='/#services' className='text-primary hover:underline'>
              Serviços
            </Link>
            <Link href='/#contact' className='text-primary hover:underline'>
              Contato
            </Link>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link href='/'>
            <Button className='flex items-center gap-2 w-full sm:w-auto'>
              <Home className='w-4 h-4' />
              Ir para o início
            </Button>
          </Link>

          <Button
            variant='outline'
            onClick={() => window.history.back()}
            className='flex items-center gap-2'
          >
            <Search className='w-4 h-4' />
            Voltar
          </Button>
        </div>

        <div className='text-xs text-muted-foreground'>
          <p>
            Se você chegou aqui através de um link, por favor nos informe em{' '}
            <a
              href='mailto:daniel@kyantech.com.br?subject=Link quebrado no portfolio'
              className='text-primary hover:underline'
            >
              daniel@kyantech.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
