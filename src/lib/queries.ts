import { Campaign } from '@/types/db';
import { cache } from 'react';

export const GET_CAMPAIGNS = cache(async (): Promise<Campaign[]> => {
  const response = await fetch('http://localhost:3000/api/campaigns');
  const data = await response.json();

  return data;
});
