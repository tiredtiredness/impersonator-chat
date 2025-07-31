import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ReactNode} from 'react';
import {ImageGenerationProvider} from '@/shared/lib/contexts';
import {MobileMenuProvider} from '@/shared/lib/contexts/MobileMenuContext';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  title: 'Impersonator Chat',
  description: 'Chat with impersonator',
  icons: {
    icon: '/favicon.ico',
    apple: '/android-chrome-192x192.png',
    shortcut: '/favicon-32x32.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} bg-gradient-to-b from-violet-100 to-stone-200 font-light antialiased`}
      >
        <ImageGenerationProvider>
          <MobileMenuProvider>{children}</MobileMenuProvider>
        </ImageGenerationProvider>
      </body>
    </html>
  );
}
