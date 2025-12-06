const express = require("express");
const { getRules, addRule, deleteRule } = require("../data/rulesStore");

const router = express.Router();

// GET /api/rules
router.get("/", (req, res) => {
  res.json(getRules());
});

// POST /api/rules
router.post("/", (req, res) => {
  const body = req.body;
  if (!body || !body.name || !body.matchType || !body.action) {
    return res.status(400).json({ error: "Invalid rule payload" });
  }
  const created = addRule(body);
  res.status(201).json(created);
});

// DELETE /api/rules/:id
router.delete("/:id", (req, res) => {
  const removed = deleteRule(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: "Rule not found" });
  }
  res.json({ deleted: removed.id });
});

module.exports = router;
