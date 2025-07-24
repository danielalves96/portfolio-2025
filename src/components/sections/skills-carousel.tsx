'use client';

import { Dot } from 'lucide-react';

const skills = [
  'Web Design',
  'App Design',
  'Wireframe',
  'Dashboard',
  'Prototipação',
  'UX Writing',
  'Design System',
  'UI Design',
  'UX Design',
];

export function SkillsCarousel() {
  const duplicatedSkills = Array(50).fill(skills).flat();

  return (
    <section className='w-full bg-card/50 border py-4 overflow-hidden'>
      <div className='flex animate-scroll-infinite whitespace-nowrap'>
        {duplicatedSkills.map((skill, index) => (
          <div key={index} className='flex items-center'>
            <span className='text-muted-foreground text-2xl md:text-3xl font-bold mr-8'>
              {skill}
            </span>
            <Dot size={40} className='text-muted-foreground mr-6' />
          </div>
        ))}
      </div>
    </section>
  );
}
