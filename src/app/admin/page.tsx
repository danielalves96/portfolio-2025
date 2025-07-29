import { Metadata } from 'next';

import {
  Briefcase,
  FileText,
  Globe,
  MessageSquare,
  Navigation,
  Palette,
  Settings,
  User,
  Wrench,
} from 'lucide-react';

import AdminHeader from '@/components/admin/admin-header';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Portfolio',
  description: 'Painel administrativo para gerenciar dados do portfólio',
};

const adminSections = [
  {
    id: 'hero',
    title: 'Hero Section',
    description: 'Gerenciar dados da seção principal',
    icon: User,
    count: 1,
    tables: ['hero', 'social_links'],
  },
  {
    id: 'about',
    title: 'Sobre',
    description: 'Informações pessoais e biografia',
    icon: FileText,
    count: 1,
    tables: ['about'],
  },
  {
    id: 'projects',
    title: 'Projetos',
    description: 'Portfólio de projetos e trabalhos',
    icon: Briefcase,
    count: '~',
    tables: ['projects'],
  },
  {
    id: 'services',
    title: 'Serviços',
    description: 'Serviços oferecidos',
    icon: Settings,
    count: '~',
    tables: ['services'],
  },
  {
    id: 'skills',
    title: 'Habilidades',
    description: 'Skills e competências técnicas',
    icon: Palette,
    count: '~',
    tables: ['skills'],
  },
  {
    id: 'tools',
    title: 'Ferramentas',
    description: 'Ferramentas e tecnologias utilizadas',
    icon: Wrench,
    count: '~',
    tables: ['tools'],
  },
  {
    id: 'contact',
    title: 'Contato',
    description: 'Configurações de contato e email',
    icon: MessageSquare,
    count: 1,
    tables: ['contact'],
  },
  {
    id: 'social',
    title: 'Redes Sociais',
    description: 'Links e perfis sociais',
    icon: Globe,
    count: '~',
    tables: ['social_section'],
  },
  {
    id: 'footer',
    title: 'Rodapé',
    description: 'Footer e navegação',
    icon: Navigation,
    count: 1,
    tables: ['footer', 'footer_navigation'],
  },
];

export default function AdminPage() {
  return (
    <div className='min-h-screen bg-background'>
      <AdminHeader
        title='Dashboard'
        subtitle='Bem-vinda de volta! Selecione uma seção para gerenciar o conteúdo do seu portfólio.'
      />
      <main className='container mx-auto py-8 px-4 max-w-7xl'>
        <div className='space-y-8'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='p-4 border rounded-lg bg-card'>
              <div className='flex items-center gap-2'>
                <div className='p-1 rounded bg-green-100 dark:bg-green-900/20'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                </div>
                <span className='text-sm font-medium'>Site Online</span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Última atualização: hoje
              </p>
            </div>

            <div className='p-4 border rounded-lg bg-card'>
              <div className='flex items-center gap-2'>
                <Briefcase className='h-4 w-4 text-primary' />
                <span className='text-sm font-medium'>9 Seções</span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Disponíveis para edição
              </p>
            </div>

            <div className='p-4 border rounded-lg bg-card'>
              <div className='flex items-center gap-2'>
                <Settings className='h-4 w-4 text-primary' />
                <span className='text-sm font-medium'>Configurado</span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Sistema pronto para uso
              </p>
            </div>

            <div className='p-4 border rounded-lg bg-card'>
              <div className='flex items-center gap-2'>
                <User className='h-4 w-4 text-primary' />
                <span className='text-sm font-medium'>Admin</span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Paola Oliveira
              </p>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>Seções do Portfólio</h2>
              <p className='text-sm text-muted-foreground'>
                {adminSections.length} seções disponíveis
              </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {adminSections.map(section => {
                const IconComponent = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`/admin/${section.id}`}
                    className='group relative flex flex-col p-6 text-left border rounded-xl hover:bg-accent/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1'
                  >
                    <div className='flex items-start gap-4 mb-4'>
                      <div className='flex-shrink-0 p-3 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/15 transition-colors'>
                        <IconComponent className='h-6 w-6 text-primary' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='font-semibold text-foreground group-hover:text-orange-500transition-colors truncate'>
                            {section.title}
                          </h3>
                        </div>
                        <p className='text-sm text-muted-foreground leading-relaxed'>
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className='mt-auto pt-4 border-t border-border/50'>
                      <div className='flex items-center justify-end text-xs text-muted-foreground'>
                        <span className='text-orange-500group-hover:text-primary/80'>
                          Gerenciar →
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
