'use client';

import { useEffect, useState } from 'react';

import {
  ArrowUpDown,
  Edit3,
  FileText,
  Navigation,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useModal } from '@/hooks/use-modal';
import {
  createFooterNavigation,
  deleteFooterNavigation,
  updateFooterData,
  updateFooterNavigation,
} from '@/lib/actions/admin-actions';
import { getFooterData } from '@/lib/actions/data-fetching';

interface FooterData {
  copyright: string;
  designer: string;
  navigation: {
    id: number;
    href: string;
    label: string;
    order: number;
  }[];
}

interface NavigationItem {
  id: number;
  name: string;
  href: string;
  order: number;
}

export default function FooterAdmin() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const modal = useModal<NavigationItem>();

  // Footer form state
  const [footerFormData, setFooterFormData] = useState({
    copyrightText: '',
  });

  // Navigation form state
  const [navFormData, setNavFormData] = useState({
    name: '',
    href: '',
    order: 1,
  });

  useEffect(() => {
    loadData();
  }, []);

  // Sync footer form state with data
  useEffect(() => {
    if (footerData) {
      setFooterFormData({
        copyrightText: footerData.copyright || '',
      });
    }
  }, [footerData]);

  // Sync navigation form state with modal data
  useEffect(() => {
    if (modal.data) {
      setNavFormData({
        name: modal.data.name,
        href: modal.data.href,
        order: modal.data.order,
      });
    } else {
      setNavFormData({
        name: '',
        href: '',
        order: navigation.length + 1,
      });
    }
  }, [modal.data, navigation.length]);

  const loadData = async () => {
    try {
      const data = await getFooterData();
      setFooterData(data);

      // Carregar dados de navegação do footer
      if (data?.navigation) {
        const navigationItems = data.navigation.map(nav => ({
          id: nav.id,
          name: nav.label,
          href: nav.href,
          order: nav.order,
        }));
        setNavigation(navigationItems);
      }
    } catch (error) {
      console.error('Error loading footer data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = {
        copyrightText: footerFormData.copyrightText,
      };

      const result = await updateFooterData(data);
      if (result.success) {
        toast.success('Dados do rodapé atualizados com sucesso!');
        await loadData();
      } else {
        toast.error('Erro ao salvar dados do rodapé.');
      }
    } catch (error) {
      console.error('Error saving footer data:', error);
      toast.error('Erro ao salvar dados do rodapé.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNav = async (id: number) => {
    toast('Tem certeza que deseja deletar este item de navegação?', {
      action: {
        label: 'Deletar',
        onClick: async () => {
          try {
            await deleteFooterNavigation(id);
            toast.success('Item de navegação deletado com sucesso!');
            await loadData();
          } catch (error) {
            console.error('Error deleting navigation:', error);
            toast.error('Erro ao deletar item de navegação.');
          }
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {},
      },
    });
  };

  const handleSaveNavigation = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: navFormData.name,
      href: navFormData.href,
      order: navFormData.order,
    };

    try {
      if (modal.data) {
        await updateFooterNavigation(modal.data.id, data);
        toast.success('Link de navegação atualizado com sucesso!');
      } else {
        await createFooterNavigation(data);
        toast.success('Link de navegação criado com sucesso!');
      }
      await loadData();
      modal.closeModal();
      // Reset form state
      setNavFormData({
        name: '',
        href: '',
        order: navigation.length + 1,
      });
    } catch (error) {
      console.error('Error saving navigation:', error);
      toast.error('Erro ao salvar navegação. Tente novamente.');
    }
  };

  const moveNavItem = (id: number, direction: 'up' | 'down') => {
    const currentIndex = navigation.findIndex(item => item.id === id);
    if (currentIndex === -1) return;

    const newNavigation = [...navigation];
    const targetIndex =
      direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= newNavigation.length) return;

    // Trocar posições
    const currentItem = newNavigation[currentIndex];
    const targetItem = newNavigation[targetIndex];

    if (!currentItem || !targetItem) return;

    [newNavigation[currentIndex], newNavigation[targetIndex]] = [
      targetItem,
      currentItem,
    ];

    // Atualizar orders
    const updatedNavigation = newNavigation.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setNavigation(updatedNavigation);
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
              {[...Array(4)].map((_, i) => (
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
      <Tabs defaultValue='footer' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='footer'>Rodapé</TabsTrigger>
          <TabsTrigger value='navigation'>Navegação</TabsTrigger>
        </TabsList>

        {/* Footer Tab */}
        <TabsContent value='footer'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-5 w-5' />
                Configurações do Rodapé
              </CardTitle>
              <CardDescription>
                Configure o texto de copyright e informações do rodapé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveFooter} className='space-y-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='copyrightText'
                    className='text-sm font-medium'
                  >
                    Texto de Copyright
                  </label>
                  <textarea
                    id='copyrightText'
                    name='copyrightText'
                    rows={3}
                    value={footerFormData.copyrightText}
                    onChange={e =>
                      setFooterFormData(prev => ({
                        ...prev,
                        copyrightText: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                    placeholder='© 2024 Todos os direitos reservados...'
                    required
                  />
                  <p className='text-xs text-muted-foreground'>
                    Texto que aparecerá no rodapé do site
                  </p>
                </div>

                <div className='flex justify-end pt-4 border-t'>
                  <Button
                    type='submit'
                    disabled={isSaving}
                    className='min-w-[120px]'
                  >
                    {isSaving ? (
                      <>Salvando...</>
                    ) : (
                      <>
                        <Save className='h-4 w-4 mr-2' />
                        Salvar Rodapé
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value='navigation'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='flex items-center gap-2'>
                    <Navigation className='h-5 w-5' />
                    Navegação do Rodapé ({navigation.length})
                  </CardTitle>
                  <CardDescription>
                    Gerencie os links de navegação do rodapé
                  </CardDescription>
                </div>
                <Button onClick={() => modal.openModal()}>
                  <Plus className='h-4 w-4 mr-2' />
                  Novo Link
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Navigation List */}
              <div className='space-y-3'>
                {navigation.map((item, index) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-4 p-3 border rounded-lg'
                  >
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='outline'
                        className='w-8 h-8 rounded-full flex items-center justify-center p-0'
                      >
                        {item.order}
                      </Badge>
                      <div className='flex flex-col gap-1'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => moveNavItem(item.id, 'up')}
                          disabled={index === 0}
                          className='h-6 w-6 p-0'
                        >
                          <ArrowUpDown className='h-3 w-3' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => moveNavItem(item.id, 'down')}
                          disabled={index === navigation.length - 1}
                          className='h-6 w-6 p-0'
                        >
                          <ArrowUpDown className='h-3 w-3' />
                        </Button>
                      </div>
                    </div>

                    <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-3'>
                      <div>
                        <label className='text-sm font-medium'>Nome</label>
                        <p className='text-sm text-muted-foreground'>
                          {item.name}
                        </p>
                      </div>
                      <div>
                        <label className='text-sm font-medium'>Link</label>
                        <p className='text-sm text-muted-foreground font-mono'>
                          {item.href}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => modal.openModal(item)}
                      >
                        <Edit3 className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleDeleteNav(item.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ))}

                {navigation.length === 0 && (
                  <div className='text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg'>
                    <Navigation className='h-12 w-12 mx-auto mb-4 opacity-50' />
                    <p>Nenhum link de navegação encontrado</p>
                    <p className='text-sm'>
                      Adicione links para a navegação do rodapé
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog Modal for Navigation */}
      <Dialog open={modal.isOpen} onOpenChange={modal.closeModal}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {modal.data
                ? 'Editar Link de Navegação'
                : 'Novo Link de Navegação'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações do link de navegação'
                : 'Adicione um novo link à navegação do rodapé'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveNavigation} className='space-y-4'>
            <div className='space-y-4'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label htmlFor='name' className='text-sm font-medium'>
                    Nome do Link
                  </label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    value={navFormData.name}
                    onChange={e =>
                      setNavFormData(prev => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    placeholder='Ex: Sobre, Projetos, Contato...'
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
                    value={navFormData.order}
                    onChange={e =>
                      setNavFormData(prev => ({
                        ...prev,
                        order: parseInt(e.target.value) || 1,
                      }))
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    min='1'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='href' className='text-sm font-medium'>
                  URL/Âncora
                </label>
                <input
                  id='href'
                  name='href'
                  type='text'
                  value={navFormData.href}
                  onChange={e =>
                    setNavFormData(prev => ({ ...prev, href: e.target.value }))
                  }
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: #about, #projects, #contact...'
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
                {modal.data ? 'Atualizar' : 'Criar'} Link
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
