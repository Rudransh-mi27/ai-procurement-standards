require("dotenv").config();

const { extractRequirements } = require("./src/services/ai/requirement_extraction_service");

const testText = `
Tender for procurement of 500 kVA distribution transformers.

The transformer shall have a capacity of 500 kVA.
The primary voltage shall be 11 kV.
The transformer shall be suitable for outdoor installation.
The transformer shall be three phase.
Required testing shall be performed before delivery.
`;

const runTest = async () => {
  try {
    const result = await extractRequirements(testText);

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("AI Test Error:", error.message);
  }
};

runTest();