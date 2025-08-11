describe('[PENGATURAN-BILLING] - Membuka halaman Pengaturan Billing dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });
  
    it('Chek kesesuainan halaman Pengaturan Billing dengan design yang ada', () => {
        cy.get('[data-cy="submenu-item-billing-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    });
});