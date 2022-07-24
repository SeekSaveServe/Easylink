// Tests for link, follow, not for me buttons - that they induce the correct status change and this is reflected in profilecard / change in visibility of buttons
    // Test by searching for a profile to link with - also relies on search to work

import { actionsTestAccount } from "../fixtures/actions";
import { bothVisProfileProject, bothVisProfileUser, emailVisProfileProject, emailVisProfileUser, teleVisProfileProject } from "../fixtures/profile";
import { getByTestId, getProfileCard, searchForProfile, signIn, signOut } from "./utils/utils";

const ADD_LINK = "AddLinkOutlinedIcon";
const CANCEL_REQUEST = 'DoNotDisturbIcon';
const NOT_FOR_ME = "CancelOutlinedIcon";
const OUTGOING = 'Outgoing Request'
const YOU_REJECTED = 'You rejected';
const FOLLOW = 'RssFeedOutlinedIcon';
const UNFOLLOW = 'LeakRemoveOutlinedIcon';

describe('action buttons', () => {
    beforeEach(() => {
        signIn(actionsTestAccount.email, actionsTestAccount.password);
    });

    context('on user profile cards', () => {
        it('when link is pressed, status on profile card changes, link is hidden, and user can cancel request', () => {
            searchForProfile(bothVisProfileUser).within(() => {
                getByTestId(ADD_LINK).click({ force: true })
            });
    
            // // only one profile on the page (searching by username, username is unique)
            cy.contains(OUTGOING);
            getByTestId(ADD_LINK).should('not.exist');
    
            // // reset to neutral state 
            getByTestId(CANCEL_REQUEST).click({ force: true });
    
            // // after cancel, link comes back (return to neutral state)
            getByTestId(ADD_LINK).should('exist');
    
        });

        it('when not for me is pressed, status on profile card changes, not for me is hidden, and user can reverse rejection by making a request again', () => {

            searchForProfile(emailVisProfileUser).within(() => {
                getByTestId(NOT_FOR_ME).click({ force: true });
            });

            // 'You rejected' status and reject icon no longer there
            cy.contains(YOU_REJECTED);
            getByTestId(NOT_FOR_ME).should('not.exist');

            // can reverse rejection by making a request again - becomes Outgoing Request
            getByTestId(ADD_LINK).click({ force: true });
            cy.contains(OUTGOING);

            // reset back to neutral
            getByTestId(CANCEL_REQUEST).click({ force: true })

        });
    });

    context('on project profile cards', () => {
        it('when link is pressed, status on profile card changes, link is hidden, and user can cancel request', () => {
            searchForProfile(bothVisProfileProject).within(() => {
                getByTestId(ADD_LINK).click({ force: true })
            });
    
            // // only one profile on the page (searching by username, username is unique)
            cy.contains(OUTGOING);
            getByTestId(ADD_LINK).should('not.exist');
    
            // // reset to neutral state 
            getByTestId(CANCEL_REQUEST).click({ force: true });
    
            // // after cancel, link comes back (return to neutral state)
            getByTestId(ADD_LINK).should('exist');
    
        });

        it('when follow is pressed, follow icon changes to unfollow, and user can unfollow the project', () => {
            searchForProfile(teleVisProfileProject).within(() => {
                getByTestId(FOLLOW).click({ force: true });
            });

            // go to feed and check posts
            // doesn't work because cypress is unreliable - test succeeds then suddenly fails even though posts are still visible
            // cy.contains('Feed').click({ force: true });
            // getByTestId('SettingsIcon').click({ force: true });
            // cy.findByRole('menuitem', {
            //     name: /posts/i
            // }).click({ force: true }).then(() => {
            //     cy.contains(teleVisProfileProject.username);
            // })

            getByTestId(UNFOLLOW).click({ force: true })

        });

        it('when not for me is pressed, status on profile card changes, not for me is hidden, and user can reverse rejection by making a request again', () => {

            searchForProfile(emailVisProfileProject).within(() => {
                getByTestId(NOT_FOR_ME).click({ force: true });
            });

            // 'You rejected' status and reject icon no longer there
            cy.contains(YOU_REJECTED);
            getByTestId(NOT_FOR_ME).should('not.exist');

            // can reverse rejection by making a request again - becomes Outgoing Request
            getByTestId(ADD_LINK).click({ force: true });
            cy.contains(OUTGOING);

            // reset back to neutral
            getByTestId(CANCEL_REQUEST).click({ force: true })

        });
    });


    afterEach(() => {
        signOut();
    });
});