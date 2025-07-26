'use client';

import { useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Edit3, GripVertical, Plus, Trash2 } from 'lucide-react';
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
import { SkeletonCard } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useModal } from '@/hooks/use-modal';
import {
  createProject,
  deleteProject,
  updateProject,
  updateProjectsOrder,
} from '@/lib/actions/admin-actions';
import { getProjectsData } from '@/lib/actions/data-fetching';
import { Project } from '@/types/project';

// Sortable Project Component
function SortableProject({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors'
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className='flex-shrink-0 p-2 hover:bg-accent rounded cursor-grab active:cursor-grabbing'
      >
        <GripVertical className='h-5 w-5 text-muted-foreground' />
      </div>

      {/* Project Image */}
      <div className='flex-shrink-0 w-16 h-16 rounded overflow-hidden'>
        <img
          src={project.image}
          alt={project.title}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Project Info */}
      <div className='flex-1 min-w-0'>
        <h3 className='font-semibold truncate mb-1'>{project.title}</h3>
        <p className='text-sm text-muted-foreground line-clamp-2 mb-2'>
          {project.description}
        </p>
        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
          <span className='flex items-center gap-1'>
            <Calendar className='h-3 w-3' />
            {project.year}
          </span>
          <span>{project.category.join(', ')}</span>
        </div>
      </div>

      {/* Actions */}
      <div className='flex-shrink-0 flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onEdit(project)}
          className='h-8 w-8 p-0'
        >
          <Edit3 className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onDelete(project.id)}
          className='h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
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

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      // Sort by order field
      const sortedProjects = data.projects.sort((a, b) => a.order - b.order);
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex(project => project.id === active.id);
      const newIndex = projects.findIndex(project => project.id === over?.id);

      // Update local state immediately for better UX
      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);

      // Update order values and send to server
      const updatedOrder = newProjects.map((project, index) => ({
        id: project.id,
        order: index + 1,
      }));

      try {
        await updateProjectsOrder(updatedOrder);
        toast.success('Ordem dos projetos atualizada!');
      } catch (error) {
        console.error('Error updating projects order:', error);
        toast.error('Erro ao atualizar ordem dos projetos');
        // Revert local state on error
        await loadData();
      }
    }
  };

  const handleDelete = async (id: number) => {
    toast('Tem certeza que deseja deletar este projeto?', {
      action: {
        label: 'Deletar',
        onClick: async () => {
          try {
            await deleteProject(id);
            toast.success('Projeto deletado com sucesso!');
            await loadData();
          } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Erro ao deletar projeto. Tente novamente.');
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='space-y-4'>
              {projects.map(project => (
                <SortableProject
                  key={project.id}
                  project={project}
                  onEdit={project => modal.openModal(project)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
