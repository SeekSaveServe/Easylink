import { clickDropdownOption, getByTestId, signIn, signOut } from "./utils/utils";
import { user, addProject } from '../fixtures/projects';

// Test for basic project management features (excluding posts/polls)
describe('add and delete project', () => {
    console.log("user", user);
    beforeEach(() => {
        signIn(user.email, user.password);
    });

    it('user can add a project, switch to it and delete it', () => {
        cy.contains('Projects').click();
        getByTestId("add-project").click();

        getByTestId('Username').type(addProject.username);
        getByTestId('Title').type(addProject.title);
        getByTestId('Bio').type(addProject.bio);
        cy.get(`input[data-testid^=Telegram]`).type(addProject.telegram);
        cy.get(`input[data-testid^=Email]`).type(addProject.email);

        cy.get('[id^=skills]').click({ force: true });
        addProject.user_skills.forEach(skill => clickDropdownOption(skill));

        cy.get('[id^=interests]').click({ force: true });
        addProject.user_interests.forEach(interest => clickDropdownOption(interest));

        cy.get('[id^=communities]').click({ force: true });
        addProject.user_communities.forEach(comm => clickDropdownOption(comm));

        getByTestId('start-linking').click({ force: true });

        
    });
    
    afterEach(() => signOut());
});