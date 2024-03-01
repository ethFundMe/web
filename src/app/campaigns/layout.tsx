import Navbar from '@/components/Navbar';

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
