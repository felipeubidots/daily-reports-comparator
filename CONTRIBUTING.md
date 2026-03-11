# Contributing to Daily Reports Comparator

Thank you for interest in contributing! This guide helps ensure quality and consistency.

## Code Standards

### Node.js & JavaScript

- **CommonJS modules** - Use `require()` and `module.exports`
- **Async/Await** - Prefer async/await over promises
- **Error Handling** - Always catch and log errors with context
- **Comments** - Document complex logic, not obvious code

### Security

1. **Never log tokens** - Even in development
2. **Use .env files** - Never hardcode secrets
3. **Validate input** - Check user names and IDs
4. **Handle errors gracefully** - Don't expose system details

## Commit Messages

Follow conventional commits:

```
feat: Add new feature
fix: Fix bug in comparison logic
docs: Update README with examples
```

## Pull Request Process

1. Create feature branch: `git checkout -b feature/description`
2. Make changes and test
3. Push to your fork and create Pull Request
4. Address review feedback

## Security Checklist

Before submitting code:

- [ ] No tokens hardcoded
- [ ] No `.env` file committed
- [ ] Error messages don't expose paths/secrets
- [ ] Input is validated
- [ ] Dependencies are minimal

Thank you for contributing! 🙌
