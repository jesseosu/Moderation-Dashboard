const USERS = [
    "user_rose",
    "user_kai",
    "user_lynx",
    "user_mika",
    "user_aiko",
  ];
  
  const TEXT_SNIPPETS = [
    "Check out my new dance video!",
    "This comment seems suspicious...",
    "You won't believe what happened today.",
    "This might violate the guidelines?",
    "Totally safe, fun, and wholesome content.",
    "Some borderline content here, needs review.",
  ];
  
  const TAGS = ["spam", "nsfw", "hate", "bullying", "safe", "advertisement"];
  
  let nextId = 1;
  
  /**
   * Generate a fake moderation item.
   */
  function generateContentItem() {
    const randomText =
      TEXT_SNIPPETS[Math.floor(Math.random() * TEXT_SNIPPETS.length)];
    const randomUser = USERS[Math.floor(Math.random() * USERS.length)];
    const randomTag = TAGS[Math.floor(Math.random() * TAGS.length)];
  
    return {
      id: nextId++,
      userId: randomUser,
      text: randomText,
      tagHint: randomTag,
      createdAt: new Date().toISOString(),
      status: "pending", // pending | approved | rejected | escalated
      modelConfidence: +(Math.random().toFixed(2)), // 0.00 - 1.00
      actionHistory: [],
    };
  }
  
  module.exports = {
    generateContentItem,
  };
  