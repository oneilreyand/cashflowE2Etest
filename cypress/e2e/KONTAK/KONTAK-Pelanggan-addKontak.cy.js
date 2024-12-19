describe("KONTAK - PELANGGAN ADD", () => {
    const navigateToKontak = () => {
        cy.get('[data-testid="drawer-item-contacts"]').click();
        // cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
        };
    
    beforeEach(() => {
    cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(); // Visit the dashboard after successful login
    navigateToKontak(); // Navigate to "Tambah Kontak" page for each test
    });

    it('harus memunculkan page kontak - pelanggan', () => {
        // Menunggu request API untuk memuat data
        cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
    
        // Menggunakan baseUrl dari konfigurasi Cypress
        const url = `${Cypress.config('baseUrl')}/admin/contacts`;
    
        // Membuka halaman sesuai baseUrl
        cy.visit(url);
    
        // Tunggu hingga API selesai dan respons diterima
        cy.wait('@getProfile'); // Tunggu hingga API selesai
        
        // Lakukan aksi setelah API berhasil dijalankan
        cy.get('.MuiTypography-h5 > span').should('be.visible').and('not.be.empty');
    });

    it('Add kontak pelanggan dengan semua field tidak di isi, harus memunculkan pesan error', () => {
        // cy.get('[data-cy="add-button"]').click()
        cy.get('[data-testid="AddIcon"]').closest('a').click();

        cy.scrollTo('bottom').then(() => {
            cy.get('.MuiButton-contained').click()
        })
        
        cy.scrollTo('top').then(() => {
            cy.get('#nama-helper-text').should('be.visible').and('contain', 'Nama Lengkap harus diisi')
            cy.get('#nama_perusahaan-helper-text').should('be.visible').and('contain', 'Nama Perusahaan harus diisi')
            cy.get('#no_hp-helper-text').should('be.visible').and('contain', 'Nomor HP harus diisi')
            cy.get('#no_fax-helper-text').should('be.visible').and('contain','Nomor Fax harus diisi')
        })
    })

    it("Add kontak pelanggan - Validasi email tidak sesuai format(@)", () => {
        cy.get('[data-testid="AddIcon"]').closest('a').click();

        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="9b38f9b0-a658-11ef-8f78-25bebcc62186"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('reyand oneil')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test");

        cy.get('#nama_perusahaan').type('axa mandiri')

        cy.get('#no_hp').type('078817236836782647832648723')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#nitku').type('98234789327492384')

        cy.get('[name="alamat_penagihan"]').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('[name="alamat_pengiriman"]').type('jl.sudirman no.324')

        cy.get('[name="alamatPengirimanEqPenagihan"]').click()

        cy.get('[name="bank_name.0"]').type('bca')

        cy.get('[name="bank_branch.0"]').type('jl.riau')

        cy.get('[name="holder_name.0"]').type('reyand oneil')

        cy.get('[name="rek_no.0"]').type('000234892374')

        // cy.get('#fk_akun_piutang').click()
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10300 - Piutang Lainnya').click();
        
        cy.get('#fk_akun_hutang').click()
        cy.contains('li', '5-50200 - Retur Pembelian').click();

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        // cy.contains('li', '5-50200 - Pilih Syarat Pembayaran Utama').click();


        cy.get('.MuiButton-contained').click()
        cy.get('#nama-helper-text').should('be.visible').and('contain', 'Nama Lengkap harus diisi')

    });

    it("Add kontak pelanggan - Validasi email tidak sesuai format(spasi di akhir format)", () => {
        cy.get('[data-testid="AddIcon"]').closest('a').click();

        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();
        cy.contains('li', 'vendor obat asist 2').click();


        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('reyand oneil')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@mail.com ");

        cy.get('#nama_perusahaan').type('axa mandiri')

        cy.get('#no_hp').type('078817236836782647832648723')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#nitku').type('98234789327492384')

        cy.get('[name="alamat_penagihan"]').type('jalan paus no.32897')


        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('[name="alamat_pengiriman"]').type('jl.sudirman no.324')

        cy.get('[name="alamatPengirimanEqPenagihan"]').click()

        cy.get('[name="bank_name.0"]').type('bca')

        cy.get('[name="bank_branch.0"]').type('jl.riau')

        cy.get('[name="holder_name.0"]').type('reyand oneil')

        cy.get('[name="rek_no.0"]').type('000234892374')

        // cy.get('#fk_akun_piutang').click()
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10300 - Piutang Lainnya').click();
        
        cy.get('#fk_akun_hutang').click()
        cy.contains('li', '5-50200 - Retur Pembelian').click();

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        // cy.contains('li', '5-50200 - Pilih Syarat Pembayaran Utama').click();


        cy.get('.MuiButton-contained').click()
        cy.get('#nama-helper-text').should('be.visible').and('contain', 'Nama Lengkap harus diisi')
    });

    it.only("Add kontak pelanggan - Validasi email tidak sesuai format(setelah@ diksaih spasi)", () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('reyand oneil')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@ mail.com");

        cy.get('#nama_perusahaan').type('axa mandiri')

        cy.get('#no_hp').type('078817236836782647832648723')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#\\:r1l\\:').type('jalan paus no.32897')
        // cy.get('#\\:rq\\:').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#\\:r1n\\:').type('jl.sudirman no.324')
        // cy.get('#\\:rr\\:').type('jl.sudirman no.324')

        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#data_bank\\.0\\.bank_name').type('bca')

        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau')

        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil')

        cy.get('#data_bank\\.0\\.rek_no').type('000234892374')

        cy.get('#fk_akun_piutang').click()
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click()

        cy.get('#fk_akun_hutang').click()
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click()

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        cy.get('[data-value="30"]').click()

        cy.get('.MuiButton-contained').click()
        cy.get('#nama-helper-text').should('be.visible').and('contain', 'Nama Lengkap harus diisi')
    });

    it("Add kontak pelanggan - Validasi nama lengkap pelanggan tidak di isi", () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').clear()

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@example.com");

        cy.get('#nama_perusahaan').type('axa mandiri')

        cy.get('#no_hp').type('078817236836782647832648723')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#\\:r1l\\:').type('jalan paus no.32897')
        // cy.get('#\\:rq\\:').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#\\:r1n\\:').type('jl.sudirman no.324')
        // cy.get('#\\:rr\\:').type('jl.sudirman no.324')

        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#data_bank\\.0\\.bank_name').type('bca')

        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau')

        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil')

        cy.get('#data_bank\\.0\\.rek_no').type('000234892374')

        cy.get('#fk_akun_piutang').click()
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click()

        cy.get('#fk_akun_hutang').click()
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click()

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        cy.get('[data-value="30"]').click()

        cy.get('.MuiButton-contained').click()
        cy.get('#nama-helper-text').should('be.visible').and('contain', 'Nama Lengkap harus diisi')

    });

    it("Add kontak pelanggan - Validasi nama lengkap pelanggan di isi dengan angka/number", () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('230947237480293483')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@example.com");

        cy.get('#nama_perusahaan').type('axa mandiri')

        cy.get('#no_hp').type('078817236836782647832648723')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#\\:r1l\\:').type('jalan paus no.32897')
        // cy.get('#\\:rq\\:').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#\\:r1n\\:').type('jl.sudirman no.324')
        // cy.get('#\\:rr\\:').type('jl.sudirman no.324')

        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#data_bank\\.0\\.bank_name').type('bca')

        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau')

        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil')

        cy.get('#data_bank\\.0\\.rek_no').type('000234892374')

        cy.get('#fk_akun_piutang').click()
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click()

        cy.get('#fk_akun_hutang').click()
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click()

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        cy.get('[data-value="30"]').click()

        cy.get('.MuiButton-contained').click()
        cy.get('#nama-helper-text').should('be.visible').and('contain', 'Nama Lengkap harus diisi')

    });

    it("Add kontak pelanggan - Validasi nama lengkap pelanggan di isi dengan symbol", () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('$^@^&%^&**$$()*@{@($')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@example.com");

        cy.get('#nama_perusahaan').type('axa mandiri')

        cy.get('#no_hp').type('078817236836782647832648723')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#\\:r1l\\:').type('jalan paus no.32897')
        // cy.get('#\\:rq\\:').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#\\:r1n\\:').type('jl.sudirman no.324')
        // cy.get('#\\:rr\\:').type('jl.sudirman no.324')

        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#data_bank\\.0\\.bank_name').type('bca')

        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau')

        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil')

        cy.get('#data_bank\\.0\\.rek_no').type('000234892374')

        cy.get('#fk_akun_piutang').click()
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click()

        cy.get('#fk_akun_hutang').click()
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click()

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        cy.get('[data-value="30"]').click()

        cy.get('.MuiButton-contained').click()
        cy.get('#nama-helper-text').should('be.visible').and('contain', 'Nama Lengkap harus diisi')
    });

    it("Add kontak pelanggan - Validasi nama perusahaan tidak di isi", () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('reyand')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@example.com");

        cy.get('#nama_perusahaan').clear()

        cy.get('#no_hp').type('078817236836782647832648723')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#\\:r1l\\:').type('jalan paus no.32897')
        // cy.get('#\\:rq\\:').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#\\:r1n\\:').type('jl.sudirman no.324')
        // cy.get('#\\:rr\\:').type('jl.sudirman no.324')

        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#data_bank\\.0\\.bank_name').type('bca')

        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau')

        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil')

        cy.get('#data_bank\\.0\\.rek_no').type('000234892374')

        cy.get('#fk_akun_piutang').click()
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click()

        cy.get('#fk_akun_hutang').click()
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click()

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        cy.get('[data-value="30"]').click()

        cy.get('.MuiButton-contained').click()
        cy.get('#nama_perusahaan-helper-text').should('be.visible').and('contain', 'Nama Perusahaan harus diisi')

    });

    it("Add kontak pelanggan - Validasi nomor hp tidak di isi", () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('reyand')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@example.com");

        cy.get('#nama_perusahaan').type('axa')

        cy.get('#no_hp').clear()

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').type('021342894783247')

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#\\:r1l\\:').type('jalan paus no.32897')
        // cy.get('#\\:rq\\:').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#\\:r1n\\:').type('jl.sudirman no.324')
        // cy.get('#\\:rr\\:').type('jl.sudirman no.324')

        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#data_bank\\.0\\.bank_name').type('bca')

        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau')

        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil')

        cy.get('#data_bank\\.0\\.rek_no').type('000234892374')

        cy.get('#fk_akun_piutang').click()
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click()

        cy.get('#fk_akun_hutang').click()
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click()

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        cy.get('[data-value="30"]').click()

        cy.get('.MuiButton-contained').click()
        cy.get('#no_hp-helper-text').should('be.visible').and('contain', 'Nomor HP harus diisi')
    });

    it("Add kontak pelanggan - Validasi nomor FAX tidak di isi", () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('#tipe_kontak').click()
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');

       // Open the dropdown
        cy.get('#fk_grup').click();

        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();

        cy.get('body').type('{esc}');

        cy.get('#sapaan').click()
        cy.contains('li', 'Bapak').click();

        cy.get('#nama').type('reyand')

        cy.get('#tipe_identitas').click()
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234')

        cy.get('[id="email.0"]').type("test@example.com");

        cy.get('#nama_perusahaan').type('axa')

        cy.get('#no_hp').clear('09971263826367421')

        cy.get('#no_telp').type('021342894783247')

        cy.get('#no_fax').clear()

        cy.get('#no_npwp').type('97438584984758473543')

        cy.get('#\\:r1l\\:').type('jalan paus no.32897')
        // cy.get('#\\:rq\\:').type('jalan paus no.32897')

        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#\\:r1n\\:').type('jl.sudirman no.324')
        // cy.get('#\\:rr\\:').type('jl.sudirman no.324')

        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#data_bank\\.0\\.bank_name').type('bca')

        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau')

        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil')

        cy.get('#data_bank\\.0\\.rek_no').type('000234892374')

        cy.get('#fk_akun_piutang').click()
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click()

        cy.get('#fk_akun_hutang').click()
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click()

        cy.get('#piutang_max').type('50000000')

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('#syarat_pembayaran').click()
        cy.get('[data-value="30"]').click()

        cy.get('.MuiButton-contained').click()
        cy.get('#no_fax-helper-text').should('be.visible').and('contain','Nomor Fax harus diisi')
    });

    it("Add kontak pelanggan degan mengisi semua field yang ada", () => {
        // Intercept API yang memuat data akun
        cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
        const url = `${Cypress.config('baseUrl')}/admin/contacts`;

    
        // Klik tombol untuk memulai proses tambah kontak pelanggan
        cy.get('[data-cy="add-button"]').click();
        
         // Tunggu sampai data dari API `list2` terpopulate
        cy.wait('@getProfile'); // Tunggu hingga API selesai
         
        
        // Isi form
        cy.get('#tipe_kontak').click();
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');
    
        // Open the dropdown
        cy.get('#fk_grup').click();
    
        // Select the option
        cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
            .should('be.visible')
            .click();
    
        cy.get('body').type('{esc}');
    
        cy.get('#sapaan').click();
        cy.contains('li', 'Bapak').click();
    
        cy.get('#nama').type('jon doe');
    
        cy.get('#tipe_identitas').click();
        cy.contains('li', 'KTP').click();
        cy.get('#no_identitas').type('3242343478749273423234');
    
        cy.get('[id="email.0"]').type("jondoe@example.com");
    
        cy.get('#nama_perusahaan').type('jon doe mandiri');
    
        cy.get('#no_hp').type('078817236836782647832648723');
    
        cy.get('#no_telp').type('021342894783247');
    
        cy.get('#no_fax').type('021342894783247');
    
        cy.get('#no_npwp').type('97438584984758473543');
    
        cy.get('#\\:rq\\:').type('jalan paus no.32897');
    
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    
        cy.get('#\\:rr\\:').type('jl.sudirman no.324');
    
        cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    
        cy.get('#data_bank\\.0\\.bank_name').type('bca');
    
        cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau');
    
        cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil');
    
        cy.get('#data_bank\\.0\\.rek_no').type('000234892374');
    
        cy.get('#fk_akun_piutang').click();
        cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click();
    
        cy.get('#fk_akun_hutang').click();
        cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click();
    
        cy.get('#piutang_max').type('50000000');
    
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    
        cy.get('#syarat_pembayaran').click();
        cy.get('[data-value="30"]').click();
    
        // Submit the form
        cy.get('.MuiButton-contained').click();
        cy.wait('@getProfile'); // Tunggu hingga API selesai
        cy.visit(url);
        
        // Lakukan aksi setelah API berhasil dijalankan
        cy.get('.MuiTypography-h5 > span').should('be.visible').and('not.be.empty');

    });

    it("Tambah grup kontak", () => {
        // Intercept API yang memuat data akun
        cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
        cy.intercept('GET', '/api/akuns/list2?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getList2'); // Intercept API list2
        const url = `${Cypress.config('baseUrl')}/admin/contacts`;
    
        // Klik tombol untuk memulai proses tambah kontak pelanggan
        cy.get('[data-cy="add-button"]').click();
    
        // Tunggu sampai data dari API profile terpopulate
        cy.wait('@getProfile'); // Tunggu hingga API selesai
    
        // Isi form
        cy.get('#tipe_kontak').click();
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');
    
        // Open the dropdown for group selection
        cy.get('#fk_grup').click();
        cy.get('[data-cy="add-new"]').click(); // Klik untuk membuat grup baru
        cy.get('#\\:r2f\\:').type('vendor obat asist 3'); // Masukkan nama grup baru
        cy.get('[data-testid="CheckIcon"]').should('be.visible').click(); // Klik untuk menyimpan dan menutup modal
    
        // Tunggu hingga API `list2` dipanggil untuk memverifikasi data baru
        cy.wait('@getList2'); // Pastikan API `list2` berhasil dipanggil
    
        // Tunggu hingga dropdown diperbarui
        cy.get('#fk_grup').click(); // Buka dropdown lagi untuk verifikasi
        cy.contains('li', 'vendor obat asist 3')
            .scrollIntoView() // Pastikan elemen terlihat
            .should('exist') // Verifikasi elemen ada
            .click({ force: true }); // Klik elemen
    
        // // Verifikasi grup baru dipilih
        cy.get('body').type('{esc}'); // Tutup dropdown
        cy.get('#fk_grup').should('contain', 'vendor obat asist 3');
    });

    it("Tambah grup kontak dengan nama yang sama", () => {
        // Intercept API yang memuat data akun
        cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
        cy.intercept('GET', '/api/akuns/list2?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getList2'); // Intercept API list2
        const url = `${Cypress.config('baseUrl')}/admin/contacts`;
    
        // Klik tombol untuk memulai proses tambah kontak pelanggan
        cy.get('[data-cy="add-button"]').click();
    
        // Tunggu sampai data dari API profile terpopulate
        cy.wait('@getProfile'); // Tunggu hingga API selesai
    
        // Isi form
        cy.get('#tipe_kontak').click();
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');
    
        // Open the dropdown for group selection
        cy.get('#fk_grup').click();
        cy.get('[data-cy="add-new"]').click(); // Klik untuk membuat grup baru
        cy.get('#\\:r2f\\:').type('vendor obat asist 3'); // Masukkan nama grup baru
        cy.get('[data-testid="CheckIcon"]').should('be.visible').click(); // Klik untuk menyimpan dan menutup modal
    
        // Tunggu hingga API `list2` dipanggil untuk memverifikasi data baru
        cy.wait('@getList2'); // Pastikan API `list2` berhasil dipanggil
    
        // Tunggu hingga dropdown diperbarui
        cy.get('#fk_grup').click(); // Buka dropdown lagi untuk verifikasi
        cy.contains('li', 'vendor obat asist 3')
            .scrollIntoView() // Pastikan elemen terlihat
            .should('exist') // Verifikasi elemen ada
            .click({ force: true }); // Klik elemen
    
        // // Verifikasi grup baru dipilih
        cy.get('body').type('{esc}'); // Tutup dropdown
        cy.get('#fk_grup').should('contain', 'vendor obat asist 7');
    });

    it("Batal tambah grup kontak", () => {
        // Intercept API yang memuat data akun
        cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
        cy.intercept('GET', '/api/akuns/list2?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getList2'); // Intercept API list2
        const url = `${Cypress.config('baseUrl')}/admin/contacts`;
    
        // Klik tombol untuk memulai proses tambah kontak pelanggan
        cy.get('[data-cy="add-button"]').click();
    
        // Tunggu sampai data dari API profile terpopulate
        cy.wait('@getProfile'); // Tunggu hingga API selesai
    
        // Isi form
        cy.get('#tipe_kontak').click();
        cy.contains('li', 'Pelanggan').click();
        cy.get('#tipe_kontak').should('contain', 'Pelanggan');
    
        // Open the dropdown for group selection
        cy.get('#fk_grup').click();
        cy.get('[data-cy="add-new"]').click(); // Klik untuk membuat grup baru
        cy.get('#\\:r2f\\:').clear() // Masukkan nama grup baru
        cy.get('[data-testid="CloseIcon"]').should('be.visible').click(); // Klik untuk menyimpan dan menutup modal
    });

    it("Add kontak pelanggan degan kondisi email lebih dari 1 (3)", () => {
            // Intercept API yang memuat data akun
            // cy.intercept('GET', '/api/profile/me?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c').as('getProfile');
            // const url = `${Cypress.config('baseUrl')}/admin/contacts`;
    
        
            // Klik tombol untuk memulai proses tambah kontak pelanggan
            cy.get('[data-cy="add-button"]').click();
            
             // Tunggu sampai data dari API `list2` terpopulate
            // cy.wait('@getProfile'); // Tunggu hingga API selesai
             
            
            // Isi form
            cy.get('#tipe_kontak').click();
            cy.contains('li', 'Pelanggan').click();
            cy.get('#tipe_kontak').should('contain', 'Pelanggan');
        
            // Open the dropdown
            cy.get('#fk_grup').click();
        
            // Select the option
            cy.get('[data-value="117d0802-a578-11ef-9665-85c3a0b6b870"]')
                .should('be.visible')
                .click();
        
            cy.get('body').type('{esc}');
        
            cy.get('#sapaan').click();
            cy.contains('li', 'Bapak').click();
        
            cy.get('#nama').type('bambang');
        
            cy.get('#tipe_identitas').click();
            cy.contains('li', 'KTP').click();
            cy.get('#no_identitas').type('3242343478749273423234');
        
            cy.get('[id="email.0"]').type("jondoe@example.com");
            cy.get(':nth-child(2) > .MuiCardContent-root > .css-1jxwjqx-MuiGrid2-root > .MuiGrid2-spacing-xs-2 > .css-pi73hy-MuiGrid2-root > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiStack-root > .MuiButton-textPrimary').click()
            cy.get('[id="email.1"]').type("jondoe2@example.com");
            cy.get(':nth-child(2) > .MuiCardContent-root > .css-1jxwjqx-MuiGrid2-root > .MuiGrid2-spacing-xs-2 > .css-pi73hy-MuiGrid2-root > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiStack-root > .MuiButton-textPrimary').click()
            cy.get('[id="email.2"]').type("jondoe3@example.com");
            cy.get('#nama_perusahaan').type('bambang mandiri');
        
            cy.get('#no_hp').type('078817236836782647832648723');
        
            cy.get('#no_telp').type('021342894783247');
        
            cy.get('#no_fax').type('021342894783247');
        
            cy.get('#no_npwp').type('97438584984758473543');
        
            cy.get('[name="alamat_penagihan"]').type('jalan paus no.32897');
        
            cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        
            cy.get('[name="alamat_pengiriman"]').type('jl.sudirman no.324');
        
            cy.get(':nth-child(15) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        
            cy.get('#data_bank\\.0\\.bank_name').type('bca');
        
            cy.get('#data_bank\\.0\\.bank_branch').type('jl.riau');
        
            cy.get('#data_bank\\.0\\.holder_name').type('reyand oneil');
        
            cy.get('#data_bank\\.0\\.rek_no').type('000234892374');
        
            cy.get('#fk_akun_piutang').click();
            cy.get('[data-value="8391d760-ecc4-49e2-913b-fac2bcb67e6d"]').click();
        
            cy.get('#fk_akun_hutang').click();
            cy.get('[data-value="9933924d-920f-4fef-bb2e-799c979acc17"]').click();
        
            cy.get('#piutang_max').type('50000000');
        
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        
            cy.get('#syarat_pembayaran').click();
            cy.get('[data-value="30"]').click();
        
            // Submit the form
            cy.get('.MuiButton-contained').click()
            // cy.wait('@getProfile'); // Tunggu hingga API selesai
            // cy.visit(url);
            
            // // Lakukan aksi setelah API berhasil dijalankan
            // cy.get('.MuiTypography-h5 > span').should('be.visible').and('not.be.empty');
    
    });

    it('Batal add kontak pelanggan', () => {
        cy.get('[data-cy="add-button"]').click()
        cy.get('.css-2bof0u-MuiStack-root > .MuiButton-text').click()
    })
  });