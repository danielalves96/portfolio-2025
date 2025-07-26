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
    <div className='border'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='flex flex-col justify-between p-6 h-full'>
          <ProjectInfo project={project} />
          <ProjectSocialLinks project={project} />
        </div>
        <ProjectImage project={project} index={index} />
      </div>
    </div>
  );
}
