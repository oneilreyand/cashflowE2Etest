describe('[PENGATURAN-PERUSAHAAN] - Membuka halaman Pengaturan Perusahaan dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });
  
    it('Chek kesesuainan halaman Pengaturan Perusahaan dengan design yang ada', () => {
        cy.get('[data-cy="submenu-item-company-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
        cy.get('[data-cy="company-name-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Nama Perusahaan');
        cy.get('[data-cy="office-phone-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'No Telp Kantor');
        cy.get('[data-cy="office-email-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Email Kantor');
        cy.get('[data-cy="office-address-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Alamat Kantor');
        cy.get('[data-cy="industry-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Industri');
        cy.get('[data-cy="company-size-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Ukuran Perusahaan');
        cy.get('[data-cy="company-logo-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Logo Perusahaan');
        cy.get('[data-cy="billing-address-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Alamat Penagihan');
        cy.get('[data-cy="shipping-address-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Alamat Pengiriman');
        cy.get('[data-cy="npwp-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'NPWP');
    });
});

describe('', () => {
    
})