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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/use-modal';
import {
  createSocialSection,
  deleteSocialSection,
  updateSocialSection,
} from '@/lib/actions/admin-actions';
import { getSocialSectionData } from '@/lib/actions/data-fetching';

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
  return IconComponent ? <IconComponent className='h-6 w-6' /> : null;
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

  useEffect(() => {
    loadData();
  }, []);

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
    if (confirm('Tem certeza que deseja deletar este item social?')) {
      try {
        await deleteSocialSection(id);
        toast.success('Rede social deletada com sucesso!');
        await loadData();
      } catch (error) {
        console.error('Error deleting social item:', error);
        toast.error('Erro ao deletar rede social. Tente novamente.');
      }
    }
  };

  const handleSave = async (formData: FormData) => {
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: formData.get('iconName') as string, // Save iconName in image field temporarily
      url: formData.get('url') as string,
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
    } catch (error) {
      console.error('Error saving social item:', error);
      toast.error('Erro ao salvar rede social. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='h-6 bg-muted animate-pulse rounded' />
            <div className='h-4 bg-muted animate-pulse rounded w-2/3' />
          </CardHeader>
        </Card>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className='p-4'>
                <div className='h-32 bg-muted animate-pulse rounded mb-3' />
                <div className='h-4 bg-muted animate-pulse rounded mb-2' />
                <div className='h-3 bg-muted animate-pulse rounded' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <Edit3 className='h-5 w-5' />
                Redes Sociais ({socialItems.length})
              </CardTitle>
              <CardDescription>
                Gerencie os perfis e links das redes sociais
              </CardDescription>
            </div>
            <Button onClick={() => modal.openModal()}>
              <Plus className='h-4 w-4 mr-2' />
              Nova Rede Social
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Social Items Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {socialItems.map(item => (
          <Card
            key={item.id}
            className='group hover:shadow-lg transition-shadow'
          >
            <CardContent className='p-4'>
              {/* Icon */}
              <div className='aspect-square bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden relative'>
                {item.image ? (
                  <div className='text-6xl text-orange-500'>
                    {renderIcon(item.image)}
                  </div>
                ) : (
                  <div className='h-12 w-12 bg-muted-foreground/20 rounded-full flex items-center justify-center'>
                    <span className='text-xs'>?</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='space-y-3'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-1 flex-1'>
                    <h3 className='font-medium line-clamp-1'>{item.name}</h3>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                      {item.description}
                    </p>
                  </div>
                  <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => modal.openModal(item)}
                    >
                      <Edit3 className='h-3 w-3' />
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className='h-3 w-3' />
                    </Button>
                  </div>
                </div>

                {/* URL */}
                <div className='pt-2 border-t'>
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-sm text-primary hover:underline'
                  >
                    <ExternalLink className='h-3 w-3' />
                    <span className='truncate'>{item.url}</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {socialItems.length === 0 && (
          <div className='col-span-full'>
            <Card>
              <CardContent className='text-center py-12'>
                <Edit3 className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p className='text-muted-foreground mb-4'>
                  Nenhuma rede social encontrada
                </p>
                <Button onClick={() => modal.openModal()}>
                  <Plus className='h-4 w-4 mr-2' />
                  Criar Primeira Rede Social
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Dialog Modal */}
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

          <form action={handleSave} className='space-y-4'>
            <div className='space-y-4'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label htmlFor='name' className='text-sm font-medium'>
                    Nome da Rede Social
                  </label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    defaultValue={modal.data?.name || ''}
                    className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    placeholder='Ex: Instagram, Dribbble, Behance...'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <label htmlFor='url' className='text-sm font-medium'>
                    URL do Perfil
                  </label>
                  <input
                    id='url'
                    name='url'
                    type='url'
                    defaultValue={modal.data?.url || ''}
                    className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    placeholder='https://instagram.com/seu-perfil'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='description' className='text-sm font-medium'>
                  Descrição
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows={3}
                  defaultValue={modal.data?.description || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                  placeholder='Descreva o conteúdo desta rede social...'
                  required
                />
              </div>

              <div className='space-y-2 flex flex-col'>
                <label htmlFor='iconName' className='text-sm font-medium mr-4'>
                  Ícone
                </label>
                <div className='w-fit'>
                  <IconSelector
                    value={modal.data?.image || ''}
                    onChange={iconName => {
                      const input = document.getElementById(
                        'iconName'
                      ) as HTMLInputElement;
                      if (input) input.value = iconName;
                    }}
                  />
                </div>
                <input
                  id='iconName'
                  name='iconName'
                  type='hidden'
                  defaultValue={modal.data?.image || ''}
                  required
                />
                <p className='text-xs text-muted-foreground'>
                  Ícone representativo da rede social
                </p>
              </div>
            </div>

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
