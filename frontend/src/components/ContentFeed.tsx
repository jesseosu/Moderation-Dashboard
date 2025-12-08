// frontend/src/components/ContentFeed.tsx
import React, { useEffect, useState } from "react";

type ContentItem = {
  id: number;
  text: string;
  status: string;
};

type Props = {
  onSelectItem: (id: number) => void;
};

const BASE_URL = "http://localhost:4000/api";

function getStatusColor(status: string): string {
  if (status === "pending") return "#ffc107"; // yellow
  if (status.startsWith("auto_rejected") || status === "rejected") return "#dc3545"; // red
  if (status.startsWith("auto_approved") || status === "approved") return "#28a745"; // green
  if (status.includes("escalated") || status === "escalated") return "#fd7e14"; // orange
  return "#ffffff";
}

export function ContentFeed({ onSelectItem }: Props) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchContent() {
    try {
      const res = await fetch(`${BASE_URL}/content`);
      if (!res.ok) {
        console.error("Failed to fetch content", res.status);
        return;
      }
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
    // Poll every 1.5s to simulate a live feed
    const interval = setInterval(fetchContent, 1500);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading content…</div>;

  return (
    <div>
      <h2>Content Feed</h2>
      <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
        New comments appear automatically. Click one to review.
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelectItem(item.id)}
            style={{
              padding: "0.5rem 0.75rem",
              marginBottom: "0.25rem",
              border: "1px solid #444",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                minWidth: "80px",
                fontWeight: 700,
                color: getStatusColor(item.status),
              }}
            >
              [{item.status}]
            </span>
            <span>— {item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
