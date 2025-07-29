import { BlurFade } from '@/components/animations/blur-fade';
import { ScrollIndicator } from '@/components/common/scroll-indicator';

import { getHeroData } from '@/lib/actions/data-fetching';

import { HeroBackground } from './hero-background';
import { HeroQuote } from './hero-quote';
import { HeroTitle } from './hero-title';
import { ProfileImage } from './profile-image';

export async function HeroSection() {
  const heroData = await getHeroData();

  if (!heroData) {
    return null;
  }
  return (
    <section className='min-h-screen relative overflow-hidden'>
      <HeroBackground />
      <div className='relative z-10 container mx-auto px-4 min-h-screen'>
        {/* Mobile Layout (< 768px): Vertical stack with better spacing */}
        <div className='md:hidden flex flex-col items-center justify-center min-h-screen space-y-8 text-center'>
          <div className='order-2'>
            <BlurFade inView={true} delay={0.25}>
              <ProfileImage
                src={heroData.profileSrc}
                alt={heroData.profileAlt}
                name={heroData.profileName}
              />
            </BlurFade>
          </div>
          <div className='order-1'>
            <HeroTitle />
          </div>
          <div className='order-3 w-full max-w-2xl'>
            <HeroQuote />
          </div>
        </div>

        {/* Tablet Layout (768px - 1279px): Improved spacing and typography */}
        <div className='hidden md:flex xl:hidden flex-col items-center justify-center min-h-screen'>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-12'>
            <div className='lg:flex-1 text-center lg:text-left'>
              <HeroTitle />
            </div>
            <div className='flex-shrink-0'>
              <BlurFade inView={true} delay={0.35}>
                <ProfileImage
                  src={heroData.profileSrc}
                  alt={heroData.profileAlt}
                  name={heroData.profileName}
                />
              </BlurFade>
            </div>
          </div>
          <div className='w-full max-w-4xl'>
            <HeroQuote />
          </div>
        </div>

        {/* Desktop Layout (>= 1280px): Layout original restaurado */}
        <div className='hidden xl:flex flex-row items-center justify-between min-h-screen'>
          <HeroTitle />
          <div className='flex-1 flex flex-col items-center space-y-4 sm:space-y-8 my-8 sm:my-12 xl:my-0'>
            <BlurFade inView={true} delay={0.55}>
              <ProfileImage
                src={heroData.profileSrc}
                alt={heroData.profileAlt}
                name={heroData.profileName}
              />
            </BlurFade>
          </div>
          <HeroQuote />
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
