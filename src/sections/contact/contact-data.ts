export interface ContactData {
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

export const contactData: ContactData = {
  title: 'Entre em contato comigo!',
  email: {
    recipient: 'daniel.madeireira@gmail.com',
    sender: {
      name: 'Contato Portfolio',
      email: 'onboarding@resend.dev',
    },
    subject: {
      prefix: 'Contato do site',
    },
  },
};
