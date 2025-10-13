export interface LoanSuccessResponse {
  riskScore: number;
  riskLevel: string;
  riskPeriods: number[];
  applicationId: string;
  riskDecision: string;
}
