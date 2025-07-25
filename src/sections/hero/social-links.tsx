'use client';

import { heroData } from './hero-data';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {heroData.socialLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          target='_blank'
          rel='noopener noreferrer'
          className='w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors'
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
