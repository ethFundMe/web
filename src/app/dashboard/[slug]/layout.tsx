import { Container } from '@/components/Container';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import Navbar from '@/components/Navbar';
import { redirect } from 'next/navigation';
import React from 'react';
import { isAddress } from 'viem';

export default async function DashboardLayout({
  params: { slug },
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // fetch user with address
  const getUser = async () => {
    // just check if slug matches regex for wallet address
    return isAddress(slug);
  };

  const user = await getUser();

  if (!user) redirect('/');

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
