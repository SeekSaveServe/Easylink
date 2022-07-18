// Test sign in and sign out
const email = "authtest@gmail.com";
const password = "123456";
const username = "authtest";

describe('signing in and signing out', () => {
  it('user can sign in, see welcome, and sign out', () => {
    cy.visit('/');

    // type in email and password
    cy.findByRole('textbox', {
      name: /email/i
    }).type(email);

    cy.findByLabelText(/password/i).type(password);

    cy.findByRole('button', {
      name: /sign in/i
    }).click();
    
    // Can see welcome message with username
    cy.contains(`Welcome, ${username}`)

    cy.findByRole('button', {
      name: /sign out/i
    }).click()

    cy.url().should('eq', Cypress.config().baseUrl)
  });

  // it('user can sign out', () => {
  //   cy.visit('/');

  //   // type in email and password
  //   cy.findByRole('textbox', {
  //     name: /email/i
  //   }).type(email);

  //   cy.findByLabelText(/password/i).type(password);

  //   cy.findByRole('button', {
  //     name: /sign in/i
  //   }).click();
    
  //   // Can see welcome message with username
  //   cy.contains(`Welcome, ${username}`)

    
    
  // });
})