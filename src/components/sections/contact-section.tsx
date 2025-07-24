'use client';

import { useState } from 'react';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Textarea } from '../ui/textarea';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus('idle');

    try {
      const validatedData = contactSchema.parse(formData);
      console.log('Form submitted:', validatedData);

      // Enviar para a API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      // Limpar formulário após envio bem-sucedido
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');

      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='py-26 flex items-center justify-center p-4 relative overflow-hidden'>
      <div className='w-full max-w-7xl relative z-10 overflow-hidden'>
        <div className='dark:bg-foreground/5 backdrop-blur-sm rounded-3xl border border-primary dark:border-amber-600/20 p-8 md:p-12 relative'>
          <div className='absolute inset-0 -z-10'>
            <div className='absolute -top-20 -left-24 w-[30rem] h-[30rem] bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[100px]' />
            <div className='absolute -top-24 -right-24 w-[20rem] h-[20rem] bg-orange-500/15 dark:bg-orange-500/8 rounded-full blur-[100px]' />
            <div className='absolute top-1/2 -left-28 w-[20rem] h-[20rem] bg-orange-500/18 dark:bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2' />
            <div className='absolute bottom-1/4 -right-20 w-[22rem] h-[22rem] bg-orange-500/15 dark:bg-orange-500/8 rounded-full blur-[100px]' />
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[16rem] h-[16rem] bg-orange-500/12 dark:bg-orange-500/6 rounded-full blur-[120px]' />
          </div>

          <h1 className='text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-center mb-12'>
            Entre em contato comigo!
          </h1>

          <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='space-y-3'>
                <Label
                  htmlFor='fullName'
                  className='text-foreground/80 text-sm font-medium uppercase tracking-wider'
                >
                  NOME COMPLETO <span className='text-red-500 text-2xl'>*</span>
                </Label>
                <Input
                  id='fullName'
                  type='text'
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-2 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg'
                  required
                />
                {errors.fullName && (
                  <p className='text-red-500 text-sm'>{errors.fullName}</p>
                )}
              </div>

              <div className='space-y-3'>
                <Label
                  htmlFor='email'
                  className='text-foreground/80 text-sm font-medium uppercase tracking-wider'
                >
                  EMAIL <span className='text-red-500 text-2xl'>*</span>
                </Label>
                <Input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-2 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg'
                  required
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>

              <div className='space-y-3'>
                <Label
                  htmlFor='phone'
                  className='text-foreground/80 text-sm font-medium uppercase tracking-wider'
                >
                  TELEFONE (OPCIONAL){' '}
                  <span className='text-transparent text-2xl'>*</span>
                </Label>
                <Input
                  id='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-2 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg'
                />
                {errors.phone && (
                  <p className='text-red-500 text-sm'>{errors.phone}</p>
                )}
              </div>

              <div className='space-y-3'>
                <Label
                  htmlFor='subject'
                  className='text-foreground/80 text-sm font-medium uppercase tracking-wider'
                >
                  ASSUNTO <span className='text-red-500 text-2xl'>*</span>
                </Label>
                <Input
                  id='subject'
                  type='text'
                  value={formData.subject}
                  onChange={e => handleInputChange('subject', e.target.value)}
                  className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-2 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg'
                  required
                />
                {errors.subject && (
                  <p className='text-red-500 text-sm'>{errors.subject}</p>
                )}
              </div>
            </div>

            <div className='space-y-3'>
              <Label
                htmlFor='message'
                className='text-foreground/80 text-sm font-medium uppercase tracking-wider'
              >
                MENSAGEM <span className='text-red-500 text-2xl'>*</span>
              </Label>
              <Textarea
                id='message'
                rows={4}
                value={formData.message}
                onChange={e => handleInputChange('message', e.target.value)}
                className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-2 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg'
                required
              />
              {errors.message && (
                <p className='text-red-500 text-sm'>{errors.message}</p>
              )}
            </div>

            <div className='text-center pt-8 space-y-4'>
              {submitStatus === 'success' && (
                <div className='bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg'>
                  Mensagem enviada com sucesso! Assim que possível entrarei em
                  contato.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className='bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg'>
                  Ocorreu um erro ao enviar sua mensagem. Por favor, tente
                  novamente mais tarde.
                </div>
              )}

              <Button
                type='submit'
                disabled={isSubmitting}
                className='bg-orange-500 hover:bg-orange-500/90 text-white px-8 py-3 font-semibold transition-colors text-lg rounded-full p-6'
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
