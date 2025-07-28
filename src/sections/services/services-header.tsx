'use client';

import { servicesData } from './services-data';

export function ServicesHeader() {
  return (
    <div className='text-center mb-8 sm:mb-10 lg:mb-12'>
      <div className='text-orange-500 text-3xl sm:text-4xl lg:text-5xl mb-12 sm:mb-16 lg:mb-24'>
        ✦
      </div>
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semi-bold tracking-wide sm:tracking-wider px-4'>
        {servicesData.title}
      </h1>
    </div>
  );
}
