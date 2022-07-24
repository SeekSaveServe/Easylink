import { postTestAccount, postTestProject } from "../fixtures/posts";
import { alertContains, getByTestId, signIn, signOut, switchToFirstProject } from "./utils/utils";

// Testing for posts / polls
    // Assume test account has at least one project
describe('making posts or polls', () => {
    beforeEach(() => {
        signIn(postTestAccount.email, postTestAccount.password);
    });

    context('with valid inputs', () => {
            it('project can make a post and see it after', () => {
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
            });

            it('project can make a poll and see it after', () => {
                switchToFirstProject(() => {
                    cy.contains('Feed').click({ force: true });
                    cy.contains('Projects').click({ force: true });
                    cy.contains("Posts").click({ force: true });

                    cy.findByRole('button', {
                        name: /add announcement/i
                    }).click({ force: true});

                    cy.contains('Add post');

                    cy.findByRole('button', {
                        name: /type/i
                    }).click({ force: true });

                    cy.findByRole('option', {
                        name: /poll/i
                    }).click({ force: true });

                    cy.contains('Add poll');

                    const description = 'poll'
                    cy.findByRole('textbox', {
                        name: /description/i
                    }).type(description);
                    
                    const pollOption = 'Option 1';
                    cy.findByRole('textbox', {
                        name: /add option/i
                    }).type(pollOption);

                    getByTestId('AddCircleOutlinedIcon').click({ force: true });

                    cy.findByRole('button', {
                        name: /add poll/i
                    }).click({ force: true }).then(() => {
                        cy.contains('Announcements by');
                        getByTestId(description).within(() => {
                            cy.contains(postTestProject.username);
                            getByTestId('post-type').contains('Poll');
                            cy.contains(description);
                            cy.contains(pollOption);
                            cy.get('[id^=delete-post]').click({ force: true });
                        }); 
                    })
                })
            });
        }
    );

    context('with invalid inputs', () => {
        it('shows error when making post with empty description', () => {
            switchToFirstProject(() => {
                cy.contains('Feed').click({ force: true });
                cy.contains('Projects').click({ force: true });
                cy.contains("Posts").click({ force: true });

                cy.findByRole('button', {
                    name: /add announcement/i
                }).click({ force: true});

                cy.contains('Add post');

                cy.findByRole('button', {
                name: /add post/i
                }).click({ force: true }).then(() => {
                    alertContains('Please enter a description');
                })
            })
        });

        it('shows error when making a poll with empty description', () => {
            switchToFirstProject(() => {
                cy.contains('Feed').click({ force: true });
                cy.contains('Projects').click({ force: true });
                cy.contains("Posts").click({ force: true });

                cy.findByRole('button', {
                    name: /add announcement/i
                }).click({ force: true});

                cy.contains('Add post');

                cy.findByRole('button', {
                    name: /type/i
                }).click({ force: true });

                cy.findByRole('option', {
                    name: /poll/i
                }).click({ force: true });

                cy.contains('Add poll');

                cy.findByRole('button', {
                name: /add poll/i
                }).click({ force: true }).then(() => {
                    alertContains('Please enter a description');
                })
            })
        });

        it('shows error when making a poll with no poll options', () => {
            switchToFirstProject(() => {
                cy.contains('Feed').click({ force: true });
                cy.contains('Projects').click({ force: true });
                cy.contains("Posts").click({ force: true });

                cy.findByRole('button', {
                    name: /add announcement/i
                }).click({ force: true});

                cy.contains('Add post');

                cy.findByRole('button', {
                    name: /type/i
                }).click({ force: true });

                cy.findByRole('option', {
                    name: /poll/i
                }).click({ force: true });

                cy.contains('Add poll');

                const description = 'poll'
                cy.findByRole('textbox', {
                    name: /description/i
                }).type(description);
       

                cy.findByRole('button', {
                    name: /add poll/i
                }).click({ force: true }).then(() => {
                    alertContains('Please enter at least one poll option');
                })
            })

        });
    });

    afterEach(() => {
        // to make sure local storage etc gets cleared
        signOut();
    });
})