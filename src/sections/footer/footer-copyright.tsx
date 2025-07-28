import React from 'react';

import { getFooterData } from '@/lib/actions/data-fetching';

function parseCopyrightText(text: string) {
  const kyantechRegex = /Kyantech Solutions/g;
  const parts = text.split(kyantechRegex);

  if (parts.length === 1) {
    return <span>{text}</span>;
  }

  const elements: React.ReactElement[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i]) {
      elements.push(<span key={`text-${i}`}>{parts[i]}</span>);
    }

    if (i < parts.length - 1) {
      elements.push(
        <a
          key={`link-${i}`}
          href='https://kyantech.com.br/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-orange-500 cursor-pointer transition-colors duration-200'
        >
          Kyantech Solutions
        </a>
      );
    }
  }

  return <>{elements}</>;
}

export async function FooterCopyright() {
  const footerData = await getFooterData();

  if (!footerData) {
    return null;
  }
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground px-4'>
      <p className='text-center sm:text-left'>
        {parseCopyrightText(footerData.copyright)}
      </p>
      <p className='text-center sm:text-right'>
        Designed By. {footerData.designer}
      </p>
    </div>
  );
}
