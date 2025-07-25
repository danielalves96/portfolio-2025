import { ThemeToggle } from '@/components/common/theme-toggle';

import { AboutSection } from '@/sections/about/about-section';
import { ContactSection } from '@/sections/contact/contact-section';
import { FooterSection } from '@/sections/footer/footer-section';
import { HeroSection } from '@/sections/hero/hero-section';
import { ProjectsSection } from '@/sections/projects/projects-section';
import { ServicesSection } from '@/sections/services/services-section';
import { SkillsCarousel } from '@/sections/skills/skills-carousel';
import { SocialSection } from '@/sections/social/social-section';
import { ToolsSection } from '@/sections/tools/tools-section';

export default function Home() {
  return (
    <div>
      <header className='fixed top-4 right-4 z-10'>
        <ThemeToggle />
      </header>
      <HeroSection />
      <SkillsCarousel />
      <div id='about'>
        <AboutSection />
      </div>
      <div id='projects'>
        <ProjectsSection />
      </div>
      <ServicesSection />
      <SocialSection />
      <ToolsSection />
      <SkillsCarousel />
      <div id='contact'>
        <ContactSection />
      </div>
      <FooterSection />
    </div>
  );
}
