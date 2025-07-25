'use client';

import { useState } from 'react';

import { ServiceItem } from './service-item';
import { servicesData } from './services-data';
import { ServicesHeader } from './services-header';

export function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(1);

  const toggleService = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section className='w-full bg-background pt-16 pb-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <ServicesHeader />

        {/* Services List */}
        <div className='space-y-0'>
          {servicesData.services.map(service => (
            <ServiceItem
              key={service.id}
              service={service}
              isExpanded={expandedService === service.id}
              onToggle={() => toggleService(service.id)}
            />
          ))}
        </div>
      </div>
      <div className='text-center mt-24'>
        <div className='text-orange-500 text-5xl'>✦</div>
      </div>
    </section>
  );
}
