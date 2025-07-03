import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SettingsProvider } from '@/contexts/SettingsContext';
import BottomNav from '@/components/BottomNav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Typecraft',
  description: 'A modern typing test application inspired by Monkeytype.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettingsProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={cn(
            'min-h-screen bg-background font-body antialiased',
            'pb-20 sm:pb-0'
          )}
        >
          <main className="container mx-auto max-w-7xl px-4 py-8">
            {children}
          </main>
          <BottomNav />
          <Toaster />
        </body>
      </html>
    </SettingsProvider>
  );
}
