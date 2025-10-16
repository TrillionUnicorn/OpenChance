#!/bin/bash

# OpenChance Setup Script
# First-time installation and configuration

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║           OpenChance Setup Wizard                     ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check prerequisites
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 20+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}❌ Node.js version must be 20 or higher${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v)${NC}"

# Check Docker (optional)
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅ Docker $(docker -v | cut -d' ' -f3 | cut -d',' -f1)${NC}"
else
    echo -e "${YELLOW}⚠️  Docker not found (optional)${NC}"
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL installed${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL not found${NC}"
    echo "You'll need PostgreSQL 15+ or use Docker"
fi

echo ""

# Environment setup
echo -e "${YELLOW}📝 Setting up environment...${NC}"

if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env file with your credentials${NC}"
    echo ""
    read -p "Press Enter to continue after editing .env..."
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Database setup
echo -e "${YELLOW}🗄️  Setting up database...${NC}"
read -p "Do you want to run database migrations? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run db:migrate
    echo -e "${GREEN}✅ Database migrations completed${NC}"
    
    read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run db:seed
        echo -e "${GREEN}✅ Database seeded${NC}"
    fi
fi

# Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build
echo -e "${GREEN}✅ Application built${NC}"

# Setup complete
echo ""
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║           Setup Completed Successfully! 🎉            ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. Start development server:"
echo -e "   ${GREEN}npm run dev${NC}"
echo ""
echo "2. Or deploy to production:"
echo -e "   ${GREEN}./scripts/deploy.sh${NC}"
echo ""
echo "3. Access the application:"
echo "   - API: http://localhost:3001"
echo "   - Web: http://localhost:5173 (dev) or http://localhost:3000 (prod)"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "   - README.md"
echo "   - docs/DEPLOYMENT.md"
echo "   - docs/ENVIRONMENT_VARIABLES.md"
echo ""
echo -e "${YELLOW}Happy coding! 🚀${NC}"
echo ""

