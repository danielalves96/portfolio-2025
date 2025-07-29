'use client';

import Image from 'next/image';

import {
  generateBlurDataURL,
  generateSizes,
  getImageQuality,
  getLoadingStrategy,
  shouldLoadWithPriority,
} from '@/lib/utils/image-optimization';
import { Project } from '@/types/project';

interface ProjectImageProps {
  project: Project;
  index: number;
}

export function ProjectImage({ project, index }: ProjectImageProps) {
  const priority = shouldLoadWithPriority(index, 'project');

  return (
    <div className='relative m-auto p-6 border-l'>
      <div className='aspect-[15/10] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden group'>
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={450}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-102'
          priority={priority}
          loading={getLoadingStrategy(priority)}
          sizes={generateSizes('project')}
          quality={getImageQuality(priority)}
          placeholder='blur'
          blurDataURL={generateBlurDataURL()}
          onError={e => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
        <div
          className='w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center'
          style={{ display: 'none' }}
        >
          <div className='text-center'>
            <div className='text-gray-700 dark:text-gray-600 text-sm mb-2'>
              {project.title}
            </div>
            <div className='text-gray-600 dark:text-gray-500 text-xs'>
              {project.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
