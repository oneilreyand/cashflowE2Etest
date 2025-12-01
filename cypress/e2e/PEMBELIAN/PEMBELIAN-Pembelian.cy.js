const companyId = Cypress.env('companyId');

describe('PEMBELIAN', () => {
    beforeEach(() => {
        cy.handleUncaughtExceptions()
        cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
        cy.visitDashboard(companyId);
        cy.get('[data-testid="drawer-item-purchases"]').click()
    });

    it('Pengujian Penulisan Komponen Statis', () => {
        cy.get('.MuiTypography-h5 > span').should('have.text', 'Pembelian')
        cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Pembelian')
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root').should('have.text', 'Belum Dibayar')
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root').should('have.text', 'Telat Dibayar')
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root').should('have.text', 'Pembayaran (30 Hari Terakhir)')
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2').should('have.text', 'Total Pembelian')
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2').should('have.text', 'Total Pembelian')
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2').should('have.text', 'Total Pembelian')
        cy.get('.MuiTabs-flexContainer > :nth-child(1)').should('have.text', 'Semua')
        cy.get('.MuiTabs-flexContainer > :nth-child(2)').should('have.text', 'Belum Dibayar')
        cy.get('.MuiTabs-flexContainer > :nth-child(3)').should('have.text', 'Jatuh Tempo')
        cy.get('.MuiTabs-flexContainer > :nth-child(4)').should('have.text', 'Lunas')
        cy.get('.MuiTabs-flexContainer > :nth-child(5)').should('have.text', 'Dibayar Sebagian')
        cy.get('.MuiTabs-flexContainer > :nth-child(6)').should('have.text', 'Void')
        cy.contains('Pembelian Baru').should('be.visible')
        cy.get('.MuiBox-root > .MuiButtonBase-root').should('have.text', 'Filter Tanggal')
        cy.get('input[placeholder="Cari"]').should('be.visible')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('have.text', 'Tanggal')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('have.text', 'Nomor')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('have.text', 'Nama Supplier')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('have.text', 'Tgl Jatuh Tempo')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should('have.text', 'Status')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should('have.text', 'Sisa Tagihan')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)').should('have.text', 'Total Tagihan')
    });

    it('Pengujian Skeleton Loading Saat Fetch Data', () => {
        cy.reload()
        // Pastikan skeleton muncul
        cy.get('.MuiSkeleton-root').should('be.visible');
        // Pastikan jumlah skeleton sesuai ekspektasi (misalnya 5 item)
        cy.get('.MuiSkeleton-root').should('have.length', 27);
        // Tunggu skeleton hilang sebelum lanjut tes
        cy.get('.MuiSkeleton-root', { timeout: 10000 }).should('not.exist');
        // Baru validasi isi tabel
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
    });

    it('Pengujian Breadcrumbs Pembelian Ke Beranda', () => {
        cy.get('.MuiTypography-h5 > span').should('have.text', 'Pembelian')
        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()
        cy.get('.MuiTypography-h5').should('have.text', 'Beranda')
    });

    it.only('Pengujian Card Belum Dibayar', () => {
        cy.reload()

        cy.intercept('GET', '**api/pembelian/overview**').as('getCardBelumDibayarAwal')
        cy.wait('@getCardBelumDibayarAwal').then((interception) => {
            const body = interception.response.body
            const apiBelumDibayarNominal = body.belumDibayar.nominal
            const apiBelumDibayarBadge = body.belumDibayar.total

            const expectedBadge = apiBelumDibayarBadge > 99 ? '99+' : String(apiBelumDibayarBadge)
            const expectedNominal = new Intl.NumberFormat('id-ID').format(apiBelumDibayarNominal)

            cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
                .should('have.text', expectedBadge)

            cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
                .should('have.text', `Rp\u00A0${expectedNominal}`)
        })

        cy.contains('Pembelian Baru').click();

        cy.get('#idSupplier').click()
        cy.get('[data-value]').eq(1).click()
        cy.get('#address').type('Alamat Penagihan')
        cy.get('[id="pembelian.0.tipe_pembelian"]').click()
        cy.get('[data-value]').eq(2).click()
        cy.get('input[placeholder="Cari Produk"]').click()
        cy.wait(1000000000000)
        cy.get('[data-option-index="0"]').click();
        cy.get('[id="pembelian.0.gudang_id"]').click();
        cy.get('[tabindex="0"]').click();

    })



});
