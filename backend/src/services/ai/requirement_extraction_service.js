

const groq = require("../../config/groq");

const extractRequirements = async (text) => {
  if (!text || !text.trim()) {
    throw new Error("No text provided for requirement extraction");
  }

  const response = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL,

    messages: [
      {
        role: "system",
        content: `
You are an AI assistant for procurement technical specification analysis.

Analyze the provided tender text and extract the technical requirements.

Return ONLY valid JSON in this structure:

{
  "product": "",
  "category": "",
  "description": "",
  "requirements": [
    {
      "requirement": "",
      "value": "",
      "importance": "mandatory"
    }
  ]
}

Rules:
- Do not invent information.
- Extract only information present in the tender.
- Keep technical values exactly as stated when possible.
- importance must be one of: mandatory, important, optional.
- If importance is not explicitly clear, use "important".
- Do not recommend Indian Standards yet.
- Do not provide explanations outside the JSON.
        `
      },
      {
        role: "user",
        content: text
      }
    ],

    temperature: 0,

    response_format: {
      type: "json_object"
    }
  });

  const result = response.choices[0].message.content;

  return JSON.parse(result);
};

module.exports = {
  extractRequirements
};