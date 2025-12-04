import React, { useState } from "react";
import { Rule, RuleAction, ContentItem } from "../types";

interface RuleBuilderProps {
  rules: Rule[];
  onAddRule: (rule: Omit<Rule, "id">) => void;
  onDeleteRule: (id: number) => void;
  simulatedMatches: { ruleId: number; matchedItems: ContentItem[] };
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({
  rules,
  onAddRule,
  onDeleteRule,
  simulatedMatches,
}) => {
  const [name, setName] = useState("");
  const [containsText, setContainsText] = useState("");
  const [minConfidence, setMinConfidence] = useState<string>("");
  const [action, setAction] = useState<RuleAction>("auto_reject");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !containsText.trim()) return;

    onAddRule({
      name,
      containsText,
      action,
      minConfidence: minConfidence ? Number(minConfidence) : undefined,
    });

    setName("");
    setContainsText("");
    setMinConfidence("");
    setAction("auto_reject");
  };

  return (
    <div>
      <h2 className="section-title">Rule Builder</h2>

      <form className="rule-form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Rule name (e.g. 'Auto reject spam')"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="If text contains..."
          value={containsText}
          onChange={(e) => setContainsText(e.target.value)}
        />

        <input
          className="input"
          placeholder="Min model confidence (0 - 1, optional)"
          value={minConfidence}
          onChange={(e) => setMinConfidence(e.target.value)}
        />

        <select
          className="input"
          value={action}
          onChange={(e) => setAction(e.target.value as RuleAction)}
        >
          <option value="auto_reject">Auto-Reject</option>
          <option value="auto_approve">Auto-Approve</option>
          <option value="auto_escalate">Auto-Escalate</option>
        </select>

        <button className="btn btn-primary" type="submit">
          Add Rule
        </button>
      </form>

      <div className="rule-list">
        {rules.length === 0 && (
          <p className="empty-state">No rules defined yet.</p>
        )}
        {rules.map((rule) => (
          <div key={rule.id} className="rule-card">
            <div className="rule-header">
              <strong>{rule.name}</strong>
              <button
                className="btn btn-small"
                onClick={() => onDeleteRule(rule.id)}
              >
                Remove
              </button>
            </div>
            <div className="rule-body">
              <p>
                Text contains: <code>{rule.containsText}</code>
              </p>
              {rule.minConfidence !== undefined && (
                <p>Min confidence: {rule.minConfidence}</p>
              )}
              <p>Action: {rule.action.replace("auto_", "Auto ")}</p>
            </div>
          </div>
        ))}
      </div>

      {simulatedMatches.ruleId !== -1 && (
        <div className="rule-simulation">
          <h3>Rule Simulation</h3>
          <p>
            Rule <strong>
              {
                rules.find((r) => r.id === simulatedMatches.ruleId)?.name ??
                "Unknown"
              }
            </strong>{" "}
            would currently apply to{" "}
            <strong>{simulatedMatches.matchedItems.length}</strong> items.
          </p>
        </div>
      )}
    </div>
  );
};

export default RuleBuilder;
