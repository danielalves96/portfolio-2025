import AdminFloatButton from '@/components/common/admin-float-button';
import {
  mainBreadcrumbStructuredData,
  organizationStructuredData,
  portfolioStructuredData,
  StructuredData,
  websiteStructuredData,
} from '@/components/seo/structured-data';

import { isAuthenticated } from '@/lib/actions/auth-actions';
import { AboutSection } from '@/sections/about/about-section';
import { ContactSection } from '@/sections/contact/contact-section';
import { FooterSection } from '@/sections/footer/footer-section';
import { HeroSection } from '@/sections/hero/hero-section';
import { ProjectsSection } from '@/sections/projects/projects-section';
import { ServicesSection } from '@/sections/services/services-section';
import { SkillsCarousel } from '@/sections/skills/skills-carousel';
import { SocialSection } from '@/sections/social/social-section';
import { ToolsSection } from '@/sections/tools/tools-section';

export default async function Home() {
  const authenticated = await isAuthenticated();

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={portfolioStructuredData} />
      <StructuredData data={websiteStructuredData} />
      <StructuredData data={mainBreadcrumbStructuredData} />
      <StructuredData data={organizationStructuredData} />

      <main>
        <HeroSection />
        <SkillsCarousel />
        <section id='about'>
          <AboutSection />
        </section>
        <section id='projects'>
          <ProjectsSection />
        </section>
        <ServicesSection />
        <SocialSection />
        <ToolsSection />
        <SkillsCarousel />
        <section id='contact'>
          <ContactSection />
        </section>
        <FooterSection />

        {/* Admin Float Button - Only show when logged in */}
        {authenticated && <AdminFloatButton />}
      </main>
    </>
  );
}
