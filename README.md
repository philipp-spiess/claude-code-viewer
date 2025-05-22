# Claude History Viewer - Project Summary

## 🚀 What We Built

A complete monorepo application for uploading and viewing Claude Code transcripts online:

### 1. **CLI Uploader** (`/apps/uploader`)
- Interactive CLI tool that scans `~/.claude/projects/` for transcript files
- Shows chronologically sorted list with date, project path, and summary
- Uploads selected transcripts to the viewer backend
- Built with TypeScript, Commander, Inquirer, and Chalk

### 2. **Next.js Viewer** (`/apps/viewer`)
- Web application to view uploaded transcripts
- Dynamic route `/:id` for each transcript
- Beautiful rendering of conversations with:
  - User and assistant messages
  - Tool usage (commands, file operations)
  - Syntax highlighting for code blocks
  - Copy buttons for code
  - Collapsible sections for tool results
- Built with Next.js 15, Tailwind CSS, and React 19
- PostgreSQL database via Supabase/Drizzle ORM

### 3. **Shared Package** (`/packages/shared`)
- Minimal shared types and utilities
- Project path parser
- Summary extractor
- API endpoint constants

## 📁 Project Structure

```
claude-viewer/
├── apps/
│   ├── uploader/       # CLI tool
│   └── viewer/         # Next.js web app
├── packages/
│   └── shared/         # Shared utilities
├── pnpm-workspace.yaml # Workspace configuration
├── biome.json         # Linting configuration
├── tsconfig.json      # TypeScript config
└── vitest.config.ts   # Test configuration
```

## 🛠️ Tech Stack

- **Monorepo**: pnpm workspaces
- **CLI**: TypeScript, Commander, Inquirer
- **Web**: Next.js 15, React 19, Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle
- **Linting**: Biome
- **Testing**: Vitest

## 🚦 Getting Started

### 1. Setup Database

Create a `.env.local` file in `/apps/viewer` with your database credentials:

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Database Migrations

```bash
cd apps/viewer
pnpm db:migrate
```

### 4. Start the Viewer

```bash
cd apps/viewer
pnpm dev
```

### 5. Use the CLI Uploader

```bash
cd apps/uploader
pnpm build
node dist/index.js
```

## 🎯 Features

- **Smart Transcript Discovery**: Automatically finds all Claude transcripts
- **Interactive Selection**: Easy-to-use CLI interface
- **Beautiful Rendering**: Clean, readable transcript viewer
- **Code Highlighting**: Syntax highlighting for all code blocks
- **Tool Usage Display**: Clear visualization of CLI commands and file operations
- **Responsive Design**: Works on desktop and mobile
- **Fast Performance**: Optimized for large transcripts

## 🔧 Development

- Run tests: `pnpm test`
- Lint code: `pnpm lint`
- Build all packages: `pnpm build`

## 🚀 Deployment

The viewer is ready for deployment on Vercel with Supabase:

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## 📝 Notes

- Transcripts are stored as JSONL blobs in the database
- The viewer parses and renders them on-demand
- No authentication is currently implemented (transcripts are public by ID)
- The system handles large transcripts efficiently

---

The project is fully functional and ready for use! 🎉