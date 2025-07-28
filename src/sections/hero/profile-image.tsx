'use client';

import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt: string;
  name: string;
}

export function ProfileImage({ src, alt, name }: ProfileImageProps) {
  return (
    <div className='relative'>
      {/* Decorative background shapes */}
      <div className='absolute -inset-8 bg-gradient-to-br from-orange-200/50 via-orange-300/40 to-orange-400/30 dark:from-orange-500/20 dark:via-orange-600/15 dark:to-orange-700/10 rounded-full blur-2xl' />
      <div className='absolute -inset-4 bg-gradient-to-tr from-orange-300/30 to-orange-400/20 dark:from-orange-400/10 dark:to-orange-500/8 rounded-full' />

      {/* Profile image */}
      <div className='relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 shadow-2xl'>
        <Image
          src={src}
          alt={alt}
          fill
          className='object-cover'
          style={{ transform: 'scale(1.1)' }}
          priority
        />
      </div>

      {/* Name badge */}
      <div className='absolute -top-2 -right-4'>
        <div className='bg-orange-500 px-4 py-2 rounded-full shadow-lg'>
          <span className='text-white font-semibold text-sm'>{name}</span>
        </div>
      </div>
    </div>
  );
}
