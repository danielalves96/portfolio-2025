'use client';

import { useEffect, useState } from 'react';

import { Edit3, ExternalLink, Plus, Trash2 } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { FormField } from '@/components/ui/form-field';
import { FormSectionGrid } from '@/components/ui/form-section';
import { SkeletonCard } from '@/components/ui/skeleton';

import { useModal } from '@/hooks/use-modal';
import {
  createSocialSection,
  deleteSocialSection,
  updateSocialSection,
} from '@/lib/actions/admin-actions';
import { getSocialSectionData } from '@/lib/actions/data-fetching';

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

const renderIcon = (iconName: string) => {
  const IconComponent = (allIcons as any)[iconName];
  return IconComponent ? <IconComponent className='h-20 w-20' /> : null;
};

interface SocialItem {
  id: number;
  name: string;
  description: string;
  image: string;
  url: string;
}

export default function SocialAdmin() {
  const [socialItems, setSocialItems] = useState<SocialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const modal = useModal<SocialItem>();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    iconName: '',
    url: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (modal.data) {
      setFormData({
        name: modal.data.name || '',
        description: modal.data.description || '',
        iconName: modal.data.image || '',
        url: modal.data.url || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        iconName: '',
        url: '',
      });
    }
  }, [modal.data]);

  const loadData = async () => {
    try {
      const data = await getSocialSectionData();
      setSocialItems(data.socialItems);
    } catch (error) {
      console.error('Error loading social data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    toast('Tem certeza que deseja deletar este item social?', {
      action: {
        label: 'Deletar',
        onClick: async () => {
          try {
            await deleteSocialSection(id);
            toast.success('Rede social deletada com sucesso!');
            await loadData();
          } catch (error) {
            console.error('Error deleting social item:', error);
            toast.error('Erro ao deletar rede social. Tente novamente.');
          }
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {},
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      description: formData.description,
      image: formData.iconName,
      url: formData.url,
    };

    try {
      if (modal.data) {
        await updateSocialSection(modal.data.id, data);
        toast.success('Rede social atualizada com sucesso!');
      } else {
        await createSocialSection(data);
        toast.success('Rede social criada com sucesso!');
      }
      await loadData();
      modal.closeModal();
      setFormData({
        name: '',
        description: '',
        iconName: '',
        url: '',
      });
    } catch (error) {
      console.error('Error saving social item:', error);
      toast.error('Erro ao salvar rede social. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <SkeletonCard showImage={false} showActions={false} textLines={2} />
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard
              key={i}
              showImage={true}
              showActions={true}
              textLines={2}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between p-6 bg-card rounded-lg border'>
        <div>
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <Edit3 className='h-5 w-5' />
            Redes Sociais ({socialItems.length})
          </h2>
          <p className='text-sm text-muted-foreground mt-1'>
            Gerencie os perfis e links das redes sociais
          </p>
        </div>
        <Button onClick={() => modal.openModal()}>
          <Plus className='h-4 w-4 mr-2' />
          Nova Rede Social
        </Button>
      </div>

      {socialItems.length === 0 ? (
        <EmptyState
          icon={Edit3}
          title='Nenhuma rede social encontrada'
          description='Adicione perfis das redes sociais para exibir na seção social'
          action={{
            label: 'Criar Primeira Rede Social',
            onClick: () => modal.openModal(),
            icon: Plus,
          }}
          variant='card'
        />
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {socialItems.map(item => {
            return (
              <div
                key={item.id}
                className='group hover:shadow-lg transition-shadow p-4 border rounded-lg bg-card cursor-pointer'
                onClick={() => modal.openModal(item)}
              >
                <div className='aspect-square bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden relative'>
                  {item.image ? (
                    <div className='text-6xl text-primary'>
                      {renderIcon(item.image)}
                    </div>
                  ) : (
                    <div className='h-12 w-12 bg-muted-foreground/20 rounded-full flex items-center justify-center'>
                      <span className='text-xs'>?</span>
                    </div>
                  )}
                </div>

                <div className='space-y-3'>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-1 flex-1'>
                      <h3 className='font-medium line-clamp-1'>{item.name}</h3>
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {item.description}
                      </p>
                    </div>
                    <div className='flex items-center gap-1 ml-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={e => {
                          e.stopPropagation();
                          modal.openModal(item);
                        }}
                      >
                        <Edit3 className='h-3 w-3' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                      >
                        <Trash2 className='h-3 w-3' />
                      </Button>
                    </div>
                  </div>

                  <div className='pt-2 border-t'>
                    <a
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-sm text-orange-500hover:underline'
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className='h-3 w-3' />
                      <span className='truncate'>{item.url}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={modal.isOpen} onOpenChange={modal.closeModal}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>
              {modal.data ? 'Editar Rede Social' : 'Nova Rede Social'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações da rede social'
                : 'Adicione uma nova rede social ao portfólio'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className='space-y-6'>
            <FormSectionGrid columns={2} gap='md'>
              <FormField
                label='Nome da Rede Social'
                description='Nome da plataforma social'
                required
              >
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: Instagram, Dribbble, Behance...'
                  required
                />
              </FormField>

              <FormField
                label='URL do Perfil'
                description='Link completo para o perfil'
                required
              >
                <input
                  type='url'
                  value={formData.url}
                  onChange={e =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='https://instagram.com/seu-perfil'
                  required
                />
              </FormField>
            </FormSectionGrid>

            <FormField
              label='Descrição'
              description='Descrição do conteúdo desta rede social'
              required
            >
              <textarea
                rows={3}
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                placeholder='Descreva o conteúdo desta rede social...'
                required
              />
            </FormField>

            <FormField
              label='Ícone'
              description='Ícone representativo da rede social'
              required
            >
              <IconSelector
                value={formData.iconName}
                onChange={iconName => {
                  setFormData({ ...formData, iconName });
                }}
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
                {modal.data ? 'Atualizar' : 'Criar'} Rede Social
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
