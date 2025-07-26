'use client';

import { useEffect, useState } from 'react';

import { Save } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormSection, FormSectionGrid } from '@/components/ui/form-section';
import { SkeletonCard } from '@/components/ui/skeleton';

import { updateContactData } from '@/lib/actions/admin-actions';
import { getContactData } from '@/lib/actions/data-fetching';

interface ContactData {
  title: string;
  email: {
    recipient: string;
    sender: {
      name: string;
      email: string;
    };
    subject: {
      prefix: string;
    };
  };
}

export default function ContactAdmin() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    emailRecipient: '',
    emailSenderName: '',
    emailSenderEmail: '',
    emailSubjectPrefix: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  // Update form state when contactData changes
  useEffect(() => {
    if (contactData) {
      setFormData({
        title: contactData.title || '',
        emailRecipient: contactData.email?.recipient || '',
        emailSenderName: contactData.email?.sender?.name || '',
        emailSenderEmail: contactData.email?.sender?.email || '',
        emailSubjectPrefix: contactData.email?.subject?.prefix || '',
      });
    } else {
      // Reset form state
      setFormData({
        title: '',
        emailRecipient: '',
        emailSenderName: '',
        emailSenderEmail: '',
        emailSubjectPrefix: '',
      });
    }
  }, [contactData]);

  const loadData = async () => {
    try {
      const data = await getContactData();
      setContactData(data);
    } catch (error) {
      console.error('Error loading contact data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = {
        title: formData.title,
        emailRecipient: formData.emailRecipient,
        emailSenderName: formData.emailSenderName,
        emailSenderEmail: formData.emailSenderEmail,
        emailSubjectPrefix: formData.emailSubjectPrefix,
      };

      const result = await updateContactData(data);
      if (result.success) {
        toast.success('Configurações de contato atualizadas com sucesso!');
        await loadData();
        // Reset form state after successful save
        setFormData({
          title: '',
          emailRecipient: '',
          emailSenderName: '',
          emailSenderEmail: '',
          emailSubjectPrefix: '',
        });
      } else {
        toast.error('Erro ao salvar configurações de contato.');
      }
    } catch (error) {
      console.error('Error saving contact data:', error);
      toast.error('Erro ao salvar configurações de contato.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <SkeletonCard showImage={false} showActions={false} textLines={3} />;
  }

  return (
    <FormSection
      title='Configurações de Contato'
      description='Configure o título da seção e parâmetros do formulário de contato'
    >
      <form onSubmit={handleSave} className='space-y-6'>
        {/* Section Title */}
        <FormField
          label='Título da Seção'
          description='Título que aparecerá na seção de contato'
          required
        >
          <input
            type='text'
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className='w-full px-3 py-2 border border-border rounded-md bg-background'
            placeholder='Ex: ENTRE EM CONTATO'
            required
          />
        </FormField>

        {/* Email Configuration */}
        <FormSection
          title='Configuração de Email'
          description='Parâmetros para o envio de emails do formulário de contato'
          collapsible={false}
        >
          <FormSectionGrid columns={2} gap='md'>
            <FormField
              label='Email Destinatário'
              description='Email que receberá as mensagens do formulário'
              required
            >
              <input
                type='email'
                value={formData.emailRecipient}
                onChange={e =>
                  setFormData({
                    ...formData,
                    emailRecipient: e.target.value,
                  })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='contato@exemplo.com'
                required
              />
            </FormField>

            <FormField
              label='Prefixo do Assunto'
              description='Texto que aparecerá no início do assunto do email'
              required
            >
              <input
                type='text'
                value={formData.emailSubjectPrefix}
                onChange={e =>
                  setFormData({
                    ...formData,
                    emailSubjectPrefix: e.target.value,
                  })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='[Contato Site]'
                required
              />
            </FormField>

            <FormField
              label='Nome do Remetente'
              description='Nome que aparecerá como remetente'
              required
            >
              <input
                type='text'
                value={formData.emailSenderName}
                onChange={e =>
                  setFormData({
                    ...formData,
                    emailSenderName: e.target.value,
                  })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='Sistema de Contato'
                required
              />
            </FormField>

            <FormField
              label='Email do Remetente'
              description='Email que aparecerá como remetente'
              required
            >
              <input
                type='email'
                value={formData.emailSenderEmail}
                onChange={e =>
                  setFormData({
                    ...formData,
                    emailSenderEmail: e.target.value,
                  })
                }
                className='w-full px-3 py-2 border border-border rounded-md bg-background'
                placeholder='noreply@exemplo.com'
                required
              />
            </FormField>
          </FormSectionGrid>
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
            {isSaving ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </form>
    </FormSection>
  );
}
