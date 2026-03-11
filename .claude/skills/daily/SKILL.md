---
name: daily
description: Compare a developer's daily Slack report (#dev-daily) with their Shortcut activity. Usage: /daily [name | username | email]
---

Compare the daily report of the developer identified by: $ARGUMENTS

Follow these steps exactly:

## Step 1 — Identify the developer

Use `$ARGUMENTS` as the search identifier. It can be:
- Full name (e.g. `Cristian Arrieta`)
- Slack username (e.g. `gajaguar`, `cristianarrieta`)
- Email (e.g. `cristian@ubidots.com`)

Resolve the identifier to a Slack user and a Shortcut mention name before proceeding. Consult `people-context.json` if the name is ambiguous.

If `$ARGUMENTS` is empty, ask: "Who would you like to compare? Provide a name, username, or email."

## Step 2 — Fetch the Slack daily

Search the `#dev-daily` channel for a message from that user posted **today**.

- Use the Slack MCP search tool with: `from:[username] in:#dev-daily on:[today's date]`
- If no message is found, try a broader search without the date filter to detect the most recent post
- If still no message is found → stop and report: "No daily found for [name] in #dev-daily today."

## Step 3 — Parse the daily

Extract each section from the message:

| Section | Emoji header |
|---------|-------------|
| SHIPPED | ✅ or `:white_check_mark:` |
| IN PROGRESS | ⤴️ or `:arrows_counterclockwise:` |
| TODAY | 🎯 or `:dart:` |
| BLOCKERS | 🏗️ or `:construction:` |
| AI INSIGHT | 💡 or `:bulb:` |

For each item extract: story ID (if present), description, AI-assisted flag, links.

## Step 4 — Fetch Shortcut activity

Using the Shortcut MCP, search for stories owned by this developer:
- All stories assigned to the user (use their Shortcut mention name)
- Focus on stories with state: Done, Started, or In Review
- Note the workflow state of each story mentioned in the daily

If the developer has no stories in Shortcut, note it but continue with the Slack data alone.

## Step 5 — Generate the comparison report

Output the report in this exact structure:

---

## 📊 Daily Report Comparison: [Full Name]
📅 [Date] | [Time] | [Team] ([Seniority])

---

### ✅ SHIPPED
For each shipped item, show the Shortcut state next to it:
- ✅ Done in Shortcut → aligned
- ⚠️ Still Started/In Review → discrepancy, note it
- ❓ Not found in Shortcut → note it (may be valid: docs, deploys, meetings)

### ⏳ IN PROGRESS
For each in-progress item, verify its Shortcut state:
- ✅ Started/In Review → aligned
- ⚠️ Done in Shortcut → may need to move to SHIPPED
- ⚠️ Unstarted in Shortcut → not started yet

### 🎯 TODAY
List the planned items. Flag any that don't appear in IN PROGRESS or Shortcut.

### 🏗️ BLOCKERS
If any:
- Describe the blocker
- Note the owner (@mention) and severity (🔴🟡🟢)
- Suggest follow-up action

If none: "✅ No blockers reported."

### 💡 AI USAGE
If AI INSIGHT section exists:
- List the tools mentioned
- Show AI-assisted count vs total shipped items

If absent: "Not reported."

---

### 📈 SUMMARY

| Metric | Value |
|--------|-------|
| Shipped (reported) | N items |
| Confirmed Done in Shortcut | N items |
| In Progress | N items |
| Shortcut alignment | High / Medium / Low |
| Blockers | N (🔴 critical / 🟡 high / 🟢 medium) |
| AI usage | N% of shipped items |

**Assessment:** [1–2 sentences contextualizing the day's output relative to the developer's role and seniority. Be factual, not evaluative.]

**Observations:** [Bullet list of any discrepancies, inconsistencies, or items worth following up on. If everything is clean, say so.]

---

## Error handling

| Situation | Action |
|-----------|--------|
| `$ARGUMENTS` is empty | Ask for the developer identifier before proceeding |
| Developer not found in Slack or `people-context.json` | Report it and suggest trying username or email instead |
| No daily posted today | Report clearly. Optionally show the last known daily with its date |
| Slack MCP unavailable | Inform the user to check that the Slack MCP is configured (`claude mcp list`) |
| Shortcut MCP unavailable | Run the comparison with Slack data only, note that Shortcut validation was skipped |
| Developer has no Shortcut stories | Note it and complete the report with Slack data only |
