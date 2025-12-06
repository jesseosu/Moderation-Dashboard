const express = require("express");
const cors = require("cors");

const contentRoutes = require("./routes/content");
const actionRoutes = require("./routes/actions");
const ruleRoutes = require("./routes/rules");
const { initContentGenerator } = require("./data/contentStore");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/content", contentRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/rules", ruleRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start content generator (still simple for now)
initContentGenerator();

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
