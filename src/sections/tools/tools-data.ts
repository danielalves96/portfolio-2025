export interface Tool {
  id: number;
  name: string;
  icon: string;
  iconComponent?: string;
}

export interface ToolsData {
  title: string;
  description: string;
  tools: Tool[];
}

export const toolsData: ToolsData = {
  title: 'FERRAMENTAS',
  description:
    'Algumas das ferramentas que utilizo no dia a dia para entregar soluções de design inovadoras e eficientes.',
  tools: [
    {
      id: 1,
      name: 'Figma',
      icon: '/tools/figma.svg',
      iconComponent: 'SiFigma',
    },
    {
      id: 2,
      name: 'Sketch',
      icon: '/tools/sketch.svg',
      iconComponent: 'SiSketch',
    },
    {
      id: 3,
      name: 'Adobe Photoshop',
      icon: '/tools/adobe-photoshop.svg',
      iconComponent: 'SiAdobephotoshop',
    },
    {
      id: 4,
      name: 'Adobe XD',
      icon: '/tools/adobe-xd.svg',
      iconComponent: 'SiAdobexd',
    },
    {
      id: 5,
      name: 'Adobe Creative Suite',
      icon: '/tools/adobe-icon.svg',
      iconComponent: 'SiAdobe',
    },
    {
      id: 6,
      name: 'Miro',
      icon: '/tools/miro-icon.svg',
      iconComponent: 'SiMiro',
    },
    {
      id: 7,
      name: 'Notion',
      icon: '/tools/notion-icon.svg',
      iconComponent: 'SiNotion',
    },
    {
      id: 8,
      name: 'Trello',
      icon: '/tools/trello.svg',
      iconComponent: 'SiTrello',
    },
    {
      id: 9,
      name: 'Atlassian',
      icon: '/tools/atlassian.svg',
      iconComponent: 'SiAtlassian',
    },
  ],
};
