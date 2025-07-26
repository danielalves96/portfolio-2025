import {
  integer,
  json,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

// About section
export const about = pgTable('about', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  role: varchar('role', { length: 200 }).notNull(),
  paragraphs: json('paragraphs').$type<string[]>().notNull(),
});

// Hero section
export const hero = pgTable('hero', {
  id: serial('id').primaryKey(),
  titleLine1: varchar('title_line1', { length: 100 }).notNull(),
  titleLine2: varchar('title_line2', { length: 100 }).notNull(),
  profileSrc: varchar('profile_src', { length: 255 }).notNull(),
  profileAlt: varchar('profile_alt', { length: 100 }).notNull(),
  profileName: varchar('profile_name', { length: 100 }).notNull(),
  quoteText: json('quote_text').$type<string[]>().notNull(),
});

// Social links
export const socialLinks = pgTable('social_links', {
  id: serial('id').primaryKey(),
  href: varchar('href', { length: 255 }).notNull(),
  iconName: varchar('icon_name', { length: 50 }).notNull(),
  label: varchar('label', { length: 100 }).notNull(),
  order: integer('order').notNull(),
});

// Projects
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  tag: json('tag').$type<string[]>().notNull(),
  category: json('category').$type<string[]>().notNull(),
  year: varchar('year', { length: 4 }).notNull(),
  whatIAccomplished: text('what_i_accomplished').notNull(),
  figmaMobile: varchar('figma_mobile', { length: 500 }),
  figmaDesktop: varchar('figma_desktop', { length: 500 }),
  dribbbleUrl: varchar('dribbble_url', { length: 500 }),
  behanceUrl: varchar('behance_url', { length: 500 }),
});

// Services
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 255 }).notNull(),
});

// Skills
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
});

// Tools
export const tools = pgTable('tools', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  image: varchar('image', { length: 255 }).notNull(),
});

// Contact
export const contact = pgTable('contact', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  emailRecipient: varchar('email_recipient', { length: 255 }).notNull(),
  emailSenderName: varchar('email_sender_name', { length: 100 }).notNull(),
  emailSenderEmail: varchar('email_sender_email', { length: 255 }).notNull(),
  emailSubjectPrefix: varchar('email_subject_prefix', {
    length: 100,
  }).notNull(),
});

// Footer
export const footer = pgTable('footer', {
  id: serial('id').primaryKey(),
  copyrightText: text('copyright_text').notNull(),
});

// Footer navigation
export const footerNavigation = pgTable('footer_navigation', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  href: varchar('href', { length: 100 }).notNull(),
  order: integer('order').notNull(),
});

// Social section
export const socialSection = pgTable('social_section', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
});
