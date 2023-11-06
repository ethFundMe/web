import Navbar from '@/components/Navbar';

export default function Campaignslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar fixedToTop={false} />
      {children}
    </>
  );
}
