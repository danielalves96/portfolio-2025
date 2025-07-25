import { BlurFade } from '@/components/animations/blur-fade';
import { TextAnimate } from '@/components/animations/text-animate';

import { heroData } from './hero-data';
import { SocialLinks } from './social-links';

export function HeroQuote() {
  return (
    <div className='flex-1 space-y-6 text-center lg:text-right'>
      <div className='space-y-4'>
        <blockquote className='text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed'>
          <TextAnimate
            animation='blurInUp'
            by='character'
            delay={1}
            triggerOnce
          >
            {'"' + heroData.quote.text[0]}
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
              {String(heroData.quote.text[1])}
            </TextAnimate>
          </span>
          <TextAnimate
            animation='blurInUp'
            by='character'
            delay={1.6}
            triggerOnce
            className='block'
          >
            {heroData.quote.text[2] + '"'}
          </TextAnimate>
        </blockquote>
        <BlurFade inView={true} delay={1.8}>
          <SocialLinks className='justify-center lg:justify-end mt-8' />
        </BlurFade>
      </div>
    </div>
  );
}
