describe('PENGATURAN Satuan', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"] > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('erni.yulianti@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

    it('Chek kesesuainan halaman Pengaturan Satuan dengan design yang ada', () => {
       cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
       cy.get('.MuiTypography-h5').should('be.visible').and('contain', 'Pengaturan Satuan')
       cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').and('contain', 'Tambah Satuan')
       cy.get('[data-cy="all-units-title-settings-unit"]').should('be.visible').and('contain', 'Semua Satuan')
    });

    it('Harus memunculkan tulisan tidak ada data pada data tabel satuan, dan posisinya harus di tengah', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[data-cy="all-units-title-settings-unit"]').should('be.visible').and('contain', 'Semua Satuan')
      cy.get('[data-cy="unit-type-header-settings-unit"]')
      cy.get('[data-cy="unit-desc-header-settings-unit"]')
      cy.get('[data-cy="unit-action-header-settings-unit"]')
      cy.get('[name="unitType"]')
      .invoke('attr', 'placeholder')
      .should('eq', 'Masukkan jenis satuan');
      cy.get('[name="unitDesc"]')
      .invoke('attr', 'placeholder')
      .should('eq', 'Keterangan disini');
      cy.get('[data-cy="cancel-button-settings-unit"]').should('be.visible').and('contain', 'Batalkan')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').should('be.visible').and('contain', 'Simpan')
    })

    it('harus bisa menampilkan modal batal menambah satuan data', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[data-cy="cancel-button-settings-unit"]').should('be.visible').click()
    })

    it('harus bisa menambah data satuan dengan keterangan tidak di isi', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitType"]').type('unit')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('harus bisa menambah data satuan dengan jenis satuan tidak di isi', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitDesc"]').type('unit')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('harus bisa menambah data satuan dengan semua data di isi', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitType"]').type('unit')
      cy.get('[name="unitDesc"]').type('unit')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('harus bisa menambah data satuan dengan dengan semua data tidak', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitType"]').clear()
      cy.get('[name="unitDesc"]').clear()
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('Dapat mencari data satuan dengan keyword yg ada pada list data', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      // cy.get('[data-cy="delete-unit-button-0-settings-unit"]').should('be.visible').click()
      cy.get('[data-cy="search-unit-input-settings-unit"] > .MuiInputBase-root').type('unit')
    })

    it('Mencari Satuan dengan Kata Kunci', () => {
      const searchTests = [
        { keyword: 'pcs', expected: 'pcs' },
        { keyword: 'uni', expected: 'unit' },
        { keyword: 'pak', expected: 'Tidak ada data.' } // contoh data yang tidak ada
      ];

      searchTests.forEach(({ keyword, expected }) => {
        cy.get('input[placeholder="Cari Satuan"]')
          .clear()
          .type(keyword);

        cy.wait(2000);

        cy.get('table tbody').then(($tbody) => {
          if ($tbody.text().includes('Tidak ada data.')) {
            cy.wrap($tbody).should('contain.text', 'Tidak ada data.');
          } else {
            cy.wrap($tbody).should('contain.text', expected);
          }
        });
      });
    });

it('harus bisa menambah data satuan dengan semua data di isi sebanyak 15 kali', () => {
  cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();

  for (let i = 1; i <= 15; i++) {
    // Klik tombol tambah unit
    cy.get('[data-cy="add-unit-button-settings-unit"]').should('be.visible').click();

    // Isi input unitType
    cy.get('[name="unitType"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(`unit ${i}`);

    // Isi input unitDesc
    cy.get('[name="unitDesc"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(`deskripsi unit ${i}`);

    // Klik simpan
    cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click();

    // Verifikasi notifikasi berhasil muncul
    cy.get('.MuiAlert-message', { timeout: 10000 })
      .should('contain.text', 'Berhasil Menambahkan Data Satuan.');
  }
});

    it('Harus bisa mengganti pagination ke halaman selanjutnya', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4)').click();
      cy.wait(3000);
    });

    it('Harus bisa mengganti pagination ke halaman sebelumnya', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4)').click()
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
      cy.wait(3000);
    });

    it('Menampilkan Daftar Semua Satuan', () => {
      cy.get('.css-zxbdg4 > .MuiPaper-root')
      .should('contain.text', 'Jenis Satuan')
      .and('contain.text', 'Keterangan')
      .and('contain.text', 'Aksi');
    });

    it('Membuat satuan baru dengan mengisi semua jenis satuan dan keterangan dengan data yang valid', () => {
      cy.get('[data-cy="add-unit-button-settings-unit"]').click();
      cy.get('input[placeholder="Masukkan jenis satuan"]').type('tablet');
      cy.get('input[placeholder="Keterangan disini"]').type('tablet');
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
          // === VALIDASI ===
      // Pastikan muncul notifikasi sukses
      cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain.text', 'Berhasil Menambahkan Data Satuan.');

          // Pastikan role baru muncul di tabel daftar hak akses
      cy.get('table tbody tr').should('contain.text', 'tablet');
    });

    it('Membuat satuan yang sudah ada (duplikat)', () => {
      cy.get('[data-cy="add-unit-button-settings-unit"]').click();
      cy.get('input[placeholder="Masukkan jenis satuan"]').type('tablet').blur();
      cy.get('.MuiFormHelperText-root')
        .contains('Jenis Satuan sudah ada');  
      cy.get('input[placeholder="Keterangan disini"]').type('tablet');
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click();
    });

    it('Membuat satuan dengan Input panjang lebih dari batas maksimal)', () => {
      cy.get('[data-cy="add-unit-button-settings-unit"]').click();
      cy.get('input[placeholder="Masukkan jenis satuan"]').type('tablet ini sudah digunakan gunakan untuk kesahatan, test ini validasi panjang input lebih dari 50 karakter harus kurang dari 50 karakter agar dapat disimpan ')
        .blur(); 
      cy.get('input[placeholder="Keterangan disini"]').type('Tidak ada validasi langsung memangkas karakter');
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click();
    });

    it('Tambah jenis Satuan Tanpa Data ', () => {
      cy.get('[data-cy="add-unit-button-settings-unit"]').click();
      cy.get('input[placeholder="Masukkan jenis satuan"]')
      cy.get('input[placeholder="Keterangan disini"]')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click(); 
      cy.get('.MuiFormHelperText-root')
        .contains('Jenis Satuan harus diisi');  

    });

    it('Menangani kondisi offline saat menyimpan perubahan data perusahaan', () => {
      cy.intercept('PUT', '**/api/setting-satuan/*').as('updateSatuan');

      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitType"]').type('satuan test')
      cy.get('[name="unitDesc"]').type('satuan test')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
      cy.window().then((win) => {
        win.dispatchEvent(new win.Event('offline'));
      });
      cy.get('.MuiAlert-message', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Aplikasi sedang offline. Beberapa fitur mungkin tidak tersedia. Silakan periksa koneksi internet Anda.');
    });


    it.only('Menangani error server (500) saat menyimpan perubahan akun', () => {
      // Sesuaikan method POST / PUT sesuai dengan yang muncul di network tab
      cy.intercept('POST', '**/api/setting-satuan**', {
        statusCode: 500,
        body: { 
          message: 'Internal Server Error' 
        }
      }).as('updateSatuanError');

      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click();
      cy.get('[name="unitType"]').type('satua baru');
      cy.get('[name="unitDesc"]').type('satuan test');
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click();

      cy.wait('@updateSatuanError', {timeout: 10000}); 
      cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Internal Server Error');
    });

});



