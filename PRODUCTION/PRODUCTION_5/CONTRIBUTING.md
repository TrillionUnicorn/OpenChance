# Contributing to OpenChance

Thank you for your interest in contributing to OpenChance! This document provides guidelines for contributing to the project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/OpenChance.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes: `git commit -m "feat: your feature description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run migrations
npm run db:migrate

# Start development servers
npm run dev
```

## Coding Standards

### TypeScript
- Use TypeScript strict mode
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for object shapes

### Code Style
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful variable names
- Add comments for complex logic

### Commits
Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

## Testing

- Write tests for new features
- Ensure all tests pass: `npm run test`
- Maintain test coverage above 80%

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Questions?

- Open an issue for bugs
- Start a discussion for questions
- Email: support@openchance.com

Thank you for contributing! 🎉

