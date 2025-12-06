import React, { useEffect, useState } from "react";

type ContentItem = {
  id: number;
  text: string;
  status: string;
  actionHistory?: Array<any>;
};

type Props = {
  contentId: number;
};

export function ReviewPanel({ contentId }: Props) {
  const [item, setItem] = useState<ContentItem | null>(null);

  async function fetchItem() {
    try {
      const res = await fetch(`http://localhost:4000/api/content/${contentId}`);
      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error("Failed to fetch item:", err);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [contentId]);

  if (!item) return <div>Loading item…</div>;

  return (
    <div>
      <h2>Review Item</h2>

      <p>
        <strong>Status:</strong> {item.status}
      </p>

      <p>
        <strong>Text:</strong> {item.text}
      </p>

      <h3>History</h3>
      <ul>
        {(item.actionHistory || []).map((h, index) => (
          <li key={index}>
            {h.at} — {h.by} — {h.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
