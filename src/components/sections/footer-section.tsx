import Link from 'next/link';

import { Button } from '../ui/button';

export function FooterSection() {
  return (
    <section className='border-t'>
      <footer className='max-w-7xl mx-auto  py-16'>
        <div className='flex flex-col items-center space-y-8'>
          <h1 className='text-6xl md:text-9xl font-normal text-center'>
            Let<span className='text-orange-500'>'</span>s Work
          </h1>
          <div className='mt-6'>
            <Button
              size='xl'
              variant='outline'
              className='border-orange-500 hover:bg-orange-500 hover:text-orange-500-foreground transition-colors'
              asChild
            >
              <Link href='mailto:paolatoliveira@gmail.com'>
                paolatoliveira@gmail.com
              </Link>
            </Button>
          </div>
          <nav className='flex justify-center items-center gap-6 text-sm'>
            <Link
              href='#about'
              className='text-orange-500 hover:text-orange-500/80 underline underline-offset-4 transition-colors'
            >
              Sobre mim
            </Link>
            <Link
              href='#contact'
              className='text-orange-500 hover:text-orange-500/80 underline underline-offset-4 transition-colors'
            >
              Contato
            </Link>
            <Link
              href='#projects'
              className='text-orange-500 hover:text-orange-500/80 underline underline-offset-4 transition-colors'
            >
              Meus trabalhos
            </Link>
          </nav>
          <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-sm text-muted-foreground'>
            <p>
              © {new Date().getFullYear()}{' '}
              <a
                href='https://kyantech.com.br'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline hover:text-orange-500 transition-colors'
              >
                Kyantech Solutions
              </a>
              . Todos os direitos reservados.
            </p>
            <p>Designed By. Paola Oliveira</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
