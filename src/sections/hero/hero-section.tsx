'use client';

import { BlurFade } from '@/components/animations/blur-fade';
import { ScrollIndicator } from '@/components/common/scroll-indicator';

import { heroData } from './hero-data';
import { ProfileImage } from './profile-image';
import { SocialLinks } from './social-links';

export function HeroSection() {
  return (
    <section className='min-h-screen relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-xl' />
        <div className='absolute top-40 right-20 w-24 h-24 bg-orange-300/20 dark:bg-orange-400/8 rounded-full blur-xl' />
        <div className='absolute bottom-40 left-20 w-40 h-40 bg-orange-100/40 dark:bg-orange-600/12 rounded-full blur-xl' />
        <div className='absolute bottom-20 right-10 w-28 h-28 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-xl' />
      </div>

      <div className='relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen'>
        {/* Left side - Title */}
        <div className='flex-1 space-y-8 text-center lg:text-left'>
          <div className='space-y-4'>
            <h1 className='text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-black dark:text-white'>
              <BlurFade inView={true} delay={0.1}>
                {heroData.title.line1}
              </BlurFade>
              <BlurFade inView={true} delay={0.5}>
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600'>
                  {heroData.title.line2}
                </span>
              </BlurFade>
            </h1>
          </div>
        </div>

        {/* Center - Profile image */}
        <div className='flex-1 flex flex-col items-center space-y-8 my-12 lg:my-0'>
          <ProfileImage
            src={heroData.profile.src}
            alt={heroData.profile.alt}
            name={heroData.profile.name}
          />
        </div>

        {/* Right side - Quote and social links */}
        <div className='flex-1 space-y-6 text-center lg:text-right'>
          <div className='space-y-4'>
            <blockquote className='text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed'>
              "{heroData.quote.text[0]}
              <span className='block'>
                <span className='inline-flex items-center space-x-2'>
                  <span className='text-orange-500'>→</span>
                </span>
                {heroData.quote.text[1]}
              </span>
              <span className='block'>{heroData.quote.text[2]}"</span>
            </blockquote>

            <SocialLinks className='justify-center lg:justify-end mt-8' />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
