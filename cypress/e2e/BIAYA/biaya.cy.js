describe('Akuntansi Biaya', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click()
    }

    beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  //Kesesuaian UI
  it.only('Kesesuaian halaman biaya dengan design yang ada', () => {
     cy.get('[data-testid="drawer-item-expenses"] > .MuiListItemText-root > .MuiTypography-root').should('be.visible').click()
     //Header
     cy.get('.MuiTypography-h5 > span').should('contain','Biaya')
     cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
     //Card Content
     cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').within(() => {
        cy.get('.MuiBadge-root > .MuiTypography-root').should('be.visible').and('contain', 'Total Biaya Bulan Ini')
        cy.get('.MuiTypography-body2').should('be.visible').and('contain', 'Total')
        cy.get('.MuiTypography-h5').should('not.be.empty')
     })
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root').within(() => {
        cy.get('.MuiBadge-root > .MuiTypography-root').should('be.visible').and('contain', 'Biaya 30 Hari Terakhir')
        cy.get('.MuiTypography-body2').should('be.visible').and('contain', 'Total')
        cy.get('.MuiTypography-h5').should('not.be.empty')
     })
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root').within(() => {
        cy.get('.MuiBadge-root > .MuiTypography-root').should('be.visible').and('contain', 'Biaya Belum Dibayar')
        cy.get('.MuiTypography-body2').should('be.visible').and('contain', 'Total')
        cy.get('.MuiTypography-h5').should('not.be.empty')
     })
    //Biaya Baru
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').and('contain','Biaya Baru')
    //Tab
    cy.get('.MuiTabs-flexContainer').within(() => {
        cy.get('.Mui-selected').should('be.visible').and('contain','Semua')
        cy.get(':nth-child(2)').should('be.visible').and('contain','Belum Dibayar')
        cy.get(':nth-child(3)').should('be.visible').and('contain','Jatuh Tempo')
        cy.get(':nth-child(4)').should('be.visible').and('contain','Lunas')
        cy.get(':nth-child(5)').should('be.visible').and('contain','Dibayar Sebagian')
        cy.get(':nth-child(6)').should('be.visible').and('contain','Void')
    })
    //Filter Tanggal
    cy.get('.MuiBox-root > .MuiButtonBase-root').should('be.visible').and('contain','Filter Tanggal')
    //Search
    cy.get('input[placeholder="Cari"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Cari')
    //Tabel
    cy.get('.MuiTableContainer-root').within(() => {
        cy.get(':nth-child(1)').should('be.visible').and('contain','Tanggal')
        cy.get(':nth-child(2)').should('be.visible').and('contain','Nomor')
        cy.get(':nth-child(3)').should('be.visible').and('contain','Nama Pelanggan')
        cy.get(':nth-child(4)').should('be.visible').and('contain','Tgl Jatuh Tempo')
        cy.get(':nth-child(5)').should('be.visible').and('contain','Status')
        cy.get(':nth-child(6)').should('be.visible').and('contain','Sisa Tagihan')
        cy.get(':nth-child(7)').should('be.visible').and('contain','Total Tagihan')
    })
    //Pegination
    cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('be.visible')
    .invoke('text')
    .should('match', /Menampilkan\s+\d+\s*-\s*\d+\s+dari\s+\d+\s+data/)
    cy.get('[data-testid="NavigateNextIcon"]').should('be.visible')
    cy.get('[data-testid="NavigateBeforeIcon"]').should('be.visible')
  })

  it('Kesesuaian halaman detail biaya dengan design yang ada', () =>{
    
  })

  it('Kesesuaian halaman detail pembayaran dengan design yang ada', () =>{})
  it('Kesesuaian halaman penerimaan pembayaran dengan design yang ada', () =>{})
  it('Kesesuaian halaman biaya baru dengan design yang ada', () =>{})

})