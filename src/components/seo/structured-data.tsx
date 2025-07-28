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
