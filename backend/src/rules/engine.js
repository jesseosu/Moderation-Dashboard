// backend/rules/engine.js

// Map rule.action → status string we use for display
function mapActionToStatus(action) {
    switch (action) {
      case "approve":
        return "auto_approved";
      case "reject":
        return "auto_rejected";
      case "escalate":
        return "auto_escalated";
      default:
        return "pending";
    }
  }
  
  function matchesRule(item, rule) {
    const text = (item.text || "").toLowerCase();
    const pattern = (rule.pattern || "").toLowerCase();
  
    if (rule.matchType === "TEXT_CONTAINS") {
      if (!pattern) return false;
      return text.includes(pattern);
    }
  
    // future: other match types
    return false;
  }
  
  function applyRulesToItem(item, rules) {
    const updated = { ...item };
  
    for (const rule of rules) {
      if (matchesRule(item, rule)) {
        const mappedStatus = mapActionToStatus(rule.action);
        updated.status = mappedStatus;
        updated.actionHistory = updated.actionHistory || [];
        updated.actionHistory.push({
          at: new Date().toISOString(),
          by: "rule_engine",
          ruleId: rule.id,
          ruleName: rule.name,
          action: rule.action,
        });
        // stop at first match for now
        break;
      }
    }
  
    if (!updated.status) {
      updated.status = "pending";
    }
  
    return updated;
  }
  
  module.exports = {
    applyRulesToItem,
  };
  