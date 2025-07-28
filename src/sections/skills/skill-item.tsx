'use client';

import { Dot } from 'lucide-react';

interface Skill {
  id: number;
  name: string;
}

interface SkillItemProps {
  skill: Skill;
  index: number;
}

export function SkillItem({ skill, index }: SkillItemProps) {
  return (
    <div key={index} className='flex items-center'>
      <span className='text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mr-4 sm:mr-6 lg:mr-8'>
        {skill.name}
      </span>
      <Dot
        size={30}
        className='text-muted-foreground mr-3 sm:mr-4 lg:mr-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10'
      />
    </div>
  );
}
