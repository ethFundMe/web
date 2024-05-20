'use server';

import parse from 'node-html-parser';
import { User } from './types';

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
    `${process.env.ETH_FUND_ENDPOINT}/api/user/${userDetails.ethAddress}`,
    {
      body: JSON.stringify(userData),
      method: 'PUT',
      headers: {
        accept: '*/*',
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

export const resetUser = async (address: `0x${string}`, token: string) => {
  const res = await fetch(
    `${process.env.ETH_FUND_ENDPOINT}/api/reset_user/${address}`,
    {
      method: 'PUT',
      headers: {
        accept: '*/*',
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

export const handlePushComment = async ({
  userID,
  campaignID,
  comment,
}: {
  userID: string;
  campaignID: string;
  comment: string;
}) => {
  const commentData = { campaignUUID: campaignID, comment, userId: userID };
  try {
    const res = await fetch(`${process.env.ETH_FUND_ENDPOINT}/api/comment`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data?.error) throw new Error(data.error[0].message);

    return data as number;
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
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

export async function deleteAccount(address: `0x${string}`) {
  try {
    // `${process.env.ETH_FUND_ENDPOINT}/api/user/0xee9718Df51B678653750B0Ae7AB57E9576E56D8b`
    const res = await fetch(
      `${process.env.ETH_FUND_ENDPOINT}/api/user/${address}`,
      { method: 'DELETE' }
    );

    if (res.status === 204)
      return { success: true, message: 'Account deleted' };

    const data: { error?: { name: string; message: string } } =
      await res.json();

    if (data?.error) throw new Error(data.error.message);

    // return {success: true, data}
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
    return { success: false, message: e };
  }
}
