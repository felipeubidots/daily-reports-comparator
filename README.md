# Daily Reports Comparator

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Compare developer daily reports posted in Slack (#dev-daily) with their actual task activity in Shortcut. This tool helps teams maintain accuracy in daily reporting and identify discrepancies between reported work and actual completion.

## Features

- 🔍 **Report Validation** - Compare Slack daily reports against Shortcut task status
- 📊 **Discrepancy Detection** - Highlight items reported as shipped but not completed
- 🔗 **MCP Integration** - Uses modern Slack & Shortcut MCPs for reliability
- 🔐 **Secure** - No tokens exposed in code, environment-based configuration
- 📋 **Detailed Comparison** - Shows shipped items, in-progress work, and blockers

## Quick Start

### 1. Prerequisites

- **Node.js** 18+
- **Slack Bot Token** - See [Token Setup](#token-setup) below
- **Shortcut API Token** - See [Token Setup](#token-setup) below
- **Claude Code** - With Slack & Shortcut MCPs configured

### 2. Setup

```bash
# Clone the repository
git clone https://github.com/felipeubidots/daily-reports-comparator.git
cd daily-reports-comparator

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your tokens
```

### 3. Usage

**Using Claude Code (recommended):**
```
Compare gajaguar's daily report
Compare cristianarrieta's daily
Compare felipemoreno5879's daily
```

Or use full names:
```
Compare Gerardo Geronimo's daily
Compare Cristian Arrieta's daily
```

**Using command line:**
```bash
# By Slack username (most reliable)
node index.js gajaguar

# By email (universal)
node index.js gerardo@ubidots.com

# By full name (if it resolves)
node index.js "Gerardo Geronimo"
```

## Token Setup

### Slack Bot Token

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Create a new app or select your existing app
3. Navigate to **OAuth & Permissions**
4. Add these **Bot Token Scopes**:
   - `channels:read` - Read channel information
   - `chat:read` - Read messages in channels
   - `users:read` - Read user profiles
5. Copy the **Bot User OAuth Token** (starts with `xoxb-`)
6. Add to `.env`:
   ```
   SLACK_TOKEN=xoxb-your-token-here
   ```

### Shortcut API Token

1. Go to [Shortcut Settings → API Tokens](https://app.shortcut.com/settings/account/api-tokens)
2. Create a new API token
3. Copy the token
4. Add to `.env`:
   ```
   SHORTCUT_TOKEN=your-token-here
   ```

### Environment Variables

```bash
# .env file
SLACK_TOKEN=xoxb-your-slack-bot-token
SHORTCUT_TOKEN=your-shortcut-api-token
```

⚠️ **Never commit `.env`** - Use `.env.example` as template

## How It Works

1. **Fetch Daily Report** - Searches #dev-daily for today's message from the developer
2. **Parse Sections** - Extracts: Shipped, In Progress, Today, Blockers, AI Insights
3. **Query Shortcut** - Fetches developer's completed and in-progress stories
4. **Compare** - Identifies discrepancies:
   - Reported shipped vs. actually completed
   - Reported in progress vs. Shortcut status
   - Missing or misaligned items

## Daily Report Format

Use this format in #dev-daily for compatibility:

```
✅ SHIPPED
• SC-1090: Deploy 2FA flag — Manual — [link]
• SC-1347: Support payment sessions — AI-assisted — [link]

⤴️ IN PROGRESS
• SC-1359: Webhook handlers — In Review
• SC-1297: API pagination fix — In Review

🎯 TODAY
• Follow-up on SC-1359, SC-1297 reviews
• QA coordination on billing items

🏗️ BLOCKERS
• None

💡 AI INSIGHT
• None
```

## License

MIT License © 2026 Felipe Ubidots

## Support

For issues or questions, check the [GitHub Issues](https://github.com/felipeubidots/daily-reports-comparator/issues).
