describe('[PENGATURAN-PERUSAHAAN] - Membuka halaman Pengaturan Perusahaan dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"] > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[data-cy="submenu-item-company-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('erni.yulianti@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });
  
    it('Chek kesesuainan halaman Pengaturan Perusahaan dengan design yang ada', () => {
        cy.get('[data-cy="submenu-item-company-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
        cy.get('[data-cy="company-name-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Nama Perusahaan');
        cy.get('[data-cy="office-phone-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'No Telp Kantor');
        cy.get('[data-cy="office-email-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Email Kantor');
        cy.get('[data-cy="office-address-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Alamat Kantor');
        cy.get('[data-cy="industry-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Industri');
        cy.get('[data-cy="company-size-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Ukuran Perusahaan');
        cy.get('[data-cy="company-logo-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Logo Perusahaan');
        cy.get('[data-cy="billing-address-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Alamat Penagihan');
        cy.get('[data-cy="shipping-address-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'Alamat Pengiriman');
        cy.get('[data-cy="npwp-header-setting-company"]')
            .should('be.visible')
            .and('contain', 'NPWP');
    });

    it('Edit data perusahaan', () => {
        cy.intercept('PUT', '**/api/setting-company/*').as('updateSettingCompany');
        cy.get('[data-cy="company-name-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('input[name="companyName"]').clear().type('Perusahaan Baru');
        cy.get('input[name="officePhoneNumber"]').clear().type('082268694838');
        cy.get('input[name="officeEmail"]').clear().type('erniyulianti333@gmail.com');
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
        cy.get('[data-cy="company-name-setting-company"]').should('contain', 'Perusahaan Baru');
    });

    it('Uji validasi saat field wajib dibiarkan kosong', () => {
        cy.get('[data-cy="company-name-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('input[name="companyName"]').clear();
        cy.get('input[name="officePhoneNumber"]').clear();
        cy.get('input[name="officeEmail"]').clear();
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
        cy.get('.MuiFormHelperText-root')
        .invoke('text')
        .should('match', /is Required/g);
    });

    it('Validasi input tidak boleh diawali spasi', () => {
        cy.get('[data-cy="company-name-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('input[name="companyName"]').clear().type('        Perusahaan Baru');
        cy.get('input[name="officePhoneNumber"]').clear().type(' 082268694838');
        cy.get('input[name="officeEmail"]').clear().type(' Erni@gmail.com');
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
    
    }); 
    it('Input nomor telepon kantor dengan data yang tidak valid', () => {
        cy.get('[data-cy="company-name-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('input[name="officePhoneNumber"]').clear().type('082268');
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
        cy.get('.MuiFormHelperText-root')
        .invoke('text')
        .should('match', /No. Telp Kantor minimal 9 digit/g);
        cy.get('input[name="officePhoneNumber"]').clear().type('082268abc');
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
    });

    it('Uji validasi email dengan format yang salah', () => {
        cy.get('[data-cy="company-name-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('input[name="officeEmail"]').clear().type('info.assist.id');
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
        cy.get('.MuiFormHelperText-root')
            .invoke('text')
            .should('match', /Invalid email/g);
    });

    it.only('Mengunggah file gambar untuk logo dengan format dan ukuran yang valid', () => {
        cy.get('[data-cy="company-logo-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('[data-cy="dropzone-logoCompany-setting-edit-company"]').click();
        const fileName = 'Kamarmedis.png'; // Ganti dengan nama file yang sesuai
        cy.fixture(fileName).then(fileContent => {
            cy.get('[data-cy="dropzone-logoCompany-setting-edit-company"] input[type="file"]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/.png/.jpg/.jpeg'
            });
        });
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
        // Assertion: pastikan logo tampil
        cy.get('[data-cy="company-logo-header-setting-company"] img', { timeout: 10000 })
        .should('be.visible');
        // cy.get('[data-cy="company-logo-header-setting-company"] img', { timeout: 10000 })
        // .should('be.visible');
    });

    it('Mengunggah file gambar untuk logo dengan ukuran yang tidak valid', () => {
        cy.get('[data-cy="company-logo-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('[data-cy="dropzone-logoCompany-setting-edit-company"]').click();
        const fileName = '11mb.png'; // Ganti dengan nama file yang sesuai
        cy.fixture(fileName).then(fileContent => {
            cy.get('[data-cy="dropzone-logoCompany-setting-edit-company"] input[type="file"]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/.png/.jpg/.jpeg'
            });
        });
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
        cy.contains('.MuiAlert-message', 'File melebihi batas maksimum 3 MB.')

    });

    it('Upload logo dengan file format tidak didukung', () => {
        cy.get('[data-cy="company-logo-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('[data-cy="dropzone-logoCompany-setting-edit-company"]').click();
        const fileName = 'Test Case Grup Faskes.pdf'; // Ganti dengan nama file yang sesuai
        cy.fixture(fileName).then(fileContent => {
            cy.get('[data-cy="dropzone-logoCompany-setting-edit-company"] input[type="file"]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/.png/.jpg/.jpeg'
            });
        });
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
        cy.get('.MuiAlert-message')
    });       

    it('Memilih data dari dropdown sesuai kebutuhan pengguna',() => {
        cy.intercept('PUT', '**/api/setting-company/*').as('updateSettingCompany');
        cy.get('[data-cy="company-logo-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();

        cy.get('[name="province"]').closest('.MuiInputBase-root').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="menuitem-RIAU-setting-edit-company"]')
        .scrollIntoView()
        .should('exist')
        .click();

        // Pilih province
        cy.get('[name="province"]').closest('.MuiInputBase-root').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="menuitem-RIAU-setting-edit-company"]').should('be.visible').click();

        //pilih city
        cy.get('[name="city"]').closest('.MuiInputBase-root').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="menuitem-PEKANBARU-setting-edit-company"]').should('be.visible').click();

        // pilih postal code
        cy.get('[name="postalCode"]').closest('.MuiInputBase-root').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="menuitem-28284-setting-edit-company"]').should('be.visible').click();
       
        // Pilih industry
        cy.get('[name="industry"]').closest('.MuiInputBase-root').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="menuitem-Health Care-setting-edit-company"]').should('be.visible').click();

        //pilih jumlah karyawan
        cy.get('[name="companySize"]').closest('.MuiInputBase-root').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="menuitem-10 - 50 Karyawan-setting-edit-company"]').should('be.visible').click();
        
        // Simpan perubahan
        cy.get('[data-cy="button-save-setting-edit-company"]').click();
    });

    it.only('Membatalkan perubahan data',() => {
        cy.intercept('PUT', '**/api/setting-company/*').as('updateSettingCompany');
        cy.get('[data-cy="company-name-header-setting-company"]').click();
        cy.get('[data-cy="button-edit-data-setting-company"]').click();
        cy.get('input[name="companyName"]').clear().type('Perusahaan');
        cy.get('input[name="officePhoneNumber"]').clear().type('082268694838');
        cy.get('input[name="officeEmail"]').clear().type('erniyulianti333@gmail.com');
        cy.get('[data-cy="button-cancel-setting-edit-company"]').click();

        // Assertion: pastikan kembali ke halaman utama pengaturan perusahaan
        cy.get('[data-cy="company-name-header-setting-company"]')
        .should('be.visible')
        .and('contain', 'Nama Perusahaan');
    });
});