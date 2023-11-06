import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tw-merge';

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(...input));
}
