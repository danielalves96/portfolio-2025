'use client';

import { BlurFade } from '@/components/animations/blur-fade';
import { ScrollIndicator } from '@/components/common/scroll-indicator';

import { HeroBackground } from './hero-background';
import { heroData } from './hero-data';
import { HeroQuote } from './hero-quote';
import { HeroTitle } from './hero-title';
import { ProfileImage } from './profile-image';

export function HeroSection() {
  return (
    <section className='min-h-screen relative overflow-hidden'>
      <HeroBackground />
      <div className='relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen'>
        <HeroTitle />
        <div className='flex-1 flex flex-col items-center space-y-8 my-12 lg:my-0'>
          <BlurFade inView={true} delay={0.55}>
            <ProfileImage
              src={heroData.profile.src}
              alt={heroData.profile.alt}
              name={heroData.profile.name}
            />
          </BlurFade>
        </div>
        <HeroQuote />
      </div>
      <ScrollIndicator />
    </section>
  );
}
