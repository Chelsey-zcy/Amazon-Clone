describe('Auth (e2e)', () => {
  it('should load and redirect to /signin', () => {
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000/');

    // eslint-disable-next-line no-undef
    cy.url().should('include', 'signin');
  });

  it('should have default initial state', () => {
    const initialAppState = {
      auth: {
        user: null,
        jwt: null,
        isAuthenticated: false,
        isLoading: false,
        isSuccess: false,
        isError: false,
      },
    };

    cy.window()
      .its('store')
      .invoke('getState')
      .should('deep.equal', initialAppState);
  });

  const randomInt = Math.floor(Math.random() * 100000);
  const name = `user-${randomInt}`;
  const email = `user-${randomInt}@hotmail.com`;
  const password = 'password';

  it('should navigate to sign-in upon registering', () => {
    cy.get('#register-link').click();

    cy.get('#name').click().type(name);
    cy.get('#email').click().type(email);
    cy.get('#password').click().type(password);
    cy.get('#confirmPassword').click().type(password);

    cy.get('#register-button').click();
    cy.wait(500);

    cy.url().should('include', 'signin');
  });

  it('Sign-in button should be disabled', () => {
    cy.contains('#signin-button', 'Sign-In').should('have.attr', 'disabled');
  });

  it('Correct details should enable sign-in button', () => {
    cy.get('#email').click().type(email);
    cy.get('#password').click().type(password);
    cy.contains('#signin-button', 'Sign-In').should(
      'not.have.attr',
      'disabled'
    );
  });

  it('should navigate to home page', () => {
    cy.contains('#signin-button', 'Sign-In').click();

    cy.wait(500);

    cy.url().should('not.include', 'signin');
    cy.url().should('include', '/');
  });
});
