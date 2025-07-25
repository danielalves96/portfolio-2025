'use client';

import { Project } from './projects-data';

interface ProjectInfoProps {
  project: Project;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className='space-y-6'>
      <div>
        <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Projeto</p>
        <h3 className='text-orange-500 font-semibold text-xl mb-2'>
          {project.title}
        </h3>
        <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
          {project.description}
        </p>
      </div>

      <div className='grid grid-cols-2 gap-8'>
        <div>
          <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
            Categorias
          </p>
          <p className='text-black dark:text-white text-lg'>
            {project.category.join(' | ')}
          </p>
        </div>
        <div>
          <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Ano</p>
          <p className='text-black dark:text-white text-lg'>{project.year}</p>
        </div>
      </div>
    </div>
  );
}
