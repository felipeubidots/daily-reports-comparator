# Daily Report Comparison - Claude Code Integration

## Quick Reference

### Command from Claude Code
Type in Claude Code:
```
Compare Juan Agudelo's daily report
```

Claude will automatically:
1. Search #dev-daily for messages from Juan Agudelo from today
2. Parse his daily report (Shipped, In Progress, Today, Blockers, AI Insights)
3. Query Shortcut for his story activity
4. Generate detailed comparison

## What Gets Compared

### Daily Report Sections (from Slack #dev-daily)
- **Shipped**: Tasks the developer claims to have completed
- **In Progress**: Tasks being worked on
- **Today**: Tasks planned for the day
- **Blockers**: Issues preventing progress
- **AI Insights**: Tools used or insights gained

### Shortcut Data (for same date)
- **Completed Stories**: Stories moved to "Done" state
- **In Progress Stories**: Stories in "In Progress" or "In Dev" state
- **Story Points**: Estimated vs actual completion
- **Timeline**: When stories were completed

## Comparison Analysis

### 1. Shipped vs Completed
```
Daily reports: 5 items shipped
Shortcut shows: 3 stories completed
Result: ⚠️ Discrepancy of 2 items
```

**Possible causes:**
- Daily includes tasks not tracked in Shortcut (documentation, meetings, etc.)
- Tasks completed but not updated in Shortcut
- Task names don't match between systems

### 2. In Progress Consistency
```
Daily reports: 2 items in progress
Shortcut shows: 3 stories in progress
Result: ⚠️ Missing 1 task from daily
```

**Action:** Confirm if extra Shortcut task is being tracked elsewhere

### 3. Blockers Impact Assessment
```
Reported blockers: 1 (API integration)
Impact: 2 stories in progress blocked
Recommendation: Escalate to API team
```

### 4. Today's Planning
```
Planned for today: 4 items
Completed today: 3 items
In progress: 2 items
Result: ✅ On track
```

## Example Output

```
📊 Daily Report Comparison: Juan Agudelo
📅 Date: March 11, 2026
⏰ Daily Report Time: 9:30 AM

📝 DAILY REPORT CONTENT
=======================

✅ Shipped (5 items)
   • FE: Fixed navbar layout issue [🤖 AI-assisted] [SC-1247]
   • BE: API endpoint for user profile [🖱️ Manual] [PR-1248]
   • Docs: Updated API documentation [🖱️ Manual] [repo]
   • Testing: 8 test cases for auth flow [🤖 AI-assisted]
   • Deploy: Released v2.3.1 to staging [🖱️ Manual]

⏳ In Progress (2 items)
   • Dashboard redesign [70% complete]
   • WebSocket implementation [code review pending]

🎯 Today's Plan (4 items)
   • Code review for 3 PRs
   • Performance optimization
   • Team standup prep
   • Customer demo prep

🚫 Blockers (1 item)
   • Waiting for design approval on new components [@design-team] 🟡

💡 AI Insights (2 items)
   • Used Claude for refactoring suggestions
   • GitHub Copilot for test generation

---

🎯 SHORTCUT ACTIVITY
====================

✅ Completed Today: 3 stories
   • SC-1247: Fix navbar CSS
   • SC-1248: User profile endpoint
   • SC-1249: Add auth tests

⏳ In Progress: 2 stories
   • SC-1250: Dashboard redesign
   • SC-1251: WebSocket implementation

📊 Story Points: 13 points completed

---

📈 COMPARISON ANALYSIS
======================

✅ Shipped Count: 5 items (daily) vs 3 stories (Shortcut)
   → 2 items not tracked in Shortcut (docs, deploy)
   → Status: Expected difference

✅ In Progress: 2 items match perfectly
   → All items tracked in both systems

✅ Blockers: 1 blocker on 1 story
   → SC-1250 (Dashboard) blocked on design approval
   → Recommendation: Follow up with design team

✅ Productivity: 13 story points completed (above average)

⏳ Planned vs Actual: 4 items planned, 3 shipped, 2 in progress
   → Productivity Index: 95% (Great day!)

---

SUMMARY:
✅ All data consistent
✅ No major discrepancies
✅ High productivity
⚠️ One blocker to monitor
```

## Implementation Details

### Step 1: Find Developer in Slack
```javascript
// Search for user by name
slack_search_users("Juan Agudelo")
// Returns: user_id, real_name, email, profile info
```

### Step 2: Get Today's Daily Report
```javascript
// Search #dev-daily for today's messages from user
slack_search_public({
  query: "#dev-daily from:Juan Agudelo",
  created_date_from: "today",
  created_date_to: "today"
})
```

### Step 3: Parse Daily Sections
```javascript
// Parse message text into sections
const sections = {
  shipped: [...],
  inProgress: [...],
  today: [...],
  blockers: [...],
  aiInsights: [...]
}
```

### Step 4: Get Shortcut Data
```javascript
// Find user in Shortcut
mcp__shortcut__users_list()
// Find stories completed today
mcp__shortcut__stories_search({
  owner: "Juan Agudelo",
  completed: "today",
  isDone: true
})
```

### Step 5: Compare & Report
```javascript
// Compare shipped count with completed stories
// Check consistency of in-progress items
// Validate blockers against story states
// Generate comparison report
```

## Tips for Accurate Comparisons

### For Developers
1. **Keep daily in sync with Shortcut**
   - Update story status before writing daily
   - Use story IDs in daily report for linking

2. **Be specific**
   - Include story ID in shipped items: "SC-1247: Fix navbar"
   - Link blockers to stories: "Blocked on SC-1250"

3. **Consistent naming**
   - Use same task names in daily and Shortcut
   - Keep descriptions short and clear

### For Team Leads
1. **Regular review**
   - Check comparisons weekly for patterns
   - Identify tracking issues early

2. **Identify process gaps**
   - Tasks not in Shortcut?
   - Shortcut not being updated?
   - Communication breakdown?

3. **Follow-up actions**
   - Address blockers immediately
   - Help team update story states
   - Optimize tracking process

## Troubleshooting

### Daily Report Not Found
- Confirm user posted in #dev-daily today
- Check if user name matches Slack profile
- Look for similar names (Juan vs Juan Pablo)

### Discrepancies
- Check story completion time vs daily time
- Verify if task was moved to blocked/done after daily
- Look for tasks not tracked in Shortcut

### Missing Information
- Some tasks may not need Shortcut tracking
- Verify if non-technical work (docs, meetings) should be in Shortcut
- Discuss with team about tracking standards

## Future Features

- Weekly comparison summary
- Team comparison dashboard
- Productivity metrics over time
- Burndown chart integration
- Automated daily validation
- Slack notification of discrepancies
