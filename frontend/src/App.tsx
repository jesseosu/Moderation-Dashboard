import React, { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import ContentFeed from "./components/ContentFeed";
import ReviewPanel from "./components/ReviewPanel";
import RuleBuilder from "./components/RuleBuilder";
import { ContentItem, Rule, RuleAction } from "./types";
import { fetchContent, sendAction } from "./api";

let nextRuleId = 1;

function applyRulesToItem(item: ContentItem, rules: Rule[]): RuleAction | null {
  for (const rule of rules) {
    const textMatch = item.text
      .toLowerCase()
      .includes(rule.containsText.toLowerCase());
    const confidenceOk =
      rule.minConfidence === undefined ||
      item.modelConfidence >= rule.minConfidence;

    if (textMatch && confidenceOk) {
      return rule.action;
    }
  }
  return null;
}

const App: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selected, setSelected] = useState<ContentItem | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);

  // For rule simulation display
  const simulatedMatches = useMemo(() => {
    if (rules.length === 0 || items.length === 0) {
      return { ruleId: -1, matchedItems: [] as ContentItem[] };
    }

    const lastRule = rules[rules.length - 1];
    const matchedItems = items.filter((item) => {
      const action = applyRulesToItem(item, [lastRule]);
      return action !== null;
    });

    return { ruleId: lastRule.id, matchedItems };
  }, [rules, items]);

  // Fetch items periodically (simulate real-time feed)
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchContent();
        if (!isMounted) return;

        // Auto-apply rules (client-side simulation)
        const updated = data.map((item) => {
          if (item.status !== "pending") return item;

          const ruleAction = applyRulesToItem(item, rules);
          if (!ruleAction) return item;

          // We only "suggest" here visually – do not mutate backend
          return {
            ...item,
            // You could also set a field like suggestedStatus
          };
        });

        setItems(updated);

        if (!selected && updated.length > 0) {
          setSelected(updated[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    const intervalId = setInterval(load, 5000); // every 5 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [rules, selected]);

  const handleAction = async (action: "approve" | "reject" | "escalate") => {
    if (!selected) return;
    try {
      const updatedItem = await sendAction(selected.id, action);
      setItems((prev) =>
        prev.map((i) => (i.id === updatedItem.id ? updatedItem : i))
      );
      setSelected(updatedItem);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddRule = (ruleInput: Omit<Rule, "id">) => {
    const newRule: Rule = { ...ruleInput, id: nextRuleId++ };
    setRules((prev) => [...prev, newRule]);
  };

  const handleDeleteRule = (id: number) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const sidebar = (
    <>
      <h1 className="app-title">TnS Moderation Console</h1>
      <p className="app-subtitle">
        Simulated TikTok-style Trust & Safety moderation dashboard.
      </p>
      <div className="sidebar-section">
        <p>
          <strong>Shortcuts:</strong>
        </p>
        <ul>
          <li>A → Approve</li>
          <li>R → Reject</li>
          <li>E → Escalate</li>
        </ul>
        {loading && <p className="loading">Refreshing feed…</p>}
      </div>
    </>
  );

  const main = (
    <ContentFeed
      items={items}
      selectedId={selected?.id}
      onSelect={setSelected}
    />
  );

  const right = (
    <div className="right-column">
      <ReviewPanel item={selected} onAction={handleAction} />
      <RuleBuilder
        rules={rules}
        onAddRule={handleAddRule}
        onDeleteRule={handleDeleteRule}
        simulatedMatches={simulatedMatches}
      />
    </div>
  );

  return <Layout sidebar={sidebar} main={main} right={right} />;
};

export default App;
