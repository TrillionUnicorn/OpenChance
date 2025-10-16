# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Disclose Publicly
Please do not open a public issue or discuss the vulnerability publicly until it has been addressed.

### 2. Report Privately
Email security@openchance.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline
- **Initial Response:** Within 24 hours
- **Status Update:** Within 72 hours
- **Fix Timeline:** Depends on severity
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

## Security Measures

### Authentication
- Clerk authentication with JWT
- Session management
- Password hashing (handled by Clerk)

### Authorization
- Role-based access control
- Resource-level permissions
- API endpoint protection

### Data Protection
- HTTPS encryption in transit
- Database encryption at rest
- Environment variable protection
- Secure secret management

### API Security
- Rate limiting
- Input validation (Zod)
- SQL injection prevention (Drizzle ORM)
- XSS prevention
- CSRF protection

### Infrastructure
- Regular security updates
- Dependency scanning
- Container security
- Network isolation

## Best Practices

### For Developers
- Never commit secrets to git
- Use environment variables
- Follow secure coding guidelines
- Keep dependencies updated
- Run security scans regularly

### For Users
- Use strong passwords
- Enable 2FA when available
- Keep your account secure
- Report suspicious activity

## Security Updates

Security updates will be released as patch versions and announced via:
- GitHub Security Advisories
- Email notifications
- Release notes

## Contact

For security concerns: security@openchance.com

Thank you for helping keep OpenChance secure! 🔒

