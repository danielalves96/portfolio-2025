import { BlurFade } from '@/components/animations/blur-fade';
import { TextAnimate } from '@/components/animations/text-animate';

import { getHeroData } from '@/lib/actions/data-fetching';

import { SocialLinks } from './social-links';

export async function HeroQuote() {
  const heroData = await getHeroData();

  if (!heroData) {
    return null;
  }
  return (
    <div className='flex-1 space-y-4 sm:space-y-5 lg:space-y-6 text-center lg:text-right'>
      <div className='space-y-3 sm:space-y-4'>
        <blockquote className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-relaxed'>
          <TextAnimate
            animation='blurInUp'
            by='character'
            delay={1}
            triggerOnce
          >
            {'"' + heroData.quoteText[0]}
          </TextAnimate>
          <span className='block'>
            <span className='inline-flex items-center space-x-2'>
              <TextAnimate
                animation='blurInUp'
                by='character'
                delay={1.2}
                triggerOnce
                className='text-orange-500'
              >
                →
              </TextAnimate>
            </span>
            <TextAnimate
              className='inline'
              animation='blurInUp'
              by='character'
              delay={1.4}
              triggerOnce
            >
              {String(heroData.quoteText[1])}
            </TextAnimate>
          </span>
          <TextAnimate
            animation='blurInUp'
            by='character'
            delay={1.6}
            triggerOnce
            className='block'
          >
            {heroData.quoteText[2] + '"'}
          </TextAnimate>
        </blockquote>
        <BlurFade inView={true} delay={1.8}>
          <SocialLinks className='justify-center lg:justify-end mt-8' />
        </BlurFade>
      </div>
    </div>
  );
}
