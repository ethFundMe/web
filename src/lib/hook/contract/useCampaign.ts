import { parseEther } from 'viem';
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { EthFundMe } from '../../abi';
import { ethFundMeChainId, ethFundMeContractAddress } from '../../constant';

export const useCreateCampaign = ({
  beneficiary,
  description,
  goal,
  mediaLinks,
  title, // tag,
} // type,
: {
  title: string;
  description: string;
  // tag: string;
  goal: number;
  mediaLinks: Array<string>;
  beneficiary: `0x${string}`;
  // type: 'personal' | 'others';
}) => {
  const {
    config,
    error: prepareCreateCampaignError,
    isError: isPrepareCreateCampaignError,
  } = usePrepareContractWrite({
    abi: EthFundMe,
    address: ethFundMeContractAddress,
    functionName: 'addCampaign',
    args: [
      title,
      description,
      parseEther(goal ? goal.toString() : String(0)),
      mediaLinks,
      beneficiary,
      // tag,
      // type,
    ],
    chainId: ethFundMeChainId,
    onSettled(data, error) {
      console.log('Settled Prepared addCampign: ', { data, error });
    },
  });

  const {
    data: createCampainData,
    error: createCampainError,
    isError: isCreateCampaignError,
    isLoading: isLoadingCreateCampaign,
    write: writeCreateCampaign,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled addCampaign: ', { data, error });
    },
  });

  const {
    data: createCampainTxn,
    isLoading: isLoadingCreateCampaignTxn,
    isSuccess: isCreateCampaignTxnSuccess,
  } = useWaitForTransaction({ hash: createCampainData?.hash });

  const unwatch = useContractEvent({
    abi: EthFundMe,
    address: ethFundMeContractAddress,
    eventName: 'CampaignCreated',
    chainId: ethFundMeChainId,
    listener(log) {
      const campaign = log[0].args.campaign;
      console.log(campaign);
      if (!campaign) return;
      unwatch?.();
    },
  });

  return {
    createCampainError,
    createCampainTxn,
    isCreateCampaignError,
    isCreateCampaignTxnSuccess,
    isLoadingCreateCampaign,
    isLoadingCreateCampaignTxn,
    isPrepareCreateCampaignError,
    prepareCreateCampaignError,
    writeCreateCampaign,
  };
};
