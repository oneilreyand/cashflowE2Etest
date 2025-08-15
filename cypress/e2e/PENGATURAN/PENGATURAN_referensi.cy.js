describe('[PENGATURAN-REFERENSI]', () => {
  const navigatePengaturan = () => {
    cy.get('[data-testid="drawer-item-settings"]').click();
  };

  beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(Cypress.env('companyId')) // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  //Kesesuaian UI
  it('Cek kesesuainan halaman Pengaturan Referensi dengan design yang ada', () => {
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

  //Navigation to Beranda
  it('Breadcrumbs dapat berfungsi dengan baik -> membawa halaman pengaturan ke beranda', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').and('contain', 'Beranda')
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()
    cy.get('.MuiTypography-root > span').should('be.visible').and('contain', 'Dashboard')
    }) 
    
   //Empty State
  it('Membuka halaman Pengaturan Referensi dengan kondisi data referensi tidak ada - Harus ada pesan (Tidak ada data) di tabel', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
    });

  it(' Manipulasi data - Harus berhasil menampilkan tidak ada data, ketika data kosong', () => {
      // Intercept the API request
      cy.intercept('GET', '**api/setting-preferensis*', {
        statusCode: 200, // Simulate a successful response with no data
        body: {
          data: [],
          message: 'No Data',
        },
      }).as('getReferensiNoData');
    
      // Perform the action to trigger the request
      cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    
      // Wait for the intercepted request
      cy.wait('@getReferensiNoData', { timeout: 10000 });
    
      // Assert that the UI displays the correct error message
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible')
        .and('contain', 'Tidak ada data');
    });

  //Create New Data Success
  it('Cek kesesuaian form tambah referensi dengan design', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Referensi');
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Referensi');
    cy.get('.MuiButton-contained').should('be.visible').and('contain', 'Simpan')
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batal')
  })

  it('Berhasil GET data opsi nama referensi', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click()
    cy.get('ul[role="listbox"] > li').should('be.visible').and('contain', 'Metode Valuasi')
  })

  it('Berhasil GET data opsi referensi', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    cy.get('ul[role="listbox"] > li').should('contain','FIFO').and('contain', 'AVERAGE')
  })

  it.only('Berhasil membatalkan tambah referensi', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batal').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
  })
});