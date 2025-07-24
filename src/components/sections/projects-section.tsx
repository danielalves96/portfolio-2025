'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { FaBehance, FaDribbble, FaFigma } from 'react-icons/fa';

const projectsData = [
  {
    id: 1,
    title: 'Portfólio - Paola Oliveira',
    description:
      'Portfólio pessoal desenvolvido em Next.js com design moderno e responsivo.',
    image: '/projects/portifolio.jpg',
    tag: ['Todos', 'Web'],
    category: ['Portfólio'],
    year: '2024',
    figmaMobile: '',
    figmaDesktop:
      'https://www.figma.com/proto/cYNfOzFT4yh8SIghSjhPYP/Transportadora-Valentini?type=design&node-id=2-6&t=hc7NqgVkMJX5RFzf-1&scaling=scale-down&page-id=0%3A1',
    dribbbleUrl:
      'https://dribbble.com/shots/23417910-Website-Institucional-Valentini-877',
    behanceUrl:
      'https://www.behance.net/gallery/188670707/Website-Institucional-Valentini-877',
  },
  {
    id: 2,
    title: 'SHEBANK - Bank App',
    description:
      'Aplicativo bancário com interface moderna e funcionalidades completas.',
    image: '/projects/bank_app.jpg',
    tag: ['Todos', 'Mobile'],
    category: ['Mobile App'],
    year: '2024',
    figmaMobile:
      'https://www.figma.com/proto/hiBzC0BNogPSYVEtjacp1w/Projeto-Wave?embed_host=share&kind=proto&node-id=9-444&page-id=1%3A4&scaling=scale-down&starting-point-node-id=9%3A15&t=j6nggM13OYT9EbYo-1&type=design&viewport=280%2C427%2C0.48',
    figmaDesktop: '',
    dribbbleUrl: 'https://dribbble.com/shots/23383600-SHEBANK-Bank-App',
    behanceUrl: 'https://www.behance.net/gallery/188233413/SHEBANK-Bank-App',
  },
  {
    id: 3,
    title: 'Link In Bio - Web & Mobile',
    description: 'App para cadastrar links.',
    image: '/projects/linkApp.jpg',
    tag: ['Todos', 'Web', 'Mobile'],
    category: ['Web App', 'Mobile App'],
    year: '2024',
    figmaMobile:
      'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FozhyV3IXT4wcfcUXrKsJok%2FLink-In-Bio-App-e-Desktop%3Fpage-id%3D0%253A1%26type%3Ddesign%26node-id%3D3-887%26viewport%3D954%252C202%252C0.25%26t%3D4GRnwDw4NYnj7lfg-1%26scaling%3Dscale-down%26mode%3Ddesign',
    figmaDesktop:
      'https://www.figma.com/proto/ozhyV3IXT4wcfcUXrKsJok/Link-In-Bio-App-e-Desktop?embed_host=share&kind=proto&node-id=8-642&page-id=8%3A638&scaling=scale-down&t=2Z5BL9tbIzdZ6XND-1&type=design&viewport=866%2C564%2C0.43',
    dribbbleUrl:
      'https://dribbble.com/shots/23389012-Link-in-Bio-Mobile-Web-APP',
    behanceUrl:
      'https://www.behance.net/gallery/188308869/Link-in-Bio-Mobile-Web-APP',
  },
  {
    id: 4,
    title: 'WAVE - SURF STORE APP',
    description: 'Projeto de aplicativo de e-commerce para surfistas.',
    image: '/projects/surf.png',
    tag: ['Todos', 'Mobile'],
    category: ['E-commerce', 'Mobile App'],
    year: '2025',
    figmaMobile:
      'https://www.figma.com/proto/hiBzC0BNogPSYVEtjacp1w/Projeto-Wave?embed_host=share&kind=proto&node-id=9-444&page-id=1%3A4&scaling=scale-down&starting-point-node-id=9%3A15&t=j6nggM13OYT9EbYo-1&type=design&viewport=280%2C427%2C0.48',
    figmaDesktop: '',
    dribbbleUrl:
      'https://dribbble.com/shots/23416864-WAVE-Mockups-Surf-Store-APP',
    behanceUrl:
      'https://www.behance.net/gallery/188661609/WAVE-Mockups-%28Surf-Store-APP%29',
  },
  {
    id: 5,
    title: 'Website Institucional | Valentini 877',
    description: 'Landing page para uma transportadora.',
    image: '/projects/valentini.png',
    tag: ['Todos', 'Web'],
    category: ['Landing Page', 'Web'],
    year: '2025',
    figmaMobile: '',
    figmaDesktop:
      'https://www.figma.com/proto/cYNfOzFT4yh8SIghSjhPYP/Transportadora-Valentini?type=design&node-id=2-6&t=hc7NqgVkMJX5RFzf-1&scaling=scale-down&page-id=0%3A1',
    dribbbleUrl:
      'https://dribbble.com/shots/23417910-Website-Institucional-Valentini-877?utm_source=Clipboard_Shot&utm_campaign=l0la0liveira&utm_content=Website%20Institucional%20%7C%20Valentini%20877&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=l0la0liveira&utm_content=Website%20Institucional%20%7C%20Valentini%20877&utm_medium=Social_Share',
    behanceUrl:
      'https://www.behance.net/gallery/188670707/Website-Institucional-Valentini-877',
  },
  {
    id: 6,
    title: 'EOS Suite - Air',
    description: 'Design de plataforma de suite de aplicativos.',
    image: '/projects/EOS.png',
    tag: ['Todos', 'Web'],
    category: ['Dashboard', 'Web App'],
    year: '2025',
    figmaMobile: '',
    figmaDesktop: '',
    dribbbleUrl: '',
    behanceUrl: 'https://www.behance.net/gallery/226070039/AIR-EOS-SUITE',
  },
];

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const filters = ['Todos', 'Web', 'Mobile'];

  // Ordenar projetos do mais recente para o mais antigo
  const sortedProjects = [...projectsData].sort((a, b) => {
    // Converter anos para números para comparação correta
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);

    // Ordenação primária: por ano (decrescente)
    if (yearB !== yearA) {
      return yearB - yearA;
    }

    // Ordenação secundária: por ID (decrescente) para projetos do mesmo ano
    // Assumindo que IDs maiores são projetos mais recentes
    return b.id - a.id;
  });

  const filteredProjects =
    selectedFilter === 'Todos'
      ? sortedProjects
      : sortedProjects.filter(project => project.tag.includes(selectedFilter));

  return (
    <section className='w-full bg-white dark:bg-black text-black dark:text-white min-h-screen mb-8'>
      <div className='text-center py-16'>
        <div className='text-orange-500 text-5xl mb-20'>✦</div>
        <h1 className='text-6xl md:text-8xl font-semi-bold tracking-wider'>
          PROJETOS
        </h1>

        <div className='flex justify-center gap-4 mt-8'>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-orange-500 text-white dark:text-black border-orange-500'
                  : 'bg-transparent text-gray-600 dark:text-gray-400 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className='max-w-7xl mx-auto'>
        {filteredProjects.map((project, index) => (
          <div key={project.id} className='border '>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div className='flex flex-col justify-between p-6 h-full'>
                <div className='space-y-6'>
                  <div>
                    <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
                      Projeto
                    </p>
                    <h3 className='text-orange-500 font-semibold text-xl mb-2'>
                      {project.title}
                    </h3>
                    <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                      {project.description}
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-8'>
                    <div>
                      <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
                        Categorias
                      </p>
                      <p className='text-black dark:text-white text-lg'>
                        {project.category.join(' | ')}
                      </p>
                    </div>
                    <div>
                      <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
                        Ano
                      </p>
                      <p className='text-black dark:text-white text-lg'>
                        {project.year}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex gap-3 pt-4 mt-auto'>
                  {project.behanceUrl && (
                    <Link
                      href={project.behanceUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
                      title='Ver no Behance'
                    >
                      <FaBehance className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
                    </Link>
                  )}
                  {project.dribbbleUrl && (
                    <Link
                      href={project.dribbbleUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
                      title='Ver no Dribbble'
                    >
                      <FaDribbble className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
                    </Link>
                  )}
                  {project.figmaDesktop && (
                    <Link
                      href={project.figmaDesktop}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
                      title='Ver Figma Desktop'
                    >
                      <FaFigma className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
                    </Link>
                  )}
                  {project.figmaMobile && (
                    <Link
                      href={project.figmaMobile}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center w-12 h-12 border rounded-full hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group'
                      title='Ver Figma Mobile'
                    >
                      <FaFigma className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors' />
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Side - Project Image */}
              <div className='relative m-auto p-6 border-l'>
                <div className='aspect-[15/10] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden group'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={450}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-102'
                    priority={index < 2}
                    onError={e => {
                      // Fallback para caso a imagem não carregue
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div
                    className='w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center'
                    style={{ display: 'none' }}
                  >
                    <div className='text-center'>
                      <div className='text-gray-700 dark:text-gray-600 text-sm mb-2'>
                        {project.title}
                      </div>
                      <div className='text-gray-600 dark:text-gray-500 text-xs'>
                        {project.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
