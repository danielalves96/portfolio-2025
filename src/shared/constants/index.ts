// Application-wide constants

export const APP_CONFIG = {
  name: 'Paola Oliveira Portfolio',
  description: 'UI/UX Designer Portfolio',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export const THEME_CONFIG = {
  defaultTheme: 'system',
  storageKey: 'portfolio-theme',
} as const;

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  easing: 'easeInOut',
} as const;
