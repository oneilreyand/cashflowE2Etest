describe('Akuntansi Biaya', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click()
    }

    beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  //Kesesuaian UI
  it('Kesesuaian halaman biaya dengan design yang ada', () => {})
  it('Kesesuaian halaman detail biaya dengan design yang ada', () =>{})
  it('Kesesuaian halaman detail pembayaran dengan design yang ada', () =>{})
  it('Kesesuaian halaman penerimaan pembayaran dengan design yang ada', () =>{})
  it('Kesesuaian halaman biaya baru dengan design yang ada', () =>{})
})