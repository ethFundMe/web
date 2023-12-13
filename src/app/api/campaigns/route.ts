export const runtime = 'edge';

import type { Database, NewCampaign } from '@/types/db';
import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect } from 'kysely';
import { ValidationError, array, bool, number, object, string } from 'yup';

const campaignSchema = object({
  campaign_id: number().required('No campaign id provided.'),
  beneficiary: string().required('No beneficiary address provided.'),
  creator: string().required('No creator address provided.'),
  date_created: number().required('Provide the date created.'),
  description: string().optional().default(''),
  flagged: bool().default(false),
  goal: number().default(0),
  is_closed: bool().default(false),
  links: array().of(string()),
  title: string().required('No campaign title provided.'),
  total_accrued: number().default(0),
});

export async function POST(req: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });

  try {
    const campaign = (await req.json()) as NewCampaign;
    await campaignSchema.validate(campaign, { strict: true });

    const createCampaignQuery = db
      .insertInto('campaign')
      .values(campaign)
      .returning(['campaign_id']);
    const campaignId = await createCampaignQuery.executeTakeFirstOrThrow();

    await pool.end();

    return Response.json(campaignId);
  } catch (error) {
    console.error('Failed to create campaign: ', error);
    if (error instanceof ValidationError) {
      return Response.json(
        {
          message: error.errors,
        },
        { status: 400 }
      );
    }
    return Response.json(
      { error: 'Failed to create campaign.' },
      { status: 500 }
    );
  }
}
