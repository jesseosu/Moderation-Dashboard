import React from "react";
import { ContentItem } from "../types";
import StatusBadge from "./StatusBadge";

interface ContentFeedProps {
  items: ContentItem[];
  selectedId?: number;
  onSelect: (item: ContentItem) => void;
}

const ContentFeed: React.FC<ContentFeedProps> = ({
  items,
  selectedId,
  onSelect,
}) => {
  return (
    <div>
      <h2 className="section-title">Incoming Content</h2>
      <div className="feed">
        {items.map((item) => (
          <div
            key={item.id}
            className={`feed-item ${
              selectedId === item.id ? "feed-item-selected" : ""
            }`}
            onClick={() => onSelect(item)}
          >
            <div className="feed-item-top">
              <span className="feed-user">@{item.userId}</span>
              <StatusBadge status={item.status} />
            </div>
            <p className="feed-text">{item.text}</p>
            <div className="feed-meta">
              <span>Tag hint: {item.tagHint}</span>
              <span>Model confidence: {(item.modelConfidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="empty-state">No content available. Waiting for stream…</p>
        )}
      </div>
    </div>
  );
};

export default ContentFeed;
