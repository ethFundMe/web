'use server';

import parse from 'node-html-parser';
import { Campaign, User, UserEarning } from './types';

export async function urlPreview(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw Error();

    const data = await res.text();
    const doc = parse(data);

    const title = doc.querySelector('title')?.textContent ?? '';
    const description =
      doc.querySelector('meta[name="description"]')?.getAttribute('content') ??
      '';
    const image =
      doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ??
      '';

    if (!title)
      return {
        error: true,
        message: 'Failed to fetch URL data',
        urlData: null,
      };

    return {
      message: 'Fetched URL data',
      error: false,
      urlData: { image, title, description },
    };
  } catch (error) {
    return { error: true, message: 'Failed to fetch URL data', urlData: null };
  }
}

export type CampaignUrlParams = {
  [key: string]: string | number | undefined;
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

export const getCampaign = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/campaign/${id}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  const campaign: Campaign = data;

  return campaign ?? null;
};

export const getUser = async (userId: `0x${string}`) => {
  const res = await fetch(
    `${process.env.ETH_FUND_ENDPOINT}/api/user/${userId}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  const user = data;

  return user?.error ? null : (user as User);
};

export const updateUser = async (userDetails: {
  ethAddress: `0x${string}`;
  email: string;
  fullName: string;
  bio?: string;
  bannerUrl?: string;
  profileUrl?: string;
}) => {
  const userData = {
    email: userDetails.email,
    eth_address: userDetails.ethAddress,
    full_name: userDetails.fullName,
    bio: userDetails.bio,
    bannerUrl: userDetails.bannerUrl,
    profileUrl: userDetails.profileUrl,
  };

  const res = await fetch(`${process.env.ETH_FUND_ENDPOINT}/api/user`, {
    body: JSON.stringify(userData),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();

  const resData: User = data;

  if (data.error) {
    throw new Error('Failed to update profile');
  }

  return resData;
};

export const handlePushComment = async ({
  userID,
  campaignID,
  comment,
}: {
  userID: string;
  campaignID: string;
  comment: string;
}) => {
  try {
    const res = await fetch(`${process.env.ETH_FUND_ENDPOINT}/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment,
        userID,
        campaignID,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data?.error) throw new Error(data.error[0].message);

    console.log({ data, ress: res.ok });

    return data as number;
  } catch (e) {
    console.log({ e });
    return { error: e as string };
  }
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

export const fetchTotalUserEarnings = async (ethAddress: `0x${string}`) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/user/token_overview/${ethAddress}`,
      { headers: { accept: '*/*' } }
    );
    const data: { total: string; max: string; min: string } | null =
      await res.json();

    return data;
  } catch (e) {
    // console.log('Failed to get total earnings', e);
    return null;
  }
};

export const handleIPFSPush = async function ({
  title,
  bannerUrl,
  youtubeLink,
  mediaLinks,
  description,
  tag,
}: {
  title: string;
  description: string;
  youtubeLink: string | undefined;
  bannerUrl: string;
  mediaLinks: string[];
  tag: number;
}) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT as string
      }/api/campaign/metadata`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          youtubeLink,
          bannerUrl,
          mediaLinks,
          tag,
        }),
      }
    );
    const data: { hash?: string; error?: { message: string }[] } =
      await res.json();

    if (!data?.hash && data?.error) throw new Error(data.error[0]?.message);

    return data;
  } catch (e) {
    return null;
  }
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

export async function handleVerificationRequest({
  userId,
  fullName,
  email,
  phoneNumber,
  agree,
}: {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  agree: boolean;
}) {
  const body = JSON.stringify({ userId, fullName, email, phoneNumber, agree });
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/verification`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
    );
    const data = await res.json();

    if (
      (data?.error as string) &&
      data?.error.includes('Pending request already exists')
    )
      throw new Error('Already applied for verification');
    if (data.error) throw new Error(data.error);

    return { success: true, message: 'Successfully applied for verification' };
  } catch (e) {
    if (e instanceof Error) {
      // console.log(e);
      return { success: false, message: e.message };
    }
    return { success: false, message: e };
  }
}
