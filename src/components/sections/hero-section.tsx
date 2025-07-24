'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { BsLinkedin } from 'react-icons/bs';
import { FaBehance, FaDribbble } from 'react-icons/fa';

import { BlurFade } from '../magicui/blur-fade';

export function HeroSection() {
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

  return (
    <section className='min-h-screen  relative overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-xl' />
        <div className='absolute top-40 right-20 w-24 h-24 bg-orange-300/20 dark:bg-orange-400/8 rounded-full blur-xl' />
        <div className='absolute bottom-40 left-20 w-40 h-40 bg-orange-100/40 dark:bg-orange-600/12 rounded-full blur-xl' />
        <div className='absolute bottom-20 right-10 w-28 h-28 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-xl' />
      </div>

      <div className='relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen'>
        <div className='flex-1 space-y-8 text-center lg:text-left'>
          <div className='space-y-4'>
            <h1 className='text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-black dark:text-white'>
              <BlurFade inView={true} delay={0.1}>
                UI UX
              </BlurFade>
              <BlurFade inView={true} delay={0.5}>
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600'>
                  DESIGNER
                </span>
              </BlurFade>
            </h1>
          </div>
        </div>

        {/* Center - Profile image and name */}
        <div className='flex-1 flex flex-col items-center space-y-8 my-12 lg:my-0'>
          {/* Profile image with decorative background */}
          <div className='relative'>
            {/* Decorative background shapes */}
            <div className='absolute -inset-8 bg-gradient-to-br from-orange-200/50 via-orange-300/40 to-orange-400/30 dark:from-orange-500/20 dark:via-orange-600/15 dark:to-orange-700/10 rounded-full blur-2xl' />
            <div className='absolute -inset-4 bg-gradient-to-tr from-orange-300/30 to-orange-400/20 dark:from-orange-400/10 dark:to-orange-500/8 rounded-full' />

            {/* Profile image */}
            <div className='relative w-96 h-96 md:w-80 md:h-80 rounded-full overflow-hidden border-4 shadow-2xl'>
              <Image
                src='/headshot/me.jpeg'
                alt='Paola Oliveira'
                fill
                className='object-cover '
                style={{ transform: 'scale(1.1)' }}
                priority
              />
            </div>

            {/* Name badge - moved to top right */}
            <div className='absolute -top-2 -right-4'>
              <div className='bg-orange-500 px-4 py-2 rounded-full shadow-lg'>
                <span className='text-white font-semibold text-sm'>
                  Paola Oliveira
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Quote */}
        <div className='flex-1 space-y-6 text-center lg:text-right'>
          <div className='space-y-4'>
            <blockquote className='text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed'>
              "GRANDES DESIGNS
              <span className='block'>
                <span className='inline-flex items-center space-x-2'>
                  <span className='text-orange-500'>→</span>
                </span>
                REQUEREM
              </span>
              <span className='block'>GRANDE EMPATIA"</span>
            </blockquote>

            {/* Attribution */}
            <div className='flex justify-center lg:justify-end space-x-4 mt-8'>
              <a
                href='https://www.behance.net/l0la0liveira'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors'
              >
                <FaBehance className='w-5 h-5 text-white' />
              </a>
              <a
                href='https://www.linkedin.com/in/paola-tavares-de-oliveira-83823ba1/'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors'
              >
                <BsLinkedin className='w-5 h-5 text-white' />
              </a>
              <a
                href='https://dribbble.com/l0la0liveira'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors'
              >
                <FaDribbble className='w-5 h-5 text-white' />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator arrow */}
      {showScrollIndicator && (
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300'>
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
      )}
    </section>
  );
}
