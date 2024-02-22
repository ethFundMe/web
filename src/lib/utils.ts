import { clsx, type ClassValue } from 'clsx';
import { parse } from 'node-html-parser';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { REGEX_CODES } from './constants';
import { CampaignTags } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWalletAddress(address: `0x${string}`) {
  const shortAddress = address.slice(0, 7) + '...' + address.slice(-5);
  return shortAddress;
}

export async function fetchUrlData(url: string) {
  const response = await fetch(url, { mode: 'no-cors' });
  const data = await response.text();

  const doc = parse(data);
  const title = doc.querySelector('title')?.textContent ?? '';
  const description =
    doc.querySelector('meta[name="description"]')?.getAttribute('content') ??
    '';
  const image =
    doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ??
    '';

  return { image, title, description };
}

export async function uploadToCloudinary(files: FileList | string[]) {
  const formData = new FormData();

  const upload: (file: File) => Promise<string> = async (file) => {
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
    formData.append('folder', 'campaign_media');

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

    return data?.url;
  };

  const itu = Array.from(files as FileList).map(async (file) => {
    const res = await upload(file as unknown as File);
    return res;
  });

  const tromise = await Promise.all(itu);

  return tromise;
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
      .number({ required_error: 'Enter amount in ETH' })
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
    tag: z.enum([
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
    ]),
    banner: z.any().refine((file) => file?.length == 1, 'Banner is required.'),
    // .refine((files) => files?.[0]?.size >= 500000, 'Max file size is 5MB.')
    // .refine(
    //   (files) =>
    //     ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
    //       files?.[0]?.type
    //     ),
    //   '.jpg, .jpeg, .png and .webp files are accepted.')
    otherImages: z.any(),
    // .refine((files) => files?.[0]?.size >= 500000, 'Max file size is 5MB.')
    // .refine(
    //   (files) =>
    //     ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
    //       files?.[0]?.type
    //     ),
    //   '.jpg, .jpeg, .png and .webp files are accepted.'
    // )
    ytLink: z
      .string()
      .regex(REGEX_CODES.ytLink, { message: 'Enter a valid youtube link' })
      .optional(),
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
      .number({ required_error: 'Enter amount in ETH' })
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
    tag: z.enum([
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
    ]),
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
