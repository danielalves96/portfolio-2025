import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import AboutAdmin from '@/components/admin/about-admin';
import ContactAdmin from '@/components/admin/contact-admin';
import FooterAdmin from '@/components/admin/footer-admin';
import HeroAdmin from '@/components/admin/hero-admin';
import ProjectsAdmin from '@/components/admin/projects-admin';
import ServicesAdmin from '@/components/admin/services-admin';
import SkillsAdmin from '@/components/admin/skills-admin';
import SocialAdmin from '@/components/admin/social-admin';
import ToolsAdmin from '@/components/admin/tools-admin';
import { Button } from '@/components/ui/button';

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

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <Button variant='outline' size='icon' asChild>
              <Link href='/admin'>
                <ArrowLeft className='h-4 w-4' />
              </Link>
            </Button>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                {sectionTitles[sectionTyped]}
              </h1>
              <p className='text-muted-foreground'>
                Gerencie os dados da seção{' '}
                {sectionTitles[sectionTyped].toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Section Content */}
        {renderSectionAdmin()}
      </div>
    </div>
  );
}
