'use server';

import parse from 'node-html-parser';
import { Campaign, User } from './types';

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

export const getCampaigns = async (
  page?: number,
  ethAddress?: `0x${string}`
) => {
  const url = ethAddress
    ? `${
        process.env.ETH_FUND_ENDPOINT
      }/api/campaigns/?creator=${ethAddress}&page=${page ?? 1}`
    : `${process.env.ETH_FUND_ENDPOINT}/api/campaigns/?page=${page ?? 1}`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  const campaigns: Campaign[] = data.campaigns || [];
  const totalCampaigns: number = data?.meta?.totalCampaigns ?? 0;

  return { campaigns, totalCampaigns };
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
