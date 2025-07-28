'use client';

import { useState } from 'react';

import { Project } from '@/types/project';

import { ProjectCard } from './project-card';
import { ProjectFilters } from './project-filters';
import { ProjectHeader } from './project-header';

interface ProjectsClientProps {
  projects: Project[];
  title: string;
}

export function ProjectsClient({ projects, title }: ProjectsClientProps) {
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  // Usar a ordem definida no admin (campo order)
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  const filteredProjects =
    selectedFilter === 'Todos'
      ? sortedProjects
      : sortedProjects.filter(project => project.tag.includes(selectedFilter));

  return (
    <section className='w-full bg-white dark:bg-black text-black dark:text-white min-h-screen mb-8 px-4'>
      <ProjectHeader title={title} />
      <ProjectFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <div className='max-w-7xl mx-auto'>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
