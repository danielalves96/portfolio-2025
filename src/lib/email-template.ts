export interface EmailTemplateData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function generateEmailTemplate(data: EmailTemplateData): string {
  const { fullName, email, phone, subject, message } = data;

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Nova mensagem de contato</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; width: 100%; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #f97316; padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Nova Mensagem de Contato</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; font-size: 16px; color: #666;">Você recebeu uma nova mensagem através do formulário de contato do seu portfólio:</p>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                        <strong style="color: #333; font-size: 14px;">Nome:</strong><br>
                        <span style="color: #666; font-size: 16px;">${fullName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                        <strong style="color: #333; font-size: 14px;">E-mail:</strong><br>
                        <a href="mailto:${email}" style="color: #f97316; text-decoration: none; font-size: 16px;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                        <strong style="color: #333; font-size: 14px;">Telefone:</strong><br>
                        <span style="color: #666; font-size: 16px;">${phone || 'Não informado'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                        <strong style="color: #333; font-size: 14px;">Assunto:</strong><br>
                        <span style="color: #666; font-size: 16px;">${subject}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <strong style="color: #333; font-size: 14px;">Mensagem:</strong><br>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 8px; border-left: 4px solid #f97316;">
                          <span style="color: #555; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</span>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px; text-align: center;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                      Para responder esta mensagem, utilize o e-mail: <strong style="color: #f97316;">${email}</strong>
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                  <p style="margin: 0; color: #999; font-size: 12px;">
                    Este e-mail foi enviado automaticamente pelo sistema de contato do portfólio.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
