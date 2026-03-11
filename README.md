# Daily Report Comparator

Compare developer daily reports from Slack (#dev-daily) with their Shortcut activity — using a slash command in Claude Code.

## How it works

1. You run: `/daily Jane Smith`
2. Claude searches #dev-daily in Slack for Jane's message today
3. Claude queries Shortcut for her story activity
4. Claude produces a structured comparison: shipped vs done, in-progress alignment, blockers, AI usage

No scripts. No manual API calls. Just a command.

---

## Prerequisites

### 1. Claude Code
Install the Claude Code CLI:
```bash
npm install -g @anthropic-ai/claude-code
```
Or follow the [official installation guide](https://docs.anthropic.com/en/docs/claude-code).

### 2. Slack MCP configured
Claude Code needs access to your Slack workspace via an MCP server.

Configure the Slack MCP globally in Claude Code:
```bash
claude mcp add slack --scope user
```

You'll need a **Slack Bot Token** (`xoxb-...`) with these scopes:
- `search:read`
- `channels:read`
- `users:read`

Get your token: https://api.slack.com/apps → OAuth & Permissions

### 3. Shortcut MCP configured
Configure the Shortcut MCP globally in Claude Code:
```bash
claude mcp add shortcut --scope user
```

You'll need a **Shortcut API Token**.

Get your token: https://app.shortcut.com/settings/account/api-tokens

> Configure MCPs with `--scope user` so they work across all your projects.
> See the [Claude Code MCP docs](https://docs.anthropic.com/en/docs/claude-code/mcp) for full setup details.

---

## Setup

```bash
git clone https://github.com/felipeubidots/daily-reports-comparator.git
cd daily-reports-comparator
```

That's it. The `/daily` skill is included in the repo and available immediately in Claude Code.

---

## Usage

Open Claude Code in this directory and run:

```
/daily Jane Smith
/daily jsmith
/daily jane.smith@yourcompany.com
```

The `/daily` skill is defined in `.claude/skills/daily/SKILL.md` and is automatically available to anyone who clones this repo and opens it in Claude Code.

### Identifier formats

| Format | Example | Notes |
|--------|---------|-------|
| Full name | `/daily Jane Smith` | Easiest to type |
| Slack username | `/daily jsmith` | Most reliable |
| Email | `/daily jane@yourcompany.com` | Use for names with accents or special characters |

---

## Adapting to your team

This tool uses two files to resolve developer identities:

- `people-context.json` — machine-readable (usernames, emails, roles, teams)
- `TEAM.md` — human-readable team documentation

Update both files with your team members before using. When team structure changes, update them together.

---

## Expected daily format in Slack (#dev-daily)

Your team's daily messages in #dev-daily should follow this structure:

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
| **AI INSIGHT** | Only if you actually used AI tools |

---

## Alternative: command line (optional)

If you prefer not to use Claude Code:

```bash
cp .env.example .env
# Edit .env with your actual tokens
node index.js "Developer Name"
```

---

## Future enhancements

- [ ] Multi-user comparison in one command
- [ ] Weekly summary reports
- [ ] Time tracking integration
- [ ] Role-based insights (expectations vs reality)
