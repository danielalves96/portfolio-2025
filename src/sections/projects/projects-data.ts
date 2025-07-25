export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  category: string[];
  year: string;
  figmaMobile: string;
  figmaDesktop: string;
  dribbbleUrl: string;
  behanceUrl: string;
}

export interface ProjectsData {
  title: string;
  projects: Project[];
}

export const projectsData: ProjectsData = {
  title: 'PROJETOS',
  projects: [
    {
      id: 1,
      title: 'Portfólio - Paola Oliveira',
      description:
        'Portfólio pessoal desenvolvido em Next.js com design moderno e responsivo.',
      image: '/projects/portifolio.jpg',
      tag: ['Todos', 'Web'],
      category: ['Portfólio'],
      year: '2024',
      figmaMobile: '',
      figmaDesktop:
        'https://www.figma.com/proto/cYNfOzFT4yh8SIghSjhPYP/Transportadora-Valentini?type=design&node-id=2-6&t=hc7NqgVkMJX5RFzf-1&scaling=scale-down&page-id=0%3A1',
      dribbbleUrl:
        'https://dribbble.com/shots/23417910-Website-Institucional-Valentini-877',
      behanceUrl:
        'https://www.behance.net/gallery/188670707/Website-Institucional-Valentini-877',
    },
    {
      id: 2,
      title: 'SHEBANK - Bank App',
      description:
        'Aplicativo bancário com interface moderna e funcionalidades completas.',
      image: '/projects/bank_app.jpg',
      tag: ['Todos', 'Mobile'],
      category: ['Mobile App'],
      year: '2024',
      figmaMobile:
        'https://www.figma.com/proto/hiBzC0BNogPSYVEtjacp1w/Projeto-Wave?embed_host=share&kind=proto&node-id=9-444&page-id=1%3A4&scaling=scale-down&starting-point-node-id=9%3A15&t=j6nggM13OYT9EbYo-1&type=design&viewport=280%2C427%2C0.48',
      figmaDesktop: '',
      dribbbleUrl: 'https://dribbble.com/shots/23383600-SHEBANK-Bank-App',
      behanceUrl: 'https://www.behance.net/gallery/188233413/SHEBANK-Bank-App',
    },
    {
      id: 3,
      title: 'Link In Bio - Web & Mobile',
      description: 'App para cadastrar links.',
      image: '/projects/linkApp.jpg',
      tag: ['Todos', 'Web', 'Mobile'],
      category: ['Web App', 'Mobile App'],
      year: '2024',
      figmaMobile:
        'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FozhyV3IXT4wcfcUXrKsJok%2FLink-In-Bio-App-e-Desktop%3Fpage-id%3D0%253A1%26type%3Ddesign%26node-id%3D3-887%26viewport%3D954%252C202%252C0.25%26t%3D4GRnwDw4NYnj7lfg-1%26scaling%3Dscale-down%26mode%3Ddesign',
      figmaDesktop:
        'https://www.figma.com/proto/ozhyV3IXT4wcfcUXrKsJok/Link-In-Bio-App-e-Desktop?embed_host=share&kind=proto&node-id=8-642&page-id=8%3A638&scaling=scale-down&t=2Z5BL9tbIzdZ6XND-1&type=design&viewport=866%2C564%2C0.43',
      dribbbleUrl:
        'https://dribbble.com/shots/23389012-Link-in-Bio-Mobile-Web-APP',
      behanceUrl:
        'https://www.behance.net/gallery/188308869/Link-in-Bio-Mobile-Web-APP',
    },
    {
      id: 4,
      title: 'WAVE - SURF STORE APP',
      description: 'Projeto de aplicativo de e-commerce para surfistas.',
      image: '/projects/surf.png',
      tag: ['Todos', 'Mobile'],
      category: ['E-commerce', 'Mobile App'],
      year: '2025',
      figmaMobile:
        'https://www.figma.com/proto/hiBzC0BNogPSYVEtjacp1w/Projeto-Wave?embed_host=share&kind=proto&node-id=9-444&page-id=1%3A4&scaling=scale-down&starting-point-node-id=9%3A15&t=j6nggM13OYT9EbYo-1&type=design&viewport=280%2C427%2C0.48',
      figmaDesktop: '',
      dribbbleUrl:
        'https://dribbble.com/shots/23416864-WAVE-Mockups-Surf-Store-APP',
      behanceUrl:
        'https://www.behance.net/gallery/188661609/WAVE-Mockups-%28Surf-Store-APP%29',
    },
    {
      id: 5,
      title: 'Website Institucional | Valentini 877',
      description: 'Landing page para uma transportadora.',
      image: '/projects/valentini.png',
      tag: ['Todos', 'Web'],
      category: ['Landing Page', 'Web'],
      year: '2025',
      figmaMobile: '',
      figmaDesktop:
        'https://www.figma.com/proto/cYNfOzFT4yh8SIghSjhPYP/Transportadora-Valentini?type=design&node-id=2-6&t=hc7NqgVkMJX5RFzf-1&scaling=scale-down&page-id=0%3A1',
      dribbbleUrl:
        'https://dribbble.com/shots/23417910-Website-Institucional-Valentini-877?utm_source=Clipboard_Shot&utm_campaign=l0la0liveira&utm_content=Website%20Institucional%20%7C%20Valentini%20877&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=l0la0liveira&utm_content=Website%20Institucional%20%7C%20Valentini%20877&utm_medium=Social_Share',
      behanceUrl:
        'https://www.behance.net/gallery/188670707/Website-Institucional-Valentini-877',
    },
    {
      id: 6,
      title: 'EOS Suite - Air',
      description: 'Design de plataforma de suite de aplicativos.',
      image: '/projects/EOS.png',
      tag: ['Todos', 'Web'],
      category: ['Dashboard', 'Web App'],
      year: '2025',
      figmaMobile: '',
      figmaDesktop: '',
      dribbbleUrl: '',
      behanceUrl: 'https://www.behance.net/gallery/226070039/AIR-EOS-SUITE',
    },
  ],
};
