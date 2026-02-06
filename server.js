const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/analyze", (req, res) => {
  const { clientName, content } = req.body;

  if (!clientName || !content) {
    return res.status(400).json({ error: "clientName and content are required" });
  }

  // Dummy response for now
  const result = {
    client: clientName,
    wordCount: content.trim().split(/\s+/).length,
    characterCount: content.length,
    sentiment: "positive",
    keywords: ["sample", "analysis", "demo"],
    summary: `Analysis complete for ${clientName}. The submitted text contains ${content.trim().split(/\s+/).length} words.`,
    timestamp: new Date().toISOString(),
  };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
