# Claude History Viewer - Implementation Tasks

## Phase 1: Project Setup and Configuration

### 1.1 Initialize pnpm workspace
- [ ] Create pnpm-workspace.yaml
- [ ] Initialize root package.json with workspace configuration
- [ ] Set up shared TypeScript configuration
- [ ] Set up shared Vitest configuration
- [ ] Install and configure Biome for linting

### 1.2 Create project structure
- [ ] Create /viewer directory for Next.js app
- [ ] Create /uploader directory for CLI app
- [ ] Create /shared directory for shared types and utilities
- [ ] Set up .gitignore for the monorepo

### 1.3 Set up shared dependencies
- [ ] Create shared TypeScript types for transcript data
- [ ] Create shared utilities for parsing JSONL files
- [ ] Create shared constants (API endpoints, etc.)

## Phase 2: CLI Uploader Implementation

### 2.1 Initialize CLI project
- [ ] Set up package.json in /uploader
- [ ] Install CLI dependencies (commander, inquirer, chalk, axios)
- [ ] Create basic CLI structure with TypeScript

### 2.2 Implement transcript discovery
- [ ] Create function to scan ~/.claude/projects/ recursively
- [ ] Parse JSONL files to extract metadata (summary, timestamps, project path)
- [ ] Sort transcripts chronologically by last message timestamp

### 2.3 Implement CLI interface
- [ ] Create interactive selection menu using inquirer
- [ ] Display transcript list with: date, project folder, summary
- [ ] Format output with colors using chalk
- [ ] Handle transcript selection

### 2.4 Implement upload functionality
- [ ] Create HTTP client to upload selected transcript
- [ ] Use existing UUID from filename as identifier
- [ ] Show upload progress and confirmation
- [ ] Handle errors gracefully

### 2.5 Add CLI configuration
- [ ] Add ability to configure server URL
- [ ] Save configuration to ~/.claude-viewer/config.json
- [ ] Add --help and --version commands

## Phase 3: Backend API Implementation

### 3.1 Set up Next.js project
- [ ] Initialize Next.js 14+ with App Router in /viewer
- [ ] Install and configure Tailwind CSS 4
- [ ] Install and configure Drizzle ORM
- [ ] Set up SQLite database for development

### 3.2 Create database schema
- [ ] Design transcript table schema with Drizzle
- [ ] Include fields: id (UUID), content (JSONL), uploadedAt, metadata
- [ ] Create database migrations
- [ ] Set up database connection

### 3.3 Implement upload API endpoint
- [ ] Create POST /api/transcripts endpoint
- [ ] Validate incoming transcript data
- [ ] Store transcript in database
- [ ] Return success/error response

### 3.4 Implement retrieval API
- [ ] Create GET /api/transcripts/[id] endpoint
- [ ] Fetch transcript by UUID
- [ ] Return transcript data or 404

## Phase 4: Frontend Viewer Implementation

### 4.1 Create transcript viewer page
- [ ] Create dynamic route /[id]/page.tsx
- [ ] Fetch transcript data from API
- [ ] Handle loading and error states
- [ ] Create 404 page for missing transcripts

### 4.2 Parse and render transcript messages
- [ ] Create MessageParser component to parse JSONL
- [ ] Identify different message types (user, assistant, tool use, etc.)
- [ ] Create type-specific rendering components

### 4.3 Design chat interface
- [ ] Create ChatMessage component for user/assistant messages
- [ ] Style with Tailwind CSS for clear visual hierarchy
- [ ] Implement syntax highlighting for code blocks
- [ ] Show timestamps and metadata

### 4.4 Handle special message types
- [ ] Render tool_use messages with proper formatting
- [ ] Display command outputs and stdout
- [ ] Show file read/write operations clearly
- [ ] Handle images and other media if present

### 4.5 Optimize viewing experience
- [ ] Implement virtual scrolling for long transcripts
- [ ] Add search functionality within transcript
- [ ] Add copy-to-clipboard for code blocks
- [ ] Make interface responsive for mobile

## Phase 5: Testing and Verification

### 5.1 Unit tests
- [ ] Write tests for JSONL parser
- [ ] Write tests for CLI functions
- [ ] Write tests for API endpoints
- [ ] Write tests for React components

### 5.2 Integration tests
- [ ] Test full upload flow from CLI to database
- [ ] Test transcript retrieval and rendering
- [ ] Test error handling scenarios
- [ ] Test with various transcript formats

### 5.3 E2E tests
- [ ] Set up Playwright for E2E testing
- [ ] Test complete user journey
- [ ] Test on different browsers
- [ ] Generate screenshots for verification

## Phase 6: Polish and Deployment

### 6.1 Add finishing touches
- [ ] Create landing page with instructions
- [ ] Add metadata and SEO optimization
- [ ] Implement rate limiting for uploads
- [ ] Add basic analytics

### 6.2 Documentation
- [ ] Create README with setup instructions
- [ ] Document API endpoints
- [ ] Add usage examples
- [ ] Create troubleshooting guide

### 6.3 Deployment preparation
- [ ] Set up environment variables
- [ ] Configure production database
- [ ] Set up CI/CD pipeline
- [ ] Prepare deployment scripts

## Verification Checklist
- [ ] CLI can discover and list all transcripts
- [ ] CLI can upload transcript successfully
- [ ] API stores and retrieves transcripts correctly
- [ ] Viewer renders all message types properly
- [ ] Code is well-tested and linted
- [ ] Documentation is complete