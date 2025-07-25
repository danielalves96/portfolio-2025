'use client';

import Link from 'next/link';

import { Dot } from 'lucide-react';

import { SocialNetwork } from './social-data';

interface SocialItemProps {
  network: SocialNetwork;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function SocialItem({
  network,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: SocialItemProps) {
  const renderCarousel = () => {
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
    <div
      className='border p-6 text-center transition-all duration-300 cursor-pointer relative'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className='text-muted-foreground'>{network.name}</span>
      {isHovered && renderCarousel()}
    </div>
  );
}
