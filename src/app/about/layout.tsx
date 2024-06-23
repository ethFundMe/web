import Navbar from '@/components/Navbar';
import { Metadata } from 'next';

const efm = 'EthFundMe';
export const metadata: Metadata = {
  title: 'About Us',
  description: `Welcome to ${efm}, where compassion clicks with blockchain! We're the trailblazing crowdfunding platform that blends community spirit with the cutting-edge efficiency of web3 technologies. Whether you're igniting a personal dream, backing a local project, or championing global causes, ${efm} is your gateway to making a real impact. Jump into a world where every donation is a building block for a brighter future!`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
