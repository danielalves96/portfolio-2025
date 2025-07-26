'use client';

import { useEffect, useState } from 'react';

import { Edit3, Eye, Plus, Trash2, Wrench } from 'lucide-react';
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
  const modal = useModal<Tool>();

  useEffect(() => {
    loadData();
  }, []);

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

  const handleSave = async (formData: FormData) => {
    const data = {
      name: formData.get('name') as string,
      image: formData.get('image') as string,
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
      modal.closeModal();
    } catch (error) {
      console.error('Error saving tool:', error);
      toast.error('Erro ao salvar ferramenta. Tente novamente.');
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
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardContent className='p-4'>
                <div className='h-16 bg-muted animate-pulse rounded mb-2' />
                <div className='h-4 bg-muted animate-pulse rounded' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const tools = toolsData?.tools || [];

  return (
    <div className='space-y-6'>
      {/* Section Info */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Wrench className='h-5 w-5' />
            {toolsData?.title || 'FERRAMENTAS'}
          </CardTitle>
          <CardDescription>
            {toolsData?.description ||
              'Gerencie as ferramentas utilizadas no trabalho'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <Badge variant='secondary' className='gap-1'>
              <Wrench className='h-3 w-3' />
              {tools.length} Ferramentas
            </Badge>
            <Button onClick={() => modal.openModal()}>
              <Plus className='h-4 w-4 mr-2' />
              Nova Ferramenta
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {tools.map(tool => (
          <Card
            key={tool.id}
            className='group hover:shadow-lg transition-shadow'
          >
            <CardContent className='p-4'>
              {/* Image */}
              <div className='aspect-square bg-muted rounded-lg flex items-center justify-center mb-3 overflow-hidden'>
                {tool.image ? (
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className='w-full h-full object-contain p-2'
                  />
                ) : (
                  <Eye className='h-8 w-8 text-muted-foreground' />
                )}
              </div>

              {/* Name */}
              <div className='flex items-center justify-between'>
                <h3 className='font-medium truncate'>{tool.name}</h3>
                <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => modal.openModal(tool)}
                  >
                    <Edit3 className='h-3 w-3' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleDelete(tool.id)}
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </div>

              {/* Image Path */}
              <p className='text-xs text-muted-foreground font-mono truncate mt-2 pt-2 border-t'>
                {tool.image || 'Sem imagem'}
              </p>
            </CardContent>
          </Card>
        ))}

        {tools.length === 0 && (
          <div className='col-span-full'>
            <Card>
              <CardContent className='text-center py-12'>
                <Wrench className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p className='text-muted-foreground mb-4'>
                  Nenhuma ferramenta encontrada
                </p>
                <Button onClick={() => modal.openModal()}>
                  <Plus className='h-4 w-4 mr-2' />
                  Criar Primeira Ferramenta
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Tools Categories Preview */}
      {tools.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Preview das Ferramentas</CardTitle>
            <CardDescription>
              Visualize como as ferramentas aparecem no portfólio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
              {tools.slice(0, 6).map(tool => (
                <div
                  key={tool.id}
                  className='flex items-center gap-3 p-2 border rounded-lg'
                >
                  <div className='w-8 h-8 bg-muted rounded flex items-center justify-center overflow-hidden'>
                    {tool.image ? (
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className='w-full h-full object-contain'
                      />
                    ) : (
                      <Wrench className='h-4 w-4 text-muted-foreground' />
                    )}
                  </div>
                  <span className='text-sm font-medium truncate'>
                    {tool.name}
                  </span>
                </div>
              ))}
              {tools.length > 6 && (
                <div className='flex items-center justify-center p-2 border-2 border-dashed rounded-lg text-muted-foreground'>
                  <span className='text-sm'>+{tools.length - 6} mais</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
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

          <form action={handleSave} className='space-y-4'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Nome da Ferramenta
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  defaultValue={modal.data?.name || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: Figma, Adobe XD, Sketch...'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='image' className='text-sm font-medium'>
                  URL da Imagem/Ícone
                </label>
                <input
                  id='image'
                  name='image'
                  type='text'
                  defaultValue={modal.data?.image || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='/tools/figma.svg'
                  required
                />
              </div>

              {/* Preview */}
              {modal.data?.image && (
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Preview</label>
                  <div className='w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                    <img
                      src={modal.data.image}
                      alt='Preview'
                      className='w-full h-full object-contain p-1'
                    />
                  </div>
                </div>
              )}

              <div className='bg-muted/50 p-3 rounded-lg'>
                <p className='text-xs text-muted-foreground'>
                  <strong>Dica:</strong> Use ícones em formato SVG ou PNG com
                  fundo transparente para melhor qualidade visual.
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
                {modal.data ? 'Atualizar' : 'Criar'} Ferramenta
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
