import ModalProvider from '@/components/ModalProvider';
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
        <ModalProvider />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
