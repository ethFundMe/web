import Navbar from '@/components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campaigns - EthFundMe',
  description: '',
};

export default function CampaignsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-[calc(100dvh-269px)]'>
      <Navbar />
      {children}
    </div>
  );
}
