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
      <div className='relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen'>
        <HeroTitle />
        <div className='flex-1 flex flex-col items-center space-y-8 my-12 lg:my-0'>
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
      <ScrollIndicator />
    </section>
  );
}
