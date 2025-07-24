'use client';

import Image from 'next/image';

import { BlurFade } from '../magicui/blur-fade';

interface Tool {
  id: number;
  name: string;
  icon: string;
}

const tools: Tool[] = [
  {
    id: 1,
    name: 'Figma',
    icon: '/tools/figma.svg',
  },
  {
    id: 2,
    name: 'Sketch',
    icon: '/tools/sketch.svg',
  },
  {
    id: 3,
    name: 'Adobe Photoshop',
    icon: '/tools/adobe-photoshop.svg',
  },
  {
    id: 4,
    name: 'Adobe XD',
    icon: '/tools/adobe-xd.svg',
  },
  {
    id: 5,
    name: 'Adobe Creative Suite',
    icon: '/tools/adobe-icon.svg',
  },
  {
    id: 6,
    name: 'Miro',
    icon: '/tools/miro-icon.svg',
  },
  {
    id: 7,
    name: 'Notion',
    icon: '/tools/notion-icon.svg',
  },
  {
    id: 8,
    name: 'Trello',
    icon: '/tools/trello.svg',
  },
  {
    id: 9,
    name: 'Atlassian',
    icon: '/tools/atlassian.svg',
  },
];

export function ToolsSection() {
  return (
    <section className='w-full bg-background pt-16 pb-30 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <BlurFade delay={0.1} inView>
          <div className='text-center mb-12'>
            <div className='text-orange-500 text-5xl mb-24 mt-8'>✦</div>

            <h1 className='text-6xl md:text-8xl font-semi-bold tracking-wider mb-8'>
              FERRAMENTAS
            </h1>
            <p className='text-lg md:text-xl mb-4'>
              Algumas das ferramentas que utilizo no dia a dia para entregar
              soluções de design inovadoras e eficientes.
            </p>
          </div>
        </BlurFade>

        {/* Tools Grid */}
        <div className='flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20 mt-16 px-4'>
          {tools.map((tool, index) => (
            <BlurFade key={tool.id} delay={0.2 + index * 0.1} inView>
              <div className='group flex flex-col items-center transition-all duration-300 hover:scale-110'>
                {/* Tool Icon */}
                <div className='relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-105 transition-transform duration-300'>
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    fill
                    className='object-contain filter group-hover:brightness-110 group-hover:drop-shadow-lg transition-all duration-300'
                  />
                </div>

                {/* Tool Name */}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
