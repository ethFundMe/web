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
  links,
  title,
}: {
  title: string;
  description: string;
  goal: number;
  links: Array<string>;
  beneficiary: `0x${string}`;
}) => {
  const {
    config,
    error: prepareCreateCampaignError,
    isError: isPrepareCreateCampaignError,
  } = usePrepareContractWrite({
    abi: EthFundMe,
    address: ethFundMeContractAddress,
    functionName: 'addCampaign',
    args: [title, description, parseEther(goal.toString()), links, beneficiary],
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
      const campaign = log[0].args[0];
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
