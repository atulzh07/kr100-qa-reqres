import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
/// <reference types="Cypress" />
const siteUrl = "https://reqres.in/";

Given("a user visits reqres website", () => {
  cy.visit(siteUrl);
});
When("the user can see a list of api endpoints", () => {
  cy.get(".endpoints");
});
Then("1. GET | List Users", () => {
  const endPoint = "api/users?page=2";
  cy.verifyTitle("users", "List users");
  cy.request({ method: "GET", url: siteUrl + endPoint }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data[0].first_name).to.eq("Michael");
  });
});
Then("2. GET | Single User", () => {
  const endPoint = "api/users/2";
  cy.verifyTitle("users-single", "Single user");
  cy.request({ method: "GET", url: siteUrl + endPoint }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data.first_name).to.eq("Janet");
  });
});
Then("3. GET | Single user not found", () => {
  const endPoint = "api/users/23";
  cy.verifyTitle("users-single-not-found", "Single user not found");
  cy.request({
    method: "GET",
    url: siteUrl + endPoint,
    failOnStatusCode: false,
  })
    .its("status")
    .should("equal", 404);
});
Then("4. GET | List <Resource>", () => {
  const endPoint = "api/unknown";
  cy.verifyTitle("unknown", "List <resource>");
  cy.request({ method: "GET", url: siteUrl + endPoint }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data[0].color).to.eq("#98B2D1");
  });
});
Then("5. GET | Single <Resource>", () => {
  const endPoint = "api/unknown/2";
  cy.verifyTitle("unknown-single", "Single <resource>");
  cy.request({ method: "GET", url: siteUrl + endPoint }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.support.text).to.contain("writing");
  });
});
Then("6. GET | Single <Resource> Not Found", () => {
  const endPoint = "api/unknown/23";
  cy.verifyTitle("unknown-single-not-found", "Single <resource> not found");
  cy.request({
    method: "GET",
    url: siteUrl + endPoint,
    failOnStatusCode: false,
  })
    .its("status")
    .should("equal", 404);
});
Then("7. POST | Create", () => {
  const endPoint = "api/users";
  const payloadBody = { name: "morpheus", job: "leader" };
  cy.verifyTitle("post", "Create");
  cy.request({
    method: "POST",
    url: siteUrl + endPoint,
    body: payloadBody,
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.haveOwnProperty("id");
  });
});
Then("8. PUT | Update", () => {
  const endPoint = "api/users/2";
  const payloadBody = { name: "morpheus", job: "zion resident" };
  cy.verifyTitle("put", "Update");
  cy.request({
    method: "PUT",
    url: siteUrl + endPoint,
    body: payloadBody,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.job).to.eq(payloadBody.job);
  });
});
Then("9. PATCH | Update", () => {
  const endPoint = "api/users/2";
  const payloadBody = { name: "morpheus", job: "zion resident" };
  cy.verifyTitle("patch", "Update");
  cy.request({
    method: "PATCH",
    url: siteUrl + endPoint,
    body: payloadBody,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq(payloadBody.name);
  });
});
Then("10. DELETE | Delete", () => {
  const endPoint = "api/users/2";
  cy.verifyTitle("delete", "Delete");
  cy.request({
    method: "DELETE",
    url: siteUrl + endPoint,
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});
Then("11. POST | Register - Successful", () => {
  const endPoint = "api/register";
  cy.verifyTitle("register-successful", "Register - successful");
  const payloadBody = { email: "eve.holt@reqres.in", password: "pistol" };
  cy.request({
    method: "POST",
    url: siteUrl + endPoint,
    body: payloadBody,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.haveOwnProperty("token");
  });
});
Then("12. POST | Register - Unsuccessful", () => {
  const endPoint = "api/register";
  cy.verifyTitle("register-unsuccessful", "Register - unsuccessful");
  const payloadBody = { email: "sydney@fife" };
  cy.request({
    method: "POST",
    url: siteUrl + endPoint,
    body: payloadBody,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.error).to.eq("Missing password");
  });
});
Then("13. POST | Login - Successful", () => {
  const endPoint = "api/login";
  cy.verifyTitle("login-successful", "Login - successful");
  const payloadBody = { email: "eve.holt@reqres.in", password: "cityslicka" };
  cy.request({
    method: "POST",
    url: siteUrl + endPoint,
    body: payloadBody,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.haveOwnProperty("token");
  });
});
Then("14. POST | Login - Unsuccessful", () => {
  const endPoint = "api/login";
  cy.verifyTitle("login-unsuccessful", "Login - unsuccessful");
  const payloadBody = { email: "peter@klaven" };
  cy.request({
    method: "POST",
    url: siteUrl + endPoint,
    body: payloadBody,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.error).to.eq("Missing password");
  });
});
Then("15. GET | Delayed Response", () => {
  const endPoint = "api/users?delay=3";
  cy.verifyTitle("delay", "Delayed response");
  cy.request({ method: "GET", url: siteUrl + endPoint }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data[0].id).to.eq(1);
  });
});
