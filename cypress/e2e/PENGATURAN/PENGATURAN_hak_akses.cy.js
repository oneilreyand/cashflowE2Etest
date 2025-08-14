describe('[PENGATURAN-PENGGUNA] - Membuka halaman Pengaturan Pengguna dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"] > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[data-cy="submenu-item-permission-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click();
        
      };
  
    beforeEach(() => {
      cy.apiLogin('erni.yulianti@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });
    it('Memastikan halaman Pengaturan Pengguna terbuka dan sesuai dengan design', () => {
        cy.url().should('include', '/admin/settings');
        cy.get('.css-coltta').should('be.visible').and('contain.text', 'Pengaturan Hak Akses');
        cy.get('.css-coltta').should('contain.text', 'Daftar Hak Akses');
    });
      it('Menambah Hak Akses Baru', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('input[name="name"]').type('Manager Umum');
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Manager Umum Perusahaan');

        // Buka accordion Laporan
        cy.contains('.MuiAccordionSummary-content', 'Laporan').click();

        // Centang semua checkbox di bagian Laporan
        cy.contains('.MuiAccordionDetails-root', 'Membuat laporan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        cy.contains('.MuiAccordionDetails-root', 'Melihat list laporan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Laporan
        cy.contains('.MuiAccordionSummary-content', 'Laporan').click();
        // Centang semua checkbox di bagian Laporan
        cy.contains('.MuiAccordionDetails-root', 'Membuat laporan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Kas & Bank
        cy.contains('.MuiAccordionSummary-content', 'Kas & bank').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat kas & bank')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Penjualan
        cy.contains('.MuiAccordionSummary-content', 'Penjualan').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat penjualan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Pembelian
        cy.contains('.MuiAccordionSummary-content', 'Pembelian').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat pembelian')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Penjualan
        cy.contains('.MuiAccordionSummary-content', 'Biaya').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat biaya')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Kontak
        cy.contains('.MuiAccordionSummary-content', 'Kontak').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat kontak')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Produk
        cy.contains('.MuiAccordionSummary-content', 'Produk').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat produk')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Aset
        cy.contains('.MuiAccordionSummary-content', 'Aset').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat aset')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Daftar Akun
        cy.contains('.MuiAccordionSummary-content', 'Daftar akun').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Membuat daftar akun')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Pengaturan
        cy.contains('.MuiAccordionSummary-content', 'Pengaturan').click();
        // Centang semua checkbox di bagian kas dan bank
        cy.contains('.MuiAccordionDetails-root', 'Menambahkan pengaturan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').click();

      });

  it('Menambah Hak Akses dengan nama yang sudah ada', () => {
    // Ambil nama hak akses pertama yang sudah ada di tabel (kolom pertama)
    cy.get('table tbody tr td:nth-child(1)')
      .first()
      .invoke('text')
      .then((existingName) => {
        const namaHakAkses = existingName.trim();
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('input[name="name"]').clear().type('Manager Umum'); // Ganti dengan nama yang sudah ad
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Deskripsi test duplicate');

        // Buka accordion "Laporan"
        cy.contains('.MuiAccordionSummary-content', 'Laporan').click();

        // Centang checkbox pertama di bagian Laporan
        cy.contains('.MuiAccordionDetails-root', 'Membuat laporan')
          .find('input[type="checkbox"]')
          .check({ force: true });
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary')
          .should('be.disabled');       
      });

  });

    it('Menambah Hak Akses baru dengan memilih opsi dari salin dari', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('[data-value="6186af42-4a6e-11f0-97e5-496865600ce7"]').click();
        cy.get('input[name="name"]').clear().type('   Sales'); //sekalian validasi spasi
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Sales Jaga');
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').click();

    });
        it('"Validasi nama hak akses kosong', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('[data-value="6186af42-4a6e-11f0-97e5-496865600ce7"]').click();
        cy.get('input[name="name"]').clear().blur();
        cy.get('.MuiFormHelperText-root').should('be.visible').contains('Nama hak akses wajib diisi'); 
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Sales Jaga');
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').should('be.disabled');  
    });

    
});
