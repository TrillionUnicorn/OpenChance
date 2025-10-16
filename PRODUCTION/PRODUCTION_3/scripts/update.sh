#!/bin/bash

# OpenChance Update Script
# Updates the application to the latest version

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 Starting OpenChance Update...${NC}"

# Check if git is available
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Error: git is not installed${NC}"
    exit 1
fi

# Backup current version
echo -e "${YELLOW}📦 Creating backup...${NC}"
./scripts/backup.sh

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
git pull origin main

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Run database migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
npm run db:migrate

# Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Restart services
echo -e "${YELLOW}🔄 Restarting services...${NC}"
if [ -f "docker-compose.prod.yml" ]; then
    docker-compose -f docker-compose.prod.yml restart
else
    echo -e "${YELLOW}⚠️  Docker Compose not found, skipping restart${NC}"
fi

# Run health checks
echo -e "${YELLOW}🏥 Running health checks...${NC}"
sleep 5

if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API is healthy${NC}"
else
    echo -e "${RED}❌ API health check failed${NC}"
    exit 1
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Web is healthy${NC}"
else
    echo -e "${RED}❌ Web health check failed${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Update completed successfully!${NC}"
echo ""
echo "Application is running:"
echo "  - API: http://localhost:3001"
echo "  - Web: http://localhost:3000"
echo ""

