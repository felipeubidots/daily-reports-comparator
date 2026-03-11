# Daily Report Comparator - Quick Reference

## 🚀 One Command (From Claude Code)

```
Compare Juan Agudelo's daily report
```

That's it! Claude handles everything.

---

## 📋 Daily Template (for team)

```
✅ SHIPPED   [work] — [AI-assisted/Manual] — [link]
⤴️ IN PROGRESS   [work] — [status]
🎯 TODAY   [top priorities]
🏗️ BLOCKERS  [issue] — @[owner] — [🔴🟡🟢]
💡 AI INSIGHT  [only if AI used]
```

---

## 📊 What Gets Compared

| Check | Daily | Shortcut | Result |
|-------|-------|----------|--------|
| **Shipped** | ✅ Items | 📌 Completed stories | Discrepancy alert |
| **In Progress** | ✅ Items | 📌 In-progress stories | Consistency check |
| **Blockers** | 🚫 Issues | 📌 Story state impact | Severity & action |
| **AI Usage** | 🤖 Flags | 📌 Story points | Percentage & trend |

---

## 📈 Output Includes

✅ **Shipped vs Completed**
   - Count comparison
   - AI-assisted stats
   - Link tracking

⏳ **In Progress Alignment**
   - Daily vs Shortcut match
   - Status per item
   - Missing items

🚫 **Blocker Analysis**
   - Severity indicators
   - Owner mentions
   - Story impact

💡 **AI Usage Stats**
   - % of work AI-assisted
   - Tool adoption rate
   - Insights recorded

📊 **Productivity Index**
   - Planned vs completed
   - On-track assessment
   - Story points completed

---

## 🔧 Format Details

### SHIPPED
```
✅ SHIPPED
- Task name — AI-assisted — SC-1247
- Task name — Manual — PR-456
```
**Metadata**: AI-assisted flag, Manual flag, Link

### IN PROGRESS
```
⏳ IN PROGRESS
- Task name — 70% complete
- Task name — code review pending
```
**Metadata**: Status/progress

### TODAY
```
🎯 TODAY
- Priority 1
- Priority 2
```
**No metadata needed**

### BLOCKERS
```
🏗️ BLOCKERS
- Blocker — @team-name — 🔴
- Blocker — @team-name — 🟡
```
**Metadata**: Owner (@mention), Severity (🔴🟡🟢)
- 🔴 = Critical
- 🟡 = High
- 🟢 = Medium

### AI INSIGHT
```
💡 AI INSIGHT
- Claude for refactoring
- Copilot for test generation
```
**Only if AI was actually used!**

---

## 🎯 Examples

### Example 1: Normal Day
```
User: "Compare Juan Agudelo's daily"

Output:
✅ Shipped 5, Completed 3 (docs + deploy not tracked) ✅
⏳ In Progress 2 = 2 stories ✅
🚫 No blockers ✅
🤖 2/5 AI-assisted (40%) ✅
📊 Productivity: 95% ✅
```

### Example 2: Alert - Blocker
```
User: "Compare Cristian Arrieta's daily"

Output:
🚫 BLOCKERS (1 Critical)
   • API schema — @backend-lead — 🔴
   Impact: Blocking 3 stories
   Action: ⚠️ Escalate to backend team
```

### Example 3: Alert - Discrepancy
```
User: "Compare Felipe Moreno's daily"

Output:
⚠️ SHIPPED vs COMPLETED
   6 shipped vs 2 completed in Shortcut
   Difference: 4 items
   Check: Are these items tracked elsewhere?
```

---

## 📚 Docs

| Doc | For |
|-----|-----|
| **QUICK-START.md** | 30-second overview |
| **USAGE.md** | Detailed guide |
| **MCP-INTEGRATION.md** | How MCPs work |
| **CLAUDE_PROCESSOR.md** | Technical processing steps |
| **REFERENCE.md** | This file - quick lookup |

---

## ❓ FAQ

**Q: Why is shipped count different from Shortcut?**
A: Normal - includes work outside Shortcut (docs, code review, deploy, meetings)

**Q: What if I don't mention AI, but used it?**
A: Won't be counted. Only count it if explicitly mentioned in AI INSIGHT

**Q: What if daily format is wrong?**
A: Use exact format provided. Consistency = better parsing

**Q: What do severity emojis mean?**
- 🔴 = Critical - needs immediate action
- 🟡 = High - address today
- 🟢 = Medium - can wait

**Q: How often should I run this?**
A: Daily after writing your daily in #dev-daily

**Q: Can other people see the comparison?**
A: Only if you ask Claude in shared context

---

## 🚀 Do This Now

1. **Share template** with team
2. **Try once**: "Compare [Your Name]'s daily"
3. **Adjust format** if needed
4. **Run daily** after writing daily in #dev-daily

---

## 💡 Tips

✅ Update Shortcut before writing daily
✅ Use consistent task names
✅ Include story IDs in links
✅ Only mention AI if you used it
✅ Be specific in blocker descriptions
✅ Mention owner for blockers (@team-name)

---

Last Updated: March 11, 2026
