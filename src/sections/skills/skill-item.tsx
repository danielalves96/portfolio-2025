'use client';

import { Dot } from 'lucide-react';

interface Skill {
  id: number;
  name: string;
  image: string;
}

interface SkillItemProps {
  skill: Skill;
  index: number;
}

export function SkillItem({ skill, index }: SkillItemProps) {
  return (
    <div key={index} className='flex items-center'>
      <span className='text-muted-foreground text-2xl md:text-3xl font-bold mr-8'>
        {skill.name}
      </span>
      <Dot size={40} className='text-muted-foreground mr-6' />
    </div>
  );
}
