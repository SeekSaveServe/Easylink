// Helper functions for use in Cypress tests
export function getStore(cy) {
    return cy.window().its('store').invoke('getState')
}

export function alertContains(text) {
    return cy.findByRole('alert').contains(text);
}

// ^= means starts with testId, assuming we are using data-testid attribute
export function getByTestId(id) {
    return cy.get(`[data-testid^=${id}]`);
}

// email, pass boxes for sign in different from email and pass for sign up
export function signIn(email, password) {
    cy.visit('/');

    // type in email and password
    cy.findByRole('textbox', {
      name: /email/i
    }).type(email);

    cy.findByLabelText(/password/i).type(password);

    cy.findByRole('button', {
      name: /sign in/i
    }).click();
}

export function signOut() {
    getByTestId('sign-out').click();
}