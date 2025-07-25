export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ServicesData {
  title: string;
  services: Service[];
}

export const servicesData: ServicesData = {
  title: 'SERVIÇOS',
  services: [
    {
      id: 1,
      title: 'Prototipagem e Wireframing',
      description:
        'Estruturação e prototipagem de interfaces digitais. Criação de wireframes detalhados e protótipos interativos para validar conceitos e fluxos de usuário antes do desenvolvimento final.',
      image: '/skills/ui.jpg',
    },
    {
      id: 2,
      title: 'Design System',
      description:
        'Criação de sistemas de design escaláveis e consistentes. Desenvolvimento de bibliotecas de componentes, tokens de design, guias de estilo e documentação para garantir coerência visual em todos os produtos.',
      image: '/skills/design-system.jpg',
    },
    {
      id: 3,
      title: 'Design UI/UX',
      description:
        'Ideação tornada tangível. Construo protótipos interativos para testar, refinar e aperfeiçoar fluxos de usuário antes do desenvolvimento começar.',
      image: '/skills/ui-ux.jpg',
    },
    {
      id: 4,
      title: 'Design Web',
      description:
        'Criação de interfaces web modernas e responsivas, focando na experiência do usuário e na conversão. Desenvolvimento de layouts que combinam estética e funcionalidade para maximizar o engajamento.',
      image: '/skills/web-design.jpg',
    },
    {
      id: 5,
      title: 'Design Mobile',
      description:
        'Especialização em interfaces para dispositivos móveis. Criação de experiências otimizadas para smartphones e tablets, considerando gestos touch, limitações de tela e padrões de uso mobile.',
      image: '/skills/mobile-design.png',
    },
    {
      id: 6,
      title: 'UX Writing',
      description:
        'Criação de textos estratégicos para interfaces digitais. Desenvolvimento de microtextos, mensagens de erro, CTAs e conteúdo que guiam o usuário de forma clara e eficiente através da jornada digital.',
      image: '/skills/writing.png',
    },
  ],
};
