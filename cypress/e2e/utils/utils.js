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
    getByTestId('sign-out').click({ force: true });
}


// input: { pid: ..} or { id... }
// output: Promise<Profile> 
export async function fetchProfile(idObj) {

    const table = 'pid' in idObj ? 'projects' : 'users';
    const { data, error } = await supabaseTestClient
        .from(table)
        .select('*')
        .match(idObj)
        .maybeSingle();
    
    if (error) throw error;
    return data;
}

export function searchForProfile(profile) {
    cy.get(`[id=searchBar]`).type(profile.username).type('{enter}');
    getByTestId('loading').should('not.exist');
    //cy.contains(profile.bio);
    return getByTestId(`card-${idSuffix(profile)}`);
}

export function idSuffix(profile) {
    const isProject = "pid" in profile;
    return isProject ? String(profile.pid) : profile.id.replace(" ", "");
}

export function searchForProfileAndClick(profile) {
    searchForProfile(profile);

    const testId = "pid" in profile ? String(profile.pid) : profile.id.replace(" ", "");
    getByTestId(testId).click({ force: true }); // get avatar and click
}


export function checkTag(tagArray) {
    if (tagArray.length == 0) {
        cy.contains("Nothing to show");
        return;
    }

    tagArray.forEach((tag) => cy.contains(tag));
}

export function clickDropdownOption(text) {
    cy.findByRole('option', {
        name: text
        }).click();
}