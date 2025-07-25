'use client';

import { BlurFade } from '@/components/animations/blur-fade';

import { toolsData } from './tools-data';

export function ToolsHeader() {
  return (
    <BlurFade delay={0.1} inView>
      <div className='text-center mb-12'>
        <div className='text-orange-500 text-5xl mb-24 mt-8'>✦</div>

        <h1 className='text-6xl md:text-8xl font-semi-bold tracking-wider mb-8'>
          {toolsData.title}
        </h1>
        <p className='text-lg md:text-xl mb-4'>{toolsData.description}</p>
      </div>
    </BlurFade>
  );
}
