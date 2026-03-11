# Quick Start Guide

## ✅ You're All Set! (MCPs Already Configured)

Your Slack + Shortcut MCPs are globally configured, so you can start using the comparator right away.

### Step 1: Start Using It (2 seconds)
From Claude Code, just type:
```
Compare Juan Agudelo's daily report
```

### Step 2: Enjoy the Output
You'll immediately see:
- ✅ Shipped items (with AI-assisted flags)
- ⏳ In Progress items
- 🎯 Today's priorities
- 🚫 Blockers (with severity)
- 💡 AI Insights used
- 📈 Comparison with Shortcut data

---

## Daily Report Template (for team)

When writing daily in #dev-daily:

```
✅ SHIPPED   [Completed work] — [AI-assisted / Manual] — [link]
⤴️ IN PROGRESS   [Open PRs or In Progress tickets] — [status]
🎯 TODAY   [Highest priority from In Progress or next up in sprint]
🏗️ BLOCKERS  [Tickets with blocked label or blocker mentioned] — @[owner] — [🔴🟡🟢]
💡 AI INSIGHT  [Only include if commits/comments mention AI learnings]
```

**Example:**
```
✅ SHIPPED
- User auth endpoint — AI-assisted — SC-1247
- API docs update — Manual — PR-456

⤴️ IN PROGRESS
- Dashboard redesign — 70% complete
- Performance optimization — code review pending

🎯 TODAY
- Complete API tests
- Deploy to staging
- Team meeting prep

🏗️ BLOCKERS
- Design approval pending — @design-team — 🟡
- API schema review — @backend-lead — 🔴

💡 AI INSIGHT
- Used Claude for code refactoring
```

---

## What Gets Compared

| Your Daily | Shortcut | Result |
|-----------|----------|--------|
| 5 shipped | 3 completed stories | Discrepancy noted (2 items may not be in Shortcut) |
| 2 in progress | 2 in progress | ✅ Perfect match |
| 1 blocker | Impact on stories | 🚫 Blocker analysis |
| 3 AI items | Story points | 🤖 AI usage stats |

---

## Sample Output

```
📊 Daily Report Comparison: Juan Agudelo

📝 DAILY REPORT
✅ Shipped (3 items)
   • User profile endpoint [🤖 AI-assisted] [SC-1247]
   • Navbar fix [🖱️ Manual] [SC-1248]
   • API docs [🖱️ Manual] [PR-456]

⏳ In Progress (2 items)
   • Dashboard redesign [70% complete]
   • Performance optimization [awaiting review]

🎯 Today (4 items planned)
   • Merge PR #456
   • Complete test suite
   • Stakeholder demo
   • Performance benchmarks

🚫 Blockers (1 item)
   • Design system approval [@design-team] 🟡

💡 AI Insights (1)
   • Claude used for refactoring

📈 COMPARISON
✅ SHIPPED vs COMPLETED
   3 shipped vs 3 completed
   ✅ Perfect match: 3 shipped = 3 completed
   🤖 AI-assisted work: 1/3 items

⏳ IN PROGRESS
   ✅ Perfect match: 2 items

🚫 BLOCKERS (1)
   • Design system approval (@design-team) 🟡
   1 items in progress while 1 blockers exist

📅 TODAY'S PLAN (4 items planned)
   Shipped: 3, In Progress: 2
   ✅ On track for daily goals
```

---

## Docs

- [USAGE.md](USAGE.md) - Detailed usage guide
- [README.md](README.md) - Technical setup
- [compare-daily.md](compare-daily.md) - Comparison details
- [CLAUDE.md](CLAUDE.md) - Claude Code integration

---

## FAQ

**Q: How often should I run this?**
A: Daily after standup or at end of day

**Q: What if my daily format is different?**
A: Use the template provided. Consistency helps accuracy.

**Q: Why is shipped count different from Shortcut?**
A: Normal - not all work needs Shortcut (docs, meetings, deploy, code reviews)

**Q: How do I get tokens?**
A: See Step 1 above

**Q: Can I use this from Claude Code?**
A: Yes! Just say "Compare [Name]'s daily report"
