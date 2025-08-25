const companyId = Cypress.env('companyId');

describe("PENJUALAN BARU", () => {
    beforeEach(() => {
        cy.handleUncaughtExceptions()
        cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
        cy.visitDashboard(companyId);
        cy.navigateToPenjualan();
        cy.contains('Penjualan Baru', { timeout: 20000 }).click();
    });

    it('TC-0001 Validasi Penulisan Komponen UI Statis Pada Penjualan Baru', () => {

        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-2 > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(7) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()

        cy.get('.MuiTypography-h5 > span').should('have.text', 'Penjualan Baru')
        cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan/Penjualan Baru')

        cy.get('legend.MuiFormLabel-root.MuiFormLabel-colorPrimary').eq(0).should('have.text', 'Nomor')
        cy.get('#nomor').should('have.attr', 'placeholder', '[Auto]')

        cy.get('legend.MuiFormLabel-root.MuiFormLabel-colorPrimary').eq(1).should('have.text', 'Nama Pelanggan\u2009*')
        cy.get('#idPelanggan').should('be.visible')
        cy.get('#idPelanggan-label').should('have.text', 'Pelanggan')

        cy.get('legend.MuiFormLabel-root.MuiFormLabel-colorPrimary').eq(2).should('have.text', 'Tgl Transaksi & Jatuh Tempo\u2009*')
        cy.get('[placeholder="DD/MM/YYYY"]').should('have.length', '3');
        cy.get('label').contains('Tanggal Transaksi').and('be.visible')
        cy.get('label').contains('Jatuh Tempo').and('be.visible')

        cy.get('legend.MuiFormLabel-root.MuiFormLabel-colorPrimary').eq(3).should('have.text', 'Syarat Pembayaran')
        cy.get('#paymentTerms-label').should('have.text', 'Syarat Pembayaran')
        cy.get('#paymentTerms').should('be.visible')

        cy.get('legend.MuiFormLabel-root.MuiFormLabel-colorPrimary').eq(4).should('have.text', 'Alamat Penagihan\u2009*')
        cy.get('#address').should('be.visible')
        cy.get('#address-label').should('have.text', 'Alamat Penagihan')

        cy.get('legend.MuiFormLabel-root.MuiFormLabel-colorPrimary').eq(5).should('have.text', 'Info Pengiriman')
        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-2 > .MuiGrid2-root > .MuiTypography-root').should('have.text', 'Centang jika barang perlu dikirim')
        cy.get(':nth-child(2) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiTypography-root').should('have.text', 'Masukkan informasi pengiriman penjualan')
        cy.get('label').contains('Tanggal Pengiriman').should('be.visible')
        cy.get('label').contains('Ekspedisi').should('be.visible')
        cy.get('label').contains('Masukkan No. Resi').should('be.visible')

        cy.get(':nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiGrid2-root > .MuiFormLabel-root').should('have.text', 'Info Salesman')
        cy.get(' * > :nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiGrid2-root > .MuiTypography-root').eq(0).should('have.text', 'Centang jika memiliki sales')
        cy.get(':nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiFormControlLabel-root > .MuiTypography-root').should('have.text', 'Masukkan informasi sales penjualan')
        cy.get('label').contains('Salesman').should('be.visible')

        cy.get(':nth-child(4) > * > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should('have.text', 'Harga Termasuk Pajak')

        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('have.text', 'Nama Produk')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('have.text', 'Gudang')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('have.text', 'Deskripsi')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('have.text', 'Qty')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should('have.text', 'Satuan')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should('have.text', 'Harga')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)').should('have.text', 'Diskon (%)')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(8)').should('have.text', 'Pajak')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(9)').should('have.text', 'Jumlah')

        cy.get('[id="penjualan.0.product_id-label"]').should('have.text', 'Nama Produk')
        cy.get('[id="penjualan.0.gudang_id-label"]').should('have.text', 'Gudang\u2009*')
        cy.get('[id="penjualan.0.deskripsi-label"]').should('have.text', 'Deskripsi')
        cy.get('label').eq(16).should('have.text', 'Qty\u2009*');
        cy.get('[id="penjualan.0.unit-label"]').should('have.text', 'Satuan');
        cy.get('label').eq(18).should('have.text', 'Harga');
        cy.get('label').eq(19).should('have.text', 'Diskon (%)');
        cy.get('[id="penjualan.0.tax-label"]').should('have.text', 'Pajak');
        cy.get('label').eq(21).should('have.text', 'Jumlah')

        cy.get(':nth-child(2) > .MuiTableCell-root > .MuiButtonBase-root').should('have.text', 'Baris Baru')
        cy.contains('h6', 'Lampiran & Catatan').should('be.visible')
        cy.get('#notes').should('have.attr', 'placeholder', 'Masukkan catatan disini')
        cy.get('.MuiTypography-subtitle1').should('have.text', 'Klik atau seret file ke area ini')
        cy.get('.MuiTypography-caption').should('have.text', 'Maksimum 10 MB • Format: .PDF, .JPG, .JPEG, .PNG')
        cy.contains('h6', 'Subtotal').should('be.visible')
        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiTypography-root').should('have.text', 'Diskon')
        cy.contains('h6', 'PPN').should('be.visible')
        cy.contains('h6', 'Biaya Pengiriman').should('be.visible')
        cy.get(':nth-child(7) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiTypography-root').should('have.text', 'Pemotongan')
        cy.get('#akun-label').should('have.text', 'Pilih Akun\u2009*')
        cy.get(':nth-child(10) > .MuiGrid2-container > .MuiGrid2-root > .MuiTypography-root').should('have.text', 'Sisa Tagihan')
        cy.get('button').contains('Batalkan').should('be.visible')
        cy.get('.MuiButton-contained').should('have.text', 'Konfirmasi Simpan')

    });

    it('TC-0002 Uji Komponen Text Helper', () => {

        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-2 > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(7) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('#idPelanggan').should('have.value', "")
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type('{selectall}{backspace}')
        cy.get('[name="penjualan.0.quantity"]').clear();
        cy.get('.MuiButton-contained').click()
        cy.get('[data-testid="alert-dialog-submit-button"]').click()

        cy.wait(1000)
        cy.contains('Nama harus diisi').should('be.exist')
        cy.contains('p', 'Tanggal harus diisi').should('be.exist')
        cy.contains('p', 'Alamat penagihan harus diisi').should('be.exist')
        cy.contains('Gudang harus dipilih').should('be.exist')
        cy.contains('Jumlah tidak boleh 0').should('be.exist')
        cy.contains('Akun harus dipilih').should('be.exist')

        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')

    });

    it('TC-0003 Membuat Penjualan Baru Dengan Required Input Only', () => {
        cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.reload();
        cy.wait('@waitPelanggan').then(({ response }) => {
            const pelanggan = response.body.results[0];
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`)
                .eq(1).click()
                .scrollIntoView({ block: 'center' }) // pastikan muncul di tengah viewport
                .should('be.visible') // pastikan visible
                .click({ force: true }); // bypass overlay check kalau masih ketutup
        });

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
                cy.get('td').eq(1, { timeout: 20000 }).should('have.text', res.nomor);
            })
        });
    });

    it('TC-0004 Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input (Nama)', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // tanpa nama pelanggan
        // cy.get('#idPelanggan').click();
        // cy.get('[data-value]').eq(1).click();
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('.MuiButton-contained').click();
        cy.intercept('POST', '**/api/penjualan').as('Hit')

        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('@Hit.all').should('have.length', 0);
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('have.text', 'Nama harus diisi')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')

    })

    it('TC-0005 Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input (Tanggal Transaksi)', () => {
        // const dateToday = new Date().toLocaleDateString('id-ID');
        // cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // tanpa tanggal transaksi
        cy.get('#idPelanggan').click();
        cy.get(`[data-value]`)
            .eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}`);
        cy.wait(500)
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('.MuiButton-contained').click();
        cy.intercept('POST', '**/api/penjualan').as('Hit')

        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('@Hit.all').should('have.length', 0);

        cy.contains('Tanggal harus diisi').should('be.visible')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')

    })

    it('TC-0006 Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input (Alamat Penagihan)', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // tanpa Alamat Penagihan
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });


        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').clear();
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('.MuiButton-contained').click();
        cy.intercept('POST', '**/api/penjualan').as('Hit')
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('@Hit.all').should('have.length', 0);

        cy.get('#address-helper-text').should('have.text', 'Alamat penagihan harus diisi')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')

    })

    it('TC-0007 Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input (Produk)', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // tanpa Alamat Penagihan
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });


        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').clear().type('Alamat Penjualan');
        // cy.get('[id="penjualan.0.product_id"]').click();
        // cy.get('[data-value]').eq(1).click();
        cy.get('.MuiButton-contained').click();
        cy.intercept('POST', '**/api/penjualan').as('Hit')

        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('@Hit.all').should('have.length', 0);

        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('have.text', 'Gudang harus dipilih')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')
    });

    it('TC-0008 Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input (Produk Tanpa Gudang)', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // tanpa Alamat Penagihan
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });


        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').clear().type('Alamat Penjualan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.gudang_id"]').click()
        cy.get('[data-value]').eq(0).click();
        cy.get('.MuiButton-contained').click();
        cy.intercept('POST', '**/api/penjualan').as('Hit')
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('@Hit.all').should('have.length', 0);

        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('have.text', 'Gudang harus dipilih')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')
    });

    it('TC-0009 Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input (Produk Tanpa Kuantitas)', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // tanpa Alamat Penagihan
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });


        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').clear().type('Alamat Penjualan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.gudang_id"]').click()
        cy.get('[data-value]').eq(1).click();
        cy.get('[name="penjualan.0.quantity"]').clear();

        cy.intercept('POST', '**/api/penjualan').as('Hit')
        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.get('@Hit.all').should('have.length', 0);
        cy.contains('Jumlah tidak boleh 0').should('be.exist')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')
    });

    it('TC-0010 Membuat Penjualan Baru Dengan Nomor Penjualan Manual', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Buat variabel nomor invoice unik
        const generateInvoiceNumber = () => {
            const now = new Date();

            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear()).slice(-2);

            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            // Format: INV/170825-103512
            return `INV/${day}${month}${year}-${hours}${minutes}${seconds}`;
        };
        const nomorInvoice = generateInvoiceNumber();

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // Isi form
        cy.get('#nomor').type(nomorInvoice);
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        // cy.get('#paymentTerms').click();
        // cy.get('[data-value]').eq(0).click();
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
                cy.get('td').eq(1, { timeout: 20000 }).should('have.text', res.nomor);
            })
        });
    });

    it('TC-0011 Pengujian Tanggal Transaksi Dan Jatuh Tempo', () => {
        cy.get('#paymentTerms').click()
        cy.contains('Net 30').click()

        // Ambil tanggal hari ini
        const today = new Date();

        // Tambah 30 hari
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);

        // Format ke dd/mm/yyyy
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const todayFormatted = formatDate(today);
        const next30DaysFormatted = formatDate(next30Days);

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).should('have.value', todayFormatted)
        cy.get('[placeholder="DD/MM/YYYY"]').eq(1).should('have.value', next30DaysFormatted)

    })

    it('TC-0012 Menambah Pembelian Dengan Info Pengiriman Ekspedisi', () => {
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get(':nth-child(2) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('#expedition').click()
        cy.get('[data-value]').eq(1).click()
        cy.get('#resi').type('0987654321')
        cy.get('#deliveryAddressField').type('Alamat Pengiriman')
        cy.get('.MuiButton-contained').click();

        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

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
                cy.get('td').eq(1).should('contain', res.nomor)
                cy.contains(res.nomor).click();

                cy.get(':nth-child(2) > .MuiListItemText-root > .MuiTypography-root').should('have.text', 'Jalur langit')
                cy.get(':nth-child(3) > .MuiListItemText-root > .MuiTypography-root').should('have.text', '0987654321')
            })
        });
    })

    it('TC-0013 Menambah Pembelian Dengan Info Salesman', () => {
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get(':nth-child(3) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('#salesman').click()
        cy.get('[data-value]').eq(1).click()
        cy.get('.MuiButton-contained').click();

        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

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
                cy.get('td').eq(1).should('contain', res.nomor)
                cy.contains(res.nomor).click();

                cy.get(':nth-child(2) > * > .MuiListItemText-multiline > .MuiTypography-body2 > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-root').should('contain', 'Ujank')
            })
        });
    })

    it('TC-0014 Penjualan Baru Dengan Harga Termasuk Pajak', () => {
        // pilih pelanggan
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });

        // isi alamat
        cy.get('#address').type('{selectAll}Jalan Penagihan');

        // pilih produk
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();

        // pilih pajak (PPN)
        cy.get('[id="penjualan.0.tax"]').click();
        cy.get('[data-value]').eq(1).click(); // PPN

        // aktifkan "harga termasuk pajak"
        cy.get('.MuiGrid2-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();


        // ambil total harga (sudah termasuk pajak)
        cy.get(':nth-child(10) > .MuiGrid2-container > :nth-child(2)')
            .invoke("text")
            .then((text) => {
                const total = Number(text.replace(/[^0-9]/g, '')); // misalnya Rp 300.000.000

                // hitung manual harga sebelum pajak & nilai PPN
                const persen = 11; // PPN 11%
                const hargaSebelum = total / (1 + persen / 100);
                const ppn = total - hargaSebelum;

                // bulatkan 2 angka di belakang koma
                const hargaSebelumFix = Math.round(hargaSebelum * 100) / 100;
                const ppnFix = Math.round(ppn * 100) / 100;

                cy.log(`Total: Rp ${total}`);
                cy.log(`Harga Sebelum PPN: Rp ${hargaSebelumFix}`);
                cy.log(`PPN (${persen}%): Rp ${ppnFix}`);

                // validasi angka mentah (hitungannya benar)
                expect(total).to.eq(110000);
                expect(hargaSebelumFix).to.eq(99099.1);
                expect(ppnFix).to.eq(10900.9);

                cy.get('h6.MuiTypography-root.MuiTypography-h6')
                    .eq(5)
                    .invoke('text')
                    .then((h5Text) => {
                        const cleanText = h5Text.replace(/\s+/g, ' ').trim();

                        // normalisasi teks angka: buang semua selain digit/koma/titik
                        let angkaString = h5Text.replace(/[^0-9.,]/g, '');
                        // hapus titik ribuan → "29.729.729,73" jadi "29729729,73"
                        angkaString = angkaString.replace(/\./g, '');
                        // ubah koma jadi titik → "29729729,73" jadi "29729729.73"
                        angkaString = angkaString.replace(',', '.');

                        const ppnRupiahFix = parseFloat(angkaString);

                        // ubah ke format: 1.234.567,89 (standar Indonesia)
                        const formatted = ppnRupiahFix.toLocaleString('id-ID', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        expect(cleanText).to.contain('Rp');          // pastikan ada Rp
                        expect(cleanText).to.contain(formatted);     // pastikan format sesuai
                    });

            });
    })

    it('TC-0015 Penjualan Baru Dengan Diskon Per Item', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // Isi form
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[name="penjualan.0.discount"]').type('20');
        cy.wait(3000)

        // ambil subtotal
        cy.get('h6.MuiTypography-root.MuiTypography-h6').eq(2).invoke('text').then((subtotal) => {
            let angkaString = subtotal.replace(/[^0-9.,]/g, '');
            angkaString = angkaString.replace(/\./g, '').replace(',', '.');
            const subtotalClear = parseFloat(angkaString);

            // ambil nilai diskon
            cy.get('h6.MuiTypography-root.MuiTypography-h6').eq(4).invoke('text').then((discountItem) => {
                let discString = discountItem.replace(/[^0-9.,]/g, '');
                discString = discString.replace(/\./g, '').replace(',', '.');
                const discountClear = parseFloat(discString);

                const expectedDiscount = +(subtotalClear * 0.20).toFixed(2);

                cy.log(`Subtotal: ${subtotalClear}`);
                cy.log(`Discount tampil: ${discountClear}`);
                cy.log(`Expected 10%: ${expectedDiscount}`);

                // ✅ Assertion
                expect(discountClear).to.eq(expectedDiscount);
                cy.intercept('POST', '**api/penjualan').as('berhasil')
                cy.get('.MuiButton-contained').click()
                cy.get('[data-testid="alert-dialog-submit-button"]').click()

                cy.wait('@berhasil').then((res) => {
                    const totalResult = res.response.body.total;
                    const subTotalResult = res.response.body.sub_total;
                    const taxResult = res.response.body.tax_value;

                    const expectedDiscount = +(subtotalClear * 0.20).toFixed(2);
                    const expectedTotal = +(subtotalClear - expectedDiscount + taxResult).toFixed(2);

                    cy.log(`Subtotal API: ${subTotalResult}`);
                    cy.log(`Discount expected: ${expectedDiscount}`);
                    cy.log(`Tax API: ${taxResult}`);
                    cy.log(`Total expected: ${expectedTotal}`);
                    cy.log(`Total API: ${totalResult}`);

                    expect(subTotalResult).to.eq(subtotalClear);
                    expect(totalResult).to.eq(expectedTotal);
                });
                cy.get('.MuiAlert-message').should('have.text', 'Penjualan berhasil ditambahkan')
            });
        });
    });

    it('TC-0016 Penjualan Baru Dengan Pajak Per Item', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // Isi form
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .click({ force: true });

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
            .type(`{selectAll}{backSpace}${dateToday}`);

        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.wait(3000);

        // ==== Ambil data UI ====
        let subtotalClear, ppnClear, totalClear;

        cy.get('h6.MuiTypography-root.MuiTypography-h6').eq(2).invoke('text').then((subtotal) => {
            let angkaString = subtotal.replace(/[^0-9.,]/g, '').replace(/\./g, '').replace(',', '.');
            subtotalClear = parseFloat(angkaString);
        });

        cy.get('h6.MuiTypography-root.MuiTypography-h6').eq(5).invoke('text').then((ppn) => {
            let angkaString = ppn.replace(/[^0-9.,]/g, '').replace(/\./g, '').replace(',', '.');
            ppnClear = parseFloat(angkaString);
        });

        cy.get('h6.MuiTypography-root.MuiTypography-h6').eq(11).invoke('text').then((total) => {
            let angkaString = total.replace(/[^0-9.,]/g, '').replace(/\./g, '').replace(',', '.');
            totalClear = parseFloat(angkaString);
        });

        // ==== Simpan & Intercept API ====
        cy.intercept('POST', '**/api/penjualan').as('berhasil');
        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.wait('@berhasil').then((interception) => {
            const res = interception.response.body;

            cy.log('=== RESPONSE API PENJUALAN ===');
            cy.log(JSON.stringify(res, null, 2));

            // Data dari API
            const subtotalAPI = res.sub_total;
            const ppnAPI = res.tax_value;
            const totalAPI = res.total;

            // === Assertion Perhitungan ===
            const expectedPPN = subtotalAPI * 0.11;
            const expectedTotal = subtotalAPI + expectedPPN;

            expect(ppnAPI).to.be.closeTo(expectedPPN, 0.01);
            expect(totalAPI).to.be.closeTo(expectedTotal, 0.01);

            // === Assertion UI vs API ===
            expect(subtotalClear).to.equal(subtotalAPI);
            expect(ppnClear).to.equal(ppnAPI);
            expect(totalClear).to.equal(totalAPI);
        });
        cy.get('.MuiAlert-message').should('have.text', 'Penjualan berhasil ditambahkan')

    });

    it('TC-0017 Membuat Penjualan Dengan Dua Produk', () => {
        cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');
        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(`Tanggal uji: ${dateToday}`);

        // === Load page & pilih pelanggan ===
        cy.reload();
        cy.wait('@waitPelanggan').then(() => {
            cy.get('#idPelanggan').click();
            cy.get('[data-value]').eq(1).click().click({ force: true });
        });

        // === Input form ===
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get(':nth-child(2) > .MuiTableCell-root > .MuiButtonBase-root').click();

        // Produk pertama
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();

        // Produk kedua
        cy.get('[id="penjualan.1.product_id"]').click();
        cy.get('[data-value]').eq(1).click();

        // Simpan & Submit
        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('.MuiAlert-message').should('have.text', 'Penjualan berhasil ditambahkan');
        // cy.wait(100000000)

        cy.wait('@postPenjualan').then((interception) => {
            const body = interception.request.body;

            const expectedProduk = [
                {
                    "product_id": "54703660-7be6-11f0-9cdb-71816bc4adc1",
                    "gudang_id": "4d9d4ab0-66d0-11f0-a509-2d118ddad98e",
                    "deskripsi": "",
                    "quantity": 1,
                    "unit_id": "4d99c840-66d0-11f0-a509-2d118ddad98e",
                    "price": 110000,
                    "discount": 0,
                    "tax_id": "2e87ed80-7be6-11f0-9cdb-71816bc4adc1",
                    "tax_value": 11,
                    "total": 110000
                },
                {
                    "product_id": "54703660-7be6-11f0-9cdb-71816bc4adc1",
                    "gudang_id": "4d9d4ab0-66d0-11f0-a509-2d118ddad98e",
                    "deskripsi": "",
                    "quantity": 1,
                    "unit_id": "4d99c840-66d0-11f0-a509-2d118ddad98e",
                    "price": 110000,
                    "discount": 0,
                    "tax_id": "2e87ed80-7be6-11f0-9cdb-71816bc4adc1",
                    "tax_value": 11,
                    "total": 110000
                }
            ];

            // ✅ Validasi jumlah item
            expect(body.items).to.have.length(2);

            // ✅ Validasi isi item sama persis
            expect(body.items).to.deep.equal(expectedProduk);
        });

    });

    it.skip('TC-0018 Membuat Penjualan Dengan Empat Produk Lalu Menghapus Produk Dengan Urutan Ganjil Dengan Harapan Field Yang Dihapus Sesuai Ekspektasi', () => {
        cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');
        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(`Tanggal uji: ${dateToday}`);

        // === Load page & pilih pelanggan ===
        cy.reload();
        cy.wait('@waitPelanggan').then(() => {
            cy.get('#idPelanggan').click();
            cy.get('[data-value]').eq(1).click().click({ force: true });
        });

        // === Input form ===
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.contains('Baris Baru').click();
        cy.contains('Baris Baru').click();
        cy.contains('Baris Baru').click();

        // Produk pertama
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.deskripsi"]').type('1')

        // Produk kedua
        cy.get('[id="penjualan.1.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.1.deskripsi"]').type('2')

        // Produk ketiga
        cy.get('[id="penjualan.2.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.2.deskripsi"]').type('3')

        // Produk keempat
        cy.get('[id="penjualan.3.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.3.deskripsi"]').type('4')

        cy.get(':nth-child(1) > * > .MuiButtonBase-root > [data-testid="DoNotDisturbOnIcon"] > path').scrollIntoView().click()

        // Simpan & Submit
        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('.MuiAlert-message').should('have.text', 'Penjualan berhasil ditambahkan');
        // cy.wait(100000000)

        cy.wait('@postPenjualan').then((interception) => {
            const body = interception.request.body;

            const expectedProduk = [
                {
                    "product_id": "54703660-7be6-11f0-9cdb-71816bc4adc1",
                    "gudang_id": "4d9d4ab0-66d0-11f0-a509-2d118ddad98e",
                    "deskripsi": "2",
                    "quantity": 1,
                    "unit_id": "4d99c840-66d0-11f0-a509-2d118ddad98e",
                    "price": 110000,
                    "discount": 0,
                    "tax_id": "2e87ed80-7be6-11f0-9cdb-71816bc4adc1",
                    "tax_value": 11,
                    "total": 110000
                },
                {
                    "product_id": "54703660-7be6-11f0-9cdb-71816bc4adc1",
                    "gudang_id": "4d9d4ab0-66d0-11f0-a509-2d118ddad98e",
                    "deskripsi": "4",
                    "quantity": 1,
                    "unit_id": "4d99c840-66d0-11f0-a509-2d118ddad98e",
                    "price": 110000,
                    "discount": 0,
                    "tax_id": "2e87ed80-7be6-11f0-9cdb-71816bc4adc1",
                    "tax_value": 11,
                    "total": 110000
                }
            ];

            // ✅ Validasi jumlah item
            expect(body.items).to.have.length(2);

            // ✅ Validasi isi item sama persis
            expect(body.items).to.deep.equal(expectedProduk);
        });

    });

    it('TC-0019 Menambah Lampiran Dan Catatan Pada Pembelian Baru', () => {
        cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.reload();
        cy.wait('@waitPelanggan').then(({ response }) => {
            const pelanggan = response.body.results[0];
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`)
                .eq(1).click()
                .scrollIntoView({ block: 'center' }) // pastikan muncul di tengah viewport
                .should('be.visible') // pastikan visible
                .click({ force: true }); // bypass overlay check kalau masih ketutup
        });

        //cy.get('#idPelanggan').trigger('change')
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('#notes').type('Catatan Hari ini: \n - Bawang \n - Ikan \n - Sayur')
        cy.get('input[accept="application/pdf,.pdf,image/*,.jpg,.jpeg,.png"]').attachFile('sembako.jpg')
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

                cy.get(' * > .MuiList-root > .MuiGrid2-container > :nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2').should('have.text', 'Catatan hari ini : - Bawang - Ikan - Sayur')
            })
        });
    });

    it('TC-0020 Penjualan Dengan Diskon Subtotal Persen', () => {
        // Intercept kontak pelanggan
        cy.intercept(
            'GET',
            `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`
        ).as('waitPelanggan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        cy.reload();
        cy.wait('@waitPelanggan').then(({ response }) => {
            const pelanggan = response.body.results[0];
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`).eq(1)
                .click()
                .scrollIntoView({ block: 'center' })
                .should('be.visible')
                .click({ force: true });
        });

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
            .type(`{selectAll}{backspace}${dateToday}`);

        cy.get('#address').type('{selectAll}Jalan Penagihan');

        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.tax"]').click()
        cy.get('[data-value]').eq(0).click().click();

        // Toggle switch
        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input')
            .click();

        // Set discount 10%
        cy.get('#discountAllType').click();
        cy.get('[data-value="percentage"]').click();
        cy.get('[name="discountAllValue"]').clear().type('10');

        // Ambil subtotal, diskon, total
        const parseCurrency = (text) => parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'));

        cy.get('h6.MuiTypography-root.MuiTypography-h6').then(($elems) => {
            const subtotalClear = parseCurrency($elems.eq(2).text());
            const diskonClear = parseCurrency($elems.eq(3).text());
            const totalClear = parseCurrency($elems.eq(8).text());

            // Hitung ekspektasi
            const expectedDiskon = +(subtotalClear * 10 / 100).toFixed(0); // bulat sesuai aplikasi
            const expectedTotal = subtotalClear - expectedDiskon;

            // Assertion
            expect(diskonClear).to.eq(expectedDiskon);
            expect(totalClear).to.eq(expectedTotal);

            cy.log(`Subtotal: ${subtotalClear}, Diskon: ${diskonClear}, Total: ${totalClear}`);
        });
        cy.get('.MuiButton-contained').click()
        cy.intercept('POST', '**/api/penjualan').as('berhasil')
        cy.get('[data-testid="alert-dialog-submit-button"]').click()

        cy.wait('@berhasil').then((interception) => {
            const body = interception.response.body;

            // Ambil nilai dari response API
            const subTotalApi = body.sub_total;
            const diskonApi = body.total_discount;
            const totalApi = body.total;

            // Hitung ulang ekspektasi
            const expectedDiskon = +(subTotalApi * 10 / 100).toFixed(0);
            const expectedTotal = subTotalApi - expectedDiskon;

            // Assertion
            expect(diskonApi).to.eq(expectedDiskon);
            expect(totalApi).to.eq(expectedTotal);

            cy.log(`API -> Subtotal: ${subTotalApi}, Diskon: ${diskonApi}, Total: ${totalApi}`);
        });


    });

    it('TC-0021 Penjualan Dengan Diskon Subtotal Rupiah', () => {
        cy.intercept(
            'GET',
            `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`
        ).as('waitPelanggan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        cy.reload();
        cy.wait('@waitPelanggan').then(({ response }) => {
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`).eq(1)
                .click()
                .scrollIntoView({ block: 'center' })
                .should('be.visible')
                .click({ force: true });
        });

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
            .type(`{selectAll}{backspace}${dateToday}`);

        cy.get('#address').type('{selectAll}Jalan Penagihan');

        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.tax"]').click()
        cy.get('[data-value]').eq(0).click().click();

        // Toggle switch
        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input')
            .click();

        // Set discount Rp 10.000
        cy.get('#discountAllType').click();
        cy.get('[data-value="fix"]').click();
        cy.get('[name="discountAllValue"]').clear().type('10000');

        const parseCurrency = (text) => parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'));

        // --- UI Assertion ---
        cy.get('h6.MuiTypography-root.MuiTypography-h6').then(($elems) => {
            const subtotalClear = parseCurrency($elems.eq(2).text());
            const diskonClear = parseCurrency($elems.eq(3).text());
            const totalClear = parseCurrency($elems.eq(8).text());

            const expectedTotal = subtotalClear - diskonClear;

            expect(totalClear).to.eq(expectedTotal);
            cy.log(`UI -> Subtotal: ${subtotalClear}, Diskon: ${diskonClear}, Total: ${totalClear}`);
        });

        // --- API Assertion ---
        cy.get('.MuiButton-contained').click();
        cy.intercept('POST', '**/api/penjualan').as('berhasil');
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.wait('@berhasil').then(({ response }) => {
            const body = response.body;
            const subTotalApi = body.sub_total;
            const diskonApi = body.total_discount;
            const totalApi = body.total;

            const expectedTotal = subTotalApi - diskonApi;

            expect(diskonApi).to.eq(10000);
            expect(totalApi).to.eq(expectedTotal);

            cy.log(`API -> Subtotal: ${subTotalApi}, Diskon: ${diskonApi}, Total: ${totalApi}`);
        });
    });

    it('TC-0022 Penjualan Dengan Biaya Pengiriman', () => {
        cy.intercept(
            'GET',
            `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`
        ).as('waitPelanggan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        cy.reload();
        cy.wait('@waitPelanggan').then(({ response }) => {
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`).eq(1)
                .click()
                .scrollIntoView({ block: 'center' })
                .should('be.visible')
                .click({ force: true });
        });

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
            .type(`{selectAll}{backspace}${dateToday}`);

        cy.get('#address').type('{selectAll}Jalan Penagihan');

        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.tax"]').click()
        cy.get('[data-value]').eq(0).click().click();

        cy.get('[name="deliveryFee"]').type('12000');

        const parseCurrency = (text) => parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'));

        // --- UI Assertion ---
        cy.get('h6.MuiTypography-root.MuiTypography-h6').then(($elems) => {
            const subtotalClear = parseCurrency($elems.eq(2).text());
            const totalClear = parseCurrency($elems.eq(8).text());

            const expectedTotal = subtotalClear + 12000;

            expect(totalClear).to.eq(expectedTotal);
            cy.log(`UI -> Subtotal: ${subtotalClear}, Ongkir: 12000, Total: ${totalClear}`);
        });

        // --- API Assertion ---
        cy.get('.MuiButton-contained').click();
        cy.intercept('POST', '**/api/penjualan').as('berhasil');
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.wait('@berhasil').then(({ response }) => {
            const body = response.body;
            const subTotalApi = body.sub_total;
            const ongkirApi = body.biaya_kirim;
            const totalApi = body.total;

            const expectedTotal = subTotalApi + ongkirApi;

            expect(ongkirApi).to.eq(12000);
            expect(totalApi).to.eq(expectedTotal);

            cy.log(`API -> Subtotal: ${subTotalApi}, Ongkir: ${ongkirApi}, Total: ${totalApi}`);
        });
    });

    it('TC-0023 Penjualan Dengan Pemotongan Harga Persenan', () => {
        // Intercept kontak pelanggan
        cy.intercept(
            'GET',
            `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`
        ).as('waitPelanggan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept POST penjualan
        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

        cy.reload();
        cy.wait('@waitPelanggan').then(({ response }) => {
            const pelanggan = response.body.results[0];
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`).eq(1).click()
                .scrollIntoView({ block: 'center' })
                .should('be.visible')
                .click({ force: true });
        });

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
            .type(`{selectAll}{backspace}${dateToday}`);

        cy.get('#address').type('{selectAll}Jalan Penagihan');

        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.tax"]').click();
        cy.get('[data-value]').eq(0).click().click({ force: true });

        // Aktifkan pemotongan
        cy.get('[name="isPemotongan"]').click();
        cy.get('[name="discountPemotonganValue"]').clear().type('10');
        cy.get('#akun').click()
        cy.get('[data-value]').eq(1).click();;

        // Fungsi parse angka
        const parseCurrency = (text) => parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'));

        // Ambil nilai dari UI
        cy.get('h6.MuiTypography-root.MuiTypography-h6').then(($elems) => {
            const subtotalClear = parseCurrency($elems.eq(8).text()); // ambil subtotal
            const pemotonganClear = parseCurrency($elems.eq(9).text());
            const tagihanClear = parseCurrency($elems.eq(11).text());

            // Hitung ekspektasi
            const expectedPemotongan = +(subtotalClear * 10 / 100).toFixed(0);
            const expectedTagihan = subtotalClear - expectedPemotongan;

            // Assertion UI
            expect(pemotonganClear).to.eq(expectedPemotongan);
            expect(tagihanClear).to.eq(expectedTagihan);

            cy.log(`Subtotal: ${subtotalClear}, Pemotongan: ${pemotonganClear}, Tagihan: ${tagihanClear}`);

            // Submit form
            cy.get('.MuiButton-contained').click();
            cy.get('[data-testid="alert-dialog-submit-button"]').click()

            // Assertion API response
            cy.wait('@postPenjualan').then(({ response }) => {
                expect(response.statusCode).to.eq(200);

                const body = response.body;

                // Hitung ulang ekspektasi
                const expectedDiscount = (body.sub_total * 10 / 100);
                const expectedTotal = body.sub_total - expectedDiscount;

                // Assertion API
                expect(body.sub_total).to.be.greaterThan(0);
                expect(body.nilai_potongan).to.eq(10);
                expect(body.tipe_potongan).to.eq('percentage');
                expect(body.total).to.eq(subtotalClear);
                expect(body.sisa_tagihan).to.eq(expectedTotal);

                cy.log(`API - Subtotal: ${body.sub_total}, Diskon: ${body.total_discount}, Total: ${body.total}`);
            });
        });
    })

    it('TC-0024 Penjualan Dengan Pemotongan Harga Fix', () => {
        // Intercept kontak pelanggan
        cy.intercept(
            'GET',
            `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`
        ).as('waitPelanggan');

        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept POST penjualan
        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

        cy.reload();
        cy.wait('@waitPelanggan').then(({ response }) => {
            const pelanggan = response.body.results[0];
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`).eq(1).click()
                .scrollIntoView({ block: 'center' })
                .should('be.visible')
                .click({ force: true });
        });

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
            .type(`{selectAll}{backspace}${dateToday}`);

        cy.get('#address').type('{selectAll}Jalan Penagihan');

        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[id="penjualan.0.tax"]').click();
        cy.get('[data-value]').eq(0).click().click({ force: true });

        // Aktifkan pemotongan FIX
        cy.get('[name="isPemotongan"]').click();
        cy.get('[id="discountPemotonganType"]').click();
        cy.get('[data-value="fix"]').click();
        cy.get('[name="discountPemotonganValue"]').clear().type('10000');
        cy.get('#akun').click()
        cy.get('[data-value]').eq(1).click();

        // Fungsi parse angka
        const parseCurrency = (text) => parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'));

        // Ambil nilai dari UI
        cy.get('h6.MuiTypography-root.MuiTypography-h6').then(($elems) => {
            const subtotalClear = parseCurrency($elems.eq(8).text());
            const pemotonganClear = parseCurrency($elems.eq(9).text());
            const tagihanClear = parseCurrency($elems.eq(11).text());

            // === Hitung ekspektasi FIX ===
            const expectedPemotongan = 10000;
            const expectedTagihan = subtotalClear - expectedPemotongan;

            // Assertion UI
            expect(pemotonganClear).to.eq(expectedPemotongan);
            expect(tagihanClear).to.eq(expectedTagihan);

            cy.log(`Subtotal: ${subtotalClear}, Pemotongan: ${pemotonganClear}, Tagihan: ${tagihanClear}`);

            // Submit form
            cy.get('.MuiButton-contained').click();
            cy.get('[data-testid="alert-dialog-submit-button"]').click()

            // Assertion API response
            cy.wait('@postPenjualan').then(({ response }) => {
                expect(response.statusCode).to.eq(200);

                const body = response.body;

                // === Hitung ulang ekspektasi FIX dari API ===
                const expectedDiscount = 10000;
                const expectedTotal = body.sub_total - expectedDiscount;

                // Assertion API
                expect(body.sub_total).to.be.greaterThan(0);
                expect(body.nilai_potongan).to.eq(10000);
                expect(body.tipe_potongan).to.eq('fix');
                expect(body.total).to.eq(subtotalClear);
                expect(body.sisa_tagihan).to.eq(expectedTotal);

                cy.log(`API - Subtotal: ${body.sub_total}, Diskon: ${body.nilai_potongan}, Total: ${body.total}`);
            });
        });
    });
})


