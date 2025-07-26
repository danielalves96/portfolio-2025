import { eq } from 'drizzle-orm';

import { SocialLink, SocialPlatform } from '@/data/models/portfolio';

import { Database, socialLinks } from '@/lib/db';

import { SocialRepository } from '../social.repository';
import { DrizzleRepository } from './base.repository';

export class DrizzleSocialRepository
  extends DrizzleRepository<SocialLink>
  implements SocialRepository
{
  constructor(db: Database) {
    super(db, socialLinks);
  }

  // Sobrescrever os métodos da classe base para converter o tipo platform
  override async findAll(): Promise<SocialLink[]> {
    const results = await this.db.select().from(socialLinks);

    return results.map(result => ({
      ...result,
      platform: result.platform as SocialPlatform,
    }));
  }

  override async findById(id: string): Promise<SocialLink | null> {
    const result = await super.findById(id);

    if (!result) return null;

    return {
      ...result,
      platform: result.platform as SocialPlatform,
    };
  }

  override async create(
    data: Omit<SocialLink, 'id' | 'createdAt'>
  ): Promise<SocialLink> {
    // O método create da classe base já funciona corretamente porque o enum SocialPlatform
    // tem valores de string que correspondem aos valores aceitos pelo schema
    const created = await super.create(data);

    return {
      ...created,
      platform: created.platform as SocialPlatform,
    };
  }

  override async update(
    id: string,
    data: Partial<Omit<SocialLink, 'id' | 'createdAt'>>
  ): Promise<SocialLink | null> {
    // Chamar o método update da classe base
    const result = await super.update(id, data);

    if (!result) return null;

    return {
      ...result,
      platform: result.platform as SocialPlatform,
    };
  }

  async findByPlatform(platform: SocialPlatform): Promise<SocialLink | null> {
    const results = await this.db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.platform, platform))
      .limit(1);

    if (!results[0]) return null;

    // Converter o resultado do banco para o tipo SocialLink com o enum SocialPlatform
    return {
      ...results[0],
      platform: results[0].platform as SocialPlatform,
    };
  }
}
