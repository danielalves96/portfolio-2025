export interface Tool {
  id: number;
  name: string;
  icon: string;
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
    },
    {
      id: 2,
      name: 'Sketch',
      icon: '/tools/sketch.svg',
    },
    {
      id: 3,
      name: 'Adobe Photoshop',
      icon: '/tools/adobe-photoshop.svg',
    },
    {
      id: 4,
      name: 'Adobe XD',
      icon: '/tools/adobe-xd.svg',
    },
    {
      id: 5,
      name: 'Adobe Creative Suite',
      icon: '/tools/adobe-icon.svg',
    },
    {
      id: 6,
      name: 'Miro',
      icon: '/tools/miro-icon.svg',
    },
    {
      id: 7,
      name: 'Notion',
      icon: '/tools/notion-icon.svg',
    },
    {
      id: 8,
      name: 'Trello',
      icon: '/tools/trello.svg',
    },
    {
      id: 9,
      name: 'Atlassian',
      icon: '/tools/atlassian.svg',
    },
  ],
};
