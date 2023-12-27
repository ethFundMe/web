export const EthFundMe = [
  {
    inputs: [],
    name: 'EthFundMe__AmountExceedsLimit',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EthFundMe__CampaignAlreadyClosed',
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
    name: 'EthFundMe__GoalExceedsNonVerifiedLimit',
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
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'mediaLinks',
            type: 'string[]',
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
            name: 'isClosed',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct EthFundMe.Campaign',
        name: 'campaign',
        type: 'tuple',
      },
    ],
    name: 'CampaignCreated',
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
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'mediaLinks',
            type: 'string[]',
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
            name: 'isClosed',
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
        internalType: 'uint256',
        name: 'amountFundedAfterFees',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'creatorFunded',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'logs',
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
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'mediaLinks',
            type: 'string[]',
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
            name: 'isClosed',
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
        internalType: 'address',
        name: '_creator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_status',
        type: 'bool',
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
    name: '_0x3Many',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_creator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_status',
        type: 'bool',
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
    name: '_0x4Many',
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
        internalType: 'bool',
        name: '_status',
        type: 'bool',
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
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_desc',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_goal',
        type: 'uint256',
      },
      {
        internalType: 'string[]',
        name: '_mediaLinks',
        type: 'string[]',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_campaignID',
        type: 'uint256',
      },
    ],
    name: 'closeCampaign',
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
    stateMutability: 'payable',
    type: 'receive',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_campaignID',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_desc',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_goal',
        type: 'uint256',
      },
      {
        internalType: 'string[]',
        name: '_mediaLinks',
        type: 'string[]',
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
    stateMutability: 'payable',
    type: 'fallback',
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
        name: '_creator',
        type: 'address',
      },
    ],
    name: 'creatorCollectionCount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'creatorCampaignsCount',
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
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'mediaLinks',
            type: 'string[]',
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
            name: 'isClosed',
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
    inputs: [
      {
        internalType: 'address',
        name: '_creator',
        type: 'address',
      },
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
    name: 'getCreatorCampaigns',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'goal',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'mediaLinks',
            type: 'string[]',
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
            name: 'isClosed',
            type: 'bool',
          },
        ],
        internalType: 'struct EthFundMe.Campaign[]',
        name: 'creatorCampaigns',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_campaignID',
        type: 'uint256',
      },
    ],
    name: 'goalReached',
    outputs: [
      {
        internalType: 'bool',
        name: 'isGoalReached',
        type: 'bool',
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
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
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
        name: 'isClosed',
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
] as const;
