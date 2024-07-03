import { Container } from '@/components/Container';
import { VerificationStepIndicator } from '@/components/VerificationStepIndicator';
import VerificationForm from '@/components/forms/VerificationForm';
import {
  checkUserVerificationEligibility,
  checkVerificationStatus,
  getUser,
} from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
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
      'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
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
  const vStatus = await checkVerificationStatus(user?.id || '');

  // const isValid = !('error' in vPoints);
  const checkValid = () => {
    if (!vPoints || 'error' in vPoints) return false;

    if (vPoints.funded_campaigns) return true;

    return false;
  };
  const isValid = checkValid();
  const verificationStatus = vStatus?.verifications[0].status === 'pending';

  return (
    <>
      <div className='min-h-[calc(100dvh-269px)] w-full'>
        {!verificationStatus && (
          <div className='mb-4 flex flex-wrap items-center justify-center gap-2 bg-blue-500/10 py-2 text-center text-sm text-blue-500 lg:text-base'>
            You have already applied for verification.
          </div>
        )}

        <Container className='mb-6'>
          <div className='flex-1'>
            <div className='mb-2 text-center lg:mb-4 lg:text-left'>
              <h1 className={TextSizeStyles.h4}>Apply For Verification</h1>
            </div>

            <div
              className={cn(
                'flex flex-col items-center gap-4 lg:flex-row',
                verificationStatus && 'lg:items-start'
              )}
            >
              {isValid && !('error' in vPoints) && (
                <div className='w-full max-w-xl space-y-2 text-sm lg:mt-3 lg:max-w-sm'>
                  <h2>
                    To apply for verification, users must meet these criteria:
                  </h2>

                  <div className='ml-4 space-y-2'>
                    <VerificationStepIndicator
                      status={vPoints.created_campaign}
                    >
                      <b>1. You have created at least one campaign</b>
                    </VerificationStepIndicator>

                    <VerificationStepIndicator status={vPoints.campaign_funded}>
                      <b>
                        2. Your created campaign(s) have received a total of at
                        least 0.05 ETH in funding.
                      </b>
                    </VerificationStepIndicator>

                    <VerificationStepIndicator
                      status={vPoints.funded_campaigns}
                    >
                      <b>
                        3. You have funded personally funded at least 0.02 ETH
                        in total.
                      </b>
                    </VerificationStepIndicator>
                  </div>
                  <p>
                    <b>Note:</b> Meeting the personal funding requirement (#3)
                    alone is sufficient for verification. If this requirement is
                    not met, both campaign creation (#1) and campaign funding
                    (#2) requirements must be satisfied.
                  </p>
                </div>
              )}

              {verificationStatus && <VerificationForm canVerify={isValid} />}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
