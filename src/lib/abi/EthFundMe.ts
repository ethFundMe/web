export const EthFundMe = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_slot',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_newMTNR',
        type: 'address',
      },
    ],
    name: '_0x0',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: '_0x1',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: '_0x2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: '_0x2_1',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: '_0x2_3',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_creators',
        type: 'address[]',
      },
      {
        internalType: 'bool[]',
        name: '_statuses',
        type: 'bool[]',
      },
    ],
    name: '_0x3',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_creators',
        type: 'address[]',
      },
      {
        internalType: 'bool[]',
        name: '_statuses',
        type: 'bool[]',
      },
    ],
    name: '_0x4',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: '_campaignIDs',
        type: 'uint256[]',
      },
      {
        internalType: 'bool[]',
        name: '_statuses',
        type: 'bool[]',
      },
    ],
    name: '_0x5',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: '_0x7',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_mdHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_goal',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'addCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'EthFundMe__AmountExceedsLimit',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__Banned',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__CampaignDiscontinued',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__CampaignFlagged',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__CreatorBanned',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__DiminishFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__GoalExceedsNonVerifiedLimit',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__GoalReachedNotUpdatable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__InsufficientFunds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__NoGoalSet',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__NotCampaignCreator',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__OffsetOutOfBounds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__SendPlatformFeeFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__TransferFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'mdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'dateCreated',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'totalAccrued',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'flagged',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'discontinued',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct EthFundMe.Campaign',
        name: 'campaign',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'CampaignCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'campaign_id',
        type: 'uint256',
      },
    ],
    name: 'CampaignDiscontinued',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'campaignIDs',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bool[]',
        name: 'states',
        type: 'bool[]',
      },
    ],
    name: 'CampaignFlagged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'funder',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'mdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'dateCreated',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'totalAccrued',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'flagged',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'discontinued',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct EthFundMe.Campaign',
        name: 'campaign',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'commentID',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountFundedAfterFees',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'logs',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'CampaignFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'mdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'dateCreated',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'totalAccrued',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'flagged',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'discontinued',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct EthFundMe.Campaign',
        name: 'campaign',
        type: 'tuple',
      },
    ],
    name: 'CampaignUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'creators',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'bool[]',
        name: 'states',
        type: 'bool[]',
      },
    ],
    name: 'CreatorBanned',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'CreatorFeeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'creatorAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'creatorFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'creatorFeePercentage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'campaignID',
        type: 'uint256',
      },
    ],
    name: 'CreatorFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'creators',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'bool[]',
        name: 'states',
        type: 'bool[]',
      },
    ],
    name: 'CreatorVerified',
    type: 'event',
  },
  {
    inputs: [],
    name: 'diminish',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDiminishFactor',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'diminishReward',
        type: 'uint256',
      },
    ],
    name: 'DiminishFactorUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_campaignID',
        type: 'uint256',
      },
    ],
    name: 'discontinueCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_campaignID',
        type: 'uint256',
      },
      {
        internalType: 'int256',
        name: '_commentID',
        type: 'int256',
      },
    ],
    name: 'fundCampaign',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'setCreatorFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum EthFundMe.RewardType',
        name: 'rewardType',
        type: 'uint8',
      },
    ],
    name: 'TokensTransferred',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_mdHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_campaignID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_goal',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'updateCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_seconds',
        type: 'uint256',
      },
    ],
    name: 'updateDFInterval',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newTokenAddress',
        type: 'address',
      },
    ],
    name: 'updateTokenContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
  {
    inputs: [],
    name: '_0x2_2',
    outputs: [
      {
        internalType: 'address',
        name: 'M0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'M1',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'M2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'BASE_REWARD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'campaignsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalCampaigns',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'CREATOR_FEE_PERCENTAGE_LIMIT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'creator_isBanned',
    outputs: [
      {
        internalType: 'bool',
        name: 'isBanned',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'creator_isVerified',
    outputs: [
      {
        internalType: 'bool',
        name: 'isVerified',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_creator',
        type: 'address',
      },
    ],
    name: 'creatorCollection',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'creatorCampaignIDs',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'creatorFee_Percentage',
    outputs: [
      {
        internalType: 'uint256',
        name: 'feePercentage',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DF_INTERVAL',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DF_NEXT_UPDATE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DIMINISH_FACTOR',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'EFM_TOKEN_CONTRACT',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'FEE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
    ],
    name: 'getCampaigns',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'mdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'dateCreated',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'totalAccrued',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'flagged',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'discontinued',
            type: 'bool',
          },
        ],
        internalType: 'struct EthFundMe.Campaign[]',
        name: 'campaigns',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PERCENTAGE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PLTF_WT',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 's_Campaigns',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'mdHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'goal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'dateCreated',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'totalAccrued',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'flagged',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'discontinued',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UNVERIFIED_CREATOR_CAMPAIGN_DONATION_LIMIT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
