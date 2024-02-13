'use server';

import parse from 'node-html-parser';
import toast from 'react-hot-toast';
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

export const getCampaigns = async (page?: number) => {
  const res = await fetch(
    `${process.env.ETH_FUND_ENDPOINT}/api/campaigns/?page=${page ?? 1}`,
    { cache: 'no-store' }
  );
  const data = await res.json();

  const campaigns: Campaign[] = data.campaigns;
  const totalCampaigns: number = data.meta.totalCampaigns;

  return { campaigns: campaigns as Campaign[], totalCampaigns };
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

  const user: User = data;

  return user ?? null;
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
    toast.error('Failed to update profile');
    throw new Error('Failed to update profile');
  }
  return resData;
};
