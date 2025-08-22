const companyId = Cypress.env('companyId');

describe("PENJUALAN BARU", () => {
    beforeEach(() => {
        cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
        cy.visitDashboard(companyId);
        cy.navigateToPenjualan();
        cy.contains('Penjualan Baru', { timeout: 20000 }).click();
    });

    it.skip('Validasi Penulisan Komponen UI Statis Pada Penjualan Baru', () => {

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
        cy.get('label').contains('Tanggal Pengiriman')


        cy.get(':nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiGrid2-root > .MuiFormLabel-root').should('have.text', 'Info Salesman')
        cy.get(' * > :nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiGrid2-root > .MuiTypography-root').eq(0).should('have.text', 'Centang jika memiliki sales')

        cy.get(':nth-child(4) > .css-k27tlm > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should('have.text', 'Harga Termasuk Pajak')

        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('have.text', 'Nama Produk')
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('have.text', 'Gudang')


    });

    it.skip('Uji Komponen Text Helper', () => {

        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-2 > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(3) > .MuiGrid2-spacing-xs-2 > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(2) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(7) > .MuiGrid2-spacing-xs-1 > .MuiGrid2-grid-md-8 > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('#idPelanggan').should('have.value', "")
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type('{selectall}{backspace}')
        cy.get('.MuiButton-contained').click()
        cy.get('[data-testid="alert-dialog-submit-button"]').click()

        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('have.text', 'Nama harus diisi')
        cy.get('p').contains('Tanggal harus diisi')
        cy.eq('Text Helper Belum Lengkap')
    });

    it.only('Membuat Penjualan Baru Dengan Data Required', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak').then(({ interception }) => {
            cy.get('#idPelanggan').click();
            cy.get(`[data-value]`)
                .eq(1).click()
                .scrollIntoView({ block: 'center' })
                .should('be.visible')
                .click({ force: true });
        });

        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('.MuiButton-contained').click();

        // Intercept API penjualan
        cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

        // Submit
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        // Tunggu API
        cy.wait('@postPenjualan').then((interception) => {
            const res = interception.response.body;

            // Pastikan request benar
            expect(interception.request.method).to.eq('POST');
            expect(interception.response.statusCode).to.eq(200);

            // Validasi row pertama tabel
            cy.get('table tbody tr').first().within(() => {
                // kolom 1 = nomor
                cy.get('td').eq(1).should('contain', res.nomor);
            })
        });
    });

    it('Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input Nama', () => {
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
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('have.text', 'Nama harus diisi')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')

    })

    it('Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input Tanggal Transaksi', () => {
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
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.contains('Tanggal harus diisi').should('be.visible')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')

    })

    it('Membuat Penjualan Baru Dengan Menghilangkan Salah Satu Required Input Alamat Penagihan', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // tanpa Alamat Penagihan
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').clear();
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('have.text', 'Alamat penagihan harus diisi')
        cy.get('.MuiAlert-message').should('have.text', 'Mohon periksa kembali form')

    })

    it('Membuat Penjualan Baru Dengan Nomor Penjualan Manual', () => {
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
        cy.get('[data-value]').eq(1).click();
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
                cy.get('td').eq(1).should('contain', res.nomor);
            })
        });
    });

    it('Pengujian Tanggal Transaksi Dan Jatuh Tempo', () => {
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

    it('Menambah Pembelian Dengan Info Pengiriman Ekspedisi', () => {
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click();
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
                cy.get('td').eq(1).should('contain', res.nomor).click();

                cy.get(':nth-child(2) > .MuiListItemText-root > .MuiTypography-root').should('have.text', 'Jalur langit')
                cy.get(':nth-child(3) > .MuiListItemText-root > .MuiTypography-root').should('have.text', '0987654321')
            })
        });
    })

    it('Menambah Pembelian Dengan Info Salesman', () => {
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click();
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
                cy.get('td').eq(1).should('contain', res.nomor).click();

                cy.get(':nth-child(2) > * > .MuiListItemText-multiline > .MuiTypography-body2 > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-root').should('contain', 'Ujank')
            })
        });
    })

    it('Penjualan Baru Dengan Harga Termasuk Pajak', () => {
        // pilih pelanggan
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click();

        // isi alamat
        cy.get('#address').type('{selectAll}Jalan Penagihan');

        // pilih produk
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();

        // pilih pajak (PPN)
        cy.get('[id="penjualan.0.tax"]').click();
        cy.get('[data-value="87aa4070-3f0a-11f0-ae4a-6f77bebeb8f9"]').click(); // PPN

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
                expect(total).to.eq(300000000);
                expect(hargaSebelumFix).to.eq(270270270.27);
                expect(ppnFix).to.eq(29729729.73);

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

    it('Penjualan Baru Dengan Diskon Per Item', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // Isi form
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click();
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

    it('Penjualan Baru Dengan Pajak Per Item', () => {
        const dateToday = new Date().toLocaleDateString('id-ID');
        cy.log(dateToday);

        // Intercept kontak pelanggan
        cy.intercept('GET', '**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=**').as('waitDataKontak');
        cy.reload();
        cy.wait('@waitDataKontak');

        // Isi form
        cy.get('#idPelanggan').click();
        cy.get('[data-value]').eq(1).click();
        cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type(`{selectAll}{backSpace}${dateToday}`);
        cy.get('#address').type('{selectAll}Jalan Penagihan');
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-value]').eq(1).click();
        cy.wait(3000)
    });

});


