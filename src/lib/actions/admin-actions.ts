'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';

import { db } from '@/lib/db/connection';
import * as schema from '@/lib/db/schema';

// About Actions
export async function updateAboutData(data: {
  name: string;
  city: string;
  role: string;
  paragraphs: string[];
}) {
  try {
    const [existing] = await db.select().from(schema.about).limit(1);

    if (existing) {
      await db
        .update(schema.about)
        .set(data)
        .where(eq(schema.about.id, existing.id));
    } else {
      await db.insert(schema.about).values(data);
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating about data:', error);
    return { success: false, error: 'Erro ao atualizar dados sobre' };
  }
}

// Hero Actions
export async function updateHeroData(data: {
  titleLine1: string;
  titleLine2: string;
  profileSrc: string;
  profileAlt: string;
  profileName: string;
  quoteText: string[];
}) {
  try {
    const [existing] = await db.select().from(schema.hero).limit(1);

    if (existing) {
      await db
        .update(schema.hero)
        .set(data)
        .where(eq(schema.hero.id, existing.id));
    } else {
      await db.insert(schema.hero).values(data);
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating hero data:', error);
    return { success: false, error: 'Erro ao atualizar dados do hero' };
  }
}

// Social Links Actions
export async function createSocialLink(data: {
  href: string;
  iconName: string;
  label: string;
  order: number;
}) {
  try {
    await db.insert(schema.socialLinks).values(data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating social link:', error);
    return { success: false, error: 'Erro ao criar link social' };
  }
}

export async function updateSocialLink(
  id: number,
  data: {
    href: string;
    iconName: string;
    label: string;
    order: number;
  }
) {
  try {
    await db
      .update(schema.socialLinks)
      .set(data)
      .where(eq(schema.socialLinks.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating social link:', error);
    return { success: false, error: 'Erro ao atualizar link social' };
  }
}

export async function deleteSocialLink(id: number) {
  try {
    await db.delete(schema.socialLinks).where(eq(schema.socialLinks.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting social link:', error);
    return { success: false, error: 'Erro ao deletar link social' };
  }
}

// Projects Actions
export async function createProject(data: {
  title: string;
  description: string;
  image: string;
  tag: string[];
  category: string[];
  year: string;
  whatIAccomplished: string;
  figmaMobile?: string;
  figmaDesktop?: string;
  dribbbleUrl?: string;
  behanceUrl?: string;
}) {
  try {
    await db.insert(schema.projects).values(data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Erro ao criar projeto' };
  }
}

export async function updateProject(
  id: number,
  data: {
    title: string;
    description: string;
    image: string;
    tag: string[];
    category: string[];
    year: string;
    whatIAccomplished: string;
    figmaMobile?: string;
    figmaDesktop?: string;
    dribbbleUrl?: string;
    behanceUrl?: string;
  }
) {
  try {
    await db
      .update(schema.projects)
      .set(data)
      .where(eq(schema.projects.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: 'Erro ao atualizar projeto' };
  }
}

export async function deleteProject(id: number) {
  try {
    await db.delete(schema.projects).where(eq(schema.projects.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Erro ao deletar projeto' };
  }
}

// Services Actions
export async function createService(data: {
  title: string;
  description: string;
  image: string;
}) {
  try {
    await db.insert(schema.services).values(data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating service:', error);
    return { success: false, error: 'Erro ao criar serviço' };
  }
}

export async function updateService(
  id: number,
  data: {
    title: string;
    description: string;
    image: string;
  }
) {
  try {
    await db
      .update(schema.services)
      .set(data)
      .where(eq(schema.services.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating service:', error);
    return { success: false, error: 'Erro ao atualizar serviço' };
  }
}

export async function deleteService(id: number) {
  try {
    await db.delete(schema.services).where(eq(schema.services.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'Erro ao deletar serviço' };
  }
}

// Skills Actions
export async function createSkill(data: { name: string }) {
  try {
    await db.insert(schema.skills).values(data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating skill:', error);
    return { success: false, error: 'Erro ao criar habilidade' };
  }
}

export async function updateSkill(
  id: number,
  data: {
    name: string;
  }
) {
  try {
    await db.update(schema.skills).set(data).where(eq(schema.skills.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating skill:', error);
    return { success: false, error: 'Erro ao atualizar habilidade' };
  }
}

export async function deleteSkill(id: number) {
  try {
    await db.delete(schema.skills).where(eq(schema.skills.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting skill:', error);
    return { success: false, error: 'Erro ao deletar habilidade' };
  }
}

// Tools Actions
export async function createTool(data: { name: string; image: string }) {
  try {
    await db.insert(schema.tools).values(data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating tool:', error);
    return { success: false, error: 'Erro ao criar ferramenta' };
  }
}

export async function updateTool(
  id: number,
  data: {
    name: string;
    image: string;
  }
) {
  try {
    await db.update(schema.tools).set(data).where(eq(schema.tools.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating tool:', error);
    return { success: false, error: 'Erro ao atualizar ferramenta' };
  }
}

export async function deleteTool(id: number) {
  try {
    await db.delete(schema.tools).where(eq(schema.tools.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting tool:', error);
    return { success: false, error: 'Erro ao deletar ferramenta' };
  }
}

// Contact Actions
export async function updateContactData(data: {
  title: string;
  emailRecipient: string;
  emailSenderName: string;
  emailSenderEmail: string;
  emailSubjectPrefix: string;
}) {
  try {
    const [existing] = await db.select().from(schema.contact).limit(1);

    if (existing) {
      await db
        .update(schema.contact)
        .set(data)
        .where(eq(schema.contact.id, existing.id));
    } else {
      await db.insert(schema.contact).values(data);
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating contact data:', error);
    return { success: false, error: 'Erro ao atualizar dados de contato' };
  }
}

// Footer Actions
export async function updateFooterData(data: { copyrightText: string }) {
  try {
    const [existing] = await db.select().from(schema.footer).limit(1);

    if (existing) {
      await db
        .update(schema.footer)
        .set(data)
        .where(eq(schema.footer.id, existing.id));
    } else {
      await db.insert(schema.footer).values(data);
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating footer data:', error);
    return { success: false, error: 'Erro ao atualizar dados do rodapé' };
  }
}

// Footer Navigation Actions
export async function createFooterNavigation(data: {
  name: string;
  href: string;
  order: number;
}) {
  try {
    await db.insert(schema.footerNavigation).values(data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating footer navigation:', error);
    return { success: false, error: 'Erro ao criar navegação do rodapé' };
  }
}

export async function updateFooterNavigation(
  id: number,
  data: {
    name: string;
    href: string;
    order: number;
  }
) {
  try {
    await db
      .update(schema.footerNavigation)
      .set(data)
      .where(eq(schema.footerNavigation.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating footer navigation:', error);
    return { success: false, error: 'Erro ao atualizar navegação do rodapé' };
  }
}

export async function deleteFooterNavigation(id: number) {
  try {
    await db
      .delete(schema.footerNavigation)
      .where(eq(schema.footerNavigation.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting footer navigation:', error);
    return { success: false, error: 'Erro ao deletar navegação do rodapé' };
  }
}

// Social Section Actions
export async function createSocialSection(data: {
  name: string;
  description: string;
  image: string;
  url: string;
}) {
  try {
    await db.insert(schema.socialSection).values(data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating social section:', error);
    return { success: false, error: 'Erro ao criar seção social' };
  }
}

export async function updateSocialSection(
  id: number,
  data: {
    name: string;
    description: string;
    image: string;
    url: string;
  }
) {
  try {
    await db
      .update(schema.socialSection)
      .set(data)
      .where(eq(schema.socialSection.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating social section:', error);
    return { success: false, error: 'Erro ao atualizar seção social' };
  }
}

export async function deleteSocialSection(id: number) {
  try {
    await db
      .delete(schema.socialSection)
      .where(eq(schema.socialSection.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting social section:', error);
    return { success: false, error: 'Erro ao deletar seção social' };
  }
}
