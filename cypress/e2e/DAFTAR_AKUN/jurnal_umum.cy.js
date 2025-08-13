describe('DAFTAR AKUN - JURNAL UMUM', () => {
    beforeEach(() => {
        cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
        cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
    }); 
    it('[JURNAL UMUM] - Harus bisa membuka jurnal umum dari fitur daftar akun', () => {
        cy.get('[data-testid="drawer-item-accounts"]').click();
        cy.get('.MuiButton-outlined').should('be.visible').and('contain', 'Jurnal Umum').click()
    })

    it('[JURNAL UMUM] - Harus gagal mendapatkan data jurnal umum datanya error 500', () => {
        cy.get('[data-testid="drawer-item-accounts"]').click();
        cy.intercept(
            'GET',
            `https://api-cashflow.assist.id/api/jurnals?skip=0&limit=10&companyId=${Cypress.env('companyId')}`,
            {
            statusCode: 500,
            body: {
                result: [],
                totalData: 0,
            },
            }
        ).as('getLastPeriod');
        cy.get('.MuiButton-outlined').should('be.visible').and('contain', 'Jurnal Umum').click()
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Request failed with status code 500')

    })

    it('[JURNAL UMUM] - Harus berhasil mendapatkan data jurnal umum datanya kosong', () => {
        cy.get('[data-testid="drawer-item-accounts"]').click();
        cy.intercept(
            'GET',
            `https://api-cashflow.assist.id/api/jurnals?skip=0&limit=10&companyId=${Cypress.env('companyId')}`,
            {
            statusCode: 200,
            body: {
                result: [],
                totalData: 0,
            },
            }
        ).as('getLastPeriod');
        cy.get('.MuiButton-outlined').should('be.visible').and('contain', 'Jurnal Umum').click()
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
    })

    it('[JURNAL UMUM] - Harus berhasil mendapatkan data jurnal', () => {
        cy.get('[data-testid="drawer-item-accounts"]').click();
        cy.intercept(
            'GET',
            'https://api-cashflow.assist.id/api/jurnals?skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
         
        ).as('getListJurnal');
        cy.get('.MuiButton-outlined').should('be.visible').and('contain', 'Jurnal Umum').click()
        cy.wait('@getListJurnal').then((res) => {
            console.log(res)
        })
    })
});