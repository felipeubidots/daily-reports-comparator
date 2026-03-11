# Daily Report Comparator — Claude Code Plugin

## Setup

This repo is a Claude Code plugin. Once cloned, the `/daily-compare` command is available automatically.

**Requirements:**
- Claude Code with Slack MCP configured (`SLACK_BOT_TOKEN`)
- Claude Code with Shortcut MCP configured (`SHORTCUT_API_TOKEN`)
- Both MCPs configured in `~/.claude/mcp.json` — **no tokens needed in this repo**

## Usage

```
/daily-compare gajaguar
/daily-compare gerardo.geronimo@ubidots.com
/daily-compare "Gerardo Geronimo"
```

Accepts: Slack username, email, or full name. Claude resolves the identifier automatically using `people-context.json`.

## What It Does

1. Loads team context from `people-context.json` (role, seniority, focus areas)
2. Searches Slack `#dev-daily` for today's report via MCP
3. Queries Shortcut for the developer's story activity via MCP
4. Generates a role-aware 11-section analysis

## Daily Format Expected in Slack

```
✅ SHIPPED    [work done] — [AI-assisted / Manual] — [link]
⤴️ IN PROGRESS  [open items] — [status]
🎯 TODAY      [top priorities]
🏗️ BLOCKERS   [blocked items] — @owner — [🔴🟡🟢]
💡 AI INSIGHT  [only if AI tools were used]
```

## Team Context

- **`people-context.json`** — Machine-readable: identifiers, roles, seniority, focus areas
- **`TEAM.md`** — Human-readable team structure

When team changes, update both files together.

## Repository Structure

```
.claude-plugin/
  plugin.json          ← Plugin registration
commands/
  daily-compare.md     ← /daily-compare command definition
people-context.json    ← Team context (16 members)
TEAM.md                ← Team structure documentation
index.js               ← (Legacy) Node.js CLI alternative
```
