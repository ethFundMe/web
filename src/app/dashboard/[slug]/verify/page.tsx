import { Container } from '@/components/Container';
import { VerificationStepIndicator } from '@/components/VerificationStepIndicator';
import VerificationForm from '@/components/forms/VerificationForm';
import { getCampaigns, getCreatorOverview, getUser } from '@/lib/queries';
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

export default async function VerifyPage({
  params: { slug },
}: {
  params: { slug: `0x${string}` };
}) {
  const user = await getUser(slug);
  const creatorOverview = await getCreatorOverview(slug);
  const campaignsData = await getCampaigns({ ethAddress: slug });
  const { totalCampaigns } = campaignsData;

  if (!user) return;

  const verificationPoints = {
    atLeastOne: totalCampaigns > 0,
    personalCampaignsFunded: creatorOverview?.total
      ? Number(creatorOverview.total) > 0.05
      : false,
    fundedCampaigns: false, //replace with proper data when bsaii updates the creator overview return data
  };

  const verify = () => {
    if (verificationPoints.fundedCampaigns) return true;
    if (
      verificationPoints.atLeastOne &&
      verificationPoints.personalCampaignsFunded
    )
      return true;
    return false;
  };

  const isValid = verify();

  return (
    <div className='min-h-[calc(100dvh-269px)] w-full'>
      <Container className='mb-6 flex flex-col gap-4 lg:flex-row'>
        <div className='flex-1'>
          <div className='text-center lg:mb-8'>
            <h1 className={TextSizeStyles.h4}>Apply For Verification</h1>
          </div>

          {/* <div>{creatorOverview?.total}</div>
        <div>{creatorOverview?.max}</div> */}

          <div>
            {/* {String(isValid)} */}
            <VerificationForm canVerify={isValid} />
          </div>
        </div>

        <div className='mx-auto w-full max-w-xl space-y-2 text-sm lg:mt-3 lg:max-w-xs'>
          <h2>To apply for verification, users must meet these criteria:</h2>

          <div className='ml-4 space-y-2'>
            <VerificationStepIndicator status={verificationPoints.atLeastOne}>
              At least one active campaign
            </VerificationStepIndicator>

            <VerificationStepIndicator
              status={verificationPoints.personalCampaignsFunded}
            >
              <div>
                Campaigns funded at least 0.05 ETH.
                <small className='block'>
                  (Current amount: {creatorOverview?.total} ETH)
                </small>
              </div>
            </VerificationStepIndicator>

            <VerificationStepIndicator
              status={verificationPoints.fundedCampaigns}
            >
              You have funded campaigns with at least 0.02 ETH
            </VerificationStepIndicator>
          </div>

          <p>
            Users can apply for verification if only the third criteria is met.
          </p>
        </div>
      </Container>
    </div>
  );
}
