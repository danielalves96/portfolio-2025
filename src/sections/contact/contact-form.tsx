'use client';

import { useState } from 'react';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { type ContactFormData, sendEmail } from '@/lib/actions/send-email';

import { contactSchema } from './contact-validation';

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: string) => void;
}

export function ContactForm({
  onSubmitSuccess,
  onSubmitError,
}: ContactFormProps) {
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
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus('idle');

    try {
      const validatedData = contactSchema.parse(formData);
      const result = await sendEmail(validatedData);

      if (!result.success) {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        }
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setSubmitStatus('success');
      onSubmitSuccess?.();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
      onSubmitError?.(
        error instanceof Error ? error.message : 'Erro desconhecido'
      );

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
    <form onSubmit={handleSubmit} className='space-y-6 sm:space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
        <div className='space-y-2 sm:space-y-3'>
          <Label
            htmlFor='fullName'
            className='text-foreground/80 text-xs sm:text-sm font-medium uppercase tracking-wider'
          >
            NOME COMPLETO{' '}
            <span className='text-red-500 text-xl sm:text-2xl'>*</span>
          </Label>
          <Input
            id='fullName'
            type='text'
            value={formData.fullName}
            onChange={e => handleInputChange('fullName', e.target.value)}
            className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-1 sm:px-2 py-2 sm:py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg'
            required
          />
          {errors.fullName && (
            <p className='text-red-500 text-sm'>{errors.fullName}</p>
          )}
        </div>

        <div className='space-y-2 sm:space-y-3'>
          <Label
            htmlFor='email'
            className='text-foreground/80 text-xs sm:text-sm font-medium uppercase tracking-wider'
          >
            EMAIL <span className='text-red-500 text-xl sm:text-2xl'>*</span>
          </Label>
          <Input
            id='email'
            type='email'
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-1 sm:px-2 py-2 sm:py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg'
            required
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}
        </div>

        <div className='space-y-2 sm:space-y-3'>
          <Label
            htmlFor='phone'
            className='text-foreground/80 text-xs sm:text-sm font-medium uppercase tracking-wider'
          >
            TELEFONE (OPCIONAL){' '}
            <span className='text-transparent text-xl sm:text-2xl'>*</span>
          </Label>
          <Input
            id='phone'
            type='tel'
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-1 sm:px-2 py-2 sm:py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg'
          />
          {errors.phone && (
            <p className='text-red-500 text-sm'>{errors.phone}</p>
          )}
        </div>

        <div className='space-y-2 sm:space-y-3'>
          <Label
            htmlFor='subject'
            className='text-foreground/80 text-xs sm:text-sm font-medium uppercase tracking-wider'
          >
            ASSUNTO <span className='text-red-500 text-xl sm:text-2xl'>*</span>
          </Label>
          <Input
            id='subject'
            type='text'
            value={formData.subject}
            onChange={e => handleInputChange('subject', e.target.value)}
            className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-1 sm:px-2 py-2 sm:py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg'
            required
          />
          {errors.subject && (
            <p className='text-red-500 text-sm'>{errors.subject}</p>
          )}
        </div>
      </div>

      <div className='space-y-2 sm:space-y-3'>
        <Label
          htmlFor='message'
          className='text-foreground/80 text-xs sm:text-sm font-medium uppercase tracking-wider'
        >
          MENSAGEM <span className='text-red-500 text-xl sm:text-2xl'>*</span>
        </Label>
        <Textarea
          id='message'
          rows={4}
          value={formData.message}
          onChange={e => handleInputChange('message', e.target.value)}
          className='bg-transparent border-0 border-b-2 border-foreground/30 rounded-none px-1 sm:px-2 py-2 sm:py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg'
          required
        />
        {errors.message && (
          <p className='text-red-500 text-sm'>{errors.message}</p>
        )}
      </div>

      <div className='text-center pt-6 sm:pt-8 space-y-3 sm:space-y-4'>
        {submitStatus === 'success' && (
          <div className='bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg'>
            Mensagem enviada com sucesso! Assim que possível entrarei em
            contato.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className='bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg'>
            Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente
            mais tarde.
          </div>
        )}

        <Button
          type='submit'
          disabled={isSubmitting}
          className='bg-orange-500 hover:bg-orange-500/90 text-white px-6 sm:px-8 py-2 sm:py-3 font-semibold transition-colors text-base sm:text-lg rounded-full p-4 sm:p-6'
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </div>
    </form>
  );
}
