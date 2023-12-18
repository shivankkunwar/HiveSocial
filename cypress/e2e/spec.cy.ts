// cypress/integration/SignInForm.spec.ts
describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
    beforeEach(() => {
        cy.visit('https://hive-social.vercel.app/'); // Visit the page containing the SignInForm
      });
      it('renders the SignInForm', () => {
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('button[name="login"]').should('exist');
      });
  })
