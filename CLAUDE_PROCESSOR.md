# Daily Report Processor - Instructions for Claude Code

This file instructs Claude Code on how to process daily report comparison requests.

## Trigger Pattern

When user says anything like:
- "Compare [Name]'s daily report"
- "Compare [Name]'s daily"
- "Daily comparison for [Name]"
- "Check [Name]'s daily"

## Processing Steps

### Step 1: Extract Developer Name
From user input: `Compare Juan Agudelo's daily report`
Extract: `Juan Agudelo`

### Step 2: Search Slack #dev-daily (TODAY)
```
Use: mcp__claude_ai_Slack__slack_search_public
Query: "in:#dev-daily from:Juan Agudelo"
Filters:
  - created_date_from: "today"
  - created_date_to: "today"
```

Expected result:
```json
{
  "messages": [
    {
      "text": "✅ SHIPPED\n- Auth endpoint — AI-assisted — SC-1247\n...",
      "user": "U123...",
      "ts": "1710158400",
      "blocks": [...]
    }
  ]
}
```

### Step 3: Parse Daily Sections
Extract structured data from message text:

```javascript
const daily = {
  shipped: [
    {
      desc: "Auth endpoint",
      aiAssisted: true,
      manual: false,
      link: "SC-1247"
    }
  ],
  inProgress: [
    {
      desc: "Dashboard redesign",
      status: "70% complete"
    }
  ],
  today: [
    { desc: "Merge auth PR" },
    { desc: "Deploy to staging" }
  ],
  blockers: [
    {
      desc: "API schema approval",
      owner: "backend-team",
      severity: "🔴" // critical
    }
  ],
  aiInsights: [
    { desc: "Claude for refactoring" }
  ]
}
```

### Step 4: Find User in Shortcut
```
Use: mcp__shortcut__users_list
Find user matching: "Juan Agudelo"
Extract: user.id
```

### Step 5: Get Shortcut Completed Stories (Today)
```
Use: mcp__shortcut__stories_search
Filters:
  - owner: "Juan Agudelo"
  - isDone: true
  - completed: "today"
Extract: story ids, names, story_points, completed_at
```

Expected:
```json
[
  {
    "id": 1247,
    "name": "Auth endpoint",
    "state": "Done",
    "story_points": 5,
    "completed_at": "2026-03-11T14:30:00Z"
  }
]
```

### Step 6: Get Shortcut In Progress Stories
```
Use: mcp__shortcut__stories_search
Filters:
  - owner: "Juan Agudelo"
  - isDone: false
  - isStarted: true
Extract: story ids, names, status, story_points
```

### Step 7: Compare & Analyze

#### 7a: Shipped vs Completed
```
shipped_count = daily.shipped.length (5)
completed_count = shortcut_completed.length (3)
ai_assisted = daily.shipped.filter(s => s.aiAssisted).length (2)

Analysis:
IF shipped_count > completed_count:
  → "⚠️ 2 items shipped but not in Shortcut"
  → Possible: docs, code review, deploy (non-tracked work)
ELSE IF completed_count > shipped_count:
  → "⚠️ 1 item completed in Shortcut but not in daily"
  → Ask: Is story still being worked on?
ELSE:
  → "✅ Perfect match"

AI Usage:
  → "🤖 {ai_assisted}/{shipped_count} items AI-assisted"
```

#### 7b: In Progress Consistency
```
in_progress_daily = daily.inProgress.length (2)
in_progress_shortcut = shortcut_in_progress.length (2)

Analysis:
IF in_progress_daily === in_progress_shortcut:
  → "✅ In progress perfectly aligned"
ELSE:
  → "⚠️ Discrepancy: daily={X}, Shortcut={Y}"
```

#### 7c: Blockers Analysis
```
blocker_count = daily.blockers.length (1)

FOR EACH blocker:
  - Extract owner (for follow-up)
  - Check severity (🔴=critical, 🟡=high, 🟢=medium)
  - Impact: "blocking {X} in-progress stories"

IF critical blocker:
  → "🚨 Critical blocker - escalate to {owner}"
```

#### 7d: AI Usage Summary
```
total_shipped = daily.shipped.length
ai_count = daily.shipped.filter(s => s.aiAssisted).length
manual_count = total_shipped - ai_count
ai_percentage = (ai_count / total_shipped) * 100

Analysis:
IF ai_percentage < 20:
  → "📊 Low AI usage (not using AI tools much)"
ELSE IF ai_percentage > 60:
  → "🤖 High AI usage (great AI tool adoption)"
ELSE:
  → "📊 Balanced AI/Manual split"
```

#### 7e: Productivity Index
```
story_points = sum(shortcut_completed[].story_points)
today_planned = daily.today.length
completed_today = completed_count
in_progress_today = in_progress_count

index = (completed_today + in_progress_today) / today_planned * 100

Analysis:
IF index >= 90:
  → "✅ Excellent! On track"
ELSE IF index >= 70:
  → "✅ Good progress"
ELSE:
  → "⚠️ Below expected progress"
```

### Step 8: Generate Report

Format output as:

```
📊 Daily Report Comparison: {Name}
📅 {Date} | {Time from Slack}

📝 DAILY REPORT PARSED
═══════════════════════

✅ Shipped ({count})
   • {item1} [🤖 AI-assisted] [{link}]
   • {item2} [🖱️ Manual]
   ...

⏳ In Progress ({count})
   • {item} [{status}]
   ...

🎯 Today ({count} planned)
   • {item}
   ...

🚫 Blockers ({count})
   • {item} [@{owner}] [{severity}]
   ...

💡 AI Insights ({count})
   • {insight}
   ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 COMPARISON ANALYSIS
═════════════════════

✅ SHIPPED vs COMPLETED
   {shipped_count} shipped, {completed_count} in Shortcut
   [Analysis: reason for difference]
   🤖 AI-assisted: {ai_count}/{shipped_count} ({ai_percent}%)
   Status: [✅ Expected / ⚠️ Discrepancy]

⏳ IN PROGRESS
   Daily: {daily_count}, Shortcut: {shortcut_count}
   Status: [✅ Aligned / ⚠️ Mismatch]

🚫 BLOCKERS ({blocker_count})
   [For each blocker]
   • {description} (@{owner}) [{severity}]
   Impact: Blocking {X} stories
   Action: [Follow up / Escalate]

💡 AI USAGE
   {ai_count}/{shipped_count} items AI-assisted ({ai_percent}%)
   Status: [Low / Balanced / High]

📊 PRODUCTIVITY INDEX
   Planned: {planned}, Completed: {completed}, In Progress: {in_progress}
   Index: {index}%
   Status: [✅ Excellent / ✅ Good / ⚠️ Below Expected]

═══════════════════════════════

SUMMARY:
[Key findings, actions needed, overall assessment]
```

---

## Edge Cases

### Case 1: No Daily Found
```
User "Juan Agudelo" not found in #dev-daily today
→ Check:
   - Did they post a daily?
   - Is the name spelled correctly?
   - Is #dev-daily the right channel?
```

### Case 2: No Shortcut User Match
```
"Juan Agudelo" found in Slack but not in Shortcut
→ Check:
   - User might use different name in Shortcut
   - Suggest: Find correct Shortcut user
```

### Case 3: Significant Discrepancy
```
10 shipped but only 2 completed in Shortcut
→ Likely: Items include non-Shortcut work (docs, meetings, deploys)
→ Action: Discuss tracking standards with team
```

### Case 4: Critical Blocker with High Impact
```
🔴 Critical blocker blocking 5 stories
→ Immediate action: Notify @owner, escalate
```

---

## Implementation Notes

✅ Use existing MCPs (Slack + Shortcut already configured globally)
✅ Parse format strictly (section headers with emojis)
✅ Extract metadata (AI-assisted, owner, severity)
✅ Handle edge cases gracefully
✅ Generate actionable insights
✅ Keep output concise but comprehensive

---

## Testing Examples

### Test Case 1: Normal Day
```
Input: "Compare Juan Agudelo's daily"
Expected: Full comparison with all sections
```

### Test Case 2: Blocker Alert
```
Input: "Compare Cristian Arrieta's daily"
Expected: Highlight critical blocker, suggest escalation
```

### Test Case 3: AI Usage Day
```
Input: "Compare Felipe Moreno's daily"
Expected: High AI usage stats, acknowledge tool adoption
```

---

## Success Criteria

✅ Extract developer name correctly
✅ Find and parse daily from Slack
✅ Extract all metadata (AI-assisted, owner, severity, links)
✅ Query Shortcut successfully
✅ Compare counts and identify discrepancies
✅ Generate comprehensive report
✅ Suggest actionable follow-ups
✅ Complete in < 30 seconds
