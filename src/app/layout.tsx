import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/common/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Paola Oliveira | UI/UX Designer - Portfolio',
    template: '%s | Paola Oliveira',
  },
  description:
    'Portfolio de Paola Oliveira, UI/UX Designer especializada em design de interfaces, experiência do usuário e projetos digitais inovadores. Conheça meus trabalhos e serviços.',
  keywords: [
    'UI Designer',
    'UX Designer',
    'Design de Interface',
    'Experiência do Usuário',
    'Portfolio Design',
    'Paola Oliveira',
    'Design Digital',
    'Projetos UI/UX',
    'Designer Brasil',
  ],
  authors: [{ name: 'Paola Oliveira', url: 'https://paolauiux.com.br' }],
  creator: 'Paola Oliveira',
  publisher: 'Kyantech Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://paolauiux.com.br'),
  alternates: {
    canonical: 'https://paolauiux.com.br',
    languages: {
      'pt-BR': 'https://paolauiux.com.br',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://paolauiux.com.br',
    title: 'Paola Oliveira | UI/UX Designer - Portfolio',
    description:
      'Portfolio de Paola Oliveira, UI/UX Designer especializada em design de interfaces, experiência do usuário e projetos digitais inovadores.',
    siteName: 'Paola Oliveira Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paola Oliveira - UI/UX Designer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paola Oliveira | UI/UX Designer - Portfolio',
    description:
      'Portfolio de Paola Oliveira, UI/UX Designer especializada em design de interfaces e experiência do usuário.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '7Wf7NjhzEB34cNR9_mTeOQ-9uWDjZKFigYOaalz82Pw',
  },
  other: {
    developer: 'Kyantech Solutions',
    'developer-email': 'daniel@kyantech.com.br',
    'developer-ceo': 'Daniel Luiz Alves',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className='antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
