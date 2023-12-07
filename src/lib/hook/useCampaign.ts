import { NewCampaign } from '@/types/db';
import { parseEther } from 'viem';
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { EthFundMe } from '../abi';
import { ethFundMeChainId, ethFundMeContractAddress } from '../constant';

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
      console.log(log[0].args);
      if (!log[0].args[0]) return;
      const campaign: NewCampaign = {
        beneficiary: log[0].args[0].beneficiary,
        campaign_id: parseInt(log[0].args[0].id.toString()),
        creator: log[0].args[0].creator,
        date_created: parseInt(log[0].args[0].dateCreated.toString()),
        description: log[0].args[0].description,
        flagged: log[0].args[0].flagged,
        goal: parseInt(log[0].args[0].goal.toString()),
        is_closed: log[0].args[0].isClosed,
        links: [...log[0].args[0].mediaLinks],
        title: log[0].args[0].title,
        total_accrued: parseInt(log[0].args[0].totalAccrued.toString()),
      };
      fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error(err));
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
