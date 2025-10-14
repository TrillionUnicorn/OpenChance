# 🚀 OpenChance Deployment Guide

## Quick Start

### Prerequisites
- Node.js 20+ or Docker/Podman
- Git
- (Optional) VPS with 2GB+ RAM

## Development

```bash
# Clone repository
git clone https://github.com/TrillionUnicorn/OpenChance.git
cd OpenChance

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:5173
```

## Production Build

### Option 1: Node.js

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Or use a process manager
npm install -g pm2
pm2 start build/index.js --name openchance
```

### Option 2: Docker

```bash
# Build Docker image
docker build -t openchance:latest .

# Run container
docker run -d \
  -p 3000:3000 \
  --name openchance \
  --restart unless-stopped \
  openchance:latest

# Or use Docker Compose
docker-compose up -d
```

### Option 3: Podman

```bash
# Build with Podman
podman build -t openchance:latest .

# Run container
podman run -d \
  -p 3000:3000 \
  --name openchance \
  --restart unless-stopped \
  openchance:latest
```

## VPS Deployment

### 1. Prepare VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Or install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

### 2. Deploy Application

```bash
# Clone repository
git clone https://github.com/TrillionUnicorn/OpenChance.git
cd OpenChance

# Install dependencies
npm ci --production

# Build application
npm run build

# Install PM2
npm install -g pm2

# Start application
pm2 start build/index.js --name openchance

# Save PM2 configuration
pm2 save
pm2 startup
```

### 3. Setup Reverse Proxy (Nginx)

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/openchance
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name openchance.com www.openchance.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/openchance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d openchance.com -d www.openchance.com

# Auto-renewal is configured automatically
```

## Environment Variables

Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
nano .env
```

## Monitoring

### PM2 Monitoring

```bash
# View logs
pm2 logs openchance

# Monitor resources
pm2 monit

# Restart application
pm2 restart openchance

# Stop application
pm2 stop openchance
```

### Docker Monitoring

```bash
# View logs
docker logs -f openchance

# Check health
docker ps

# Restart container
docker restart openchance
```

## Performance Optimization

### 1. Enable Gzip Compression (Nginx)

Add to Nginx configuration:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### 2. Setup Caching

Add to Nginx configuration:

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Enable HTTP/2

```nginx
listen 443 ssl http2;
```

## Security

### 1. Firewall Setup

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Fail2Ban

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Configure
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Security Headers (Nginx)

Add to Nginx configuration:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## Backup

### Automated Backups

```bash
# Create backup script
nano /home/user/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup application
tar -czf $BACKUP_DIR/openchance_$DATE.tar.gz /home/user/OpenChance

# Keep only last 7 days
find $BACKUP_DIR -name "openchance_*.tar.gz" -mtime +7 -delete
```

```bash
# Make executable
chmod +x /home/user/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /home/user/backup.sh
```

## Scaling

### Horizontal Scaling with Load Balancer

```nginx
upstream openchance_backend {
    least_conn;
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    location / {
        proxy_pass http://openchance_backend;
    }
}
```

### Run Multiple Instances

```bash
# PM2 cluster mode
pm2 start build/index.js -i max --name openchance
```

## Troubleshooting

### Application won't start

```bash
# Check logs
pm2 logs openchance --lines 100

# Check port availability
sudo lsof -i :3000

# Restart application
pm2 restart openchance
```

### High memory usage

```bash
# Check memory
free -h
pm2 monit

# Restart application
pm2 restart openchance
```

### SSL certificate issues

```bash
# Renew certificate
sudo certbot renew --dry-run
sudo certbot renew

# Check certificate
sudo certbot certificates
```

## Updates

```bash
# Pull latest changes
cd OpenChance
git pull origin main

# Install dependencies
npm ci --production

# Rebuild
npm run build

# Restart
pm2 restart openchance
```

## Health Checks

The application includes a health check endpoint at `/health` (when implemented).

```bash
# Check application health
curl http://localhost:3000/health
```

## Support

For deployment issues:
- GitHub Issues: https://github.com/TrillionUnicorn/OpenChance/issues
- Email: hello@openchance.com
- Discord: https://discord.gg/openchance

