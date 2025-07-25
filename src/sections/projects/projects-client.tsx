'use client';

import { useState } from 'react';

import { ProjectCard } from './project-card';
import { ProjectFilters } from './project-filters';
import { ProjectHeader } from './project-header';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  category: string[];
  year: string;
  whatIAccomplished: string;
  figmaMobile: string | null;
  figmaDesktop: string | null;
  dribbbleUrl: string | null;
  behanceUrl: string | null;
}

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  // Ordenar projetos do mais recente para o mais antigo
  const sortedProjects = [...projects].sort((a, b) => {
    // Converter anos para números para comparação correta
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);

    // Ordenação primária: por ano (decrescente)
    if (yearB !== yearA) {
      return yearB - yearA;
    }

    // Ordenação secundária: por ID (decrescente) para projetos do mesmo ano
    // Assumindo que IDs maiores são projetos mais recentes
    return b.id - a.id;
  });

  const filteredProjects =
    selectedFilter === 'Todos'
      ? sortedProjects
      : sortedProjects.filter(project => project.tag.includes(selectedFilter));

  return (
    <section className='w-full bg-white dark:bg-black text-black dark:text-white min-h-screen mb-8'>
      <ProjectHeader />
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
