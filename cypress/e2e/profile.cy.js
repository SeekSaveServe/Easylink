// Test the clicked Profile (not ProfileCard) that is accessed by clicking a user's avatar
    // Tests for both own Profile and a foreign Profile
import { getStore, signIn, getByTestId } from "./utils/utils";

const email = 'profiletestacct@gmail.com';
const username="profiletestacct"
const password = '661266';

// if empty, check that the respective element has "Nothing to show" (after user has loaded)
function checkTag(tagArray) {
    if (tagArray.length == 0) {
        cy.contains("Nothing to show");
        return;
    }

    tagArray.forEach((tag) => cy.contains(tag));
}

// to enable re-use for update profile test
function checkProfile() {
    cy.findByRole('banner').within(() => {
        getByTestId("PersonIcon").click();
    });

    // this also acts as a check that user store has loaded, so we need to hardcode username as well as email, pass for test
    getByTestId("username").contains(username);

    // has settings icon
    getByTestId("settings")

    getStore(cy).then((store) => {
        const user = store.user;
        getByTestId("title").contains(user.title);
        getByTestId("skills").within(() => checkTag(user.user_skills));
        getByTestId("interests").within(() => checkTag(user.user_interests));
        getByTestId("communities").within(() => checkTag(user.user_communities));
        getByTestId("bio").within(() => cy.contains(user.bio));
        getByTestId("email").within(() => cy.contains(user.email));
        getByTestId("telegram").within(() => cy.contains(user.telegram));
    });
}

describe('view profile', () => {
    context(`user's own profile`, () => {
        it(`has all of the user's information`, () => {
            signIn(email, password);
            checkProfile();
            // cy.findByRole('banner').within(() => {
            //     getByTestId("PersonIcon").click();
            // });

            // // this also acts as a check that user store has loaded, so we need to hardcode username as well as email, pass for test
            // getByTestId("username").contains(username);

            // // has settings icon
            // getByTestId("settings")

            // getStore(cy).then((store) => {
            //     const user = store.user;
            //     getByTestId("title").contains(user.title);
            //     getByTestId("skills").within(() => checkTag(user.user_skills));
            //     getByTestId("interests").within(() => checkTag(user.user_interests));
            //     getByTestId("communities").within(() => checkTag(user.user_communities));
            //     getByTestId("bio").within(() => cy.contains(user.bio));
            //     getByTestId("email").within(() => cy.contains(user.email));
            //     getByTestId("telegram").within(() => cy.contains(user.telegram));
            // });
        });
    })
});