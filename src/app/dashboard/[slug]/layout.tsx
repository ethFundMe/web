import { Container } from '@/components/Container';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />

      <Container className='h-full'>
        <div className='flex items-start'>
          <div className='hidden md:block'>
            <DashboardSidebar />
          </div>

          {children}
        </div>
      </Container>
    </div>
  );
}
