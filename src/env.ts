import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This will ensure they're validated during build.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .describe('PostgreSQL database connection string'),
    ADMIN_EMAIL: z
      .string()
      .email()
      .default('paolatoliveira@gmail.com')
      .describe('Admin email for authentication'),
    ADMIN_PASSWORD: z
      .string()
      .min(6)
      .default('000000')
      .describe('Admin password for authentication'),
    RESEND_API_KEY: z
      .string()
      .min(1)
      .describe('Resend API key for email functionality'),
    SCALITY_ACCESS_KEY_ID: z
      .string()
      .min(1)
      .describe('Zenko S3-compatible storage access key ID'),
    SCALITY_SECRET_ACCESS_KEY: z
      .string()
      .min(1)
      .describe('Zenko S3-compatible storage secret access key'),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development')
      .describe('Node.js environment'),
  },

  /**
   * Specify your client-side environment variables schema here. These will be validated during build.
   * Make them public by prefixing them with `NEXT_PUBLIC_`.
   */
  client: {
    // Add any client-side environment variables here if needed
    // NEXT_PUBLIC_SOMETHING: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtime (e.g.
   * for middleware) or client-side so we need to destructure manually.
   */
  runtimeEnv: {
    // Server-side variables
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SCALITY_ACCESS_KEY_ID: process.env.SCALITY_ACCESS_KEY_ID,
    SCALITY_SECRET_ACCESS_KEY: process.env.SCALITY_SECRET_ACCESS_KEY,
    NODE_ENV: process.env.NODE_ENV,

    // Client-side variables (if any)
    // NEXT_PUBLIC_SOMETHING: process.env.NEXT_PUBLIC_SOMETHING,
  },

  /**
   * Run `build` or `dev` with SKIP_ENV_VALIDATION to skip env validation. This is especially useful
   * for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=""` will throw an error.
   */
  emptyStringAsUndefined: true,
});
