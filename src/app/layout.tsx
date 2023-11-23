import ModalProvider from '@/components/ModalProvider';
import { Footer } from '@/components/sections/Footer';
import { WagmiProvider } from '@/lib/provider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fund Me - Ethereum',
  description: 'Coming Soon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <WagmiProvider>
          <Toaster />
          <ModalProvider />
          {children}
          <Analytics />
          <Footer />
        </WagmiProvider>
      </body>
    </html>
  );
}
