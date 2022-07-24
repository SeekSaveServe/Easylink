Cypress.Server.defaults({
    delay: 500,
    force404: false,
    ignore: (xhr) => {
    // handle custom logic for whitelisting
    return true;
    }
    })