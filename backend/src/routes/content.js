const express = require("express");
const { getAllContent, findContentById } = require("../data/contentStore");

const router = express.Router();

// GET /api/content?status=pending|approved|rejected|escalated
router.get("/", (req, res) => {
  const statusFilter = req.query.status;
  let items = getAllContent();
  if (statusFilter) {
    items = items.filter((item) => item.status === statusFilter);
  }
  res.json(items);
});

router.get("/:id", (req, res) => {
  const item = findContentById(req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(item);
});

module.exports = router;
