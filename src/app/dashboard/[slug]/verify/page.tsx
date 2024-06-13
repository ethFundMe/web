import { Container } from '@/components/Container';
import VerificationForm from '@/components/forms/VerificationForm';
import { getUser } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);
  if (!user) notFound();

  return {
    title: 'Verify',
    description: `${user.bio}`,
    keywords:
      'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
    openGraph: {
      type: 'website',
      title: 'Verify',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      url: 'https://ethfund.me',
    },
    twitter: {
      title: 'Verify',
      card: 'summary_large_image',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      site: '@ethfundme',
      creator: '@ethfundme',
    },
  };
}

export default function VerifyPage() {
  return (
    <div className='min-h-[calc(100dvh-269px)] w-full'>
      <Container>
        <div className='mb-6 text-center lg:mb-8'>
          <h1 className={TextSizeStyles.h4}>Apply For Verification</h1>
        </div>

        <VerificationForm />
      </Container>
    </div>
  );
}
