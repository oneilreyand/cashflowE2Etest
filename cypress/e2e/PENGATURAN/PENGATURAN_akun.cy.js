describe('[PENGATURAN-AKUN]', () => {
    const navigatePengaturanAkun = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      };

    beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturanAkun(); // Navigate to "Tambah Kontak" page for each test
      });
  
    it('Chek kesesuainan halaman Pengaturan Akun - penjualan dengan design yang ada', () => {
       cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
       cy.get('#panel1-header > .MuiAccordionSummary-content')
        .should('be.visible')
        .and('contain', 'Penjualan')
       cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Pendapatan Penjualan')
      //  cy.get('#\\:rd\\:').click()
      //  cy.get('#\\:rd\\:').type('1-10706')
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Diskon Penjualan')
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(5) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Retur Penjualan')   
      cy.get(':nth-child(7) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Pengiriman Penjualan')   
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Pembayaran di Muka')   
      cy.get(':nth-child(6) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Piutang Belum Ditagih')      
      cy.get(':nth-child(8) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Hutang Pajak Penjualan')      
    });

    it('Chek kesesuainan halaman Pengaturan Akun - pembelian dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header').click()
      cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Pembelian (COGS)')    
      cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Pengiriman Pembelian')   
      cy.get('#panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(5) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Uang Muka Pembelian')   
      cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Pembayaran di Muka')   
      cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Pajak Pembelian')   
    })

    it('Chek kesesuainan halaman Pengaturan Akun - AR/AP dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('#panel1-header > .MuiAccordionSummary-content').click()
      cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header').click()
      cy.get(':nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Piutang Usaha')   
      cy.get(':nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Hutang Usaha')   
    })

    it('Chek kesesuainan halaman Pengaturan Akun - Persediaan dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('#panel1-header > .MuiAccordionSummary-content').click()
      cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      cy.get(':nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Persediaan')  
      cy.get(':nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Persediaan Umum')  
      cy.get(':nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Persediaan Rusak') 
      cy.get(':nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Persediaan Produksi') 
    })

    it('Chek kesesuainan halaman Pengaturan Akun - Lainnya dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('#panel1-header > .MuiAccordionSummary-content').click()
      cy.get(':nth-child(5) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Ekuitas Saldo Awal')  
      cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-5 > .MuiFormLabel-root')
        .should('be.visible')
        .and('contain', 'Aset Tetap')  
    })

    it('Harus gagal mendapatkan data dari API', () => {
      cy.intercept(
        'GET',
        'https://api-cashflow.assist.id/api/akuns/list2?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
        {
          statusCode: 500,
          body: {
            // message: 'Internal Server Error',
          },
        }
      ).as('getEkspedisiEroor');
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

    })

    it('#SETTING_AKUN_01 Harus berhasil update data pengaturan akun semua data kosong', () => {
      cy.intercept('PUT', '**/api/setting-accounts/**').as('updateSettingAccount');
    
      // Interact with the submenu and submit button
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root')
        .should('be.visible')
        .click();
    
      // Wait for API response
      cy.wait('@updateSettingAccount', { timeout: 10000 }).then((interception) => {
        // Debugging and validation
        cy.get('.MuiAlert-message')
          .should('be.visible')
          .and('contain', 'Berhasil Menyimpan Data Akun.');
      });
    });
    
    it('#SETTING_AKUN_02 Update data pengaturan akun data Penjualan di isi', () => {
      // Intercept permintaan API
      cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
      
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      // Pendapatan penjualan
      cy.get('[name="sales_income"]').click()
      cy.contains('li', '1-10003 - Giro')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="sales_income"]').trigger('change');
  
      cy.get('[name="sales_down_payment"]').click()
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="sales_down_payment"]').trigger('change');
      //  Diskon penjualan
      cy.get('[name="sales_discount"]')
      .type('1-10102 - Cadangan Kerugian Piutang')
      .trigger('mouseover');
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();

      cy.get('[name="sales_unbilled"]').trigger('change')
      .type('1-10102 - Cadangan Kerugian Piutang')
      .trigger('mouseover');
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      // Retur Penjualan
      cy.get('[name="sales_return"]').click()
      cy.contains('li', '1-10753 - Akumulasi penyusutan - Kendaraan')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="sales_return"]').trigger('change');
      // Piutang belum di tagih
      cy.get('[name="sales_uncollected_receivables"]').click()
      cy.contains('li', '1-10753 - Akumulasi penyusutan - Kendaraan')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="sales_uncollected_receivables"]').trigger('change');
      // Pengiriman penjualan
      cy.get('[name="sales_delivery"]').click()
      cy.contains('li', '2-20601 - Kewajiban Lancar Lainnya')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="sales_delivery"]').trigger('change');
      // Hutang Pajak Penjualan
      cy.get('[name="sales_tax_debt"]').click()
      cy.contains('li', '1-10755 - Akumulasi Penyusutan - Peralatan Kantor')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="sales_tax_debt"]').trigger('change');
  
      // cy.get('#panel1-header > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"]').click()
  
      // Simpan perubahan
      cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
      // Tunggu respons API selesai
      cy.wait('@updateSettingAccount').then((interception) => {
        // Debug respons API
        console.log('Request URL:', interception.request.url);
        console.log('Response Status Code:', interception.response.statusCode);
        
        // Validasi status kode API (204 berarti sukses tanpa konten)
        expect(interception.response.statusCode).to.eq(204);
        cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Berhasil Menyimpan Data Akun.');
        });
    })
  
    it('#SETTING_AKUN_03 Update data pengaturan akun data Pembelian di isi', () => {
      // Intercept permintaan API
      cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
      
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('#panel1-header').click()
      cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header').click()
      // Pembelian(COGS)
      cy.get('[name="purchase_cogs"]').click()
      cy.contains('li', '1-10003 - Giro')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="purchase_cogs"]').trigger('change');
      // Pembayaran di muka
      cy.get('[name="purchase_uncollected_debt"]').click()
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="purchase_uncollected_debt"]').trigger('change');
      //  Pengiriman Pembelian
      cy.get('[name="purchase_delivery"]').click()
      cy.contains('li', '3-30000 - Modal Saham')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="purchase_delivery"]').trigger('change');
      // Pajak Pembelian
      cy.get('[name="purchase_tax"]').click()
      cy.contains('li', '1-10708 - Hak Merek Dagang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="purchase_tax"]').trigger('change');
      // Uang Muka Pembelian
      cy.get('[name="purchase_down_payment"]').click()
      cy.contains('li', '1-10003 - Giro')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="purchase_down_payment"]').trigger('change');
      
      // Simpan perubahan
      cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
      // Tunggu respons API selesai
      cy.wait('@updateSettingAccount').then((interception) => {
        // Debug respons API
        console.log('Request URL:', interception.request.url);
        console.log('Response Status Code:', interception.response.statusCode);
        
        // Validasi status kode API (204 berarti sukses tanpa konten)
        expect(interception.response.statusCode).to.eq(204);
        cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Berhasil Menyimpan Data Akun.');
        });
    })
  
    it('#SETTING_AKUN_04 Update data pengaturan akun data AR/AP di isi', () => {
      // Intercept permintaan API
      cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
      
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('#panel1-header').click()
      cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      // Piutang usaha
      cy.get('[name="account_receivable"]').click()
      cy.contains('li', '1-10003 - Giro')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="account_receivable"]').trigger('change');
      // Hutang usaha
      cy.get('[name="account_payable"]').click()
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="account_payable"]').trigger('change');
      
      // Simpan perubahan
      cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
      // Tunggu respons API selesai
      cy.wait('@updateSettingAccount').then((interception) => {
        // Debug respons API
        console.log('Request URL:', interception.request.url);
        console.log('Response Status Code:', interception.response.statusCode);
        
        // Validasi status kode API (204 berarti sukses tanpa konten)
        expect(interception.response.statusCode).to.eq(204);
        cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Berhasil Menyimpan Data Akun.');
        });
    })
  
    it('#SETTING_AKUN_05 Update data pengaturan akun data Persediaan di isi', () => {
      // Intercept permintaan API
      cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
      
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('#panel1-header').click()
      cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      // Persedian
      cy.get('[name="supply_inventory"]').click()
      cy.contains('li', '1-10003 - Giro')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="supply_inventory"]').trigger('change');
      // Persediaan Rusak 
      cy.get('[name="supply_damaged"]').click()
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="supply_damaged"]').trigger('change');
      //  Persediaan umum
      cy.get('[name="supply_general"]').click()
      cy.contains('li', '3-30000 - Modal Saham')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="supply_general"]').trigger('change');
      // Persedian PRoduksi
      cy.get('[name="supply_production"]').click()
      cy.contains('li', '1-10708 - Hak Merek Dagang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="supply_production"]').trigger('change');
  
      // Simpan perubahan
      cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
      // Tunggu respons API selesai
      cy.wait('@updateSettingAccount').then((interception) => {
        // Debug respons API
        console.log('Request URL:', interception.request.url);
        console.log('Response Status Code:', interception.response.statusCode);
        
        // Validasi status kode API (204 berarti sukses tanpa konten)
        expect(interception.response.statusCode).to.eq(204);
        cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Berhasil Menyimpan Data Akun.');
        });
    })
  
    it('#SETTING_AKUN_06 Update data pengaturan akun data lainnya di isi', () => {
      // Intercept permintaan API
      cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
      
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('#panel1-header').click()
      cy.get(':nth-child(5) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      // Ekuitas Saldo Awal
      cy.get('[name="balance_equity_beginning"]').click()
      cy.contains('li', '1-10003 - Giro')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="balance_equity_beginning"]').trigger('change');
      // Asset Tetap
      cy.get('[name="fix_asset"]').click()
      cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
      .scrollIntoView()
      .should('exist')
      .click();
      cy.get('[name="fix_asset"]').trigger('change');
      
      // Simpan perubahan
      cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
      // Tunggu respons API selesai
      cy.wait('@updateSettingAccount').then((interception) => {
        // Debug respons API
        console.log('Request URL:', interception.request.url);
        console.log('Response Status Code:', interception.response.statusCode);
        
        // Validasi status kode API (204 berarti sukses tanpa konten)
        expect(interception.response.statusCode).to.eq(204);
        cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Berhasil Menyimpan Data Akun.');
        });
    })

    it('#SETTING_AKUN_01 Autocomplete di form pengaturan akun', () => {
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      // Pendapatan penjualan
      cy.get('[name="sales_income"]').clear()
      cy.get('[name="sales_income"]').clear()
      cy.get('[name="sales_income"]').type('giro', { delay: 300 })
      cy.get('body').type('{esc}'); // Tutup dropdown jika diperlukan
    
      //  Diskon penjualan
      cy.get('[name="sales_discount"]').clear()
      cy.get('[name="sales_discount"]').clear()
      cy.get('[name="sales_discount"]').type('modal')
      cy.get('body').type('{esc}');
    
      // Retur Penjualan
      cy.get('[name="sales_down_payment"]').clear()
      cy.get('[name="sales_down_payment"]').clear()
      cy.get('[name="sales_down_payment"]').type('modal')
      cy.get('body').type('{esc}');
    
    
      // Penjualan Belum di Tagih
      cy.get('[name="sales_unbilled"]').clear()
      cy.get('[name="sales_unbilled"]').clear()
      cy.get('[name="sales_unbilled"]').type('modal')
      cy.get('body').type('{esc}');
    
      // Retur Penjualan
      cy.get('[name="sales_return"]').clear()
      cy.get('[name="sales_return"]').clear()
      cy.get('[name="sales_return"]').type('modal')
      cy.get('body').type('{esc}');
    
      // Piutang belum di tagih
      cy.get('[name="sales_uncollected_receivables"]').clear()
      cy.get('[name="sales_uncollected_receivables"]').clear()
      cy.get('[name="sales_uncollected_receivables"]').type('modal')
      cy.get('body').type('{esc}');
    
       // Pengiriman penjualan
       cy.get('[name="sales_delivery"]').clear()
       cy.get('[name="sales_delivery"]').clear()
       cy.get('[name="sales_delivery"]').type('modal')
       cy.get('body').type('{esc}');
    
       // Hutang Pajak Penjualan
       cy.get('[name="sales_tax_debt"]').clear()
       cy.get('[name="sales_tax_debt"]').clear()
       cy.get('[name="sales_tax_debt"]').type('modal')
       cy.get('body').type('{esc}');
    
       cy.get('#panel1-header').click()
       cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
        
       // Pembelian(COGS)
       cy.get('[name="purchase_cogs"]').clear()
       cy.get('[name="purchase_cogs"]').clear()
       cy.get('[name="purchase_cogs"]').type('modal')
       cy.get('body').type('{esc}');
    
       // Pembayaran di muka
       cy.get('[name="purchase_uncollected_debt"]').clear()
       cy.get('[name="purchase_uncollected_debt"]').clear()
       cy.get('[name="purchase_uncollected_debt"]').type('modal')
       cy.get('body').type('{esc}');
       
       // Pengiriman Pembelian
       cy.get('[name="purchase_delivery"]').clear()
       cy.get('[name="purchase_delivery"]').clear()
       cy.get('[name="purchase_delivery"]').type('modal')
       cy.get('body').type('{esc}');
    
        // Pajak Pembelian
        cy.get('[name="purchase_tax"]').clear()
        cy.get('[name="purchase_tax"]').clear()
        cy.get('[name="purchase_tax"]').type('modal')
        cy.get('body').type('{esc}');
    
      // Uang Muka Pembelian
      cy.get('[name="purchase_down_payment"]').clear()
      cy.get('[name="purchase_down_payment"]').clear()
      cy.get('[name="purchase_down_payment"]').type('modal')
      cy.get('body').type('{esc}');
    
      cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
    
      // Piutang Usaha
       cy.get('[name="account_receivable"]').clear()
       cy.get('[name="account_receivable"]').clear()
       cy.get('[name="account_receivable"]').type('modal')
       cy.get('body').type('{esc}');
    
      // Hutang Usaha
      cy.get('[name="account_payable"]').clear()
      cy.get('[name="account_payable"]').clear()
      cy.get('[name="account_payable"]').type('modal')
      cy.get('body').type('{esc}');
    
      cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
    
       // Persedian
       cy.get('[name="supply_inventory"]').clear()
       cy.get('[name="supply_inventory"]').clear()
       cy.get('[name="supply_inventory"]').type('modal')
       cy.get('body').type('{esc}');
    
      // Persedian Rusak
      cy.get('[name="supply_damaged"]').clear()
      cy.get('[name="supply_damaged"]').clear()
      cy.get('[name="supply_damaged"]').type('modal')
      cy.get('body').type('{esc}');
    
       // Persedian Umumu
       cy.get('[name="supply_general"]').clear()
       cy.get('[name="supply_general"]').clear()
       cy.get('[name="supply_general"]').type('modal')
       cy.get('body').type('{esc}');
    
        // Persediaan Produksi
      cy.get('[name="supply_production"]').clear()
      cy.get('[name="supply_production"]').clear()
      cy.get('[name="supply_production"]').type('modal')
      cy.get('body').type('{esc}');
    
      cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      cy.get(':nth-child(5) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
    
      // Ekuitas Saldo Awal
      cy.get('[name="balance_equity_beginning"]').clear()
      cy.get('[name="balance_equity_beginning"]').clear()
      cy.get('[name="balance_equity_beginning"]').type('modal')
      cy.get('body').type('{esc}');
    
      // Asset Tetap
      cy.get('[name="fix_asset"]').clear()
      cy.get('[name="fix_asset"]').clear()
      cy.get('[name="fix_asset"]').type('modal')
      cy.get('body').type('{esc}');
    })

    it('#SETTING_AKUN_01 Batal memilih hasil dari autocomplite', () => {
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    
       // Pembayaran dimuka
       cy.get('[name="sales_income"]').trigger('mouseover')
       cy.get('[name="sales_income"]') // Ganti dengan selektor text field
         .type('1-10102 - Cadangan Kerugian Piutang') // Isi text field dengan nilai
       cy.get('[name="sales_income"]')
         .trigger('mouseover');
         cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
       cy.get('body').type('{esc}'); // Tutup dropdown jika diperlukan
      
      // Pembayaran dimuka
      cy.get('[name="sales_down_payment"]')
        .trigger('mouseover')
      cy.get('[name="sales_down_payment"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="sales_down_payment"]')
        .trigger('mouseover');
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
      cy.get('body').type('{esc}')
    
      // Diskon penjual
      cy.get('[name="sales_discount"]').trigger('mouseover')
      cy.get('[name="sales_discount"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="sales_discount"]')
        .trigger('mouseover');
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
      cy.get('body').type('{esc}')
    
      // Penjualan Belum di Tagih
      cy.get('[name="sales_unbilled"]').trigger('mouseover')
      cy.get('[name="sales_unbilled"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="sales_unbilled"]')
        .trigger('mouseover');
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
      cy.get('body').type('{esc}')
    
      // Retur penjualan
      cy.get('[name="sales_return"]').trigger('mouseover')
      cy.get('[name="sales_return"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="sales_return"]')
        .trigger('mouseover');
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(5) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
      cy.get('body').type('{esc}')
    
      // Piutang belum di tagih
      cy.get('[name="sales_uncollected_receivables"]').trigger('mouseover')
      cy.get('[name="sales_uncollected_receivables"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="sales_uncollected_receivables"]')
        .trigger('mouseover');
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(6) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
      cy.get('body').type('{esc}')
    
      // Pengiriman penjualan
      cy.get('[name="sales_delivery"]').trigger('mouseover')
      cy.get('[name="sales_delivery"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="sales_delivery"]')
        .trigger('mouseover');
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(7) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
      cy.get('body').type('{esc}')
    
      // Hutang Pajak Penjualan
      cy.get('[name="sales_tax_debt"]').trigger('mouseover')
      cy.get('[name="sales_tax_debt"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="sales_tax_debt"]')
        .trigger('mouseover');
      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(8) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
      cy.get('body').type('{esc}')
    
      cy.get('#panel1-header').click()
      cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
      // Pembelian(COGS)
      cy.get('[name="purchase_cogs"]').trigger('mouseover')
      cy.get('[name="purchase_cogs"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="purchase_cogs"]')
        .trigger('mouseover');
        cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
      cy.get('body').type('{esc}')
    
      // Pembayaran di muka
      cy.get('[name="purchase_uncollected_debt"]').trigger('mouseover')
      cy.get('[name="purchase_uncollected_debt"]')
        .type('1-10102 - Cadangan Kerugian Piutang')
      cy.get('[name="purchase_uncollected_debt"]')
        .trigger('mouseover');
        cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
      cy.get('body').type('{esc}')
    
       // Pengiriman Pembelian
       cy.get('[name="purchase_delivery"]').trigger('mouseover')
       cy.get('[name="purchase_delivery"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="purchase_delivery"]')
         .trigger('mouseover');
         cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
       cy.get('body').type('{esc}')
    
       // Pajak Pembelian
       cy.get('[name="purchase_tax"]').trigger('mouseover')
       cy.get('[name="purchase_tax"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="purchase_tax"]')
         .trigger('mouseover');
         cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
       cy.get('body').type('{esc}')
    
       cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header').click()
    
       // Uang Muka Pembelian
       cy.get('[name="purchase_down_payment"]').trigger('mouseover')
       cy.get('[name="purchase_down_payment"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="purchase_down_payment"]')
         .trigger('mouseover');
         cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(5) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
       cy.get('body').type('{esc}')
    
       cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
       cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
       cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
    
       cy.get('[name="account_receivable"]').trigger('mouseover')
       cy.get('[name="account_receivable"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="account_receivable"]')
         .trigger('mouseover');
       cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
       cy.get('body').type('{esc}')
    
       cy.get('[name="account_payable"]').trigger('mouseover')
       cy.get('[name="account_payable"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="account_payable"]')
         .trigger('mouseover');
       cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
       
       cy.get('body').type('{esc}')
    
       cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
       cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
    
       cy.get('[name="supply_inventory"]').trigger('mouseover')
       cy.get('[name="supply_inventory"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="supply_inventory"]')
         .trigger('mouseover');
       cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
       
       cy.get('body').type('{esc}')
    
       cy.get('[name="supply_damaged"]').trigger('mouseover')
       cy.get('[name="supply_damaged"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="supply_damaged"]')
         .trigger('mouseover');
       cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
       
       cy.get('body').type('{esc}')
    
       cy.get('[name="supply_general"]').trigger('mouseover')
       cy.get('[name="supply_general"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="supply_general"]')
         .trigger('mouseover');
       cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
       
       cy.get('body').type('{esc}')
    
       cy.get('[name="supply_production"]').trigger('mouseover')
       cy.get('[name="supply_production"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="supply_production"]')
         .trigger('mouseover');
       cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
       
       cy.get('body').type('{esc}')
    
       cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
       cy.get(':nth-child(5) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
    
       cy.get('[name="balance_equity_beginning"]').trigger('mouseover')
       cy.get('[name="balance_equity_beginning"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="balance_equity_beginning"]')
         .trigger('mouseover');
       cy.get(':nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
       
       cy.get('body').type('{esc}')
    
       cy.get('[name="fix_asset"]').trigger('mouseover')
       cy.get('[name="fix_asset"]')
         .type('1-10102 - Cadangan Kerugian Piutang')
       cy.get('[name="fix_asset"]')
         .trigger('mouseover');
       cy.get(':nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
       
       cy.get('body').type('{esc}')
    
       cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
    })

    it('should trigger spam hit', () => {
      // Navigasi ke submenu "Pengaturan Akun"
      cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    
      // Mock API untuk menangkap permintaan
      cy.intercept('PUT', '/api/setting-accounts', {
        statusCode: 200,
        body: { message: 'Success' },
      }).as('updateSettings');
    
      // Simulasi spam dengan klik tombol "Simpan" sebanyak 10 kali
      for (let i = 0; i < 10; i++) {
        cy.get(
          '[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root'
        ).click();
      }
    });
});

// describe('[PENGATURAN-AKUN] - Update pengaturan akun', () => {
//   const navigatePengaturanAkun = () => {
//       cy.get('[data-testid="drawer-item-settings"]').click();
//     };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturanAkun(); // Navigate to "Tambah Kontak" page for each test
//     });

//   it('#SETTING_AKUN_01 Update data pengaturan akun data kosong', () => {
//     // Intercept permintaan API
//     cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
//     cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
//       // Tunggu respons API selesai
//     cy.wait('@updateSettingAccount').then((interception) => {
//       // Debug respons API
//       console.log('Request URL:', interception.request.url);
//       console.log('Response Status Code:', interception.response.statusCode);
      
//       // Validasi status kode API (204 berarti sukses tanpa konten)
//       expect(interception.response.statusCode).to.eq(204);
//       cy.get('.MuiAlert-message')
//       .should('be.visible')
//       .and('contain', 'Berhasil Menyimpan Data Akun.');
//     });
//   });
//   it('#SETTING_AKUN_02 Update data pengaturan akun data Penjualan di isi', () => {
//     // Intercept permintaan API
//     cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
    
//     cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     // Pendapatan penjualan
//     cy.get('[name="sales_income"]').click()
//     cy.contains('li', '1-10003 - Giro')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="sales_income"]').trigger('change');

//     cy.get('[name="sales_down_payment"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="sales_down_payment"]').trigger('change');
//     //  Diskon penjualan
//     cy.get('[name="sales_discount"]')
    
//     .type('1-10102 - Cadangan Kerugian Piutang')
//     .trigger('mouseover');
//     cy.contains('li', '1-10708 - Hak Merek Dagang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="sales_unbilled"]').trigger('change');
//     // Retur Penjualan
//     cy.get('[name="sales_return"]').click()
//     cy.contains('li', '17-10001 - Akun tanggal 21')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="sales_return"]').trigger('change');
//     // Piutang belum di tagih
//     cy.get('[name="sales_uncollected_receivables"]').click()
//     cy.contains('li', '17-10001 - Akun tanggal 21')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="sales_uncollected_receivables"]').trigger('change');
//     // Pengiriman penjualan
//     cy.get('[name="sales_delivery"]').click()
//     cy.contains('li', '2-20601 - Kewajiban Lancar Lainnya')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="sales_delivery"]').trigger('change');
//     // Hutang Pajak Penjualan
//     cy.get('[name="sales_tax_debt"]').click()
//     cy.contains('li', '1-10755 - Akumulasi Penyusutan - Peralatan Kantor')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="sales_tax_debt"]').trigger('change');

//     // cy.get('#panel1-header > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"]').click()

//     // Simpan perubahan
//     cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
//     // Tunggu respons API selesai
//     cy.wait('@updateSettingAccount').then((interception) => {
//       // Debug respons API
//       console.log('Request URL:', interception.request.url);
//       console.log('Response Status Code:', interception.response.statusCode);
      
//       // Validasi status kode API (204 berarti sukses tanpa konten)
//       expect(interception.response.statusCode).to.eq(204);
//       cy.get('.MuiAlert-message')
//       .should('be.visible')
//       .and('contain', 'Berhasil Menyimpan Data Akun.');
//       });
//   })

//   it('#SETTING_AKUN_03 Update data pengaturan akun data Pembelian di isi', () => {
//     // Intercept permintaan API
//     cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
    
//     cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('#panel1-header').click()
//     cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header').click()
//     // Pembelian(COGS)
//     cy.get('[name="purchase_cogs"]').click()
//     cy.contains('li', '1-10003 - Giro')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="purchase_cogs"]').trigger('change');
//     // Pembayaran di muka
//     cy.get('[name="purchase_uncollected_debt"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="purchase_uncollected_debt"]').trigger('change');
//     //  Pengiriman Pembelian
//     cy.get('[name="purchase_delivery"]').click()
//     cy.contains('li', '3-30000 - Modal Saham')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="purchase_delivery"]').trigger('change');
//     // Pajak Pembelian
//     cy.get('[name="purchase_tax"]').click()
//     cy.contains('li', '1-10708 - Hak Merek Dagang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="purchase_tax"]').trigger('change');
//     // Uang Muka Pembelian
//     cy.get('[name="purchase_down_payment"]').click()
//     cy.contains('li', '17-10001 - Akun tanggal 21')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="purchase_down_payment"]').trigger('change');
    
//     // Simpan perubahan
//     cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
//     // Tunggu respons API selesai
//     cy.wait('@updateSettingAccount').then((interception) => {
//       // Debug respons API
//       console.log('Request URL:', interception.request.url);
//       console.log('Response Status Code:', interception.response.statusCode);
      
//       // Validasi status kode API (204 berarti sukses tanpa konten)
//       expect(interception.response.statusCode).to.eq(204);
//       cy.get('.MuiAlert-message')
//       .should('be.visible')
//       .and('contain', 'Berhasil Menyimpan Data Akun.');
//       });
//   })

//   it('#SETTING_AKUN_04 Update data pengaturan akun data AR/AP di isi', () => {
//     // Intercept permintaan API
//     cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
    
//     cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('#panel1-header').click()
//     cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//     // Piutang usaha
//     cy.get('[name="account_receivable"]').click()
//     cy.contains('li', '1-10003 - Giro')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="account_receivable"]').trigger('change');
//     // Hutang usaha
//     cy.get('[name="account_payable"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="account_payable"]').trigger('change');
    
//     // Simpan perubahan
//     cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
//     // Tunggu respons API selesai
//     cy.wait('@updateSettingAccount').then((interception) => {
//       // Debug respons API
//       console.log('Request URL:', interception.request.url);
//       console.log('Response Status Code:', interception.response.statusCode);
      
//       // Validasi status kode API (204 berarti sukses tanpa konten)
//       expect(interception.response.statusCode).to.eq(204);
//       cy.get('.MuiAlert-message')
//       .should('be.visible')
//       .and('contain', 'Berhasil Menyimpan Data Akun.');
//       });
//   })

//   it('#SETTING_AKUN_05 Update data pengaturan akun data Persediaan di isi', () => {
//     // Intercept permintaan API
//     cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
    
//     cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('#panel1-header').click()
//     cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//     // Persedian
//     cy.get('[name="supply_inventory"]').click()
//     cy.contains('li', '1-10003 - Giro')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="supply_inventory"]').trigger('change');
//     // Persediaan Rusak 
//     cy.get('[name="supply_damaged"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="supply_damaged"]').trigger('change');
//     //  Persediaan umum
//     cy.get('[name="supply_general"]').click()
//     cy.contains('li', '3-30000 - Modal Saham')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="supply_general"]').trigger('change');
//     // Persedian PRoduksi
//     cy.get('[name="supply_production"]').click()
//     cy.contains('li', '1-10708 - Hak Merek Dagang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="supply_production"]').trigger('change');

//     // Simpan perubahan
//     cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
//     // Tunggu respons API selesai
//     cy.wait('@updateSettingAccount').then((interception) => {
//       // Debug respons API
//       console.log('Request URL:', interception.request.url);
//       console.log('Response Status Code:', interception.response.statusCode);
      
//       // Validasi status kode API (204 berarti sukses tanpa konten)
//       expect(interception.response.statusCode).to.eq(204);
//       cy.get('.MuiAlert-message')
//       .should('be.visible')
//       .and('contain', 'Berhasil Menyimpan Data Akun.');
//       });
//   })

//   it('#SETTING_AKUN_06 Update data pengaturan akun data lainnya di isi', () => {
//     // Intercept permintaan API
//     cy.intercept('PUT', '**/api/setting-accounts/*').as('updateSettingAccount');
    
//     cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('#panel1-header').click()
//     cy.get(':nth-child(5) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//     // Ekuitas Saldo Awal
//     cy.get('[name="balance_equity_beginning"]').click()
//     cy.contains('li', '1-10003 - Giro')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="balance_equity_beginning"]').trigger('change');
//     // Asset Tetap
//     cy.get('[name="fix_asset"]').click()
//     cy.contains('li', '1-10102 - Cadangan Kerugian Piutang')
//     .scrollIntoView()
//     .should('exist')
//     .click();
//     cy.get('[name="fix_asset"]').trigger('change');
    
//     // Simpan perubahan
//     cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
//     // Tunggu respons API selesai
//     cy.wait('@updateSettingAccount').then((interception) => {
//       // Debug respons API
//       console.log('Request URL:', interception.request.url);
//       console.log('Response Status Code:', interception.response.statusCode);
      
//       // Validasi status kode API (204 berarti sukses tanpa konten)
//       expect(interception.response.statusCode).to.eq(204);
//       cy.get('.MuiAlert-message')
//       .should('be.visible')
//       .and('contain', 'Berhasil Menyimpan Data Akun.');
//       });
//   })
// });

// describe('[PENGATURAN-AKUN] - Autocomplete di form pengaturan akun', () => {
// const navigatePengaturanAkun = () => {
//   cy.get('[data-testid="drawer-item-settings"]').click();
// };

// beforeEach(() => {
//   cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//   cy.visitDashboard(); // Visit the dashboard after successful login
//   navigatePengaturanAkun(); // Navigate to "Tambah Kontak" page for each test
//   });
// it('#SETTING_AKUN_01 Autocomplete di form pengaturan akun', () => {
//   cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//   // Pendapatan penjualan
//   cy.get('[name="sales_income"]').clear()
//   cy.get('[name="sales_income"]').clear()
//   cy.get('[name="sales_income"]').type('giro', { delay: 300 })
//   cy.get('body').type('{esc}'); // Tutup dropdown jika diperlukan

//   //  Diskon penjualan
//   cy.get('[name="sales_discount"]').clear()
//   cy.get('[name="sales_discount"]').clear()
//   cy.get('[name="sales_discount"]').type('modal')
//   cy.get('body').type('{esc}');

//   // Retur Penjualan
//   cy.get('[name="sales_down_payment"]').clear()
//   cy.get('[name="sales_down_payment"]').clear()
//   cy.get('[name="sales_down_payment"]').type('modal')
//   cy.get('body').type('{esc}');


//   // Penjualan Belum di Tagih
//   cy.get('[name="sales_unbilled"]').clear()
//   cy.get('[name="sales_unbilled"]').clear()
//   cy.get('[name="sales_unbilled"]').type('modal')
//   cy.get('body').type('{esc}');

//   // Retur Penjualan
//   cy.get('[name="sales_return"]').clear()
//   cy.get('[name="sales_return"]').clear()
//   cy.get('[name="sales_return"]').type('modal')
//   cy.get('body').type('{esc}');

//   // Piutang belum di tagih
//   cy.get('[name="sales_uncollected_receivables"]').clear()
//   cy.get('[name="sales_uncollected_receivables"]').clear()
//   cy.get('[name="sales_uncollected_receivables"]').type('modal')
//   cy.get('body').type('{esc}');

//    // Pengiriman penjualan
//    cy.get('[name="sales_delivery"]').clear()
//    cy.get('[name="sales_delivery"]').clear()
//    cy.get('[name="sales_delivery"]').type('modal')
//    cy.get('body').type('{esc}');

//    // Hutang Pajak Penjualan
//    cy.get('[name="sales_tax_debt"]').clear()
//    cy.get('[name="sales_tax_debt"]').clear()
//    cy.get('[name="sales_tax_debt"]').type('modal')
//    cy.get('body').type('{esc}');

//    cy.get('#panel1-header').click()
//    cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
    
//    // Pembelian(COGS)
//    cy.get('[name="purchase_cogs"]').clear()
//    cy.get('[name="purchase_cogs"]').clear()
//    cy.get('[name="purchase_cogs"]').type('modal')
//    cy.get('body').type('{esc}');

//    // Pembayaran di muka
//    cy.get('[name="purchase_uncollected_debt"]').clear()
//    cy.get('[name="purchase_uncollected_debt"]').clear()
//    cy.get('[name="purchase_uncollected_debt"]').type('modal')
//    cy.get('body').type('{esc}');
   
//    // Pengiriman Pembelian
//    cy.get('[name="purchase_delivery"]').clear()
//    cy.get('[name="purchase_delivery"]').clear()
//    cy.get('[name="purchase_delivery"]').type('modal')
//    cy.get('body').type('{esc}');

//     // Pajak Pembelian
//     cy.get('[name="purchase_tax"]').clear()
//     cy.get('[name="purchase_tax"]').clear()
//     cy.get('[name="purchase_tax"]').type('modal')
//     cy.get('body').type('{esc}');

//   // Uang Muka Pembelian
//   cy.get('[name="purchase_down_payment"]').clear()
//   cy.get('[name="purchase_down_payment"]').clear()
//   cy.get('[name="purchase_down_payment"]').type('modal')
//   cy.get('body').type('{esc}');

//   cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//   cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()

//   // Piutang Usaha
//    cy.get('[name="account_receivable"]').clear()
//    cy.get('[name="account_receivable"]').clear()
//    cy.get('[name="account_receivable"]').type('modal')
//    cy.get('body').type('{esc}');

//   // Hutang Usaha
//   cy.get('[name="account_payable"]').clear()
//   cy.get('[name="account_payable"]').clear()
//   cy.get('[name="account_payable"]').type('modal')
//   cy.get('body').type('{esc}');

//   cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//   cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()

//    // Persedian
//    cy.get('[name="supply_inventory"]').clear()
//    cy.get('[name="supply_inventory"]').clear()
//    cy.get('[name="supply_inventory"]').type('modal')
//    cy.get('body').type('{esc}');

//   // Persedian Rusak
//   cy.get('[name="supply_damaged"]').clear()
//   cy.get('[name="supply_damaged"]').clear()
//   cy.get('[name="supply_damaged"]').type('modal')
//   cy.get('body').type('{esc}');

//    // Persedian Umumu
//    cy.get('[name="supply_general"]').clear()
//    cy.get('[name="supply_general"]').clear()
//    cy.get('[name="supply_general"]').type('modal')
//    cy.get('body').type('{esc}');

//     // Persediaan Produksi
//   cy.get('[name="supply_production"]').clear()
//   cy.get('[name="supply_production"]').clear()
//   cy.get('[name="supply_production"]').type('modal')
//   cy.get('body').type('{esc}');

//   cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//   cy.get(':nth-child(5) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()

//   // Ekuitas Saldo Awal
//   cy.get('[name="balance_equity_beginning"]').clear()
//   cy.get('[name="balance_equity_beginning"]').clear()
//   cy.get('[name="balance_equity_beginning"]').type('modal')
//   cy.get('body').type('{esc}');

//   // Asset Tetap
//   cy.get('[name="fix_asset"]').clear()
//   cy.get('[name="fix_asset"]').clear()
//   cy.get('[name="fix_asset"]').type('modal')
//   cy.get('body').type('{esc}');
// })
// })

// describe('[PENGATURAN-AKUN] - Batal memilih hasil dari autocomplite', () => {
// const navigatePengaturanAkun = () => {
//   cy.get('[data-testid="drawer-item-settings"]').click();
// };

// beforeEach(() => {
//   cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//   cy.visitDashboard(); // Visit the dashboard after successful login
//   navigatePengaturanAkun(); // Navigate to "Tambah Kontak" page for each test
// });

// it('#SETTING_AKUN_01 Batal memilih hasil dari autocomplite', () => {
//   cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

//    // Pembayaran dimuka
//    cy.get('[name="sales_income"]').trigger('mouseover')
//    cy.get('[name="sales_income"]') // Ganti dengan selektor text field
//      .type('1-10102 - Cadangan Kerugian Piutang') // Isi text field dengan nilai
//    cy.get('[name="sales_income"]')
//      .trigger('mouseover');
//      cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
//    cy.get('body').type('{esc}'); // Tutup dropdown jika diperlukan
  
//   // Pembayaran dimuka
//   cy.get('[name="sales_down_payment"]')
//     .trigger('mouseover')
//   cy.get('[name="sales_down_payment"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="sales_down_payment"]')
//     .trigger('mouseover');
//   cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//   cy.get('body').type('{esc}')

//   // Diskon penjual
//   cy.get('[name="sales_discount"]').trigger('mouseover')
//   cy.get('[name="sales_discount"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="sales_discount"]')
//     .trigger('mouseover');
//   cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//   cy.get('body').type('{esc}')

//   // Penjualan Belum di Tagih
//   cy.get('[name="sales_unbilled"]').trigger('mouseover')
//   cy.get('[name="sales_unbilled"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="sales_unbilled"]')
//     .trigger('mouseover');
//   cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//   cy.get('body').type('{esc}')

//   // Retur penjualan
//   cy.get('[name="sales_return"]').trigger('mouseover')
//   cy.get('[name="sales_return"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="sales_return"]')
//     .trigger('mouseover');
//   cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(5) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//   cy.get('body').type('{esc}')

//   // Piutang belum di tagih
//   cy.get('[name="sales_uncollected_receivables"]').trigger('mouseover')
//   cy.get('[name="sales_uncollected_receivables"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="sales_uncollected_receivables"]')
//     .trigger('mouseover');
//   cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(6) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//   cy.get('body').type('{esc}')

//   // Pengiriman penjualan
//   cy.get('[name="sales_delivery"]').trigger('mouseover')
//   cy.get('[name="sales_delivery"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="sales_delivery"]')
//     .trigger('mouseover');
//   cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(7) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//   cy.get('body').type('{esc}')

//   // Hutang Pajak Penjualan
//   cy.get('[name="sales_tax_debt"]').trigger('mouseover')
//   cy.get('[name="sales_tax_debt"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="sales_tax_debt"]')
//     .trigger('mouseover');
//   cy.get('#panel1-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(8) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
//   cy.get('body').type('{esc}')

//   cy.get('#panel1-header').click()
//   cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//   // Pembelian(COGS)
//   cy.get('[name="purchase_cogs"]').trigger('mouseover')
//   cy.get('[name="purchase_cogs"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="purchase_cogs"]')
//     .trigger('mouseover');
//     cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
//   cy.get('body').type('{esc}')

//   // Pembayaran di muka
//   cy.get('[name="purchase_uncollected_debt"]').trigger('mouseover')
//   cy.get('[name="purchase_uncollected_debt"]')
//     .type('1-10102 - Cadangan Kerugian Piutang')
//   cy.get('[name="purchase_uncollected_debt"]')
//     .trigger('mouseover');
//     cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
//   cy.get('body').type('{esc}')

//    // Pengiriman Pembelian
//    cy.get('[name="purchase_delivery"]').trigger('mouseover')
//    cy.get('[name="purchase_delivery"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="purchase_delivery"]')
//      .trigger('mouseover');
//      cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
//    cy.get('body').type('{esc}')

//    // Pajak Pembelian
//    cy.get('[name="purchase_tax"]').trigger('mouseover')
//    cy.get('[name="purchase_tax"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="purchase_tax"]')
//      .trigger('mouseover');
//      cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
//    cy.get('body').type('{esc}')

//    cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header').click()

//    // Uang Muka Pembelian
//    cy.get('[name="purchase_down_payment"]').trigger('mouseover')
//    cy.get('[name="purchase_down_payment"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="purchase_down_payment"]')
//      .trigger('mouseover');
//      cy.get(':nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(5) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
//    cy.get('body').type('{esc}')

//    cy.get(':nth-child(2) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//    cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//    cy.get(':nth-child(3) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()

//    cy.get('[name="account_receivable"]').trigger('mouseover')
//    cy.get('[name="account_receivable"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="account_receivable"]')
//      .trigger('mouseover');
//    cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
//    cy.get('body').type('{esc}')

//    cy.get('[name="account_payable"]').trigger('mouseover')
//    cy.get('[name="account_payable"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="account_payable"]')
//      .trigger('mouseover');
//    cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]').click()
   
//    cy.get('body').type('{esc}')

//    cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//    cy.get(':nth-child(4) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()

//    cy.get('[name="supply_inventory"]').trigger('mouseover')
//    cy.get('[name="supply_inventory"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="supply_inventory"]')
//      .trigger('mouseover');
//    cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
   
//    cy.get('body').type('{esc}')

//    cy.get('[name="supply_damaged"]').trigger('mouseover')
//    cy.get('[name="supply_damaged"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="supply_damaged"]')
//      .trigger('mouseover');
//    cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
   
//    cy.get('body').type('{esc}')

//    cy.get('[name="supply_general"]').trigger('mouseover')
//    cy.get('[name="supply_general"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="supply_general"]')
//      .trigger('mouseover');
//    cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(3) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
   
//    cy.get('body').type('{esc}')

//    cy.get('[name="supply_production"]').trigger('mouseover')
//    cy.get('[name="supply_production"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="supply_production"]')
//      .trigger('mouseover');
//    cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2-content > .MuiAccordionDetails-root > .MuiGrid2-spacing-xs-2 > :nth-child(4) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
   
//    cy.get('body').type('{esc}')

//    cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()
//    cy.get(':nth-child(5) > .MuiAccordion-heading > #panel2-header > .MuiAccordionSummary-content').click()

//    cy.get('[name="balance_equity_beginning"]').trigger('mouseover')
//    cy.get('[name="balance_equity_beginning"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="balance_equity_beginning"]')
//      .trigger('mouseover');
//    cy.get(':nth-child(1) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
   
//    cy.get('body').type('{esc}')

//    cy.get('[name="fix_asset"]').trigger('mouseover')
//    cy.get('[name="fix_asset"]')
//      .type('1-10102 - Cadangan Kerugian Piutang')
//    cy.get('[name="fix_asset"]')
//      .trigger('mouseover');
//    cy.get(':nth-child(2) > .MuiGrid2-grid-xs-7 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click()
   
//    cy.get('body').type('{esc}')

//    cy.get('[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root').click()
// })
// })

// describe('[PENGATURAN-AKUN] - Spam hit', () => {
// const navigatePengaturanAkun = () => {
//   cy.get('[data-testid="drawer-item-settings"]').click();
// };

// beforeEach(() => {
//   cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login menggunakan kredensial valid
//   cy.visitDashboard(); // Kunjungi dashboard setelah login
//   navigatePengaturanAkun(); // Arahkan ke halaman "Pengaturan Akun" di setiap tes
// });

// it('should trigger spam hit', () => {
//   // Navigasi ke submenu "Pengaturan Akun"
//   cy.get('[data-cy="submenu-item-account-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();

//   // Mock API untuk menangkap permintaan
//   cy.intercept('PUT', '/api/setting-accounts', {
//     statusCode: 200,
//     body: { message: 'Success' },
//   }).as('updateSettings');

//   // Simulasi spam dengan klik tombol "Simpan" sebanyak 10 kali
//   for (let i = 0; i < 10; i++) {
//     cy.get(
//       '[style="display: flex; justify-content: flex-end; margin: 20px 0px;"] > .MuiButtonBase-root'
//     ).click();
//   }
// });
// })

