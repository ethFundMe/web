export const ethFundMeContractAddress =
  (process.env.NEXT_PUBLIC_ETH_FUND_ME_CONTRACT_ADDRESS as `0x${string}`) ?? '';

export const ethFundMeChainId = parseInt(
  process.env.NEXT_PUBLIC_CHAIN_ID ?? '1'
);
