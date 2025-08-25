import { medcareVer } from "../../data";

describe('[PENGATURAN-PAJAK]', () => {
  const navigatePengaturan = () => {
    cy.get('[data-testid="drawer-item-settings"]').click();
  };

  beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  //Kesesuaian UI
  it('Cek kesesuainan halaman Pengaturan Pajak dengan design yang ada', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Header
    cy.get('.MuiTypography-h5').should('be.visible').and('contain', 'Pengaturan Pajak')
    cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
    //Search
    cy.get('input[placeholder="Cari Pajak"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Cari Pajak')
    //Tambah Pajak Button
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Pajak')
    //Tabel
    cy.contains('Semua Pajak').should('be.visible');
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Persentase Efektif %')
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible').and('contain', 'Akun Pajak Penjualan')
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('be.visible').and('contain', 'Akun Pajak Pembelian')
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)')
      .scrollIntoView()
      .should('be.visible')
      .and('contain', 'Status')
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)')
    .scrollIntoView()
    .should('be.visible')
    .and('contain', 'Aksi')
    //Pegination
    cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root').should('be.visible')
    .invoke('text')
    .should('match', /Menampilkan\s+\d+\s*-\s*\d+\s+dari\s+\d+\s+data/)
    cy.get('.MuiPagination-ul').should('be.visible')
  });

  //Navigation to Beranda
  it('Breadcrumbs dapat berfungsi dengan baik -> membawa halaman pengaturan ke beranda', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click()
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').and('contain', 'Beranda')
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()
    cy.get('.MuiTypography-root > span').should('be.visible').and('contain', 'Dashboard')
    })

  //Empty State
  // it('Membuka halaman Pengaturan Pajak dengan kondisi data pajak tidak ada - Harus ada pesan (Tidak ada data) di tabel', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('exist').and('contain', 'Tidak ada data')

  it(' Manipulasi data - Harus berhasil menampilkan tidak ada data, ketika data kosong', () => {
      // Intercept the API request
      cy.intercept('GET', '**/api/setting-taxes*', {
        statusCode: 200, // Simulate a successful response with no data
        body: {
          data: [],
          message: 'No Data',
        },
      }).as('getTaxesNoData');
    
      // Perform the action to trigger the request
      cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    
      // Wait for the intercepted request
      cy.wait('@getTaxesNoData', { timeout: 10000 });
    
      // Assert that the UI displays the correct error message
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible')
        .and('contain', 'Tidak ada data');
    });

   //Create New Data Success
  it('Cek kesesuaian modal tambah Pajak dengan design yang ada', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('#modal-title').should('exist').and('contain', 'Tambah Pajak Baru')
    cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist')
    cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Nama')
    cy.get(':nth-child(3) > .MuiFormLabel-root').should('exist').and('contain', 'Persentase Efektif %')
    cy.get(':nth-child(7) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Penjualan')
    cy.get(':nth-child(5) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Pembelian')
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').and('contain', 'Tambah Baru')
  })

  it('Berhasil membuka opsi dropdown akun pajak penjualan dan pembelian dan berhasil cek ada data atau tidak', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    const dropdowns = [
    'input[name="tax_purchase_account"]',   // Pajak Pembelian
    'input[name="tax_sales_account"]'       // Pajak Penjualan
    ];

    dropdowns.forEach((selector) => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()

      cy.get(selector)
      .should('be.visible')
      .click();

      cy.get('ul[role="listbox"] > li', { timeout: 5000 })
      .should('have.length.greaterThan', 0);

      // Tutup dropdown
      cy.get('body').click(0, 0);
      });   
  })

  it('Berhasil membatalkan tambah pajak dengan tombol batal kan', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiButton-text').should('exist').click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
  })

  it('Berhasil mencari akun pajak, di field akun pajak pembelian dan penjualan', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    const dropdowns = [
    'input[name="tax_purchase_account"]',   // Pajak Pembelian
    'input[name="tax_sales_account"]'       // Pajak Penjualan
    ];

    dropdowns.forEach((selector) => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()

      cy.get(selector).should('be.visible').type('Hutang Usaha');

      // Pastikan hasil search mengandung teks "Hutang Usaha"
      cy.get('ul[role="listbox"] > li')
      .each(($el) => {expect($el.text()).to.contain('Hutang Usaha');
    });

      // Bersihkan pencarian
      cy.get(selector).clear();

      // Tutup dropdown
      cy.get('body').click(0, 0);
      });
  })

  it('Berhasil menutup modal tambah pajak dengan icon silang', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiButton-text').should('exist').click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
  })

  it('Berhasil menambah pajak, semua field di isi dengan data yang valid', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('Pajak Penghasilan')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
    cy.get('.MuiTableRow-root > :nth-child(4)').should('exist').and('contain', 'Kas')
  })

  it('Berhasil menambahkan data pajak dengan kondisi nama pajak spasi di depan (Trim)', () => {
    // Intercept API POST
    cy.intercept('POST', '**/api/setting-taxes*', (req) => {}).as('postTaxTrim'); // Alias untuk memantau request

    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('     Trim Pajak')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')

    cy.wait('@postTaxTrim').then((interception) => {
      expect(interception.response.statusCode).to.equal(200); // Pastikan respons sukses 
      expect(interception.request.body.tax_name.trim()).to.equal('Trim Pajak'); // Pastikan nama termin sudah di trim
  })
})

  // it('Spam klik simpan pajak, data yang tersimpan harus satu', () => {
  //   // Intercept API POST
  //   cy.intercept('POST', '**/api/setting-taxes*', (req) => {}).as('HitMultiple'); // Alias untuk memantau request

  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get('.MuiStack-root > .MuiButtonBase-root').click()
  //   cy.get('[name="tax_name"]').should('exist').type('Spam Klik')
  //   cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
  //   cy.get('[name="tax_sales_account"]').click()
  //   cy.contains('li', '1-11001 - Kas')
  //   .scrollIntoView()
  //   .should('exist')
  //   .click();
  //   cy.get('[name="tax_sales_account"]').trigger('change')
  //   cy.get('[name="tax_purchase_account"]').click()
  //   cy.contains('li', '1-11001 - Kas')
  //   .scrollIntoView()
  //   .should('exist')
  //   .click();
  //   cy.get('[name="tax_purchase_account"]').trigger('change')
    
  //   //Klik simpan berkali-kali
  //   for (let i = 0; i < 3; i++) {
  //     cy.get('.css-zxbdg4 > div > .MuiButton-contained').click();
  //     cy.wait('@HitMultiple');
  // }
  //   //Verifikasi data hanya muncul sekali
  //    cy.get('.MuiTableBody-root')
  //   .find('tr')
  //   .filter(':contains("Spam Klik")')
  //   .should('have.length', 1);
  // })

  //Create new data failed
  it('Gagal menambah data pajak dengan kondisi nama pajak tidak diisi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Nama wajib diisi.')
  })

  it('Gagal menambah pajak, field nama di isi spasi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type(' ')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('50')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Nama tidak boleh mengandung karakter khusus kecuali simbol persen (%).')
  })

  it('Gagal menambahkan data pajak dengan kondisi persentase pajak tidak diisi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('Pajak 10%')
    cy.get('[name="tax_effective_percentage"]').should('exist').clear()
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Persentase efektif wajib diisi.')
  })

  it('Gagal menambah pajak, field Persentase Efektif %  di isi spasi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('pajak')
    cy.get('[name="tax_effective_percentage"]').should('exist').type(' ')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Persentase efektif wajib diisi.')
  })

  it('Gagal menambahkan data pajak dengan akun pajak pembelian tidak dipilih', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('Pajak 10%')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Akun Pajak Pembelian wajib diisi.')
  })

  it('Gagal menambahkan data pajak dengan akun pajak penjualan tidak diisi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('Pajak 10%')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Akun Pajak Penjualan wajib diisi.') 
  })

  it('Gagal menambahkan data pajak dengan nama pajak yang sudah tersimpan (Duplikat)', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('Trim Pajak')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
    cy.get('.MuiAlert-message').should('exist').and('contain', 'Nama Pajak tersebut sudah ada.')
  })

  // it('Spam klik simpan saat server error lalu normal, data hanya tersimpan sekali', () => {
  //   // Intercept API POST
  //   cy.intercept('POST', '**/api/setting-taxes*', {
  //     statusCode : 500,
  //     body: { message: 'Server error'}
  //   }).as('serverError'); // Alias untuk memantau request

  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get('.MuiStack-root > .MuiButtonBase-root').click()
  //   cy.get('[name="tax_name"]').should('exist').type('Spam Klik 2')
  //   cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
  //   cy.get('[name="tax_sales_account"]').click()
  //   cy.contains('li', '1-11001 - Kas')
  //   .scrollIntoView()
  //   .should('exist')
  //   .click();
  //   cy.get('[name="tax_sales_account"]').trigger('change')
  //   cy.get('[name="tax_purchase_account"]').click()
  //   cy.contains('li', '1-11001 - Kas')
  //   .scrollIntoView()
  //   .should('exist')
  //   .click();
  //   cy.get('[name="tax_purchase_account"]').trigger('change')
    
  //   //Klik simpan berkali-kali
  //   for (let i = 0; i < 3; i++) {
  //     cy.get('.css-zxbdg4 > div > .MuiButton-contained').click();
  //     cy.wait('@serverError');
  // }
  //   cy.intercept('POST', '**/api/setting-taxes*', {
  //     statusCode : 200,
  //     body: {id: 999, name: 'Spam Klik 2', duration: 30}}).as('serverSuccess');

  //   cy.get('.css-zxbdg4 > div > .MuiButton-contained').click();
  //   cy.wait('@serverSuccess')

  //     // Verifikasi data hanya muncul sekali di tabel
  //   cy.get('.MuiTableBody-root')
  //   .find('tr')
  //   .filter(':contains("Spam Klik 2")')
  //   .should('have.length', 1);
  // })

  it('Gagal GET data pajak ketika kondisi error muncul', () => {
    // Intercept the API request
    cy.intercept('GET', '**/api/setting-taxes*', {
      statusCode: 500, // Simulate a server error
      body: {
        message: 'Internal Server Error',
      },
    }).as('getTaxError');

    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

    cy.wait('@getTaxError', { timeout: 10000 });

    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
      .should('be.visible')
      .and('contain', 'Error, Gagal mendapatkan data!');
  })

  it('Gagal POST pajak dengan kondisi error', ()=> {
    // Intercept the API request
    cy.intercept('POST', '**/api/setting-taxes*', {
      statusCode: 500, // Simulate a server error
      body: {
        message: 'Internal Server Error',
      },
    }).as('postTaxError');

    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('Spam Klik 4')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').click();

    cy.wait('@postTaxError', { timeout: 10000 });
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Terjadi kesalahan');
  })

  it('Gagal POST pajak saat kondisi offline', () => {
    cy.goOffline()

    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('Spam Klik 6')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click()
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-11001 - Kas')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').click();

    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
  })

  it('Gagal GET pajak dengan kondisi offline', () => {
    cy.goOffline();

    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain','Tidak ada data')
  })

//Detail data validasi
  it('Cek kesesuaian detail data pajak dengan design', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()

    cy.get('.css-1jjo94b > :nth-child(1) > :nth-child(1) > .MuiFormLabel-root').should('be.visible').and('contain','Nama')
    cy.get('.css-1jjo94b > :nth-child(1) > :nth-child(2) > .MuiFormLabel-root').should('be.visible').and('contain','Persentase Efektif %')
    cy.get('.css-u9lq29 > :nth-child(1) > :nth-child(1) > .MuiFormLabel-root').should('be.visible').and('contain','Akun Pajak Penjualan')
    cy.get('.css-u9lq29 > :nth-child(1) > :nth-child(2) > .MuiFormLabel-root').should('be.visible').and('contain','Akun Pajak Pembelian')

    cy.get('.MuiButton-text').should('be.visible').and('contain','Batalkan')
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').should('be.visible').and('contain','Edit Data')
  })

  it('Berhasil batalkan edit data di form detail data', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()

    cy.get('.MuiButton-text').should('be.visible').and('contain','Batalkan').click()

    cy.contains('Semua Pajak')
  })

  it('Berhasil menutup modal detail pajak menggunakan tombol close pada modal', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1j72te2 > .MuiButtonBase-root').click()
    cy.contains('Semua Pajak')
  })

//Edit pajak validasi
  it('Cek kesesuaian edit data pajak dengan design',() => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').should('be.visible').and('contain','Edit Data').click()

    cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist')
    cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Nama')
    cy.get(':nth-child(3) > .MuiFormLabel-root').should('exist').and('contain', 'Persentase Efektif %')
    cy.get(':nth-child(7) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Penjualan')
    cy.get(':nth-child(5) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Pembelian')
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').and('contain', 'Ubah data')
  })

  it('Bisa batalkan edit data', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').should('be.visible').and('contain','Edit Data').click()

    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan').click()
    cy.contains('Semua Pajak')
  })

  it('Berhasil menutup modal edit pajak menggunakan tombol close pada modal', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').click()
    cy.get('.css-1j72te2 > .MuiButtonBase-root').click()
    cy.contains('Semua Pajak')
  })

//Edit pajak berhasil
  it('Berhasil edit pajak, semua field di isi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').click()
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_name"]').should('exist').type('pajak tahunan')
    cy.get('[name="tax_effective_percentage"]')
      .clear()
    cy.get('[name="tax_effective_percentage"]')
      .type('30')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
      .scrollIntoView()
      .should('exist')
      .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').click()
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain','Berhasil Mengubah Data Pajak.')

    //Validasi
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft').contains('pajak tahunan')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').contains('30')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').contains('Aset Tetap - Building Improvements')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4)').contains('Aset Tetap - Building Improvements')
  })

//Edit pajak gagal
 it('Gagal edit pajak, field nama tidak diisi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').click()
    
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_effective_percentage"]')
      .clear()
    cy.get('[name="tax_effective_percentage"]')
      .type('80')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
      .scrollIntoView()
      .should('exist')
      .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').click()

    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Nama wajib diisi.')
  })

  it('Gagal edit pajak, field persentase efektif tidak diisi', () =>{
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').click()
    
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_name"]').should('exist').type('PPN 11%')
    cy.get('[name="tax_effective_percentage"]')
      .clear()
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
      .scrollIntoView()
      .should('exist')
      .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').click()

    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Persentase efektif wajib diisi.')
  })

  it('Gagal edit data dengan akun pajak penjualan tidak dipilih', () =>{
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').click()
    
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_name"]').should('exist').type('PPN 11%')
    cy.get('[name="tax_effective_percentage"]')
      .clear()
    cy.get('[name="tax_effective_percentage"]').type('11')
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
      .scrollIntoView()
      .should('exist')
      .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').clear() 
    cy.get('[name="tax_purchase_account"]').click()
    // bagaiman cara menutup dropdownnya?
    // cy.get('button[title="Clear"]').should('be.visible').click()
    // cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').click()

    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Akun Pajak Pembelian wajib diisi.')
  })

  it('Gagal edit data dengan penjualan tidak diisi', () =>{
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-1tivkax > .MuiStack-root > .MuiButton-contained').click()
    
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_name"]').should('exist').type('PPN 11%')
    cy.get('[name="tax_effective_percentage"]')
      .clear()
    cy.get('[name="tax_effective_percentage"]').type('11')
    cy.get('[name="tax_sales_account"]').clear()
    cy.get('[name="tax_sales_account"]').click()
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-zxbdg4 > div > .MuiButton-contained').click()

    cy.get('.MuiFormHelperText-root.Mui-error')
    .should('be.visible')
    .and('contain', 'Akun Pajak Penjualan wajib diisi.') 
  })

//Looping add data
  it('berhasil menambah pajak, semua field di isi sebanyak 10 kali', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    for(let i = 0; i < 10; i++) {
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()
      cy.get('[name="tax_name"]').should('exist').type(`PPH ${i}`)
      cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
      cy.get('[name="tax_sales_account"]').click()
      cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="tax_sales_account"]').trigger('change')
      cy.get('[name="tax_purchase_account"]').click()
      cy.contains('li', '1-31003 - Aset Tetap - Building Improvements')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="tax_purchase_account"]').trigger('change')
      cy.get('.css-zxbdg4 > div > .MuiButton-contained').should('exist').click()
      cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').should('exist').and('contain', 'Aset Tetap - Building Improvements')
    }
  })

//Hapus
it('Harus berhasil menghapus pajak', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6) > .MuiButtonBase-root').scrollIntoView().should('be.visible').click()
    cy.get('[data-testid="alert-dialog-submit-button"]').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Menghapus Data Pajak.')
  })

//Status non Aktif - Aktif (Pegination 1)
  it('Berhasil merubah status pajak dari non aktif menjadi aktif dan tampil menjadi opsi di penjualan, biaya, terima dan kirim uang kas dan bank', () =>{
    //mengunjungi halaman pajak
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Ubah status pajak non aktif menjadi aktif
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Pajak.')
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

    //ke halaman penjualan
    cy.get('[data-testid="drawer-item-sales"]').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id="penjualan.0.tax"]').should('exist').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'PPH 8')
    cy.get('body').click(0, 0)

    //ke halaman biaya
    cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id = "details.0.tax_id"]').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'PPH 8')
    cy.get('body').click(0, 0)

    //ke halaman kirim uang kas dan bank
    cy.get('[data-testid="drawer-item-cash-bank"]').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').should('be.visible').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Kirim Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'PPH 8')
    cy.get('body').click(0, 0)

    //ke halaman terima uang kas dan bank
    cy.get('.css-1j72te2 > .MuiButtonBase-root').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Terima Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'PPH 8')
    cy.get('body').click(0, 0)
  })

//Status non Aktif - Aktif (Pegination 2)
  it('Berhasil merubah status pajak dari non aktif menjadi aktif dan tampil menjadi opsi di penjualan, pembelian dan kontak PG2', () =>{
    //mengunjungi halaman pajak
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Ubah ke pegination 2
    cy.get('[data-testid="NavigateNextIcon"]').click()
    //Ubah status pajak non aktif menjadi aktif
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Pajak.')
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

    //ke halaman penjualan
    cy.get('[data-testid="drawer-item-sales"]').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id="penjualan.0.tax"]').should('exist').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'Trim Pajak')
    cy.get('body').click(0, 0)

    //ke halaman biaya
    cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id = "details.0.tax_id"]').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'Trim Pajak')
    cy.get('body').click(0, 0)

    //ke halaman kirim uang kas dan bank
    cy.get('[data-testid="drawer-item-cash-bank"]').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').should('be.visible').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Kirim Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'Trim Pajak')
    cy.get('body').click(0, 0)

    //ke halaman terima uang kas dan bank
    cy.get('.css-1j72te2 > .MuiButtonBase-root').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Terima Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('contain', 'Trim Pajak')
    cy.get('body').click(0, 0)
  })

//Status Aktif - non Aktif (Pegination 1)
  it.only('Berhasil merubah status pajak dari aktif menjadi non aktif dan tidak tampil menjadi opsi di penjualan, pembelian dan kontak PG1', () =>{
    //mengunjungi halaman pajak
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Ubah status pajak non aktif menjadi aktif
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Pajak.')
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

    //ke halaman penjualan
    cy.get('[data-testid="drawer-item-sales"]').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id="penjualan.0.tax"]').should('exist').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'PPH 8')
    cy.get('body').click(0, 0)

    //ke halaman biaya
    cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id = "details.0.tax_id"]').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'PPH 8')
    cy.get('body').click(0, 0)

    //ke halaman kirim uang kas dan bank
    cy.get('[data-testid="drawer-item-cash-bank"]').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').should('be.visible').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Kirim Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'PPH 8')
    cy.get('body').click(0, 0)

    //ke halaman terima uang kas dan bank
    cy.get('.css-1j72te2 > .MuiButtonBase-root').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Terima Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'PPH 8')
    cy.get('body').click(0, 0)
  })

//Status non Aktif - Aktif (Pegination 2)
  it('Berhasil merubah status pajak dari aktif menjadi non aktif dan tidak tampil menjadi opsi di penjualan, pembelian dan kontak PG2', () =>{
    //mengunjungi halaman pajak
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Ubah ke pegination 2
    cy.get('[data-testid="NavigateNextIcon"]').click()
    //Ubah status pajak non aktif menjadi aktif
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Pajak.')
    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

    //ke halaman penjualan
    cy.get('[data-testid="drawer-item-sales"]').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id="penjualan.0.tax"]').should('exist').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'Trim Pajak')
    cy.get('body').click(0, 0)

    //ke halaman biaya
    cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[id = "details.0.tax_id"]').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'Trim Pajak')
    cy.get('body').click(0, 0)

    //ke halaman kirim uang kas dan bank
    cy.get('[data-testid="drawer-item-cash-bank"]').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').should('be.visible').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Kirim Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'Trim Pajak')
    cy.get('body').click(0, 0)

    //ke halaman terima uang kas dan bank
    cy.get('.css-1j72te2 > .MuiButtonBase-root').click()
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click()
    cy.get('ul[role="listbox"] > li[role="option"]').contains('Terima Uang').click()
    cy.get(':nth-child(2) > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').click()
    cy.get('ul[role="listbox"] > li').should('not.contain', 'Trim Pajak')
    cy.get('body').click(0, 0) 
  })

//Searching
  it('harus memunculkan text tidak ada data, ketika pencarian', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Pajak"]').type('hantu')
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('exist').and('contain', 'Tidak ada data')
  })

  it('Berhasil mencari keyword yang valid', () => {
   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
   cy.get('input[placeholder="Cari Pajak"]').type('penghasilan')
   cy.contains('penghasilan')  
  })

  it('Berhasil mencari keyword sebagian', ()=>{
  cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
   cy.get('input[placeholder="Cari Pajak"]').type('pen')
   cy.contains('pen') 
  })

  it('Berhasil mencari keyword dengan huruf besar dan kecil', ()=>{
  cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
   cy.get('input[placeholder="Cari Pajak"]').type('penGHAsiLAn')
   cy.contains('penghasilan') 
  })


//Pegination
it('Berhasil mendapatkan data pajak ketika next page', () => {
      cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('[data-testid="NavigateNextIcon"]').click()
      cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root')
      .invoke('text')
      .should('match', /^Menampilkan 11 - \d+ dari \d+ data\.$/);
    })
    
it('Berhasil mendapatkan data salesman halaman sebelumnya', () => {
      cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('[data-testid="NavigateNextIcon"]').click()
      cy.get('[data-testid="NavigateBeforeIcon"]').click()
      cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root').invoke('text').should('match', /^Menampilkan 1 - 10 dari \d+ data\.$/);
    })

//Status
  it('Harus bisa merubah toogle pemotongan dari non aktif menjadi aktif', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

    cy.get(':nth-child(1) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').scrollIntoView().click()

    cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Mengubah Status Pajak.')
  })

  it('Harus bisa merubah toogle pemotongan dari aktif menjadi non aktif', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

    cy.get(':nth-child(2) > :nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').scrollIntoView().click()

    cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Mengubah Status Pajak.')
  })
  })
  







 


  // it('harus berhasil mengambil daftar dropdown tax_sales_account', () => {
  //   // Navigasi ke submenu Pajak
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
  
  //   // Klik tombol tambah pajak
  //   cy.get('.MuiStack-root > .MuiButtonBase-root').click();
  
  //   // Klik pada dropdown tax_sales_account
  //   cy.get('[name="tax_sales_account"]').should('exist').click();
  
  //   // Cari elemen list yang muncul dalam dropdown
  //   cy.get('.MuiAutocomplete-option') // Selector elemen dropdown list (sesuai class)
  //     .should('be.visible') // Pastikan elemen terlihat
  //     .each((item, index) => {
  //       // Log setiap item untuk verifikasi
  //       cy.wrap(item).invoke('text').then((text) => {
  //         cy.log(`Item ${index + 1}: ${text}`); // Log teks setiap item
  //       });
  //     });
  

    //Pilih elemen spesifik (opsional)
    // cy.get(':nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
    //   .contains('li','1-10001 - Kas') // Ganti teks sesuai item yang ingin dipilih
    //   .click();

    // cy.get('.MuiAutocomplete-clearIndicator').click()
  //});


  // it('harus bisa membuka modal edit pajak dan lihat kesuaian design', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').should('exist').click()
  //   cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').should('exist').click()
  //   cy.get('#modal-title').should('exist').and('contain', 'Edit Pajak')
  //   cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist')
  //   cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Nama')
  //   cy.get(':nth-child(3) > .MuiFormLabel-root').should('exist').and('contain', 'Persentase Efektif %')
  //   cy.get(':nth-child(5) > .MuiFormLabel-root').should('exist').and('contain', 'Pemotongan')
  //   cy.get(':nth-child(7) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Penjualan')
  //   cy.get(':nth-child(9) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Pembelian')
  //   cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
  //   cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').and('contain', 'Ubah data')
  // })

  // it('harus gagal menambah pajak, semua field tidak di isi', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
  //   cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
  //   cy.get('[name="tax_name"]').should('exist').clear()
  //   // cy.get('[name="tax_effective_percentage"]').clear()
  //   cy.get('[name="tax_sales_account"]').click()
  //     .trigger('mouseover')
  //   cy.get('[name="tax_sales_account"]')
  //     .type('1-10102 - Cadangan Kerugian Piutang')
  //   cy.get('[name="tax_sales_account"]')
  //     .trigger('mouseover');
  //     cy.get(':nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
  //   cy.get('body').type('{esc}')

  //   cy.get('[name="tax_purchase_account"]').click()
  //   .trigger('mouseover')
  //   cy.get('[name="tax_purchase_account"]')
  //     .type('1-10102 - Cadangan Kerugian Piutang')
  //   cy.get('[name="tax_purchase_account"]')
  //     .trigger('mouseover');
  //     cy.get('.MuiAutocomplete-clearIndicator').click()
  //   cy.get('body').type('{esc}')
  //   cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
  //   // cy.get('#\\:rn\\:-helper-text').should('exist').and('contain', 'Nama is Required')
  //   cy.get('[name="tax_name"]')
  //     .should('have.attr', 'aria-describedby')
  //     .then((attr) => {
  //       cy.get(`#${attr}`)
  //         .should('be.visible')
  //         .and('contain', 'Nama is Required');
  //   });
  //   // cy.get('#\\:rr\\:-helper-text').should('exist').and('contain', 'Akun Pajak Penjualan is Required')
  //   cy.get('[name="tax_sales_account"]') // Pilih input berdasarkan atribut `name`
  //     .should('have.attr', 'aria-describedby') // Pastikan atribut `aria-describedby` ada
  //     .then((attr) => {
  //       cy.get(`#${attr}`) // Cari elemen teks helper menggunakan ID yang dirujuk
  //         .should('be.visible') // Pastikan helper text terlihat
  //         .and('contain', 'Nama is Required'); // Ganti dengan teks yang sesuai
  //   });

  //   // cy.get('#\\:rv\\:-helper-text').should('exist').and('contain', 'Akun Pajak Pembelian is Required')
  // })

  // it('harus berhasil edit pajak, semua field di isi', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
  //   cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
  //   cy.get('[name="tax_name"]').should('exist').clear()
  //   cy.get('[name="tax_name"]').should('exist').type('pajak tahunan')
  //   // cy.get('[name="tax_effective_percentage"]')
  //   //   .clear()
  //   // cy.get('[name="tax_effective_percentage"]')
  //   //   .type('30')
  //   cy.get('[name="tax_sales_account"]').click()
  //     .trigger('mouseover')
  //   cy.get('[name="tax_sales_account"]')
  //     .type('1-10102 - Cadangan Kerugian Piutang')
  //   cy.get('[name="tax_sales_account"]')
  //     .trigger('mouseover');
  //   cy.get('body').type('{esc}')

  //   cy.get('[name="tax_purchase_account"]').click()
  //   .trigger('mouseover')
  //   cy.get('[name="tax_purchase_account"]')
  //     .type('1-10102 - Cadangan Kerugian Piutang')
  //   cy.get('[name="tax_purchase_account"]')
  //     .trigger('mouseover');
  //   cy.get('body').type('{esc}')
  //   cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
  // })

  // it('harus berhasil edit pajak, merubah toogle potongan dari aktif menjadi non aktif', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
  //   cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
  //   cy.get('[name="tax_deduction"]').click()
  //   // Pastikan toggle aktif setelah diklik
  //   cy.get('[name="tax_deduction"]')
  //     .should('not.be.checked');
    
  //   cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
  //   cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
  //   cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
  //   // Pastikan toggle aktif setelah diklik
  //   cy.get('[name="tax_deduction"]')
  //   .should('be.checked');
  // })

  // it('harus menampilkan data yang sesuai dengan data yang ada', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  //   cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
  // })


// describe('[PENGATURAN-PAJAK] - Cari pajak, tidak ada data', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus memunculkan text tidak ada data, ketika pencarian', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('exist').and('contain', 'Tidak ada data')
//     cy.get('input[placeholder="Cari Pajak"]').type('pajaka 100')
//     cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('exist').and('contain', 'Tidak ada data')

//   })
// })

// describe('[PENGATURAN-PAJAK] - Buka Tambah Pajak', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa membuka halaman tambah pajak', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//   })
// })

// describe('[PENGATURAN-PAJAK] - Chek modal tambah pajak sesuaikan dengan design', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus sesuai dengan design', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('#modal-title').should('exist').and('contain', 'Tambah Pajak Baru')
//     cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist')
//     cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Nama')
//     cy.get(':nth-child(3) > .MuiFormLabel-root').should('exist').and('contain', 'Persentase Efektif %')
//     cy.get(':nth-child(5) > .MuiFormLabel-root').should('exist').and('contain', 'Pemotongan')
//     cy.get(':nth-child(7) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Penjualan')
//     cy.get(':nth-child(9) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Pembelian')
//     cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').and('contain', 'Tambah Baru')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Batal tambah pajak', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus menutup modal tambah pajak', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('.MuiButton-text').should('exist').click()
//   })
// })

// describe('[PENGATURAN-PAJAK] - Tambah Pajak, toggle pemotongan aktif', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil menambah pajak, semua field di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('[name="tax_name"]').should('exist').type('penghasilan')
//     cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
//     cy.get('[name="tax_deduction"').should('exist').click()
//     cy.get('[name="tax_sales_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_sales_account"]').trigger('change')
//     cy.get('[name="tax_purchase_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_purchase_account"]').trigger('change')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//     cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
//     cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').should('exist').and('contain', 'Cadangan Kerugian Piutang')

//   })
// })

// describe('[PENGATURAN-PAJAK] - Hapus Dropdown', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678')
//     cy.visitDashboard()
//     navigatePengaturan()
//   });

//   it('harus berhasil mengambil daftar dropdown tax_sales_account', () => {
//     // Navigasi ke submenu Pajak
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
  
//     // Klik tombol tambah pajak
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click();
  
//     // Klik pada dropdown tax_sales_account
//     cy.get('[name="tax_sales_account"]').should('exist').click();
  
//     // Cari elemen list yang muncul dalam dropdown
//     cy.get('.MuiAutocomplete-option') // Selector elemen dropdown list (sesuai class)
//       .should('be.visible') // Pastikan elemen terlihat
//       .each((item, index) => {
//         // Log setiap item untuk verifikasi
//         cy.wrap(item).invoke('text').then((text) => {
//           cy.log(`Item ${index + 1}: ${text}`); // Log teks setiap item
//         });
//       });
  
//     // Pilih elemen spesifik (opsional)
//     cy.get('.MuiAutocomplete-option')
//       .contains('1-10001 - Kas') // Ganti teks sesuai item yang ingin dipilih
//       .click();

//     cy.get('.MuiAutocomplete-clearIndicator').click()
//   });
  
// })

// describe('[PENGATURAN-PAJAK] - Tambah Pajak, toggle pemotongan tidak aktif', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil menambah pajak, semua field di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('[name="tax_name"]').should('exist').type('penghasilan')
//     cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
//     cy.get('[name="tax_sales_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_sales_account"]').trigger('change')
//     cy.get('[name="tax_purchase_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_purchase_account"]').trigger('change')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//     cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
//     cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').should('exist').and('contain', 'Cadangan Kerugian Piutang')
//     cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')

//   })
// })

// describe('[PENGATURAN-PAJAK] - Rubah toogle pemotongan dari aktif menjadi non aktif', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Harus bisa merubah toogle pemotongan dari aktif menjadi non aktif', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

//     cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6)')
//     .scrollIntoView()
//     .click()

//     cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Mengubah Status Pajak.')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Rubah toogle pemotongan dari non aktif menjadi aktif', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Harus bisa merubah toogle pemotongan dari non aktif menjadi aktif', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

//     cy.get('.MuiTableBody-root > :nth-child(2) > :nth-child(6)')
//     .scrollIntoView()
//     .click()

//     cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Mengubah Status Pajak.')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Validasi Tambah Pajak, nama tidak di isi ', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil menambah pajak, semua field di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('[name="tax_name"]').should('exist').type(' ')
//     cy.get('[name="tax_effective_percentage"]').should('exist').type('50')
//     cy.get('[name="tax_deduction"').should('exist').click()
//     cy.get('[name="tax_sales_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_sales_account"]').trigger('change')
//     cy.get('[name="tax_purchase_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_purchase_account"]').trigger('change')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//     cy.get('#tax_effective_percentage-helper-text').should('be.visible')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Validasi Tambah Pajak, Persentase Efektif % tidak di isi ', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil menambah pajak, Persentase Efektif % field di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('[name="tax_name"]').should('exist').type('pajak')
//     cy.get('[name="tax_effective_percentage"]').should('exist').type('')
//     cy.get('[name="tax_deduction"').should('exist').click()
//     cy.get('[name="tax_sales_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_sales_account"]').trigger('change')
//     cy.get('[name="tax_purchase_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_purchase_account"]').trigger('change')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//     cy.get('#tax_effective_percentage-helper-text').should('be.visible')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Validasi Tambah Pajak, Persentase Efektif %  di isi spasi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus gagal menambah pajak, field Persentase Efektif %  di isi spasi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('[name="tax_name"]').should('exist').type('pajak')
//     cy.get('[name="tax_effective_percentage"]').should('exist').type(' ')
//     cy.get('[name="tax_deduction"').should('exist').click()
//     cy.get('[name="tax_sales_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_sales_account"]').trigger('change')
//     cy.get('[name="tax_purchase_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_purchase_account"]').trigger('change')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//     cy.get('#tax_effective_percentage-helper-text').should('be.visible')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Hapus Pajak', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Harus berhasil menghapus pajak', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click()
//     cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(7)')
//     .scrollIntoView()
//     cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(7) > .MuiButtonBase-root').should('exist').click()

//   })
// })

// describe('[PENGATURAN-PAJAK] - Membuka halaman Pengaturan Pajak dan melihat kesesuaian dengan design yang ada', () => {
//   const navigatePengaturan = () => {
//       cy.get('[data-testid="drawer-item-settings"]').click();
//     };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//     });

//   it('Chek kesesuainan halaman Pengaturan Pajak dengan design yang ada', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('input[placeholder="Cari Pajak"]')
//     cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Pajak')
//     cy.get('.css-16laxg8-MuiTypography-root').should('be.visible').and('contain', 'Semua Pajak')
//     cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
//     cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Persentase Efektif %')
//     cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible').and('contain', 'Akun Pajak Penjualan')
//     cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('be.visible').and('contain', 'Akun Pajak Pembelian')
//     cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should('be.visible').and('contain', 'Pemotongan')
//     cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)')
//       .scrollIntoView()
//       .should('be.visible')
//       .and('contain', 'Status')
//     cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)')
//     .scrollIntoView()
//     .should('be.visible')
//     .and('contain', 'Aksi')
//   });
// });

// describe('[PENGATURAN-PAJAK] - Cari pajak, ada data', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus memunculkan list data pajak', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('input[placeholder="Cari Pajak"]').type('penghasilan')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Edit pajak, lihat kesesuaian design ', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Membuka modal edit pajak, pastikan sudah sesuai dengan design yang ada', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft').should('exist').click()
//     cy.get('#modal-title').should('exist').and('contain', 'Detail Pajak')
//     cy.get('.css-1lu792j-MuiGrid2-root > :nth-child(1) > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Nama')
//     cy.get('.css-1uvjw59-MuiGrid2-root > :nth-child(1) > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Penjualan')
//     cy.get('.css-1lu792j-MuiGrid2-root > :nth-child(1) > :nth-child(1) > .MuiTypography-root').should('exist').and('contain', 'penghasilan')
//     cy.get('.css-1uvjw59-MuiGrid2-root > :nth-child(1) > :nth-child(1) > .MuiTypography-root').should('exist').and('contain', 'Cadangan Kerugian Piutang')
//     cy.get('.css-1lu792j-MuiGrid2-root > :nth-child(1) > :nth-child(2) > .MuiFormLabel-root').should('exist').and('contain', 'Persentase Efektif %')
//     cy.get('.css-1uvjw59-MuiGrid2-root > :nth-child(1) > :nth-child(2) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Pembelian')
//     cy.get('.css-1lu792j-MuiGrid2-root > :nth-child(1) > :nth-child(2) > .MuiTypography-root').should('exist').and('contain', '10')
//     cy.get('.css-1uvjw59-MuiGrid2-root > :nth-child(1) > :nth-child(2) > .MuiTypography-root').should('exist').and('contain', 'Cadangan Kerugian Piutang')
//     cy.get(':nth-child(3) > .MuiFormLabel-root').should('exist').and('contain', 'Terdapat Pemotongan')
//     cy.get('.css-1lu792j-MuiGrid2-root > :nth-child(1) > :nth-child(3) > .MuiTypography-root').should('exist').and('contain', 'Tidak')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Batal edit pajak', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Harus berhasil menutup edit modal ketika menekan tombol batalkan', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft').should('exist').click()
//     cy.get('.MuiButton-text').should('exist').click()
//     cy.get('.MuiTypography-h5').should('exist').and('contain', 'Pengaturan Pajak')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Tutup modal edit pajak menggunakan tombole close pada modal', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Harus berhasil menutup modal edit pajak menggunakan tombol close pada modal', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft').should('exist').click()
//     cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist').click()
//   })
// })

// describe('[PENGATURAN-PAJAK] - Buka modal edit pajak', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa membuka modal edit pajak dan lihat kesuaian design', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').should('exist').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').should('exist').click()
//     cy.get('#modal-title').should('exist').and('contain', 'Edit Pajak')
//     cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist')
//     cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Nama')
//     cy.get(':nth-child(3) > .MuiFormLabel-root').should('exist').and('contain', 'Persentase Efektif %')
//     cy.get(':nth-child(5) > .MuiFormLabel-root').should('exist').and('contain', 'Pemotongan')
//     cy.get(':nth-child(7) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Penjualan')
//     cy.get(':nth-child(9) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Pembelian')
//     cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').and('contain', 'Ubah data')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Tambah Pajak, toggle pemotongan tidak aktif', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil menambah pajak, semua field di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
//     cy.get('[name="tax_name"]').should('exist').clear()
//     cy.get('[name="tax_effective_percentage"]').clear()
//     cy.get('[name="tax_sales_account"]').click()
//       .trigger('mouseover')
//     cy.get('[name="tax_sales_account"]')
//       .type('1-10102 - Cadangan Kerugian Piutang')
//     cy.get('[name="tax_sales_account"]')
//       .trigger('mouseover');
//       cy.get(':nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//     cy.get('body').type('{esc}')

//     cy.get('[name="tax_purchase_account"]').click()
//     .trigger('mouseover')
//     cy.get('[name="tax_purchase_account"]')
//       .type('1-10102 - Cadangan Kerugian Piutang')
//     cy.get('[name="tax_purchase_account"]')
//       .trigger('mouseover');
//       cy.get('.MuiAutocomplete-clearIndicator').click()
//     cy.get('body').type('{esc}')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
//     cy.get('#\\:rn\\:-helper-text').should('exist').and('contain', 'Nama is Required')
//     cy.get('#\\:rr\\:-helper-text').should('exist').and('contain', 'Akun Pajak Penjualan is Required')
//     cy.get('#\\:rv\\:-helper-text').should('exist').and('contain', 'Akun Pajak Pembelian is Required')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Edit Pajak, semua field tidak di isi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Edit Kontak" page for each test
//   });

//   it('harus gagal edit pajak, semua field tidak di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
//     cy.get('[name="tax_name"]').should('exist').clear()
//     cy.get('[name="tax_name"]').should('exist').type('pajak tahunan')
//     cy.get('[name="tax_effective_percentage"]')
//       .clear()
//     cy.get('[name="tax_effective_percentage"]')
//       .type('30')
//     cy.get('[name="tax_sales_account"]').click()
//       .trigger('mouseover')
//     cy.get('[name="tax_sales_account"]')
//       .type('1-10102 - Cadangan Kerugian Piutang')
//     cy.get('[name="tax_sales_account"]')
//       .trigger('mouseover');
//     cy.get('body').type('{esc}')

//     cy.get('[name="tax_purchase_account"]').click()
//     .trigger('mouseover')
//     cy.get('[name="tax_purchase_account"]')
//       .type('1-10102 - Cadangan Kerugian Piutang')
//     cy.get('[name="tax_purchase_account"]')
//       .trigger('mouseover');
//     cy.get('body').type('{esc}')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
//   })
// })

// describe('[PENGATURAN-PAJAK] - Edit Pajak, semua field di isi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Edit Kontak" page for each test
//   });

//   it('harus berhasil edit pajak, semua field di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
//     cy.get('[name="tax_name"]').should('exist').clear()
//     cy.get('[name="tax_name"]').should('exist').type('pajak tahunan')
//     cy.get('[name="tax_effective_percentage"]')
//       .clear()
//     cy.get('[name="tax_effective_percentage"]')
//       .type('30')
//     cy.get('[name="tax_sales_account"]').click()
//       .trigger('mouseover')
//     cy.get('[name="tax_sales_account"]')
//       .type('1-10102 - Cadangan Kerugian Piutang')
//     cy.get('[name="tax_sales_account"]')
//       .trigger('mouseover');
//     cy.get('body').type('{esc}')

//     cy.get('[name="tax_purchase_account"]').click()
//     .trigger('mouseover')
//     cy.get('[name="tax_purchase_account"]')
//       .type('1-10102 - Cadangan Kerugian Piutang')
//     cy.get('[name="tax_purchase_account"]')
//       .trigger('mouseover');
//     cy.get('body').type('{esc}')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
//   })
// })

// describe('[PENGATURAN-PAJAK] - Edit Pajak, setting toogle pemotongan dari aktif menjadi tidak aktif', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil edit pajak, semua field di isi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
//     cy.get('[name="tax_deduction"]').click()
//     // Pastikan toggle aktif setelah diklik
//     cy.get('[name="tax_deduction"]')
//       .should('be.checked');
    
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
//     // Pastikan toggle aktif setelah diklik
//     cy.get('[name="tax_deduction"]')
//     .should('not.be.checked');
//   })
// })

// describe('[PENGATURAN-PAJAK] - Edit Pajak, setting toogle pemotongan dari tidak aktif menjadi aktif', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil edit pajak, merubah toogle potongan dari aktif menjadi non aktif', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
//     cy.get('[name="tax_deduction"]').click()
//     // Pastikan toggle aktif setelah diklik
//     cy.get('[name="tax_deduction"]')
//       .should('not.be.checked');
    
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
//     cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
//     cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
//     // Pastikan toggle aktif setelah diklik
//     cy.get('[name="tax_deduction"]')
//     .should('be.checked');
//   })
// })

// describe('[PENGATURAN-PAJAK] - Validasi Tambah Pajak, nama di isi spasi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus gagal menambah pajak, field nama di isi spasi', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//     cy.get('[name="tax_name"]').should('exist').type(' ')
//     cy.get('[name="tax_effective_percentage"]').should('exist').type('50')
//     cy.get('[name="tax_deduction"').should('exist').click()
//     cy.get('[name="tax_sales_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_sales_account"]').trigger('change')
//     cy.get('[name="tax_purchase_account"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="tax_purchase_account"]').trigger('change')
//     cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//     cy.get('#tax_name-helper-text').should('be.visible')
//   })
// })

// describe('[PENGATURAN-PAJAK] - Tambah Pajak, toggle pemotongan tidak aktif, sebanyak 3 kali', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil menambah pajak, semua field di isi sebanyak 10 kali', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     for(let i = 0; i < 10; i++) {
//       cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//       cy.get('[name="tax_name"]').should('exist').type('penghasilan')
//       cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
//       cy.get('[name="tax_sales_account"]').click()
//       cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//       .scrollIntoView()
//       .should('exist')
//       .click();
//       cy.get('[name="tax_sales_account"]').trigger('change')
//       cy.get('[name="tax_purchase_account"]').click()
//       cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//       .scrollIntoView()
//       .should('exist')
//       .click();
//       cy.get('[name="tax_purchase_account"]').trigger('change')
//       cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//       cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
//       cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').should('exist').and('contain', 'Cadangan Kerugian Piutang')
//       cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
//     }

//   })
// })

// describe('[PENGATURAN-PAJAK] - Tambah Pajak, toggle pemotongan tidak aktif, sebanyak 3 kali', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus berhasil menambah pajak, semua field di isi sebanyak 10 kali', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     for(let i = 0; i < 10; i++) {
//       cy.get('.MuiStack-root > .MuiButtonBase-root').click()
//       cy.get('[name="tax_name"]').should('exist').type('penghasilan')
//       cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
//       cy.get('[name="tax_sales_account"]').click()
//       cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//       .scrollIntoView()
//       .should('exist')
//       .click();
//       cy.get('[name="tax_sales_account"]').trigger('change')
//       cy.get('[name="tax_purchase_account"]').click()
//       cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//       .scrollIntoView()
//       .should('exist')
//       .click();
//       cy.get('[name="tax_purchase_account"]').trigger('change')
//       cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
//       cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
//       cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').should('exist').and('contain', 'Cadangan Kerugian Piutang')
//       cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
//     }

//   })
// })

// describe('[PENGATURAN-PAJAK] - next page table pajak', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus menampilkan data yang sesuai dengan data yang ada', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
//   })
// })

// describe('[PENGATURAN-PAJAK] - next page table pajak', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus menampilkan data yang sesuai dengan data yang ada', () => {
//     cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
//     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
//   })
// })




