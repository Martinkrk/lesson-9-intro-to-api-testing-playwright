import { expect } from "@playwright/test";

export class LoanDTO {
  income: number;
  debt: number;
  age: number;
  employed: boolean;
  loanAmount: number;
  loanPeriod: number;

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income;
    this.debt = debt;
    this.age = age;
    this.employed = employed;
    this.loanAmount = loanAmount;
    this.loanPeriod = loanPeriod;
  }

  static createRandomLoan(): LoanDTO {
    return new LoanDTO(
      Math.round(Math.random() * 5000 + 1), // 1 ... 5001
      Math.max(Math.round(Math.random() * 10000 - 5000), 0), // 0 ... 5000
      Math.max(Math.round(Math.random() * 100), 17), // 17 ... 100
      Math.random() > 0.5,
      Math.round(Math.random() * 10000 + 1), // 1 ... 10001
      Math.round(Math.random() * 119 + 1), // 1 ... 120
    );
  }

  static verifyLoanData(data: LoanDTO): void {
    expect.soft(data.income).toBeGreaterThan(0);
    expect.soft(data.debt).toBeGreaterThanOrEqual(0);
    expect.soft(data.age).toBeGreaterThanOrEqual(17);
    expect.soft(typeof data.employed).toBe("boolean");
    expect.soft(data.loanAmount).toBeGreaterThan(0);
    expect.soft(data.loanPeriod).toBeGreaterThan(0);
  }
}
