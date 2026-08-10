import { Client, Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:Not1just%25maddy@db.bszyzttyashekzqmehxg.supabase.co:5432/postgres";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 8000,
    });
  }
  return pool;
}

export async function queryDb(text: string, params?: any[]) {
  try {
    const p = getDbPool();
    return await p.query(text, params);
  } catch (err: any) {
    console.warn("Pool query failed, retrying with dedicated Client connection:", err.message);
    const client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });
    await client.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } finally {
      await client.end().catch(() => {});
    }
  }
}
