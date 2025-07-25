'use client';

import { footerData } from './footer-data';

export function FooterCopyright() {
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-sm text-muted-foreground'>
      <p>
        © {new Date().getFullYear()}{' '}
        <a
          href={footerData.copyright.company.url}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline hover:text-orange-500 transition-colors'
        >
          {footerData.copyright.company.name}
        </a>
        . Todos os direitos reservados.
      </p>
      <p>Designed By. {footerData.copyright.designer}</p>
    </div>
  );
}
