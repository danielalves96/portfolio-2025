import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { FooterSection } from '@/components/sections/footer-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SkillsCarousel } from '@/components/sections/skills-carousel';
import { SocialSection } from '@/components/sections/social-section';
import { ToolsSection } from '@/components/sections/tools-section';
import { ThemeToggle } from '@/components/theme-toggle';

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
