'use client';

import { useState } from 'react';

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

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

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

const POPULAR_ICONS = [
  'FaInstagram',
  'FaLinkedin',
  'FaTwitter',
  'FaFacebook',
  'FaYoutube',
  'FaTwitch',
  'FaGithub',
  'FaGlobe',
  'FaEnvelope',
  'FaPhone',
  'FaMapMarkerAlt',
  'FaCalendar',
  'FaUser',
  'FaUsers',
  'FaHome',
  'FaCog',
  'FaSearch',
  'FaHeart',
  'FaStar',
  'FaShare',
  'FaDownload',
  'FaUpload',
  'FaPlay',
  'FaPause',
  'BsInstagram',
  'BsLinkedin',
  'BsTwitter',
  'BsFacebook',
  'BsYoutube',
  'BsTwitch',
  'BsGithub',
  'SiBehance',
  'SiDribbble',
  'SiDiscord',
  'SiTelegram',
  'SiWhatsapp',
];

interface IconSelectorProps {
  value?: string;
  onChange: (iconName: string) => void;
  children?: React.ReactNode;
}

export function IconSelector({ value, onChange, children }: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(value || '');

  const allIconNames = Object.keys(allIcons).filter(
    name => typeof (allIcons as any)[name] === 'function'
  );

  const filteredIcons = search
    ? allIconNames.filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : POPULAR_ICONS.filter(name => allIconNames.includes(name));

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    onChange(iconName);
    setIsOpen(false);
    setSearch('');
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (allIcons as any)[iconName];
    return IconComponent ? <IconComponent className='h-5 w-5' /> : null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant='outline' type='button'>
            {selectedIcon ? (
              <div className='flex items-center gap-2'>
                {renderIcon(selectedIcon)}
                <span>{selectedIcon}</span>
              </div>
            ) : (
              'Selecionar Ícone'
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-hidden'>
        <DialogHeader>
          <DialogTitle>Selecionar Ícone</DialogTitle>
          <DialogDescription>
            Escolha um ícone da biblioteca React Icons
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <Input
            placeholder='Buscar ícone... (ex: instagram, github, linkedin)'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className='grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto'>
            {filteredIcons.slice(0, 100).map(iconName => (
              <Button
                key={iconName}
                variant={selectedIcon === iconName ? 'default' : 'outline'}
                className='h-16 flex flex-col items-center justify-center gap-1'
                onClick={() => handleIconSelect(iconName)}
                type='button'
              >
                {renderIcon(iconName)}
                <span className='text-xs truncate w-full'>{iconName}</span>
              </Button>
            ))}
          </div>

          {filteredIcons.length === 0 && (
            <div className='text-center py-8 text-muted-foreground'>
              Nenhum ícone encontrado para "{search}"
            </div>
          )}

          {search === '' && (
            <p className='text-xs text-muted-foreground text-center'>
              Mostrando ícones populares. Use a busca para encontrar mais
              ícones.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
