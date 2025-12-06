import React, { useEffect, useState } from "react";

type ContentItem = {
  id: number;
  text: string;
  status: string;
};

type Props = {
  onSelectItem: (id: number) => void;
};

export function ContentFeed({ onSelectItem }: Props) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchContent() {
    try {
      const res = await fetch("http://localhost:4000/api/content");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) return <div>Loading content…</div>;

  return (
    <div>
      <h2>Content Feed</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => onSelectItem(item.id)}
            style={{
              padding: "0.5rem",
              marginBottom: "0.25rem",
              border: "1px solid #ddd",
              cursor: "pointer"
            }}
          >
            <strong>[{item.status}]</strong> — {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
