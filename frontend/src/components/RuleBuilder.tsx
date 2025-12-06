import React, { useEffect, useState } from "react";
import { Rule, fetchRules, createRule, deleteRule } from "../api/rules";

type DraftRule = {
  name: string;
  matchType: "TEXT_CONTAINS";
  pattern: string;
  minModelConfidence?: number;
  action: "approve" | "reject" | "escalate";
};

const defaultDraft: DraftRule = {
  name: "",
  matchType: "TEXT_CONTAINS",
  pattern: "",
  minModelConfidence: 0,
  action: "reject"
};

export const RuleBuilder: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [draft, setDraft] = useState<DraftRule>(defaultDraft);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules()
      .then(setRules)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof DraftRule, value: any) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    if (!draft.name || !draft.pattern) return;
    const created = await createRule(draft);
    setRules((prev) => [...prev, created]);
    setDraft(defaultDraft);
  };

  const handleDelete = async (id: string) => {
    await deleteRule(id);
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <div>Loading rules…</div>;

  return (
    <div className="rule-builder">
      <h2>Rule Engine</h2>

      <div className="rule-form">
        <input
          placeholder="Rule name"
          value={draft.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          placeholder="Text pattern to match"
          value={draft.pattern}
          onChange={(e) => handleChange("pattern", e.target.value)}
        />
        <select
          value={draft.action}
          onChange={(e) =>
            handleChange("action", e.target.value as DraftRule["action"])
          }
        >
          <option value="approve">Auto Approve</option>
          <option value="reject">Auto Reject</option>
          <option value="escalate">Auto Escalate</option>
        </select>

        <button onClick={handleCreate}>Create Rule</button>
      </div>

      <ul className="rule-list">
        {rules.map((rule) => (
          <li key={rule.id}>
            <strong>{rule.name}</strong> – if {rule.matchType} “{rule.pattern}”
            → {rule.action}
            <button onClick={() => handleDelete(rule.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
