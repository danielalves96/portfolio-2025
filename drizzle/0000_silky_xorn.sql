CREATE TABLE "about" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"role" varchar(200) NOT NULL,
	"paragraphs" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"email_recipient" varchar(255) NOT NULL,
	"email_sender_name" varchar(100) NOT NULL,
	"email_sender_email" varchar(255) NOT NULL,
	"email_subject_prefix" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer" (
	"id" serial PRIMARY KEY NOT NULL,
	"copyright_text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_navigation" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"href" varchar(100) NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_line1" varchar(100) NOT NULL,
	"title_line2" varchar(100) NOT NULL,
	"profile_src" varchar(255) NOT NULL,
	"profile_alt" varchar(100) NOT NULL,
	"profile_name" varchar(100) NOT NULL,
	"quote_text" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(255) NOT NULL,
	"tag" json NOT NULL,
	"category" json NOT NULL,
	"year" varchar(4) NOT NULL,
	"what_i_accomplished" text NOT NULL,
	"figma_mobile" varchar(500),
	"figma_desktop" varchar(500),
	"dribbble_url" varchar(500),
	"behance_url" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"href" varchar(255) NOT NULL,
	"icon_name" varchar(50) NOT NULL,
	"label" varchar(100) NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_section" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" varchar(255) NOT NULL
);
