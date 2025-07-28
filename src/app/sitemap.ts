import { MetadataRoute } from 'next';

import { getProjectsData } from '@/lib/actions/data-fetching';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://paolauiux.com.br';

  // Fetch dynamic content for lastModified dates
  const [projects] = await Promise.all([
    getProjectsData().catch(() => ({ projects: [] })),
  ]);

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Add individual project URLs if projects exist
  if (projects.projects && projects.projects.length > 0) {
    projects.projects.forEach((project: any) => {
      if (project.figmaUrl) {
        sitemap.push({
          url: project.figmaUrl,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
      if (project.dribbbleUrl) {
        sitemap.push({
          url: project.dribbbleUrl,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
      if (project.behanceUrl) {
        sitemap.push({
          url: project.behanceUrl,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    });
  }

  return sitemap;
}
