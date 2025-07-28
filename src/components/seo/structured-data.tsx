import Script from 'next/script';

interface StructuredDataProps {
  data: any;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id='structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const portfolioStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Paola Oliveira',
  jobTitle: 'UI/UX Designer',
  description:
    'UI/UX Designer especializada em design de interfaces, experiência do usuário e projetos digitais inovadores.',
  url: 'https://paolauiux.com.br',
  image: 'https://paolauiux.com.br/og-image.jpg',
  sameAs: [
    'https://linkedin.com/in/paolatoliveira',
    'https://behance.net/l0la0liveira',
    'https://dribbble.com/l0la0liveira',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelancer',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'UI/UX Designer',
    occupationLocation: {
      '@type': 'Country',
      name: 'Brasil',
    },
    description:
      'Especialista em design de interfaces de usuário e experiência do usuário para aplicações web e mobile.',
  },
  knowsAbout: [
    'UI Design',
    'UX Design',
    'Design de Interface',
    'Experiência do Usuário',
    'Design System',
    'Prototipagem',
    'Figma',
    'Adobe Creative Suite',
  ],
  offers: {
    '@type': 'Service',
    serviceType: 'Design Services',
    description:
      'Serviços de UI/UX Design para websites, aplicativos mobile e sistemas web.',
    provider: {
      '@type': 'Person',
      name: 'Paola Oliveira',
    },
  },
};

// Structured data para projetos individuais
export function generateProjectStructuredData(project: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: {
      '@type': 'Person',
      name: 'Paola Oliveira',
      jobTitle: 'UI/UX Designer',
      url: 'https://paolauiux.com.br',
    },
    image: project.image,
    dateCreated: project.createdAt || new Date().toISOString(),
    inLanguage: 'pt-BR',
    category: project.category,
    keywords: project.tags || [],
    url: project.figmaUrl || project.dribbbleUrl || project.behanceUrl,
    sameAs: [project.figmaUrl, project.dribbbleUrl, project.behanceUrl].filter(
      Boolean
    ),
    genre: 'UI/UX Design',
    workExample: {
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      image: project.image,
    },
    isPartOf: {
      '@type': 'Website',
      name: 'Paola Oliveira Portfolio',
      url: 'https://paolauiux.com.br',
    },
  };
}

// Structured data para a seção de projetos
export function generateProjectsCollectionStructuredData(projects: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projetos - Paola Oliveira',
    description: 'Portfólio de projetos de UI/UX Design de Paola Oliveira',
    url: 'https://paolauiux.com.br/#projects',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          image: project.image,
          url: project.figmaUrl || project.dribbbleUrl || project.behanceUrl,
          creator: {
            '@type': 'Person',
            name: 'Paola Oliveira',
          },
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://paolauiux.com.br',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projetos',
          item: 'https://paolauiux.com.br/#projects',
        },
      ],
    },
  };
}

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Website',
  name: 'Paola Oliveira Portfolio',
  description:
    'Portfolio oficial de Paola Oliveira, UI/UX Designer especializada em projetos digitais inovadores.',
  url: 'https://paolauiux.com.br',
  author: {
    '@type': 'Person',
    name: 'Paola Oliveira',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Kyantech Solutions',
    url: 'https://kyantech.com.br',
    email: 'daniel@kyantech.com.br',
    founder: {
      '@type': 'Person',
      name: 'Daniel Luiz Alves',
      jobTitle: 'CEO',
    },
  },
  developer: {
    '@type': 'Organization',
    name: 'Kyantech Solutions',
    url: 'https://kyantech.com.br',
    email: 'daniel@kyantech.com.br',
    founder: {
      '@type': 'Person',
      name: 'Daniel Luiz Alves',
      jobTitle: 'CEO',
    },
  },
  inLanguage: 'pt-BR',
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: {
    '@type': 'Person',
    name: 'Paola Oliveira',
  },
};

// Breadcrumb structured data para navegação principal
export const mainBreadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://paolauiux.com.br',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Sobre',
      item: 'https://paolauiux.com.br/#about',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Projetos',
      item: 'https://paolauiux.com.br/#projects',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Serviços',
      item: 'https://paolauiux.com.br/#services',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Contato',
      item: 'https://paolauiux.com.br/#contact',
    },
  ],
};

// Organization structured data para SEO corporativo
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Paola Oliveira - UI/UX Designer',
  description:
    'Serviços profissionais de UI/UX Design para projetos digitais inovadores',
  url: 'https://paolauiux.com.br',
  telephone: '+55-41-99168-3540',
  email: 'paolatoliveira@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
    addressLocality: 'Brasil',
  },
  founder: {
    '@type': 'Person',
    name: 'Paola Oliveira',
    jobTitle: 'UI/UX Designer',
  },
  serviceType: [
    'UI Design',
    'UX Design',
    'Design de Interface',
    'Experiência do Usuário',
    'Prototipagem',
    'Design System',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Brasil',
  },
};
