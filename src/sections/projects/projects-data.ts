export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  category: string[];
  year: string;
  whatIAccomplished: string;
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
      whatIAccomplished:
        'Desenvolvi uma identidade visual completa com sistema de cores harmônico, tipografia elegante e layout responsivo. Implementei animações suaves e transições que melhoram a experiência do usuário, além de otimizar a performance para carregamento rápido em todos os dispositivos.',
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
      whatIAccomplished:
        'Criei uma experiência bancária intuitiva focada na segurança e usabilidade. Desenvolvi fluxos de navegação simplificados, implementei um sistema de iconografia consistente e apliquei princípios de design inclusivo para tornar o app acessível a diferentes perfis de usuários.',
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
      whatIAccomplished:
        'Projetei uma solução multiplataforma que mantém consistência visual entre web e mobile. Desenvolvi um sistema de personalização flexível que permite aos usuários criar páginas únicas, com foco na simplicidade de uso e na otimização para conversão de clicks.',
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
      whatIAccomplished:
        'Criei uma identidade visual que captura o espírito do surf com paleta de cores oceânicas e elementos gráficos fluidos. Desenvolvi um fluxo de compra otimizado e implementei recursos de busca avançada que facilitam a descoberta de produtos específicos para cada modalidade do surf.',
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
      whatIAccomplished:
        'Desenvolvi uma presença digital profissional que transmite confiança e credibilidade no setor de transporte. Criei seções estratégicas que destacam os diferenciais da empresa, implementei call-to-actions eficazes e otimizei o site para SEO e conversão de leads.',
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
      whatIAccomplished:
        'Projetei uma interface complexa de dashboard focada na experiência do usuário corporativo. Desenvolvi um sistema de design consistente para múltiplos módulos, implementei hierarquia visual clara para dados complexos e criei fluxos intuitivos que reduzem a curva de aprendizado da plataforma.',
      figmaMobile: '',
      figmaDesktop: '',
      dribbbleUrl: '',
      behanceUrl: 'https://www.behance.net/gallery/226070039/AIR-EOS-SUITE',
    },
  ],
};
