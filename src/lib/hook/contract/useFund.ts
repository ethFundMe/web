import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { parseEther } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export const useFund = ({ id, amt }: { id: number; amt: number }) => {
  const {
    config,
    error: prepareFundError,
    isError: isPrepareFundError,
  } = usePrepareContractWrite({
    abi: EthFundMe,
    address: ethFundMeContractAddress,
    functionName: 'fundCampaign',
    args: [BigInt(id)],
    value: parseEther(amt.toString() || '0'),
    chainId: ethChainId,
    onSettled(data, error) {
      console.log('Settled prepare fundCampaign: ', { data, error });
    },
  });

  const {
    data: fundCampaignData,
    error: fundCampaignError,
    isError: isFundCampaignError,
    isLoading: isLoadingFundCampaign,
    write: fundCampaignWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled fundCampaign: ', { data, error });
    },
  });

  const {
    data: fundCampaignTxn,
    isLoading: isLoadingFundCampaignTxn,
    isSuccess: isFundCampaignSuccess,
  } = useWaitForTransaction({ hash: fundCampaignData?.hash });

  return {
    fundCampaignError,
    fundCampaignTxn,
    fundCampaignWrite,
    isFundCampaignError,
    isFundCampaignSuccess,
    isLoadingFundCampaign,
    isLoadingFundCampaignTxn,
    isPrepareFundError,
    prepareFundError,
  };
};
