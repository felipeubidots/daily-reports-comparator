# Daily Report Comparator - Claude Code Instructions

## ✅ MCPs Already Configured!

You have Slack + Shortcut MCPs globally configured, so no additional setup needed.

## Quick Start

### From Claude Code
Simply type using the **Slack username** (not full name):
```
Compare gajaguar's daily report
Compare cristianarrieta's daily
Compare felipemoreno5879's daily
```

Or use the full name from Slack — the tool will resolve it:
```
Compare Gerardo Geronimo's daily
Compare Cristian Arrieta's daily
Compare Felipe Moreno's daily
```

Claude will automatically:
1. Search #dev-daily for today's message
2. Parse the daily sections
3. Query Shortcut for completed/in-progress work
4. Generate detailed comparison

**💡 Tip:** If a name doesn't resolve, use the Slack username instead. You can find usernames by looking at their Slack profile or using the mention format (e.g., @gajaguar shows username `gajaguar`). Usernames match Shortcut mention names and emails.

### From Command Line (optional)
```bash
cd /c/Work/daily-reports
node index.js "gajaguar"           # Slack username
node index.js "Gerardo Geronimo"   # Full name (resolved from Slack)
```

### Identifying Correct Usernames

Three reliable ways to find the correct identifier:

1. **Slack Username** (most reliable):
   - Look at their Slack profile → `@username`
   - Examples: `gajaguar`, `cristianarrieta`, `felipemoreno5879`
   - **This matches their Shortcut mention name too**

2. **Email address** (universal):
   - Works in both Slack and Shortcut
   - Examples: `gerardo@ubidots.com`, `cristian@ubidots.com`
   - Use this if the full name has diacritics or special characters

3. **Full name from Slack**:
   - Display name shown in Slack profile
   - May not work if names have spaces or special characters
   - If it fails, use the Slack username instead

## How It Works

The comparator:
1. **Searches #dev-daily** in Slack for today's report from the developer
2. **Parses the daily** into sections: Shipped, In Progress, Today, Blockers, AI Insights
3. **Queries Shortcut API** for the developer's task activity
4. **Compares the two** and highlights discrepancies:
   - Tasks reported as shipped vs actually completed in Shortcut
   - Tasks in progress in daily vs in Shortcut
   - Missing or extra items

## Expected Daily Format in Slack

```
✅ SHIPPED   [Completed work] — [AI-assisted / Manual] — [link]
⤴️ IN PROGRESS   [Open PRs or tickets] — [status]
🎯 TODAY   [Highest priority items]
🏗️ BLOCKERS  [Blocked tickets] — @[owner] — [🔴🟡🟢]
💡 AI INSIGHT  [Only if AI was used]
```

### Details per section:
- **SHIPPED**: Completed work + how it was done + link (PR/Story)
- **IN PROGRESS**: Current work + current status (% complete, waiting on review, etc.)
- **TODAY**: Top priorities from in-progress or next sprint items
- **BLOCKERS**: What's blocking + owner to follow up + severity (red=critical, yellow=high, green=medium)
- **AI INSIGHT**: Only include if you actually used AI tools (Claude, Copilot, etc.)

Slack adds metadata automatically (name, date, time, channel).

## Architecture

- **index.js**: Main script that:
  - Uses Slack API to fetch #dev-daily messages
  - Parses daily report sections
  - Uses Shortcut API to get completed/in-progress stories
  - Compares and generates comparison report

## Token Setup

### Get Slack Bot Token
1. Go to https://api.slack.com/apps
2. Create a new app or select existing
3. Go to "OAuth & Permissions"
4. Under "Scopes", add:
   - `channels:read`
   - `chat:read`
   - `users:read`
5. Copy "Bot User OAuth Token" (starts with `xoxb-`)

### Get Shortcut API Token
1. Go to https://app.shortcut.com/settings/account/api-tokens
2. Create new token
3. Copy the token

## Future Enhancements

- [ ] Claude Code skill integration (invoke from #dev-daily directly)
- [ ] Multi-user comparison
- [ ] Time tracking integration
- [ ] Weekly summary reports
- [ ] Automated daily validation checks
