'use client';

import { Project } from '@/types/project';

interface ProjectInfoProps {
  project: Project;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className='space-y-4 sm:space-y-5 lg:space-y-6'>
      <div>
        <p className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2'>
          Projeto
        </p>
        <h3 className='text-orange-500 font-semibold text-lg sm:text-xl mb-1 sm:mb-2'>
          {project.title}
        </h3>
        <p className='text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed'>
          {project.description}
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
        <div>
          <p className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2'>
            Categorias
          </p>
          <p className='text-gray-700 dark:text-gray-300 text-xs sm:text-sm'>
            {project.category.join(' | ')}
          </p>
        </div>
        <div>
          <p className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2'>
            Ano
          </p>
          <p className='text-gray-700 dark:text-gray-300 text-xs sm:text-sm'>
            {project.year}
          </p>
        </div>
      </div>

      <div>
        <p className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2'>
          O que realizei
        </p>
        <p className='text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed'>
          {project.whatIAccomplished}
        </p>
      </div>
    </div>
  );
}
