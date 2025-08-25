import { medcareVer } from "../../data";

describe('[PENGATURAN-TERMIN]', () => {
  const navigatePengaturan = () => {
    cy.get('[data-testid="drawer-item-settings"]').click();
  };

  beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(Cypress.env('companyId')) // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  //Kesesuain UI
  it('Cek kesesuainan halaman Pengaturan Termin dengan design yang ada', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Header
    cy.get('.MuiTypography-root').should('be.visible').and('contain', 'Pengaturan Termin')
    cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
    //Search
    cy.get('input[placeholder="Cari Termin"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Cari Termin');
    //Tambah Termin Button
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin');
    //Tabel
    cy.contains('Semua Termin').should('be.visible');
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama');
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Durasi');
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible').and('contain', 'Status');
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('be.visible').and('contain', 'Aksi');
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
  it('Membuka halaman Pengaturan Termin dengan kondisi data termin tidak ada - Harus ada pesan (Tidak ada data) di tabel', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
  });

  it('Manipulasi data - Harus berhasil menampilkan tidak ada data, ketika data kosong', () => {
      // Intercept the API request
      cy.intercept('GET', '**/api/setting-termin*', {
        statusCode: 200, // Simulate a successful response with no data
        body: {
          data: [],
          message: 'No Data',
        },
      }).as('getTerminNoData');
    
      // Perform the action to trigger the request
      cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    
      // Wait for the intercepted request
      cy.wait('@getTerminNoData', { timeout: 10000 });
    
      // Assert that the UI displays the correct error message
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible')
        .and('contain', 'Tidak ada data');
    });

  // Create new data success
 it('Cek kesesuainan modal tambah Termin dengan design yang ada', () => {
  cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
  cy.get('[name="terminName"]')
  .invoke('attr', 'placeholder')
  .should('eq', 'Masukkan nama termin')
  cy.get('[name="terminDuration"]')
  .invoke('attr', 'placeholder')
  .should('eq', 'Total hari')
  cy.get('input[name="terminStatus"]')
  .should('exist')
  .and('not.be.checked')
  cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
  cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan')
  });

 it('Berhasil batal tambah termin dan form tambah termin tidak ada di halaman', () => {
  cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
  cy.get('.MuiButton-text').should('be.visible').click()
  cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
 })

 it('Berhasil merubah toggle button status menjadi aktif saat tambah data', () => {
  cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
  cy.get('input[name="terminStatus"]').should('exist').and('not.be.checked').click()
  cy.get('input[name="terminStatus"]').should('be.checked')
 })

 it('Berhasil menambah data termin dengan kondisi data valid dan status aktif', () => {
  cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
  cy.get('[name="terminName"]')
  .type('termin 4 bulan')
  cy.get('[name="terminDuration"]')
  .type('60')
  cy.get('input[name="terminStatus"]').should('exist').and('not.be.checked').click()
  cy.get(':nth-child(4) > div > .MuiButton-contained').click()
  cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Termin.')
  //Validasi
  cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'termin 4 bulan')
  cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', '60')
  cy.get('input[name="terminstatus"]').should('be.checked')
  })

 it('Berhasil menambah data terimin dengan kondisi data valid dan status tidak aktif', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('termin 11 bulan')
    cy.get('[name="terminDuration"]')
    .type('240')
    cy.get('input[name="terminStatus"]').should('exist').and('not.be.checked')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Termin.')
    //Validasi
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'termin 11 bulan')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', '240')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('not.be.checked')
   });

 it('Berhasil menambah data termin dengan kondisi data nama termin spasi depan belakang kemudian di trim', () => {
    // Intercept API POST
    cy.intercept('POST', '**/api/setting-termins*', (req) => {}).as('postTerminTrim'); // Alias untuk memantau request

    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('     termin 80 bulan')
    cy.get('[name="terminDuration"]')
    .type('90')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()

    cy.wait('@postTerminTrim').then((interception) => {
      expect(interception.response.statusCode).to.equal(200); // Pastikan respons sukses 
      expect(interception.request.body.terminName.trim()).to.equal('termin 80 bulan'); // Pastikan nama termin sudah di trim
      expect(String(interception.request.body.terminDuration)).to.equal('90'); // Pastikan durasi termin sesuai
    });
    
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Termin.')

 })

//  it('Spam klik simpan, data yang tersimpan hanya satu', () => {
//   cy.intercept('POST', '**/api/setting-termins*').as('HitMultiple');

//   // Kunjungi halaman tambah termin
//   cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
//   cy.get('.MuiStack-root > .MuiButtonBase-root')
//     .should('be.visible')
//     .and('contain', 'Tambah Termin')
//     .click();

//   // Isi form tambah termin
//   cy.get('[name="terminName"]').type('Spam Klik');
//   cy.get('[name="terminDuration"]').type('30');

//   // Klik simpan berkali-kali (3x) -> tetap error
//   for (let i = 0; i < 3; i++) {
//     cy.get(':nth-child(4) > div > .MuiButton-contained').click();
//     cy.wait('@HitMultiple');
//   }

//   // Verifikasi data hanya muncul sekali di tabel
//   cy.get('.MuiTableBody-root')
//     .find('tr')
//     .filter(':contains("Spam Klik")')
//     .should('have.length', 1);
// })


// Create new data failed 
 it('Gagal menambah data termin dengan kondisi data nama termin tidak di isi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .clear()
    cy.get('[name="terminDuration"]')
    .type('30')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Termin harus diisi.')
    // cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  })

  it('Gagal menambah data termin dengan kondisi data durasi termin tidak di isi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('termin 1 bulan')
    cy.get('[name="terminDuration"]')
    .clear()
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  })

  it('Gagal menambahkan nama termin yang sudah tersimpan (Duplikat)', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('termin 4 bulan')
    cy.get('[name="terminDuration"]')
    .type('30')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Termin dengan nama tersebut sudah ada.')
  });

  it('Gagal menambahkan termin dengan nama di isi spasi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('     ')
    cy.get('[name="terminDuration"]')
    .type('30')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Termin harus diisi.')
    //cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  })

  it('Gagal menambahkan termin dengan durasi di isi spasi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('termin 2 bulan')
    cy.get('[name="terminDuration"]')
    .type('     ')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    //cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Termin harus diisi.')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  })

  it('Gagal GET data termin ketika kondisi  error muncul', () => {
    // Intercept the API request
    cy.intercept('GET', '**/api/setting-termins*', {
      statusCode: 500, // Simulate a server error
      body: {
        message: 'Internal Server Error',
      },
    }).as('getTerminError');

    // Perform the action to trigger the request
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();

    // Wait for the intercepted request
    cy.wait('@getTerminError', { timeout: 10000 });

    // Assert that the UI displays the correct error message
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Kesalahan di server')

    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
      .should('be.visible')
      .and('contain', 'Error, Gagal mendapatkan data!');
  })

  it('Spam klik simpan saat server error', () => {
  // Stub API simpan agar pertama2 error
    cy.intercept('POST', '**/api/setting-termins*', {
      statusCode: 500,
      body: { message: 'Server error' }
      }).as('saveError');

  // Kunjung halaman tambah termin
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    cy.get('.MuiStack-root > .MuiButtonBase-root')
    .should('be.visible')
    .and('contain', 'Tambah Termin')
    .click();

  // Isi form tambah termin
    cy.get('[name="terminName"]').type('Spam Klik Termin');
    cy.get('[name="terminDuration"]').type('30');

  // Klik simpan berkali-kali (3x) -> tetap error
    for (let i = 0; i < 3; i++) {
      cy.get(':nth-child(4) > div > .MuiButton-contained').click();
      cy.wait('@saveError');
    }

  // // Ganti intercept ke sukses
  //   cy.intercept('POST', '**/api/setting-termins*', {
  //     statusCode: 200,
  //     body: {}
  //     }).as('saveSuccess');

  // // Klik simpan lagi (sekarang sukses)
  //   cy.get(':nth-child(4) > div > .MuiButton-contained').click();
  //   // cy.wait('@saveSuccess');

  // // Verifikasi data hanya muncul sekali di tabel
  //   cy.get('.MuiTableBody-root')
  //     .find('tr')
  //     .filter(':contains("Spam Klik Termin")')
  //     .should('have.length', 1);
    });

  it('Gagal menyimpan data saat spam klik dalam kondisi error', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    cy.should("not.contain", "Spam Klik Termin")
  })

  it('Gagal POST data termin ketika kondisi error', () => {
    // Intercept the API request
    cy.intercept('POST', '**/api/setting-termins*', {
      statusCode: 500, // Simulate a server error
      body: {
        message: 'Internal Server Error',
      },
    }).as('postTerminError');

    // Kunjungi halaman tambah termin
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click();

    // Isi form tambah termin
    cy.get('[name="terminName"]').type('termin error');
    cy.get('[name="terminDuration"]').type('30');
    cy.get(':nth-child(4) > div > .MuiButton-contained').click();

    // Cek pesan error
    cy.wait('@postTerminError', { timeout: 10000 });
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Kesalahan di server');
    // cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
    //   .should('be.visible')
    //   .and('contain', 'Error, Gagal menambahkan data!');
  })

  it('Gagal POST data termin saat kondisi offline', () => {
    // Intercept the API request
    cy.goOffline();

    //Kunjungi halaman tambah termin
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click();

    //Isi form tambah termin
    cy.get('[name="terminName"]').type('termin offline');
    cy.get('[name="terminDuration"]').type('30');
    cy.get(':nth-child(4) > div > .MuiButton-contained').click();

    //Cek pesan error
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
  });

  it('Gagal GET data termin saat kondisi offline', () => {
     cy.goOffline();

     // Kunjungi halaman ekspedisi
      cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain','Tidak ada data')
  })

//Looping add data
 it('Harus bisa menambahkan termin dengan data yang sudah di isi sebanyak 15 kali', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    for(let i = 1; i <=15; i++) {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
      cy.get('[name="terminName"]')
      .type(`termin sebulan ${i}`)
      cy.get('[name="terminDuration"]')
      .type(`3${i}`)
      cy.get(':nth-child(4) > div > .MuiButton-contained').click()
      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Termin.')
    }
  });
  

// Status non Aktif - Aktif (Pegination 1)
  it('Berhasil merubah status termin dari non aktif menjadi aktif, kemudian tampil menjadi opsi di penjuaan, pembelian dan kontak PG1', () => {
   //Mengunjungi halaman termin
   cy.get('[data-cy="submenu-item-termins-setting"] >[data-cy="list-item-button-sub-menu-setting"]').click()
   //Ubah status termin non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Termin.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get('#paymentTerms').click()
     cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 15')
     cy.get('body').click(0, 0)

     // Cek di Pembelian
      cy.get('[data-testid="drawer-item-purchases"]').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').click()
      cy.get('#paymentTerms').click()
      cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 15')
      cy.get('body').click(0, 0)

      // Cek di Kontak
      cy.get('[data-testid="drawer-item-contacts"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      cy.get('#syarat_pembayaran').click()
      cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 15')
      cy.get('body').click(0, 0)

      // Cek di Biaya
      cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      cy.get('#expense_from').should('be.visible').click()
      cy.get('ul[role="listbox"] > li').contains('Rekening Bank').should('be.visible').click()
      cy.get(':nth-child(6) > .MuiGrid2-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="input-payment_terms"] > .MuiInputBase-root').should('be.visible').click()
      cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 15')
      cy.get('body').click(0, 0)
})

// Status non Aktif - Aktif (Pegination 2)
it('Berhasil merubah status termin dari non aktif menjadi aktif, kemudian tampil menjadi opsi di penjuaan, pembelian dan kontak PG2', () => {
   //Mengunjungi halaman termin
   cy.get('[data-cy="submenu-item-termins-setting"] >[data-cy="list-item-button-sub-menu-setting"]').click()
   //Ubah ke pegination 2
    cy.get('[data-testid="NavigateNextIcon"]').click()
   //Ubah status termin aktif menjadi non aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Termin.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get('#paymentTerms').click()
     cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 5')
     cy.get('body').click(0, 0)

     // Cek di Pembelian
      cy.get('[data-testid="drawer-item-purchases"]').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').click()
      cy.get('#paymentTerms').click()
      cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 5')
      cy.get('body').click(0, 0)

      // Cek di Kontak
      cy.get('[data-testid="drawer-item-contacts"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      cy.get('#syarat_pembayaran').click()
      cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 5')
      cy.get('body').click(0, 0)

      // Cek di Biaya
      cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      cy.get('#expense_from').should('be.visible').click()
      cy.get('ul[role="listbox"] > li').contains('Rekening Bank').should('be.visible').click()
      cy.get(':nth-child(6) > .MuiGrid2-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="input-payment_terms"] > .MuiInputBase-root').should('be.visible').click()
      cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 5')
      cy.get('body').click(0, 0)
})

// Status Aktif - non Aktif (Pegination 1)
it('Berhasil merubah status termin dari aktif menjadi non aktif, kemudian tidak tampil menjadi opsi di penjualan, pembelian, biaya, kontak PG1', () => {
  //Mengunjungi halaman termin
   cy.get('[data-cy="submenu-item-termins-setting"] >[data-cy="list-item-button-sub-menu-setting"]').click()
   //Ubah status termin non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Termin.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get('#paymentTerms').click()
     cy.get('ul[role="listbox"] > li').should('not.contain', 'termin sebulan 15')
     cy.get('body').click(0, 0)

     // Cek di Pembelian
      cy.get('[data-testid="drawer-item-purchases"]').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').click()
      cy.get('#paymentTerms').click()
      cy.get('ul[role="listbox"] > li').should('not.contain', 'termin sebulan 15')
      cy.get('body').click(0, 0)

      // Cek di Kontak
      cy.get('[data-testid="drawer-item-contacts"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      cy.get('#syarat_pembayaran').click()
      cy.get('ul[role="listbox"] > li').should('not.contain', 'termin sebulan 15')
      cy.get('body').click(0, 0)

      // // Cek di Biaya
      // cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      // cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      // cy.get('#expense_from').should('be.visible').click()
      // cy.get('ul[role="listbox"] > li').contains('Rekening Bank').should('be.visible').click()
      // cy.get(':nth-child(6) > .MuiGrid2-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      // cy.get('[data-testid="input-payment_terms"] > .MuiInputBase-root').should('be.visible').click()
      // cy.get('ul[role="listbox"] > li').should('not.contain', 'termin sebulan 15')
      // cy.get('body').click(0, 0)
})

//Status Aktif - non Aktif (Pegination 2)
it('Berhasil merubah status termin dari aktif menjadi non aktif di page 2, kemudian tidak tampil di opsi penjualan, pembelian, biaya, dan kontak PG2', () => {
  //Mengunjungi halaman termin
   cy.get('[data-cy="submenu-item-termins-setting"] >[data-cy="list-item-button-sub-menu-setting"]').click()
   //Ubah ke pegination 2
    cy.get('[data-testid="NavigateNextIcon"]').click()
   //Ubah status termin aktif menjadi non aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Termin.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get('#paymentTerms').click()
     cy.get('ul[role="listbox"] > li').should('not.contain', 'termin sebulan 5')
     cy.get('body').click(0, 0)

     // Cek di Pembelian
      cy.get('[data-testid="drawer-item-purchases"]').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').click()
      cy.get('#paymentTerms').click()
      cy.get('ul[role="listbox"] > li').should('not.contain', 'termin sebulan 5')
      cy.get('body').click(0, 0)

      // Cek di Kontak
      cy.get('[data-testid="drawer-item-contacts"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      cy.get('#syarat_pembayaran').click()
      cy.get('ul[role="listbox"] > li').should('not.contain', 'termin sebulan 5')
      cy.get('body').click(0, 0)

      // // Cek di Biaya
      // cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
      // cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
      // cy.get('#expense_from').should('be.visible').click()
      // cy.get('ul[role="listbox"] > li').contains('Rekening Bank').should('be.visible').click()
      // cy.get(':nth-child(6) > .MuiGrid2-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      // cy.get('[data-testid="input-payment_terms"] > .MuiInputBase-root').should('be.visible').click()
      // cy.get('ul[role="listbox"] > li').should('contain', 'termin sebulan 5')
      // cy.get('body').click(0, 0)
})

//Hapus Data termin
it('Berhasil menghapus termin', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[data-testid="alert-dialog-submit-button"]').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Menghapus Data Termin.')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('not.contain','termin sebulan 15')
  })

//Pegination
  it('Berhasil mengganti halaman termin selanjutnya', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('[data-testid="NavigateNextIcon"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should('contain','termin sebulan 4')
  })

  it('Berhasil mengganti pagination ke halaman sebelumnya', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] >[data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('[data-testid="NavigateNextIcon"]').click()
    cy.get('[data-testid="NavigateBeforeIcon"]').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('contain','termin sebulan 14')
  })

  //Search
  it('Berhasil Search dengan keyword yang valid', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Termin"]')
    .should('be.visible').type('termin sebulan 5')
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should('contain','termin sebulan 5')
  })

  it('Gagal Search dengan keyword yang tidak valid', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Termin"]')
    .should('be.visible').type('hantu')
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('contain','Tidak ada data.')
  })

  it('Berhasil Search dengan keyword sebagian', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Termin"]')
    .should('be.visible').type('ter')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('contain','ter')
  })

  it('Berhasil search dengan keyword campuran (huruf besar dan kecil)', () => {
   cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Termin"]')
    .should('be.visible').type('terMin SeBULan')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('contain','termin sebulan') 
  })
})
