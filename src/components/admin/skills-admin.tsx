'use client';

import { useEffect, useState } from 'react';

import { Edit3, Plus, Trash2 } from 'lucide-react';
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
  createSkill,
  deleteSkill,
  updateSkill,
} from '@/lib/actions/admin-actions';
import { getSkillsData } from '@/lib/actions/data-fetching';

interface Skill {
  id: number;
  name: string;
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const modal = useModal<Skill>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getSkillsData();
      setSkills(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta habilidade?')) {
      try {
        await deleteSkill(id);
        toast.success('Habilidade deletada com sucesso!');
        await loadData();
      } catch (error) {
        console.error('Error deleting skill:', error);
        toast.error('Erro ao deletar habilidade. Tente novamente.');
      }
    }
  };

  const handleSave = async (formData: FormData) => {
    const data = {
      name: formData.get('name') as string,
    };

    try {
      if (modal.data) {
        await updateSkill(modal.data.id, data);
        toast.success('Habilidade atualizada com sucesso!');
      } else {
        await createSkill(data);
        toast.success('Habilidade criada com sucesso!');
      }
      await loadData();
      modal.closeModal();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error('Erro ao salvar habilidade. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
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
                Habilidades ({skills.length})
              </CardTitle>
              <CardDescription>
                Gerencie as habilidades e competências técnicas
              </CardDescription>
            </div>
            <Button onClick={() => modal.openModal()}>
              <Plus className='h-4 w-4 mr-2' />
              Nova Habilidade
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Skills Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {skills.map(skill => (
          <Card
            key={skill.id}
            className='group hover:shadow-lg transition-shadow'
          >
            <CardContent className='p-4'>
              {/* Name */}
              <div className='flex items-center justify-between'>
                <h3 className='font-medium text-lg'>{skill.name}</h3>
                <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => modal.openModal(skill)}
                  >
                    <Edit3 className='h-3 w-3' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleDelete(skill.id)}
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </div>

              {/* Skill ID */}
              <p className='text-xs text-muted-foreground mt-2 pt-2 border-t'>
                ID: {skill.id}
              </p>
            </CardContent>
          </Card>
        ))}

        {skills.length === 0 && (
          <div className='col-span-full'>
            <Card>
              <CardContent className='text-center py-12'>
                <Edit3 className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p className='text-muted-foreground mb-4'>
                  Nenhuma habilidade encontrada
                </p>
                <Button onClick={() => modal.openModal()}>
                  <Plus className='h-4 w-4 mr-2' />
                  Criar Primeira Habilidade
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Summary */}
      {skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-4'>
              <Badge variant='secondary' className='gap-1'>
                <Edit3 className='h-3 w-3' />
                {skills.length} Habilidades
              </Badge>
              <Badge variant='outline'>Carousel de Skills</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog Modal */}
      <Dialog open={modal.isOpen} onOpenChange={modal.closeModal}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {modal.data ? 'Editar Habilidade' : 'Nova Habilidade'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações da habilidade'
                : 'Adicione uma nova habilidade ao portfólio'}
            </DialogDescription>
          </DialogHeader>

          <form action={handleSave} className='space-y-4'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Nome da Habilidade
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  defaultValue={modal.data?.name || ''}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background'
                  placeholder='Ex: React, Figma, Photoshop...'
                  required
                />
                <p className='text-xs text-muted-foreground'>
                  Nome da habilidade que aparecerá no carousel de texto
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
                {modal.data ? 'Atualizar' : 'Criar'} Habilidade
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
