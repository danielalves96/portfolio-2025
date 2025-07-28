import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { getFooterData } from '@/lib/actions/data-fetching';

import { FooterCopyright } from './footer-copyright';
import { FooterNavigation } from './footer-navigation';

export async function FooterSection() {
  const footerData = await getFooterData();

  if (!footerData) {
    return null;
  }
  return (
    <section className='border-t'>
      <footer className='max-w-7xl mx-auto pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 px-4'>
        <div className='flex flex-col items-center space-y-6 sm:space-y-8'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-normal text-center leading-tight'>
            Let
            <span className='text-orange-500'>'</span>s Work
          </h1>
          <div className='mt-4 sm:mt-6'>
            <Button
              size='xl'
              variant='outline'
              className='border-orange-500 hover:bg-orange-500 hover:text-orange-500-foreground transition-colors text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3'
              asChild
            >
              <Link href='mailto:paolatoliveira@gmail.com'>
                paolatoliveira@gmail.com
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
