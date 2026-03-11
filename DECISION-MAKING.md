# From Lists to Decisions: The New Analysis Approach

## The Problem We Solved

### Before (Just Reporting):
```
Juan Agudelo's Daily Report
✅ Shipped: 5 items
⏳ In Progress: 2 items
🚫 Blockers: 1 item
🤖 AI Usage: 40%

Scrum Master reaction: "Okay... so what do I do with this?"
```

### After (Actionable Analysis):
```
DISCREPANCY ANALYSIS:
✅ Reported 5 shipped, Shortcut shows 3 completed
Assessment: EXPECTED - 2 items are non-Shortcut work
Action: MONITOR - nothing needed today

CAPACITY vs COMMITMENT:
Planned: 4 items | Completed: 3 | In Progress: 2
Delivery Index: 125% (overdelivering)
Assessment: CAN INCREASE LOAD
Action: Assign more tasks next sprint

BLOCKER ANALYSIS:
Critical blockers: 0 | High: 0 | Medium: 0
Risk to sprint: LOW
Action: NONE

OVERALL HEALTH SCORE: 92/100 ✅ HEALTHY
Recommendation: Keep current assignments, consider for stretch goals

Scrum Master reaction: "Perfect, this dev is solid, can rely on them for critical path"
```

---

## The 8 Dimensions of Analysis

Each dimension answers a specific decision question:

### 1. DISCREPANCY ANALYSIS
**Question**: Is the developer accurately tracking work?
**Metric**: Shipped count vs Shortcut completed count
**Action Trigger**: Gap > 2 items AND recurring

Example outputs:
- ✅ "Perfect alignment" → No action needed
- ⚠️ "Expected discrepancy" → Monitor only
- 🚨 "Concerning pattern" → 1-on-1 to clarify

---

### 2. ESTIMATION ACCURACY
**Question**: Are story estimates reliable?
**Metric**: Average story points per completed story
**Action Trigger**: Consistent over/underestimation

Example outputs:
- ✅ "Balanced estimates" → Good planning basis
- ⚠️ "Slight overestimation" → Story is conservative
- 🚨 "60% underestimated" → Recalibrate estimates

---

### 3. CAPACITY vs COMMITMENT
**Question**: Can this developer deliver what we're asking?
**Metric**: Delivery Index = (shipped + in-progress) / planned × 100
**Action Trigger**: <70% or >120%

Example outputs:
- ✅ 95% → "On track, good planning"
- 🚀 125% → "Can handle more load"
- 🚨 50% → "Way behind, investigate now"

---

### 4. BLOCKER ANALYSIS
**Question**: What's blocking this developer? How urgent?
**Metric**: Blocker count + severity + impact
**Action Trigger**: Any critical blocker

Example outputs:
- ✅ "No blockers" → Low risk
- ⚠️ "1 high-severity blocker" → Follow up today
- 🚨 "Critical blocker blocking 3 stories" → Escalate NOW

---

### 5. AI & TOOL ADOPTION
**Question**: Is the team using modern tools effectively?
**Metric**: % of work done with AI assistance
**Action Trigger**: <10% (not adopting) or >70% (over-reliance)

Example outputs:
- 📊 "<10%" → "Need AI training"
- ✅ "40%" → "Good balanced adoption"
- 🤖 "75%" → "Monitor for quality"

---

### 6. IN-PROGRESS ALIGNMENT
**Question**: Is daily report synced with actual system state?
**Metric**: In-progress items in daily vs Shortcut
**Action Trigger**: Discrepancy > 1 item

Example outputs:
- ✅ "Perfect sync" → Excellent discipline
- ⚠️ "Off by 1" → Minor variance acceptable
- 🚨 "3 item gap" → Sync Shortcut before standup

---

### 7. DEVELOPER HEALTH SCORE
**Question**: Is this developer okay? Do they need help?
**Metric**: Composite score based on all above factors
**Range**: 0-100
**Action Trigger**: Score < 60

Example outputs:
- ✅ 85+ → "Healthy, no concerns"
- ⚠️ 60-84 → "Needs attention, minor issues"
- 🚨 <60 → "Critical, immediate 1-on-1 required"

---

### 8. ACTIONABLE RECOMMENDATIONS
**Question**: What should I do about this?
**Format**: Prioritized list of actions
**Specificity**: Who, what, by when

Example outputs:
```
1. 🚨 ESCALATE API blocker to @backend-team (by EOD)
2. Add missing Shortcut items to sprint (by next standup)
3. Consider for stretch goals in next sprint
4. No action required - developer is healthy
```

---

## Decision Framework by Metric

### 🎯 Delivery Index (Most Important)
```
< 50%   = 🚨 CRITICAL - "This dev is way behind"
         Action: Emergency investigation, unblock ASAP
         Decision: Do they need help? Is task appropriate?

50-70%  = ⚠️ BEHIND - "Slipping but catchable"
         Action: Monitor, identify blockers
         Decision: Can we help unblock? Adjust timeline?

70-90%  = ✅ OK - "Slightly under plan"
         Action: Continue, watch trend
         Decision: Is this normal for this dev? Sprint progress okay?

90-110% = ✅ PERFECT - "Exactly on track"
         Action: Maintain
         Decision: This is ideal planning

110%+   = 🚀 OVERDELIVERING - "Ahead of plan"
         Action: Increase load next sprint
         Decision: Can we add stretch goals? Is dev burnt out?
```

### 🚫 Blocker Analysis (Second Most Important)
```
🔴 CRITICAL = Blocking 3+ stories = ESCALATE IMMEDIATELY
             Get ETA to unblock by EOD, plan contingency

🟡 HIGH     = Blocking 1-2 stories = Follow up today
             Is owner aware? What's blocking the blocker?

🟢 MEDIUM   = Blocking 0 stories = Monitor
             Expected to impact soon?

CLEAR       = No blockers = Low risk to sprint
             Good sign
```

### 📊 Discrepancy (Tracking Quality)
```
Zero gap        = Perfect tracking, low process risk
1-2 item gap    = Expected, acceptable
3+ item gap     = Concern, needs clarification
Recurring issue = Systemic problem, process needs change
```

---

## Real-World Examples

### Example 1: The Overdeliverer
```
Delivered: 150%
Blocker count: 0
Estimation accuracy: 90%
Health Score: 95/100 ✅

Decision: This person can handle more. Consider:
- Higher sprint commitment
- Stretch goals
- Mentoring junior developers
- Career growth conversation
```

### Example 2: The Blocked Developer
```
Delivered: 60%
Blockers: 1 critical (waiting on architecture)
Health Score: 45/100 ⚠️

Decision: Not dev's fault. Escalate:
- Get ETA from architecture team
- Plan workaround/alternative approach
- Reassign other tasks while blocked
- Follow up 2pm today
```

### Example 3: The Struggling Developer
```
Delivered: 50%
Discrepancy: 4 items (5 shipped vs 1 in Shortcut)
Estimation accuracy: 30% underestimated
Health Score: 40/100 🚨

Decision: Multiple concerns suggest:
- Is this task type new for them? Need mentoring
- Are estimates wrong? Need calibration training
- Is there a personal issue? Have 1-on-1
- Do they need pair programming?
```

### Example 4: The Consistent Performer
```
Delivered: 95%
Blocker count: 0
Discrepancy: 0
Health Score: 92/100 ✅

Decision: This is your reliable person. Use for:
- Critical path items
- New team member pairing
- Sprint leadership role
- Customer-facing deliverables
```

---

## How This Changes Your Daily Standup

### Old Way:
```
Dev: "I shipped 3 items, working on 2 more, blocked on API"
SM: "Thanks, anyone else?" [mental note: API team slow]
→ No decisions made, just information collected
```

### New Way:
```
System shows analysis:
- Delivery on track (92%)
- 1 medium blocker (API) - ETA needed
- Estimation accurate
- Health score 85/100

SM: "Great pace. On the API blocker, can backend give us ETA?
      We might need a workaround. Let's sync at 2pm."
→ Specific decision, ownership assigned, timeline set
```

---

## Metrics Dashboard (Track Over Time)

Keep a simple table to spot trends:

```
Developer    | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Trend
─────────────┼───────┼───────┼───────┼───────┼───────┼──────────
Juan (FE)    | 95%   | 105%  | 92%   | 98%   | 110%  | ✅ Stable
Maria (BE)   | 75%   | 65%   | 70%   | 60%   | 55%   | 🚨 Declining
Carlos (BE)  | 120%  | 125%  | 115%  | 130%  | 118%  | 🚀 Overload?
Sophia (FE)  | 85%   | 88%   | 90%   | 87%   | 89%   | ✅ Stable

Action Items:
- Maria: 3-day declining trend, investigate blockers
- Carlos: Consistently overdelivering, increase load or check burnout
- Juan & Sophia: Maintain current velocity
```

---

## Alert Thresholds (Customize for Your Team)

```
IMMEDIATE ACTION (Red):
□ Delivery Index < 50%
□ Critical blocker affecting 3+ stories
□ Health Score < 40
□ Discrepancy > 4 items

TODAY ACTION (Yellow):
□ Delivery Index 50-70%
□ High blocker affecting 1-2 stories
□ Health Score 40-60
□ 2+ days of declining velocity

MONITOR (Blue):
□ Delivery Index 70-90%
□ Medium blockers
□ Health Score 60-80
□ Trending up/down (but not alarming)

EXCELLENT (Green):
□ Delivery Index 90-120%
□ No blockers
□ Health Score > 80
□ Stable/improving
```

---

## Implementation Checklist

- [ ] Share ANALYSIS_FRAMEWORK.md with your team
- [ ] Identify 3 key metrics for YOUR team's priorities
- [ ] Set alert thresholds based on your team's baseline
- [ ] Run daily analysis for 1 week to establish patterns
- [ ] Create simple metrics dashboard
- [ ] Use insights in daily standups for 3 days
- [ ] Gather feedback from developers
- [ ] Refine based on team feedback
- [ ] Train team on how to use insights
- [ ] Monthly review of patterns and trends

---

## Key Insight

**Raw data (lists) → Information (tracking) → Insight (analysis) → Action (decisions)**

This tool moves you from collecting information to making decisions.

A good analysis tells you:
- ✅ What's working (keep it up)
- ⚠️ What needs attention (when and how)
- 🚨 What's critical (do it now)
- 🚀 What's an opportunity (consider for future)

That's what a Scrum Master needs.
