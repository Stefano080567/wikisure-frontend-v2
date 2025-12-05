# 🧠 GPT Dev Agent (WikiSure Edition)

This is a production-ready GPT Dev Agent frontend builder for SynsureTech × WikiSure.

## 📦 Setup

```bash
npm install
cp .env.example .env.local
# Fill in your OpenAI, Notion, Supabase credentials
npm run dev
```

### ✅ Routes

| Route                            | Description                        |
|----------------------------------|------------------------------------|
| `/wikisure-v2/dev-agent`        | GPT Dev Agent (core UI)            |
| `/wikisure-v2/lovable-agent`    | Lovable-wrapped UI (Bible.css)     |
| `/api/gpt/build-component`      | POST → Build React code from prompt |
| `/api/gpt/improve`              | POST → Improve submitted code       |
| `/api/gpt/openai`               | POST → GPT-4 raw OpenAI route       |
| `/api/test/push-notion`         | GET → Save test entry to Notion     |

## 🔧 Environment

```env
OPENAI_API_KEY=sk-...
NOTION_API_KEY=...
NOTION_DATABASE_ID=...
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

## 💾 Features

- 🧠 GPT Builder + Improver
- 💾 Notion save
- 📚 Supabase versioning
- 📦 Lovable UI + Bible.css style
- ✅ CI pipeline + Playwright test

