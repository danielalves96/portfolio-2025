import { BsLinkedin } from 'react-icons/bs';
import { FaBehance, FaDribbble } from 'react-icons/fa';

export interface HeroData {
  title: {
    line1: string;
    line2: string;
  };
  profile: {
    src: string;
    alt: string;
    name: string;
  };
  quote: {
    text: string[];
  };
  socialLinks: Array<{
    href: string;
    icon: React.ReactNode;
    label: string;
  }>;
}

export const heroData: HeroData = {
  title: {
    line1: 'UI UX',
    line2: 'DESIGNER',
  },
  profile: {
    src: '/headshot/me.jpeg',
    alt: 'Paola Oliveira',
    name: 'Paola Oliveira',
  },
  quote: {
    text: ['GRANDES DESIGNS', 'REQUEREM', 'GRANDE EMPATIA'],
  },
  socialLinks: [
    {
      href: 'https://www.behance.net/l0la0liveira',
      icon: <FaBehance className='w-5 h-5 text-white' />,
      label: 'Behance',
    },
    {
      href: 'https://www.linkedin.com/in/paola-tavares-de-oliveira-83823ba1/',
      icon: <BsLinkedin className='w-5 h-5 text-white' />,
      label: 'LinkedIn',
    },
    {
      href: 'https://dribbble.com/l0la0liveira',
      icon: <FaDribbble className='w-5 h-5 text-white' />,
      label: 'Dribbble',
    },
  ],
};
