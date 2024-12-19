describe('[PENGATURAN-EKSPEDISI] - Membuka halaman Pengaturan Billing dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      
      };
  
    beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });
  
    it('[PENGATURAN-EKSPEDISI] - Chek kesesuainan halaman Pengaturan Billing dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    });

    it('[PENGATURAN-EKSPEDISI] - Harus gagal mendapatkan data, kondisi error harus muncul', () => {
     // Intercept the API request
     cy.intercept(
      'GET',
      'https://api-cashflow.assist.id/api/setting-expedition?search=&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
      {
        statusCode: 500,
        body: {
          message: 'Internal Server Error',
        },
      }
    ).as('getEkspedisiEroor');
    // Aksi yang memicu request
    cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    // Tunggu sampai request dipanggil
    cy.wait('@getEkspedisiEroor');
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Internal Server Error')
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Error, Gagal mendapatkan data!')
    });

    it('[PENGATURAN-EKSPEDISI] - Harus gagal mendapatkan data, kondisi tidak ada data', () => {
      // Intercept the API request
      cy.intercept(
       'GET',
       'https://api-cashflow.assist.id/api/setting-expedition?search=&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
      //  {
      //    statusCode: 500,
      //    body: {
      //      message: 'Internal Server Error',
      //    },
      //  }
     ).as('getEkspedisi');
     // Aksi yang memicu request
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
     // Tunggu sampai request dipanggil
     cy.wait('@getEkspedisi');
     cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
    });

    it('[PENGATURAN-EKSPEDISI] - Harus bisa membuka, section tambah ekspedisi', () => {
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
     cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()

    })

    it('[PENGATURAN-EKSPEDISI] - Harus bisa menutup, section tambah ekspedisi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('.MuiButton-text').should('be.visible').click()
     })

     it('[PENGATURAN-EKSPEDISI] - Harus gagal menambahkan data ekspekssisi, semua field tidak di isi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Nama dan Keterangan Ekspedisi harus diisi.')
     })

     it('[PENGATURAN-EKSPEDISI] - Harus gagal menambahkan data ekspekssisi, semua field tidak di isi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_name"').should('be.visible').type('JNT')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Nama dan Keterangan Ekspedisi harus diisi.')
     })

     it('[PENGATURAN-EKSPEDISI] - Harus gagal menambahkan data ekspekssisi, semua field tidak di isi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_desc"').should('be.visible').type('rekanan lama')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Nama dan Keterangan Ekspedisi harus diisi.')
     })

     it('[PENGATURAN-EKSPEDISI] - Harus berhasil menambahkan data ekspekssisi, semua field di isi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_name"').should('be.visible').type('rekanan lama')
      cy.get('[name="expedition_desc"').should('be.visible').type('rekanan lama')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
     })

     it('[PENGATURAN-EKSPEDISI] - Harus berhasil merubah status ekspekssisi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.PrivateSwitchBase-input').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Ekspedisi.')
     })

     it('[PENGATURAN-EKSPEDISI] - Harus berhasli menghapus data ekspekssisi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiTableRow-root > :nth-child(4) > .MuiButtonBase-root').should('be.visible').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Menghapus Data Expedisi.')
     })

     it('[PENGATURAN-EKSPEDISI] - Harus berhasil menambahkan data ekspekssisi, semua field di isi sebanyak 15 kali', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      for(let i = 0; i < 15; i++) {
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
        cy.get('[name="expedition_name"').should('be.visible').type('rekanan lama')
        cy.get('[name="expedition_desc"').should('be.visible').type('rekanan lama')
        cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      }
     })

     it('[PENGATURAN-EKSPEDISI] - Harus bisa menampilkan data ekspedisi, ketika menekan tombol next', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
     })

     it('[PENGATURAN-EKSPEDISI] - Harus bisa menampilkan data ekspedisi, ketika menekan tombol next', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
      cy.get('.MuiPagination-ul > :nth-child(1)').click()
     })
});
