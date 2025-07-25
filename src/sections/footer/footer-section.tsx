import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { FooterCopyright } from './footer-copyright';
import { footerData } from './footer-data';
import { FooterNavigation } from './footer-navigation';

export function FooterSection() {
  return (
    <section className='border-t'>
      <footer className='max-w-7xl mx-auto py-16'>
        <div className='flex flex-col items-center space-y-8'>
          <h1 className='text-6xl md:text-9xl font-normal text-center'>
            Let
            <span className='text-orange-500'>
              {footerData.title.highlightChar}
            </span>
            s Work
          </h1>
          <div className='mt-6'>
            <Button
              size='xl'
              variant='outline'
              className='border-orange-500 hover:bg-orange-500 hover:text-orange-500-foreground transition-colors'
              asChild
            >
              <Link href={`mailto:${footerData.contact.email}`}>
                {footerData.contact.email}
              </Link>
            </Button>
          </div>
          <FooterNavigation />
          <FooterCopyright />
        </div>
      </footer>
    </section>
  );
}
