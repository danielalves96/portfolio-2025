'use client';

import { useEffect, useState } from 'react';

import { Edit3, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ServicesEmptyState } from '@/components/ui/empty-state';
import { ContentCard } from '@/components/ui/enhanced-card';
import { FormField } from '@/components/ui/form-field';
import { SkeletonCard } from '@/components/ui/skeleton';

import { useModal } from '@/hooks/use-modal';
import {
  createService,
  deleteService,
  updateService,
} from '@/lib/actions/admin-actions';
import { getServicesData } from '@/lib/actions/data-fetching';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const modal = useModal<Service>();

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
      });
    } else {
      // Reset for new service
      setCurrentImage('');
      setFormData({
        title: '',
        description: '',
      });
    }
  }, [modal.data]);

  const loadData = async () => {
    try {
      const data = await getServicesData();
      setServices(data.services);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    toast('Tem certeza que deseja deletar este serviço?', {
      action: {
        label: 'Deletar',
        onClick: async () => {
          try {
            await deleteService(id);
            toast.success('Serviço deletado com sucesso!');
            await loadData();
          } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Erro ao deletar serviço. Tente novamente.');
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
      title: formData.title,
      description: formData.description,
      image: currentImage,
    };

    try {
      if (modal.data) {
        await updateService(modal.data.id, data);
        toast.success('Serviço atualizado com sucesso!');
      } else {
        await createService(data);
        toast.success('Serviço criado com sucesso!');
      }
      await loadData();
      // Reset form state
      setCurrentImage('');
      setFormData({
        title: '',
        description: '',
      });
      modal.closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Erro ao salvar serviço. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <SkeletonCard showImage={false} showActions={false} textLines={2} />
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
      <div className='flex items-center justify-between p-6 bg-card rounded-lg border'>
        <div>
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <Edit3 className='h-5 w-5' />
            Serviços ({services.length})
          </h2>
          <p className='text-sm text-muted-foreground mt-1'>
            Gerencie os serviços oferecidos
          </p>
        </div>
        <Button onClick={() => modal.openModal()}>
          <Plus className='h-4 w-4 mr-2' />
          Novo Serviço
        </Button>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <ServicesEmptyState
          onCreateService={() => modal.openModal()}
          variant='card'
        />
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {services.map(service => {
            // Prepare actions for the card
            const actions = [
              {
                label: 'Editar',
                onClick: () => modal.openModal(service),
                icon: Edit3,
              },
              {
                label: 'Excluir',
                onClick: () => handleDelete(service.id),
                icon: Trash2,
                variant: 'destructive' as const,
              },
            ];

            return (
              <ContentCard
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                imageAlt={service.title}
                actions={actions}
                layout='featured'
                onCardClick={() => modal.openModal(service)}
              />
            );
          })}
        </div>
      )}

      {/* Dialog Modal */}
      <Dialog open={modal.isOpen} onOpenChange={modal.closeModal}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>
              {modal.data ? 'Editar Serviço' : 'Novo Serviço'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações do serviço'
                : 'Adicione um novo serviço ao portfólio'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className='space-y-6'>
            <FormField
              label='Título do Serviço'
              description='Nome do serviço que será exibido'
              required
            >
              <input
                type='text'
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: UX/UI Design'
                required
              />
            </FormField>

            <FormField
              label='Descrição'
              description='Descrição detalhada do serviço oferecido'
              required
            >
              <textarea
                rows={4}
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                placeholder='Descreva o serviço oferecido...'
                required
              />
            </FormField>

            <FormField
              label='Imagem do Serviço'
              description='Imagem representativa do serviço'
            >
              <ImageUpload
                value={currentImage}
                onChange={setCurrentImage}
                placeholder='Upload da imagem do serviço'
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
                {modal.data ? 'Atualizar' : 'Criar'} Serviço
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
