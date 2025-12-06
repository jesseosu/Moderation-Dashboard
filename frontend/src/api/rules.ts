import { apiGet, apiPost, apiDelete } from "./client";

export type Rule = {
  id: string;
  name: string;
  matchType: "TEXT_CONTAINS"; // extend as needed
  pattern: string;
  minModelConfidence?: number;
  action: "approve" | "reject" | "escalate";
};

export async function fetchRules(): Promise<Rule[]> {
  return apiGet<Rule[]>("/rules");
}

export async function createRule(
  payload: Omit<Rule, "id">
): Promise<Rule> {
  return apiPost<Rule>("/rules", payload);
}

export async function deleteRule(id: string): Promise<{ deleted: string }> {
  return apiDelete<{ deleted: string }>(`/rules/${id}`);
}
