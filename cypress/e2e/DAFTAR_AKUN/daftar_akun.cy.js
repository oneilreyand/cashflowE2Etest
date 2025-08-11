import { companyId } from "../../data";

describe('DAFTAR AKUN', () => {
    beforeEach(() => {
        cy.apiLogin('erni.yulianti@assist.id', '12345678'); // Login using valid credentials
        cy.visitDashboard(); // Visit the dashboard after successful login
    }); 
  
    it('[DAFTAR AKUN] - Harus gagal mendapatkan data error 500', () => {
        
        cy.intercept('GET', '**/api/akuns/last-period**', {
            statusCode: 500,
            body: {
                result: [],
                totalData: 0,
            },
        }).as('getLastPeriod');
    
        cy.intercept('GET', '**/api/akuns**', {
            statusCode: 500,
            body: {},
        }).as('getAkuns');
    
        cy.get('[data-testid="drawer-item-accounts"]')
            .should('be.visible')
            .click();
    
        cy.wait('@getLastPeriod');
        cy.wait('@getAkuns', { timeout: 10000 });
    
        cy.get('[data-cy="list-akuns"]').should('not.exist');
    });
    
    it('[DAFTAR AKUN] - Harus berhasil mendapatkan data kosong', () => {
        // Intercept untuk endpoint pertama
        cy.intercept('GET', '**/api/akuns/last-period**', {
            statusCode: 200,
            body: {
                result: [],
                totalData: 0,
            },
        }).as('getLastPeriod');
    
        // Intercept untuk endpoint kedua (list data utama)
        cy.intercept('GET', '**/api/akuns**', {
            statusCode: 200,
            body: {
                result: [], // Array kosong untuk memastikan data tidak muncul
                totalData: 0,
            },
        }).as('getAkuns');
    
        // Lakukan aksi setelah intercept aktif
        cy.get('[data-testid="drawer-item-accounts"]')
            .should('be.visible')
            .click();
    
        // Tunggu semua request selesai
        cy.wait('@getLastPeriod', { timeout: 10000 });
        cy.wait('@getAkuns', { timeout: 10000 });
    
        // Validasi UI bahwa list data kosong
        cy.get('[data-cy="list-akuns"]').should('not.exist'); // Atur sesuai selector list Anda
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
            .should('be.visible')
            .and('contain', 'Tidak ada data');
    });
    
    // it('[DAFTAR AKUN] - Next Page, Pagination', () => {
      
    //     cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
    //     cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').click()
    // })

    // it('[DAFTAR AKUN] - Prev Page, Pagination', () => {
      
    //     cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
    //     cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').click()
    //     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
    // })

    it('[DAFTAR AKUN] - Harus berhasil mencari', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
        cy.get('input[placeholder="Cari akun"]').should('be.visible').type('Giro');
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain','Giro')
    })

    it('[DAFTAR AKUN] - Harus berhasil membuka modal buat akun baru', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
        cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
            .should('be.visible')
            .and('contain', 'Buat Akun Baru')
            .click()
        cy.get('#modal-title')
            .should('be.visible')
            .and('contain', 'Tambah Akun Baru')
        cy.get('input[name="nama"]').should('be.visible')
        cy.get('#kategori_id').should('be.visible')
        cy.get('#bank').should('be.visible')
        cy.get('.MuiButton-text')
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained')
    })

    // it.only('[DAFTAR AKUN] - Harus berhasil menutup modal buat akun ketika menekan batal', () => {
    //     cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
    //     cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
    //     .should('be.visible')
    //     .and('contain', 'Buat Akun Baru')
    //     .click()
    //     cy.get('.MuiButton-text').click()
    //     cy.get('.MuiTypography-h6').should('be.visible').and('contain', 'Semua Akun')
    // })

    it('[DAFTAR AKUN] - Harus gagal menambah buat akun ketika semua field kosong', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
        cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Buat Akun Baru')
        .click()
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
        cy.get('#nama-helper-text')
            .should('be.visible')
            .and('contain', 'Nama Akun harus diisi')
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root')
            .should('be.visible')
            .and('contain', 'Kategori Akun harus diisi')
    })

    it('[DAFTAR AKUN] - Harus gagal menambah buat akun ketika nama akun di isi yang lainnya kosong', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
           cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Buat Akun Baru')
        .click()
        cy.get('input[name="nama"]').should('be.visible')
            .should('be.visible')
            .type('test akun reyand')
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()

    
        cy.contains('span', 'Kategori Akun harus diisi')
            .should('be.visible')
            .and('have.text', 'Kategori Akun harus diisi');
    })

    it('[DAFTAR AKUN] - Harus gagal menambah buat akun ketika nama akun di isi field lainnya kosong', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
           cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Buat Akun Baru')
        .click()
        cy.get('#nama').should('be.visible').type('akun_test')
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root')
            .should('be.visible')
            .and('contain', 'Kategori Akun harus diisi')
   
    })

    it('[DAFTAR AKUN] - Harus gagal menambah buat akun ketika kategori akun di isi field lainnya kosong', () => {
        // cy.intercept('GET', 'https://api-cashflow.assist.id/api/master-kategori-akuns?limit=100&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getCategories');
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
           cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Buat Akun Baru')
        .click()
        
        // Tunggu sampai API selesai memuat data (berdasarkan intercept alias)
        // cy.wait('@getCategories').then((interception) => {
        //     console.log('API Response:', interception);
        // });
       cy.get('#kategori_id').click()
        cy.contains('li', 'Ekuitas').click();
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
        cy.get('#nama-helper-text')
            .should('be.visible')
            .and('contain', 'Nama Akun harus diisi')
        cy.get('#nama-helper-text')
            .should('be.visible')
            .and('contain', 'Nama Akun harus diisi')
    })

    it('[DAFTAR AKUN] - Harus gagal menambah buat akun ketika hanya field bank di isi yang lainnya kosong', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
           cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Buat Akun Baru')
        .click()
        cy.get('#bank').click()
        cy.contains('li','Bank Central Asia').click()
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
        cy.get('#nama-helper-text')
            .should('be.visible')
            .and('contain', 'Nama Akun harus diisi')
        cy.contains('span', 'Kategori Akun harus diisi')
            .should('be.visible')
            .and('have.text', 'Kategori Akun harus diisi');
    })
    

    // it('[DAFTAR AKUN] - Harus Gagal menambah buat akun ketika semua field di isi semua field, kode akun sudah ada (1-10001)', () => {
    //     // cy.intercept('GET', 'https://api-cashflow.assist.id/api/master-kategori-akuns?limit=100&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getCategories');
    //     cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
    //        cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
    //     .should('be.visible')
    //     .and('contain', 'Buat Akun Baru')
    //     .click()
        
    //     // Tunggu sampai API selesai memuat data (berdasarkan intercept alias)
    //     // cy.wait('@getCategories').then((interception) => {
    //     //     console.log('API Response:', interception);
    //     // });
    //     cy.get('input[name="nama"]').should('be.visible')
    //         .should('be.visible')
    //         .type('test akun reyand')
    //     cy.get('#kategori_id')
    //         .click()
    //     cy.get('[data-value="39"]')
    //         .click()
    
    //     cy.get('#bank').click()
    //     cy.contains('li','Bank Central Asia').click()
    //     cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
    //     // cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Kode Akun already exists for this company.')
    
    // })

    it('[DAFTAR AKUN] - Harus Berhasil menambah buat akun ketika semua field di isi semua field', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
           cy.get('.css-1waaizo-MuiStack-root > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Buat Akun Baru')
        .click()
        
       
        cy.get('input[name="nama"]').should('be.visible')
        .should('be.visible')
        .type('test akun reyand')
        cy.get('#kategori_id').click()
        cy.contains('li', 'Akun Piutang').click();
        cy.get('#bank').click()
        cy.contains('li','Bank Central Asia').click()
        cy.get('#description').should('be.visible').type('test akun reyand')
        cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').click()
        cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Akun berhasil ditambah')
    })

    it('[DAFTAR AKUN] - Harus berhasil mencari setelah di buat dan panstikan form bank dan deskripsi tidak disabled', () => {
        cy.intercept('GET', `https://api-cashflow.assist.id/api/akuns?companyId=${companyId}`,{}).as('getListAkun')
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
        cy.get('input[placeholder="Cari akun"]').should('be.visible').type('7-20005');
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain','7-20005')
        cy.get(':nth-child(2) > span > .MuiButtonBase-root').should('be.visible').and('contain', 'test akun reyand')
        
        // cy.get(':nth-child(2) > span > .MuiButtonBase-root').click()
        // cy.get('#bank')
        // cy.get('#description')
        // cy.get('.css-1jxwjqx-MuiGrid2-root > .MuiGrid2-container > .MuiButton-contained').should('be.visible')
    })

    // it.only('[DAFTAR AKUN] - Harus berhasil mencari setelah di buat dan panstikan form bank dan deskripsi disabled', () => {
    //     cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
    //     cy.get('input[placeholder="Cari akun"]').should('be.visible').type('7-20008');
    //     cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain','7-20008')
    //     cy.get(':nth-child(2) > span > .MuiButtonBase-root').should('be.visible').and('contain', 'test akun reyand')
    //     cy.get(':nth-child(2) > span > .MuiButtonBase-root').click()
    //     cy.get('#bank').should('not.be.enabled')
    //     cy.get('#description').should('not.be.enabled')
    // })

    it('[DAFTAR AKUN] - Harus berhasil membuka detail akun', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
        cy.get('input[placeholder="Cari akun"]').should('be.visible').type('7-20008');
        // cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain','7-20008')
        cy.get('.MuiTableRow-root > :nth-child(2) > span').first().click()
        cy.get(':nth-child(2) > span > .MuiButtonBase-root').click()
    })

    it.only('[DAFTAR AKUN] - Harus berhasil menutup detail akun', () => {
        cy.get('[data-testid="drawer-item-accounts"]').should('be.visible').click()
        //Intercept API call dan buat alias 'getAkun'
        // cy.intercept('GET', 'https://api-cashflow.assist.id/api/akuns*').as('getAkun');
      
        // Ketik keyword di input pencarian
        cy.get('input[placeholder="Cari akun"]').type('7-20008', {delay: 100});
      
        // Tunggu request API selesai
        // cy.wait('@getAkun');
      
    })

});