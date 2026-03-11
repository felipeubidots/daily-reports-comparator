#!/usr/bin/env node

/**
 * Daily Report Comparator
 * Compares developer's daily report in #dev-daily with their Shortcut activity
 * Integrates team context from people-context.json for role-aware analysis
 * Usage: node index.js "Developer Name"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SHORTCUT_TOKEN = process.env.SHORTCUT_TOKEN;
const DEV_DAILY_CHANNEL = 'dev-daily';

// Load team context
let teamContext = {};
try {
  const contextPath = path.join(__dirname, 'people-context.json');
  if (fs.existsSync(contextPath)) {
    teamContext = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
  }
} catch (e) {
  console.warn('⚠️  Warning: Could not load people-context.json - proceeding without team context');
}

if (!process.argv[2]) {
  console.error('❌ Usage: node index.js "Developer Name"');
  process.exit(1);
}

const developerName = process.argv[2];
console.log(`\n📊 Comparing daily report for: ${developerName}\n`);

/**
 * Parse daily report sections from Slack message
 * Format:
 * ✅ SHIPPED   [Completed work] — [AI-assisted/Manual] — [link]
 * ⤴️ IN PROGRESS   [Open PRs/tickets] — [status]
 * 🎯 TODAY   [Highest priority]
 * 🏗️ BLOCKERS   [Blocked tickets] — @[owner] — [severity emoji]
 * 💡 AI INSIGHT   [Only if AI mentioned]
 */
function parseDaily(text) {
  const sections = {
    shipped: [],
    inProgress: [],
    today: [],
    blockers: [],
    aiInsights: []
  };

  const lines = text.split('\n');
  let currentSection = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for section headers (with or without emoji)
    if (/shipped/i.test(trimmed) || /✅/.test(trimmed)) {
      currentSection = 'shipped';
      continue;
    } else if (/in progress/i.test(trimmed) || /⤴️|↔️|⬆️/.test(trimmed)) {
      currentSection = 'inProgress';
      continue;
    } else if (/today/i.test(trimmed) || /🎯|🎪|📍/.test(trimmed)) {
      currentSection = 'today';
      continue;
    } else if (/blockers/i.test(trimmed) || /🏗️|⚠️|🚫/.test(trimmed)) {
      currentSection = 'blockers';
      continue;
    } else if (/ai insight/i.test(trimmed) || /💡/.test(trimmed)) {
      currentSection = 'aiInsights';
      continue;
    }

    // Parse items in current section
    if (currentSection && trimmed && !trimmed.startsWith('[')) {
      // Parse item with metadata
      const item = parseItem(trimmed, currentSection);
      if (item) {
        sections[currentSection].push(item);
      }
    }
  }

  return sections;
}

/**
 * Parse individual item with metadata
 * Shipped: [Completed work] — [AI-assisted/Manual] — [link]
 * In Progress: [Work] — [status]
 * Blockers: [Ticket] — @[owner] — [severity]
 */
function parseItem(text, section) {
  const item = {
    description: text,
    metadata: {}
  };

  // Split by " — " separator
  const parts = text.split(/\s*—\s*/);

  if (section === 'shipped' && parts.length >= 1) {
    item.description = parts[0].trim();
    item.metadata.aiAssisted = parts[1]?.toLowerCase().includes('ai');
    item.metadata.manual = parts[1]?.toLowerCase().includes('manual');
    item.metadata.link = parts[2]?.trim();
  } else if (section === 'inProgress' && parts.length >= 1) {
    item.description = parts[0].trim();
    item.metadata.status = parts[1]?.trim();
  } else if (section === 'blockers' && parts.length >= 1) {
    item.description = parts[0].trim();
    item.metadata.owner = parts[1]?.match(/@(\w+)/)?.[1];
    item.metadata.severity = parts[2]?.trim(); // 🔴🟡🟢
  }

  return item;
}

/**
 * Make HTTP request to Slack API
 */
function slackRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'slack.com',
      path: `/api/${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${SLACK_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Make HTTP request to Shortcut API
 */
function shortcutRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.app.shortcut.com',
      path: `/api/v3/${path}`,
      method: method,
      headers: {
        'Shortcut-Token': SHORTCUT_TOKEN,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Get channel ID from channel name
 */
async function getChannelId(channelName) {
  const response = await slackRequest('GET', `conversations.list?limit=1000`);
  const channel = response.channels?.find(c => c.name === channelName);
  return channel?.id;
}

/**
 * Find developer in team context (by name, email, or username)
 */
function findDeveloperInContext(identifier) {
  if (!teamContext.people) return null;

  const id = identifier.toLowerCase();

  // Try exact email match
  let person = teamContext.people.find(p => p.email?.toLowerCase() === id);
  if (person) return person;

  // Try exact username match
  person = teamContext.people.find(p => p.username?.toLowerCase() === id);
  if (person) return person;

  // Try name match
  person = teamContext.people.find(p =>
    p.name?.toLowerCase().includes(id) ||
    id.includes(p.name?.toLowerCase())
  );

  return person || null;
}

/**
 * Get user ID from display name
 */
async function getUserIdByName(name) {
  const response = await slackRequest('GET', `users.list`);

  // Try exact match on real_name or display_name
  let user = response.members?.find(m =>
    m.real_name === name || m.profile?.display_name === name
  );

  // Try partial match
  if (!user) {
    const nameLower = name.toLowerCase();
    user = response.members?.find(m =>
      m.real_name?.toLowerCase().includes(nameLower) ||
      m.profile?.display_name?.toLowerCase().includes(nameLower)
    );
  }

  return user?.id;
}

/**
 * Format developer context header
 */
function formatDeveloperContext(person) {
  if (!person) return '';

  let output = `\n👤 DEVELOPER CONTEXT\n`;
  output += `   ─────────────────────────────────────\n`;
  output += `   Name: ${person.name}\n`;
  output += `   Role: ${person.role}\n`;
  output += `   Seniority: ${person.seniority?.toUpperCase() || 'UNKNOWN'}\n`;
  output += `   Teams: ${person.teams?.join(', ') || 'N/A'}\n`;
  output += `   Expected focus: ${person.focus_areas?.join(', ') || 'N/A'}\n`;

  if (person.technical_lead_for) {
    output += `   🔹 Technical Lead for: ${person.technical_lead_for}\n`;
  }
  if (person.dual_role) {
    output += `   🔹 Dual role: ${person.dual_role}\n`;
  }
  if (person.specialty) {
    output += `   🔹 Specialty: ${person.specialty}\n`;
  }

  output += '\n';
  return output;
}

/**
 * Format daily report for comparison
 */
function formatDaily(sections) {
  let output = '📝 Daily Report:\n';

  if (sections.shipped.length) {
    output += `\n✅ Shipped (${sections.shipped.length}):\n`;
    sections.shipped.forEach(item => {
      let line = `   • ${item.description}`;
      if (item.metadata.aiAssisted) line += ' [🤖 AI-assisted]';
      if (item.metadata.manual) line += ' [🖱️ Manual]';
      if (item.metadata.link) line += ` [${item.metadata.link}]`;
      output += line + '\n';
    });
  }

  if (sections.inProgress.length) {
    output += `\n⏳ In Progress (${sections.inProgress.length}):\n`;
    sections.inProgress.forEach(item => {
      let line = `   • ${item.description}`;
      if (item.metadata.status) line += ` [${item.metadata.status}]`;
      output += line + '\n';
    });
  }

  if (sections.today.length) {
    output += `\n🎯 Today (${sections.today.length}):\n`;
    sections.today.forEach(item => output += `   • ${item.description}\n`);
  }

  if (sections.blockers.length) {
    output += `\n🚫 Blockers (${sections.blockers.length}):\n`;
    sections.blockers.forEach(item => {
      let line = `   • ${item.description}`;
      if (item.metadata.owner) line += ` [@${item.metadata.owner}]`;
      if (item.metadata.severity) line += ` ${item.metadata.severity}`;
      output += line + '\n';
    });
  }

  if (sections.aiInsights.length) {
    output += `\n💡 AI Insights (${sections.aiInsights.length}):\n`;
    sections.aiInsights.forEach(item => output += `   • ${item.description}\n`);
  }

  return output;
}

/**
 * Main function
 */
async function main() {
  try {
    // Get channel ID
    const channelId = await getChannelId(DEV_DAILY_CHANNEL);
    if (!channelId) {
      console.error(`❌ Could not find channel #${DEV_DAILY_CHANNEL}`);
      process.exit(1);
    }

    // Get user ID
    const userId = await getUserIdByName(developerName);
    if (!userId) {
      console.error(`❌ Could not find user: ${developerName}`);
      process.exit(1);
    }

    // Get messages from #dev-daily for this user (today)
    const today = Math.floor(Date.now() / 1000) - (24 * 3600);
    const response = await slackRequest(
      'GET',
      `conversations.history?channel=${channelId}&limit=100&oldest=${today}`
    );

    const userMessages = response.messages?.filter(m => m.user === userId) || [];
    if (!userMessages.length) {
      console.log(`ℹ️  No daily report found for ${developerName} today`);
      return;
    }

    // Parse the latest daily report
    const latestMessage = userMessages[0];
    const daily = parseDaily(latestMessage.text);

    // Load developer context
    const developerContext = findDeveloperInContext(developerName);

    if (developerContext) {
      console.log(formatDeveloperContext(developerContext));
    }

    console.log(formatDaily(daily));

    // Get Shortcut data
    console.log('\n📊 Checking Shortcut activity...\n');

    // Search for user in Shortcut
    const shortcutUsers = await shortcutRequest('GET', 'members');
    const shortcutUser = shortcutUsers?.find(m =>
      m.profile?.name?.toLowerCase().includes(developerName.toLowerCase()) ||
      m.email?.includes(developerName.toLowerCase())
    );

    if (!shortcutUser) {
      console.log(`⚠️  Could not find ${developerName} in Shortcut`);
      return;
    }

    // Get stories assigned to user
    const stories = await shortcutRequest(
      'GET',
      `stories?owner_id=${shortcutUser.id}`
    );

    console.log(`\n🎯 Shortcut Activity for ${developerName}:\n`);

    // Analyze stories by state
    const completed = stories?.data?.filter(s => s.state.name === 'Done') || [];
    const inProgress = stories?.data?.filter(s =>
      s.state.name === 'In Progress' || s.state.name === 'In Dev'
    ) || [];

    console.log(`✅ Completed today: ${completed.length} stories`);
    if (completed.length) {
      completed.slice(0, 5).forEach(s => console.log(`   • [${s.id}] ${s.name}`));
    }

    console.log(`\n⏳ In Progress: ${inProgress.length} stories`);
    if (inProgress.length) {
      inProgress.slice(0, 5).forEach(s => console.log(`   • [${s.id}] ${s.name}`));
    }

    // DEEP ANALYSIS FOR DECISION-MAKING
    console.log('\n\n📊 ANALYSIS FOR SCRUM MASTERS & TECH LEADS:\n');

    // Store developer context for analysis
    const shippedCount = daily.shipped.length;
    const completedCount = completed.length;
    const aiAssistedCount = daily.shipped.filter(s => s.metadata.aiAssisted).length;
    const inProgressDaily = daily.inProgress.length;
    const inProgressShortcut = inProgress.length;
    const plannedToday = daily.today.length;

    // 1. DISCREPANCY ANALYSIS
    console.log('1️⃣ DISCREPANCY ANALYSIS - Tracking Accuracy');
    console.log('   ─────────────────────────────────────────');

    const discrepancy = Math.abs(shippedCount - completedCount);
    if (discrepancy === 0) {
      console.log(`   ✅ PERFECT ALIGNMENT: ${shippedCount} shipped = ${completedCount} completed`);
      console.log(`   Assessment: Excellent tracking discipline`);
    } else if (discrepancy <= 2) {
      console.log(`   ✅ ACCEPTABLE: ${shippedCount} shipped vs ${completedCount} completed (±${discrepancy})`);
      console.log(`   Assessment: Minor discrepancy likely due to non-Shortcut work (docs, review, deploy)`);
      console.log(`   Action: MONITOR - watch if pattern continues`);
    } else {
      console.log(`   ⚠️ SIGNIFICANT GAP: ${shippedCount} shipped vs ${completedCount} completed (Δ${discrepancy})`);
      console.log(`   Issues: Either items not tracked in Shortcut, OR dev not updating Shortcut`);
      console.log(`   Action: CLARIFY with dev - which items should be in Shortcut?`);
      console.log(`   Recommendation: Add missing items or exclude from daily`);
    }

    // 2. FOCUS AREA ALIGNMENT
    if (developerContext && developerContext.focus_areas) {
      console.log(`\n2️⃣ FOCUS AREA ALIGNMENT - Role Expectations`);
      console.log('   ──────────────────────────────────────────');

      const focusAreas = developerContext.focus_areas || [];
      let alignmentScore = 100;
      let alignedItems = 0;

      // Check if shipped items match expected focus areas
      daily.shipped.forEach(item => {
        const itemDesc = item.description.toLowerCase();
        const isAligned = focusAreas.some(area =>
          itemDesc.includes(area.toLowerCase())
        );
        if (isAligned) alignedItems++;
      });

      const alignmentPercent = shippedCount > 0 ? (alignedItems / shippedCount * 100).toFixed(0) : 100;

      console.log(`   Expected focus: ${focusAreas.join(', ')}`);
      console.log(`   Work alignment: ${alignedItems}/${shippedCount} items match focus areas (${alignmentPercent}%)`);

      if (alignmentPercent >= 80) {
        console.log(`   Assessment: ✅ EXCELLENT - Work aligned with role expectations`);
      } else if (alignmentPercent >= 50) {
        console.log(`   Assessment: ⚠️ PARTIAL - Some work outside primary focus`);
        console.log(`   Note: May indicate support work or context switching`);
      } else if (shippedCount > 0) {
        console.log(`   Assessment: 🔄 OFF-FOCUS - Work doesn't match role expectations`);
        console.log(`   Action: Clarify priorities with team lead`);
      }
    }

    // 3. SENIORITY-BASED EXPECTATIONS
    if (developerContext) {
      console.log(`\n3️⃣ SENIORITY-BASED EXPECTATIONS`);
      console.log('   ──────────────────────────────────────');

      const seniority = developerContext.seniority || 'unknown';
      let expectedItemsMin, expectedItemsMax, expectedContext;

      if (seniority === 'principal') {
        expectedItemsMin = 3;
        expectedItemsMax = 8;
        expectedContext = 'Principal engineers focus on architecture & strategic work';
      } else if (seniority === 'senior') {
        expectedItemsMin = 3;
        expectedItemsMax = 6;
        expectedContext = 'Senior engineers balance delivery with mentoring & technical decisions';
      } else if (seniority === 'semisenior') {
        expectedItemsMin = 2;
        expectedItemsMax = 5;
        expectedContext = 'Semi-senior engineers should show consistent delivery';
      } else if (seniority === 'junior') {
        expectedItemsMin = 1;
        expectedItemsMax = 4;
        expectedContext = 'Junior engineers focus on learning & steady progress';
      }

      console.log(`   Seniority: ${seniority?.toUpperCase()}`);
      console.log(`   ${expectedContext}`);
      console.log(`   Expected items/day: ${expectedItemsMin}-${expectedItemsMax} | Actual: ${shippedCount}`);

      if (shippedCount >= expectedItemsMin && shippedCount <= expectedItemsMax) {
        console.log(`   Assessment: ✅ ON TRACK - Meets seniority expectations`);
      } else if (shippedCount > expectedItemsMax) {
        console.log(`   Assessment: 🚀 EXCEEDING - Shipping more than expected for seniority level`);
        console.log(`   Note: Good, but watch for quality or burnout`);
      } else if (shippedCount > 0) {
        console.log(`   Assessment: ⚠️ BELOW EXPECTATIONS - Less output than typical for ${seniority}`);
        console.log(`   Possible causes: blockers, learning curve, complexity`);
      }
    }

    // 4. ESTIMATION ACCURACY
    console.log(`\n4️⃣ ESTIMATION ACCURACY - Story Point Reliability`);
    console.log('   ──────────────────────────────────────────────');
    const totalPoints = completed.reduce((sum, s) => sum + (s.story_points || 0), 0);
    const avgPoints = completedCount > 0 ? totalPoints / completedCount : 0;

    console.log(`   Stories shipped: ${completedCount} | Total points: ${totalPoints}`);
    if (completedCount > 0) {
      console.log(`   Average points/story: ${avgPoints.toFixed(1)}`);
      if (avgPoints < 3) {
        console.log(`   Assessment: ✅ GOOD - dev working on small, manageable chunks`);
      } else if (avgPoints > 8) {
        console.log(`   Assessment: ⚠️ LARGE STORIES - may indicate estimation issues`);
      } else {
        console.log(`   Assessment: ✅ HEALTHY DISTRIBUTION`);
      }
    }

    // 5. CAPACITY vs COMMITMENT
    console.log(`\n5️⃣ CAPACITY vs COMMITMENT - Delivery Index`);
    console.log('   ─────────────────────────────────────────');
    const totalDelivered = shippedCount + inProgressDaily;
    const deliveryIndex = plannedToday > 0 ? (totalDelivered / plannedToday * 100).toFixed(0) : 0;

    console.log(`   Planned today: ${plannedToday} | Completed: ${shippedCount} | In Progress: ${inProgressDaily}`);
    console.log(`   Delivery Index: ${deliveryIndex}%`);

    if (deliveryIndex >= 120) {
      console.log(`   Assessment: 🚀 OVERDELIVERING - Can increase load`);
      console.log(`   Action: Assign more tasks, consider for stretch goals`);
    } else if (deliveryIndex >= 90) {
      console.log(`   Assessment: ✅ ON TRACK - Perfect planning`);
      console.log(`   Action: Maintain current task assignment`);
    } else if (deliveryIndex >= 70) {
      console.log(`   Assessment: ⚠️ SLIGHTLY BEHIND - Catchable`);
      console.log(`   Action: Monitor in-progress items, identify blockers`);
    } else {
      console.log(`   Assessment: 🚨 SIGNIFICANTLY BEHIND`);
      console.log(`   Action: INVESTIGATE - blockers? estimation issues? capacity?`);
    }

    // 6. BLOCKER IMPACT
    console.log(`\n6️⃣ BLOCKER ANALYSIS - Risk to Sprint`);
    console.log('   ──────────────────────────────────────');

    if (daily.blockers.length === 0) {
      console.log(`   ✅ CLEAR: No blockers reported`);
      console.log(`   Risk level: LOW`);
    } else {
      let criticalCount = 0, highCount = 0, mediumCount = 0;

      daily.blockers.forEach(blocker => {
        let severity = 'MEDIUM';
        if (blocker.metadata.severity?.includes('🔴')) {
          severity = 'CRITICAL';
          criticalCount++;
        } else if (blocker.metadata.severity?.includes('🟡')) {
          severity = 'HIGH';
          highCount++;
        } else {
          mediumCount++;
        }

        console.log(`   [${severity}] ${blocker.description}`);
        if (blocker.metadata.owner) console.log(`          Owner: @${blocker.metadata.owner}`);
      });

      if (criticalCount > 0) {
        console.log(`   🚨 ACTION REQUIRED: ${criticalCount} critical blocker(s)`);
        console.log(`   Risk to sprint: HIGH - escalate immediately`);
      } else if (highCount > 0) {
        console.log(`   ⚠️ MONITOR: ${highCount} high-priority blocker(s)`);
        console.log(`   Risk to sprint: MEDIUM - follow up today`);
      }
    }

    // 7. AI & TOOLING
    console.log(`\n7️⃣ AI & TOOL ADOPTION - Innovation Metrics`);
    console.log('   ──────────────────────────────────────');

    const aiPercentage = shippedCount > 0 ? (aiAssistedCount / shippedCount * 100).toFixed(0) : 0;
    console.log(`   AI-assisted work: ${aiAssistedCount}/${shippedCount} items (${aiPercentage}%)`);

    if (aiPercentage < 10) {
      console.log(`   Assessment: ℹ️ LOW AI ADOPTION`);
      console.log(`   Recommendation: Team training on AI tools`);
    } else if (aiPercentage >= 70) {
      console.log(`   Assessment: 🤖 HIGH AI ADOPTION`);
      console.log(`   Recommendation: Monitor for over-reliance, ensure quality review`);
    } else {
      console.log(`   Assessment: ✅ HEALTHY BALANCE`);
      console.log(`   Recommendation: Continue current practice`);
    }

    if (daily.aiInsights.length > 0) {
      console.log(`   AI Insights logged: ${daily.aiInsights.length}`);
      daily.aiInsights.forEach(insight => {
        console.log(`   • ${insight.description}`);
      });
    }

    // 8. IN-PROGRESS ALIGNMENT
    console.log(`\n8️⃣ PROGRESS TRACKING - Daily vs Shortcut Alignment`);
    console.log('   ───────────────────────────────────────────────');

    if (inProgressDaily === inProgressShortcut) {
      console.log(`   ✅ ALIGNED: ${inProgressDaily} items in both daily and Shortcut`);
      console.log(`   Assessment: Excellent synchronization`);
    } else if (Math.abs(inProgressDaily - inProgressShortcut) <= 1) {
      console.log(`   ✅ MOSTLY ALIGNED: Daily=${inProgressDaily}, Shortcut=${inProgressShortcut}`);
      console.log(`   Assessment: Minor variance acceptable`);
    } else {
      console.log(`   ⚠️ MISALIGNED: Daily=${inProgressDaily}, Shortcut=${inProgressShortcut}`);
      console.log(`   Issue: Either items not properly tracked or Shortcut not updated`);
      console.log(`   Action: Sync Shortcut before next standup`);
    }

    // 9. OVERALL HEALTH SCORE
    console.log(`\n9️⃣ DEVELOPER HEALTH SCORE`);
    console.log('   ──────────────────────────────────────');

    let healthScore = 100;
    let issues = [];

    if (discrepancy > 2) { healthScore -= 20; issues.push('Tracking gap'); }
    if (deliveryIndex < 70) { healthScore -= 20; issues.push('Behind schedule'); }
    if (critical > 0) { healthScore -= 25; issues.push('Critical blocker'); }
    if (aiPercentage < 5) { healthScore -= 10; issues.push('Low tool adoption'); }

    console.log(`   Overall Score: ${Math.max(0, healthScore)}/100`);

    if (healthScore >= 80) {
      console.log(`   Status: ✅ HEALTHY`);
      console.log(`   Assessment: On track, no major concerns`);
    } else if (healthScore >= 60) {
      console.log(`   Status: ⚠️ NEEDS ATTENTION`);
      console.log(`   Issues: ${issues.join(', ')}`);
    } else {
      console.log(`   Status: 🚨 CRITICAL`);
      console.log(`   Issues: ${issues.join(', ')}`);
      console.log(`   Action: IMMEDIATE 1-on-1 required`);
    }

    // 10. ACTIONABLE RECOMMENDATIONS
    console.log(`\n🔟 RECOMMENDATIONS FOR ACTION`);
    console.log('   ────────────────────────────────────────');

    const actions = [];

    if (discrepancy > 2) actions.push('Clarify Shortcut tracking standards with dev');
    if (deliveryIndex < 70) actions.push('Identify and unblock in-progress items');
    if (criticalCount > 0) actions.push('🚨 ESCALATE critical blocker immediately');
    if (aiPercentage < 10 && shippedCount > 0) actions.push('Offer AI tool training/resources');
    if (inProgressDaily !== inProgressShortcut) actions.push('Sync Shortcut before next standup');
    if (deliveryIndex > 120) actions.push('Increase task assignment load');

    if (actions.length === 0) {
      console.log(`   ✅ NO ACTIONS REQUIRED - Keep doing what you're doing`);
    } else {
      actions.forEach((action, i) => {
        console.log(`   ${i + 1}. ${action}`);
      });
    }

    // 11. TREND TRACKING
    console.log(`\n1️⃣1️⃣ METRICS FOR TRACKING OVER TIME`);
    console.log('   ────────────────────────────────────');
    console.log(`   Delivery Index: ${deliveryIndex}%`);
    console.log(`   Blocker Count: ${daily.blockers.length}`);
    console.log(`   AI Adoption: ${aiPercentage}%`);
    console.log(`   Tracking Accuracy: ${discrepancy === 0 ? '100%' : (100 - (discrepancy / shippedCount * 100)).toFixed(0) + '%'}`);
    console.log(`   \n   ℹ️  Compare these metrics day-over-day to identify trends`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
