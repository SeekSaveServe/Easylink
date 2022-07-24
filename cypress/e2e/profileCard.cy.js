// Tests that data is displayed correctly on ProfileCard, not inclusive of link status transitions, by searching for the card (is also a test of search)
    // i.e  test assumes the viewing user has not interacted with those profiles (link, follow, reject)
    // and viewing user's own profile is viewable on search

import { username, email, password, profileTestAccount, bothVisProfileUser, emailVisProfileUser, teleVisProfileUser, bothNotVisProfileUser, bothVisProfileProject, teleVisProfileProject, emailVisProfileProject, bothNotVisProfileProject } from '../fixtures/profile';
import { checkTag, getByTestId, idSuffix, searchForProfile, searchForProfileAndClick, signIn, signOut } from './utils/utils';

function searchAndTestProfileCard(profile, isOwn) {
    const isProject = "pid" in profile;
    searchForProfile(profile).within(() => {
        getByTestId('username');
        getByTestId('title');
        getByTestId('bio').within(() => {
            checkTag(profile.user_skills);
            checkTag(profile.user_interests);
        });
        
        getByTestId('communities').within(() => {
            checkTag(profile.user_communities);
        });
        
        getByTestId('type').contains(isProject ? "Project" : "User");

        // show tele only if 'everyone' or own profile
        if (isOwn || profile.telegram_visibility === 'everyone') {
            getByTestId("telegram").within(() => cy.contains(profile.telegram));
        } else {
            getByTestId("telegram").should('not.exist');
        }


        // show email only if 'everyone' or own profile
        if (isOwn || profile.email_visibility === 'everyone') {
            getByTestId("email").within(() => cy.contains(profile.email));
        } else {
            getByTestId("email").should('not.exist');
        }


        // if project: follow will still be on screen but not visible, else doesn't exist 
        if (isOwn) {
            getByTestId('link').should('not.be.visible');

            isProject ? getByTestId('RssFeedOutlinedIcon').should('not.be.visible') : 
                getByTestId('RssFeedOutlinedIcon').should('not.exist');

            getByTestId('CancelOutlinedIcon').should('not.be.visible');
        } else {
            getByTestId('link').should('exist');
            isProject ? getByTestId('RssFeedOutlinedIcon').should('exist') : void 0;
            getByTestId('CancelOutlinedIcon').should('exist');
        }
    });
}
describe('view profile card by searching', () => {
    beforeEach(() => {
        signIn(email, password);
    });

    it('for own profile card, shows correct info and hides actions', () => {
        searchAndTestProfileCard(profileTestAccount, true);
    });

    context('for other profile cards of users', () => {
        it('shows correct info, actions for profile with public contact visibility', () => {
            searchAndTestProfileCard(bothVisProfileUser, false);
        });

        it('shows correct info, actions for profile with telegram visibility only', () => {
            searchAndTestProfileCard(teleVisProfileUser, false);
        });

        it('shows correct info, actions for profile with email visibility only', () => {
            searchAndTestProfileCard(emailVisProfileUser, false);
        }); 

        it('shows correct info, actions for profile with no contact visibility', () => {
            searchAndTestProfileCard(bothNotVisProfileUser, false);
        }); 
    }); 

    context('for other profile cards of projects', () => {
        it('shows correct info, actions for profile with public contact visibility', () => {
            searchAndTestProfileCard(bothVisProfileProject, false);
        });

        it('shows correct info, actions for profile with telegram visibility only', () => {
            searchAndTestProfileCard(teleVisProfileProject, false);
        });

        it('shows correct info, actions for profile with email visibility only', () => {
            searchAndTestProfileCard(emailVisProfileProject, false);
        }); 

        it('shows correct info, actions for profile with no contact visibility', () => {
            searchAndTestProfileCard(bothNotVisProfileProject, false);
        }); 
    }); 


    afterEach(() => {
        // to make sure local storage etc gets cleared
        signOut();
    });

});
