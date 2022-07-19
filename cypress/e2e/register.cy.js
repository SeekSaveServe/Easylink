// Test that account creation works as expected
const username = "registertest";
const email = "regtest@gmail.com";
const password = "123456";

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

describe('create an account', () => {
    it('user can create an account with valid inputs', () => {
        cy.visit('/');
        cy.findByRole('button', {
            name: /sign up/i
          }).click();
        
        cy.findByRole('textbox', {
            name: /username/i
        }).type(user.username);

        cy.findByRole('textbox', {
            name: /email/i
        }).type(email);

        // have to use labels to find the elements
        cy.get("[data-label=Password]").type(user.password);
        cy.get("[data-label=ConfirmPassword]").type(user.password);

        // important that the button says 'create account' - test change if text needs to change
        cy.findByRole('button', {
            name: /create account/i
        }).click();

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
        

        


        // cy.findByRole('alert'); - to check if alert has come up
    });

});