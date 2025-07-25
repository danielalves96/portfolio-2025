'use client';

interface ProjectHeaderProps {
  title: string;
}

export function ProjectHeader({ title }: ProjectHeaderProps) {
  return (
    <div className='text-center py-16'>
      <div className='text-orange-500 text-5xl mb-20'>✦</div>
      <h1 className='text-6xl md:text-8xl font-semi-bold tracking-wider'>
        {title}
      </h1>
    </div>
  );
}
