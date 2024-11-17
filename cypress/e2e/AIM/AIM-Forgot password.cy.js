describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.window().then((win) => {
      console.log("Coverage object:", win.__coverage__);
    });
  })
})