-- Create table for version logging
create table versions (
  id uuid default gen_random_uuid() primary key,
  term text not null,
  code text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Optional: enable RLS if needed
-- alter table versions enable row level security;
