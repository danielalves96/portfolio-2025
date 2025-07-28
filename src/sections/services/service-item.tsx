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
        className='flex items-center justify-between p-4 sm:p-5 lg:p-6 cursor-pointer hover:bg-muted/20 transition-colors duration-200'
        onClick={onToggle}
      >
        <div className='flex items-center space-x-2 sm:space-x-3 lg:space-x-4'>
          <span className='text-muted-foreground text-sm sm:text-base lg:text-lg font-medium'>
            ({service.id.toString().padStart(2, '0')})
          </span>
          <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold text-foreground uppercase tracking-wide'>
            {service.title}
          </h3>
        </div>
        <div className='text-orange-500'>
          {isExpanded ? (
            <ChevronUp size={20} className='sm:w-6 sm:h-6' />
          ) : (
            <ChevronDown size={20} className='sm:w-6 sm:h-6' />
          )}
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
              loading='lazy'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
            />

            {/* Orange Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-orange-700/90 via-orange-600/70 to-transparent' />

            {/* Text Content Overlay */}
            <div className='absolute inset-0 flex items-end'>
              <div className='p-4 sm:p-6 md:p-8 lg:p-12 text-white max-w-5xl'>
                <p className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed'>
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
