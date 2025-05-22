#!/bin/bash

# Claude Viewer Local Testing Script
# This script helps set up a quick local PostgreSQL instance for testing

echo "Claude Viewer - Local Testing Setup"
echo "=================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install it first:"
    echo "  Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo "  macOS: brew install postgresql && brew services start postgresql"
    exit 1
fi

# Function to create local database
setup_local_db() {
    echo "Setting up local PostgreSQL database..."
    
    # Create database if it doesn't exist
    createdb claude_viewer 2>/dev/null || echo "Database 'claude_viewer' already exists"
    
    # Create .env.local with local settings
    cat > apps/viewer/.env.local << EOF
# Local PostgreSQL Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/claude_viewer

# Dummy Supabase values for local testing (not used but required by config)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy-anon-key
SUPABASE_SERVICE_ROLE_KEY=dummy-service-key
EOF
    
    echo "✓ Local database configuration created"
}

# Function to run migrations
run_migrations() {
    echo "Running database migrations..."
    cd apps/viewer
    pnpm run db:push
    cd ../..
    echo "✓ Database migrations complete"
}

# Function to start the viewer
start_viewer() {
    echo "Starting the viewer server..."
    cd apps/viewer
    pnpm run dev &
    VIEWER_PID=$!
    cd ../..
    echo "✓ Viewer started (PID: $VIEWER_PID)"
    echo "  Access at: http://localhost:3000"
}

# Function to configure uploader
configure_uploader() {
    echo "Configuring uploader CLI..."
    cd apps/uploader
    pnpm run claude-viewer config set apiUrl http://localhost:3000/api
    cd ../..
    echo "✓ Uploader configured"
}

# Main menu
echo "What would you like to do?"
echo "1. Full setup (database + migrations + start viewer)"
echo "2. Just start the viewer"
echo "3. Configure uploader for local testing"
echo "4. Run database migrations only"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        setup_local_db
        run_migrations
        start_viewer
        configure_uploader
        echo ""
        echo "Setup complete! You can now:"
        echo "1. Upload a transcript: cd apps/uploader && pnpm run claude-viewer upload"
        echo "2. View transcripts at: http://localhost:3000/{uuid}"
        echo ""
        echo "Press Ctrl+C to stop the viewer server"
        wait $VIEWER_PID
        ;;
    2)
        start_viewer
        echo "Press Ctrl+C to stop the viewer server"
        wait $VIEWER_PID
        ;;
    3)
        configure_uploader
        ;;
    4)
        run_migrations
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac