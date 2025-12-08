// frontend/src/components/ReviewPanel.tsx
import React, { useEffect, useState } from "react";

type HistoryEntry = {
  at: string;
  by: string;
  action: string;
  ruleId?: string;
  ruleName?: string;
};

type ContentItem = {
  id: number;
  text: string;
  status: string;
  actionHistory?: HistoryEntry[];
};

type Props = {
  contentId: number;
};

const BASE_URL = "http://localhost:4000/api";

export function ReviewPanel({ contentId }: Props) {
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function fetchItem() {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/content/${contentId}`);
      if (!res.ok) {
        console.error("Failed to fetch item", res.status);
        return;
      }
      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error("Failed to fetch item:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (contentId != null) {
      fetchItem();
    }
  }, [contentId]);

  async function sendAction(action: "approve" | "reject" | "escalate") {
    try {
      setSubmitting(true);
      const res = await fetch(`${BASE_URL}/actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId, action }),
      });
      if (!res.ok) {
        console.error("Failed to send action", res.status);
        return;
      }
      const updated = await res.json();
      setItem(updated);
    } catch (err) {
      console.error("Failed to send action:", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !item) return <div>Loading item…</div>;

  const history = item.actionHistory || [];

  return (
    <div>
      <h2>Review Item</h2>
      <p>
        <strong>Status:</strong> {item.status}
      </p>
      <p>
        <strong>Text:</strong> {item.text}
      </p>

      <div style={{ margin: "1rem 0", display: "flex", gap: "0.5rem" }}>
        <button
          disabled={submitting}
          onClick={() => sendAction("approve")}
        >
          ✅ Approve
        </button>
        <button
          disabled={submitting}
          onClick={() => sendAction("reject")}
        >
          ❌ Reject
        </button>
        <button
          disabled={submitting}
          onClick={() => sendAction("escalate")}
        >
          ⚠ Escalate
        </button>
      </div>

      <h3>History</h3>
      {history.length === 0 ? (
        <p>No actions yet.</p>
      ) : (
        <ul style={{ paddingLeft: "1rem" }}>
          {history.map((h, idx) => (
            <li key={idx}>
              <code style={{ opacity: 0.7 }}>{h.at}</code> —{" "}
              <strong>{h.by}</strong> → <em>{h.action}</em>
              {h.ruleName ? ` (rule: ${h.ruleName})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
