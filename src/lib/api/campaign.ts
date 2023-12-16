import { Database } from '@/types/db';
import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect } from 'kysely';

export async function getCampaigns() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });

  const campaignsQuery = db
    .selectFrom('campaigns')
    .selectAll()
    .orderBy('created_at desc');
  const campaigns = await campaignsQuery.execute();

  await pool.end();
  return campaigns;
}

export async function getCampaign(id: number) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });

  const campaignsQuery = db
    .selectFrom('campaigns')
    .selectAll()
    .where('campaign_id', '=', id);

  const campaign = await campaignsQuery.execute();

  await pool.end();
  return campaign[0];
}

export async function getUserCampaigns(id: string) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });

  const campaignsQuery = db
    .selectFrom('campaigns')
    .selectAll()
    .where('creator', '=', id);

  const campaign = await campaignsQuery.execute();

  await pool.end();
  return campaign;
}
