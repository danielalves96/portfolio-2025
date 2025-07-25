import { BlurFade } from '@/components/animations/blur-fade';

import { getHeroData } from '@/lib/actions/data-fetching';

export async function HeroTitle() {
  const heroData = await getHeroData();

  if (!heroData) {
    return null;
  }
  return (
    <div className='flex-1 space-y-8 text-center lg:text-left'>
      <div className='space-y-4'>
        <h1 className='text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-black dark:text-white'>
          <BlurFade inView={true}>{heroData.titleLine1}</BlurFade>
          <BlurFade inView={true} delay={0.4}>
            <span className='block text-orange-500'>{heroData.titleLine2}</span>
          </BlurFade>
        </h1>
      </div>
    </div>
  );
}
