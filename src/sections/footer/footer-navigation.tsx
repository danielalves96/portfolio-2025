import Link from 'next/link';

import { getFooterData } from '@/lib/actions/data-fetching';

export async function FooterNavigation() {
  const footerData = await getFooterData();

  if (!footerData) {
    return null;
  }
  return (
    <nav className='flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm px-4'>
      {footerData.navigation.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className='text-orange-500 hover:text-orange-500/80 underline underline-offset-4 transition-colors text-center'
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
