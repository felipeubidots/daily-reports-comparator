# Daily Report Comparator

Compare developer daily reports from Slack (#dev-daily) with their Shortcut activity — using natural language in Claude Code.

## How it works

1. You ask: `Compare Cristian Arrieta's daily`
2. Claude searches #dev-daily in Slack for today's message
3. Claude queries Shortcut for that developer's story activity
4. Claude produces a structured comparison: shipped vs done, in-progress alignment, blockers, AI usage

No scripts to run. No commands to type.

---

## Prerequisites

You need three things:

### 1. Claude Code
Install the Claude Code CLI:
```bash
npm install -g @anthropic-ai/claude-code
```
Or follow the [official installation guide](https://docs.anthropic.com/en/docs/claude-code).

### 2. Slack MCP configured
Claude Code needs access to your Slack workspace via an MCP server.

Add the Slack MCP to your Claude Code global config:
```bash
claude mcp add slack
```

You'll need a **Slack Bot Token** (`xoxb-...`) with these scopes:
- `channels:read`
- `search:read`
- `users:read`

Get your token at: https://api.slack.com/apps → OAuth & Permissions

### 3. Shortcut MCP configured
Add the Shortcut MCP to your Claude Code global config:
```bash
claude mcp add shortcut
```

You'll need a **Shortcut API Token**.

Get your token at: https://app.shortcut.com/settings/account/api-tokens

> **Important:** Configure MCPs globally (not per-project) so they work in any directory.
> See the [Claude Code MCP docs](https://docs.anthropic.com/en/docs/claude-code/mcp) for full setup instructions.

---

## Setup

```bash
git clone https://github.com/felipeubidots/daily-reports-comparator.git
cd daily-reports-comparator
```

That's it. No `npm install` needed for the primary Claude Code workflow.

---

## Usage

Open Claude Code in this directory and ask in natural language:

```
Compare Juan Agudelo's daily
Compare Cristian Arrieta's daily
Compare gajaguar's daily
Compare cristian.arrieta@ubidots.com's daily
```

Claude reads `CLAUDE.md` automatically when you open this directory, which gives it all the context it needs to run the comparison.

### Finding the right identifier

| Method | Example | Notes |
|--------|---------|-------|
| Full name | `Cristian Arrieta` | Easiest to type |
| Slack username | `gajaguar` | Most reliable |
| Email | `gerardo@ubidots.com` | Use for names with accents/special chars |

---

## Expected daily format in Slack (#dev-daily)

```
✅ SHIPPED   [Completed work] — [AI-assisted / Manual] — [link]
⤴️ IN PROGRESS   [Open PRs or tickets] — [status]
🎯 TODAY   [Highest priority items]
🏗️ BLOCKERS  [Blocked tickets] — @[owner] — [🔴🟡🟢]
💡 AI INSIGHT  [Only if AI was used]
```

| Section | What to include |
|---------|-----------------|
| **SHIPPED** | Completed work + how (AI/Manual) + PR or story link |
| **IN PROGRESS** | Active work + current status (%, waiting on review, etc.) |
| **TODAY** | Top priorities for the day |
| **BLOCKERS** | What's blocking + owner + severity (🔴 critical / 🟡 high / 🟢 medium) |
| **AI INSIGHT** | Only if you actually used AI tools (Claude, Copilot, etc.) |

---

## Alternative: command line (optional)

If you prefer not to use Claude Code, you can run the script directly after setting up tokens:

```bash
cp .env.example .env
# Edit .env with your actual tokens
node index.js "Developer Name"
```

---

## Team context

Team member data lives in two files:

- `people-context.json` — machine-readable (usernames, emails, roles, teams)
- `TEAM.md` — human-readable documentation

When team structure changes, update both files together.

---

## Future enhancements

- [ ] Multi-user comparison in one command
- [ ] Weekly summary reports
- [ ] Time tracking integration
- [ ] Role-based insights (expectations vs reality)
