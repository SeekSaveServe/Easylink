// Test the clicked Profile (not ProfileCard) that is accessed by clicking a user's avatar
    // Tests for both own Profile and a foreign Profile
import { getStore, signIn, getByTestId, signOut, searchForProfileAndClick } from "./utils/utils";
import { teleVisProfile, emailVisProfile, bothVisProfile, bothNotVisProfile } from "../fixtures/profile";

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

// assuming on profile page already, check profile against user object passed in and based on whether is a project + is own profile
function checkProfileAfterNavigate(user, isProject, isOwn) {
        // has settings icon
        if (isOwn) {
            getByTestId("settings")
        }
       
        getByTestId("username").contains(user.username);
        getByTestId("title").contains(user.title);
        getByTestId("skills").within(() => checkTag(user.user_skills));
        getByTestId(isProject ? "related" : "interests").within(() => checkTag(user.user_interests));
        getByTestId("communities").within(() => checkTag(user.user_communities));
        getByTestId("bio").within(() => cy.contains(user.bio));

        if (isOwn || user.telegram_visibility === 'everyone') {
            getByTestId("telegram").within(() => cy.contains(user.telegram));
        } 

        if (isOwn || user.email_visibility === 'everyone') {
            getByTestId("email").within(() => cy.contains(user.email));
        }
}

function testOtherProfile(profile) {
    searchForProfileAndClick(profile);
    const isProject = "pid" in profile;
    checkProfileAfterNavigate(profile, isProject, false);
}

// to enable re-use for update profile test
function checkOwnProfile(isProject) {
    // for some reason clicking profile after switching project sometimes causes bug where user data is shown but this 
    // only occurs in cypress test environment, does not occur for real user. but clicking on a different page then clicking again causes correct load
    // without clicking away and clicking again the test sometimes fails even though there is no issue. 
    cy.findByRole('banner').within(() => {
        getByTestId("PersonIcon").click();
    });

    cy.contains('Projects').click();

    cy.findByRole('banner').within(() => {
        getByTestId("PersonIcon").click();
    });
    

    // getByTestId("username").contains(username);

    // profile now has loading indicator that hides everything if user still loading
    // so checking for presence of username test id should be enough - but change to above if causing issues
    //getByTestId("username");

    getByTestId('user-type').contains(isProject ? "PROJECT" : "USER");
    getStore(cy).then((store) => {
        
        const user = store.user;
        checkProfileAfterNavigate(user, isProject, true);
    });
}

describe('view profile', () => {
    beforeEach(() => {
        window.flag = true;
        signIn(email, password);
    });

    context(`user's own profile`, () => {
        it(`has all of the user's information`, () => {
            checkOwnProfile(false);
        });


        // assume there is at least one project to switch to
        it(`has all of a project's information after switching`, () => {
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
                            //cy.contains('Selected project');
                            checkOwnProfile(true);
                            
                        })

                        

                    });
                });

        });
    });

    

    // ensure signIn email, pass are not one of the profiles being searched and checked for
    context(`another user's profile`, () => {
        it(`has correct information for a profile with public contact details`, () => {
            testOtherProfile(bothVisProfile);
        });

        it(`has correct information for a profile with telegram visibility only`, () => {
            testOtherProfile(teleVisProfile);
        });

        it(`has correct information for a profile with email visibility only`, () => {
            testOtherProfile(emailVisProfile);
        });

        it(`has correct information for a profile with no contact visibility`, () => {
            testOtherProfile(bothNotVisProfile);
        });
    });
    
    afterEach(() => {
        // to make sure local storage etc gets cleared
        signOut();
    })
});