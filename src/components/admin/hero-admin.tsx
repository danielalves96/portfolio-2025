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
import { Badge } from '@/components/ui/badge';
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [hero, social] = await Promise.all([
        getHeroData(),
        getSocialLinks(),
      ]);
      setHeroData(hero);
      setSocialLinks(social);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveHero = async (formData: FormData) => {
    setIsSaving(true);
    try {
      const data = {
        titleLine1: formData.get('titleLine1') as string,
        titleLine2: formData.get('titleLine2') as string,
        profileSrc: formData.get('profileSrc') as string,
        profileAlt: formData.get('profileAlt') as string,
        profileName: formData.get('profileName') as string,
        quoteText: (formData.get('quoteText') as string)
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

  const handleSaveSocialLink = async (formData: FormData) => {
    const data = {
      href: formData.get('href') as string,
      iconName: formData.get('iconName') as string,
      label: formData.get('label') as string,
      order: parseInt(formData.get('order') as string) || 0,
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
    } catch (error) {
      console.error('Error saving social link:', error);
      toast.error('Erro ao salvar link social. Tente novamente.');
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
          <CardContent>
            <div className='space-y-4'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='h-10 bg-muted animate-pulse rounded' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Hero Data */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Edit3 className='h-5 w-5' />
            Dados do Hero
          </CardTitle>
          <CardDescription>
            Configure o título, perfil e citação da seção principal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSaveHero} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label htmlFor='titleLine1' className='text-sm font-medium'>
                  Título - Linha 1
                </label>
                <input
                  id='titleLine1'
                  name='titleLine1'
                  type='text'
                  defaultValue={heroData?.titleLine1 || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: Olá, eu sou'
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='titleLine2' className='text-sm font-medium'>
                  Título - Linha 2
                </label>
                <input
                  id='titleLine2'
                  name='titleLine2'
                  type='text'
                  defaultValue={heroData?.titleLine2 || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: Paola Oliveira'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label htmlFor='profileSrc' className='text-sm font-medium'>
                  URL da Imagem
                </label>
                <input
                  id='profileSrc'
                  name='profileSrc'
                  type='text'
                  defaultValue={heroData?.profileSrc || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='/headshot/profile.jpg'
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='profileAlt' className='text-sm font-medium'>
                  Texto Alternativo
                </label>
                <input
                  id='profileAlt'
                  name='profileAlt'
                  type='text'
                  defaultValue={heroData?.profileAlt || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Foto de perfil'
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='profileName' className='text-sm font-medium'>
                  Nome do Perfil
                </label>
                <input
                  id='profileName'
                  name='profileName'
                  type='text'
                  defaultValue={heroData?.profileName || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Paola Oliveira'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor='quoteText' className='text-sm font-medium'>
                Citação (uma linha por parágrafo)
              </label>
              <textarea
                id='quoteText'
                name='quoteText'
                rows={4}
                defaultValue={heroData?.quoteText?.join('\n') || ''}
                className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                placeholder='Design é resolver problemas de forma criativa...'
              />
            </div>

            <Button
              type='submit'
              disabled={isSaving}
              className='w-full md:w-auto'
            >
              {isSaving ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save className='h-4 w-4 mr-2' />
                  Salvar Hero
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Plus className='h-5 w-5' />
            Links Sociais
          </CardTitle>
          <CardDescription>
            Gerencie os links sociais exibidos no hero
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {socialLinks.map(link => (
              <div
                key={link.id}
                className='flex items-center gap-4 p-4 border rounded-lg'
              >
                <div className='flex-1 grid grid-cols-1 md:grid-cols-4 gap-3'>
                  <div>
                    <label className='text-sm font-medium'>Ícone</label>
                    <Badge
                      variant='outline'
                      className='mt-1 flex items-center gap-2'
                    >
                      {renderIcon(link.iconName)}
                      <span>{link.iconName}</span>
                    </Badge>
                  </div>
                  <div>
                    <label className='text-sm font-medium'>Label</label>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {link.label}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium'>URL</label>
                    <p className='text-sm text-muted-foreground mt-1 truncate'>
                      {link.href}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium'>Ordem</label>
                    <Badge variant='secondary' className='mt-1'>
                      {link.order}
                    </Badge>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => modal.openModal(link)}
                  >
                    <Edit3 className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={async () => {
                      try {
                        await deleteSocialLink(link.id);
                        toast.success('Link social deletado com sucesso!');
                        await loadData();
                      } catch (error) {
                        console.error('Error deleting social link:', error);
                        toast.error('Erro ao deletar link social.');
                      }
                    }}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}

            {socialLinks.length === 0 && (
              <div className='text-center py-8 text-muted-foreground'>
                <Plus className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p>Nenhum link social encontrado</p>
                <p className='text-sm'>Adicione seu primeiro link social</p>
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
        </CardContent>
      </Card>

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

          <form action={handleSaveSocialLink} className='space-y-4'>
            <div className='space-y-4'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label htmlFor='iconName' className='text-sm font-medium'>
                    Ícone
                  </label>
                  <IconSelector
                    value={modal.data?.iconName || ''}
                    onChange={iconName => {
                      const input = document.getElementById(
                        'iconName'
                      ) as HTMLInputElement;
                      if (input) input.value = iconName;
                    }}
                  />
                  <input
                    id='iconName'
                    name='iconName'
                    type='hidden'
                    defaultValue={modal.data?.iconName || ''}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='order' className='text-sm font-medium'>
                    Ordem
                  </label>
                  <input
                    id='order'
                    name='order'
                    type='number'
                    defaultValue={modal.data?.order || socialLinks.length + 1}
                    className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    min='1'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='label' className='text-sm font-medium'>
                  Label
                </label>
                <input
                  id='label'
                  name='label'
                  type='text'
                  defaultValue={modal.data?.label || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: Meu Instagram, GitHub Pessoal'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='href' className='text-sm font-medium'>
                  URL do Link
                </label>
                <input
                  id='href'
                  name='href'
                  type='url'
                  defaultValue={modal.data?.href || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='https://instagram.com/seu-perfil'
                  required
                />
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
                {modal.data ? 'Atualizar' : 'Criar'} Link Social
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
