'use server';

import { db } from '@/lib/db/connection';
import * as schema from '@/lib/db/schema';

// About data
export async function getAboutData() {
  const result = await db.select().from(schema.about).limit(1);
  return result[0];
}

// Hero data
export async function getHeroData() {
  const result = await db.select().from(schema.hero).limit(1);
  return result[0];
}

// Social links
export async function getSocialLinks() {
  return await db
    .select()
    .from(schema.socialLinks)
    .orderBy(schema.socialLinks.order);
}

// Projects data
export async function getProjectsData() {
  const projects = await db
    .select()
    .from(schema.projects)
    .orderBy(schema.projects.id);
  return {
    title: 'PROJETOS',
    projects,
  };
}

// Services data
export async function getServicesData() {
  const services = await db
    .select()
    .from(schema.services)
    .orderBy(schema.services.id);
  return {
    title: 'SERVIÇOS',
    services,
  };
}

// Skills data
export async function getSkillsData() {
  return await db.select().from(schema.skills).orderBy(schema.skills.id);
}

// Tools data
export async function getToolsData() {
  const tools = await db.select().from(schema.tools).orderBy(schema.tools.id);

  // Se não há dados no banco, usar dados estáticos como fallback
  if (tools.length === 0) {
    const { toolsData } = await import('@/sections/tools/tools-data');
    return {
      title: toolsData.title,
      description: toolsData.description,
      tools: toolsData.tools.map(tool => ({
        id: tool.id,
        name: tool.name,
        image: tool.icon, // Mapear icon para image
        iconComponent: tool.iconComponent,
      })),
    };
  }

  return {
    title: 'FERRAMENTAS',
    description:
      'Algumas das ferramentas que utilizo no dia a dia para entregar soluções de design inovadoras e eficientes.',
    tools,
  };
}

// Contact data
export async function getContactData() {
  const result = await db.select().from(schema.contact).limit(1);
  const contact = result[0];

  if (!contact) {
    return null;
  }

  return {
    title: contact.title,
    email: {
      recipient: contact.emailRecipient,
      sender: {
        name: contact.emailSenderName,
        email: contact.emailSenderEmail,
      },
      subject: {
        prefix: contact.emailSubjectPrefix,
      },
    },
  };
}

// Footer data
export async function getFooterData() {
  const [footer] = await db.select().from(schema.footer).limit(1);
  const navigation = await db
    .select()
    .from(schema.footerNavigation)
    .orderBy(schema.footerNavigation.order);

  if (!footer) {
    return null;
  }

  return {
    copyright: footer.copyrightText,
    designer: 'Paola Oliveira',
    navigation: navigation.map(nav => ({
      id: nav.id,
      href: nav.href,
      label: nav.name,
      order: nav.order,
    })),
  };
}

// Social section data
export async function getSocialSectionData() {
  const socialItems = await db
    .select()
    .from(schema.socialSection)
    .orderBy(schema.socialSection.id);

  return {
    socialItems: socialItems.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      url: item.url,
    })),
  };
}
