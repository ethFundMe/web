import { Campaign, User, UserEarning } from '@/types';

export type CampaignUrlParams = {
  [key: string]: string | number | undefined;
};

export const fetchCampaignTags = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/tags`
    );
    const data: { tags?: { id: number; name: string }[] } = await res.json();

    return data?.tags ? data.tags : [];
  } catch (e) {
    return [];
  }
};

export async function getCampaigns(urlParams: CampaignUrlParams) {
  const page = urlParams?.page;
  const ethAddress = urlParams?.ethAddress;
  const tagId = urlParams?.tag;

  // console.log({ tagId, page, ethAddress });

  let baseUrl = `${process.env.ETH_FUND_ENDPOINT}/api/campaigns/`;

  baseUrl = ethAddress
    ? `${baseUrl}?creator=${ethAddress}&page=${page ?? 1}`
    : tagId
    ? `${baseUrl}?tag=${tagId}&page=${page ?? 1}`
    : `${baseUrl}?page=${page ?? 1}`;

  const res = await fetch(baseUrl, { cache: 'no-store' });
  const data = await res.json();

  // console.log({ baseUrl, data });

  const campaigns: Campaign[] = data.campaigns || [];
  const totalCampaigns: number = data?.meta?.totalCampaigns ?? 0;

  return { campaigns, totalCampaigns };
}

export const getUser = async (userId: `0x${string}`) => {
  const res = await fetch(
    `${process.env.ETH_FUND_ENDPOINT}/api/user/${userId}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  const user = data;

  return user?.error ? null : (user as User);
};

export const getCampaign = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/campaign/${id}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  const campaign: Campaign = data;

  return campaign ?? null;
};

export async function fetchActiveStats() {
  try {
    const res = await fetch(
      `${process.env.ETH_FUND_ENDPOINT}/api/home/statistics`
    );
    const data: {
      activeCampaigns: number;
      ethFunded: bigint;
      fundedCampaigns: number;
    } = await res.json();

    if (!res.ok) throw new Error('Failed to get homepage stats');

    return data;
  } catch (e) {
    if (e instanceof Error) {
      // console.log(e.message);
    }
    return null;
  }
}

export const fetchTotalUserEarnings = async (ethAddress: `0x${string}`) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/user/token_overview/${ethAddress}`
    );
    const data: { total: string; max: string; min: string } | null =
      await res.json();

    return data;
  } catch (e) {
    // console.log('Failed to get total earnings', e);
    return null;
  }
};

export const fetchUserEarnings = async (ethAddress: `0x${string}`) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/user/token/${ethAddress}`,
      {
        headers: {
          accept: '*/*',
        },
      }
    );
    const data: UserEarning[] | null = await res.json();

    return data || [];
  } catch (e) {
    // console.log('Failed to get total earnings', e);
    return [];
  }
};
