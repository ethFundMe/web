import { parseEther } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { EthFundMe } from '../../abi';
import { ethChainId, ethFundMeContractAddress } from '../../constant';

export const useCreateCampaign = ({
  beneficiary,
  description,
  goal,
  mediaLinks,
  title,
}: {
  title: string;
  description: string;
  goal: number;
  mediaLinks: Array<string>;
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
    args: [
      title,
      description,
      parseEther(goal ? goal.toString() : String(0)),
      mediaLinks,
      beneficiary,
    ],
    chainId: ethChainId,
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
