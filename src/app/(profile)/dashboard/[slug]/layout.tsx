import { Container } from '@/components/Container';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import Navbar from '@/components/Navbar';
import React from 'react';

export default async function DashboardLayout({
  params: { slug },
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className='min-h-[calc(100dvh-269px)]'>
      <Navbar />
      <Container className='h-full'>
        <div className='flex items-start pb-20 md:pb-0'>
          <DashboardSidebar userAddress={slug as `0x${string}`} />
          {children}
        </div>
      </Container>
    </div>
  );
}
