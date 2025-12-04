import React from "react";
import { ModerationStatus } from "../types";

interface StatusBadgeProps {
  status: ModerationStatus;
}

const colorMap: Record<ModerationStatus, string> = {
  pending: "#fbbf24",
  approved: "#22c55e",
  rejected: "#ef4444",
  escalated: "#6366f1",
};

const labelMap: Record<ModerationStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  escalated: "Escalated",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      style={{
        backgroundColor: colorMap[status],
        color: "#111827",
        borderRadius: "999px",
        padding: "2px 10px",
        fontSize: "0.75rem",
        fontWeight: 600,
      }}
    >
      {labelMap[status]}
    </span>
  );
};

export default StatusBadge;
