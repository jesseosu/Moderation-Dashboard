const express = require("express");
const cors = require("cors");
const { generateContentItem } = require("./mockData");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let contentItems = [];

// Seed initial items
for (let i = 0; i < 8; i++) {
  contentItems.push(generateContentItem());
}

/**
 * Every 10 seconds, simulate new content entering the moderation queue.
 */
setInterval(() => {
  const newItem = generateContentItem();
  contentItems.unshift(newItem); // add to "front" of feed
  console.log("[SIM] New content item:", newItem.id);
}, 10000);

/**
 * GET /api/content
 * Optional query: ?status=pending|approved|rejected|escalated
 */
app.get("/api/content", (req, res) => {
  const { status } = req.query;
  let items = contentItems;

  if (status) {
    items = items.filter((item) => item.status === status);
  }

  res.json(items);
});

/**
 * POST /api/action
 * Body: { id, action } where action ∈ ['approve', 'reject', 'escalate']
 */
app.post("/api/action", (req, res) => {
  const { id, action } = req.body;
  const validActions = ["approve", "reject", "escalate"];

  if (!id || !action || !validActions.includes(action)) {
    return res.status(400).json({ error: "Invalid id or action" });
  }

  const idx = contentItems.findIndex((item) => item.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  let newStatus = contentItems[idx].status;
  if (action === "approve") newStatus = "approved";
  if (action === "reject") newStatus = "rejected";
  if (action === "escalate") newStatus = "escalated";

  contentItems[idx] = {
    ...contentItems[idx],
    status: newStatus,
    actionHistory: [
      ...contentItems[idx].actionHistory,
      {
        action,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  console.log(
    `[ACTION] Item ${id} => ${action.toUpperCase()} (status: ${newStatus})`
  );

  res.json(contentItems[idx]);
});

/**
 * Basic health check
 */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Moderation backend running at http://localhost:${PORT}`);
});
