'use client';

import { Project } from '@/types/project';

import { ProjectImage } from './project-image';
import { ProjectInfo } from './project-info';
import { ProjectSocialLinks } from './project-social-links';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className='border mb-4 sm:-mb-[1px]'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
        <div className='flex flex-col justify-between p-4 sm:p-5 lg:p-6 h-full'>
          <ProjectInfo project={project} />
          <ProjectSocialLinks project={project} />
        </div>
        <ProjectImage project={project} index={index} />
      </div>
    </div>
  );
}
