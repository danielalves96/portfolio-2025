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

import { getSocialLinks } from '@/lib/actions/data-fetching';

interface SocialLinksProps {
  className?: string;
}

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

const renderIcon = (iconName: string) => {
  const IconComponent = (allIcons as any)[iconName];
  return IconComponent ? (
    <IconComponent className='w-5 h-5 text-white' />
  ) : null;
};

export async function SocialLinks({ className = '' }: SocialLinksProps) {
  const socialLinks = await getSocialLinks();

  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map(link => (
        <a
          key={link.id}
          href={link.href}
          target='_blank'
          rel='noopener noreferrer'
          className='w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors'
          aria-label={link.label}
        >
          {renderIcon(link.iconName) || (
            <span className='text-white text-xs'>
              {link.iconName.slice(0, 2)}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
