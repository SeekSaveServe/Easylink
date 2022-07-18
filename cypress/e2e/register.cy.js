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
        }).type(username);

        cy.findByRole('textbox', {
            name: /email/i
        }).type(email);


        
        


        

        //cy.window().its('store').invoke('getState').then((obj) => console.log("STORE", obj))
    });

});