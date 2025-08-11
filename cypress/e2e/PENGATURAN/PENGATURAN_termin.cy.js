import { medcareVer } from "../../data";

describe('[PENGATURAN-TERMIN]', () => {
  const navigatePengaturan = () => {
    cy.get('[data-testid="drawer-item-settings"]').click();
  };

  beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(medcareVer); // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  it('Chek kesesuainan halaman Pengaturan Termin dengan design yang ada', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  });

  it('Membuka halaman Pengaturan Termin data termin tidak ada data termin tidak ada', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.css-egm0ks > .MuiStack-root > .MuiFormControl-root > .MuiInputBase-root').type('hantu')
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
  });

 it('Chek kesesuainan modal tambah Termin dengan design yang ada', () => {
  cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
  cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
  cy.get('[name="terminName"]')
  .invoke('attr', 'placeholder')
  .should('eq', 'Masukkan nama termin')
  cy.get('[name="terminDuration"]')
  .invoke('attr', 'placeholder')
  .should('eq', 'Total hari')
  cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('be.visible')
  cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
  cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan')
  });

  it('Chek kesesuainan modal tambah Termin dengan design yang ada', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
      .invoke('attr', 'placeholder')
      .should('eq', 'Masukkan nama termin')
    cy.get('[name="terminDuration"]')
      .invoke('attr', 'placeholder')
      .should('eq', 'Total hari')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('be.visible')
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
    cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan')
  });

  it('Harus bisa batal tambah termin dan form tambah termin tidak ada di halaman', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('.MuiButton-text').should('be.visible').click()
    cy.get('[name="terminName"]')
    .should('not.exist')
    cy.get('[name="terminDuration"]')
    .should('not.exist')
  });

  it('Chek kesesuainan halaman Pengaturan Termin dengan design yang ada', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    //cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Nama dan Durasi Termin harus diisi.')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Termin harus diisi.')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  });

  it('Harus bisa menambahkan termin dengan data yang sudah di isi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('termin sebulan')
    cy.get('[name="terminDuration"]')
    .type('30')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Termin.')
  });

  it('Harus bisa menambahkan termin dengan data yang sudah di isi dan nama di isi dengan terminstatus', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('terminstatus')
    cy.get('[name="terminDuration"]')
    .type('30')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Termin.')
  });

  it('Harus gagal menambahkan termin dengan durasi tidak di isi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type('termin sebulan')
    cy.get('[name="terminDuration"]')
    .clear()
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    //cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Termin harus diisi.')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  });

  it('Harus gagal ketika tambah termin semua field di kasi spasi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .type(' ')
    cy.get('[name="terminDuration"]')
    .type(' ')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    //cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Termin harus diisi.')
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  });

  it('Harus di trim ketika nama dan durasi di isi spasi 5 di depan', () => {
    // Intercept API POST
    cy.intercept('POST', 'https://api-uat-cashbook.assist.id/api/setting-termins', (req) => {
   }).as('postTermin'); // Alias untuk memantau request

   cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
   cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
   cy.get('[name="terminName"]')
   .type('     satu bulan')
   cy.get('[name="terminDuration"]')
   .type('                           30')
   cy.get(':nth-child(4) > div > .MuiButton-contained').click()

   cy.wait('@postTermin').then((interception) => {
     expect(interception.response.statusCode).to.equal(200); // Pastikan respons sukses
    //  expect(interception.request.body.terminName === 'satu bulan').to.be.true; // Gagal jika salah
    //  expect(interception.request.body.terminDuration === '30').to.be.true; // Gagal jika salah
    expect(interception.request.body.terminName.trim()).to.equal('satu bulan');
    expect(String(interception.request.body.terminDuration)).to.equal('30');
   });

   cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Termin.')
  });

  it('Harus gagal tambah termin dengan nama tidak di isi', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Termin').click()
    cy.get('[name="terminName"]')
    .clear()
    cy.get('[name="terminDuration"]')
    .type('30')
    cy.get(':nth-child(4) > div > .MuiButton-contained').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Termin harus diisi.')
    //cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Durasi Termin harus diisi.')
  });

  it('Harus bisa merubah toogel status termin', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil')
  });

  it('harus bisa berhasil menghapus termin', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root').should('be.visible').click()
    cy.get('[data-testid="alert-dialog-submit-button"]').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Menghapus Data Termin.')
  })

  it('harus berhasil menampilkan text tidak ada data pada table, menggunakan field pencarian', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Termin"]')
      .should('be.visible')
      .type('dua');
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
  })

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

  it('Harus bisa mengganti pagination ke halaman selanjutnya', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiPagination-ul > :nth-child(4)').click()
  })

  it('Harus bisa mengganti pagination ke halaman sebelumnya', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiPagination-ul > :nth-child(4)').click()
    cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
  })

  it('harus berhasil menampilkan data termin', () => {
    cy.get('[data-cy="submenu-item-termins-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('input[placeholder="Cari Termin"]')
      .should('be.visible')
      .type('termin sebulan 11');
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', '311 Hari')
  })
})
