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

// get profile card on page
export function getProfileCard(profile) {
    return getByTestId(`card-${idSuffix(profile)}`);
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

// assuming on projects page already: provide access to store.projects after loading done
    // does a check for if on projects page
export function getProjectsStore(callback) {
    cy.contains('Feed').click({ force: true });
    cy.contains('Projects').click({ force: true });

    cy.url().should('include', '/projects');
    getByTestId('loading').should('not.exist')
    .then(() => {
        getStore(cy).then((store) => {
            const projects = store.projects;
            cy.log(projects);

            callback(projects);

        });
    });
}

export function afterProjectsLoad(callback) {
    getByTestId('loading').should('not.exist').then(() => {
        callback();
    });
}

export function switchToFirstProject(callback) {
    cy.contains('Projects').click();// may break if something else in the DOM has Projects before load but unlikely

            // once loading indicator is gone do the tests
    getByTestId('loading').should('not.exist')
        .then(() => {
            getStore(cy).then((store) => {
                const projects = store.projects;
                cy.log(projects);

                // test fails if 0 projects
                expect(projects.rootIds).to.have.lengthOf.above(0);

                window.Cypress.PROJ_ARG = "switch";
                
                // doesn't matter what we switch to
                getByTestId(projects.rootIds[0]).click({ force: true }).then(() => {
                    callback();
                })
            });
        });
}