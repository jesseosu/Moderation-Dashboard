import React, { useEffect } from "react";
import { ContentItem } from "../types";
import StatusBadge from "./StatusBadge";

interface ReviewPanelProps {
  item?: ContentItem;
  onAction: (action: "approve" | "reject" | "escalate") => void;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ item, onAction }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "a") onAction("approve");
      if (e.key === "r") onAction("reject");
      if (e.key === "e") onAction("escalate");
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onAction]);

  if (!item) {
    return (
      <div>
        <h2 className="section-title">Review Panel</h2>
        <p className="empty-state">Select an item from the feed to review.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">Review Panel</h2>
      <div className="review-card">
        <div className="review-header">
          <span className="feed-user">@{item.userId}</span>
          <StatusBadge status={item.status} />
        </div>
        <p className="review-text">{item.text}</p>
        <div className="review-meta">
          <span>Tag hint: {item.tagHint}</span>
          <span>
            Model confidence: {(item.modelConfidence * 100).toFixed(0)}%
          </span>
          <span>Created: {new Date(item.createdAt).toLocaleString()}</span>
        </div>

        <div className="review-actions">
          <button
            className="btn btn-approve"
            onClick={() => onAction("approve")}
          >
            Approve (A)
          </button>
          <button
            className="btn btn-reject"
            onClick={() => onAction("reject")}
          >
            Reject (R)
          </button>
          <button
            className="btn btn-escalate"
            onClick={() => onAction("escalate")}
          >
            Escalate (E)
          </button>
        </div>

        <div className="history">
          <h3>Action History</h3>
          {item.actionHistory.length === 0 && (
            <p className="empty-state">No actions taken yet.</p>
          )}
          {item.actionHistory.map((h, i) => (
            <div key={i} className="history-row">
              <span>{h.action.toUpperCase()}</span>
              <span>{new Date(h.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;
