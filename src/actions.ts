'use server';

import parse from 'node-html-parser';

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

export const handlePushComment = async ({
  ethAddress,
  campaignId,
  comment,
}: {
  ethAddress: `0x${string}`;
  campaignId: number;
  comment: string;
}) => {
  const commentData = { campaignId, comment, ethAddress };
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
