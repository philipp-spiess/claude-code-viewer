# Claude Transcript Uploader

A CLI tool for uploading Claude conversation transcripts to the viewer application.

## Installation

From the monorepo root:

```bash
pnpm install
pnpm build
```

## Usage

### Upload a transcript

The default command scans your `~/.claude/projects/` directory and presents an interactive list of transcripts:

```bash
pnpm claude-upload
```

Or explicitly use the upload command:

```bash
pnpm claude-upload upload
```

### Override server URL

```bash
pnpm claude-upload upload --server https://your-server.com
```

### Configure default server

```bash
pnpm claude-upload config
```

## Features

- 📁 Automatically scans `~/.claude/projects/` for transcript files
- 📅 Sorts transcripts by date (newest first)
- 🎨 Color-coded interactive selection
- 📊 Shows file size and summary for each transcript
- ⚡ Fast upload with progress indication
- 🔧 Configurable server URL
- 💾 Persistent configuration in `~/.claude-viewer/config.json`

## Development

Run in development mode:

```bash
pnpm dev
```

Build the project:

```bash
pnpm build
```

## Configuration

The uploader stores its configuration in `~/.claude-viewer/config.json`:

```json
{
  "serverUrl": "http://localhost:3000"
}
```

You can modify this file directly or use the `config` command.