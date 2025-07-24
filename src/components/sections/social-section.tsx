'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Dot } from 'lucide-react';
import { BsLinkedin } from 'react-icons/bs';
import { FaBehanceSquare, FaDribbbleSquare } from 'react-icons/fa';

interface SocialNetwork {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialNetworks: SocialNetwork[] = [
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

export function SocialSection() {
  const [hoveredNetwork, setHoveredNetwork] = useState<string | null>(null);

  const renderCarousel = (network: SocialNetwork) => {
    const duplicatedNetworks = Array(20).fill(network);
    return (
      <Link href={network.url} target='_blank' rel='noopener noreferrer'>
        <div className='absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 bg-card z-50 overflow-hidden flex items-center justify-center border'>
          <div className='flex animate-scroll-infinite whitespace-nowrap'>
            {duplicatedNetworks.map((network, index) => (
              <div key={index} className='flex items-center'>
                {network.icon}
                <span className='mr-8 ml-2 text-5xl text-muted-foreground'>
                  {network.name}
                </span>
                <Dot size={50} className='text-muted-foreground mr-8' />
              </div>
            ))}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className='w-full flex justify-center pt-16 relative'>
      <div className='w-lg text-5xl font-semibold'>
        {socialNetworks.map(network => (
          <div
            key={network.name}
            className='border p-6 text-center transition-all duration-300 cursor-pointer relative'
            onMouseEnter={() => setHoveredNetwork(network.name)}
            onMouseLeave={() => setHoveredNetwork(null)}
          >
            <span className='text-muted-foreground'>{network.name}</span>
            {hoveredNetwork === network.name && renderCarousel(network)}
          </div>
        ))}
      </div>
    </section>
  );
}
