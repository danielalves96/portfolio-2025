'use client';

import { useState } from 'react';

import { ProjectCard } from './project-card';
import { ProjectFilters } from './project-filters';
import { ProjectHeader } from './project-header';
import { projectsData } from './projects-data';

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  // Ordenar projetos do mais recente para o mais antigo
  const sortedProjects = [...projectsData.projects].sort((a, b) => {
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
