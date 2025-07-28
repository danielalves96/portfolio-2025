'use client';

import { useState } from 'react';

import { ServiceItem } from './service-item';
import { ServicesHeader } from './services-header';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ServicesClientProps {
  services: Service[];
}

export function ServicesClient({ services }: ServicesClientProps) {
  const [expandedService, setExpandedService] = useState<number | null>(1);

  const toggleService = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section className='w-full bg-background pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <ServicesHeader />

        {/* Services List */}
        <div className='space-y-0'>
          {services.map(service => (
            <ServiceItem
              key={service.id}
              service={service}
              isExpanded={expandedService === service.id}
              onToggle={() => toggleService(service.id)}
            />
          ))}
        </div>
      </div>
      <div className='text-center mt-12 sm:mt-16 lg:mt-24'>
        <div className='text-orange-500 text-3xl sm:text-4xl lg:text-5xl'>
          ✦
        </div>
      </div>
    </section>
  );
}
