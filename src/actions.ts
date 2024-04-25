'use server';

import parse from 'node-html-parser';
import { Campaign, CampaignTag, User, UserEarning } from './types';

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
  const tagId = urlParams?.tagId;

  console.log({ tagId, page, ethAddress });

  const baseUrl = `${process.env.ETH_FUND_ENDPOINT}/api/campaigns/`;

  ethAddress
    ? `${baseUrl}?creator=${ethAddress}&page=${page ?? 1}`
    : tagId
    ? `${baseUrl}?tag_id=${tagId}&page=${page ?? 1}`
    : `${baseUrl}?page=${page ?? 1}`;

  const res = await fetch(baseUrl, { cache: 'no-store' });
  const data = await res.json();

  console.log({ baseUrl, data });

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
    eth_address: userDetails.ethAddress,
    full_name: userDetails.fullName,
    email: userDetails.email,
    bannerUrl: userDetails.bannerUrl,
    profileUrl: userDetails.profileUrl,
    bio: userDetails.bio,
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/comment`, {
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

    return data;
  } catch (e) {
    console.log(e);

    throw new Error('Failed to add comment');
  }
};

export const fetchCampaignTags = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/tags`
    );
    const data = await res.json();

    return data?.tags ? (data.tags as CampaignTag[]) : [];
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
          Accept: '*/*',
        },
      }
    );
    const data: UserEarning[] | null = await res.json();

    return data || [];
  } catch (e) {
    console.log('Failed to get total earnings', e);
    return [];
  }
};

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
  tag: CampaignTag;
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
    return res.json();
  } catch (e) {
    throw new Error();
  }
};

export const handleIPFSUpdate = async function ({
  title,
  bannerUrl,
  youtubeLink,
  mediaLinks,
  description,
  tag,
  metaId,
}: {
  bannerUrl: string;
  description: string;
  title: string;
  youtubeLink: string | undefined;
  mediaLinks: string[];
  tag: CampaignTag;
  metaId: string;
}) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT as string
      }/api/campaign/metadata/${metaId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
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

    if (!res.ok) throw new Error();

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error();
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
      console.log(e.message);
    }
    return null;
  }
}
