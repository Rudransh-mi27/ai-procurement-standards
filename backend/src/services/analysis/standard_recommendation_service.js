const supabase = require("../../config/supabase");
const { searchStandards } = require("../search/standard_search_service");

const recommendStandards = async (requirementData) => {
  const recommendations = [];

  for (const req of requirementData.requirements) {
    const query = `${requirementData.product} ${req.requirement} ${req.value}`;

    const matches = await searchStandards(
      query,
      0.30,
      3
    );

    recommendations.push({
      requirement: req.requirement,
      value: req.value,
      matches
    });
  }

  return recommendations;
};

module.exports = {
  recommendStandards
};