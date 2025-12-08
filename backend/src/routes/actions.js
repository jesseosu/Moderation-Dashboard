// backend/routes/actions.js
const express = require("express");
const { updateContentStatus } = require("../data/contentStore");

const router = express.Router();

// POST /api/actions
// { contentId: number, action: "approve" | "reject" | "escalate" }
router.post("/", (req, res) => {
  const { contentId, action } = req.body;
  if (!contentId || !action) {
    return res
      .status(400)
      .json({ error: "contentId and action are required" });
  }

  // Map human actions to final statuses
  const statusMap = {
    approve: "approved",
    reject: "rejected",
    escalate: "escalated",
  };

  const status = statusMap[action] || "pending";

  const updated = updateContentStatus(contentId, status, "human_mod");
  if (!updated) {
    return res.status(404).json({ error: "Content not found" });
  }

  res.json(updated);
});

module.exports = router;
