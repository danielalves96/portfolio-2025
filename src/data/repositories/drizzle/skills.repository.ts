import { eq } from 'drizzle-orm';

import { SkillCategory, SkillData } from '@/data/models/portfolio';

import { Database, skills } from '@/lib/db';

import { SkillsRepository } from '../skills.repository';
import { DrizzleRepository } from './base.repository';

export class DrizzleSkillsRepository
  extends DrizzleRepository<SkillData>
  implements SkillsRepository
{
  constructor(db: Database) {
    super(db, skills);
  }

  // Sobrescrever os métodos da classe base para converter o tipo category
  override async findAll(): Promise<SkillData[]> {
    const results = await this.db.select().from(skills);

    return results.map(result => ({
      ...result,
      category: result.category as SkillCategory,
      icon: result.icon ?? undefined,
      description: result.description ?? undefined,
    }));
  }

  override async findById(id: string): Promise<SkillData | null> {
    const result = await super.findById(id);

    if (!result) return null;

    return {
      ...result,
      category: result.category as SkillCategory,
      icon: result.icon ?? undefined,
      description: result.description ?? undefined,
    };
  }

  override async create(
    data: Omit<SkillData, 'id' | 'createdAt'>
  ): Promise<SkillData> {
    const created = await super.create(data);

    return {
      ...created,
      category: created.category as SkillCategory,
      icon: created.icon ?? undefined,
      description: created.description ?? undefined,
    };
  }

  override async update(
    id: string,
    data: Partial<Omit<SkillData, 'id' | 'createdAt'>>
  ): Promise<SkillData | null> {
    const result = await super.update(id, data);

    if (!result) return null;

    return {
      ...result,
      category: result.category as SkillCategory,
      icon: result.icon ?? undefined,
      description: result.description ?? undefined,
    };
  }

  async findByCategory(category: SkillCategory): Promise<SkillData[]> {
    const results = await this.db
      .select()
      .from(skills)
      .where(eq(skills.category, category));
    return results.map(row => ({
      ...row,
      category: row.category as SkillCategory,
      icon: row.icon ?? undefined,
      description: row.description ?? undefined,
    }));
  }
}
