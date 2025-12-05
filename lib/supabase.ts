import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function logVersion({ term, code }) {
  const { error } = await supabase.from('versions').insert([{ term, code }]);
  if (error) console.error('Supabase insert error:', error.message);
  return { success: !error };
}
