function matchesRule(item, rule, context = {}) {
    const text = (item.text || "").toLowerCase();
    const pattern = (rule.pattern || "").toLowerCase();
  
    if (rule.matchType === "TEXT_CONTAINS") {
      if (!pattern) return false;
      return text.includes(pattern);
    }
  
    // later you can support more match types (regex, tagHint, etc.)
    return false;
  }
  
  function applyRulesToItem(item, rules, context = {}) {
    // Clone so we don't mutate unexpectedly
    const updated = { ...item };
  
    for (const rule of rules) {
      if (matchesRule(item, rule, context)) {
        updated.status = rule.action || "escalated"; // map to your statuses
        updated.actionHistory = updated.actionHistory || [];
        updated.actionHistory.push({
          at: new Date().toISOString(),
          by: "rule_engine",
          ruleId: rule.id,
          ruleName: rule.name,
          action: rule.action
        });
        // for now, stop at first matching rule
        break;
      }
    }
  
    if (!updated.status) {
      updated.status = "pending";
    }
  
    return updated;
  }
  
  module.exports = {
    applyRulesToItem
  };
  