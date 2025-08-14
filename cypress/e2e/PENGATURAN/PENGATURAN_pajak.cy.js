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

  it.only('Cek kesesuainan halaman Pengaturan Pajak dengan design yang ada', () => {
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

  it('Harus memunculkan text tidak ada data', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('exist').and('contain', 'Tidak ada data')

  })
  it('harus memunculkan text tidak ada data, ketika pencarian', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('exist').and('contain', 'Tidak ada data')
    cy.get('input[placeholder="Cari Pajak"]').type('pajaka 100')
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('exist').and('contain', 'Tidak ada data')

  })

  it('harus bisa membuka halaman tambah pajak', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
  })

  it('modal tambah pajak harus sesuai dengan design', () => {
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

  it('harus berhasil menutup modal tambah pajak', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiButton-text').should('exist').click()
  })

  it('harus berhasil menambah pajak, semua field di isi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('penghasilan')
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

  it('harus berhasil mengambil daftar dropdown tax_sales_account', () => {
    // Navigasi ke submenu Pajak
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
  
    // Klik tombol tambah pajak
    cy.get('.MuiStack-root > .MuiButtonBase-root').click();
  
    // Klik pada dropdown tax_sales_account
    cy.get('[name="tax_sales_account"]').should('exist').click();
  
    // Cari elemen list yang muncul dalam dropdown
    cy.get('.MuiAutocomplete-option') // Selector elemen dropdown list (sesuai class)
      .should('be.visible') // Pastikan elemen terlihat
      .each((item, index) => {
        // Log setiap item untuk verifikasi
        cy.wrap(item).invoke('text').then((text) => {
          cy.log(`Item ${index + 1}: ${text}`); // Log teks setiap item
        });
      });
  
    //Pilih elemen spesifik (opsional)
    // cy.get(':nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
    //   .contains('li','1-10001 - Kas') // Ganti teks sesuai item yang ingin dipilih
    //   .click();

    // cy.get('.MuiAutocomplete-clearIndicator').click()
  });

  // it.only('Harus bisa merubah toogle pemotongan dari non aktif menjadi aktif', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

  //   cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6)')
  //   .scrollIntoView()
  //   .click()

  //   cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Mengubah Status Pajak.')
  // })

  // it.only('Harus bisa merubah toogle pemotongan dari aktif menjadi non aktif', () => {
  //   cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

  //   cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6)')
  //   .scrollIntoView()
  //   .click()

  //   cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Mengubah Status Pajak.')
  // })

  it('harus gagal menambah pajak, field Persentase Efektif %  di isi spasi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type('pajak')
    cy.get('[name="tax_effective_percentage"]').should('exist').type(' ')
    // cy.get('[name="tax_deduction"').should('exist').click()
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
    cy.get('#tax_effective_percentage-helper-text').should('be.visible')
  })

  it('harus memunculkan list data pajak', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Pajak"]').type('penghasilan')
  })

  it('Harus berhasil menutup edit modal ketika menekan tombol batalkan', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft').should('exist').click()
    cy.get('.MuiButton-text').should('exist').click()
    cy.get('.MuiTypography-h5').should('exist').and('contain', 'Pengaturan Pajak')
  })

  it('Harus berhasil menutup modal edit pajak menggunakan tombol close pada modal', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft').should('exist').click()
    cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist').click()
  })

  it('harus bisa membuka modal edit pajak dan lihat kesuaian design', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').should('exist').click()
    cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').should('exist').click()
    cy.get('#modal-title').should('exist').and('contain', 'Edit Pajak')
    cy.get('.css-1j72te2 > .MuiButtonBase-root').should('exist')
    cy.get('.MuiGrid2-container > :nth-child(1) > .MuiFormLabel-root').should('exist').and('contain', 'Nama')
    cy.get(':nth-child(3) > .MuiFormLabel-root').should('exist').and('contain', 'Persentase Efektif %')
    cy.get(':nth-child(5) > .MuiFormLabel-root').should('exist').and('contain', 'Pemotongan')
    cy.get(':nth-child(7) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Penjualan')
    cy.get(':nth-child(9) > .MuiFormLabel-root').should('exist').and('contain', 'Akun Pajak Pembelian')
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
    cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').and('contain', 'Ubah data')
  })

  it('harus gagal menambah pajak, semua field tidak di isi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
    cy.get('[name="tax_name"]').should('exist').clear()
    // cy.get('[name="tax_effective_percentage"]').clear()
    cy.get('[name="tax_sales_account"]').click()
      .trigger('mouseover')
    cy.get('[name="tax_sales_account"]')
      .type('1-10102 - Cadangan Kerugian Piutang')
    cy.get('[name="tax_sales_account"]')
      .trigger('mouseover');
      cy.get(':nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
    cy.get('body').type('{esc}')

    cy.get('[name="tax_purchase_account"]').click()
    .trigger('mouseover')
    cy.get('[name="tax_purchase_account"]')
      .type('1-10102 - Cadangan Kerugian Piutang')
    cy.get('[name="tax_purchase_account"]')
      .trigger('mouseover');
      cy.get('.MuiAutocomplete-clearIndicator').click()
    cy.get('body').type('{esc}')
    cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
    // cy.get('#\\:rn\\:-helper-text').should('exist').and('contain', 'Nama is Required')
    cy.get('[name="tax_name"]')
      .should('have.attr', 'aria-describedby')
      .then((attr) => {
        cy.get(`#${attr}`)
          .should('be.visible')
          .and('contain', 'Nama is Required');
    });
    // cy.get('#\\:rr\\:-helper-text').should('exist').and('contain', 'Akun Pajak Penjualan is Required')
    cy.get('[name="tax_sales_account"]') // Pilih input berdasarkan atribut `name`
      .should('have.attr', 'aria-describedby') // Pastikan atribut `aria-describedby` ada
      .then((attr) => {
        cy.get(`#${attr}`) // Cari elemen teks helper menggunakan ID yang dirujuk
          .should('be.visible') // Pastikan helper text terlihat
          .and('contain', 'Nama is Required'); // Ganti dengan teks yang sesuai
    });

    // cy.get('#\\:rv\\:-helper-text').should('exist').and('contain', 'Akun Pajak Pembelian is Required')
  })

  it('harus gagal edit pajak, semua field tidak di isi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_name"]').should('exist').type('pajak tahunan')
    cy.get('[name="tax_effective_percentage"]')
      .clear()
    cy.get('[name="tax_effective_percentage"]')
      .type('30')
    cy.get('[name="tax_sales_account"]').click()
      .trigger('mouseover')
    cy.get('[name="tax_sales_account"]')
      .type('1-10102 - Cadangan Kerugian Piutang')
    cy.get('[name="tax_sales_account"]')
      .trigger('mouseover');
    cy.get('body').type('{esc}')

    cy.get('[name="tax_purchase_account"]').click()
    .trigger('mouseover')
    cy.get('[name="tax_purchase_account"]')
      .type('1-10102 - Cadangan Kerugian Piutang')
    cy.get('[name="tax_purchase_account"]')
      .trigger('mouseover');
    cy.get('body').type('{esc}')
    cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
  })

  it('harus berhasil edit pajak, semua field di isi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
    cy.get('[name="tax_name"]').should('exist').clear()
    cy.get('[name="tax_name"]').should('exist').type('pajak tahunan')
    // cy.get('[name="tax_effective_percentage"]')
    //   .clear()
    // cy.get('[name="tax_effective_percentage"]')
    //   .type('30')
    cy.get('[name="tax_sales_account"]').click()
      .trigger('mouseover')
    cy.get('[name="tax_sales_account"]')
      .type('1-10102 - Cadangan Kerugian Piutang')
    cy.get('[name="tax_sales_account"]')
      .trigger('mouseover');
    cy.get('body').type('{esc}')

    cy.get('[name="tax_purchase_account"]').click()
    .trigger('mouseover')
    cy.get('[name="tax_purchase_account"]')
      .type('1-10102 - Cadangan Kerugian Piutang')
    cy.get('[name="tax_purchase_account"]')
      .trigger('mouseover');
    cy.get('body').type('{esc}')
    cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
  })

  it('harus berhasil edit pajak, merubah toogle potongan dari aktif menjadi non aktif', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
    cy.get('[name="tax_deduction"]').click()
    // Pastikan toggle aktif setelah diklik
    cy.get('[name="tax_deduction"]')
      .should('not.be.checked');
    
    cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').click()
    cy.get(':nth-child(1) > .MuiTableCell-alignLeft > .MuiButtonBase-root').click()
    cy.get('.css-zc86o7-MuiGrid2-root > .MuiStack-root > .MuiButton-contained').click()
    // Pastikan toggle aktif setelah diklik
    cy.get('[name="tax_deduction"]')
    .should('be.checked');
  })

  it('harus gagal menambah pajak, field nama di isi spasi', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('[name="tax_name"]').should('exist').type(' ')
    cy.get('[name="tax_effective_percentage"]').should('exist').type('50')
    cy.get('[name="tax_deduction"').should('exist').click()
    cy.get('[name="tax_sales_account"]').click()
    cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_sales_account"]').trigger('change')
    cy.get('[name="tax_purchase_account"]').click()
    cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
    .scrollIntoView()
    .should('exist')
    .click();
    cy.get('[name="tax_purchase_account"]').trigger('change')
    cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
    cy.get('#tax_name-helper-text').should('be.visible')
  })

  it('harus berhasil menambah pajak, semua field di isi sebanyak 10 kali', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    for(let i = 0; i < 10; i++) {
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()
      cy.get('[name="tax_name"]').should('exist').type('penghasilan')
      cy.get('[name="tax_effective_percentage"]').should('exist').type('10')
      cy.get('[name="tax_sales_account"]').click()
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="tax_sales_account"]').trigger('change')
      cy.get('[name="tax_purchase_account"]').click()
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="tax_purchase_account"]').trigger('change')
      cy.get('.css-1j0u08r-MuiGrid2-root > div > .MuiButton-contained').should('exist').click()
      cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').should('exist').and('contain', 'Cadangan Kerugian Piutang')
      cy.get('.MuiAlert-message').should('exist').and('contain', 'Berhasil Menambahkan Data Pajak.')
    }
  })

  it('harus menampilkan data yang sesuai dengan data yang ada', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
  })

  it('Harus berhasil menghapus pajak', () => {
    cy.get('[data-cy="submenu-item-tax-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(7)')
    .scrollIntoView()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(7) > .MuiButtonBase-root').should('exist').click()
  })

})

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




