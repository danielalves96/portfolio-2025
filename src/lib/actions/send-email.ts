'use server';

import { Resend } from 'resend';
import { z } from 'zod';

import { generateEmailTemplate } from '@/lib/email-template';
import { contactData } from '@/sections/contact/contact-data';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendEmail(data: ContactFormData) {
  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      error: 'Configuração de email não encontrada.',
    };
  }

  try {
    const validatedData = contactFormSchema.parse(data);
    const { fullName, email, phone, subject, message } = validatedData;

    const { data: emailData, error } = await resend.emails.send({
      from: `${contactData.email.sender.name} <${contactData.email.sender.email}>`,
      to: [contactData.email.recipient],
      subject: `${contactData.email.subject.prefix}: ${subject}`,
      replyTo: email,
      text: `Nome: ${fullName}\nEmail: ${email}\nTelefone: ${phone || 'Não informado'}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
      html: generateEmailTemplate({
        fullName,
        email,
        phone,
        subject,
        message,
      }),
    });

    if (error) {
      return {
        success: false,
        error: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      };
    }

    return {
      success: true,
      message: 'Mensagem enviada com sucesso!',
      id: emailData?.id,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Dados inválidos',
        fieldErrors: error.issues.reduce(
          (acc, issue) => {
            if (issue.path[0]) {
              acc[issue.path[0] as keyof ContactFormData] = issue.message;
            }
            return acc;
          },
          {} as Partial<Record<keyof ContactFormData, string>>
        ),
      };
    }

    return {
      success: false,
      error: 'Erro interno do servidor',
    };
  }
}
