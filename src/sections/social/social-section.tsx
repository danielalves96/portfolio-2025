'use client';

import { useState } from 'react';

import { socialNetworks } from './social-data';
import { SocialItem } from './social-item';

export function SocialSection() {
  const [hoveredNetwork, setHoveredNetwork] = useState<string | null>(null);

  return (
    <section className='w-full flex justify-center pt-16 relative'>
      <div className='w-lg text-5xl font-semibold'>
        {socialNetworks.map(network => (
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
