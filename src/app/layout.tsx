import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/common/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Paola Oliveira | Portfolio',
  description: 'Paola Oliveira - UI/UX Designer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
