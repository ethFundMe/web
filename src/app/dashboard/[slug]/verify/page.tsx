import { Container } from '@/components/Container';
import { VerificationStepIndicator } from '@/components/VerificationStepIndicator';
import VerificationForm from '@/components/forms/VerificationForm';
import { checkUserVerificationEligibility, getUser } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: `0x${string}` };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.slug;

  const user = await getUser(id);
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
  const vPoints = await checkUserVerificationEligibility(user?.id || '');

  // const isValid = !('error' in vPoints);
  const checkValid = () => {
    if (!vPoints || 'error' in vPoints) return false;

    if (vPoints.funded_campaigns) return true;

    return false;
  };
  const isValid = checkValid();

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

        {isValid && !('error' in vPoints) && (
          <div className='mx-auto w-full max-w-xl space-y-2 text-sm lg:mt-3 lg:max-w-xs'>
            <h2>To apply for verification, users must meet these criteria:</h2>

            <div className='ml-4 space-y-2'>
              <VerificationStepIndicator status={vPoints.created_campaign}>
                {vPoints.created_campaign
                  ? vPoints.created_campaign_eligible
                  : vPoints.created_campaign_not_eligible}
              </VerificationStepIndicator>

              <VerificationStepIndicator status={vPoints.campaign_funded}>
                <div>
                  Campaigns funded at least 0.05 ETH.
                  {vPoints.campaign_funded
                    ? vPoints.campaign_funded_eligible
                    : vPoints.campaign_funded_not_eligible}
                  {/* 
                  <small className='block'>
                    (Current amount: {creatorOverview?.total} ETH) 
                  </small>
                    */}
                </div>
              </VerificationStepIndicator>

              <VerificationStepIndicator status={vPoints.funded_campaigns}>
                {vPoints.funded_campaigns
                  ? vPoints.funded_campaigns_eligible
                  : vPoints.funded_campaigns_not_eligible}
                {/* You have funded campaigns with at least 0.02 ETH */}
              </VerificationStepIndicator>
            </div>
            <p>
              Users can apply for verification if only the third criteria is
              met.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
