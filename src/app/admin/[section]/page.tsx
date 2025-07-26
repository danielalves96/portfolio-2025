import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AboutAdmin from '@/components/admin/about-admin';
import AdminHeader from '@/components/admin/admin-header';
import ContactAdmin from '@/components/admin/contact-admin';
import FooterAdmin from '@/components/admin/footer-admin';
import HeroAdmin from '@/components/admin/hero-admin';
import ProjectsAdmin from '@/components/admin/projects-admin';
import ServicesAdmin from '@/components/admin/services-admin';
import SkillsAdmin from '@/components/admin/skills-admin';
import SocialAdmin from '@/components/admin/social-admin';
import ToolsAdmin from '@/components/admin/tools-admin';
import { BackButton } from '@/components/ui/back-button';
import { BreadcrumbItem } from '@/components/ui/breadcrumb';

const validSections = [
  'hero',
  'about',
  'projects',
  'services',
  'skills',
  'tools',
  'contact',
  'social',
  'footer',
] as const;

type Section = (typeof validSections)[number];

const sectionTitles: Record<Section, string> = {
  hero: 'Hero Section',
  about: 'Sobre',
  projects: 'Projetos',
  services: 'Serviços',
  skills: 'Habilidades',
  tools: 'Ferramentas',
  contact: 'Contato',
  social: 'Redes Sociais',
  footer: 'Rodapé',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const sectionTyped = section as Section;

  if (!validSections.includes(sectionTyped)) {
    return {
      title: 'Seção não encontrada',
    };
  }

  return {
    title: `${sectionTitles[sectionTyped]} | Admin Dashboard`,
    description: `Gerenciar dados da seção ${sectionTitles[sectionTyped].toLowerCase()}`,
  };
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const sectionTyped = section as Section;

  if (!validSections.includes(sectionTyped)) {
    notFound();
  }

  const renderSectionAdmin = () => {
    switch (sectionTyped) {
      case 'hero':
        return <HeroAdmin />;
      case 'about':
        return <AboutAdmin />;
      case 'projects':
        return <ProjectsAdmin />;
      case 'services':
        return <ServicesAdmin />;
      case 'skills':
        return <SkillsAdmin />;
      case 'tools':
        return <ToolsAdmin />;
      case 'contact':
        return <ContactAdmin />;
      case 'social':
        return <SocialAdmin />;
      case 'footer':
        return <FooterAdmin />;
      default:
        return null;
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/admin' },
    { label: sectionTitles[sectionTyped], current: true },
  ];

  const headerActions = (
    <BackButton href='/admin' iconOnly variant='outline' size='icon' />
  );

  return (
    <div className='min-h-screen bg-background'>
      <AdminHeader
        title={sectionTitles[sectionTyped]}
        subtitle={`Gerencie os dados da seção ${sectionTitles[sectionTyped].toLowerCase()}`}
        breadcrumbs={breadcrumbs}
        actions={headerActions}
      />
      <main className='container mx-auto py-8 px-4 max-w-7xl'>
        <div className='space-y-6'>{renderSectionAdmin()}</div>
      </main>
    </div>
  );
}
