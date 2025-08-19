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

    it('Menghapus Hak akses user', () => {  
        cy.get('table tbody tr').contains('td', 'Sales jaga')
          .parents('tr')
          .find('[aria-label="Hapus Hak Akses"]')
          .click();
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.get('.MuiAlert-message').should('be.visible').contains('Berhasil menghapus role');
    });

    it('Menambah Hak Akses Baru', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('input[name="name"]').type('Sales jaga'); // Ganti dengan nama hak akses yang diinginkan
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Sales jaga');

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
        cy.contains('.MuiAccordionDetails-root', 'Membuat laporan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Kas & Bank
        cy.contains('.MuiAccordionSummary-content', 'Kas & bank').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat kas & bank')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Penjualan
        cy.contains('.MuiAccordionSummary-content', 'Penjualan').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat penjualan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Pembelian
        cy.contains('.MuiAccordionSummary-content', 'Pembelian').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat pembelian')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Penjualan
        cy.contains('.MuiAccordionSummary-content', 'Biaya').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat biaya')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Kontak
        cy.contains('.MuiAccordionSummary-content', 'Kontak').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat kontak')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Produk
        cy.contains('.MuiAccordionSummary-content', 'Produk').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat produk')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Aset
        cy.contains('.MuiAccordionSummary-content', 'Aset').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat aset')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Daftar Akun
        cy.contains('.MuiAccordionSummary-content', 'Daftar akun').click();
        cy.contains('.MuiAccordionDetails-root', 'Membuat daftar akun')
          .find('input[type="checkbox"]')
          .check({ force: true });

        // Buka accordion Pengaturan
        cy.contains('.MuiAccordionSummary-content', 'Pengaturan').click();
        cy.contains('.MuiAccordionDetails-root', 'Menambahkan pengaturan')
          .find('input[type="checkbox"]')
          .check({ force: true });

        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').click();

      // === VALIDASI ===
      // Pastikan muncul notifikasi sukses
        cy.get('.MuiAlert-message')
          .should('be.visible')
          .and('contain.text', 'Berhasil menambah hak akses');

        // Pastikan role baru muncul di tabel daftar hak akses
        cy.get('table tbody tr').should('contain.text', 'Sales jaga');
      });

    it('Menambah Hak Akses dengan nama yang sudah ada', () => {
    // Ambil nama hak akses pertama yang sudah ada di tabel (kolom pertama)
    cy.get('table tbody tr td:nth-child(1)')
      .first()
      .invoke('text')
      .then((existingName) => {
        const namaHakAkses = existingName.trim();
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('input[name="name"]').clear().type('Manager Umum').blur(); // Ganti dengan nama yang sudah ada
        cy.get('.MuiFormHelperText-root')
          .contains('Nama hak akses sudah digunakan');      
      });

  });

    it('Menambah Hak Akses baru dengan memilih opsi dari salin dari', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('[data-value="88933452-1f62-11f0-8e2c-fbc5d1e74f72"]').click();
        cy.get('input[name="name"]').clear().type('   Sales gue'); 
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Sales gue');
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').click();
        cy.get('.MuiAlert-message').should('be.visible');
        cy.get('table tbody tr').contains('td', 'Sales gue').should('be.visible')
          .parents('tr')
          .find('[aria-label="Hapus Hak Akses"]')
          .click();
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.get('.MuiAlert-message').should('be.visible');
       
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

    it('Validasi karakter khusus pada field Nama Hak Akses', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('[data-value="6186af42-4a6e-11f0-97e5-496865600ce7"]').click();
        cy.get('input[name="name"]').clear().type('@#$%^&*()_+').blur();
        cy.get('.MuiFormHelperText-root')
          .should('be.visible')
          .contains('Nama hak akses tidak boleh mengandung karakter khusus (@, #, %, dll, kecuali tanda kurung)');
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Sales Jaga');
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').should('be.disabled');

    });

    it('Menambah role dengan nama sangat panjang', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('[data-value="6186af42-4a6e-11f0-97e5-496865600ce7"]').click();
        cy.get('input[name="name"]').clear().type('Manager Umum yang sangat panjang dan tidak sesuai dengan batasan maksimal karakter yang diizinkan oleh sistem').blur();
        cy.get('.MuiFormHelperText-root')
          .should('be.visible')
          .contains('Nama hak akses maksimal 50 karakter');
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Deskripsi test nama panjang');
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').should('be.disabled');
    });

    it('Membatalkan penambahan hak akses baru', () => {
        cy.get('[data-testid="add-permission-button"]').should('be.visible').click();
        cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('[data-value="6186af42-4a6e-11f0-97e5-496865600ce7"]').click();
        cy.get('input[name="name"]').clear().type('BNN');
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Deskripsi test batalkan');
        cy.get('.MuiButton-containedInherit').click(); // Tombol Batalkan
        cy.get('.css-coltta').should('be.visible').and('contain.text', 'Pengaturan Hak Akses');
    });

    it('Mencari hak akses yang terdaftar dengan kata kunci sesuai keinginan user', () => {
      const searchTests = [
        { keyword: 'Manager umum', expected: 'Manager umum' },
        { keyword: 'Sal', expected: 'Sales' },
        { keyword: 'Admin', expected: null } // data tidak ada
      ];

      searchTests.forEach(({ keyword, expected }) => {
        cy.get('input[placeholder="Cari hak akses..."]')
          .clear()
          .type(keyword);

        cy.get('table tbody').then(($tbody) => {
          const text = $tbody.text();
          if (text.includes('Tidak ada data.')) {
            cy.get('table tbody').should('contain.text', 'Tidak ada data.');
          } else if (expected) {
            cy.get('table tbody').should('contain.text', expected);
          }
        });
      });
    });

    it('Mengubah data pada hak akses yang sudah ada', () => {
        cy.get('table tbody tr').contains('td', 'Sales jaga')
          .parents('tr')
          .find('[aria-label="Edit Hak Akses"]')
          .click();
        cy.get('input[name="name"]').clear().type('Sales jaga baru');
        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').clear().type('Deskripsi test ubah');
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').click();
        cy.get('.MuiAlert-message').should('be.visible').contains('Berhasil mengubah hak akses');
    });

    it('Mengubah data pada hak akses dengan nama yang sudah ada', () => {
        cy.get('table tbody tr').contains('td', 'Sales jaga baru')
          .parents('tr')
          .find('[aria-label="Edit Hak Akses"]')
          .click();
        cy.get('input[name="name"]').clear().type('Manager umum').blur();
        cy.get('.MuiFormHelperText-root')
          .should('be.visible')
          .contains('Nama hak akses sudah digunakan');
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary')
          .should('be.disabled'); // Tombol Simpan harus dinonaktifkan
    });

    it('Membatalkan perubahan pada hak akses yang sudah ada', () => {
        cy.get('table tbody tr').contains('td', 'Sales jaga baru')
          .parents('tr')
          .find('[aria-label="Edit Hak Akses"]')
          .click();
        cy.get('input[name="name"]').clear().type('BNN');
        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').clear().type('Deskripsi test batalkan perubahan');
        cy.get('.MuiButton-containedInherit').click(); // Tombol Batalkan
        cy.get('.css-coltta').should('be.visible').and('contain.text', 'Pengaturan Hak Akses');
    }
  );  


    it('Melihat informasi detail hak akses', () => {
      cy.get('table tbody tr')
        .contains('td', 'Sales jaga baru')
        .parents('tr')
        .find('[aria-label="Detail Hak Akses"]')
        .click();
      cy.get('#modal-title')
        .should('be.visible')
        .and('contain.text', 'Detail Hak Akses')
        .scrollIntoView();

      cy.get('.css-hku41o > .MuiButtonBase-root').click();
    });

    it('Menghapus salah satu hak akses ketika hak akses tersebut digunakan pada salah satu role pengguna', () => {
      cy.get('table tbody tr')
        .contains('td', 'Manager umum')
        .parents('tr')
        .find('[aria-label="Hapus Hak Akses"]')
        .click();
      cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
      cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain.text', 'Role tidak dapat dihapus karena masih digunakan oleh akun lain');
    });

    it.only('Loop semua nama role dengan index', () => {
      cy.get('.MuiTableBody-root > tr').then(($rows) => {
        const rowCount = $rows.length;
        cy.log(`Total data ditemukan: ${rowCount}`);

        for (let i = 1; i <= rowCount; i++) {
          cy.get(`.MuiTableBody-root > :nth-child(${i}) > :nth-child(1)`)
            .invoke('text')
            .then((text) => {
              cy.log(`Row ${i} - Nama Role: ${text}`);
              console.log(`Row ${i} - Nama Role: ${text}`);
            });
        }
      });
    });

  
    it('Menangani error server (500) saat menyimpan perubahan data perusahaan', () => {
        // Mock API dengan status 500
        cy.intercept('PUT', '**/api/setting-roles/*', {
            statusCode: 500,
            body: {
                message: 'Terjadi kesalahan pada server'
            }
        }).as('updateSettingRolesError');
        cy.get('[data-cy="submenu-item-permission-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click();
        cy.get('[data-testid="add-permission-button"]').click();
        cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('[data-value="88933452-1f62-11f0-8e2c-fbc5d1e74f72"]').click();
        cy.get('input[name="name"]').clear().type('Head of Sales'); 
        cy.get('.MuiGrid2-container > :nth-child(3)').type('Head of Sales');

        // Simulasi network offline sebelum klik simpan
        cy.window().then((win) => {
            win.dispatchEvent(new win.Event('offline'));
        });
        cy.get('.MuiPaper-elevation0 > .MuiStack-root > .MuiButton-containedPrimary').click();
        cy.get('.MuiAlert-message', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Tidak dapat menyimpan data, silakan periksa koneksi internet Anda.');
        });
      });
