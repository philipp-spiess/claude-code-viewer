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

# In apps/storage:
npm run dev          # Start storage worker development server
```

**Testing:**
```bash
pnpm test            # Run unit tests with Vitest
pnpm lint            # Lint codebase with Biome
./run-test.sh        # Run automated E2E tests
```

**Storage Worker Deployment:**
```bash
# In apps/storage:
npm run deploy:production  # Deploy storage worker to Cloudflare
```

## Architecture

This is a monorepo for uploading and viewing Claude Code transcripts. It consists of:

1. **apps/uploader**: CLI tool that scans `~/.claude/projects/` for JSONL transcript files and uploads them directly to the cloud storage worker. Uses Commander for CLI structure and Inquirer for interactive prompts.

2. **apps/viewer**: Next.js 15 web application with:
   - No database - fetches transcripts directly from cloud storage worker
   - No API routes - frontend uploads and fetches directly from storage worker
   - Dynamic rendering of Claude messages with syntax highlighting
   - Components for different message types (UserMessage, AssistantMessage, ToolUse)

3. **apps/storage**: Cloudflare Worker deployed at `https://claude-code-storage.remote.workers.dev` that:
   - Stores transcript files in Cloudflare R2 bucket
   - Provides GET `/{id}` and POST `/{id}` endpoints for transcript storage/retrieval
   - Includes debug endpoint for listing all transcripts

4. **packages/shared**: Common types and utilities shared between apps, including API endpoints and transcript parsing logic.

The system flow is: CLI scans local transcripts → user selects one → CLI uploads directly to storage worker → user views via Next.js app that fetches from storage worker at `/{id}` route.

**Storage Worker Endpoints:**
- **Production**: `https://claude-code-storage.remote.workers.dev`
- **POST** `/{id}`: Store transcript with metadata
- **GET** `/{id}`: Retrieve transcript and metadata  
- **GET** `/debug/list?password=<password>`: List all transcript IDs