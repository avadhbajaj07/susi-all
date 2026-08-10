import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:Not1just%25maddy@db.bszyzttyashekzqmehxg.supabase.co:5432/postgres";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

export async function queryDb(text: string, params?: any[]) {
  const p = getDbPool();
  return p.query(text, params);
}
