import { medcareVer } from "../../data";

describe('Membuka halaman Pengaturan Ekspedisi dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      
    };

    beforeEach(() => {
      cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(medcareVer); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
    });
    
    it('[PENGATURAN-EKSPEDISI] - Chek kesesuainan halaman Pengaturan Ekspedisi dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Header
      cy.get('.MuiTypography-h5').should('be.visible').and('contain', 'Pengaturan Ekspedisi')
    //Fitur Search
      cy.get('.css-egm0ks > .MuiStack-root > .MuiFormControl-root > .MuiInputBase-root').should('be.visible')//.and('contain', 'Cari Ekspedisi')
    //Fitur Tambah Ekspedisi
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Ekspedisi')
    //Tabel Ekspedisi
      cy.get('.css-1nqp4xj').should('be.visible').and('contain', 'Semua Ekspedisi')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Keterangan')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)')
      //.scrollIntoView()
      .should('be.visible')
      .and('contain', 'Status')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)')
      //.scrollIntoView()
      .should('be.visible')
      .and('contain', 'Aksi')
    //Pagination
      cy.get('.MuiPaper-root > div > .MuiTypography-root')
      .should('be.visible')
      .invoke('text')
      .should('match', /Menampilkan\s+\d+\s*-\s*\d+\s+dari\s+\d+\s+data/)
      cy.get('.MuiPagination-ul > :nth-child(1)').should('be.visible')
      cy.get('.MuiPagination-ul > :nth-child(3)').should('be.visible')
    });

    it('Breadcrumbs harus terlihat dan berfungsi dengan baik', () => {
      cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').and('contain', 'Beranda')
      cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()
     cy.get('.MuiTypography-root > span').should('be.visible').and('contain', 'Dashboard')
    }) 

    it('[PENGATURAN-EKSPEDISI] - Harus gagal mendapatkan data, kondisi error harus muncul', () => {
    // Intercept the API request
    cy.intercept('GET', '**/api/setting-expedition*', {
      statusCode: 500,
      body: {
        message: 'Internal Server Error',
      },
    }).as('getEkspedisiError');

    // Perform the UI action to trigger the request
    cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
    .should('be.visible')
    .click();

    // Wait for the intercepted request
    cy.wait('@getEkspedisiError', { timeout: 10000 });

    // Assert error messages in the UI
    cy.get('.MuiSnackbar-root > .MuiPaper-root')
    .should('be.visible')
    .and('contain', 'Kesalahan di server');

    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
    .should('be.visible')
    .and('contain', 'Error, Gagal mendapatkan data!');
    });

    it('[PENGATURAN-EKSPEDISI] - Harus nerhasil menampilkan tidak ada data, ketika data kosong', () => {
      // Intercept the API request
      cy.intercept('GET', '**/api/setting-expedition*', {
        statusCode: 200, // Simulate a successful response with no data
        body: {
          data: [],
          message: 'No Data',
        },
      }).as('getEkspedisi');
    
      // Perform the action to trigger the request
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .should('be.visible')
        .click();
    
      // Wait for the intercepted request
      cy.wait('@getEkspedisi', { timeout: 10000 });
    
      // Assert that the UI displays the correct error message
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible')
        .and('contain', 'Tidak ada data');
    });
    
    it('[PENGATURAN-EKSPEDISI] - Harus bisa membuka, section tambah ekspedisi', () => {
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
     cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()

    })

    it('cek kesesuaian section tambah ekspedisi dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()
      cy.get('input[placeholder="Masukkan nama ekspedisi"]').should('be.visible')
      cy.get('input[placeholder="Keterangan"]').should('be.visible')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('be.visible')
      cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batal')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan')
    })

    it('[PENGATURAN-EKSPEDISI] - Harus bisa menutup, section tambah ekspedisi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('.MuiButton-text').should('be.visible').click()
      cy.get('.css-1nqp4xj').should('be.visible').and('contain', 'Semua Ekspedisi')
     })

  const counterFile = 'cypress/fixtures/counter.json';

    it('[PENGATURAN-EKSPEDISI] - Tambah data ekspedisi', () => {
     cy.readFile(counterFile).then((data) => {
      const nextNumber = data.lastNumber + 1;
      const expeditionName = `JNT ${nextNumber}`;

      // Update file dengan angka baru
      cy.writeFile(counterFile, { lastNumber: nextNumber });

      // Jalankan langkah input form
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click();
      cy.get('[name="expedition_name"]').should('be.visible').type(expeditionName);
      cy.get('[name="expedition_desc"]').should('be.visible').type(`JNT Cabang ${nextNumber}`);
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click();
      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Ekspedisi.');
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', expeditionName);
      });
   });

    // it.only('[PENGATURAN-EKSPEDISI] - Harus bisa menambahkan data ekspedisi, semua field di isi', () => {
    //   // cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    //   // cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
    //   // cy.get('[name="expedition_name"').should('be.visible').type('JNT 2')
    //   // cy.get('[name="expedition_desc"').should('be.visible').type('JNT Cabang Panam')
    //   // cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
    //   // cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Ekspedisi.')
    //   // cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'JNT 2')
    // })

//     it.only('[PENGATURAN-EKSPEDISI] - Harus berhasil menambahkan data ekspedisi sebanyak 15 kali', () => {
//       cy.readFile(counterFile).then((data) => {
//         const nextNumber = data.lastNumber + 1;
//         const expeditionName = `JNE ${nextNumber}`;

//       // Update file dengan angka baru
//       cy.writeFile(counterFile, { lastNumber: nextNumber });

//       cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();

//         for (let i = 0; i < 15; i++) {
//           cy.get('.MuiStack-root > .MuiButtonBase-root')
//           .should('be.visible')
//           .click();
//           cy.get('[name="expedition_name"]')
//           .should('be.visible')
//           .type(expeditionName);
//           cy.get('[name="expedition_desc"]')
//           .should('be.visible')
//           .type('Cabang Marpoyan');
//           cy.get(':nth-child(4) > div > .MuiButton-contained')
//         .should('be.visible')
//         .click();
//     }
//   });
// });

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
      cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Ekspedisi.')
     })

     it('[PENGATURAN-EKSPEDISI] - Harus berhasli menghapus data ekspekssisi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Menghapus Data Expedisi.')
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
