# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development Setup:**
```bash
pnpm install          # Install all dependencies
pnpm build           # Build all packages
```

**Running Services:**
```bash
# In apps/viewer:
pnpm dev             # Start Next.js dev server on port 3000

# In apps/uploader:
pnpm dev             # Run CLI in development mode
```

**Testing:**
```bash
pnpm test            # Run unit tests with Vitest
pnpm lint            # Lint codebase with Biome
./run-test.sh        # Run automated E2E tests
./test-local.sh      # Set up local PostgreSQL for testing
```

**Database:**
```bash
# In apps/viewer:
pnpm db:generate     # Generate Drizzle migrations
pnpm db:migrate      # Apply migrations to database
pnpm db:drop         # Drop all tables
```

## Architecture

This is a monorepo for uploading and viewing Claude Code transcripts. It consists of:

1. **apps/uploader**: CLI tool that scans `~/.claude/projects/` for JSONL transcript files and uploads them to the viewer backend. Uses Commander for CLI structure and Inquirer for interactive prompts.

2. **apps/viewer**: Next.js 15 web application with:
   - PostgreSQL database (via Supabase) with Drizzle ORM
   - API routes at `/api/transcripts` for upload and `/api/transcripts/[id]` for retrieval
   - Dynamic rendering of Claude messages with syntax highlighting
   - Components for different message types (UserMessage, AssistantMessage, ToolUse)

3. **packages/shared**: Common types and utilities shared between uploader and viewer, including API endpoints and transcript parsing logic.

The viewer expects environment variables for database connection:
- `DATABASE_URL`: PostgreSQL connection string
- `DIRECT_URL`: Direct database URL for migrations

The system flow is: CLI scans local transcripts → user selects one → CLI uploads to viewer API → viewer stores in PostgreSQL → user can view at `/{id}` route.