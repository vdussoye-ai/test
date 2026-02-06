const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate", (req, res) => {
  console.log("Received proposal data:", JSON.stringify(req.body, null, 2));
  res.json({
    proposal: "This is where Claude's proposal would go.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
