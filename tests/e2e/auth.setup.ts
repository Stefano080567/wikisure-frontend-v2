import { test as setup } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

const authFile = path.join(__dirname, '.auth', 'storageState.json');

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (!match || process.env[match[1]] !== undefined) continue;

    const value = match[2].trim().replace(/^['"]|['"]$/g, '');
    process.env[match[1]] = value;
  }
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  if (/your-|change-me|\.\.\./i.test(value)) throw new Error(`Replace placeholder value for ${name} before running E2E tests.`);
  return value;
}

async function ensureUserExists(supabaseUrl: string, serviceRoleKey: string | undefined, email: string, password: string) {
  if (!serviceRoleKey) return;

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (!error) return;

  if (!/already|registered|exists/i.test(error.message)) {
    throw error;
  }

  const { data: users, error: listError } = await adminClient.auth.admin.listUsers();
  if (listError) throw listError;

  const user = users.users.find((candidate) => candidate.email?.toLowerCase() === email.toLowerCase());
  if (!user) throw error;

  const { error: updateError } = await adminClient.auth.admin.updateUserById(user.id, {
    password,
  });
  if (updateError) throw updateError;
}

setup('authenticate with Supabase', async () => {
  loadEnvFile(path.resolve(process.cwd(), '.env.local'));
  loadEnvFile(path.resolve(process.cwd(), '.env'));

  const origin = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';
  const supabaseUrl = requiredEnv('SUPABASE_URL');
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.SUPABASE_AUTH_EMAIL ?? process.env.E2E_EMAIL ?? (serviceRoleKey ? 'wikisure-e2e@example.com' : undefined);
  const password = process.env.SUPABASE_AUTH_PASSWORD ?? process.env.E2E_PASSWORD ?? (serviceRoleKey ? 'WikisureE2E!2026' : undefined);
  const authKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? serviceRoleKey;

  if (!email) throw new Error('Missing SUPABASE_AUTH_EMAIL or E2E_EMAIL.');
  if (!password) throw new Error('Missing SUPABASE_AUTH_PASSWORD or E2E_PASSWORD.');
  if (!authKey) throw new Error('Missing SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY.');

  await ensureUserExists(supabaseUrl, serviceRoleKey, email, password);

  const supabase = createClient(supabaseUrl, authKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.session) throw new Error('Supabase login succeeded without returning a session.');

  const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
  const storageKey = `sb-${projectRef}-auth-token`;

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  fs.writeFileSync(
    authFile,
    JSON.stringify(
      {
        cookies: [],
        origins: [
          {
            origin,
            localStorage: [
              {
                name: storageKey,
                value: JSON.stringify(data.session),
              },
            ],
          },
        ],
      },
      null,
      2,
    ),
  );
});
