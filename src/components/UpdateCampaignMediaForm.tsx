'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Campaign } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { DnDUploadSmall } from './DnDUpload';
import { labelVariants } from './ui/label';

export default function UpdateCampaignMediaForm({
  campaign,
}: {
  campaign: Campaign;
}) {
  const preparedImages = campaign.metadata.media_links
    .filter((_, idx) => idx !== 0)
    .filter((image) => !REGEX_CODES.ytLink.test(image));

  const {
    data: hash,
    error,
    isError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log(`'Settled updateCampaign', ${{ data, error }}`);
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const {
    metadata: { description, title },
    goal,
    campaign_id,
    beneficiary: beneficiaryAddress,
  } = campaign;

  const { refresh } = useRouter();

  const handleWriteContract = (mediaLinks: string[]) => {
    return writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'updateCampaign',
      chainId: ethChainId,
      args: [
        BigInt(campaign_id),
        title,
        description,
        BigInt(goal),
        mediaLinks,
        beneficiaryAddress as `0x${string}`,
      ],
    });
  };

  const handleDelete = (url: string) => {
    console.log({ url });

    const newMediaLinks = campaign.metadata.media_links.filter(
      (src) => src !== url
    );

    return handleWriteContract(newMediaLinks);
  };

  const handleUpload = (res: string[]) => {
    const lastItem =
      campaign.metadata.media_links[campaign.metadata.media_links.length - 1];
    const ytLink = REGEX_CODES.ytLink.test(lastItem);

    const newMediaLinks = ytLink
      ? [campaign.metadata.banner_url, ...preparedImages, ...res, lastItem]
      : [campaign.metadata.banner_url, ...preparedImages, ...res];

    return handleWriteContract(newMediaLinks);
  };

  const handleBannerUpload = (url: string[]) => {
    const newMediaLinks = campaign.metadata.media_links.map((item, idx) =>
      idx === 0 ? url[0] : item
    );
    return handleWriteContract(newMediaLinks);
  };

  useEffect(() => {
    if (isError && error) {
      toast.error((error as BaseError).shortMessage || error.message);
      return;
    }

    if (isConfirmedTxn) {
      toast.success('Campaign updated');
      return refresh();
    }
  }, [campaign.campaign_id, error, isConfirmedTxn, isError, refresh]);

  const uploadsRemaining = 6 - preparedImages.length;

  return (
    <div className='space-y-4'>
      <div className='mx-auto w-full space-y-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'>
        <div className={cn(labelVariants(), 'text-base')}>Campaign banner</div>

        <DnDUploadSmall
          disabled={isConfirmingTxn}
          preview={[campaign.metadata.banner_url]}
          handleUpload={handleBannerUpload}
        />
      </div>

      <div className='mx-auto w-full space-y-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'>
        <div className='flex items-center justify-between'>
          <span className={cn(labelVariants(), 'text-base')}>Other images</span>
          <small>
            {uploadsRemaining > 0 && `Upload ${uploadsRemaining} more`}
          </small>
        </div>

        <DnDUploadSmall
          disabled={isConfirmingTxn || isPending}
          preview={preparedImages}
          maxFiles={6 - preparedImages.length}
          handleUpload={handleUpload}
          handleDelete={handleDelete}
          deletable
        />
      </div>
    </div>
  );
}
