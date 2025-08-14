describe('[PENGATURAN-REFERENSI]', () => {
  const navigatePengaturan = () => {
    cy.get('[data-testid="drawer-item-settings"]').click();
  };

  beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(Cypress.env('companyId')) // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  //UI

  it.only('Cek kesesuainan halaman Pengaturan Referensi dengan design yang ada', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Header
    cy.get('.MuiTypography-root').should('be.visible').and('contain', 'Pengaturan Referensi')
    cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
    //Search
    cy.get('input[placeholder="Cari Referensi"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Cari Referensi');
    //Tambah Termin Button
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Referensi');
    //Tabel
    cy.contains('Semua Referensi').should('be.visible');
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama');
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Referensi');
    //Pegination
    cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root').should('be.visible')
    .invoke('text')
    .should('match', /Menampilkan\s+\d+\s*-\s*\d+\s+dari\s+\d+\s+data/)
    cy.get('.MuiPagination-ul').should('be.visible')
  });
});