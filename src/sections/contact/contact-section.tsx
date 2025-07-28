import { ErrorBoundary } from '@/components/error/error-boundary';
import { ContactErrorFallback } from '@/components/error/section-error-fallback';

import { getContactData } from '@/lib/actions/data-fetching';

import { ContactForm } from './contact-form';

export async function ContactSection() {
  const contactData = await getContactData();

  if (!contactData) {
    return null;
  }
  return (
    <section className='py-12 sm:py-16 lg:py-26 flex items-center justify-center p-4 relative overflow-hidden'>
      <div className='w-full max-w-7xl relative z-10 overflow-hidden'>
        <div className='dark:bg-foreground/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-primary dark:border-amber-600/20 p-6 sm:p-8 lg:p-12 relative'>
          {/* Background decorative elements */}
          <div className='absolute inset-0 -z-10'>
            <div className='absolute -top-12 sm:-top-16 lg:-top-20 -left-12 sm:-left-16 lg:-left-24 w-[20rem] sm:w-[25rem] lg:w-[30rem] h-[20rem] sm:h-[25rem] lg:h-[30rem] bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[80px] sm:blur-[100px]' />
            <div className='absolute -top-12 sm:-top-16 lg:-top-24 -right-12 sm:-right-16 lg:-right-24 w-[15rem] sm:w-[18rem] lg:w-[20rem] h-[15rem] sm:h-[18rem] lg:h-[20rem] bg-orange-500/15 dark:bg-orange-500/8 rounded-full blur-[80px] sm:blur-[100px]' />
            <div className='absolute top-1/2 -left-14 sm:-left-20 lg:-left-28 w-[15rem] sm:w-[18rem] lg:w-[20rem] h-[15rem] sm:h-[18rem] lg:h-[20rem] bg-orange-500/18 dark:bg-orange-500/10 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2' />
            <div className='absolute bottom-1/4 -right-10 sm:-right-15 lg:-right-20 w-[18rem] sm:w-[20rem] lg:w-[22rem] h-[18rem] sm:h-[20rem] lg:h-[22rem] bg-orange-500/15 dark:bg-orange-500/8 rounded-full blur-[80px] sm:blur-[100px]' />
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[12rem] sm:w-[14rem] lg:w-[16rem] h-[12rem] sm:h-[14rem] lg:h-[16rem] bg-orange-500/12 dark:bg-orange-500/6 rounded-full blur-[100px] sm:blur-[120px]' />
          </div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-center mb-8 sm:mb-10 lg:mb-12 px-4'>
            {contactData.title}
          </h2>

          <ErrorBoundary fallback={<ContactErrorFallback />}>
            <ContactForm />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
}
