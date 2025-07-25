'use client';

import { contactData } from './contact-data';
import { ContactForm } from './contact-form';

export function ContactSection() {
  return (
    <section className='py-26 flex items-center justify-center p-4 relative overflow-hidden'>
      <div className='w-full max-w-7xl relative z-10 overflow-hidden'>
        <div className='dark:bg-foreground/5 backdrop-blur-sm rounded-3xl border border-primary dark:border-amber-600/20 p-8 md:p-12 relative'>
          {/* Background decorative elements */}
          <div className='absolute inset-0 -z-10'>
            <div className='absolute -top-20 -left-24 w-[30rem] h-[30rem] bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[100px]' />
            <div className='absolute -top-24 -right-24 w-[20rem] h-[20rem] bg-orange-500/15 dark:bg-orange-500/8 rounded-full blur-[100px]' />
            <div className='absolute top-1/2 -left-28 w-[20rem] h-[20rem] bg-orange-500/18 dark:bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2' />
            <div className='absolute bottom-1/4 -right-20 w-[22rem] h-[22rem] bg-orange-500/15 dark:bg-orange-500/8 rounded-full blur-[100px]' />
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[16rem] h-[16rem] bg-orange-500/12 dark:bg-orange-500/6 rounded-full blur-[120px]' />
          </div>

          <h1 className='text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-center mb-12'>
            {contactData.title}
          </h1>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
