import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Save Somali Refugees From Abject Poverty',
  openGraph: {
    images: '/images/homepage-header.jpg',
  },
  description:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro facilis',
};

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
