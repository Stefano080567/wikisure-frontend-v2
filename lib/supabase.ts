import { createClient } from '@supabase/supabase-js';

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const supabase = createClient(requiredEnv('SUPABASE_URL'), requiredEnv('SUPABASE_SERVICE_ROLE_KEY'));

export async function logVersion({ term, code }) {
  const { error } = await supabase.from('versions').insert([{ term, code }]);
  if (error) console.error('Supabase insert error:', error.message);
  return { success: !error };
}
