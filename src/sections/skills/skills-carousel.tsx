'use client';

import { SkillItem } from './skill-item';
import { skills } from './skills-data';

export function SkillsCarousel() {
  const duplicatedSkills = Array(50).fill(skills).flat();

  return (
    <section className='w-full bg-card/50 border py-4 overflow-hidden'>
      <div className='flex animate-scroll-infinite whitespace-nowrap'>
        {duplicatedSkills.map((skill, index) => (
          <SkillItem key={index} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
}
