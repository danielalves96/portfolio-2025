'use client';

import { useState } from 'react';

import { SocialItem } from './social-item';

interface SocialNetwork {
  name: string;
  description: string;
  image: string;
  url: string;
}

interface SocialClientProps {
  socialItems: SocialNetwork[];
}

export function SocialClient({ socialItems }: SocialClientProps) {
  const [hoveredNetwork, setHoveredNetwork] = useState<string | null>(null);

  return (
    <section className='w-full flex justify-center pt-16 relative'>
      <div className='w-lg text-5xl font-semibold'>
        {socialItems.map(network => (
          <SocialItem
            key={network.name}
            network={network}
            isHovered={hoveredNetwork === network.name}
            onMouseEnter={() => setHoveredNetwork(network.name)}
            onMouseLeave={() => setHoveredNetwork(null)}
          />
        ))}
      </div>
    </section>
  );
}
