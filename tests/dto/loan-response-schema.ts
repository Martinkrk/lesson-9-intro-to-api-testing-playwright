export const loanResponseSchema = {
  type: "object",
  properties: {
    riskScore: { type: "number" },
    riskLevel: { type: "string" },
    riskPeriods: { type: "array", items: { type: "integer" } },
    applicationId: { type: "string" },
    riskDecision: { type: "string" },
  },
  required: ["riskScore", "riskLevel", "riskPeriods", "applicationId", "riskDecision"],
};
