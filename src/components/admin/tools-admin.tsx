'use client';

import { useEffect, useState } from 'react';

import { Edit3, Plus, Trash2, Wrench } from 'lucide-react';
import { toast } from 'sonner';

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
import { ContentCard } from '@/components/ui/enhanced-card';
import { FormField } from '@/components/ui/form-field';
import { SkeletonCard } from '@/components/ui/skeleton';

import { useModal } from '@/hooks/use-modal';
import {
  createTool,
  deleteTool,
  updateTool,
} from '@/lib/actions/admin-actions';
import { getToolsData } from '@/lib/actions/data-fetching';

interface Tool {
  id: number;
  name: string;
  image: string;
}

export default function ToolsAdmin() {
  const [toolsData, setToolsData] = useState<{
    title: string;
    description: string;
    tools: Tool[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
  });

  const modal = useModal<Tool>();

  useEffect(() => {
    loadData();
  }, []);

  // Update form state when modal data changes
  useEffect(() => {
    if (modal.data) {
      setCurrentImage(modal.data.image || '');
      setFormData({
        name: modal.data.name || '',
      });
    } else {
      // Reset for new tool
      setCurrentImage('');
      setFormData({
        name: '',
      });
    }
  }, [modal.data]);

  const loadData = async () => {
    try {
      const data = await getToolsData();
      setToolsData(data);
    } catch (error) {
      console.error('Error loading tools:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta ferramenta?')) {
      try {
        await deleteTool(id);
        toast.success('Ferramenta deletada com sucesso!');
        await loadData();
      } catch (error) {
        console.error('Error deleting tool:', error);
        toast.error('Erro ao deletar ferramenta. Tente novamente.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      image: currentImage,
    };

    try {
      if (modal.data) {
        await updateTool(modal.data.id, data);
        toast.success('Ferramenta atualizada com sucesso!');
      } else {
        await createTool(data);
        toast.success('Ferramenta criada com sucesso!');
      }
      await loadData();
      // Reset form state
      setCurrentImage('');
      setFormData({
        name: '',
      });
      modal.closeModal();
    } catch (error) {
      console.error('Error saving tool:', error);
      toast.error('Erro ao salvar ferramenta. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        {/* Header skeleton */}
        <SkeletonCard showImage={false} showActions={false} textLines={1} />

        {/* Tools skeleton */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[...Array(8)].map((_, i) => (
            <SkeletonCard
              key={i}
              showImage={true}
              showActions={true}
              textLines={1}
            />
          ))}
        </div>
      </div>
    );
  }

  const tools = toolsData?.tools || [];

  return (
    <div className='space-y-6'>
      {/* Section Info */}
      <div className='flex items-center justify-between p-6 bg-card rounded-lg border'>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <Wrench className='h-5 w-5' />
            {toolsData?.title || 'FERRAMENTAS'}
          </h2>
          <p className='text-sm text-muted-foreground'>
            {toolsData?.description ||
              'Gerencie as ferramentas utilizadas no trabalho'}
          </p>
          <Badge variant='secondary' className='gap-1'>
            <Wrench className='h-3 w-3' />
            {tools.length} Ferramentas
          </Badge>
        </div>
        <Button onClick={() => modal.openModal()}>
          <Plus className='h-4 w-4 mr-2' />
          Nova Ferramenta
        </Button>
      </div>

      {/* Tools Grid */}
      {tools.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title='Nenhuma ferramenta encontrada'
          description='Adicione as ferramentas que você utiliza no seu trabalho.'
          action={{
            label: 'Criar Primeira Ferramenta',
            onClick: () => modal.openModal(),
            icon: Plus,
          }}
          variant='card'
        />
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {tools.map(tool => {
            // Prepare actions for the card
            const actions = [
              {
                label: 'Editar',
                onClick: () => modal.openModal(tool),
                icon: Edit3,
              },
              {
                label: 'Excluir',
                onClick: () => handleDelete(tool.id),
                icon: Trash2,
                variant: 'destructive' as const,
              },
            ];

            return (
              <ContentCard
                key={tool.id}
                title={tool.name}
                image={tool.image}
                imageAlt={tool.name}
                actions={actions}
                layout='compact'
                density='compact'
                onCardClick={() => modal.openModal(tool)}
              />
            );
          })}
        </div>
      )}

      {/* Dialog Modal */}
      <Dialog open={modal.isOpen} onOpenChange={modal.closeModal}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {modal.data ? 'Editar Ferramenta' : 'Nova Ferramenta'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações da ferramenta'
                : 'Adicione uma nova ferramenta ao portfólio'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className='space-y-6'>
            <FormField
              label='Nome da Ferramenta'
              description='Nome da ferramenta que será exibido'
              required
            >
              <input
                type='text'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: Figma, Adobe XD, Sketch...'
                required
              />
            </FormField>

            <FormField
              label='Ícone da Ferramenta'
              description='Ícone representativo da ferramenta'
            >
              <ImageUpload
                value={currentImage}
                onChange={setCurrentImage}
                placeholder='Upload do ícone da ferramenta'
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
                {modal.data ? 'Atualizar' : 'Criar'} Ferramenta
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
