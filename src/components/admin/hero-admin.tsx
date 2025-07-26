'use client';

import { useEffect, useState } from 'react';

import { Edit3, Plus, Save, Trash2 } from 'lucide-react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import * as DiIcons from 'react-icons/di';
import * as ReactIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import { toast } from 'sonner';

import { IconSelector } from '@/components/admin/icon-selector';
import { ImageUpload } from '@/components/admin/image-upload';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { ContentListItem } from '@/components/ui/enhanced-card';
import { FormField } from '@/components/ui/form-field';
import { FormSection, FormSectionGrid } from '@/components/ui/form-section';
import { SkeletonCard, SkeletonList } from '@/components/ui/skeleton';

import { useModal } from '@/hooks/use-modal';
import {
  createSocialLink,
  deleteSocialLink,
  updateHeroData,
  updateSocialLink,
} from '@/lib/actions/admin-actions';
import { getHeroData, getSocialLinks } from '@/lib/actions/data-fetching';

// Combine all icon libraries
const allIcons = {
  ...ReactIcons,
  ...AiIcons,
  ...BiIcons,
  ...BsIcons,
  ...CgIcons,
  ...DiIcons,
  ...FiIcons,
  ...GoIcons,
  ...GrIcons,
  ...HiIcons,
  ...ImIcons,
  ...IoIcons,
  ...Io5Icons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
  ...TbIcons,
  ...TiIcons,
  ...VscIcons,
};

// Function to render React Icon dynamically
const renderIcon = (iconName: string) => {
  const IconComponent = (allIcons as any)[iconName];
  return IconComponent ? <IconComponent className='h-4 w-4' /> : null;
};

interface HeroData {
  id: number;
  titleLine1: string;
  titleLine2: string;
  profileSrc: string;
  profileAlt: string;
  profileName: string;
  quoteText: string[];
}

interface SocialLink {
  id: number;
  href: string;
  iconName: string;
  label: string;
  order: number;
}

export default function HeroAdmin() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const modal = useModal<SocialLink>();

  // Hero form state
  const [currentImage, setCurrentImage] = useState('');
  const [heroFormData, setHeroFormData] = useState({
    titleLine1: '',
    titleLine2: '',
    profileSrc: '',
    profileAlt: '',
    profileName: '',
    quoteText: '',
  });

  // Social links form state
  const [socialFormData, setSocialFormData] = useState({
    href: '',
    iconName: '',
    label: '',
    order: 1,
  });

  useEffect(() => {
    loadData();
  }, []);

  // Sync hero form state with data
  useEffect(() => {
    if (heroData) {
      setHeroFormData({
        titleLine1: heroData.titleLine1,
        titleLine2: heroData.titleLine2,
        profileSrc: heroData.profileSrc,
        profileAlt: heroData.profileAlt,
        profileName: heroData.profileName,
        quoteText: heroData.quoteText.join('\n'),
      });
      setCurrentImage(heroData.profileSrc);
    }
  }, [heroData]);

  // Sync social form state with modal data
  useEffect(() => {
    if (modal.data) {
      setSocialFormData({
        href: modal.data.href,
        iconName: modal.data.iconName,
        label: modal.data.label,
        order: modal.data.order,
      });
    } else {
      setSocialFormData({
        href: '',
        iconName: '',
        label: '',
        order: socialLinks.length + 1,
      });
    }
  }, [modal.data, socialLinks.length]);

  const loadData = async () => {
    try {
      const [hero, social] = await Promise.all([
        getHeroData(),
        getSocialLinks(),
      ]);
      if (hero) {
        setHeroData(hero);
      }
      setSocialLinks(social);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = {
        titleLine1: heroFormData.titleLine1,
        titleLine2: heroFormData.titleLine2,
        profileSrc: heroFormData.profileSrc,
        profileAlt: heroFormData.profileAlt,
        profileName: heroFormData.profileName,
        quoteText: heroFormData.quoteText
          .split('\n')
          .filter(line => line.trim()),
      };

      const result = await updateHeroData(data);
      if (result.success) {
        toast.success('Dados do Hero atualizados com sucesso!');
        await loadData();
      } else {
        toast.error('Erro ao salvar dados do Hero.');
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
      toast.error('Erro ao salvar dados do Hero.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSocialLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      href: socialFormData.href,
      iconName: socialFormData.iconName,
      label: socialFormData.label,
      order: socialFormData.order,
    };

    try {
      if (modal.data) {
        await updateSocialLink(modal.data.id, data);
        toast.success('Link social atualizado com sucesso!');
      } else {
        await createSocialLink(data);
        toast.success('Link social criado com sucesso!');
      }
      await loadData();
      modal.closeModal();
      // Reset form state
      setSocialFormData({
        href: '',
        iconName: '',
        label: '',
        order: socialLinks.length + 1,
      });
    } catch (error) {
      console.error('Error saving social link:', error);
      toast.error('Erro ao salvar link social. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <SkeletonCard showImage={false} showActions={false} textLines={2} />
        <SkeletonList items={3} showAvatar={false} showActions={true} />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Hero Data */}
      <FormSection
        title='Dados do Hero'
        description='Configure o título, perfil e citação da seção principal'
      >
        <form onSubmit={handleSaveHero} className='space-y-8'>
          {/* Seção do Título Principal */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-foreground'>
              Título Principal
            </h3>
            <FormSectionGrid columns={2} gap='md'>
              <FormField
                label='Primeira Linha'
                description='Texto de apresentação inicial'
                required
              >
                <input
                  type='text'
                  value={heroFormData.titleLine1}
                  onChange={e =>
                    setHeroFormData(prev => ({
                      ...prev,
                      titleLine1: e.target.value,
                    }))
                  }
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: Olá, eu sou'
                  required
                />
              </FormField>

              <FormField
                label='Segunda Linha'
                description='Nome ou título profissional'
                required
              >
                <input
                  type='text'
                  value={heroFormData.titleLine2}
                  onChange={e =>
                    setHeroFormData(prev => ({
                      ...prev,
                      titleLine2: e.target.value,
                    }))
                  }
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: Paola Oliveira'
                  required
                />
              </FormField>
            </FormSectionGrid>
          </div>

          {/* Seção do Perfil */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-foreground'>
              👤 Perfil e Imagem
            </h3>

            {/* Upload da imagem com mais espaço */}
            <FormField
              label='Imagem do Perfil'
              description='Foto de perfil que aparecerá no hero. Recomenda-se uma imagem quadrada de alta qualidade (mínimo 400x400px).'
              required
            >
              <div className='max-w-sm'>
                <ImageUpload
                  value={currentImage}
                  onChange={url => {
                    setCurrentImage(url);
                    setHeroFormData(prev => ({ ...prev, profileSrc: url }));
                  }}
                  placeholder='Upload da imagem do perfil'
                />
              </div>
            </FormField>

            {/* Campos relacionados à imagem */}
            <div className='mt-6'>
              <FormSectionGrid columns={2} gap='md'>
                <FormField
                  label='Texto Alternativo'
                  description='Descrição da imagem para acessibilidade'
                  required
                >
                  <input
                    type='text'
                    value={heroFormData.profileAlt}
                    onChange={e =>
                      setHeroFormData(prev => ({
                        ...prev,
                        profileAlt: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    placeholder='Foto de perfil da Paola Oliveira'
                    required
                  />
                </FormField>

                <FormField
                  label='Nome do Perfil'
                  description='Nome que aparecerá abaixo da foto'
                  required
                >
                  <input
                    type='text'
                    value={heroFormData.profileName}
                    onChange={e =>
                      setHeroFormData(prev => ({
                        ...prev,
                        profileName: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    placeholder='Paola Oliveira'
                    required
                  />
                </FormField>
              </FormSectionGrid>
            </div>
          </div>

          {/* Seção da Citação */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-foreground'>
              Citação Inspiracional
            </h3>
            <FormField
              label='Texto da Citação'
              description='Texto motivacional que aparecerá no hero. Separe parágrafos com quebras de linha para criar múltiplas linhas.'
              required
            >
              <textarea
                rows={6}
                value={heroFormData.quoteText}
                onChange={e =>
                  setHeroFormData(prev => ({
                    ...prev,
                    quoteText: e.target.value,
                  }))
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background resize-y focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
                placeholder='Design é resolver problemas de forma criativa e eficiente.&#10;Cada projeto é uma oportunidade de inovar e impactar positivamente.&#10;Transformo ideias em experiências digitais memoráveis.'
                required
              />
              <div className='flex items-start gap-2 text-xs text-muted-foreground mt-3 p-2 bg-blue-50/50 dark:bg-blue-950/20 rounded border border-blue-200/50 dark:border-blue-800/50'>
                <span className='text-blue-600 dark:text-blue-400'>💡</span>
                <span>
                  <strong>Dica:</strong> Use quebras de linha (Enter) para criar
                  múltiplos parágrafos. Cada linha será exibida como um
                  parágrafo separado na citação.
                </span>
              </div>
            </FormField>
          </div>

          <div className='flex justify-end pt-4 border-t'>
            <Button
              type='submit'
              disabled={isSaving}
              loading={isSaving}
              className='min-w-[120px]'
            >
              <Save className='h-4 w-4 mr-2' />
              {isSaving ? 'Salvando...' : 'Salvar Hero'}
            </Button>
          </div>
        </form>
      </FormSection>

      {/* Social Links */}
      <FormSection
        title={`Links Sociais (${socialLinks.length})`}
        description='Gerencie os links sociais exibidos no hero'
      >
        <div className='space-y-4'>
          {socialLinks.length === 0 ? (
            <EmptyState
              icon={Plus}
              title='Nenhum link social encontrado'
              description='Adicione links para suas redes sociais que aparecerão no hero'
              action={{
                label: 'Adicionar Primeiro Link',
                onClick: () => modal.openModal(),
                icon: Plus,
              }}
              variant='card'
            />
          ) : (
            <div className='space-y-2'>
              {socialLinks.map(link => {
                const metadata = [
                  {
                    label: 'Ícone',
                    value: (
                      <Badge
                        variant='outline'
                        className='flex items-center gap-2'
                      >
                        {renderIcon(link.iconName)}
                        <span>{link.iconName}</span>
                      </Badge>
                    ),
                  },
                  {
                    label: 'URL',
                    value: link.href,
                  },
                  {
                    label: 'Ordem',
                    value: <Badge variant='secondary'>{link.order}</Badge>,
                  },
                ];

                const actions = [
                  {
                    label: 'Editar',
                    onClick: () => modal.openModal(link),
                    icon: Edit3,
                  },
                  {
                    label: 'Excluir',
                    onClick: async () => {
                      toast(
                        'Tem certeza que deseja deletar este link social?',
                        {
                          action: {
                            label: 'Deletar',
                            onClick: async () => {
                              try {
                                await deleteSocialLink(link.id);
                                toast.success(
                                  'Link social deletado com sucesso!'
                                );
                                await loadData();
                              } catch (error) {
                                console.error(
                                  'Error deleting social link:',
                                  error
                                );
                                toast.error('Erro ao deletar link social.');
                              }
                            },
                          },
                          cancel: {
                            label: 'Cancelar',
                            onClick: () => {},
                          },
                        }
                      );
                    },
                    icon: Trash2,
                    variant: 'destructive' as const,
                  },
                ];

                return (
                  <ContentListItem
                    key={link.id}
                    title={link.label}
                    metadata={metadata}
                    actions={actions}
                    onCardClick={() => modal.openModal(link)}
                  />
                );
              })}
            </div>
          )}

          <Button
            variant='outline'
            className='w-full'
            onClick={() => modal.openModal()}
          >
            <Plus className='h-4 w-4 mr-2' />
            Adicionar Link Social
          </Button>
        </div>
      </FormSection>

      {/* Dialog Modal for Social Links */}
      <Dialog open={modal.isOpen} onOpenChange={modal.closeModal}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {modal.data ? 'Editar Link Social' : 'Novo Link Social'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações do link social'
                : 'Adicione um novo link social ao hero'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveSocialLink} className='space-y-6'>
            <FormSectionGrid columns={2} gap='md'>
              <FormField
                label='Ícone'
                description='Ícone que representará o link social'
                required
              >
                <IconSelector
                  value={socialFormData.iconName}
                  onChange={iconName => {
                    setSocialFormData(prev => ({ ...prev, iconName }));
                  }}
                />
              </FormField>

              <FormField
                label='Ordem'
                description='Posição do link na lista (menor número aparece primeiro)'
                required
              >
                <input
                  type='number'
                  value={socialFormData.order}
                  onChange={e =>
                    setSocialFormData(prev => ({
                      ...prev,
                      order: parseInt(e.target.value) || 1,
                    }))
                  }
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  min='1'
                  required
                />
              </FormField>
            </FormSectionGrid>

            <FormField
              label='Label'
              description='Nome descritivo do link social'
              required
            >
              <input
                type='text'
                value={socialFormData.label}
                onChange={e =>
                  setSocialFormData(prev => ({
                    ...prev,
                    label: e.target.value,
                  }))
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: Meu Instagram, GitHub Pessoal'
                required
              />
            </FormField>

            <FormField
              label='URL do Link'
              description='Link completo para o perfil da rede social'
              required
            >
              <input
                type='url'
                value={socialFormData.href}
                onChange={e =>
                  setSocialFormData(prev => ({
                    ...prev,
                    href: e.target.value,
                  }))
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='https://instagram.com/seu-perfil'
                required
              />
            </FormField>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={modal.closeModal}
              >
                Cancelar
              </Button>
              <Button type='submit'>
                {modal.data ? 'Atualizar' : 'Criar'} Link Social
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
