'use client';

export function AboutSection() {
  return (
    <section className='w-full bg-background pb-0 pt-16 px-4 font-normal'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center space-y-8'>
          {/* Decorative star */}
          <div className='flex justify-center mb-16'>
            <div className='text-orange-500 text-5xl'>✦</div>
          </div>

          {/* Main content */}
          <div className='space-y-6'>
            <p className='text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed max-w-6xl mx-auto'>
              Olá! Me chamo{' '}
              <span className='font-semibold text-orange-500'>
                Paola Oliveira
              </span>
              , natural de Curitiba, sou Designer de Interface com experiência
              em criação e manutenção de layouts para produtos digitais, focando
              em proporcionar uma experiência do usuário intuitiva e envolvente.
              Capacidade de otimização de usabilidade, colaboração com equipes
              de desenvolvimento e manutenção de Design Systems, garantindo
              consistência visual em todos os produtos.
            </p>

            <p className='text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed max-w-6xl mx-auto'>
              Capacidade de otimização de usabilidade, colaboração com equipes
              de desenvolvimento e manutenção de Design Systems, garantindo
              consistência visual em todos os produtos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
