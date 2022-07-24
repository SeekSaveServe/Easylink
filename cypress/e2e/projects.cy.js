import { afterProjectsLoad, alertContains, clickDropdownOption, getByTestId, getProjectsStore, projectsStore, signIn, signOut } from "./utils/utils";
import { user, addProject, addSubProject } from '../fixtures/projects';

// assumes we are on add project form already
function addGivenProject(addProject) {
    getByTestId('Username').type(addProject.username, { force: true });
    getByTestId('Title').type(addProject.title, { force: true });
    getByTestId('Bio').type(addProject.bio, { force: true });
    cy.get(`input[data-testid^=Telegram]`).type(addProject.telegram, { force: true });
    cy.get(`input[data-testid^=Email]`).type(addProject.email, { force: true });

    cy.get('[id^=skills]').click({ force: true });
    addProject.user_skills.forEach(skill => clickDropdownOption(skill));

    cy.get('[id^=interests]').click({ force: true });
    addProject.user_interests.forEach(interest => clickDropdownOption(interest));

    cy.get('[id^=communities]').click({ force: true });
    addProject.user_communities.forEach(comm => clickDropdownOption(comm));

    getByTestId('start-linking').click({ force: true });

    cy.contains('Feed').click({ force: true });
    cy.contains('Projects').click({ force: true });
}

function getIdOfAddedProject(addedProject, callback) {

    getProjectsStore((projects) => {
        let idDelete = -1;
        for (const projectId of Object.keys(projects.entities)) {
            if (projects.entities[projectId].username === addProject.username) {
                idDelete = projectId;
                break;
            }
        }

        callback(idDelete);
    })
}

// Test for basic project management features (excluding posts/polls)
describe('add and delete project', () => {
    console.log("user", user);
    beforeEach(() => {
        signIn(user.email, user.password);
    });

    context('with valid inputs', () => {
        // switching is already tested for profile, no need to test again
        it('user can add a project and delete it', () => {
            cy.contains('Projects').click();
            getByTestId("add-project").click();

            addGivenProject(addProject);

            getProjectsStore((projects) => {
                expect(projects.rootIds).to.have.lengthOf.above(0);

                window.Cypress.PROJ_ARG = "delete";

                let idDelete = -1;
                console.log(Object.keys(projects.entities));
                for (const projectId of Object.keys(projects.entities)) {
                    if (projects.entities[projectId].username === addProject.username) {
                        idDelete = projectId;
                        break;
                    }
                }

                getByTestId(idDelete).click({ force: true });
                getByTestId('no-projects');
            });
        });

        it('user can add a project with subproject, and deleting the root project deletes both', () => {
            // Add root project
            cy.contains('Projects').click();
            getByTestId("add-project").click();

            addGivenProject(addProject);

            // Add sub project
            afterProjectsLoad(() => {
                window.Cypress.PROJ_ARG = "add";
                getIdOfAddedProject(addProject, (addedId) => {
                    getByTestId(addedId).click({ force: true });
                    addGivenProject(addSubProject);
                });
            });

            // sub project exists
            getIdOfAddedProject(addSubProject, (addedId) => {
                console.log("Sub proj exist");
                expect(addedId).to.not.equal(-1);
            })

            // delete root project
            getIdOfAddedProject(addProject, (addedId) => {
                window.Cypress.PROJ_ARG = "delete";
                getByTestId(addedId).click({ force: true })
            })

            getByTestId('no-projects');
            
        });  
    });

    // no username, end date < start date
    context('with invalid inputs', () => {
        it('shows error when no username', () => {
            cy.contains('Projects').click();
            getByTestId("add-project").click();
            getByTestId('start-linking').click({ force: true });
            alertContains("Please enter a username");
        });

        it('shows error when end date before start date', () => {
            cy.contains('Projects').click();
            getByTestId("add-project").click();

            getByTestId('Username').type('random');

            cy.findByRole('textbox', {
                name: /start date/i
            }).type('25/07/2022');

            cy.findByRole('textbox', {
                name: /end date/i
            }).type('23/07/2022');

            getByTestId('start-linking').click({ force: true });

            
            alertContains("End date should be same as or after start date");
        });
    });
    
    
    afterEach(() => signOut());
});