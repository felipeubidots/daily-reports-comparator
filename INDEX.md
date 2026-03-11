# Daily Report Comparator - Complete Project

**Status**: ✅ Ready to use (MCPs configured globally)
**Location**: `C:\Work\daily-reports`
**Date**: March 11, 2026

---

## 🚀 START HERE

### For Immediate Use
```
→ Read: REFERENCE.md (3 min)
→ Try: "Compare Juan Agudelo's daily" in Claude Code
→ Done!
```

### For Setup & Details
1. **QUICK-START.md** - 30 seconds overview
2. **USAGE.md** - Complete usage guide
3. **README.md** - Technical setup
4. **MCP-INTEGRATION.md** - How MCPs integrate
5. **CLAUDE_PROCESSOR.md** - Processing steps
6. **REFERENCE.md** - Quick lookup

---

## 📋 Project Structure

```
/c/Work/daily-reports/
├── INDEX.md                    # This file
├── REFERENCE.md                # Quick lookup (START HERE)
├── QUICK-START.md              # 30-second setup
├── USAGE.md                    # Full usage guide
├── README.md                   # Technical details
├── CLAUDE.md                   # Claude Code instructions
├── CLAUDE_PROCESSOR.md         # Processing algorithm
├── MCP-INTEGRATION.md          # MCP details
├── compare-daily.md            # Detailed examples
├── index.js                    # Main script (optional)
├── claude-code-compare.js      # Claude-specific version
├── package.json                # Node config
└── .env.example                # Token template (not needed - MCPs global)
```

---

## 🎯 What It Does

Compares developer daily reports from Slack (#dev-daily) with Shortcut activity:

**Input**: Developer's daily in Slack #dev-daily
```
✅ SHIPPED   [work] — [AI-assisted/Manual] — [link]
⤴️ IN PROGRESS   [work] — [status]
🎯 TODAY   [priorities]
🏗️ BLOCKERS  [issue] — @[owner] — [severity]
💡 AI INSIGHT  [learning]
```

**Process**:
1. Search Slack for daily
2. Parse sections & metadata
3. Query Shortcut for activities
4. Compare & analyze
5. Generate report

**Output**: Detailed comparison with actionable insights
```
✅ Shipped vs Completed: Analysis
⏳ In Progress: Alignment check
🚫 Blockers: Impact & action
💡 AI Usage: Stats & trends
📊 Productivity: Index & assessment
```

---

## 💡 Key Features

✅ **Automatic Metadata Extraction**
- AI-assisted flags (🤖)
- Manual work tracking (🖱️)
- Blocker severity indicators (🔴🟡🟢)
- Owner mentions (@team)
- Story links (SC-1247, PR-456)

✅ **Rich Comparison**
- Shipped vs completed count
- In-progress alignment check
- Blocker impact analysis
- AI usage percentage
- Productivity index

✅ **Actionable Insights**
- Discrepancy alerts
- Follow-up recommendations
- Severity highlighting
- Team escalation suggestions

✅ **Team Ready**
- Clear format template
- Consistent structure
- Easy to follow
- No configuration needed

---

## 🔄 How to Use

### From Claude Code (Easiest)
```
Compare Juan Agudelo's daily report
Compare Cristian Arrieta's daily
Compare Felipe Moreno's daily
```

Claude automatically handles:
- Finding the daily in Slack
- Parsing all sections
- Querying Shortcut
- Generating comparison

### From Command Line (Optional)
```bash
cd /c/Work/daily-reports
node index.js "Developer Name"
```

---

## 📊 Daily Report Template

Share this with your team:

```
✅ SHIPPED   [Completed work from merged PRs/Done tickets] — [AI-assisted / Manual] — [link]
⤴️ IN PROGRESS   [Open PRs or In Progress tickets] — [status]
🎯 TODAY   [Highest priority from In Progress or next up in sprint]
🏗️ BLOCKERS  [Tickets with blocked label or blocker mentioned] — @[owner] — [🔴🟡🟢]
💡 AI INSIGHT  [Only include if commits/comments mention AI learnings]
```

### Example:
```
✅ SHIPPED
- Auth endpoint — AI-assisted — SC-1247
- Navbar bug fix — Manual — SC-1248

⤴️ IN PROGRESS
- Dashboard redesign — 70% complete
- Performance optimization — code review pending

🎯 TODAY
- Merge auth PR
- Deploy to staging
- Stakeholder demo

🏗️ BLOCKERS
- API schema design — @backend-team — 🔴
- Design approval — @design-team — 🟡

💡 AI INSIGHT
- Claude for refactoring suggestions
- Copilot for test generation
```

---

## 📈 Example Output

```
📊 Daily Report Comparison: Juan Agudelo
📅 March 11, 2026 | 9:30 AM

✅ SHIPPED (5 items)
   • Auth endpoint [🤖 AI-assisted] [SC-1247]
   • Navbar fix [🖱️ Manual] [SC-1248]
   • API docs [🖱️ Manual] [PR-456]
   ...

⏳ IN PROGRESS (2 items)
   • Dashboard redesign [70% complete]
   • Performance opt [code review pending]

🎯 TODAY (4 planned)
   • Merge PR
   • Deploy
   • Demo
   • Reviews

🚫 BLOCKERS (1)
   • API schema [@backend-team] 🔴

💡 AI INSIGHTS (2)
   • Claude for refactoring
   • Copilot for tests

━━━━━━━━━━━━━━━━━━━━━━━━

📈 COMPARISON

✅ SHIPPED vs COMPLETED
   5 shipped, 3 in Shortcut
   2 items may not need Shortcut (docs, deploy, reviews)
   Status: ✅ Expected difference
   🤖 AI-assisted: 2/5 (40%)

✅ IN PROGRESS
   2 items match perfectly

🚫 BLOCKERS (1 Critical)
   • API schema — @backend-team — Blocking 2 stories
   Action: Follow up with backend team

💡 AI USAGE
   2/5 items (40%) AI-assisted
   Status: ✅ Good tool adoption

📊 PRODUCTIVITY
   Planned: 4, Completed: 5, In Progress: 2
   Status: ✅ Excellent (105%)
```

---

## ✅ Next Steps

1. **Today**
   - Read REFERENCE.md (3 min)
   - Try: "Compare [Name]'s daily" in Claude Code

2. **Tomorrow**
   - Share template with team
   - Team starts writing dailies in format

3. **This Week**
   - Run daily comparisons
   - Adjust format if needed
   - Monitor for patterns

4. **This Month**
   - Weekly analysis of trends
   - Team feedback & refinement
   - Expand if needed

---

## 📚 Documentation Map

**Fast Path**:
- REFERENCE.md → Start using

**Full Setup**:
- QUICK-START.md → USAGE.md → README.md

**Technical**:
- MCP-INTEGRATION.md → CLAUDE_PROCESSOR.md

**Examples**:
- compare-daily.md → Real-world scenarios

---

## ❓ Common Questions

**Q: Do I need to install anything?**
A: No, MCPs are globally configured. Just use Claude Code.

**Q: What if the daily format is wrong?**
A: Use the exact template provided. Format consistency = better parsing.

**Q: Why is shipped count different from Shortcut?**
A: Expected - includes work outside Shortcut (docs, meetings, deploys).

**Q: Can I run this from command line?**
A: Yes, `node index.js "Name"` - but Claude Code is easier.

**Q: How often should I run this?**
A: Daily after writing your daily in #dev-daily.

---

## 🎯 Success Criteria

✅ Team understands the format
✅ Developers write consistent dailies
✅ Comparisons run smoothly
✅ Discrepancies are identified early
✅ Blockers get escalated
✅ AI usage is tracked
✅ Productivity is visible

---

## 📞 Support

Refer to the appropriate doc:
- **"How do I use this?"** → USAGE.md
- **"I want quick reference"** → REFERENCE.md
- **"How does it work?"** → CLAUDE_PROCESSOR.md
- **"Show me examples"** → compare-daily.md
- **"Technical setup"** → README.md

---

## 🚀 Ready?

```
1. Read: REFERENCE.md
2. Try: "Compare [Name]'s daily"
3. Enjoy insights!
```

---

Created: March 11, 2026
Status: ✅ Production Ready
License: Internal Use - Ubidots Team
