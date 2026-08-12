import { createClient } from "@supabase/supabase-js";

const DEFAULT_URL = "https://bszyzttyashekzqmehxg.supabase.co";
const DEFAULT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzenl6dHR5YXNoZWt6cW1laHhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAwNDI4NiwiZXhwIjoyMTAxNTgwMjg2fQ.XNR9JAKg6ZZubrMpH5lyN3A0_f8lpubWyJ8qTfrQDSM";

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_KEY;
  return createClient(url, key);
}
