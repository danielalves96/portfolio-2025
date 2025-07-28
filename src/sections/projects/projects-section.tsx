import { ErrorBoundary } from '@/components/error/error-boundary';
import { ProjectsErrorFallback } from '@/components/error/section-error-fallback';
import {
  generateProjectsCollectionStructuredData,
  StructuredData,
} from '@/components/seo/structured-data';

import { getProjectsData } from '@/lib/actions/data-fetching';

import { ProjectsClient } from './projects-client';

export async function ProjectsSection() {
  const projectsData = await getProjectsData();

  if (!projectsData) {
    return null;
  }

  return (
    <>
      {/* Structured Data for Projects Collection */}
      <StructuredData
        data={generateProjectsCollectionStructuredData(projectsData.projects)}
      />

      <ErrorBoundary fallback={<ProjectsErrorFallback />}>
        <ProjectsClient
          projects={projectsData.projects}
          title={projectsData.title}
        />
      </ErrorBoundary>
    </>
  );
}
