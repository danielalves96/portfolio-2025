'use client';

import { BlurFade } from '@/components/animations/blur-fade';

import { toolsData } from './tools-data';

export function ToolsHeader() {
  return (
    <BlurFade delay={0.1} inView>
      <div className='text-center mb-8 sm:mb-10 lg:mb-12'>
        <div className='text-orange-500 text-3xl sm:text-4xl lg:text-5xl mb-12 sm:mb-16 lg:mb-24 mt-4 sm:mt-6 lg:mt-8'>
          ✦
        </div>

        <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semi-bold tracking-wide sm:tracking-wider mb-4 sm:mb-6 lg:mb-8 px-4'>
          {toolsData.title}
        </h2>
        <p className='text-base sm:text-lg lg:text-xl mb-3 sm:mb-4 px-4 max-w-4xl mx-auto'>
          {toolsData.description}
        </p>
      </div>
    </BlurFade>
  );
}
