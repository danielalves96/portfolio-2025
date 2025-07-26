import { eq } from 'drizzle-orm';

import { ToolData } from '@/data/models/portfolio';

import { Database, tools } from '@/lib/db';

import { ToolsRepository } from '../tools.repository';
import { DrizzleRepository } from './base.repository';

export class DrizzleToolsRepository
  extends DrizzleRepository<ToolData>
  implements ToolsRepository
{
  constructor(db: Database) {
    super(db, tools);
  }

  private mapToToolData(result: any): ToolData {
    return {
      id: result.id,
      name: result.name,
      icon: result.icon,
      createdAt: result.createdAt,
      ...(result.category && { category: result.category }),
    };
  }

  override async findAll(): Promise<ToolData[]> {
    const results = await this.db.select().from(tools);
    return results.map(result => this.mapToToolData(result));
  }

  override async findById(id: string): Promise<ToolData | null> {
    const result = await super.findById(id);
    if (!result) return null;
    return this.mapToToolData(result);
  }

  override async create(
    data: Omit<ToolData, 'id' | 'createdAt'>
  ): Promise<ToolData> {
    const created = await super.create(data);
    return this.mapToToolData(created);
  }

  override async update(
    id: string,
    data: Partial<Omit<ToolData, 'id' | 'createdAt'>>
  ): Promise<ToolData | null> {
    const result = await super.update(id, data);
    if (!result) return null;
    return this.mapToToolData(result);
  }

  async findByCategory(category: string): Promise<ToolData[]> {
    const results = await this.db
      .select()
      .from(tools)
      .where(eq(tools.category, category));

    return results.map(result => this.mapToToolData(result));
  }
}
