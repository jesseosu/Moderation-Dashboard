const { generateContentItem } = require("../../mockData");
const { applyRulesToItem } = require("../rules/engine");
const { getRules } = require("./rulesStore");

let contentItems = [];
let nextId = 1;

function createInitialItems(count = 50) {
  for (let i = 0; i < count; i++) {
    const raw = generateContentItem(nextId++);
    // no ML yet, so context is simple
    const rules = getRules();
    const withDecision = applyRulesToItem(raw, rules);
    contentItems.push(withDecision);
  }
}

function initContentGenerator() {
  // initial load
  createInitialItems(50);

  // later phases: setInterval to generate more
  // for now, you can leave this or just do initial load
}

function getAllContent() {
  return contentItems;
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
    action: newStatus
  });

  return item;
}

function addContentItem(rawItem) {
  const rules = getRules();
  const decided = applyRulesToItem(rawItem, rules);
  contentItems.push(decided);
  return decided;
}

module.exports = {
  getAllContent,
  findContentById,
  updateContentStatus,
  addContentItem,
  initContentGenerator
};
