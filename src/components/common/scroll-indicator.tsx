'use client';

import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showScrollIndicator) return null;

  return (
    <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300 hidden md:block'>
      <div className='animate-bounce'>
        <svg
          className='w-8 h-8 text-orange-500 dark:text-orange-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 14l-7 7m0 0l-7-7m7 7V3'
          />
        </svg>
      </div>
    </div>
  );
}
