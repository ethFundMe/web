import { Campaign } from '@/types/db';

export async function GET_CAMPAIGNS(): Promise<Campaign[]> {
  const response = await fetch('http://localhost:3000/api/campaigns');
  const data = await response.json();

  return data;
}
