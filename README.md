# Daily Report Comparator

Compare developer daily reports from #dev-daily with their Shortcut activity.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set environment variables

Create a `.env` file or set these variables:

```bash
export SLACK_TOKEN="xoxb-your-bot-token"
export SHORTCUT_TOKEN="your-shortcut-api-token"
```

**How to get tokens:**
- **Slack Bot Token**: Create a bot at https://api.slack.com/apps and get the `xoxb-` token
- **Shortcut Token**: Get from https://app.shortcut.com/settings/account/api-tokens

### 3. Grant bot permissions

The bot needs these Slack scopes:
- `channels:read` - Read channel info
- `chat:read` - Read messages
- `users:read` - Read user info

## Usage

```bash
node index.js "Developer Name"
```

### Examples
```bash
node index.js "Juan Agudelo"
node index.js "Cristian Arrieta"
node index.js "Felipe Moreno"
```

## Output

The tool will:
1. Find today's daily report in #dev-daily
2. Parse the sections: Shipped, In Progress, Today, Blockers, AI Insights
3. Query Shortcut for the developer's completed & in-progress stories
4. Compare and highlight discrepancies:
   - Reported shipped ≠ Completed in Shortcut
   - Reported in progress ≠ In progress in Shortcut
   - Missing items from daily report

## Daily Report Format

Your daily in #dev-daily should follow this precise format:

```
✅ SHIPPED   [Completed work from merged PRs or Done tickets] — [AI-assisted / Manual] — [link]
⤴️ IN PROGRESS   [Open PRs or In Progress tickets] — [status]
🎯 TODAY   [Highest priority from In Progress or next up in sprint]
🏗️ BLOCKERS  [Tickets with blocked label or blocker mentioned] — @[owner] — [🔴🟡🟢 severity]
💡 AI INSIGHT  [Only include if commits/comments mention AI learnings]
```

### Field Explanations

| Section | What to include | Metadata |
|---------|-----------------|----------|
| **SHIPPED** | Completed work from merged PRs or Done tickets | AI-assisted / Manual, link |
| **IN PROGRESS** | Open PRs or In Progress tickets | Current status/progress |
| **TODAY** | Highest priority work from In Progress or next sprint item | - |
| **BLOCKERS** | Blocked tickets or mentioned blockers | Owner @mention, severity emoji |
| **AI INSIGHT** | Only if commits/comments mention AI learnings | - |

### Example

```
✅ SHIPPED
- Feature: Dark mode toggle — AI-assisted — SC-1247
- Fix: Memory leak in dashboard — Manual — #1248

⤴️ IN PROGRESS
- Component library refactor — 60% complete
- Authentication module — awaiting design review

🎯 TODAY
- Complete component library tests
- Merge dark mode PR
- Stakeholder demo prep

🏗️ BLOCKERS
- API rate limiting issue — @backend-team — 🔴
- Design system updates — @design-team — 🟡

💡 AI INSIGHT
- Used Claude for refactoring component structure
- GitHub Copilot for test generation
```

Slack automatically adds:
- Developer name (from user who posted)
- Date and time
- Channel (#dev-daily)

You just need to write the content!
