describe('Signin page', () => {
beforeEach(() => {
  cy.session("user", () => {
    // pass assertSignIn:false so it won't fail when restoring session
    cy.login('cater@gmail.com', 'jovia', { checkSignIn: false })
  })
  cy.visit('http://localhost:5174/view')
})


it('should display correct elements in the dashboard', () => {
  cy.get('[data-testid="filter"]').should("exist");
  cy.get('[data-testid="questions"] > *').should("have.length.above", 4)
});

it("checks it spinner work while fetching question", () => {
  cy.contains("Loading...")
})
  
it("should check that input filter works correctly", () => {
  cy.contains("Loading...")
  cy.get('[data-testid="filter"]', {timeout : 20000}).within(() => {
    cy.get("input").should("exist").type("cos")
    cy.get("select").should("exist").select("100")
  });
  cy.get('[data-testid="questions"] > *').should("have.length.above", 4)
})

});

describe("checks for responsivness", () => {
 before(() => {
  cy.visit('http://localhost:5174/')
 })

 it("should render hamburger on small screen", () => {
  cy.viewport('iphone-xr')
  cy.get('[data-testid="hamburger"]', {timeout: 10000}).should("exist")
  cy.get('[data-testid="hamburger"]').click()
  cy.get('Div [data-testid="MobileMenuChildren"] > *').should('have.length', 3)
  cy.get('[data-testid="hamburgerClose"]').click()
 })

})
