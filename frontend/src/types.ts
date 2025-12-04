export type ModerationStatus = "pending" | "approved" | "rejected" | "escalated";

export interface ContentItem {
  id: number;
  userId: string;
  text: string;
  tagHint: string;
  createdAt: string;
  status: ModerationStatus;
  modelConfidence: number;
  actionHistory: { action: string; timestamp: string }[];
}

export type RuleAction = "auto_approve" | "auto_reject" | "auto_escalate";

export interface Rule {
  id: number;
  name: string;
  containsText: string;
  minConfidence?: number;
  action: RuleAction;
}
