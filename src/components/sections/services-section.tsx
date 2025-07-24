'use client';

import { useState } from 'react';

import Image from 'next/image';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Prototipagem e Wireframing',
    description:
      'Estruturação e prototipagem de interfaces digitais. Criação de wireframes detalhados e protótipos interativos para validar conceitos e fluxos de usuário antes do desenvolvimento final.',
    image: '/skills/ui.jpg',
  },
  {
    id: 2,
    title: 'Design System',
    description:
      'Criação de sistemas de design escaláveis e consistentes. Desenvolvimento de bibliotecas de componentes, tokens de design, guias de estilo e documentação para garantir coerência visual em todos os produtos.',
    image: '/skills/design-system.jpg',
  },
  {
    id: 3,
    title: 'Design UI/UX',
    description:
      'Ideação tornada tangível. Construo protótipos interativos para testar, refinar e aperfeiçoar fluxos de usuário antes do desenvolvimento começar.',
    image: '/skills/ui-ux.jpg',
  },
  {
    id: 4,
    title: 'Design Web',
    description:
      'Criação de interfaces web modernas e responsivas, focando na experiência do usuário e na conversão. Desenvolvimento de layouts que combinam estética e funcionalidade para maximizar o engajamento.',
    image: '/skills/web-design.jpg',
  },
  {
    id: 5,
    title: 'Design Mobile',
    description:
      'Especialização em interfaces para dispositivos móveis. Criação de experiências otimizadas para smartphones e tablets, considerando gestos touch, limitações de tela e padrões de uso mobile.',
    image: '/skills/mobile-design.png',
  },
  {
    id: 6,
    title: 'UX Writing',
    description:
      'Criação de textos estratégicos para interfaces digitais. Desenvolvimento de microtextos, mensagens de erro, CTAs e conteúdo que guiam o usuário de forma clara e eficiente através da jornada digital.',
    image: '/skills/writing.png',
  },
];

export function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(1);

  const toggleService = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section className='w-full bg-background pt-16 pb-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='text-orange-500 text-5xl mb-24'>✦</div>
          <h1 className='text-6xl md:text-8xl font-semi-bold tracking-wider'>
            SERVIÇOS
          </h1>
        </div>

        {/* Services List */}
        <div className='space-y-0'>
          {services.map(service => (
            <div key={service.id}>
              {/* Service Header */}
              <div
                className='flex items-center justify-between p-6 cursor-pointer hover:bg-muted/20 transition-colors duration-200'
                onClick={() => toggleService(service.id)}
              >
                <div className='flex items-center space-x-4'>
                  <span className='text-muted-foreground text-lg font-medium'>
                    ({service.id.toString().padStart(2, '0')})
                  </span>
                  <h3 className='text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wide'>
                    {service.title}
                  </h3>
                </div>
                <div className='text-orange-500'>
                  {expandedService === service.id ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedService === service.id
                    ? 'max-h-[600px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className='border-b border-border/30'>
                  <div className='relative aspect-[21/9] overflow-hidden'>
                    {/* Background Image */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className='object-cover'
                    />

                    {/* Orange Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-orange-700/90 via-orange-600/70 to-transparent' />

                    {/* Text Content Overlay */}
                    <div className='absolute inset-0 flex items-end'>
                      <div className='p-8 md:p-12 text-white max-w-5xl'>
                        <p className='text-lg md:text-xl lg:text-2xl font-medium leading-relaxed'>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='text-center mt-24'>
        <div className='text-orange-500 text-5xl'>✦</div>
      </div>
    </section>
  );
}
