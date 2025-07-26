import { aboutData } from '@/sections/about/about-data';
import { contactData } from '@/sections/contact/contact-data';
import { footerData } from '@/sections/footer/footer-data';
// import { socialData } from '@/sections/social/social-data'; // Has JSX, import manually
import { projectsData } from '@/sections/projects/projects-data';
// import { heroData } from '@/sections/hero/hero-data'; // Has JSX, import manually
import { servicesData } from '@/sections/services/services-data';
import { skills as skillsData } from '@/sections/skills/skills-data';
import { toolsData } from '@/sections/tools/tools-data';

import { db } from './connection';
import * as schema from './schema';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data
    await db.delete(schema.about);
    await db.delete(schema.hero);
    await db.delete(schema.socialLinks);
    await db.delete(schema.projects);
    await db.delete(schema.services);
    await db.delete(schema.skills);
    await db.delete(schema.tools);
    await db.delete(schema.contact);
    await db.delete(schema.footer);
    await db.delete(schema.footerNavigation);
    await db.delete(schema.socialSection);

    console.log('🗑️ Cleared existing data');

    // Seed about
    await db.insert(schema.about).values({
      name: aboutData.name,
      city: aboutData.city,
      role: aboutData.role,
      paragraphs: aboutData.paragraphs,
    });
    console.log('✅ Seeded about data');

    // Seed hero (manually since hero data has JSX)
    await db.insert(schema.hero).values({
      titleLine1: 'UI UX',
      titleLine2: 'DESIGNER',
      profileSrc: '/headshot/me.jpeg',
      profileAlt: 'Paola Oliveira',
      profileName: 'Paola Oliveira',
      quoteText: ['GRANDES DESIGNS', 'REQUEREM', 'GRANDE EMPATIA'],
    });
    console.log('✅ Seeded hero data');

    // Seed social links (manually since hero data has JSX)
    const socialLinksData = [
      {
        href: 'https://www.behance.net/l0la0liveira',
        iconName: 'behance',
        label: 'Behance',
        order: 1,
      },
      {
        href: 'https://www.linkedin.com/in/paola-tavares-de-oliveira-83823ba1/',
        iconName: 'linkedin',
        label: 'LinkedIn',
        order: 2,
      },
      {
        href: 'https://dribbble.com/l0la0liveira',
        iconName: 'dribbble',
        label: 'Dribbble',
        order: 3,
      },
    ];
    await db.insert(schema.socialLinks).values(socialLinksData);
    console.log('✅ Seeded social links');

    // Seed projects
    await db.insert(schema.projects).values(
      projectsData.projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        tag: project.tag,
        category: project.category,
        year: project.year,
        whatIAccomplished: project.whatIAccomplished,
        figmaMobile: project.figmaMobile || null,
        figmaDesktop: project.figmaDesktop || null,
        dribbbleUrl: project.dribbbleUrl || null,
        behanceUrl: project.behanceUrl || null,
      }))
    );
    console.log('✅ Seeded projects data');

    // Seed services
    await db.insert(schema.services).values(
      servicesData.services.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        image: service.image,
      }))
    );
    console.log('✅ Seeded services data');

    // Seed skills
    await db.insert(schema.skills).values(
      skillsData.map(skill => ({
        name: skill,
      }))
    );
    console.log('✅ Seeded skills data');

    // Seed tools
    await db.insert(schema.tools).values(
      toolsData.tools.map(tool => ({
        name: tool.name,
        image: tool.icon,
      }))
    );
    console.log('✅ Seeded tools data');

    // Seed contact
    await db.insert(schema.contact).values({
      title: contactData.title,
      emailRecipient: contactData.email.recipient,
      emailSenderName: contactData.email.sender.name,
      emailSenderEmail: contactData.email.sender.email,
      emailSubjectPrefix: contactData.email.subject.prefix,
    });
    console.log('✅ Seeded contact data');

    // Seed footer
    await db.insert(schema.footer).values({
      copyrightText: `© ${new Date().getFullYear()} ${footerData.copyright.company.name}. Todos os direitos reservados.`,
    });
    console.log('✅ Seeded footer data');

    // Seed footer navigation
    await db.insert(schema.footerNavigation).values(
      footerData.navigation.map((nav, index) => ({
        name: nav.label,
        href: nav.href,
        order: index + 1,
      }))
    );
    console.log('✅ Seeded footer navigation');

    // Seed social section (manually since social data has JSX)
    const socialSectionData = [
      {
        name: 'Behance',
        description:
          'Veja meu portfólio completo no Behance com projetos detalhados e estudos de caso.',
        image: '/social/behance.jpg',
        url: 'https://www.behance.net/l0la0liveira',
      },
      {
        name: 'LinkedIn',
        description:
          'Conecte-se comigo no LinkedIn para networking profissional e atualizações de carreira.',
        image: '/social/linkedin.jpg',
        url: 'https://www.linkedin.com/in/paola-tavares-de-oliveira-83823ba1/',
      },
      {
        name: 'Dribbble',
        description:
          'Explore meus shots no Dribbble e acompanhe meu processo criativo diário.',
        image: '/social/dribbble.jpg',
        url: 'https://dribbble.com/l0la0liveira',
      },
    ];
    await db.insert(schema.socialSection).values(socialSectionData);
    console.log('✅ Seeded social section');

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}
