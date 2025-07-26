'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Edit3, Eye, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
  const modal = useModal<Service>();

  useEffect(() => {
    loadData();
  }, []);

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
    if (confirm('Tem certeza que deseja deletar este serviço?')) {
      try {
        await deleteService(id);
        toast.success('Serviço deletado com sucesso!');
        await loadData();
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Erro ao deletar serviço. Tente novamente.');
      }
    }
  };

  const handleSave = async (formData: FormData) => {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
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
      modal.closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Erro ao salvar serviço. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className='h-6 bg-muted animate-pulse rounded' />
              <div className='h-4 bg-muted animate-pulse rounded w-2/3' />
            </CardHeader>
            <CardContent>
              <div className='h-32 bg-muted animate-pulse rounded' />
            </CardContent>
          </Card>
        ))}
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
                Serviços ({services.length})
              </CardTitle>
              <CardDescription>Gerencie os serviços oferecidos</CardDescription>
            </div>
            <Button onClick={() => modal.openModal()}>
              <Plus className='h-4 w-4 mr-2' />
              Novo Serviço
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Services List */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {services.map(service => (
          <Card
            key={service.id}
            className='group hover:shadow-lg transition-shadow'
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between'>
                <CardTitle className='text-lg line-clamp-2'>
                  {service.title}
                </CardTitle>
                <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => modal.openModal(service)}
                  >
                    <Edit3 className='h-3 w-3' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Image */}
              <div className='aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden relative'>
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className='object-cover'
                  />
                ) : (
                  <Eye className='h-8 w-8 text-muted-foreground' />
                )}
              </div>

              {/* Description */}
              <div>
                <p className='text-sm text-muted-foreground line-clamp-3'>
                  {service.description}
                </p>
              </div>

              {/* Image Path */}
              <div className='pt-2 border-t'>
                <p className='text-xs text-muted-foreground font-mono truncate'>
                  {service.image || 'Sem imagem'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <div className='col-span-full'>
            <Card>
              <CardContent className='text-center py-12'>
                <Edit3 className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p className='text-muted-foreground mb-4'>
                  Nenhum serviço encontrado
                </p>
                <Button onClick={() => modal.openModal()}>
                  <Plus className='h-4 w-4 mr-2' />
                  Criar Primeiro Serviço
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
              {modal.data ? 'Editar Serviço' : 'Novo Serviço'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações do serviço'
                : 'Adicione um novo serviço ao portfólio'}
            </DialogDescription>
          </DialogHeader>

          <form action={handleSave} className='space-y-4'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='title' className='text-sm font-medium'>
                  Título do Serviço
                </label>
                <input
                  id='title'
                  name='title'
                  type='text'
                  defaultValue={modal.data?.title || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: UX/UI Design'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='description' className='text-sm font-medium'>
                  Descrição
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows={4}
                  defaultValue={modal.data?.description || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                  placeholder='Descreva o serviço oferecido...'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='image' className='text-sm font-medium'>
                  URL da Imagem
                </label>
                <input
                  id='image'
                  name='image'
                  type='text'
                  defaultValue={modal.data?.image || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='/services/service-icon.svg'
                  required
                />
                <p className='text-xs text-muted-foreground'>
                  Caminho para o ícone ou imagem do serviço
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
                {modal.data ? 'Atualizar' : 'Criar'} Serviço
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
