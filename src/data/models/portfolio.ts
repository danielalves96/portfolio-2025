import { BaseEntity, ImageData } from '@/shared/types';

export enum SocialPlatform {
  LINKEDIN = 'linkedin',
  BEHANCE = 'behance',
  DRIBBBLE = 'dribbble',
  GITHUB = 'github',
  INSTAGRAM = 'instagram',
}

export enum SkillCategory {
  DESIGN = 'design',
  DEVELOPMENT = 'development',
  TOOLS = 'tools',
}

export interface ProfileData extends BaseEntity {
  name: string;
  title: string;
  bio: string;
  image: ImageData;
  quote: QuoteData;
}

export interface QuoteData {
  text: string;
  author?: string;
}

export interface SocialLink extends BaseEntity {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export interface ProjectData extends BaseEntity {
  title: string;
  description: string;
  image: ImageData;
  technologies: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export interface ProjectLink {
  type: 'demo' | 'github' | 'behance' | 'figma';
  url: string;
  label: string;
}

export interface SkillData extends BaseEntity {
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  description?: string;
}

export interface ServiceData extends BaseEntity {
  title: string;
  description: string;
  icon: string;
  features: string[];
}
