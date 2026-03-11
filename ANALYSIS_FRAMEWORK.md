# Daily Report Analysis Framework

For Scrum Masters & Tech Leads: Actionable insights for decision-making

---

## 📊 Analysis vs Reporting

### ❌ What We DON'T Want (Just Lists)
```
Shipped: 5 items
In Progress: 2 items
Blockers: 1
AI Usage: 40%
```
→ Tells you WHAT but not WHY, and doesn't help you decide.

### ✅ What We DO Want (Analysis with Decisions)
```
ANOMALY DETECTED: Dev reported 5 shipped but Shortcut shows 1 completed
→ Root cause: Items not tracked in Shortcut (docs, code review, deploy)
→ Decision: Clarify tracking standards with team
→ Action: Add missing items to Shortcut or exclude from daily

BLOCKER IMPACT: 1 critical blocker affecting 3 stories
→ Duration: Blocked since yesterday
→ Team impact: Backend waiting, Frontend blocked for 2+ days
→ Decision: Escalate to architecture team TODAY
→ Recommendation: Plan unblock/workaround by EOD
```

---

## 🎯 Analysis Dimensions for Decision-Making

### 1. DISCREPANCY ANALYSIS
**Question**: Is the dev accurately reporting?

#### Shipped vs Completed Gap
```
Metric: Gap between what dev shipped vs what Shortcut shows completed

IF gap = 0:
  → ✅ GOOD: Perfect tracking alignment
  → Action: Nothing needed

IF gap > 3 items AND recurring:
  → ⚠️ CONCERN: Items not being tracked properly
  → Questions:
     - Are items legitimate non-Shortcut work? (docs, meetings, deploys)
     - Is dev forgetting to update Shortcut?
     - Is team tracking standard unclear?
  → Actions:
     - Clarify what work goes in Shortcut
     - Add retrospective items to Shortcut
     - Improve update discipline

IF gap is always the same dev:
  → 🚨 RED FLAG: Systemic issue with this developer
  → Actions:
     - 1-on-1 to understand tracking issues
     - Potential need for process training
     - Monitor for pattern
```

#### In Progress Alignment
```
Metric: Items in daily vs Shortcut in-progress count

IF mismatch > 1:
  → Questions:
     - Items completed but not marked Done in Shortcut?
     - Items in Shortcut but dev doesn't see them?
     - Communication breakdown?
  → Action:
     - Sync daily with Shortcut before next standup
     - Train on Shortcut workflow
```

---

### 2. BLOCKER ANALYSIS
**Question**: What's stopping progress? How critical is it?

#### Blocker Severity Assessment
```
Data Point 1: Severity Flag (🔴🟡🟢)
Data Point 2: Duration (how long blocked)
Data Point 3: Impact (# of stories affected)
Data Point 4: Owner (who can unblock)

Score = Duration × Impact × Severity

Example:
- 🔴 Critical blocking 3 stories since yesterday = Score: 9 (HIGH)
  → Action: Escalate immediately, get ETA to unblock

- 🟡 High blocking 1 story since this morning = Score: 2 (LOW)
  → Action: Monitor, follow up if not resolved by EOD

- 🟢 Medium blocking 2 stories since this morning = Score: 1 (LOW)
  → Action: Regular follow-up, plan workaround if needed
```

#### Blocker Pattern Detection
```
IF multiple devs report blocker from same source:
  → 🚨 SYSTEMIC ISSUE: Architecture/design bottleneck
  → Action: Architecture review, design decision needed

IF same dev repeatedly blocked:
  → Analysis: Is this dev picking hard tasks? Need help?
  → Action: Pair programming, task reassignment, mentoring

IF blocker is from external team:
  → Action: Escalate, set SLA for response, plan contingency

IF blocker is from same team:
  → Action: Process review, dependency management issue
```

---

### 3. CAPACITY vs COMMITMENT
**Question**: Is the team promising what it can deliver?

#### Planned vs Actual
```
Metric: Items in TODAY section vs items actually completed + in-progress

Planned: 4 items
Completed: 3 items
In Progress: 2 items
Total: 5 items (125% of plan)

Analysis:
- Index > 100% = Dev overdelivering OR today plan was conservative
- Index 80-100% = On track
- Index 60-80% = Behind but catchable
- Index < 60% = Significant slippage

Decision Framework:
- If overdelivering consistently: Plan is too conservative, increase load
- If on-track consistently: Perfect planning, maintain current practice
- If sliding: Investigate blockers, estimation accuracy, scope creep
```

#### Velocity Trend
```
If tracking over time:
- Monday: 3 shipped
- Tuesday: 5 shipped
- Wednesday: 2 shipped
- Thursday: 1 shipped

Pattern: ⚠️ Declining velocity
→ Questions:
   - Blockers accumulating?
   - Fatigue by end of week?
   - Quality issues slowing progress?
→ Actions:
   - Implement blocker resolution SLA
   - Check sprint planning vs actual
   - Review code quality metrics
```

---

### 4. ESTIMATION ACCURACY
**Question**: Are story point estimates reliable?

#### Estimated vs Actual (from Shortcut)
```
Story SC-1247: Estimated 5 points
- Expected: 2-3 days to complete
- Actual: 1 day (finished same day)
→ Accuracy: ✅ GOOD (estimate was conservative)

Story SC-1248: Estimated 3 points
- Expected: 1-2 days to complete
- Actual: 3 days (shipped today but took longer)
→ Accuracy: ⚠️ UNDERESTIMATED (should be 5-8 points)

Aggregate:
- 5 stories shipped this week
- 3 underestimated (60%)
→ Pattern: Team consistently underestimates
→ Action: Recalibrate estimation practice in next planning

Decision: Reduce committed points in next sprint by 20-30%
```

---

### 5. QUALITY & AI USAGE
**Question**: Is work being done well? Are we using tools effectively?

#### AI-Assisted Work Tracking
```
Metric: % of work done with AI assistance

IF < 10%:
  → Observation: Team not using AI tools
  → Questions:
     - Unfamiliar with AI tools?
     - Don't see value?
     - Prohibited by policy?
  → Actions:
     - AI training sessions
     - Showcase use cases
     - Team discussion on benefits

IF 40-60%:
  → Observation: Healthy AI adoption
  → Action: Continue current practice

IF > 70%:
  → Questions:
     - Over-reliance on AI?
     - Quality being compromised?
     - Developers not thinking critically?
  → Actions:
     - Review AI-assisted code for quality
     - Ensure developer review happening
     - Balance automation with thinking

Pattern Tracking:
- Developer A: 80% AI-assisted
- Developer B: 10% AI-assisted
→ Possible issues:
   - Skill gap (A using AI as crutch?)
   - Tool preference difference
   - Task type differences
→ Action: Team sync on AI best practices
```

---

### 6. TEAM HEALTH INDICATORS
**Question**: Is the team sustainable? Do they need help?

#### Workload Assessment
```
Metric: Items shipped + in progress per developer

Developer A: 5 shipped + 2 in progress = 7 total
Developer B: 2 shipped + 1 in progress = 3 total
Developer C: 4 shipped + 3 in progress = 7 total

Analysis:
- Variance: Developer B at 43% of average
  → Questions:
     - Is B working on bigger items?
     - Blocked more than others?
     - Less experienced/slower?
     - Personal issues?
  → Actions:
     - 1-on-1 check-in
     - Review story point allocation
     - Offer pairing/mentoring if needed

- A & C overloaded while B underutilized
  → Action: Rebalance work distribution
```

#### Blocker Frequency
```
Developer A: 0 blockers this week
Developer B: 3 blockers this week
Developer C: 1 blocker this week

Analysis:
- B is hitting blockers 3x more than average
→ Possible Issues:
   - Picking risky work
   - Domain unfamiliarity
   - Communication gaps with dependencies
   - Bad luck (legitimate external blockers)
→ Actions:
   - Review work selection process
   - Pair with more experienced dev
   - Improve dependency communication
   - Document blocking patterns
```

---

### 7. SPRINT HEALTH
**Question**: Are we on track to meet sprint goal?

#### Burndown Projection
```
Sprint Goal: 40 story points
Days completed: 3 of 10

Done: 12 points (30%)
In Progress: 8 points (20%)
Remaining: 20 points (50%)

Projection: 12 + 8 = 20 points will complete = 50% of goal

Analysis:
- ❌ BEHIND: At current pace, only 50% of sprint goal will complete
- Days remaining: 7 days
- Points needed: +20 points in 7 days = 2.86 points/day
- Current pace: 1.71 points/day
- Gap: Need 67% increase in velocity

Actions:
1. Emergency review of remaining items
2. Identify and remove low-priority items
3. Unblock current in-progress items ASAP
4. Consider scope reduction
5. Add team capacity if possible
```

---

### 8. RISK & OPPORTUNITY MATRIX
**Question**: What should we act on?

```
RISK (High Impact × High Probability):
- Blocker blocking 3 stories, no ETA = IMMEDIATE ACTION
- Underestimation pattern = SPRINT PLANNING IMPACT
- Velocity decline trend = CAPACITY CRISIS

OPPORTUNITY (High Value × High Probability):
- Dev consistently over-delivering = Increase load
- AI adoption working well = Expand to team
- Estimation improving = Can commit more

MONITOR (Medium Impact × Medium Probability):
- Occasional blockers = Normal, track trend
- Some estimation misses = Expected, watch pattern
```

---

## 🎯 Decision Framework by Role

### For Scrum Masters:
```
1. Sprint Health → Burndown projection, risks to goal
2. Team Capacity → Workload balance, velocity trend
3. Process Issues → Blockers, discrepancies, estimation accuracy
4. Risk Management → Escalate high-impact blockers, plan contingencies

Decision: Do we adjust sprint scope? Add capacity? Change process?
```

### For Tech Leads:
```
1. Code Quality → AI usage patterns, estimation accuracy
2. Technical Blockers → Root cause analysis, unblock strategy
3. Team Skills → Estimation issues, tool adoption, mentoring needs
4. Architecture Decisions → Systemic blockers, design review needs

Decision: What technical improvements? Which developer needs mentoring?
```

### For Engineering Manager:
```
1. Individual Performance → Workload, blockers, discrepancies
2. Team Productivity → Velocity trends, capacity utilization
3. Staffing Needs → Overloaded/underutilized developers
4. Career Development → Skill gaps, growth opportunities

Decision: Promotions? Hiring? Rebalancing? Training needed?
```

### For Product Owner:
```
1. Velocity & Burndown → Can we hit release target?
2. Item Complexity → Are we estimating correctly?
3. External Dependencies → Which blockers affect timelines?
4. Scope Impact → What should we cut? What can we add?

Decision: Adjust roadmap? Reduce scope? Request timeline extension?
```

---

## 📊 Report Template for Decision-Makers

```
DAILY ANALYSIS REPORT
Developer: Juan Agudelo | Date: March 11, 2026 | Role: Frontend

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 EXECUTIVE SUMMARY
Status: ✅ ON TRACK
Action Required: NONE
Risk Level: LOW

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ DISCREPANCY ANALYSIS
   Reported: 5 shipped | Shortcut: 3 completed
   Gap: 2 items (likely: code review, docs, deploy)
   Assessment: ✅ EXPECTED - items outside Shortcut
   Action: MONITOR - watch for pattern

2️⃣ CAPACITY & COMMITMENT
   Planned (TODAY): 4 items
   Completed: 3 items
   In Progress: 2 items
   Total: 5 items (125% of plan)
   Assessment: ✅ OVERDELIVERING
   Action: Can increase load slightly

3️⃣ ESTIMATION ACCURACY
   Stories shipped: 3
   Underestimated: 1 (should be 5pt vs 3pt)
   Estimation health: ✅ GOOD (67% accurate)
   Action: MONITOR - acceptable variance

4️⃣ BLOCKER STATUS
   Blockers reported: 0
   Stories blocked: 0
   Risk: ✅ CLEAR
   Action: NONE

5️⃣ AI ADOPTION
   Work with AI: 2/5 (40%)
   Work manual: 3/5 (60%)
   Assessment: ✅ GOOD BALANCE
   Action: CONTINUE

6️⃣ TEAM HEALTH
   Workload: 5 items (slightly above average)
   Blocker frequency: 0 (below average - good)
   Morale signal: ✅ POSITIVE (delivering, no blockers)
   Action: NONE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 KEY INSIGHTS
✅ Dev is delivering above plan
✅ No blockers impacting work
✅ Estimation is reasonable
✅ Good AI tool adoption

⚠️ NONE IDENTIFIED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 RECOMMENDATIONS
1. Continue current task assignment (dev can handle more load)
2. Escalate 2 non-tracked items to Shortcut if important for burndown
3. Share AI usage patterns with team (good example)
4. Consider for stretch goals in sprint

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 ALERTS: NONE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next Review: March 12, 2026
```

---

## 🔴 Alert Types for Immediate Action

### CRITICAL 🚨
```
- Dev reports 5 shipped, Shortcut shows 0 completed
  → Tracking breakdown - immediate clarification needed

- 3+ critical blockers from same dependency team
  → Systemic issue - escalate to leadership

- Velocity dropped 50%+ in 2 days
  → Health crisis - emergency standup needed

- Same developer repeatedly blocked for 2+ days
  → Career/task fit issue - 1-on-1 required
```

### HIGH ⚠️
```
- Consistent underestimation (60%+ of stories)
  → Impacts planning accuracy

- Developer workload 2x average team
  → Burnout risk

- Blocker blocking 3+ stories
  → Sprint impact - escalate today

- Estimation accuracy < 50%
  → Plan reliability issue
```

### MEDIUM 📋
```
- Occasional estimation misses
- Mild blocker (1-2 stories, < 1 day)
- Slight workload imbalance
- Low AI tool adoption
```

---

## 💡 How This Changes Decision-Making

### Old Way (Lists):
```
"Juan shipped 5 items, is in progress on 2, has 1 blocker"
→ Scrum Master thinks: "Ok... and?"
```

### New Way (Analysis):
```
"Juan is delivering 25% above plan, no blockers, good AI adoption.
Can increase load. Good example for team skill development."
→ Scrum Master thinks: "Promote? Increase responsibility? Use as mentor?"
```

---

## Next Steps to Implement

1. **Collect Baseline Data**: Run for 1 week to establish patterns
2. **Identify Your Metrics**: Which 3-4 analyses matter most for your team?
3. **Set Thresholds**: When does yellow become red? (your team specific)
4. **Create Alerts**: What triggers action emails/notifications?
5. **Review Weekly**: Identify trends, not just daily anomalies
6. **Adjust Based on Learnings**: Refine analyses based on team feedback

---

This framework transforms daily reports from **"show and tell"** into **"here's what to decide"**.
