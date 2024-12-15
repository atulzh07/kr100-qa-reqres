Cypress.Commands.add("verifyTitle", (dataID, title) => {
  cy.get(`li[data-id=${dataID}]`)
    .invoke("text")
    .then((apiEndpointTitle) => {
      expect(apiEndpointTitle).to.contain(title);
    });
});
