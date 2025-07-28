import { Suspense } from 'react';

import AdminFloatButton from '@/components/common/admin-float-button';
import { LazySection } from '@/components/common/lazy-section';
import {
  LazyAboutSection,
  LazyContactSection,
  LazyProjectsSection,
  LazyServicesSection,
  LazySkillsCarousel,
  LazySocialSection,
  LazyToolsSection,
  sectionSkeletons,
} from '@/components/common/lazy-sections';
import {
  mainBreadcrumbStructuredData,
  organizationStructuredData,
  portfolioStructuredData,
  StructuredData,
  websiteStructuredData,
} from '@/components/seo/structured-data';

import { isAuthenticated } from '@/lib/actions/auth-actions';
import { FooterSection } from '@/sections/footer/footer-section';
import { HeroSection } from '@/sections/hero/hero-section';
import { SkillsCarousel } from '@/sections/skills/skills-carousel';

export default async function Home() {
  const authenticated = await isAuthenticated();

  return (
    <>
      <StructuredData data={portfolioStructuredData} />
      <StructuredData data={websiteStructuredData} />
      <StructuredData data={mainBreadcrumbStructuredData} />
      <StructuredData data={organizationStructuredData} />

      <main>
        <HeroSection />
        <SkillsCarousel />

        <LazySection
          priority='high'
          fallback={<sectionSkeletons.about />}
          className='min-h-[600px]'
        >
          <Suspense fallback={<sectionSkeletons.about />}>
            <section id='about'>
              <LazyAboutSection />
            </section>
          </Suspense>
        </LazySection>

        <LazySection
          priority='medium'
          fallback={<sectionSkeletons.projects />}
          rootMargin='200px'
          className='min-h-[800px]'
        >
          <Suspense fallback={<sectionSkeletons.projects />}>
            <section id='projects'>
              <LazyProjectsSection />
            </section>
          </Suspense>
        </LazySection>

        <LazySection
          priority='medium'
          fallback={<sectionSkeletons.services />}
          rootMargin='150px'
          className='min-h-[600px]'
        >
          <Suspense fallback={<sectionSkeletons.services />}>
            <LazyServicesSection />
          </Suspense>
        </LazySection>

        <LazySection
          priority='low'
          fallback={<sectionSkeletons.social />}
          rootMargin='100px'
          className='min-h-[500px]'
        >
          <Suspense fallback={<sectionSkeletons.social />}>
            <LazySocialSection />
          </Suspense>
        </LazySection>

        <LazySection
          priority='low'
          fallback={<sectionSkeletons.tools />}
          rootMargin='100px'
          className='min-h-[400px]'
        >
          <Suspense fallback={<sectionSkeletons.tools />}>
            <LazyToolsSection />
          </Suspense>
        </LazySection>

        <LazySection
          priority='low'
          fallback={<sectionSkeletons.skills />}
          rootMargin='50px'
          className='min-h-[200px]'
        >
          <Suspense fallback={<sectionSkeletons.skills />}>
            <LazySkillsCarousel />
          </Suspense>
        </LazySection>

        <LazySection
          priority='medium'
          fallback={<sectionSkeletons.contact />}
          rootMargin='150px'
          className='min-h-[600px]'
        >
          <Suspense fallback={<sectionSkeletons.contact />}>
            <section id='contact'>
              <LazyContactSection />
            </section>
          </Suspense>
        </LazySection>

        <FooterSection />

        {authenticated && <AdminFloatButton />}
      </main>
    </>
  );
}
