import { BlurFade } from '@/components/animations/blur-fade';

import { getAboutData } from '@/lib/actions/data-fetching';

export async function AboutSection() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return null;
  }

  const replacePlaceholders = (text: string) => {
    return text
      .replace('{name}', aboutData.name)
      .replace('{city}', aboutData.city)
      .replace('{role}', aboutData.role);
  };

  return (
    <section className='w-full bg-background pb-0 pt-8 sm:pt-12 lg:pt-16 px-4 font-normal'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center space-y-6 sm:space-y-8'>
          <div className='flex justify-center mb-8 sm:mb-12 lg:mb-16'>
            <div className='text-orange-500 text-3xl sm:text-4xl lg:text-5xl'>
              ✦
            </div>
          </div>
          <BlurFade inView={true} delay={0.5}>
            <div className='space-y-4 sm:space-y-5 lg:space-y-6'>
              {aboutData.paragraphs.map((paragraph, index) => {
                const processedText = replacePlaceholders(paragraph);
                const parts = processedText.split(aboutData.name);

                return (
                  <p
                    key={index}
                    className='text-base sm:text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed max-w-6xl mx-auto px-2 sm:px-4'
                  >
                    {parts.length > 1 ? (
                      <>
                        {parts[0]}
                        <span className='font-semibold text-orange-500'>
                          {aboutData.name}
                        </span>
                        {parts[1]}
                      </>
                    ) : (
                      processedText
                    )}
                  </p>
                );
              })}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
