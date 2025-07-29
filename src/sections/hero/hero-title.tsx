import { BlurFade } from '@/components/animations/blur-fade';

import { getHeroData } from '@/lib/actions/data-fetching';

export async function HeroTitle() {
  const heroData = await getHeroData();

  if (!heroData) {
    return null;
  }
  return (
    <div className='flex-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left xl:text-left lg:pr-6'>
      <div className='space-y-2 sm:space-y-3 lg:space-y-4'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-wide sm:tracking-wider text-black dark:text-white leading-tight'>
          <BlurFade inView={true}>{heroData.titleLine1}</BlurFade>
          <BlurFade inView={true} delay={0.4}>
            <span className='block text-orange-500 mt-1 sm:mt-2'>
              {heroData.titleLine2}
            </span>
          </BlurFade>
        </h1>
      </div>
    </div>
  );
}
