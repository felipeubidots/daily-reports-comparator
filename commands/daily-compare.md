---
description: Compare a developer's daily report against their Shortcut activity
argument-hint: [email, username, or full name]
---

Compare the daily report for developer: **$ARGUMENTS**

Follow these steps:

1. **Load team context** from `people-context.json` in this repository to get the developer's role, seniority, teams, and expected focus areas. Resolve the identifier ($ARGUMENTS) by matching against `email`, `username`, or `name` fields.

2. **Search Slack #dev-daily** using `slack_search_public` with query `from:$ARGUMENTS in:#dev-daily` (or use the resolved display name if needed). Get today's message only. Parse sections:
   - ✅ SHIPPED — completed work items with links
   - ⤴️ IN PROGRESS — work in progress with status
   - 🎯 TODAY — planned priorities
   - 🏗️ BLOCKERS — blocked items with owner and severity (🔴🟡🟢)
   - 💡 AI INSIGHT — AI tool usage

3. **Search Shortcut** for the developer's stories updated today using `stories_search` filtered by owner (use email or name). Look for:
   - Stories moved to "Done" or "Completed" today
   - Stories in "In Progress" or "In Dev"

4. **Generate a structured analysis** with these sections:

   ### 👤 Developer Context
   Show name, role, seniority, teams, expected focus areas, dual roles, and specialties from `people-context.json`.

   ### 📝 Daily Report Summary
   List what was SHIPPED, IN PROGRESS, TODAY priorities, and BLOCKERS.

   ### 📊 Analysis

   **1️⃣ Discrepancy Analysis** — Compare shipped items in daily vs completed in Shortcut. Flag gaps > 2 items.

   **2️⃣ Focus Area Alignment** — Check if shipped work matches expected focus areas from team context. Score alignment %.

   **3️⃣ Seniority-Based Expectations** — Validate workload against seniority level:
   - Principal: 3-8 items/day, architecture & leadership focus
   - Senior: 3-6 items/day, delivery + mentoring
   - Semi-Senior: 2-5 items/day, consistent delivery
   - Junior: 1-4 items/day, learning & steady progress

   **4️⃣ Estimation Accuracy** — Average story points per completed story.

   **5️⃣ Capacity vs Commitment** — Delivery Index: (shipped + in-progress) / planned today × 100%.

   **6️⃣ Blocker Analysis** — Classify blockers by severity. Flag critical ones for immediate escalation.

   **7️⃣ AI & Tool Adoption** — % of shipped items that used AI assistance.

   **8️⃣ Progress Tracking** — Daily in-progress count vs Shortcut in-progress count alignment.

   **9️⃣ Developer Health Score** — Overall score /100 based on tracking accuracy, delivery, blockers, and tool adoption.

   **🔟 Recommendations** — Concrete, actionable next steps for the Scrum Master or Tech Lead.

   **1️⃣1️⃣ Metrics for Tracking** — Delivery Index, Blocker Count, AI Adoption %, Tracking Accuracy %.
