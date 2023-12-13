import { Database } from '@/types/db';
import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect } from 'kysely';

export async function getCampaigns() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });

  const campaignsQuery = db
    .selectFrom('campaign')
    .selectAll()
    .orderBy('created_at desc');
  const campaigns = await campaignsQuery.execute();

  await pool.end();
  return campaigns;
}
