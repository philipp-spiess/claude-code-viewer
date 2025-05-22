# Claude Viewer Testing Checklist

## Quick Start Testing

### For Supabase Users:
1. **Set up Supabase** (5 minutes)
   - [ ] Create account at https://supabase.com
   - [ ] Create new project
   - [ ] Copy credentials to `apps/viewer/.env.local`

2. **Initialize Database**
   ```bash
   cd apps/viewer
   pnpm install
   pnpm run db:push
   ```

3. **Start Viewer**
   ```bash
   pnpm run dev
   ```

4. **Test Upload**
   ```bash
   cd ../uploader
   pnpm install
   pnpm run build
   pnpm run claude-viewer config set apiUrl http://localhost:3000/api
   pnpm run claude-viewer upload
   ```

### For Local PostgreSQL Users:
1. **Run the test script**
   ```bash
   ./test-local.sh
   ```
   Select option 1 for full setup

## Manual Testing Steps

### 1. Database Setup Verification
- [ ] Database connection successful
- [ ] `transcripts` table created
- [ ] Can connect via `pnpm run db:studio`

### 2. Viewer Server Testing
- [ ] Server starts on port 3000
- [ ] Homepage loads at http://localhost:3000
- [ ] No console errors on load
- [ ] API endpoint responds at http://localhost:3000/api/transcripts

### 3. Uploader CLI Testing
- [ ] CLI builds successfully
- [ ] `claude-viewer` command is available
- [ ] Config command works: `claude-viewer config`
- [ ] Upload command shows transcript list
- [ ] Can select and upload a transcript
- [ ] Receives UUID and view URL after upload

### 4. Transcript Viewing
- [ ] Transcript loads at http://localhost:3000/{uuid}
- [ ] Messages display in correct order
- [ ] User messages styled differently from assistant messages
- [ ] Code blocks have syntax highlighting
- [ ] Tool usage is properly displayed
- [ ] Long messages scroll properly
- [ ] Page is responsive on mobile sizes

### 5. Error Handling
- [ ] 404 page for non-existent transcripts
- [ ] Graceful handling of malformed transcript data
- [ ] Proper error messages for upload failures
- [ ] Database connection errors are logged

### 6. Performance Testing
- [ ] Small transcripts load quickly (< 1s)
- [ ] Large transcripts load reasonably (< 5s)
- [ ] No memory leaks on repeated page loads
- [ ] Code highlighting doesn't block rendering

## Common Issues and Solutions

### Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### Database Connection Failed
- Check PostgreSQL is running: `pg_isready`
- Verify connection string in `.env.local`
- For Supabase, ensure project is fully provisioned

### Upload Fails with 404
- Verify viewer server is running
- Check API URL configuration: `claude-viewer config get apiUrl`
- Ensure it points to `http://localhost:3000/api`

### Transcript Not Rendering
- Check browser console for errors
- Verify transcript data in database
- Check Next.js server logs for errors

## Screenshot Testing

Take screenshots of:
1. [ ] Transcript list in CLI
2. [ ] Successful upload message
3. [ ] Rendered transcript in browser
4. [ ] Code block with syntax highlighting
5. [ ] Tool usage display
6. [ ] Mobile responsive view

## Final Verification

- [ ] Complete flow works end-to-end
- [ ] No errors in server logs
- [ ] No errors in browser console
- [ ] Performance is acceptable
- [ ] UI is polished and professional