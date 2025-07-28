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
    recipient: 'paolatoliveira@gmail.com',
    sender: {
      name: 'Contato Portfolio',
      email: 'noreply@paolauiux.com.br',
    },
    subject: {
      prefix: 'Contato do site',
    },
  },
};
