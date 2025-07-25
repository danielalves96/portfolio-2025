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
      <footer className='max-w-7xl mx-auto pt-16 pb-8'>
        <div className='flex flex-col items-center space-y-8'>
          <h1 className='text-6xl md:text-9xl font-normal text-center'>
            Let
            <span className='text-orange-500'>'</span>s Work
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
          <FooterNavigation />
          <FooterCopyright />
        </div>
      </footer>
    </section>
  );
}
