import { getSkillsData } from '@/lib/actions/data-fetching';

import { SkillItem } from './skill-item';

export async function SkillsCarousel() {
  const skills = await getSkillsData();

  if (!skills || skills.length === 0) {
    return null;
  }

  const duplicatedSkills = Array(50).fill(skills).flat();

  return (
    <section className='w-full bg-card/50 border py-3 sm:py-4 overflow-hidden'>
      <div className='flex animate-scroll-infinite whitespace-nowrap'>
        {duplicatedSkills.map((skill, index) => (
          <SkillItem key={index} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
}
