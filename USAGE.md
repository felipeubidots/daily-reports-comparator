# Daily Report Comparator - Usage Guide

## From Claude Code

### Basic Command
Simply tell Claude Code to compare a developer's daily report:

```
Compare Juan Agudelo's daily report
Compare Cristian Arrieta's daily
Compare Felipe Moreno's daily
```

Claude will automatically:
1. Search #dev-daily for today's message from that developer
2. Parse the daily report sections
3. Query Shortcut for their completed and in-progress work
4. Generate a detailed comparison showing:
   - Items reported shipped vs completed in Shortcut
   - Items in progress consistency
   - Blockers and their impact
   - Overall productivity metrics

### Expected Output

```
📊 Daily Report Comparison: [Developer Name]

📝 DAILY REPORT
===============
✅ Shipped (5)
   • Task 1
   • Task 2
   ...

⏳ In Progress (2)
   • Task A
   • Task B

📅 Today (4 planned)

🚫 Blockers (1)
   • Blocker description

🤖 AI Insights (2)
   • Insight 1

---

🎯 SHORTCUT ACTIVITY
====================
✅ Completed: 3 stories
⏳ In Progress: 2 stories
📊 Story Points: 13 completed

---

📈 COMPARISON
=============
✅ Shipped: 5 (daily) vs 3 (Shortcut) - expected difference
✅ In Progress: 2 items match perfectly
✅ Blockers: 1 identified and tracked
✅ Productivity: 95% (Great day!)
```

---

## Command Line Version

If you prefer direct command line access:

### Setup
```bash
cd /c/Work/daily-reports

# Set environment variables (one time)
export SLACK_TOKEN="xoxb-your-token"
export SHORTCUT_TOKEN="your-token"
```

### Run
```bash
node index.js "Developer Name"
```

### Example
```bash
node index.js "Juan Agudelo"
```

---

## Daily Report Format in Slack

Your daily in #dev-daily should follow this format:

```
✅ SHIPPED   [Completed work from merged PRs or Done tickets] — [AI-assisted / Manual] — [link]
⤴️ IN PROGRESS   [Open PRs or In Progress tickets] — [status]
🎯 TODAY   [Highest priority from In Progress or next up in sprint]
🏗️ BLOCKERS  [Tickets with blocked label or blocker mentioned] — @[owner] — [🔴🟡🟢]
💡 AI INSIGHT  [Only include if commits/comments mention AI learnings]
```

### Example:
```
✅ SHIPPED
- Feature: User profile page — AI-assisted — #1247
- Fix: Navbar bug — Manual — #1248
- Docs: API documentation — Manual — PR-456

⤴️ IN PROGRESS
- Dashboard redesign — 70% complete
- WebSocket integration — code review pending

🎯 TODAY
- Complete dashboard review
- Deploy to staging
- Performance optimization

🏗️ BLOCKERS
- API schema design — @architecture-team — 🔴
- Design approval — @design-team — 🟡

💡 AI INSIGHT
- Used Claude for refactoring suggestions on auth module
```

**Important:**
- Slack automatically adds your name, date, time
- You only need to write the content
- Section order doesn't matter
- Bullets with "-" are parsed as items

---

## What Gets Compared

| Source | Data |
|--------|------|
| **Slack #dev-daily** | What developer says they did |
| **Shortcut** | What Shortcut system shows they completed |

### Analysis Checks
1. **Shipped Count**: Reported items vs completed stories
2. **In Progress**: Daily items vs Shortcut stories
3. **Blockers**: Reported blockers vs story state
4. **Consistency**: Same items tracked in both systems

---

## Common Scenarios

### Scenario 1: More Shipped Than Completed
```
Daily: 5 shipped items
Shortcut: 3 completed stories

Analysis:
✅ Expected - not all work needs Shortcut tracking
   (e.g., docs, meetings, deploy, reviews)

Action: Verify which items should be in Shortcut
```

### Scenario 2: Discrepancy in Counts
```
Daily: 2 in progress
Shortcut: 3 in progress

Analysis:
⚠️ Extra item in Shortcut not mentioned in daily

Action: Confirm if item is still active
        or should be updated
```

### Scenario 3: Blocker Alert
```
Reported: 1 blocker ("Waiting on API")
Impact: 2 stories stuck

Analysis:
🚨 Blocker is affecting multiple tasks

Action: Escalate or follow up on blocker
```

---

## Tips

### For Developers
✅ Update Shortcut story status before writing daily
✅ Use consistent task names in daily and Shortcut
✅ Include story ID for important items: "SC-1247: Fix navbar"
✅ Link blockers to stories: "Blocked on SC-1250"

### For Team Leads
✅ Check comparisons to identify tracking gaps
✅ Look for patterns of incomplete Shortcut updates
✅ Address blockers immediately when identified
✅ Use data to improve team processes

---

## Troubleshooting

**Daily report not found?**
- Confirm message was posted in #dev-daily
- Check if name matches Slack profile exactly
- Look for typos in developer name

**Shortcut data missing?**
- Verify developer exists in Shortcut
- Check if stories are assigned to them
- Ensure Shortcut token is valid

**Discrepancies unexpected?**
- Some work might not belong in Shortcut
- Stories might have been completed before the daily
- Team might have different tracking standards

---

## Questions?

Refer to:
- [README.md](README.md) - Full technical details
- [compare-daily.md](compare-daily.md) - Detailed comparison guide
- [CLAUDE.md](CLAUDE.md) - Claude Code integration details
