'use client';

import { useEffect, useState } from 'react';

import { Edit3, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormSection, FormSectionGrid } from '@/components/ui/form-section';
import { SkeletonCard } from '@/components/ui/skeleton';

import { updateAboutData } from '@/lib/actions/admin-actions';
import { getAboutData } from '@/lib/actions/data-fetching';

interface AboutData {
  id: number;
  name: string;
  city: string;
  role: string;
  paragraphs: string[];
}

export default function AboutAdmin() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    role: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  // Update form state when aboutData changes
  useEffect(() => {
    if (aboutData) {
      setFormData({
        name: aboutData.name || '',
        city: aboutData.city || '',
        role: aboutData.role || '',
      });
      setParagraphs(aboutData.paragraphs || ['']);
    } else {
      // Reset form state
      setFormData({
        name: '',
        city: '',
        role: '',
      });
      setParagraphs(['']);
    }
  }, [aboutData]);

  const loadData = async () => {
    try {
      const data = await getAboutData();
      setAboutData(data || null);
    } catch (error) {
      console.error('Error loading about data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = {
        name: formData.name,
        city: formData.city,
        role: formData.role,
        paragraphs: paragraphs.filter(p => p.trim()),
      };

      const result = await updateAboutData(data);
      if (result.success) {
        toast.success('Dados pessoais atualizados com sucesso!');
        await loadData();
        // Reset form state after successful save
        setFormData({
          name: '',
          city: '',
          role: '',
        });
        setParagraphs(['']);
      } else {
        toast.error('Erro ao salvar dados pessoais.');
      }
    } catch (error) {
      console.error('Error saving about data:', error);
      toast.error('Erro ao salvar dados pessoais.');
    } finally {
      setIsSaving(false);
    }
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const removeParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  const updateParagraph = (index: number, value: string) => {
    const updated = [...paragraphs];
    updated[index] = value;
    setParagraphs(updated);
  };

  if (isLoading) {
    return <SkeletonCard showImage={false} showActions={false} textLines={3} />;
  }

  return (
    <FormSection
      title='Dados Sobre'
      description='Configure as informações pessoais e biografia da seção sobre'
    >
      <form onSubmit={handleSave} className='space-y-6'>
        {/* Basic Info */}
        <FormSection
          title='Informações Básicas'
          description='Dados pessoais que aparecerão na seção sobre'
          collapsible={false}
        >
          <FormSectionGrid columns={3} gap='md'>
            <FormField
              label='Nome Completo'
              description='Seu nome completo'
              required
            >
              <input
                type='text'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: Paola Oliveira'
                required
              />
            </FormField>

            <FormField
              label='Cidade'
              description='Sua localização atual'
              required
            >
              <input
                type='text'
                value={formData.city}
                onChange={e =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: São Paulo, SP'
                required
              />
            </FormField>

            <FormField
              label='Função/Cargo'
              description='Sua profissão ou área de atuação'
              required
            >
              <input
                type='text'
                value={formData.role}
                onChange={e =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: UX/UI Designer'
                required
              />
            </FormField>
          </FormSectionGrid>
        </FormSection>

        {/* Biography Paragraphs */}
        <FormSection
          title='Biografia'
          description='Parágrafos que compõem sua biografia pessoal'
          collapsible={false}
        >
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h4 className='text-sm font-medium'>Parágrafos</h4>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addParagraph}
              >
                <Plus className='h-4 w-4 mr-2' />
                Adicionar Parágrafo
              </Button>
            </div>

            {paragraphs.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg'>
                <Edit3 className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p>Nenhum parágrafo adicionado</p>
                <p className='text-sm'>
                  Clique em "Adicionar Parágrafo" para começar
                </p>
              </div>
            ) : (
              <div className='space-y-3'>
                {paragraphs.map((paragraph, index) => (
                  <FormField
                    key={index}
                    label={`Parágrafo ${index + 1}`}
                    description={`Conteúdo do ${index + 1}º parágrafo da biografia`}
                  >
                    <div className='flex gap-2'>
                      <textarea
                        value={paragraph}
                        onChange={e => updateParagraph(index, e.target.value)}
                        rows={3}
                        className='flex-1 px-3 py-2 border border-border rounded-md bg-background resize-none'
                        placeholder={`Conteúdo do parágrafo ${index + 1}...`}
                      />
                      {paragraphs.length > 1 && (
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={() => removeParagraph(index)}
                          className='flex-shrink-0'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  </FormField>
                ))}
              </div>
            )}
          </div>
        </FormSection>

        {/* Save Button */}
        <div className='flex justify-end pt-4 border-t'>
          <Button
            type='submit'
            disabled={isSaving}
            loading={isSaving}
            className='min-w-[120px]'
          >
            <Save className='h-4 w-4 mr-2' />
            {isSaving ? 'Salvando...' : 'Salvar Dados'}
          </Button>
        </div>
      </form>
    </FormSection>
  );
}
