'use client';

import Image from 'next/image';

import { BlurFade } from '@/components/animations/blur-fade';

interface Tool {
  id: number;
  name: string;
  image: string;
}

interface ToolItemProps {
  tool: Tool;
  index: number;
}

export function ToolItem({ tool, index }: ToolItemProps) {
  return (
    <BlurFade key={tool.id} delay={0.2 + index * 0.1} inView>
      <div className='group flex flex-col items-center transition-all duration-300 hover:scale-110'>
        {/* Tool Icon */}
        <div className='relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-105 transition-transform duration-300'>
          <Image
            src={tool.image}
            alt={tool.name}
            fill
            className='object-contain filter group-hover:brightness-110 group-hover:drop-shadow-lg transition-all duration-300'
          />
        </div>

        {/* Tool Name */}
      </div>
    </BlurFade>
  );
}
