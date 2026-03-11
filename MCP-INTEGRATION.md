# MCP Integration Guide

Como tienes los MCPs de Slack y Shortcut configurados globalmente, puedes usar la skill directamente desde Claude Code sin configurar tokens adicionales.

## Cómo Funciona

Cuando dices en Claude Code:
```
Compare Juan Agudelo's daily report
```

Claude automáticamente:

### 1️⃣ Busca en Slack (#dev-daily)
```javascript
// Usa: mcp__claude_ai_Slack__slack_search_public
slack_search_public({
  query: "#dev-daily from:Juan Agudelo",
  created_date_from: "today",
  created_date_to: "today"
})
```

### 2️⃣ Parsea la Daily
Extrae de la estructura:
```
✅ SHIPPED — [work] — [AI-assisted/Manual] — [link]
⤴️ IN PROGRESS — [work] — [status]
🎯 TODAY — [work]
🏗️ BLOCKERS — [work] — @[owner] — [severity]
💡 AI INSIGHT — [work]
```

### 3️⃣ Busca en Shortcut
```javascript
// Usa: mcp__shortcut__stories_search
shortcut_search({
  owner: "Juan Agudelo",
  completed: "today",
  isDone: true
})
```

### 4️⃣ Compara y Reporta
- Shipped vs Completed count
- In Progress consistency
- Blocker analysis
- AI usage stats
- Productivity metrics

---

## Flujo Detallado

### Step 1: Get Slack User
```javascript
// Encuentra el usuario por nombre
slack_search_users("Juan Agudelo")
// Retorna: user_id, real_name, display_name
```

### Step 2: Fetch Today's Daily
```javascript
// Busca mensajes en #dev-daily de hoy
slack_search_public({
  query: "in:#dev-daily from:@<user_id>",
  created_date_from: "2026-03-11",  // Today
  created_date_to: "2026-03-11"
})
// Retorna: message text, timestamp, metadata
```

### Step 3: Parse Daily Sections
```javascript
// Parsea el texto en secciones
const sections = {
  shipped: [
    {
      description: "Auth endpoint",
      metadata: {
        aiAssisted: true,
        link: "SC-1247"
      }
    }
  ],
  inProgress: [...],
  today: [...],
  blockers: [
    {
      description: "API schema",
      metadata: {
        owner: "backend-team",
        severity: "🔴" // critical
      }
    }
  ],
  aiInsights: [...]
}
```

### Step 4: Get Shortcut Data
```javascript
// Busca historias del usuario
mcp__shortcut__users_list()
// Encuentra al usuario

mcp__shortcut__stories_search({
  owner: "Juan Agudelo",
  isDone: true,
  completed: "today"
})
// Retorna: completed stories, story points, state history
```

### Step 5: Compare

#### 5a. Shipped vs Completed
```
Daily shipped: 5 items
Shortcut completed: 3 stories
AI-assisted: 2/5 items
→ Possible issue: 2 items not tracked in Shortcut
```

#### 5b. In Progress Check
```
Daily in-progress: 2 items
Shortcut in-progress: 2 stories
→ ✅ Perfect match
```

#### 5c. Blockers Analysis
```
Reported blockers: 1 (🔴 Critical)
Owner: @backend-team
Blocking stories: [SC-1250, SC-1251]
→ ⚠️ 2 stories stuck, escalate
```

#### 5d. AI Usage
```
Total shipped: 5
AI-assisted: 2 (40%)
Manual: 3 (60%)
→ Healthy balance
```

### Step 6: Generate Report

```
📊 Daily Comparison: Juan Agudelo
📅 March 11, 2026 | 9:30 AM

✅ SHIPPED (5 items)
   • Auth endpoint [🤖 AI-assisted] [SC-1247]
   • Navbar fix [🖱️ Manual] [SC-1248]
   • API docs [🖱️ Manual] [PR-456]
   • Test suite [🤖 AI-assisted]
   • Deploy prep [🖱️ Manual]

⏳ IN PROGRESS (2 items)
   • Dashboard redesign [70% complete]
   • Performance opt [code review]

🎯 TODAY (4 planned)

🚫 BLOCKERS (1)
   • API schema [@backend-team] 🔴

💡 AI INSIGHTS (2)
   • Claude for refactoring
   • Copilot for tests

━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 ANALYSIS

✅ SHIPPED vs COMPLETED
   5 shipped, 3 in Shortcut
   ℹ️  2 items may not need Shortcut tracking (docs, deploy, reviews)
   Status: ✅ Acceptable

✅ IN PROGRESS
   2 items match perfectly

🚫 BLOCKERS (1 Critical)
   • API schema — @backend-team — Blocking 2 stories
   Action: Follow up with backend team

💡 AI USAGE
   2/5 items (40%) AI-assisted
   Status: ✅ Good use of AI tools

📊 PRODUCTIVITY
   13 story points completed
   Productivity Index: 95% (Excellent!)
```

---

## MCP Tools Available

### Slack MCPs
- `slack_search_public` - Search #dev-daily
- `slack_read_channel` - Get channel messages
- `slack_search_users` - Find developer by name

### Shortcut MCPs
- `mcp__shortcut__users_list` - Get all users
- `mcp__shortcut__stories_search` - Search stories
- `mcp__shortcut__stories_get_by_id` - Get story details

---

## Integration with Claude Code

Simply ask:
```
Compare Juan Agudelo's daily report
```

Claude will:
1. ✅ Understand the request
2. ✅ Use available MCPs
3. ✅ Parse daily format
4. ✅ Query Shortcut
5. ✅ Generate comparison
6. ✅ Report discrepancies

No additional configuration needed - the MCPs are global!

---

## What Makes This Powerful

✅ **Real-time Data** - Fresh Slack + Shortcut data
✅ **Structured Format** - Consistent daily template
✅ **Rich Metadata** - AI-assisted flags, blockers, severity
✅ **Automated** - No manual copy-paste between tools
✅ **Actionable** - Highlights discrepancies and suggests follow-ups
✅ **Team Insight** - Spot patterns over time

---

## Examples

### Example 1: AI-Heavy Day
```
5 shipped items
3 AI-assisted (60%)
2 Manual

→ Great: Using AI tools effectively
```

### Example 2: Blocker Alert
```
1 Critical blocker
Blocking 3 stories
Owner: @API-team

→ Action: Escalate immediately
```

### Example 3: Discrepancy
```
6 shipped vs 4 completed in Shortcut
2 items not tracked

→ Ask: Do those items belong in Shortcut?
   Or: Update stories in Shortcut
```

---

## Daily Checklist for Developers

When writing daily in #dev-daily:

- [ ] Use exact format (✅ SHIPPED, ⤴️ IN PROGRESS, etc.)
- [ ] Add metadata (AI-assisted flag, owner mention, severity)
- [ ] Include links (Story ID, PR #, etc.)
- [ ] Keep format consistent
- [ ] Update Shortcut stories before writing daily
- [ ] Mention AI only if actually used

---

## Questions?

See docs in order:
1. QUICK-START.md - Get going fast
2. USAGE.md - How to use
3. MCP-INTEGRATION.md - This file
4. compare-daily.md - Examples
