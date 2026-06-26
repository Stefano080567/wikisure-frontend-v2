# WikiSure E2E

Run the authenticated E2E suite with:

```bash
npm run test:e2e
```

Authentication is created by `auth.setup.ts` with Supabase `signInWithPassword`.
The resulting Playwright storage state is written to `tests/e2e/.auth/storageState.json`.

Required local environment variables:

```bash
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

`SUPABASE_AUTH_EMAIL` and `SUPABASE_AUTH_PASSWORD` are optional. If they are missing, the setup uses a deterministic E2E account and creates or resets it with the service role key.
