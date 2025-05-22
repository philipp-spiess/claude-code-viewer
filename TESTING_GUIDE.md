# Claude Viewer Testing Guide

This guide will walk you through testing the complete flow from CLI upload to viewing in the browser.

## Prerequisites

1. Node.js and pnpm installed
2. PostgreSQL database (local or Supabase)

## Step 1: Database Setup

### Option A: Using Supabase (Recommended for quick testing)

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project (this takes a few minutes)
3. Once created, go to **Settings > API** in your project dashboard
4. Copy the following values:
   - Project URL (looks like `https://xxxxx.supabase.co`)
   - Anon/Public key
   - Service Role key (under "Service role - secret")
5. Go to **Settings > Database** and copy the connection string

### Option B: Using Local PostgreSQL

1. Install PostgreSQL if not already installed:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   ```

2. Create a database:
   ```bash
   createdb claude_viewer
   ```

3. Use this connection string:
   ```
   postgresql://postgres:postgres@localhost:5432/claude_viewer
   ```

## Step 2: Configure the Viewer App

1. Navigate to the viewer directory:
   ```bash
   cd /home/philipp/dev/claude-viewer/apps/viewer
   ```

2. Edit `.env.local` with your database credentials:
   ```bash
   # If using Supabase, replace the placeholders with your actual values
   # If using local PostgreSQL, uncomment and use the local connection string
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Run database migrations:
   ```bash
   pnpm run db:push
   ```

   This will create the necessary tables in your database.

## Step 3: Start the Viewer Server

1. Start the Next.js development server:
   ```bash
   pnpm run dev
   ```

2. The viewer should now be running at http://localhost:3000

## Step 4: Test the Uploader CLI

1. Open a new terminal and navigate to the uploader directory:
   ```bash
   cd /home/philipp/dev/claude-viewer/apps/uploader
   ```

2. Build the CLI:
   ```bash
   pnpm install
   pnpm run build
   ```

3. Configure the uploader to point to your local viewer:
   ```bash
   pnpm run claude-viewer config set apiUrl http://localhost:3000/api
   ```

4. Run the uploader:
   ```bash
   pnpm run claude-viewer upload
   ```

   This will show you a list of recent Claude transcripts. Select one to upload.

5. After successful upload, you'll receive a UUID and a URL like:
   ```
   Transcript uploaded successfully!
   ID: 3003d7ea-39b2-4b18-95eb-469b6614ea3e
   View at: http://localhost:3000/3003d7ea-39b2-4b18-95eb-469b6614ea3e
   ```

## Step 5: View the Transcript

1. Open the provided URL in your browser
2. You should see the rendered transcript with:
   - User messages
   - Assistant responses
   - Code blocks with syntax highlighting
   - Tool usage details
   - Proper formatting and styling

## Troubleshooting

### Database Connection Issues
- Ensure your database credentials are correct in `.env.local`
- For Supabase, make sure your project is fully provisioned (can take a few minutes)
- Check that the database URL includes the correct port (usually 5432 for PostgreSQL)

### Upload Failures
- Verify the viewer server is running on port 3000
- Check that the API URL is correctly configured in the uploader
- Look at the viewer server logs for any error messages

### Rendering Issues
- Check the browser console for JavaScript errors
- Ensure all dependencies are properly installed
- Verify the transcript data is valid JSONL format

## Testing Checklist

- [ ] Database connection established
- [ ] Tables created successfully via migrations
- [ ] Viewer server starts without errors
- [ ] Uploader CLI shows list of transcripts
- [ ] Upload completes successfully
- [ ] Transcript renders correctly in browser
- [ ] Code blocks have syntax highlighting
- [ ] Tool usage is displayed properly
- [ ] Messages are formatted correctly

## Next Steps

Once basic functionality is confirmed:
1. Test with different transcript types (various tools, code blocks, etc.)
2. Check responsive design on mobile devices
3. Verify performance with large transcripts
4. Test error handling for malformed data