# Claude Viewer Testing Summary

## Quick Start Options

### Option 1: Automated Testing Script
```bash
./run-test.sh
```
This script will:
- Check prerequisites
- Install dependencies
- Verify database configuration
- Run migrations
- Build the uploader
- Start the viewer server
- Configure the uploader

### Option 2: Local PostgreSQL Setup
```bash
./test-local.sh
```
Choose option 1 for full automated setup with local PostgreSQL.

### Option 3: Manual Setup with Supabase
1. Create a Supabase account and project
2. Copy credentials to `apps/viewer/.env.local`
3. Follow the steps in `TESTING_GUIDE.md`

## Test Flow

1. **Database Setup**: Configure either Supabase or local PostgreSQL
2. **Run Migrations**: `cd apps/viewer && pnpm run db:push`
3. **Start Viewer**: `cd apps/viewer && pnpm run dev`
4. **Build Uploader**: `cd apps/uploader && pnpm run build`
5. **Configure API**: `cd apps/uploader && pnpm run claude-viewer config set apiUrl http://localhost:3000/api`
6. **Upload Transcript**: `cd apps/uploader && pnpm run claude-viewer upload`
7. **View Result**: Open the provided URL in your browser

## Files Created for Testing

- `TESTING_GUIDE.md` - Comprehensive testing guide
- `TESTING_CHECKLIST.md` - Step-by-step checklist
- `test-local.sh` - Local PostgreSQL setup script
- `run-test.sh` - Automated testing script
- `apps/viewer/.env.local` - Database configuration (needs your credentials)

## Next Steps

1. Choose a database option (Supabase or local PostgreSQL)
2. Run one of the testing scripts
3. Upload a transcript and verify it displays correctly
4. Take screenshots of the working application

## Known Issues Fixed

- Updated uploader CLI command from `claude-upload` to `claude-viewer`
- Added npm script alias for easier testing
- Created `.env.local` template with instructions

The system is now ready for end-to-end testing!