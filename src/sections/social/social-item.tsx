'use client';

import Link from 'next/link';

import { Dot } from 'lucide-react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import * as DiIcons from 'react-icons/di';
import * as ReactIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';

const allIcons = {
  ...ReactIcons,
  ...AiIcons,
  ...BiIcons,
  ...BsIcons,
  ...CgIcons,
  ...DiIcons,
  ...FiIcons,
  ...GoIcons,
  ...GrIcons,
  ...HiIcons,
  ...ImIcons,
  ...IoIcons,
  ...Io5Icons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
  ...TbIcons,
  ...TiIcons,
  ...VscIcons,
};

const renderIcon = (iconName: string, className = 'h-12 w-12') => {
  const IconComponent = (allIcons as any)[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

interface SocialNetwork {
  name: string;
  description: string;
  image: string;
  url: string;
}

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
                <div className='text-3xl sm:text-4xl lg:text-5xl text-orange-500 mr-4 sm:mr-6 lg:mr-8'>
                  {renderIcon(
                    network.image,
                    'h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12'
                  )}
                </div>
                <span className='mr-4 sm:mr-6 lg:mr-8 ml-1 sm:ml-2 text-3xl sm:text-4xl lg:text-5xl text-muted-foreground'>
                  {network.name}
                </span>
                <Dot
                  size={40}
                  className='text-muted-foreground mr-4 sm:mr-6 lg:mr-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14'
                />
              </div>
            ))}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div
      className='border p-4 sm:p-5 lg:p-6 text-center transition-all duration-300 cursor-pointer relative'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className='text-muted-foreground'>{network.name}</span>
      {isHovered && renderCarousel()}
    </div>
  );
}
