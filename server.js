const express = require("express");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client = new Anthropic();

app.post("/generate", async (req, res) => {
  console.log("Received proposal data:", JSON.stringify(req.body, null, 2));

  const {
    clientName,
    company,
    email,
    projectName,
    description,
    startDate,
    endDate,
    milestones,
    budget,
    teamSize,
    skills,
    notes,
  } = req.body;

  const prompt = `You are a professional project proposal analyst. Based on the following client and project details, produce a structured analysis.

Client: ${clientName} at ${company} (${email})
Project: ${projectName}
Description: ${description}
Timeline: ${startDate} to ${endDate}
Milestones: ${milestones}
Budget: $${budget}
Team Size: ${teamSize}
Required Skills: ${skills}
Additional Notes: ${notes || "None"}

Respond with ONLY valid JSON (no markdown fences) in this exact shape:
{
  "overview": "A 2-3 sentence executive summary of the proposed project.",
  "proposedScope": ["bullet 1", "bullet 2", "..."],
  "keyRisks": ["risk 1", "risk 2", "..."],
  "assumptions": ["assumption 1", "assumption 2", "..."]
}`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].text;
    const proposal = JSON.parse(text);

    res.json({ proposal });
  } catch (err) {
    console.error("Claude API error:", err.message);
    res.status(500).json({
      error: "Failed to generate proposal. " + err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
