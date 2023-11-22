import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tw-merge';

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(...input));
}

export function formatWalletAddress(address: `0x${string}`) {
  const shortAddress = address.slice(0, 3) + '...' + address.slice(-3);
  return shortAddress;
}
