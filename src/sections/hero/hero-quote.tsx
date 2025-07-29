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
        {/* Quote para mobile (< 768px): 3 linhas com seta, centralizado */}
        <blockquote className='md:hidden text-lg sm:text-xl font-medium leading-relaxed text-center'>
          <TextAnimate
            animation='blurInUp'
            by='character'
            delay={1}
            triggerOnce
          >
            {'"' + heroData.quoteText[0]}
          </TextAnimate>
          <span className='block'>
            <span className='inline-flex items-center justify-center space-x-2 my-2'>
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

        {/* Quote para tablet (md-lg): uma linha sem seta */}
        <blockquote className='hidden md:block xl:hidden text-lg lg:text-lg font-medium leading-relaxed text-center'>
          <TextAnimate
            animation='blurInUp'
            by='character'
            delay={1}
            triggerOnce
          >
            {'"' + heroData.quoteText.join(' ') + '"'}
          </TextAnimate>
        </blockquote>

        {/* Desktop XL+: formato original 3 linhas com seta */}
        <blockquote className='hidden xl:block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-4xl font-medium leading-relaxed'>
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
