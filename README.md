# Loan Risk Calculation Checklist

| # | Scenario                                          | Method | Input                                                                                   | Expected Result                                                     |
|:-:|---------------------------------------------------|:------:|-----------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| 1 | Create a low risk loan                            | `POST` | { "income": 10000, "debt": 0, "employed": true, "loanAmount": 500, "loanPeriod": 12 }   | `200 OK`, { riskLevel: "Low Risk", riskDecision: "positive" }       |
| 2 | Create a medium risk loan                         | `POST` | { "income": 5000, "debt": 1000, "employed": true, "loanAmount": 1000, "loanPeriod": 6 } | `200 OK`, { riskLevel: "Medium Risk", riskDecision: "positive" }    |
| 3 | Create a high risk loan                           | `POST` | { "income": 500, "debt": 0, "employed": true, "loanAmount": 2000, "loanPeriod": 6 }     | `200 OK`, { riskLevel: "High Risk", riskDecision: "positive" }      |
| 4 | Create a very high risk loan                      | `POST` | { "income": 500, "debt": 2000, "employed": true, "loanAmount": 2000, "loanPeriod": 6 }  | `200 OK`, { riskLevel: "Very High Risk", riskDecision: "negative" } |
| 5 | Create a loan for an applicant with no income     | `POST` | { "income": 0 }                                                                         | `400 BAD REQUEST`                                                   |
| 6 | Create a loan for an applicant with negative debt | `POST` | { "debt": -1 }                                                                          | `400 BAD REQUEST`                                                   |


# Чеклист для orders

| # | Сценарий                                                           | Тестовые данные     |
|:-:|--------------------------------------------------------------------|---------------------|
| 1 | Изменение данных заказа, используя верный id, и верные данные      | id = { 1..10 }      |
| 2 | Изменение данных заказа, используя неверный id, и верные данные    | id = 11             |
| 3 | Изменение данных заказа, используя верный id, и данные типа number | customerName = 1010 |
| 4 | Удаление заказа, используя верный id                               | id = { 1..10 }      |
| 5 | Удаление заказа, используя неверный id                             | id = 11             |
| 6 | Получение данных заказа, используя негативное значение id          | id = -1             |