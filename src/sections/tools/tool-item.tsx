'use client';

import { useState } from 'react';

import Image from 'next/image';

import * as SiIcons from 'react-icons/si';

import { BlurFade } from '@/components/animations/blur-fade';

interface Tool {
  id: number;
  name: string;
  image: string;
  iconComponent?: string;
}

interface ToolItemProps {
  tool: Tool;
  index: number;
}

export function ToolItem({ tool, index }: ToolItemProps) {
  const [imageError, setImageError] = useState(false);

  // Obter o ícone do React Icons se disponível
  const IconComponent = tool.iconComponent
    ? (SiIcons as any)[tool.iconComponent]
    : null;

  return (
    <BlurFade key={tool.id} delay={0.2 + index * 0.1} inView>
      <div className='group flex flex-col items-center transition-all duration-300 hover:scale-110'>
        {/* Tool Icon */}
        <div className='relative w-22 h-22 mb-3 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center'>
          {!imageError && tool.image ? (
            <Image
              src={tool.image}
              alt={tool.name}
              fill
              className='object-contain filter group-hover:brightness-110 group-hover:drop-shadow-lg transition-all duration-300'
              onError={() => setImageError(true)}
            />
          ) : IconComponent ? (
            <IconComponent className='w-12 h-12 text-foreground group-hover:scale-110 transition-transform duration-300' />
          ) : (
            <div className='w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs font-medium'>
              {tool.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Tool Name */}
        {/* <p className='text-sm font-medium text-foreground text-center'>
          {tool.name}
        </p> */}
      </div>
    </BlurFade>
  );
}
