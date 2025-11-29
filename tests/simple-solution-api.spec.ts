import { expect, test } from "@playwright/test";

import { StatusCodes } from "http-status-codes";

const BASE_URL = "https://backend.tallinn-learning.ee/test-orders";

test("get order with correct id should receive code 200", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/1`); // .get(BASE_URL + '/1')
  expect(response.status()).toBe(200);
});

test("get order with incorrect id should receive code 400", async ({ request }) => {
  const responseOrderId0 = await request.get(`${BASE_URL}/0`);
  const responseOrderId11 = await request.get(`${BASE_URL}/11`);
  const responseOrderIdNull = await request.get(`${BASE_URL}/null`);
  const responseOrderIdTest = await request.get(`${BASE_URL}/test`);
  const responseOrderIdNegative1 = await request.get(`${BASE_URL}/-1`);

  expect(responseOrderId0.status()).toBe(StatusCodes.BAD_REQUEST);
  expect(responseOrderId11.status()).toBe(StatusCodes.BAD_REQUEST);
  expect(responseOrderIdNull.status()).toBe(StatusCodes.BAD_REQUEST);
  expect(responseOrderIdTest.status()).toBe(StatusCodes.BAD_REQUEST);
  expect(responseOrderIdNegative1.status()).toBe(StatusCodes.BAD_REQUEST);
});

test("post order with correct data should receive code 200", async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 0,
  };
  // Send a POST request to the server
  const response = await request.post(BASE_URL, {
    data: requestBody,
  });
  // Log the response status and body
  console.log("response status:", response.status());
  console.log("response body:", await response.json());
  expect(response.status()).toBe(StatusCodes.OK);
});

test("put order with correct data and id should receive code 200", async ({ request }) => {
  const header = {
    api_key: `1234567890123456`,
  };
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 1,
  };
  const response = await request.put(`${BASE_URL}/1`, { data: requestBody, headers: header });
  expect(response.status()).toBe(StatusCodes.OK);
});

test("put order with correct data and incorrect id should receive code 400", async ({ request }) => {
  const header = {
    api_key: `1234567890123456`,
  };
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 1,
  };
  const response = await request.put(`${BASE_URL}/11`, { data: requestBody, headers: header });
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
});

test("put order with number type data and correct id should receive code 200", async ({ request }) => {
  const header = {
    api_key: `1234567890123456`,
  };
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: 1010,
    customerPhone: "string",
    comment: "string",
    id: 1,
  };
  const response = await request.put(`${BASE_URL}/1`, { data: requestBody, headers: header });
  expect(response.status()).toBe(StatusCodes.OK);
});

test("delete order with correct id should receive code 204", async ({ request }) => {
  const header = {
    api_key: `1234567890123456`,
  };
  const response = await request.delete(`${BASE_URL}/1`, { headers: header });
  expect(response.status()).toBe(StatusCodes.NO_CONTENT);
});

test("delete order with incorrect id should receive code 400", async ({ request }) => {
  const header = {
    api_key: `1234567890123456`,
  };
  const response = await request.delete(`${BASE_URL}/11`, { headers: header });
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
});
