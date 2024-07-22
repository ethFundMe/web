'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { Campaign } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';

export const DiscontinueCampaignBtn = ({
  campaign,
}: {
  campaign: Campaign;
}) => {
  // const [showDialog, setShowDialog] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { refresh, push } = useRouter();
  const { address } = useAccount();

  const {
    data: hash,
    error,
    isError,
    isPending,
    // isSuccess,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log('Settled discontinue campaign', { data, error });
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isError && error) {
      let errorMsg = (error as BaseError).shortMessage || error.message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else {
        errorMsg = 'Failed to discontinue campaign';
      }

      toast.error(errorMsg);
    } else if (isConfirmedTxn) {
      toast.success('Campaign discontinued');
      closeBtnRef.current?.click();

      refresh();
      push(`/dashboard/${address}`);
    }
  }, [
    campaign.campaign_id,
    error,
    isConfirmedTxn,
    isError,
    address,
    push,
    refresh,
  ]);

  function handleDiscontinue() {
    writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'discontinueCampaign',
      args: [BigInt(campaign.campaign_id)],
      chainId: ethChainId,
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='destructive' type='button' className='w-full'>
          Discontinue Campaign
        </Button>
      </DialogTrigger>

      <DialogContent>
        <h2 className='text-lg font-bold text-red-500 sm:text-xl'>
          Discontinue campaign?
        </h2>

        <div>
          <p>
            Once discontinued, the campaign will no longer be able to receive
            further funding.
          </p>
          <p>
            This action is irreversible. Make sure you want to discontinue the
            campaign before proceeding.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Button
            variant='destructive'
            onClick={handleDiscontinue}
            disabled={isPending || isConfirmingTxn}
          >
            Confirm
          </Button>
          <DialogClose ref={closeBtnRef}>Cancel</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
