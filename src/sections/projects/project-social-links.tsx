'use client';

import Link from 'next/link';

import { FaBehance, FaDribbble, FaFigma } from 'react-icons/fa';

import { Project } from './projects-data';

interface ProjectSocialLinksProps {
  project: Project;
}

export function ProjectSocialLinks({ project }: ProjectSocialLinksProps) {
  return (
    <div className='flex gap-3 pt-4 mt-auto'>
      {project.behanceUrl && (
        <Link
          href={project.behanceUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
          title='Ver no Behance'
        >
          <FaBehance className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
        </Link>
      )}
      {project.dribbbleUrl && (
        <Link
          href={project.dribbbleUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
          title='Ver no Dribbble'
        >
          <FaDribbble className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
        </Link>
      )}
      {project.figmaDesktop && (
        <Link
          href={project.figmaDesktop}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
          title='Ver Figma Desktop'
        >
          <FaFigma className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
        </Link>
      )}
      {project.figmaMobile && (
        <Link
          href={project.figmaMobile}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
          title='Ver Figma Mobile'
        >
          <FaFigma className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
        </Link>
      )}
    </div>
  );
}
