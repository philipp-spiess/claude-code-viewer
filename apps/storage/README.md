# Claude Code Storage Worker

A Cloudflare Worker service for storing and retrieving Claude Code transcript files using R2 object storage.

## Features

- **GET /<id>**: Retrieve a transcript by UUID
- **POST /<id>**: Create or update a transcript with metadata (JSON format with JSONL transcript)
- **GET /debug/list?password=<password>**: List all transcript IDs (password protected)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your R2 bucket:
   ```bash
   wrangler r2 bucket create claude-code-transcripts
   ```

3. Set environment variables:
   ```bash
   wrangler secret put DEBUG_PASSWORD
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Deployment

Deploy to production:
```bash
npm run deploy:production
```

## Environment Variables

- `DEBUG_PASSWORD`: Password for the debug endpoint to list all transcripts

## R2 Bucket Configuration

The worker expects an R2 bucket binding named `TRANSCRIPTS_BUCKET` pointing to the `claude-code-transcripts` bucket.

## API Usage

### Store a transcript
```bash
curl -X POST https://your-worker.your-subdomain.workers.dev/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "directory": "/home/user/project",
    "repo": "my-awesome-repo",
    "transcript": "{\"type\":\"message\",\"content\":\"Hello\"}\n{\"type\":\"message\",\"content\":\"World\"}"
  }'
```

### Store a transcript without metadata
```bash
curl -X POST https://your-worker.your-subdomain.workers.dev/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "{\"type\":\"message\",\"content\":\"Hello\"}"
  }'
```

### Retrieve a transcript
```bash
curl https://your-worker.your-subdomain.workers.dev/123e4567-e89b-12d3-a456-426614174000
```

### List all transcripts (debug)
```bash
curl "https://your-worker.your-subdomain.workers.dev/debug/list?password=your-secret-password"
```
