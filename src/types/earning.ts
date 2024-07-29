export interface Earning {
  id: string;
  creator: {
    ethAddress: `0x${string}`;
    id: string;
    fullName: string;
    profileUrl: string;
  };
  amount: string;
  rewardType: 'campaign_creation' | 'funding' | 'validator';
  auto: boolean;
  transaction_hash: `0x${string}`;
  created_at: string;
}
