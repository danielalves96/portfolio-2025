import { BsLinkedin } from 'react-icons/bs';
import { FaBehanceSquare, FaDribbbleSquare } from 'react-icons/fa';

export interface SocialNetwork {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export const socialNetworks: SocialNetwork[] = [
  {
    name: 'Behance',
    url: 'https://www.behance.net/l0la0liveira',
    icon: <FaBehanceSquare size={50} className='text-orange-500' />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/paola-tavares-de-oliveira-83823ba1/',
    icon: <BsLinkedin size={44} className='text-orange-500' />,
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/l0la0liveira',
    icon: <FaDribbbleSquare size={50} className='text-orange-500' />,
  },
];
