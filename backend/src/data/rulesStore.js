// Example rule shape:
// {
//   id: "rule-1",
//   name: "Auto reject if contains 'kill'",
//   matchType: "TEXT_CONTAINS", // or whatever you're using
//   pattern: "kill",
//   minModelConfidence: 0.0,    // placeholder until ML
//   action: "reject"            // "approve" | "reject" | "escalate"
// }

let rules = [
    {
      id: "demo-1",
      name: "Reject obvious 'kill' messages",
      matchType: "TEXT_CONTAINS",
      pattern: "kill",
      minModelConfidence: 0.0,
      action: "reject"
    }
  ];
  
  function getRules() {
    return rules;
  }
  
  function addRule(ruleInput) {
    const newRule = {
      id: `rule-${Date.now()}`,
      ...ruleInput
    };
    rules.push(newRule);
    return newRule;
  }
  
  function deleteRule(id) {
    const idx = rules.findIndex((r) => r.id === id);
    if (idx !== -1) {
      const [removed] = rules.splice(idx, 1);
      return removed;
    }
    return null;
  }
  
  module.exports = {
    getRules,
    addRule,
    deleteRule
  };
  