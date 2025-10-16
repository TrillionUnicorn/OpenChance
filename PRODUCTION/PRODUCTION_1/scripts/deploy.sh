#!/bin/bash

# OpenChance Production Deployment Script
# This script deploys the application to production

set -e

echo "🚀 Starting OpenChance Production Deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create .env file from .env.example"
    exit 1
fi

# Load environment variables
source .env

echo -e "${YELLOW}📋 Pre-deployment checks...${NC}"

# Check required environment variables
required_vars=(
    "DATABASE_URL"
    "REDIS_URL"
    "CLERK_SECRET_KEY"
    "STRIPE_SECRET_KEY"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}❌ Error: $var is not set${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ Environment variables validated${NC}"

# Build Docker images
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker-compose -f docker-compose.prod.yml build

echo -e "${GREEN}✅ Docker images built${NC}"

# Run database migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
npm run db:migrate

echo -e "${GREEN}✅ Database migrations complete${NC}"

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo -e "${GREEN}✅ Services started${NC}"

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check service health
services=("postgres" "redis" "meilisearch" "api" "web")
for service in "${services[@]}"; do
    if docker-compose -f docker-compose.prod.yml ps | grep -q "$service.*Up"; then
        echo -e "${GREEN}✅ $service is running${NC}"
    else
        echo -e "${RED}❌ $service failed to start${NC}"
        docker-compose -f docker-compose.prod.yml logs $service
        exit 1
    fi
done

# Display service URLs
echo ""
echo -e "${GREEN}🎉 Deployment successful!${NC}"
echo ""
echo "Services are running:"
echo "  - API: http://localhost:3001"
echo "  - Web: http://localhost:3000"
echo "  - Meilisearch: http://localhost:7700"
echo ""
echo "To view logs:"
echo "  docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "To stop services:"
echo "  docker-compose -f docker-compose.prod.yml down"
echo ""

