import { lazy } from 'react';

import {
  AboutSkeleton,
  ContactSkeleton,
  ProjectsSkeleton,
  ServicesSkeleton,
  SkillsSkeleton,
  SocialSkeleton,
  ToolsSkeleton,
} from './section-skeletons';

export const LazyAboutSection = lazy(() =>
  import('@/sections/about/about-section').then(module => ({
    default: module.AboutSection,
  }))
);

export const LazyProjectsSection = lazy(() =>
  import('@/sections/projects/projects-section').then(module => ({
    default: module.ProjectsSection,
  }))
);

export const LazyServicesSection = lazy(() =>
  import('@/sections/services/services-section').then(module => ({
    default: module.ServicesSection,
  }))
);

export const LazySocialSection = lazy(() =>
  import('@/sections/social/social-section').then(module => ({
    default: module.SocialSection,
  }))
);

export const LazyToolsSection = lazy(() =>
  import('@/sections/tools/tools-section').then(module => ({
    default: module.ToolsSection,
  }))
);

export const LazySkillsCarousel = lazy(() =>
  import('@/sections/skills/skills-carousel').then(module => ({
    default: module.SkillsCarousel,
  }))
);

export const LazyContactSection = lazy(() =>
  import('@/sections/contact/contact-section').then(module => ({
    default: module.ContactSection,
  }))
);

export const sectionSkeletons = {
  about: AboutSkeleton,
  projects: ProjectsSkeleton,
  services: ServicesSkeleton,
  social: SocialSkeleton,
  tools: ToolsSkeleton,
  skills: SkillsSkeleton,
  contact: ContactSkeleton,
} as const;
