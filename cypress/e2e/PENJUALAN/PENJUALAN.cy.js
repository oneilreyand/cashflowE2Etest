import { PT_ARSYA } from "../../data";
describe('PENJUALAN', () => {
    
    beforeEach(() => {
    cy.apiLogin('rayhanrayandra.work.id@gmail.com', '12345678'); // Login using valid credentials
    cy.visitDashboard(PT_ARSYA); // Visit the dashboard after successful login
    cy.navigateToPenjualan() // Navigate to Penjualan
    });
    
    
    it('Validasi Penulisan Komponen Statis UI Halaman Penjualan', () => {
      
        cy.get('.css-fyc6bt > .MuiTypography-h5').should('have.text', 'Penjualan')
        cy.get('.MuiBreadcrumbs-ol').should('have.text', "Beranda/Penjualan")

        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiTypography-root').should('have.text', "Belum Dibayar")
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2').should('have.text', 'Total Penjualan')
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiTypography-root').should('have.text', 'Telat Dibayar')
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2').should('have.text', 'Total Penjualan')
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root').should('have.text', 'Pelunasan Diterima (30 Hari Terakhir)')
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2').should('have.text', 'Total Penjualan')

        cy.get('.MuiTabs-flexContainer > :nth-child(1)').should('have.text', 'Semua')
        cy.get('.MuiTabs-flexContainer > :nth-child(2)').should('have.text', 'Belum Dibayar')
        cy.get('.MuiTabs-flexContainer > :nth-child(3)').should('have.text', 'Jatuh Tempo')
        cy.get('.MuiTabs-flexContainer > :nth-child(4)').should('have.text', 'Lunas')
        cy.get('.MuiTabs-flexContainer > :nth-child(5)').should('have.text', 'Dibayar Sebagian')
        cy.get('.MuiTabs-flexContainer > :nth-child(6)').should('have.text', 'Void')

        cy.get('.MuiBox-root > .MuiButtonBase-root').should('have.text', 'Filter Tanggal')
        cy.get('input[placeholder="Cari"]').should('be.visible')

        cy.get('.MuiTableRow-root > :nth-child(1)').should('have.text', 'Tanggal')
        cy.get('.MuiTableRow-root > :nth-child(2)').should('have.text', 'Nomor')
        cy.get('.MuiTableRow-root > :nth-child(3)').should('have.text', 'Nama Pelanggan')
        cy.get('.MuiTableRow-root > :nth-child(4)').should('have.text', 'Tgl Jatuh Tempo')
        cy.get('.MuiTableRow-root > :nth-child(5)').should('have.text', 'Status')
        cy.get('.MuiTableRow-root > :nth-child(6)').should('have.text', 'Sisa Tagihan')
        cy.get('.MuiTableRow-root > :nth-child(7)').should('have.text', 'Total Tagihan')
    });
});


// cy.intercept(
//         'GET',
//         `**/api/penjualan?**companyId=${PT_ARSYA}`,
//         (req) => {
//             req.reply({
//             statusCode: 200,
//             body: {
//                 totalData: 0,
//                 results: [{},{},{},{},{},{},{},{}]
//             }
//             });
//         }
//         ).as('cw');

//         cy.wait('@cw');