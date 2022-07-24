import { postTestAccount } from "../fixtures/posts";
import { getByTestId, signIn, signOut, switchToFirstProject } from "./utils/utils";

// Testing for posts / polls
    // Assume test account has at least one project
describe('making posts or polls', () => {
    beforeEach(() => {
        signIn(postTestAccount.email, postTestAccount.password);
    });

    context('for posts', () => {
        context('with valid inputs', () => {
            it('project can make a post with valid inputs and see it after', () => {
                switchToFirstProject(() => {
                    cy.contains('Feed').click({ force: true });
                    cy.contains('Projects').click({ force: true });
                    cy.contains("Posts").click({ force: true });

                    cy.findByRole('button', {
                        name: /add announcement/i
                    }).click({ force: true});

                    cy.contains('Add post');

                    const description = 'description'
                    cy.findByRole('textbox', {
                        name: /description/i
                      }).type(description);

                    cy.findByRole('button', {
                    name: /add post/i
                    }).click({ force: true }).then(() => {
                        cy.contains('Projects').click({ force: true });
                        cy.contains("Posts").click({ force: true });
                        cy.contains('Announcements by')

                        getByTestId(description).within(() => {
                            getByTestId('post-type').contains('Post');
                            cy.contains(description);

                            // reactions are visible
                            getByTestId('reaction1').contains('0');
                            getByTestId('reaction2').contains('0');
                            getByTestId('reaction3').contains('0');

                            cy.get('[id^=delete-post]').click({ force: true });
                        });
                    })
                    
                    
                    
                })
            })
        });
    });

    afterEach(() => {
        // to make sure local storage etc gets cleared
        signOut();
    });
});