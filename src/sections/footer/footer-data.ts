export interface FooterData {
  title: {
    text: string;
    highlightChar: string;
  };
  contact: {
    email: string;
  };
  navigation: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    company: {
      name: string;
      url: string;
    };
    designer: string;
  };
}

export const footerData: FooterData = {
  title: {
    text: "Let's Work",
    highlightChar: "'",
  },
  contact: {
    email: 'paolatoliveira@gmail.com',
  },
  navigation: [
    { href: '#about', label: 'Sobre mim' },
    { href: '#contact', label: 'Contato' },
    { href: '#projects', label: 'Projetos' },
  ],
  copyright: {
    company: {
      name: 'Kyantech Solutions',
      url: 'https://kyantech.com.br',
    },
    designer: 'Paola Oliveira',
  },
};
