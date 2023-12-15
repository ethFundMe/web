import { clsx, type ClassValue } from 'clsx';
import { parse } from 'node-html-parser';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWalletAddress(address: `0x${string}`) {
  const shortAddress = address.slice(0, 3) + '...' + address.slice(-5);
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
