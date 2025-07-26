'use client';

import { useEffect, useState } from 'react';

import { Calendar, Edit3, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import {
  Card,
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
import { ProjectsEmptyState } from '@/components/ui/empty-state';
import { ContentCard } from '@/components/ui/enhanced-card';
import { SkeletonCard } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useModal } from '@/hooks/use-modal';
import {
  createProject,
  deleteProject,
  updateProject,
} from '@/lib/actions/admin-actions';
import { getProjectsData } from '@/lib/actions/data-fetching';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  category: string[];
  year: string;
  whatIAccomplished: string;
  figmaMobile: string | null;
  figmaDesktop: string | null;
  dribbbleUrl: string | null;
  behanceUrl: string | null;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear().toString(),
    whatIAccomplished: '',
    tags: '',
    categories: '',
    figmaMobile: '',
    figmaDesktop: '',
    dribbbleUrl: '',
    behanceUrl: '',
  });

  const modal = useModal<Project>();

  useEffect(() => {
    loadData();
  }, []);

  // Update form state when modal data changes
  useEffect(() => {
    if (modal.data) {
      setCurrentImage(modal.data.image || '');
      setFormData({
        title: modal.data.title || '',
        description: modal.data.description || '',
        year: modal.data.year || new Date().getFullYear().toString(),
        whatIAccomplished: modal.data.whatIAccomplished || '',
        tags: modal.data.tag?.join(', ') || '',
        categories: modal.data.category?.join(', ') || '',
        figmaMobile: modal.data.figmaMobile || '',
        figmaDesktop: modal.data.figmaDesktop || '',
        dribbbleUrl: modal.data.dribbbleUrl || '',
        behanceUrl: modal.data.behanceUrl || '',
      });
    } else {
      // Reset for new project
      setCurrentImage('');
      setFormData({
        title: '',
        description: '',
        year: new Date().getFullYear().toString(),
        whatIAccomplished: '',
        tags: '',
        categories: '',
        figmaMobile: '',
        figmaDesktop: '',
        dribbbleUrl: '',
        behanceUrl: '',
      });
    }
  }, [modal.data]);

  const loadData = async () => {
    try {
      const data = await getProjectsData();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      try {
        await deleteProject(id);
        toast.success('Projeto deletado com sucesso!');
        await loadData();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Erro ao deletar projeto. Tente novamente.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle array fields properly
    const tags = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    const categories = formData.categories
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const data = {
      title: formData.title,
      description: formData.description,
      image: currentImage,
      tag: tags,
      category: categories,
      year: formData.year,
      whatIAccomplished: formData.whatIAccomplished,
      figmaMobile: formData.figmaMobile || undefined,
      figmaDesktop: formData.figmaDesktop || undefined,
      dribbbleUrl: formData.dribbbleUrl || undefined,
      behanceUrl: formData.behanceUrl || undefined,
    };

    try {
      if (modal.data) {
        await updateProject(modal.data.id, data);
        toast.success('Projeto atualizado com sucesso!');
      } else {
        await createProject(data);
        toast.success('Projeto criado com sucesso!');
      }
      await loadData();
      // Reset form state
      setCurrentImage('');
      setFormData({
        title: '',
        description: '',
        year: new Date().getFullYear().toString(),
        whatIAccomplished: '',
        tags: '',
        categories: '',
        figmaMobile: '',
        figmaDesktop: '',
        dribbbleUrl: '',
        behanceUrl: '',
      });
      modal.closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Erro ao salvar projeto. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        {/* Header skeleton */}
        <SkeletonCard showImage={false} showActions={false} textLines={1} />

        {/* Projects skeleton */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
      {/* Header */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <Edit3 className='h-5 w-5' />
                Projetos ({projects.length})
              </CardTitle>
              <CardDescription>
                Gerencie o portfólio de projetos
              </CardDescription>
            </div>
            <Button onClick={() => modal.openModal()}>
              <Plus className='h-4 w-4 mr-2' />
              Novo Projeto
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <ProjectsEmptyState
          onCreateProject={() => modal.openModal()}
          variant='card'
        />
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map(project => {
            // Prepare metadata for the card
            const metadata = [
              {
                label: 'Ano',
                value: project.year,
                icon: Calendar,
              },
              {
                label: 'Categorias',
                value:
                  project.category.length > 0
                    ? project.category.join(', ')
                    : 'Nenhuma',
              },
            ];

            // Prepare actions for the card
            const actions = [
              {
                label: 'Editar',
                onClick: () => modal.openModal(project),
                icon: Edit3,
              },
              {
                label: 'Excluir',
                onClick: () => handleDelete(project.id),
                icon: Trash2,
                variant: 'destructive' as const,
              },
            ];

            return (
              <ContentCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                imageAlt={project.title}
                tags={project.tag}
                metadata={metadata}
                actions={actions}
                layout='featured'
                onCardClick={() => modal.openModal(project)}
              />
            );
          })}
        </div>
      )}

      {/* Dialog Modal */}
      <Dialog open={modal.isOpen} onOpenChange={modal.closeModal}>
        <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {modal.data ? 'Editar Projeto' : 'Novo Projeto'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações do projeto'
                : 'Adicione um novo projeto ao portfólio'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className='space-y-6'>
            <Tabs defaultValue='basic' className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='basic'>Básico</TabsTrigger>
                <TabsTrigger value='content'>Conteúdo</TabsTrigger>
                <TabsTrigger value='links'>Links</TabsTrigger>
              </TabsList>

              <TabsContent value='basic' className='space-y-4'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label htmlFor='title' className='text-sm font-medium'>
                      Título
                    </label>
                    <input
                      id='title'
                      name='title'
                      type='text'
                      value={formData.title}
                      onChange={e =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor='year' className='text-sm font-medium'>
                      Ano
                    </label>
                    <input
                      id='year'
                      name='year'
                      type='text'
                      value={formData.year}
                      onChange={e =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='image' className='text-sm font-medium'>
                    Imagem do Projeto
                  </label>
                  <ImageUpload
                    value={currentImage}
                    onChange={setCurrentImage}
                    placeholder='Upload da imagem do projeto'
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label htmlFor='tags' className='text-sm font-medium'>
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      id='tags'
                      name='tags'
                      type='text'
                      value={formData.tags}
                      onChange={e =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                      placeholder='React, Design, Frontend'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor='categories' className='text-sm font-medium'>
                      Categorias (separadas por vírgula)
                    </label>
                    <input
                      id='categories'
                      name='categories'
                      type='text'
                      value={formData.categories}
                      onChange={e =>
                        setFormData({ ...formData, categories: e.target.value })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                      placeholder='Web Design, Mobile App'
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='content' className='space-y-4'>
                <div className='space-y-2'>
                  <label htmlFor='description' className='text-sm font-medium'>
                    Descrição
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    rows={3}
                    value={formData.description}
                    onChange={e =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='whatIAccomplished'
                    className='text-sm font-medium'
                  >
                    O que realizei
                  </label>
                  <textarea
                    id='whatIAccomplished'
                    name='whatIAccomplished'
                    rows={4}
                    value={formData.whatIAccomplished}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        whatIAccomplished: e.target.value,
                      })
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value='links' className='space-y-4'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='figmaMobile'
                      className='text-sm font-medium'
                    >
                      Figma Mobile
                    </label>
                    <input
                      id='figmaMobile'
                      name='figmaMobile'
                      type='url'
                      value={formData.figmaMobile}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          figmaMobile: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label
                      htmlFor='figmaDesktop'
                      className='text-sm font-medium'
                    >
                      Figma Desktop
                    </label>
                    <input
                      id='figmaDesktop'
                      name='figmaDesktop'
                      type='url'
                      value={formData.figmaDesktop}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          figmaDesktop: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label
                      htmlFor='dribbbleUrl'
                      className='text-sm font-medium'
                    >
                      Dribbble
                    </label>
                    <input
                      id='dribbbleUrl'
                      name='dribbbleUrl'
                      type='url'
                      value={formData.dribbbleUrl}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          dribbbleUrl: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor='behanceUrl' className='text-sm font-medium'>
                      Behance
                    </label>
                    <input
                      id='behanceUrl'
                      name='behanceUrl'
                      type='url'
                      value={formData.behanceUrl}
                      onChange={e =>
                        setFormData({ ...formData, behanceUrl: e.target.value })
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background'
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={modal.closeModal}
              >
                Cancelar
              </Button>
              <Button type='submit'>
                {modal.data ? 'Atualizar' : 'Criar'} Projeto
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
