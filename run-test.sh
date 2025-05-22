#!/bin/bash

# Claude Viewer End-to-End Testing Script

set -e  # Exit on error

echo "========================================"
echo "Claude Viewer - End-to-End Testing"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v pnpm &> /dev/null; then
    print_error "pnpm is not installed. Please install it first:"
    echo "  npm install -g pnpm"
    exit 1
fi
print_status "pnpm is installed"

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi
print_status "Node.js is installed"

# Step 1: Install dependencies
echo ""
echo "Step 1: Installing dependencies..."
echo "--------------------------------"

cd apps/viewer
pnpm install
print_status "Viewer dependencies installed"

cd ../uploader
pnpm install
print_status "Uploader dependencies installed"
cd ../..

# Step 2: Check database configuration
echo ""
echo "Step 2: Checking database configuration..."
echo "-----------------------------------------"

if [ -f "apps/viewer/.env.local" ]; then
    if grep -q "YOUR-PASSWORD" apps/viewer/.env.local; then
        print_warning "Database credentials not configured in .env.local"
        echo ""
        echo "Please configure your database:"
        echo "1. For Supabase: Visit https://supabase.com and create a project"
        echo "2. For local PostgreSQL: Run './test-local.sh' for automated setup"
        echo ""
        echo "Then update apps/viewer/.env.local with your credentials"
        exit 1
    else
        print_status "Database configuration found"
    fi
else
    print_error ".env.local file not found"
    echo "Creating from example..."
    cp apps/viewer/.env.local.example apps/viewer/.env.local
    print_warning "Please update apps/viewer/.env.local with your database credentials"
    exit 1
fi

# Step 3: Run database migrations
echo ""
echo "Step 3: Running database migrations..."
echo "-------------------------------------"

cd apps/viewer
pnpm run db:push
print_status "Database migrations complete"
cd ../..

# Step 4: Build the uploader
echo ""
echo "Step 4: Building the uploader CLI..."
echo "------------------------------------"

cd apps/uploader
pnpm run build
print_status "Uploader CLI built successfully"
cd ../..

# Step 5: Start the viewer server
echo ""
echo "Step 5: Starting the viewer server..."
echo "-------------------------------------"

cd apps/viewer
pnpm run dev > viewer.log 2>&1 &
VIEWER_PID=$!
cd ../..

# Wait for server to start
echo -n "Waiting for server to start"
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null; then
        echo ""
        print_status "Viewer server is running at http://localhost:3000"
        break
    fi
    echo -n "."
    sleep 1
done

if ! curl -s http://localhost:3000 > /dev/null; then
    print_error "Viewer server failed to start"
    kill $VIEWER_PID 2>/dev/null
    exit 1
fi

# Step 6: Configure uploader
echo ""
echo "Step 6: Configuring uploader..."
echo "-------------------------------"

cd apps/uploader
node dist/index.js config set apiUrl http://localhost:3000/api
print_status "Uploader configured to use local API"
cd ../..

# Step 7: Test upload
echo ""
echo "Step 7: Ready to test upload..."
echo "-------------------------------"
echo ""
echo "To test the upload flow:"
echo "1. Open a new terminal"
echo "2. Run: cd apps/uploader && pnpm run claude-viewer upload"
echo "3. Select a transcript to upload"
echo "4. Open the provided URL in your browser"
echo ""
echo "The viewer server is running. Press Ctrl+C to stop."
echo ""
echo "Server logs are being written to: apps/viewer/viewer.log"
echo ""

# Keep the script running
trap "kill $VIEWER_PID 2>/dev/null; exit" INT TERM
wait $VIEWER_PID