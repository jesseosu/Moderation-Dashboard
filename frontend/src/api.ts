import { ContentItem } from "./types";

const BASE_URL = "http://localhost:4000";

export async function fetchContent(status?: string): Promise<ContentItem[]> {
  const url = status
    ? `${BASE_URL}/api/content?status=${status}`
    : `${BASE_URL}/api/content`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch content");
  }
  return res.json();
}

export async function sendAction(
  id: number,
  action: "approve" | "reject" | "escalate"
): Promise<ContentItem> {
  const res = await fetch(`${BASE_URL}/api/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, action }),
  });

  if (!res.ok) {
    throw new Error("Failed to send action");
  }

  return res.json();
}
