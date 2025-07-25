'use client';

import Image from 'next/image';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { Service } from './services-data';

interface ServiceItemProps {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ServiceItem({
  service,
  isExpanded,
  onToggle,
}: ServiceItemProps) {
  return (
    <div>
      {/* Service Header */}
      <div
        className='flex items-center justify-between p-6 cursor-pointer hover:bg-muted/20 transition-colors duration-200'
        onClick={onToggle}
      >
        <div className='flex items-center space-x-4'>
          <span className='text-muted-foreground text-lg font-medium'>
            ({service.id.toString().padStart(2, '0')})
          </span>
          <h3 className='text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wide'>
            {service.title}
          </h3>
        </div>
        <div className='text-orange-500'>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='border-b border-border/30'>
          <div className='relative aspect-[21/9] overflow-hidden'>
            {/* Background Image */}
            <Image
              src={service.image}
              alt={service.title}
              fill
              className='object-cover'
            />

            {/* Orange Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-orange-700/90 via-orange-600/70 to-transparent' />

            {/* Text Content Overlay */}
            <div className='absolute inset-0 flex items-end'>
              <div className='p-8 md:p-12 text-white max-w-5xl'>
                <p className='text-lg md:text-xl lg:text-2xl font-medium leading-relaxed'>
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
