'use client';

import { useEffect, useState } from 'react';

import { AtSign, Mail, MessageSquare, Save, User } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='h-6 bg-muted animate-pulse rounded' />
            <div className='h-4 bg-muted animate-pulse rounded w-2/3' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='h-10 bg-muted animate-pulse rounded' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Contact Form Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <MessageSquare className='h-5 w-5' />
            Configurações de Contato
          </CardTitle>
          <CardDescription>
            Configure o título da seção e parâmetros do formulário de contato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className='space-y-6'>
            {/* Section Title */}
            <div className='space-y-2'>
              <label htmlFor='title' className='text-sm font-medium'>
                Título da Seção
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
                placeholder='Ex: ENTRE EM CONTATO'
                required
              />
            </div>

            {/* Email Configuration */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 mb-3'>
                <Mail className='h-4 w-4' />
                <h3 className='font-medium'>Configuração de Email</h3>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='emailRecipient'
                    className='text-sm font-medium flex items-center gap-2'
                  >
                    <AtSign className='h-3 w-3' />
                    Email Destinatário
                  </label>
                  <input
                    id='emailRecipient'
                    name='emailRecipient'
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
                  <p className='text-xs text-muted-foreground'>
                    Email que receberá as mensagens do formulário
                  </p>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='emailSubjectPrefix'
                    className='text-sm font-medium'
                  >
                    Prefixo do Assunto
                  </label>
                  <input
                    id='emailSubjectPrefix'
                    name='emailSubjectPrefix'
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
                  <p className='text-xs text-muted-foreground'>
                    Texto que aparecerá no início do assunto do email
                  </p>
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='emailSenderName'
                    className='text-sm font-medium flex items-center gap-2'
                  >
                    <User className='h-3 w-3' />
                    Nome do Remetente
                  </label>
                  <input
                    id='emailSenderName'
                    name='emailSenderName'
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
                  <p className='text-xs text-muted-foreground'>
                    Nome que aparecerá como remetente
                  </p>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='emailSenderEmail'
                    className='text-sm font-medium flex items-center gap-2'
                  >
                    <Mail className='h-3 w-3' />
                    Email do Remetente
                  </label>
                  <input
                    id='emailSenderEmail'
                    name='emailSenderEmail'
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
                  <p className='text-xs text-muted-foreground'>
                    Email que aparecerá como remetente
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className='flex justify-end pt-4 border-t'>
              <Button
                type='submit'
                disabled={isSaving}
                className='min-w-[120px]'
              >
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className='h-4 w-4 mr-2' />
                    Salvar Configurações
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
