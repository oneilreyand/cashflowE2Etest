// describe('Membuka halaman Kontak-Suplier', () => {
//   const navigateToKontak = () => {
//     cy.get('[data-testid="drawer-item-contacts"]').click(); // Klik menu navigasi "Kontak"
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login menggunakan kredensial yang valid
//     cy.visitDashboard(); // Kunjungi dashboard
//     navigateToKontak(); // Navigasi ke halaman "Kontak"
//   });

//   it('harus memunculkan page kontak - suplier', () => {
//     // Intercept API untuk mendapatkan data profil pengguna
//     cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');

//     // Menggunakan baseUrl dari konfigurasi Cypress
//     const url = `${Cypress.config('baseUrl')}/admin/contacts`;

//     // Kunjungi halaman menggunakan baseUrl
//     cy.visit(url);

//     // Tunggu hingga API selesai dipanggil
//     cy.wait('@getProfile').then((interception) => {
//       expect(interception.response.statusCode).to.eq(200);
//     });

//     // Klik tab "Suplier" setelah halaman dimuat
//     cy.get('#simple-tab-1').click();

//     // Verifikasi bahwa data pada halaman Suplier berhasil ditampilkan
//     cy.get('.MuiTypography-h5 > span')
//       .should('be.visible')
//       .and('not.be.empty'); // Pastikan elemen tidak kosong
//   });
// });

// describe('[Grup Kontak] - Cari Kontak', () => {
//   const navigateToKontak = () => {
//     cy.get('[data-testid="drawer-item-contacts"]').click();
//     cy.get('#simple-tab-1').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login menggunakan kredensial yang valid
//     cy.visitDashboard(); // Kunjungi dashboard
//     cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
//     navigateToKontak(); // Navigasi ke halaman Kontak
//   });

//   it('harus berhasil mencari kontak', () => {
//     // Tunggu hingga permintaan API berhasil
//     cy.wait('@getProfile').then((interception) => {
//       expect(interception.response.statusCode).to.eq(200);
//     });

//     // Interaksi dengan field pencarian kontak
//     cy.get('[name="cari kontak"]').type('Reyand');

//     // Tunggu UI selesai dirender dan data ditampilkan
//     cy.get('.MuiTypography-h5 > span')
//       .should('be.visible')
//       .and('not.be.empty'); // Pastikan elemen tidak kosong
//   });
// });


// // describe('[Grup Kontak] - Membuka detail kontak', () => {
// //   const navigateToKontak = () => {
// //     cy.get('[data-testid="drawer-item-contacts"]').click();
// //   };

// //   beforeEach(() => {
// //     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
// //     cy.visitDashboard(); // Visit the dashboard after successful login
// //     navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
// //   });

// //   it('harus berhasil mencari kontak', () => {
// //     cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
// //     // cy.get('#\\:rd\\:').type('reyand').should('have.value', 'reyand');

// //     //  Menggunakan baseUrl dari konfigurasi Cypress
// //     const url = `${Cypress.config('baseUrl')}/admin/contacts`;

// //     // Membuka halaman sesuai baseUrl
// //     cy.visit(url);

// //     // Tunggu API selesai
// //     cy.wait('@getProfile');
  
// //     // Tunggu hingga UI selesai merender
// //     cy.get('.MuiTypography-h5 > span').should('be.visible').and('not.be.empty');
// //     cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()
// //   });
  
// // });

// // describe('[Grup Kontak] - Edit Kontak dari detail kontak', () => {
// //   const navigateToKontak = () => {
// //     cy.get('[data-testid="drawer-item-contacts"]').click();
// //   };

// //   beforeEach(() => {
// //     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
// //     cy.visitDashboard(); // Visit the dashboard after successful login
// //     navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
// //   });

// //   it("harus berhasil mencari kontak", () => {
// //     cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
// //     // cy.get('#\\:rd\\:').type('reyand').should('have.value', 'reyand');

// //     //  Menggunakan baseUrl dari konfigurasi Cypress
// //     const url = `${Cypress.config('baseUrl')}/admin/contacts`;

// //     // Membuka halaman sesuai baseUrl
// //     cy.visit(url);

// //     // Tunggu API selesai
// //     cy.wait('@getProfile');
  
// //     // Tunggu hingga UI selesai merender
// //     cy.get('.MuiTypography-h5 > span').should('be.visible').and('not.be.empty');
// //     cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()
// //     cy.get('.MuiButton-outlined').click()
    
// //      // Tunggu sampai data dari API `list2` terpopulate
// //     cy.wait('@getProfile'); // Tunggu hingga API selesai
     
    
// //     // Isi form
// //     cy.get('#tipe_kontak').click();
// //     cy.contains('li', 'Pelanggan').click();
// //     cy.get('#tipe_kontak').should('contain', 'Pelanggan');
  
// //     // Open the dropdown
// //     cy.get('#fk_grup').click();
  
// //     // Select the option
// //     cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
// //         .should('be.visible')
// //         .click();
  
// //     cy.get('body').type('{esc}');
  
// //     cy.get('#sapaan').click();
// //     cy.contains('li', 'Bapak').click();
  
// //     cy.get('#nama').type('jon doe');
  
// //     cy.get('#tipe_identitas').click();
// //     cy.contains('li', 'KTP').click();
// //     cy.get('#no_identitas').type('3242343478749273423234');
  
// //     cy.get('[id="email.0"]').type("jondoe@example.com");
  
// //     cy.get('#nama_perusahaan').type('jon doe mandiri');
  
// //     cy.get('#no_hp').type('078817236836782647832648723');
  
// //     cy.get('#no_telp').type('021342894783247');
  
// //     cy.get('#no_fax').type('021342894783247');
  
// //     cy.get('#no_npwp').type('97438584984758473543');
  
// //     cy.get('[name="alamat_penagihan"]').type('jalan paus no.32897');
        
// //     cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        
// //     cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    
// //     cy.get('[name="alamat_pengiriman"]').type('jl.sudirman no.324');
  
// //     // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
  
// //     cy.get('#data_bank\\.0\\.bank_name').type('bca');
  
// //     cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau');
  
// //     cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil');
  
// //     cy.get('#data_bank\\.0\\.rek_no').type('000234892374');
  
// //     cy.get('#fk_akun_piutang').click();
// //     cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click();
  
// //     cy.get('#fk_akun_hutang').click();
// //     cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click();
  
// //     cy.get('#piutang_max').type('50000000');
  
// //     cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
  
// //     cy.get('#syarat_pembayaran').click();
// //     cy.get('[data-value="30"]').click();
  
// //     // Submit the form
// //     cy.get('.MuiButton-contained').click();
// //     cy.wait('@getProfile'); // Tunggu hingga API selesai
// //     cy.visit(url);
    
// //     // Lakukan aksi setelah API berhasil dijalankan
// //     cy.get('.MuiTypography-h5 > span').should('be.visible').and('not.be.empty');
  
// //   });
// // })

// describe('[Grup Kontak] - Membuka dan mengecek kesesuaian tampilan modal Pengaturan Grup Kontak', () => {
//   const navigateToKontak = () => {
//     cy.get('[data-testid="drawer-item-contacts"]').click();
//     cy.get('#simple-tab-1').click();

//     // cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//   });

//   //GRUP KONTAK
//   it('harus menampilkan modal pengaturan grup kontak', () => {
//     cy.get('.css-5yd3dt-MuiGrid2-root > .MuiGrid2-container > :nth-child(1)').should('be.visible').and('contain', 'Atur Grup Kontak');
//     //  cy.get('#atur-grup-contact-btn').should('be.visible').and('contain', 'Atur Grup Kontak');
    
//     //  cy.get('#atur-grup-contact-btn').click();
//     cy.get('.css-5yd3dt-MuiGrid2-root > .MuiGrid2-container > :nth-child(1)').click()
//     // cy.get('#modal-title').should('be.visible').and('contain', 'Pengaturan Grup Kontak');
//     cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').should('be.visible')
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible')
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible')
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible')
//     cy.wait(100)
//     cy.screenshot('show-pengaturan-gruo-kontak-modal');
//   });
// });

// describe('[Grup Kontak] - Harus Menampilkan modal grup Kontak', () => {
//   const navigateToKontak = () => {
//     cy.get('[data-testid="drawer-item-contacts"]').click();
//     cy.get('#simple-tab-1').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//   });

//   //GRUP KONTAK
//   it('harus menampilkan modal pengaturan grup kontak', () => {
//     cy.get('#atur-grup-contact-btn').should('be.visible').and('contain', 'Atur Grup Kontak');
//     cy.get('#atur-grup-contact-btn').click();
//     cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').should('be.visible')
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible')
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible')
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible')
//   });
// });

// describe('[Grup Kontak] - Mengambil data grup Kontak (datanya ada)', () => {
//   const navigateToKontak = () => {
//     cy.get('[data-testid="drawer-item-contacts"]').click();
//     cy.get('#simple-tab-1').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil mengambil daftar grup kontak', () => {
//     cy.visit('/admin/contacts'); // Memastikan halaman di-visit terlebih dahulu
    
//     cy.intercept('GET', '/api/grupkontak/list*').as('getGrupKontak');
    
//     // Klik tombol untuk memicu request API
//     cy.get('#atur-grup-contact-btn').click({ force: true });
  
//     cy.wait('@getGrupKontak', { timeout: 10000 }).then((interception) => {
//       cy.log('Intercepted Response:', JSON.stringify(interception.response.body));
//       expect(interception.response.statusCode).to.eq(200);
//     });
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible')
//   });
// });

// describe('[Grup Kontak] - Mengambil data grup Kontak (datanya tidak ada)', () => {
//   const navigateToKontak = () => {
//     cy.get('[data-testid="drawer-item-contacts"]').click();
//     cy.get('#simple-tab-1').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil mengambil daftar grup kontak', () => {
//     cy.visit('/admin/contacts'); // Memastikan halaman di-visit terlebih dahulu
    
//     cy.intercept('GET', '/api/grupkontak/list*').as('getGrupKontak');
    
//     // Klik tombol untuk memicu request API
//     cy.get('#atur-grup-contact-btn').click({ force: true });
  
//     cy.wait('@getGrupKontak', { timeout: 10000 }).then((interception) => {
//       cy.log('Intercepted Response:', JSON.stringify(interception.response.body));
//       expect(interception.response.statusCode).to.eq(200);
//     });
//     cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
//   });
// });

describe('[Grup Kontak] - Pengaturan Grup Kontak - Cari Grup', () => {
  const navigateToKontak = () => {
    cy.get('[data-testid="drawer-item-contacts"]').click();
    // cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
  };

  beforeEach(() => {
    cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(); // Visit the dashboard after successful login
    navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
  });

  it('harus berhasil mengambil daftar grup kontak', () => {
    cy.visit('/admin/contacts'); // Memastikan halaman di-visit terlebih dahulu
    
    cy.intercept('GET', '/api/grupkontak/list*').as('getGrupKontak');
    
    // Klik tombol untuk memicu request API
    cy.get('#atur-grup-contact-btn').click({ force: true });

    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root')
    .clear()
    .type('vendor obat asist 4')
    .trigger('input');
  
    cy.wait('@getGrupKontak', { timeout: 10000 }).then((interception) => {
      cy.log('Intercepted Response:', JSON.stringify(interception.response.body));
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible')
  });
});


// describe('[Grup Kontak] - Pengaturan Grup Kontak - Buat grup kontak dengan valu string kosong', () => {
//     const navigateToKontak = () => {
//       cy.get('[data-testid="drawer-item-contacts"]').click();
//     };
  
//     beforeEach(() => {
//       cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//       cy.visitDashboard(); // Visit the dashboard after successful login
//       navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//     });
  
//     it('harus menampilkan section buat grup kontak', () => {
//       // Periksa bahwa elemen utama pada halaman "Atur Grup Kontak" terlihat
//       cy.get('#atur-grup-contact-btn')
//         .should('be.visible')
//         .and('contain', 'Atur Grup Kontak')
  
//       // Klik untuk membuka form buat grup
//        cy.get('#atur-grup-contact-btn').click();
  
//       // Pastikan input form dan kolom tabel terlihat
//       cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').should('be.visible');
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible');
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible');
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible');
//       cy.get('.MuiPaper-root > .MuiTable-root > :nth-child(2) > .MuiTableRow-root > .MuiTableCell-root').should('be.visible');
  
//       // Klik tombol untuk tambah grup
//       cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click();
  
//       // Klik tombol simpan
//       cy.get('.MuiStack-root > .MuiButton-contained').click();
//       // cy.get('#\\:r8\\:-helper-text').should('be.visible').and('contain', 'Nama group harus diisi')
//     });
// });

// describe('[Grup Kontak] - Pengaturan Grup Kontak - Buat grup kontak dengan value yang benar', () => {
//     const navigateToKontak = () => {
//           cy.get('[data-testid="drawer-item-contacts"]').click();
//         //   cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
//         };
      
//         beforeEach(() => {
//           cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//           cy.visitDashboard(); // Visit the dashboard after successful login
//           navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//         });
      
//         it('harus berhasil membuat grup kontak dan mendapatkan list data gruo kontak yang baru', () => {
//           // Periksa bahwa elemen utama pada halaman "Atur Grup Kontak" terlihat
//           cy.get('#atur-grup-contact-btn')
//             .should('be.visible')
//             .and('contain', 'Atur Grup Kontak')
  
//           // Klik untuk membuka form buat grup
//           cy.get('#atur-grup-contact-btn').click();
  
//           // Pastikan input form dan kolom tabel terlihat
//           cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').should('be.visible');
//           cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible');
//           cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible');
//           cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible');
//           cy.get('.MuiPaper-root > .MuiTable-root > :nth-child(2) > .MuiTableRow-root > .MuiTableCell-root').should('be.visible');
  
//           // Klik tombol untuk tambah grup
//           cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click();
  
//           cy.get('[name="grup_name"]').type('vendor obat 1');
//           // Klik tombol simpanz
//           cy.get('.MuiStack-root > .MuiButton-contained').click();
  
//           cy.visit('/admin/contacts'); // Memastikan halaman di-visit terlebih dahulu
              
//           cy.intercept('GET', '/api/grupkontak/list*').as('getGrupKontak');
          
//           // Klik tombol untuk memicu request API
//           cy.get('#atur-grup-contact-btn').click({ force: true });
        
//           cy.wait('@getGrupKontak', { timeout: 10000 }).then((interception) => {
//             cy.log('Intercepted Response:', JSON.stringify(interception.response.body));
//             expect(interception.response.statusCode).to.eq(200);
//           });
//           cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible')
//         })
// });

// describe('[Grup Kontak] - Pengaturan Grup Kontak - Batal buat grup kontak', () => {
//     const navigateToKontak = () => {
//       cy.get('[data-testid="drawer-item-contacts"]').click();
//     //   cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
//     };
  
//     beforeEach(() => {
//       cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//       cy.visitDashboard(); // Visit the dashboard after successful login
//       navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//     });
  
//     it('harus menampilkan section buat buat grup', () => {
   
//       cy.get('#atur-grup-contact-btn').should('be.visible').and('contain', 'Atur Grup Kontak');
      
//       cy.get('#atur-grup-contact-btn').click();
//       // cy.get('#modal-title').should('be.visible').and('contain', 'Pengaturan Grup Kontak');
//       cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > :nth-child(2) > .MuiTableRow-root > .MuiTableCell-root').should('be.visible')
//       cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
//       cy.get('.MuiStack-root > .MuiButton-text').should('be.visible').click()
//     });
  
//     it('berhasil menekan button batal dan section buat grup tidak tampil di modal pengaturan grup kontak', () => {
   
//       cy.get('#atur-grup-contact-btn').should('be.visible').and('contain', 'Atur Grup Kontak');
      
//       cy.get('#atur-grup-contact-btn').click();
//       // cy.get('#modal-title').should('be.visible').and('contain', 'Pengaturan Grup Kontak');
//       cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible')
//       cy.get('.MuiPaper-root > .MuiTable-root > :nth-child(2) > .MuiTableRow-root > .MuiTableCell-root').should('be.visible')
//       cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
//       cy.get('.MuiStack-root > .MuiButton-text').should('be.visible').click()
//     });
  
// });

// describe('[Grup Kontak] - Pengaturan Grup Kontak - Hapus grup kontak', () => {
//     const navigateToKontak = () => {
//             cy.get('[data-testid="drawer-item-contacts"]').click();
//             // cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
//           };
        
//           beforeEach(() => {
//             cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//             cy.visitDashboard(); // Visit the dashboard after successful login
//             navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//           });
        
//           it('harus berhasil mengambil daftar grup kontak', () => {
//             cy.visit('/admin/contacts'); // Memastikan halaman di-visit terlebih dahulu
            
//             cy.intercept('GET', '/api/grupkontak/list*').as('getGrupKontak');
            
//             // Klik tombol untuk memicu request API
//             cy.get('#atur-grup-contact-btn').click({ force: true });
          
//             cy.wait('@getGrupKontak', { timeout: 10000 }).then((interception) => {
//               cy.log('Intercepted Response:', JSON.stringify(interception.response.body));
//               expect(interception.response.statusCode).to.eq(200);
//             });
//             cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible')
//             cy.get(':nth-child(1) > :nth-child(3) > .MuiBox-root > .MuiButtonBase-root').click()
//             cy.get('.MuiIconButton-colorError').click()
//           });
// });

// describe('[Grup Kontak] - Edit data grup dengan value yang berbeda', () => {
//     const navigateToKontak = () => {
//             cy.get('[data-testid="drawer-item-contacts"]').click();
//             // cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
//           };
        
//           beforeEach(() => {
//             cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//             cy.visitDashboard(); // Visit the dashboard after successful login
//             navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
//           });
        
//           it('harus berhasil mengambil daftar grup kontak', () => {
//             cy.visit('/admin/contacts'); // Memastikan halaman di-visit terlebih dahulu
            
//             cy.intercept('GET', '/api/grupkontak/list*').as('getGrupKontak');
            
//             // Klik tombol untuk memicu request API
//             cy.get('#atur-grup-contact-btn').click({ force: true });
          
//             cy.wait('@getGrupKontak', { timeout: 10000 }).then((interception) => {
//               cy.log('Intercepted Response:', JSON.stringify(interception.response.body));
//               expect(interception.response.statusCode).to.eq(200);
//             });
//             cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible')
//             cy.get(':nth-child(3) > :nth-child(1) > .MuiStack-root > .MuiButtonBase-root').click()
//             cy.get('#\\:r1r\\:').clear();
//             cy.get('#\\:r1r\\:').type('vendor obat asist 4');
//             cy.get('.MuiBox-root > .MuiIconButton-colorPrimary').click()

//           });
// })

  
  