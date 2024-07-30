import { clsx, type ClassValue } from 'clsx';
import crypto, { BinaryLike } from 'crypto';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { REGEX_CODES } from './constants';
import { CampaignTags } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWalletAddress(
  address: `0x${string}`,
  type: 'short' | 'long' = 'long'
) {
  const shortAddress =
    type === 'long'
      ? address.slice(0, 7) + '...' + address.slice(-5)
      : address.slice(0, 8);
  return shortAddress;
}

export async function uploadToCloudinary(files: FileList | string[]) {
  const formData = new FormData();

  const upload: (file: File) => Promise<string> = async (file) => {
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
    formData.append(
      'folder',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER as string
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    if (data?.error) {
      throw new Error('Failed to upload file');
    }

    return data?.secure_url;
  };

  const itu = Array.from(files as FileList).map(async (file) => {
    const res = await upload(file as unknown as File);
    return res;
  });

  const tromise = await Promise.all(itu);

  return tromise;
}

export async function deleteFromCloudinary(image: string) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;

  const getPublicIdFromUrl = (src: string) => {
    const parts = src.split('/');
    const filename = parts[parts.length - 1];

    const final = filename?.split('.')[0];
    return final
      ? `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER as string}/${final}`
      : null;
  };

  const publicId = getPublicIdFromUrl(image);

  if (!publicId) throw new Error('Public ID not found');

  const generateSHA1 = (data: BinaryLike) => {
    const hash = crypto.createHash('sha1');
    hash.update(data);
    return hash.digest('hex');
  };

  const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const config = {
    public_id: publicId as string,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
    timestamp: new Date().getTime(),
    resource_type: 'image',
    signature: generateSHA1(
      generateSignature(
        publicId,
        process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
      )
    ),
  };

  const formData = new FormData();

  Object.entries(config).forEach((item) =>
    formData.append(item[0], String(item[1]))
  );

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  const erroredOut = data.errors;

  console.log({ publicId, data });

  if (erroredOut) {
    throw new Error('Failed to delete image');
  }

  return { ok: !erroredOut };
}

export function GET_CREATE_CAMPAIGN_FORM_SCHEMA(
  verifiedAddress: boolean = false
) {
  return z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(5, { message: 'Campaign title must be more than 4 characters' }),
    type: z.enum(['personal', 'others'] as const, {
      required_error: 'Type is required',
    }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(11, { message: 'Description must be more than 10 characters' }),
    goal: z
      .number({
        required_error: 'Enter amount in ETH',
        invalid_type_error: 'Enter a number',
      })
      .min(0.00001, { message: 'Amount cannot be less than 0.00001 ETH' })
      .max(verifiedAddress ? 100000 : 2, {
        message: verifiedAddress
          ? 'Enter an amount less than 1000000 ETH'
          : 'Verify your creator account to exceed 2ETH limit',
      }),
    beneficiaryAddress: z
      .string({
        required_error: 'Beneficiary address is required',
      })
      .regex(REGEX_CODES.walletAddress, {
        message: 'Enter a valid wallet address',
      })
      .optional(),
    creatorFee: z
      .number({ required_error: 'Enter amount in ETH' })
      .min(0.00001, { message: 'Amount cannot be less than 0.0001 ETH' })
      .max(2, { message: 'Amount cannot be more than 2 ETH' })
      .optional(),
    tag: z
      .enum([
        CampaignTags['Arts and Culture'],
        CampaignTags['Business and Entrepreneurship'],
        CampaignTags['Community and Social Impact'],
        CampaignTags['Education and Learning'],
        CampaignTags['Entertainment and Media'],
        CampaignTags['Environment and Sustainability'],
        CampaignTags['Health and Wellness'],
        CampaignTags['Lifestyle and Hobbies'],
        CampaignTags.Others,
        CampaignTags['Science and Research'],
        CampaignTags['Technology and Innovation'],
      ])
      .refine((value) => value, {
        message: 'Select a campaign tag from the list.',
      }),
    banner: z.any().refine((file) => file?.length == 1, 'Banner is required.'),
    otherImages: z.any(),
    ytLink: z
      .string()
      .regex(REGEX_CODES.ytLink, { message: 'Enter a valid youtube link' })
      .optional(),
    video_file: z.any(),
  });
}

export function GET_EDIT_CAMPAIGN_FORM_SCHEMA(
  verifiedAddress: boolean = false
) {
  return z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(5, { message: 'Campaign title must be more than 4 characters' }),
    type: z.enum(['personal', 'others'] as const, {
      required_error: 'Type is required',
    }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(11, { message: 'Description must be more than 10 characters' }),
    goal: z
      .number({
        required_error: 'Enter amount in ETH',
        invalid_type_error: 'Enter a number',
      })
      .min(0.00001, { message: 'Amount cannot be less than 0.00001 ETH' })
      .max(verifiedAddress ? 100000 : 2, {
        message: verifiedAddress
          ? 'Enter an amount less than 1000000 ETH'
          : 'Verify your creator account to exceed 2ETH limit',
      }),
    beneficiaryAddress: z
      .string({
        required_error: 'Beneficiary address is required',
      })
      .regex(REGEX_CODES.walletAddress, {
        message: 'Enter a valid wallet address',
      })
      .optional(),
    creatorFee: z
      .number({ required_error: 'Enter amount in ETH' })
      .min(0.00001, { message: 'Amount cannot be less than 0.0001 ETH' })
      .max(2, { message: 'Amount cannot be more than 2 ETH' })
      .optional(),
    tag: z
      .enum([
        CampaignTags['Arts and Culture'],
        CampaignTags['Business and Entrepreneurship'],
        CampaignTags['Community and Social Impact'],
        CampaignTags['Education and Learning'],
        CampaignTags['Entertainment and Media'],
        CampaignTags['Environment and Sustainability'],
        CampaignTags['Health and Wellness'],
        CampaignTags['Lifestyle and Hobbies'],
        CampaignTags.Others,
        CampaignTags['Science and Research'],
        CampaignTags['Technology and Innovation'],
      ])
      .refine((value) => value, {
        message: 'Select a campaign tag from the list.',
      }),
    banner: z.any(),
    otherImages: z.any(),
    ytLink: z
      .string()
      .regex(REGEX_CODES.ytLink, { message: 'Enter a valid youtube link' })
      .optional(),
  });
}

export const createUrl = (file: File) => {
  const newURL = URL.createObjectURL(file);
  return newURL;
};

export function getRelativeTime(date: Date): string {
  const formattedtDate = dayjs(date);

  const currentDate = dayjs();

  const diffInDays = currentDate.diff(formattedtDate, 'day');
  const diffInMinutes = currentDate.diff(formattedtDate, 'minute');

  if (diffInMinutes < 1) {
    return 'Just now';
  }

  if (diffInMinutes <= 5) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  // Using 'day' and 'hour' differences to determine today and yesterday
  if (currentDate.isSame(formattedtDate, 'day')) {
    return `Today, ${formattedtDate.format('h:mm a')}`;
  }

  if (currentDate.subtract(1, 'day').isSame(formattedtDate, 'day')) {
    return `Yesterday, ${formattedtDate.format('h:mm a')}`;
  }

  if (diffInDays <= 7) {
    return `${formattedtDate.format('dddd')}, ${formattedtDate.format(
      'h:mm a'
    )}`;
  }

  return `${formattedtDate
    .toDate()
    .toLocaleDateString()} • ${formattedtDate.format('h:mm a')}`;
}
