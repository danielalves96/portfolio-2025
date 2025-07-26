import { Metadata } from 'next';

import {
  Briefcase,
  Database,
  FileText,
  Globe,
  MessageSquare,
  Navigation,
  Palette,
  Settings,
  User,
  Wrench,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-4'>
            <Database className='h-8 w-8 text-primary' />
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                Admin Dashboard
              </h1>
              <p className='text-muted-foreground'>
                Selecione uma seção para gerenciar seus dados
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='gap-1'>
              <Database className='h-3 w-3' />
              {adminSections.length} Seções
            </Badge>
            <Badge variant='outline'>PostgreSQL + Drizzle ORM</Badge>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Dados</CardTitle>
            <CardDescription>
              Selecione uma seção para gerenciar seus dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {adminSections.map(section => {
                const IconComponent = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`/admin/${section.id}`}
                    className='flex items-center gap-3 p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors'
                  >
                    <IconComponent className='h-5 w-5 text-primary flex-shrink-0' />
                    <div>
                      <p className='font-medium'>{section.title}</p>
                      <p className='text-sm text-muted-foreground'>
                        {section.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
