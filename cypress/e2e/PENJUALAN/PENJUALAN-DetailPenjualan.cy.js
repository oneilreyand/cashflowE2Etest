const companyId = Cypress.env('companyId');

describe("Detail Penjualan", () => {
    beforeEach(() => {
        cy.handleUncaughtExceptions()
        cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
        cy.visitDashboard(companyId);
        cy.navigateToPenjualan();
        cy.contains('Penjualan Baru', { timeout: 20000 }).click();
    });

    it.skip('Melihat Data Lengkap Pada Detail Penjualan', () => {
        cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.reload();
        cy.wait('@waitPelanggan')
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`)
                .eq(1).click()
                .scrollIntoView({ block: 'center' }) // pastikan muncul di tengah viewport
                .should('be.visible') // pastikan visible
                .click({ force: true }); // bypass overlay check kalau masih ketutup

        //cy.get('#idPelanggan').trigger('change')
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        // cy.get('.MuiButton-contained').click();

        // // Intercept API penjualan
        // cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

        // Submit
        // cy.get('[data-testid="alert-dialog-submit-button"]').click();
        // cy.get('.MuiAlert-message').should('have.text', 'Penjualan berhasil ditambahkan')

        // // Tunggu API
        // cy.wait('@postPenjualan').then((interception) => {
        //     const res = interception.response.body;

        //     // Pastikan request benar
        //     expect(interception.request.method).to.eq('POST');
        //     expect(interception.response.statusCode).to.eq(200);

        //     // Validasi row pertama tabel
        //     cy.get('table tbody tr').first().within(() => {
        //         // kolom 1 = nomor
        //         cy.get('td').eq(1, { timeout: 20000 }).should('have.text', res.nomor)
        //         cy.contains(res.nomor).click();
        //     })
        // });
    });

    it.only('Melakukan Pembayaran Tunai', () => {
        cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.reload();
        cy.wait('@waitPelanggan')
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`)
                .eq(1).click()
                .scrollIntoView({ block: 'center' }) // pastikan muncul di tengah viewport
                .should('be.visible') // pastikan visible
                .click({ force: true }); // bypass overlay check kalau masih ketutup

        //cy.get('#idPelanggan').trigger('change')
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('.MuiButton-contained').click();

        // Intercept API penjualan
        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

        // Submit
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('.MuiAlert-message').should('have.text', 'Penjualan berhasil ditambahkan')

        // Tunggu API
        cy.wait('@postPenjualan').then((interception) => {
            const res = interception.response.body;

            // Pastikan request benar
            expect(interception.request.method).to.eq('POST');
            expect(interception.response.statusCode).to.eq(200);

            // Validasi row pertama tabel
            cy.get('table tbody tr').first().within(() => {
                // kolom 1 = nomor
                cy.get('td').eq(1, { timeout: 20000 }).should('have.text', res.nomor)
                cy.contains(res.nomor).click();
                cy.wait(100000000);
            })
        });
    });

})