# Database Setup

This Next.js app is configured to use PostgreSQL with Supabase.

## Environment Setup

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

## Database Commands

- Generate migrations: `npm run db:generate`
- Run migrations: `npm run db:migrate`
- Push schema changes directly: `npm run db:push`
- Open Drizzle Studio: `npm run db:studio`

## Local Development

1. Set up your environment variables
2. Run `npm run db:push` to create the initial schema
3. Start the development server with `npm run dev`

## Vercel Deployment

Add the following environment variables to your Vercel project:
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`