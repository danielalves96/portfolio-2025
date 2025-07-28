'use client';

interface ProjectHeaderProps {
  title: string;
}

export function ProjectHeader({ title }: ProjectHeaderProps) {
  return (
    <div className='text-center py-8 sm:py-12 lg:py-16'>
      <div className='text-orange-500 text-3xl sm:text-4xl lg:text-5xl mb-8 sm:mb-12 lg:mb-20'>
        ✦
      </div>
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semi-bold tracking-wide sm:tracking-wider px-4'>
        {title}
      </h1>
    </div>
  );
}
