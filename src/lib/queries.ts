import { Campaign, User, UserEarning } from '@/types';
import {
  Notification,
  VerificationEligibiltyErrorResponse,
  VerificationEligibiltySuccessResponse,
} from './types';

export const updateUser = async (userDetails: {
  ethAddress: `0x${string}`;
  email: string;
  fullName: string;
  bio?: string;
  bannerUrl?: string;
  profileUrl?: string;
  token: string;
}) => {
  const userData = {
    email: userDetails.email,
    eth_address: userDetails.ethAddress,
    full_name: userDetails.fullName,
    bio: userDetails.bio,
    bannerUrl: userDetails.bannerUrl,
    profileUrl: userDetails.profileUrl,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/user/${userDetails.ethAddress}`,
    {
      body: JSON.stringify(userData),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDetails.token}`,
      },
    }
  );
  const data = await res.json();

  const resData: User = data;

  if (data.error) {
    throw new Error('Failed to update profile');
  }

  // console.log(resData, userDetails.token);

  // throw new Error('Failed to update profile');
  return resData;
};

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
export const fetchNotifications = async (user_address: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/notifications/${user_address}`
    );
    const data: Notification = await res.json();

    return data;
  } catch (e) {
    return [];
  }
};

export async function getCampaigns(urlParams: CampaignUrlParams) {
  const page = urlParams?.page;
  const ethAddress = urlParams?.ethAddress;
  const tagId = urlParams?.tag;

  let baseUrl = `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/campaigns/`;

  baseUrl = ethAddress
    ? `${baseUrl}?creator=${ethAddress}&page=${page ?? 1}`
    : tagId
    ? `${baseUrl}?tag=${tagId}&page=${page ?? 1}`
    : `${baseUrl}?page=${page ?? 1}`;

  const res = await fetch(baseUrl, { cache: 'no-store' });
  const data = await res.json();

  const campaigns: Campaign[] = data.campaigns || [];
  const totalCampaigns: number = data?.meta?.totalCampaigns ?? 0;

  return { campaigns, totalCampaigns };
}

export async function getFeaturedCampaigns() {
  const baseUrl = `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/campaigns/featured`;

  const res = await fetch(baseUrl, { cache: 'no-store' });
  const campaigns: {
    creator: User;
    campaign: Campaign;
  }[] = await res.json();

  return campaigns[0] ? campaigns[0] : null;
}

export const getNotfications = async (eth_address: `0x${string}`) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/notifications/${eth_address}`
  );
  const data = (await res.json()) as {
    notification: Notification[];
    meta: {
      limit: number;
      page: number;
      totalNotifications: number;
      totalPages: number;
    };
  };
  return data;
};

export const getUser = async (userId: `0x${string}`) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/user/${userId}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  const user = data;

  return user?.error ? null : (user[0] as User);
};

export const checkUserVerificationEligibility = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/verification/eligibility/${userId}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  if (data.error) return data as VerificationEligibiltyErrorResponse;
  return data as VerificationEligibiltySuccessResponse;
};

export const getCreatorOverview = async (userId: `0x${string}`) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/creator/overview/${userId}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  return data ? (data as { total: string; max: string; min: string }) : null;
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
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/home/statistics`
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

export const resetUser = async (address: `0x${string}`, token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/reset_user/${address}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (data.error) {
    throw new Error('Failed to update profile');
  }

  return data as { message: string; user: User };
};
