import { getProjectsData } from '@/lib/actions/data-fetching';

import { ProjectsClient } from './projects-client';

export async function ProjectsSection() {
  const projectsData = await getProjectsData();

  if (!projectsData) {
    return null;
  }

  return <ProjectsClient projects={projectsData.projects} />;
}
