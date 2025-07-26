'use client';

import { useEffect, useState } from 'react';

import { Edit3, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
import { SkillsEmptyState } from '@/components/ui/empty-state';
import { ContentListItem } from '@/components/ui/enhanced-card';
import { SkeletonList } from '@/components/ui/skeleton';

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

  // Form state
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  // Update form state when modal data changes
  useEffect(() => {
    if (modal.data) {
      setFormData({
        name: modal.data.name || '',
      });
    } else {
      // Reset form state
      setFormData({
        name: '',
      });
    }
  }, [modal.data]);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
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
      // Reset form state after successful save
      setFormData({
        name: '',
      });
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error('Erro ao salvar habilidade. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        {/* Header skeleton */}
        <Card>
          <CardHeader>
            <div className='h-6 bg-muted animate-pulse rounded w-1/3' />
            <div className='h-4 bg-muted animate-pulse rounded w-1/2' />
          </CardHeader>
        </Card>

        {/* Skills skeleton */}
        <SkeletonList items={8} showAvatar={false} showActions={true} />
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

      {/* Skills List */}
      {skills.length === 0 ? (
        <SkillsEmptyState
          onCreateSkill={() => modal.openModal()}
          variant='card'
        />
      ) : (
        <div className='space-y-2'>
          {skills.map(skill => {
            // Prepare actions for the list item
            const actions = [
              {
                label: 'Editar',
                onClick: () => modal.openModal(skill),
                icon: Edit3,
              },
              {
                label: 'Excluir',
                onClick: () => handleDelete(skill.id),
                icon: Trash2,
                variant: 'destructive' as const,
              },
            ];

            return (
              <ContentListItem
                key={skill.id}
                title={skill.name}
                actions={actions}
                compact={true}
                onCardClick={() => modal.openModal(skill)}
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
              {modal.data ? 'Editar Habilidade' : 'Nova Habilidade'}
            </DialogTitle>
            <DialogDescription>
              {modal.data
                ? 'Atualize as informações da habilidade'
                : 'Adicione uma nova habilidade ao portfólio'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className='space-y-4'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Nome da Habilidade
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
