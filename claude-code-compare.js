#!/usr/bin/env node

/**
 * Daily Report Comparator for Claude Code
 *
 * This version is designed to be called from Claude Code and uses the
 * available MCPs (Slack and Shortcut) through the tool interface.
 *
 * Usage from Claude Code:
 * 1. User writes: "Compare Juan Agudelo's daily"
 * 2. Claude Code calls this script with the developer name
 * 3. Script uses MCPs to fetch and compare data
 */

const developerName = process.argv[2];

if (!developerName) {
  console.error('Usage: node claude-code-compare.js "Developer Name"');
  process.exit(1);
}

// This is a placeholder that shows how Claude Code would invoke the comparison
// The actual implementation uses Claude Code's built-in tool system

console.log(`
📊 Daily Report Comparison
Developer: ${developerName}
Timestamp: ${new Date().toISOString()}

This script should be invoked from Claude Code context where:
- \`slack_search_public\` can find #dev-daily messages
- \`mcp__shortcut__stories_search\` can query Shortcut
- \`mcp__shortcut__users_list\` can find the developer

To use from Claude Code:
1. Type: "Compare [Developer Name]'s daily report"
2. Claude will automatically:
   - Search #dev-daily for today's message from this developer
   - Parse the daily sections
   - Query Shortcut for their completed/in-progress stories
   - Generate a detailed comparison

Expected daily format in Slack:
\`\`\`
Shipped
- Task 1
- Task 2

In progress
- Current task

Today
- Planned task

Blockers
- Blocker

AI Insights
- Insight
\`\`\`

The comparison will show:
✅ Shipped count vs Shortcut completed
⏳ In Progress count vs Shortcut in-progress
🚫 Blockers with potential impact
📈 Time allocation analysis
`);
