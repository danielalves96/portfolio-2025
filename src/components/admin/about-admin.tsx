'use client';

import { useEffect, useState } from 'react';

import { Edit3, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getAboutData();
      setAboutData(data);
      setParagraphs(data?.paragraphs || ['']);
    } catch (error) {
      console.error('Error loading about data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData: FormData) => {
    setIsSaving(true);
    try {
      const data = {
        name: formData.get('name') as string,
        city: formData.get('city') as string,
        role: formData.get('role') as string,
        paragraphs: paragraphs.filter(p => p.trim()),
      };

      const result = await updateAboutData(data);
      if (result.success) {
        toast.success('Dados pessoais atualizados com sucesso!');
        await loadData();
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
    return (
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
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Edit3 className='h-5 w-5' />
          Dados Sobre
        </CardTitle>
        <CardDescription>
          Configure as informações pessoais e biografia da seção sobre
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSave} className='space-y-6'>
          {/* Basic Info */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <label htmlFor='name' className='text-sm font-medium'>
                Nome Completo
              </label>
              <input
                id='name'
                name='name'
                type='text'
                defaultValue={aboutData?.name || ''}
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: Paola Oliveira'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='city' className='text-sm font-medium'>
                Cidade
              </label>
              <input
                id='city'
                name='city'
                type='text'
                defaultValue={aboutData?.city || ''}
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: São Paulo, SP'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='role' className='text-sm font-medium'>
                Função/Cargo
              </label>
              <input
                id='role'
                name='role'
                type='text'
                defaultValue={aboutData?.role || ''}
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Ex: UX/UI Designer'
                required
              />
            </div>
          </div>

          {/* Paragraphs */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium'>
                Parágrafos da Biografia
              </label>
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

            <div className='space-y-3'>
              {paragraphs.map((paragraph, index) => (
                <div key={index} className='flex gap-2'>
                  <div className='flex-1'>
                    <textarea
                      value={paragraph}
                      onChange={e => updateParagraph(index, e.target.value)}
                      rows={3}
                      className='w-full px-3 py-2 border border-border rounded-md bg-background resize-none'
                      placeholder={`Parágrafo ${index + 1}...`}
                    />
                  </div>
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
              ))}
            </div>

            {paragraphs.length === 0 && (
              <div className='text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg'>
                <Edit3 className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p>Nenhum parágrafo adicionado</p>
                <p className='text-sm'>
                  Clique em "Adicionar Parágrafo" para começar
                </p>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className='flex justify-end pt-4 border-t'>
            <Button type='submit' disabled={isSaving} className='min-w-[120px]'>
              {isSaving ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save className='h-4 w-4 mr-2' />
                  Salvar Dados
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
