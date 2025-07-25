'use client';

import Link from 'next/link';

import { footerData } from './footer-data';

export function FooterNavigation() {
  return (
    <nav className='flex justify-center items-center gap-6 text-sm'>
      {footerData.navigation.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className='text-orange-500 hover:text-orange-500/80 underline underline-offset-4 transition-colors'
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
