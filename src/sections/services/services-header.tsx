'use client';

import { servicesData } from './services-data';

export function ServicesHeader() {
  return (
    <div className='text-center mb-12'>
      <div className='text-orange-500 text-5xl mb-24'>✦</div>
      <h1 className='text-6xl md:text-8xl font-semi-bold tracking-wider'>
        {servicesData.title}
      </h1>
    </div>
  );
}
