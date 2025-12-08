// backend/data/contentStore.js
const { generateContentItem } = require("../../mockData");
const { applyRulesToItem } = require("../rules/engine");
const { getRules } = require("./rulesStore");

let contentItems = [];
let nextId = 1;

// How many messages we keep in memory (for demo)
const MAX_ITEMS = 200;

function createInitialItems(count = 50) {
  for (let i = 0; i < count; i++) {
    const raw = generateRawItem();
    const decided = applyRules(raw);
    contentItems.push(decided);
  }
}

function generateRawItem() {
  const base = generateContentItem(nextId++);
  // ensure it always has an id + default fields
  return {
    id: base.id ?? nextId - 1,
    text: base.text || "",
    status: base.status || "pending",
    actionHistory: base.actionHistory || [],
    // you can add more fields here later (userId, streamId, etc.)
  };
}

function applyRules(rawItem) {
  const rules = getRules();
  return applyRulesToItem(rawItem, rules);
}

function trimIfNeeded() {
  if (contentItems.length > MAX_ITEMS) {
    const extra = contentItems.length - MAX_ITEMS;
    contentItems.splice(0, extra); // drop oldest
  }
}

function initContentGenerator() {
  // Seed with an initial batch
  createInitialItems(50);

  // Generate a new item every second (simulated live stream)
  setInterval(() => {
    const raw = generateRawItem();
    const decided = applyRules(raw);
    contentItems.push(decided);
    trimIfNeeded();
  }, 1000);
}

function getAllContent() {
  // newest first looks more like a live feed
  return [...contentItems].reverse();
}

function findContentById(id) {
  return contentItems.find((item) => item.id === Number(id));
}

function updateContentStatus(id, newStatus, actor = "human_mod") {
  const item = findContentById(id);
  if (!item) return null;

  item.status = newStatus;
  item.actionHistory = item.actionHistory || [];
  item.actionHistory.push({
    at: new Date().toISOString(),
    by: actor,
    action: newStatus,
  });

  return item;
}

function addContentItem(rawItem) {
  const decided = applyRules(rawItem);
  contentItems.push(decided);
  trimIfNeeded();
  return decided;
}

module.exports = {
  getAllContent,
  findContentById,
  updateContentStatus,
  addContentItem,
  initContentGenerator,
};
