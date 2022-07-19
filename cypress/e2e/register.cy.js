// Test that account creation works as expected
const result = {
    "user": {
        "user_skills": [],
        "user_interests": [],
        "user_communities": [],
        "loading": "idle",
        "username": "registertest",
        "email": "regtest@gmail.com",
        "password": "123456",
        "tags": [
            [
                "Finance"
            ],
            [
                "Sports",
                "Service"
            ],
            [
                "USP"
            ]
        ],
        "telegram": "regtelegram",
        "avatar_url": "",
        "telegram_visibility": "everyone",
        "email_visibility": "afterlink",
        "title": "title",
        "bio": "bio"
    },
    "projects": {
        "ids": [],
        "entities": {},
        "loading": "idle",
        "rootIds": []
    },
    "links": {
        "ids": [],
        "entities": {},
        "loading": "fulfilled"
    },
    "followers": {
        "ids": [],
        "entities": {},
        "loading": "fulfilled"
    },
    "search": {
        "search": "",
        "searchFilter": "",
        "unique_skills": [
            "Finance",
            "Programming",
            "Writing",
            "Public Speaking",
            "First Aid",
            "Photography",
            "Athletics",
            "Event Planning",
            "Other Skills"
        ],
        "unique_interests": [
            "Sports",
            "Service",
            "Learning",
            "Arts and Music",
            "Academic",
            "Environment",
            "Social and Cultural",
            "Other Interests"
        ],
        "unique_communities": [
            "USP",
            "GUI",
            "House",
            "Interest Groups",
            "Other Communities"
        ],
        "selectedSkills": [],
        "selectedInterests": [],
        "selectedCommunities": [],
        "loading": "fulfilled"
    }
};

const user = result.user;

function getStore(cy) {
    return cy.window().its('store').invoke('getState')
}

// Helper functions // 
// used in many tests
function getCreateAccount() {
    return cy.findByRole('button', {
        name: /create account/i
    });
}

function alertContains(text) {
    return cy.findByRole('alert').contains(text);
}

function typeUsername(username) {
    cy.findByRole('textbox', {
        name: /username/i
    }).type(username);
}

function typeEmail(email) {
    cy.findByRole('textbox', {
        name: /email/i
    }).type(email);
}

function typePassword(password) {
    // have to use labels to find the elements
    cy.get("[data-label=Password]").type(password);
}

function typeConfirmPassword(confirm) {
    cy.get("[data-label=ConfirmPassword]").type(confirm);
}

// Test Suite
describe('create an account', () => {
    context('with valid inputs', () => {
        // if I click start linking I need to delete the user after every test, instead check redux store has correct info
        it('user can create an account with valid inputs', () => {
            cy.visit('/');
            cy.findByRole('button', {
                name: /sign up/i
              }).click();
            
            typeUsername(user.username);
            typeEmail(user.email);
    
            // have to use labels to find the elements
            typePassword(user.password);
            typeConfirmPassword(user.password);
    
            // important that the button says 'create account' - test change if text needs to change
            getCreateAccount().click();
    
            cy.findByRole('textbox', {
                name: /telegram/i
                }).type(user.telegram, { force: true })
    
            // for some reason when a dropdown is opened it hides everything
                // Skills: Finance
                // interests: Sports, Service
                // Communities: USP
    
              cy.get('[id^=skills]').click();
    
                cy.findByRole('option', {
                name: /finance/i
                }).click();
            
                
              cy.get('[id^=interests]').click({ force: true });
    
                cy.findByRole('option', {
                    name: /sports/i
                    }).click();
                
                cy.findByRole('option', {
                    name: /service/i
                    }).click();
                
                
              cy.get('[id^=communities]').click({ force: true });
            
                cy.findByRole('option', {
                    name: /usp/i
                    }).click();
                
                
                
                cy.contains('Next').click({ force: true });
                
                // end of dropdowns
    
                // type title, bio
                cy.findByRole('textbox', {
                    name: /title/i
                  }).type(user.title);
    
    
                cy.findByRole('textbox', {
                name: /bio/i
                }).type(user.bio);
    
                cy.contains('Everyone').click(); // clicks the first Everyone under Tele
    
                // to force saving to redux store
                cy.contains('Back').click({ force: true });
                cy.contains('Next').click({ force: true });
    
                getStore(cy)
                    .then(store => { console.log(store.user); return store.user; })
                    .should('deep.equal', user);
        });
    });

    context('with invalid inputs', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.findByRole('button', {
                name: /sign up/i
              }).click();
        });

        it('shows error when some fields are empty', () => {
            getCreateAccount().click();
            alertContains('Please fill in all fields');
        });

        it('shows error when passwords not same and other fields also blank', () => {
            typePassword('12');
            typeConfirmPassword('123');
            getCreateAccount().click();
            alertContains('Please fill in all fields and ensure passwords are the same')
        });

        it('shows error when passwords not same but all fields filled in', () => {
            typePassword('12');
            typeConfirmPassword('123');
            typeEmail('testemail@gmail.com');
            typeUsername('testuser');
            getCreateAccount().click();
            alertContains('Please ensure passwords are the same');

        });

        it('shows error when all fields filled, passwords same but password length < 6', () => {
            typePassword('123');
            typeConfirmPassword('123');
            typeEmail('testemail@gmail.com');
            typeUsername('testuser');
            getCreateAccount().click();
            alertContains('Password should be at least 6 characters');
        });

        it('shows error when all fields filled correctly but email exists', () => {
            typePassword('123456');
            typeConfirmPassword('123456');
            typeEmail('benthefreshie@gmail.com');
            typeUsername('testuser');
            getCreateAccount().click();
            alertContains('Username or email already exists!');
        });

        it('shows error when all fields filled correctly but username exists', () => {
            typePassword('123456');
            typeConfirmPassword('123456');
            typeEmail('uniqueemail@gmail.com');
            typeUsername('Ben The Senior');
            getCreateAccount().click();
            alertContains('Username or email already exists!');
        });
    })
    
});
