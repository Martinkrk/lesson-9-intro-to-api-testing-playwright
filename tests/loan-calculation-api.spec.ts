import { test, expect } from "@playwright/test";
import { StatusCodes } from "http-status-codes";
import { LoanDTO } from "./dto/LoanDTO";
import { Ajv } from "ajv";
import { loanResponseSchema } from "./dto/loan-response-schema";
import { LoanSuccessResponse } from "./dto/LoanSuccessResponse";

const BASE_URL = "https://backend.tallinn-learning.ee/api/loan-calc/decision";

const ajv = new Ajv();
const validate = ajv.compile(loanResponseSchema);

test("Create a loan with a low risk", async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = LoanDTO.createRandomLoan();
  requestBody.income = 10000;
  requestBody.debt = 0;
  requestBody.employed = true;
  requestBody.loanAmount = 500;
  requestBody.loanPeriod = 12;

  LoanDTO.verifyLoanData(requestBody);

  const response = await request.post(BASE_URL, { data: requestBody, headers });

  expect(response.status()).toBe(StatusCodes.OK);

  const responseData: LoanSuccessResponse = await response.json();
  const validatedResponse = validate(responseData);

  expect.soft(validatedResponse).toBeTruthy();
  expect.soft(responseData.riskLevel).toBe("Low Risk");
  expect.soft(responseData.riskDecision).toBe("positive");
});

test("Create a loan with a medium risk", async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = LoanDTO.createRandomLoan();
  requestBody.income = 5000;
  requestBody.debt = 1000;
  requestBody.employed = true;
  requestBody.loanAmount = 1000;
  requestBody.loanPeriod = 6;

  LoanDTO.verifyLoanData(requestBody);

  const response = await request.post(BASE_URL, { data: requestBody, headers });

  expect(response.status()).toBe(StatusCodes.OK);

  const responseData: LoanSuccessResponse = await response.json();
  const validatedResponse = validate(responseData);

  expect.soft(validatedResponse).toBeTruthy();
  expect.soft(responseData.riskLevel).toBe("Medium Risk");
  expect.soft(responseData.riskDecision).toBe("positive");
});

test("Create a loan with a high risk", async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = LoanDTO.createRandomLoan();
  requestBody.income = 500;
  requestBody.debt = 0;
  requestBody.employed = true;
  requestBody.loanAmount = 2000;
  requestBody.loanPeriod = 6;

  LoanDTO.verifyLoanData(requestBody);

  const response = await request.post(BASE_URL, { data: requestBody, headers });

  expect(response.status()).toBe(StatusCodes.OK);

  const responseData: LoanSuccessResponse = await response.json();
  const validatedResponse = validate(responseData);

  expect.soft(validatedResponse).toBeTruthy();
  expect.soft(responseData.riskLevel).toBe("High Risk");
  expect.soft(responseData.riskDecision).toBe("positive");
});

test("Create a loan with a very high risk", async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = LoanDTO.createRandomLoan();
  requestBody.income = 500;
  requestBody.debt = 2000;
  requestBody.employed = true;
  requestBody.loanAmount = 3000;
  requestBody.loanPeriod = 12;

  LoanDTO.verifyLoanData(requestBody);

  const response = await request.post(BASE_URL, { data: requestBody, headers });

  expect(response.status()).toBe(StatusCodes.OK);

  const responseData: LoanSuccessResponse = await response.json();
  const validatedResponse = validate(responseData);

    expect.soft(validatedResponse).toBeTruthy();
    expect.soft(responseData.riskLevel).toBe("Very High Risk");
    expect.soft(responseData.riskDecision).toBe("negative");
});

test("Create a loan with an income of zero", async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = LoanDTO.createRandomLoan();
  requestBody.income = 0;

    const response = await request.post(BASE_URL, { data: requestBody, headers });

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST);
});

test("Create a loan with a negative debt", async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = LoanDTO.createRandomLoan();
  requestBody.debt = -1;

  const response = await request.post(BASE_URL, { data: requestBody, headers });

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST);
});
