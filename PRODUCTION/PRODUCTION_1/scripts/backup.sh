#!/bin/bash

# OpenChance Database Backup Script
# Creates timestamped backups of the PostgreSQL database

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🗄️  Starting database backup...${NC}"

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo -e "${RED}❌ Error: .env file not found${NC}"
    exit 1
fi

# Create backup directory if it doesn't exist
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Generate timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/openchance_backup_$TIMESTAMP.sql"

# Extract database connection details from DATABASE_URL
# Format: postgresql://user:password@host:port/database
DB_URL=$DATABASE_URL

echo -e "${YELLOW}📦 Creating backup: $BACKUP_FILE${NC}"

# Create backup using pg_dump
if command -v pg_dump &> /dev/null; then
    pg_dump $DB_URL > $BACKUP_FILE
    
    if [ $? -eq 0 ]; then
        # Compress backup
        gzip $BACKUP_FILE
        BACKUP_FILE="$BACKUP_FILE.gz"
        
        # Get file size
        SIZE=$(du -h $BACKUP_FILE | cut -f1)
        
        echo -e "${GREEN}✅ Backup created successfully${NC}"
        echo -e "   File: $BACKUP_FILE"
        echo -e "   Size: $SIZE"
        
        # Keep only last 30 backups
        echo -e "${YELLOW}🧹 Cleaning old backups...${NC}"
        ls -t $BACKUP_DIR/openchance_backup_*.sql.gz | tail -n +31 | xargs -r rm
        
        REMAINING=$(ls -1 $BACKUP_DIR/openchance_backup_*.sql.gz | wc -l)
        echo -e "${GREEN}✅ Kept $REMAINING most recent backups${NC}"
        
    else
        echo -e "${RED}❌ Backup failed${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Error: pg_dump not found${NC}"
    echo "Please install PostgreSQL client tools"
    exit 1
fi

echo -e "${GREEN}🎉 Backup completed successfully!${NC}"

