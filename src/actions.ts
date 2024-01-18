'use server';

import parse from 'node-html-parser';
import { Campaign } from './types';

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
    `${process.env.ETH_FUND_ENDPOINT}/api/campaigns/?page=${page ?? 1}`
  );
  const data = await res.json();

  const campaigns: Campaign[] = data.campaigns;
  const totalCampaigns: number = data.meta.totalCampaigns;

  return { campaigns: campaigns as Campaign[], totalCampaigns };
};

export const getCampaign = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/campaign/${id}`
  );
  const data = await res.json();

  const campaign: Campaign = data;

  return campaign ?? null;
};
