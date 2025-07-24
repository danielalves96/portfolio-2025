import { NextRequest, NextResponse } from 'next/server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } =
      contactFormSchema.parse(body);

    const { data, error } = await resend.emails.send({
      from: 'Contato Portfolio <onboarding@resend.dev>',
      to: ['daniel.madeireira@gmail.com'], // Email que receberá as mensagens
      subject: `Contato do site: ${subject}`,
      replyTo: email,
      html: `
        <h1>Nova mensagem de contato</h1>
        <p><strong>Nome:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
        { error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Mensagem enviada com sucesso!', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
