const companyId = Cypress.env('companyId');
import * as s from './PENJUALAN-Selector';
import * as util from './PENJUALAN-Utils';

describe("PENJUALAN", () => {
  beforeEach(() => {
    cy.handleUncaughtExceptions()
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
    cy.visitDashboard(companyId);
    cy.get('[data-testid="drawer-item-sales"]', {timeout : 20000}).click();
    cy.get('.qcw-trigger-btn',{timeout : 20000}).click() //qiscus
  });

  it('TC-0001 Validasi Penulisan Komponen UI Statis Halaman Penjualan', () => {

    s.judulH5().should('have.text', 'Penjualan')

    s.breadcrumb().should('have.length', '3')
    s.breadcrumb1().should('have.text', 'Beranda')
    s.breadcrumb2().should('have.text', '/')
    s.breadcrumb3().should('have.text', 'Penjualan')

    s.cardContainer().should('have.length', 3)
    s.titleCardBelumDibayar().should('have.text', 'Belum Dibayar')
    s.titleCardTelatDibayar().should('have.text', 'Telat Dibayar')
    s.titleCardPelunasan().should('have.text', 'Pelunasan Diterima (30 Hari Terakhir)')

    s.subtitleCardBelumDibayar().should('have.text', 'Total Penjualan')
    s.subtitleCardTelatDibayar().should('have.text', 'Total Penjualan')
    s.subtitleCardPelunasan().should('have.text', 'Total Penjualan')

    s.nominalCardBelumDibayar().should('contain', 'Rp')
    s.nominalCardTelatDibayar().should('contain', 'Rp')
    s.nominalCardPelunasan().should('contain', 'Rp')

    s.tabList().should('have.length', 6)
    s.tabListSemua().should('have.text', 'Semua')
    s.tabListBelumDibayar().should('have.text', 'Belum Dibayar')
    s.tabListJatuhTempo().should('have.text', 'Jatuh Tempo')
    s.tabListLunas().should('have.text', 'Lunas')
    s.tabListDibayarSebagian().should('have.text', 'Dibayar Sebagian')
    s.tabListVoid().should('have.text', 'Void')

    s.filterTanggal().should('have.text', 'Filter Tanggal').and('be.visible').click()
    s.filterTanggalAwalLabel().should('have.text', 'Tanggal Awal')
    s.filterTanggalAkhirLabel().should('have.text', 'Tanggal Akhir')
    s.fieldTanggalAwal().should('be.visible')
    s.fieldTanggalAkhir().should('be.visible')
    s.tombolResetTanggal().should('be.visible')
    s.tombolApplyTanggal().should('be.visible').click()

    s.searchInput().should('have.attr', 'placeholder', 'Cari').and('be.visible')

    s.tableHead().should('have.length', 8)
    s.tableHead1().should('have.text', "Tanggal")
    s.tableHead2().should('have.text', "Nomor")
    s.tableHead3().should('have.text', "Nama Pelanggan")
    s.tableHead4().should('have.text', "Tgl Jatuh Tempo")
    s.tableHead5().should('have.text', "Status")
    s.tableHead6().should('have.text', "Sisa Tagihan")
    s.tableHead7().should('have.text', "Total Tagihan")
    s.tableHead8().should('have.text', "Created By")

    s.paginationLabel()
      .invoke('text')
      .should('contains', '- ').and('contains', 'dari ').and('contains', 'data');
  });

  it('TC-0002 Validasi Isi Tabel Penjualan Berdasarkan Data API Asli', () => {

    // mock data 10 
    cy.intercept('GET', '**/api/penjualan**', { fixture: 'dataTable10.json' }).as("dataPenjualan");
    cy.reload()
    // Tunggu response API 
    cy.wait('@dataPenjualan').then(({ response }) => {

      const apiData = response.body.results;

      // Pastikan jumlah row tabel sama dengan data API
      s.tableRow().should("have.length", apiData.length);

      s.tableRow().each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(util.formatDateDDMMYY(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(util.formatDateDDMMYY(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });
    });
  });

  it('TC-0003 Pengujian Data Tabel Dengan API CodeStatus 500', () => {
    cy.intercept('GET', `**/api/penjualan**`, {statusCode : 500}).as('dataError')
    cy.reload()
    cy.wait('@dataError')
    s.tableRow().should('have.text','Tidak ada data').and('be.visible')
    s.alert().should('have.text', 'Kesalahan di server')
  });

  it('TC-0004 Skeleton Loading Saat Fetch Data', () => {
    cy.intercept(
      { method: 'GET', url: '*api/penjualan*' },
      (req) => {
        // middleware intercept: balas dengan delay dan fixture
        req.reply({
          statusCode: 200,
          delay: 2000            // delay dalam milidetik
        })
      }
    )

    cy.reload()
    // Pastikan skeleton muncul
    cy.get('.MuiSkeleton-root').should('be.visible').and('have.length', 40);
    // Tunggu skeleton hilang sebelum lanjut tes
    cy.get('.MuiSkeleton-root', { timeout: 100000 }).should('not.exist');
    // Baru validasi isi tabel
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('TC-0005 Tampilkan "Tidak Ada Data" Saat Data Kosong', () => {
    cy.intercept('GET', `**/api/penjualan?**companyId=${companyId}`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: {
            totalData: 0,
            results: []
          }
        });
      }).as('zeroResult');
    cy.reload()
    cy.wait('@zeroResult')
    cy.get('td').contains('Tidak ada data')

  });

  it('TC-0006 Pengujian Breadcrumbs Pada Halaman Penjualan', () => {
    cy.get('.MuiTypography-h5 > span').should('have.text', 'Penjualan')
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan')

    cy.get('.MuiBreadcrumbs-ol > :nth-child(1)').click()

    cy.get('.MuiTypography-h5').should('have.text', 'Beranda')
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Dashboard')
  });

  it('TC-0007 Breadcrumbs Halaman Penjualan Baru', () => {
    cy.contains('Penjualan Baru').click()
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan/Penjualan Baru')
    cy.get(':nth-child(3) > .MuiTypography-root > span').click()

    cy.get('.MuiTypography-h5 > span').should('have.text', 'Penjualan')
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan')
    cy.get(':nth-child(3) > .MuiTypography-root > span').click()

    cy.contains('Penjualan Baru').click()
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan/Penjualan Baru')
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()

    cy.get('.MuiTypography-h5').should('have.text', 'Beranda');
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Dashboard')
  });

  it('TC-0008 Breadcrumbs Halaman Detail Pembayaran', () => {
    const SetData = () => {
      // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
      cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
      cy.contains("Apply").click();
    }
    // kondisi menguji posisi awal berada pada halaman penjualan lalu menekan salah satu nomor invoice
    SetData()
    cy.get('.MuiTypography-h5 > span').should('have.text', 'Penjualan')
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan')
    cy.get(':nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root').click()

    // kondisi menguji user berada pada halaman detail penjualan lalu menekan breadcrumb ke Penjualan
    cy.get('.MuiTypography-h5').should('have.text', 'Detail Penjualan')
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan/Detail Penjualan')
    cy.get(':nth-child(3) > .MuiTypography-root > span').should('have.text', 'Penjualan').click()

    // user diarahkan kembali ke halaman penjualan lalu menekan kembali salah satu nomor invoice
    SetData()
    cy.get('.MuiTypography-h5 > span').should('have.text', 'Penjualan')
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan')
    cy.get(':nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root').click()

    // user diarahkan kembali ke halaman detail penjualan lalu menekan breadcrumb ke beranda
    cy.get('.MuiTypography-h5').should('have.text', 'Detail Penjualan')
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan/Detail Penjualan')
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('have.text', 'Beranda').click()

    cy.get('.MuiTypography-h5').should('have.text', 'Beranda');
    cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Dashboard')

  });

  it('TC-0009 Memastikan Perubahan Summary Card Belum Dibayar Dengan Menambah Data', () => {
    let countAwal;
    let apiAwalBelum;

    // === PASANG INTERCEPT ===
    cy.intercept('GET', `**/api/penjualan/overview**`).as('waitDataCard');
    cy.intercept('GET', `**/api/productList/productWithStock**`).as('productsData');
    cy.intercept('GET', `**/api/kontak/list?jenisKontak**`).as('waitPelanggan');

    cy.reload()
    cy.get('.qcw-trigger-btn').click()
    // === CEK JUMLAH DATA BELUM DIBAYAR DI BE ===
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;

      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum+Dibayar&startDate=0001-08-01&endDate=9999-12-30&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const results = response.body.results || [];
        countAwal = results.length;
        const displayCount = countAwal > 99 ? '99+' : countAwal;

        cy.log(`Total data awal: ${countAwal}`);
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
          .should('contain', `${displayCount}`);
      });

      // === CEK NOMINAL BELUM DIBAYAR DI SUMMARY CARD ===
      cy.wait('@waitDataCard').then(({ response }) => {
        apiAwalBelum = Math.round(response.body.belumDibayar.nominal);
        const formattedAwal = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiAwalBelum)}`;
        cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
          .should('have.text', formattedAwal);
      });

      // === TAMBAH PENJUALAN BARU ===
      cy.contains('Penjualan Baru').click();

      // Pilih pelanggan
      cy.wait('@waitPelanggan').then(({ response }) => {
        const pelanggan = response.body.results[0];
        cy.get('#idPelanggan').click();
        cy.get(`[data-option-index="1"]`).click()
      });

      cy.get('#address').clear().type('Jalan Palaraya');

      // Pilih produk
      cy.wait('@productsData').then(({ response }) => {
        const produk = response.body.results.find(p => p.is_sell);
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-option-index="0"]').click();

      });

      // Isi harga
      cy.get('[name="penjualan.0.price"]').clear().type('10000');

      // Ambil total dibayar
      cy.get(':nth-child(8) > .MuiGrid2-container > :nth-child(2)')
        .invoke('text')
        .then((totalText) => {
          const totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

          // Intercept data sebelum submit
          cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard2');

          // Submit form
          cy.get('.MuiButton-contained').click();
          cy.get('[data-testid="alert-dialog-submit-button"]').click();

          // Cek nominal summary card setelah tambah
          cy.wait('@waitDataCard2').then(({ response }) => {
            const apiAkhirBelum = Math.round(response.body.belumDibayar.nominal);
            const formattedAkhir = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiAkhirBelum)}`;
            cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
              .should('have.text', formattedAkhir);
            expect(apiAkhirBelum).to.eq(apiAwalBelum + totalDibayar);
          });
          const countAkhir = countAwal + 1;
          const displayCount = countAkhir > 99 ? '99+' : countAkhir;

          cy.log(`Total data awal: ${countAwal}`);
          cy.log(`Total data akhir: ${displayCount}`);
          cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
            .should('contain', `${displayCount}`);

        });

    });
  })

  it('TC-0010 Memastikan Perubahan Summary Card Belum Dibayar Dengan Terima Pembayaran Data', () => {
    let countAwal;
    let apiAwalBelum;
    let totalDibayar;
    let invoiceNomor;

    cy.intercept('GET', '**/api/penjualan/overview**').as('waitDataCard');
    cy.intercept('GET', '**/api/productList/productWithStock**').as('productsData');
    cy.intercept('GET', '**/api/kontak/list?jenisKontak**').as('waitPelanggan');
    cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

    cy.reload();
    cy.get('.qcw-trigger-btn').click();

    // === Ambil data awal dari BE ===
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;
      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum+Dibayar&startDate=0001-08-01&endDate=9999-12-30&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const results = response.body.results || [];
        countAwal = results.length;
        const displayCount = countAwal > 99 ? '99+' : countAwal;

        cy.log(`🟡 Total data awal: ${countAwal}`);
        badgeBelumDibayar().should('contain', displayCount);
      });
    });

    cy.wait('@waitDataCard').then(({ response }) => {
      apiAwalBelum = Math.round(response.body.belumDibayar.nominal);
      const formattedAwal = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiAwalBelum)}`;
      nominalBelumDibayar().should('have.text', formattedAwal);
    });

    // === Tambah Penjualan Baru ===
    cy.contains('Penjualan Baru').click();
    cy.wait('@waitPelanggan');
    cy.get('#idPelanggan').click();
    cy.get('[data-option-index="1"]').click();
    cy.get('#address').clear().type('Jalan Palaraya');

    cy.wait('@productsData');
    cy.get('[id="penjualan.0.product_id"]').click();
    cy.get('[data-option-index="0"]').click();

    cy.get('[name="penjualan.0.price"]').clear().type('10000');

    cy.get(':nth-child(8) > .MuiGrid2-container > :nth-child(2)')
      .invoke('text')
      .then((totalText) => {
        totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

        cy.intercept('GET', '**/api/penjualan/overview?companyId=**').as('waitDataCard2');

        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.wait('@postPenjualan').then(({ response }) => {
          invoiceNomor = response.body.nomor;
          cy.log(`🧾 Invoice baru dibuat: ${invoiceNomor}`);
        });

        cy.wait('@waitDataCard2').then(({ response }) => {
          const apiAkhirBelum = Math.round(response.body.belumDibayar.nominal);
          const formattedAkhir = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiAkhirBelum)}`;
          nominalBelumDibayar().should('have.text', formattedAkhir);
          expect(apiAkhirBelum).to.eq(apiAwalBelum + totalDibayar);
        });
      });

    // === BAYAR INVOICE BARU ===
    cy.then(() => {
      cy.log(`💳 Membayar invoice ${invoiceNomor}...`);
      cy.contains('td', invoiceNomor, { timeout: 20000 }).click();

      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').scrollIntoView().click();
      cy.get('[data-value="payment"]').click();

      cy.get('#metode').click();
      cy.get('[data-value]').eq(1).click();

      cy.get('#nomor_akun').click();
      cy.get('[data-option-index="0"]').click();

      cy.get('[name="sub_total"]').clear().type(`${totalDibayar}`);

      cy.intercept('GET', '**/api/penjualan/overview?companyId=**').as('waitDataCard3');

      cy.get('.MuiButton-contained').click();
      cy.get('[data-testid="alert-dialog-submit-button"]').click();

      cy.wait('@waitDataCard3').then(({ response }) => {
        const apiSetelahBayar = Math.round(response.body.belumDibayar.nominal);
        const formatted = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiSetelahBayar)}`;
        nominalBelumDibayar().should('have.text', formatted);
        expect(apiSetelahBayar).to.eq(apiAwalBelum);

        // Cek badge kembali ke awal
        const displayCountAwal = countAwal > 99 ? '99+' : countAwal;
        badgeBelumDibayar().should('contain', displayCountAwal);
        cy.log(`🔵 Badge kembali ke: ${displayCountAwal}`);
      });
    });
  });

  it('TC-0011 Memastikan Perubahan Summary Card Belum Dibayar Dengan Void Data', () => {
    let countAwal;
    let apiAwalBelum;
    let totalDibayar;
    let invoiceNomor;

    // === PASANG INTERCEPT ===
    cy.intercept('GET', `**/api/penjualan/overview**`).as('waitDataCard');
    cy.intercept('GET', `**/api/productList/productWithStock**`).as('productsData');
    cy.intercept('GET', `**/api/kontak/list?jenisKontak**`).as('waitPelanggan');
    cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

    cy.reload();
    cy.get('.qcw-trigger-btn').click();

    // === CEK JUMLAH DATA BELUM DIBAYAR DI BE ===
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;
      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum%20Dibayar&startDate=0001-08-01&endDate=9999-12-30&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const results = response.body.results || [];
        countAwal = results.length;
        const displayCount = countAwal > 99 ? '99+' : countAwal;

        cy.log(`Total data awal: ${countAwal}`);
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
          .should('contain', `${displayCount}`);
      });

      // === CEK NOMINAL BELUM DIBAYAR DI SUMMARY CARD ===
      cy.wait('@waitDataCard').then(({ response }) => {
        apiAwalBelum = Math.round(response.body.belumDibayar.nominal);
        const formattedAwal = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiAwalBelum)}`;
        cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
          .should('have.text', formattedAwal);
      });

      // === TAMBAH PENJUALAN BARU ===
      cy.contains('Penjualan Baru').click();

      // Pilih pelanggan (cara sama seperti test sebelumnya)
      cy.wait('@waitPelanggan').then(({ response }) => {
        const pelanggan = response.body.results[0];
        cy.get('#idPelanggan').click();
        cy.get(`[data-option-index="1"]`).click();
      });

      cy.get('#address').clear().type('Jalan Palaraya');

      // Pilih produk (cara sama seperti test sebelumnya)
      cy.wait('@productsData').then(({ response }) => {
        cy.get('[id="penjualan.0.product_id"]').click();
        cy.get('[data-option-index="0"]').click();
      });

      // Isi harga
      cy.get('[name="penjualan.0.price"]').clear().type('10000');

      // Ambil total dibayar
      cy.get(':nth-child(8) > .MuiGrid2-container > :nth-child(2)')
        .invoke('text')
        .then((totalText) => {
          totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

          // Intercept overview setelah submit
          cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard2');

          // Submit form
          cy.get('.MuiButton-contained').click();
          cy.get('[data-testid="alert-dialog-submit-button"]').click();
        });

      // === VALIDASI 1: CEK SUMMARY CARD SETELAH TAMBAH ===
      cy.wait('@waitDataCard2').then(({ response }) => {
        const apiAkhirBelum = Math.round(response.body.belumDibayar.nominal);
        const formattedAkhir = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiAkhirBelum)}`;
        cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
          .should('have.text', formattedAkhir);
        expect(apiAkhirBelum).to.eq(apiAwalBelum + totalDibayar);
      });

      // === CEK JUMLAH DATA BELUM DIBAYAR SETELAH TAMBAH ===
      cy.getCookie('token').then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: 'GET',
          url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum%20Dibayar&startDate=0001-08-01&endDate=9999-12-30&skip=0&limit=9999&companyId=${companyId}`,
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          const results = response.body.results || [];
          const countAkhir = results.length;
          expect(countAkhir).to.eq(countAwal + 1);
          cy.log(`Data awal: ${countAwal}`);
          cy.log(`Data akhir: ${countAkhir}`);
        });

      });
    });

    // === AMBIL NOMOR INVOICE DARI RESPONSE PENJUALAN ===
    cy.wait('@postPenjualan').then(({ response }) => {
      invoiceNomor = response.body.nomor;
      cy.log(`Invoice Baru: ${invoiceNomor}`);

      // buka detail invoice & lakukan void
      cy.contains('td', invoiceNomor, { timeout: 20000 }).click();
      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click();
      cy.get('[data-value="void"]').click();

      cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard3');

      // submit void
      cy.get('.MuiButton-contained').click();
      // cy.get('[data-testid="alert-dialog-submit-button"]').click();
    });

    // === VALIDASI 2: CEK SUMMARY CARD SETELAH VOID ===
    cy.wait('@waitDataCard3').then(({ response }) => {
      const apiSetelahVoid = Math.round(response.body.belumDibayar.nominal);
      const formatted = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiSetelahVoid)}`;
      cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
        .should('have.text', formatted);

      // nominal harus kembali ke kondisi awal sebelum tambah
      expect(apiSetelahVoid).to.eq(apiAwalBelum);
    });

    // === CEK JUMLAH DATA BELUM DIBAYAR SETELAH VOID ===
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;
      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum%20Dibayar&startDate=0001-08-01&endDate=9999-12-30&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const results = response.body.results || [];
        const countAkhirVoid = results.length;

        // jumlah data kembali ke kondisi awal
        expect(countAkhirVoid).to.eq(countAwal);
        cy.log(`Data setelah void: ${countAkhirVoid}`);
      });
    });
  });

  it.skip('TC-0012 Memastikan Perubahan Summary Card Telat Dibayar Dengan Menambah Data', () => {
    // let apiTelatSebelum;
    // let totalCountAwal;
    // let token;

    // Ambil token sekali di awal
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;

      // === Ambil data awal Jatuh Tempo ===
      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Jatuh+Tempo&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((resJatuhTempo) => {
        const results = resJatuhTempo.body.results || [];

        // Ambil tanggal hari ini (normalize ke 00:00 biar pas banding)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter hanya data yang jatuh tempo lewat
        const jatuhTempoLewat = results.filter((item) => {
          const tglJT = new Date(item.tanggal_jatuh_tempo);
          tglJT.setHours(0, 0, 0, 0);
          return tglJT < today;  // hanya yang lebih kecil dari hari ini
        });

        cy.log(`Total jatuh tempo lewat: ${jatuhTempoLewat.length}`);
        console.log('Detail jatuh tempo lewat:', jatuhTempoLewat);
      });
    });

    // === Cek nilai awal di summary card ===
    cy.wait('@waitDataCard').then(({ response }) => {
      apiTelatSebelum = Math.round(response.body.telatBayar.nominal);
      const formattedTelatSebelum = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiTelatSebelum)}`;
      cy.contains(':nth-child(2) .MuiTypography-h5', 'Rp')
        .should('have.text', formattedTelatSebelum);
    });

    // === Tambah penjualan baru ===
    cy.contains('Penjualan Baru').click();

    // Pilih pelanggan
    cy.wait('@waitPelanggan').then(({ response }) => {
      cy.get('#idPelanggan').click();
      cy.get(`[data-value]`)
        .eq(1).click()
        .scrollIntoView({ block: 'center' })
        .should('be.visible')
        .click({ force: true });
    });

    cy.get('#address').clear().type('Jalan Palaraya');
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");

    cy.wait('@productsData').then(({ response }) => {
      const produk = response.body.results.find(p => p.is_sell);
      cy.get('[id="penjualan.0.product_id"]').click();
      cy.get(`[data-value="${produk.id}"]`).click();
    });

    cy.get('[name="penjualan.0.price"]').clear().type('10000');

    cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2)')
      .invoke('text')
      .then((totalText) => {
        const totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

        cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard2');

        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.wait('@waitDataCard2').then(({ response }) => {
          const apiTelatSesudah = Math.round(response.body.telatBayar.nominal);
          const formattedTelatSesudah = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiTelatSesudah)}`;
          cy.contains(':nth-child(2) .MuiTypography-h5', 'Rp')
            .should('have.text', formattedTelatSesudah);

          expect(apiTelatSesudah).to.eq(apiTelatSebelum + totalDibayar);
        });

        // === Ambil data akhir dan cek badge bertambah ===
        cy.request({
          method: 'GET',
          url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Jatuh+Tempo&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
          headers: { Authorization: `Bearer ${token}` }
        }).then((resJatuhTempo) => {
          const countJatuhTempo = resJatuhTempo.body.results.length;

          cy.request({
            method: 'GET',
            url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Dibayar+Sebagian&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
            headers: { Authorization: `Bearer ${token}` }
          }).then((resSebagian) => {
            const resultsSebagian = resSebagian.body.results || [];
            const today = new Date();

            const sebagianJatuhTempo = resultsSebagian.filter(item => {
              const dueDate = new Date(item.jatuhTempo || item.dueDate);
              return dueDate < today;
            });

            const totalCountAkhir = countJatuhTempo + sebagianJatuhTempo.length;
            expect(totalCountAkhir).to.eq(totalCountAwal + 1);

            const displayCountAkhir = totalCountAkhir > 99 ? '99+' : totalCountAkhir;
            cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
              .should('contain', `${displayCountAkhir}`);
          });
        });
      });
  });

  it.skip('TC-0013 Memastikan Perubahan Summary Card Telat Dibayar Dengan Mengurangi Data', () => {
    (error)
  });

  it.skip('TC-0014 Memastikan Perubahan Summary Card Pelunasan Dengan Menambah Data', () => {
    let countAwal;
    let apiPelunasan;

    // Pasang intercept awal
    cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
    cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
    cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

    cy.reload()
    // === CEK JUMLAH DATA BELUM DIBAYAR DI BE ===
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;

      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Lunas&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const results = response.body.results || [];
        countAwal = results.length;
        const displayCount = countAwal > 99 ? '99+' : countAwal;

        cy.log(`Total data awal: ${countAwal}`);
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
          .should('contain', `${displayCount}`);
      });
    });

    // === TAMBAH PENJUALAN BARU ===
    cy.contains('Penjualan Baru').click();

    // Pilih pelanggan
    cy.wait('@waitPelanggan').then(({ response }) => {
      const pelanggan = response.body.results[0];
      cy.get('#idPelanggan').click();
      cy.get(`[data-value="${pelanggan.id}"]`).click();
    });

    // Isi alamat
    cy.get('#address').clear().type('Jalan Palaraya');

    // Pilih produk
    cy.wait('@productsData').then(({ response }) => {
      const produk = response.body.results.find(p => p.is_sell);
      cy.get('[id="penjualan.0.product_id"]').click();
      cy.get(`[data-value="${produk.id}"]`).click();
    });

    // Isi harga
    cy.get('[name="penjualan.0.price"]').clear().type('10000');

    // Submit form penjualan
    cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCardAfterAdd');
    cy.get('.MuiButton-contained').click();
    cy.get('[data-testid="alert-dialog-submit-button"]').click();

    // Ambil data awal pelunasan
    cy.wait(1000)
    cy.wait('@waitDataCardAfterAdd').then(({ response }) => {
      apiPelunasan = Math.round(response.body.pelunasanDiterima.nominal);
      const formattedPelunasan = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiPelunasan)}`;

      cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
        .should('have.text', formattedPelunasan);
    });

    // === MASUK KE DETAIL PENJUALAN DAN LAKUKAN PELUNASAN ===
    cy.get(':nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root').click();
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click();
    cy.get('[data-value="payment"]').uclick();

    cy.get('#metode').click();
    cy.get('[data-value="Tunai"]').click();

    cy.get('#nomor_akun').click();
    cy.contains('1-11001 - Kas').click();

    // Ambil nilai bayar
    cy.get(' * > :nth-child(5) > :nth-child(2)')
      .invoke('text')
      .then((bayar) => {
        const totalBayar = parseInt(bayar.replace(/\D/g, ''), 10);
        cy.get('[name="sub_total"]').type(totalBayar);

        // Intercept update summary card setelah pelunasan
        cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCardAfterPay');

        // Submit pelunasan
        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        // // === Perbaikan pengecekan URL pakai .then() ===
        // cy.url().then((currentUrl) => {
        //   if (currentUrl === "https://uat-cashbook.assist.id/admin/sales/detail") {
        //     cy.visit('https://uat-cashbook.assist.id/admin/sales');
        //   } else {
        //     cy.log('ganti kodingannya bg maren balikannya gak langsung visit sales');
        //   }
        // });

        // Validasi perubahan summary card
        cy.wait("@waitDataCardAfterPay").then(({ response }) => {
          const apiPelunasanBaru = Math.round(response.body.pelunasanDiterima.nominal);
          const formattedApiPelunasan = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiPelunasanBaru)}`;

          cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
            .should('have.text', formattedApiPelunasan);
        });
      });

    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;
      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Lunas&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const results = response.body.results || [];
        const countAkhir = results.length;

        expect(countAkhir).to.eq(countAwal + 1);
        cy.log(`Data awal: ${countAwal}`);
        cy.log(`Data akhir: ${countAkhir}`);
      });
    });
  });

  it('TC-0015 Memastikan Kondisi Summary Card Jika Data Tidak Ada', () => {
    cy.reload()
    // 1. Intercept & ubah semua data ke 0
    cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`, (req) => {
      req.reply((res) => {
        res.body = {
          belumDibayar: { total: 0, nominal: 0 },
          telatBayar: { total: 0, nominal: 0 },
          pelunasanDiterima: { total: 0, nominal: 0 }
        };
      });
    }).as('dataKosong');

    // 2. Tunggu data termock
    cy.wait('@dataKosong');

    // 3. Cek badge tidak ada
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
      .should('not.visible');
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
      .should('not.visible');
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
      .should('not.visible');

    // 4. Cek nominal "Rp 0" (dengan non-breaking space)
    const expectedNominal = 'Rp\u00A00'; // \u00A0 adalah &nbsp;
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
      .should('contain', expectedNominal);
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
      .should('contain', expectedNominal);
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
      .should('contain', expectedNominal);

  });

  it('TC-0016 Ketika Card Tidak Memiliki Data', () => {
    cy.reload()
    cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`, {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    }).as('dataError');

    cy.wait('@dataError');
    // 3. Cek badge tidak ada
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
      .should('not.visible');
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
      .should('not.visible');
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
      .should('not.visible');

    // 4. Cek nominal "Rp 0" (dengan non-breaking space)
    const expectedNominal = 'Rp\u00A00'; // \u00A0 adalah &nbsp;
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
      .should('contain', expectedNominal);
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
      .should('contain', expectedNominal);
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
      .should('contain', expectedNominal);

    cy.get('.MuiAlert-message').should('have.text', 'Kesalahan di server')
  });

  it('TC-0017 Filter Status Penjualan (Functional Tab Semua)', () => {
    // Helper format tanggal
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };

    // Spy API penjualan tanpa manipulasi
    cy.intercept(
      "GET",
      `**/api/penjualan?keyword=&status=&**&**&skip=0&limit=10&companyId=${companyId}`
    ).as("getPenjualanSemua");

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.wait(3000);
    cy.contains("Apply").click();

    // Tunggu request API asli
    cy.wait(1000);
    cy.wait("@getPenjualanSemua").then(({ response }) => {
      expect(response.statusCode).to.eq(200);

      const apiData = response.body.results;



      // Cek setiap row
      cy.get("table tbody tr").each(($row, index) => {
        expect(response.statusCode).to.eq(200);

        // Pastikan jumlah row tabel sama dengan data API
        cy.get("table tbody tr").should("have.length", apiData.length);

        cy.get("table tbody tr").each(($row, index) => {
          const rowData = apiData[index];
          if (!rowData) return;

          const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

          expect(clean($row.find("td").eq(0)))
            .to.eq(formatDate(rowData.tanggal_transaksi));

          expect(clean($row.find("td").eq(1)))
            .to.eq(rowData.nomor);

          expect(clean($row.find("td").eq(2)))
            .to.eq(rowData.customer?.nama || "");

          expect(clean($row.find("td").eq(3)))
            .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

          expect(clean($row.find("td").eq(4)))
            .to.eq(rowData.status);

          expect(clean($row.find("td").eq(5)))
            .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

          expect(clean($row.find("td").eq(6)))
            .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
        });
      });
    })
  });

  it('TC-0018 Filter Status Penjualan (Functional Tab Belum Dibayar)', () => {
    // Spy API penjualan dengan filter "Belum Dibayar"
    cy.intercept(
      "GET",
      `**/api/penjualan?keyword=&status=Belum+Dibayar&**`
    ).as("getPenjualanBelumDibayar");

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();

    // Klik tab "Belum Dibayar"
    cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();

    // Tunggu data API
    cy.wait(1000);
    cy.wait("@getPenjualanBelumDibayar").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      const apiData = response.body.results;

      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);

      // Loop semua row
      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(4))).to.eq("Belum Dibayar");
      });
    })
  });

  it('TC-0019 Filter Status Penjualan (Functional Tab Lunas)', () => {
    // Helper format tanggal
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };

    cy.reload()

    // Spy API penjualan dengan filter "Lunas"
    cy.intercept(
      "GET",
      `**/api/penjualan?keyword=&status=Lunas&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
    ).as("getPenjualanLunas");

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();

    // Klik tab "Lunas"
    cy.get('.MuiTabs-flexContainer > :nth-child(4)').click();

    // Tunggu data API
    cy.wait(1000);
    cy.wait("@getPenjualanLunas").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      const apiData = response.body.results;

      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);

      // Loop semua row
      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        // Validasi tanggal jatuh tempo di UI
        expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        // Pastikan status hanya "Lunas"
        expect(clean($row.find("td").eq(4))).to.eq("Lunas");

        // Validasi data API mendukung status "Lunas"
        expect(rowData.sisa_tagihan).to.eq(0);
        expect(rowData.status).to.eq("Lunas");
      });
    });
  });

  it('TC-0020 Filter Status Penjualan (Functional Tab Dibayar Sebagian)', () => {
    // Intercept API
    cy.intercept(
      "GET",
      `**/api/penjualan?keyword=&status=Dibayar+Sebagian&**-01-01&**`
    ).as("getPenjualanDibayarSebagian");

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();

    // Klik tab Dibayar Sebagian
    cy.get('.MuiTabs-flexContainer > :nth-child(5)').click();

    // Tunggu API
    cy.wait(1000);
    cy.wait("@getPenjualanDibayarSebagian").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      const apiData = response.body.results;

      // Pastikan jumlah row tabel sama
      cy.get("table tbody tr").should("have.length", apiData.length);

      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();
        if (!rowData) return;

        // Ambil status dari UI dan API
        const statusUI = clean($row.find("td").eq(4));

        // Validasi status hanya "Dibayar Sebagian"
        expect(statusUI).to.eq("Dibayar Sebagian");

        // Validasi sisa tagihan antara 0 dan total
        expect(rowData.sisa_tagihan).to.be.greaterThan(0);
        expect(rowData.sisa_tagihan).to.be.lessThan(rowData.total);
      });
    });
  });

  it('TC-0021 Filter Status Penjualan (Functional Tab Void)', () => {
    // Helper format tanggal
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };

    cy.reload()
    // Intercept API untuk status Void
    cy.intercept(
      "GET",
      `**/api/penjualan?keyword=&status=Void&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
    ).as("getPenjualanVoid");

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();

    // Klik tab Void (pastikan index sesuai di tab)
    cy.get('.MuiTabs-flexContainer > :nth-child(6)').click();

    // Tunggu API
    cy.wait(1000);
    cy.wait("@getPenjualanVoid").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      const apiData = response.body.results;

      // Pastikan jumlah row tabel sama
      cy.get("table tbody tr").should("have.length", apiData.length);

      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();
        if (!rowData) return;

        // Validasi tanggal jatuh tempo
        expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        // Ambil status dari UI dan API
        const statusUI = clean($row.find("td").eq(4));
        const statusAPI = rowData.status;

        // Validasi status hanya "Void"
        expect(statusAPI).to.eq("Void");
        expect(statusUI).to.eq("Void");
      });
    });
  });

  it('TC-0022 Mencari Data Berdasarkan Nama', () => {

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();

    cy.get('[placeholder="Cari"]').type('rayhan').wait(3000)
    cy.get('tr').should('contain', 'Rayhanrayandra')

    cy.get('[placeholder="Cari"]').clear().type('rayandra').wait(3000)
    cy.get('tr').should('contain', 'Rayhanrayandra')
  });

  it('TC-0023 Mencari Data Berdasarkan Nomor Penjualan', () => {

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();

    cy.get('[placeholder="Cari"]').type('INV/0010').wait(3000)
    cy.get('tr').should('contain', 'INV/0010')

    cy.get('[placeholder="Cari"]').clear().type('V/0010').wait(3000)
    cy.get('tr').should('contain', 'INV/0010')
  });

  it('TC-0024 Mencari Data Yang Tidak Ada', () => {
    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();

    cy.get('[placeholder="Cari"]').type('&@#$^@&!TE* V@C!T!R*TVCT#! #!CT&*#T!@*T!@E').wait(3000)
    cy.contains('Tidak ada data').should('be.visible')
  });

  it('TC-0025 Uji Default Tanggal Awal Dan Tanggal Akhir Filter Penjualan', () => {
    function getStartOfCurrentMonth() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      return `01/${month}/${year}`;
    }
    // Tanggal akhir bulan ini
    function getEndOfCurrentMonth() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth(); // bulan saat ini - 0 based
      const lastDay = new Date(year, month + 1, 0).getDate(); // 0 = hari terakhir bulan sebelumnya
      return `${String(lastDay).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
    }
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).should('have.value', getStartOfCurrentMonth())
    cy.get('[placeholder="DD/MM/YYYY"]').eq(1).should('have.value', getEndOfCurrentMonth())
    cy.get('.MuiButton-outlined').should('have.text', 'Reset all')
    cy.get('.MuiGrid2-container > .MuiButton-contained').should('have.text', 'Apply')

  });

  it('TC-0026 Filter Tanggal Penjualan Dengan Waktu Awal Dan Akhir Yang Sama', () => {

    cy.intercept('GET', '**api/penjualan?keyword=&status=&startDate=2025-08-23&endDate=2025-08-23&skip=0&limit=10**').as('Tunggu')
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("23082025");
    cy.get('[placeholder="DD/MM/YYYY"]').eq(1).clear().type("23082025");
    cy.get('.MuiGrid2-container > .MuiButton-contained').click()

    cy.wait('@Tunggu')
    cy.wait(3000)
    // Ambil semua data di kolom pertama (field a)
    cy.get('tr td:nth-child(1)').each(($td) => {
      const text = $td.text().trim();
      expect(text).to.contain('23/08/25', { timeout: 20000 });
    });
  });

  it('TC-0027 Filter Tanggal Penjualan Dengan Rentang Waktu Tertentu', () => {
    cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=*&endDate=*&skip=0&limit=10&**').as('Tunggu')

    // Klik filter tanggal
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("10082025")
    cy.get('[placeholder="DD/MM/YYYY"]').eq(1).clear().type("20082025")
    cy.get('.MuiGrid2-container > .MuiButton-contained').click()

    cy.wait('@Tunggu')

    // Definisikan tanggal range
    const startDate = new Date(2025, 7, 10) // bulan 7 = Agustus (0-based)
    const endDate = new Date(2025, 7, 20)

    // Gunakan should agar Cypress retry sampai data tabel valid
    cy.get('tr td:nth-child(1)').should(($tds) => {
      expect($tds.length, "Data tabel kosong").to.be.greaterThan(0)

      $tds.each((i, td) => {
        const text = td.innerText.trim()
        const [day, month, year] = text.split('/')
        const cellDate = new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day))

        expect(cellDate, `Tanggal ${text} di luar rentang`)
          .to.be.within(startDate, endDate)
      })
    })
  })

  it('TC-0028 Filter Tanggal Penjualan Dengan Field Kosong', () => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };

    function getStartOfCurrentMonth() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      return `01/${month}/${year}`;
    }
    cy.reload()
    cy.intercept(
      "GET",
      `**/api/penjualan?keyword=&status=&**&**&skip=0&limit=10&companyId=${companyId}`
    ).as("getPenjualan");
    // Optional: spy API kalau ada
    cy.wait("@getPenjualan").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      const apiData = response.body.results;

      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);

      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(formatDate(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });

      cy.get('.MuiBox-root > .MuiButtonBase-root').click();

      // Field pertama terisi tanggal awal bulan
      cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
        .should('have.value', getStartOfCurrentMonth());

      // Field kedua dikosongkan
      cy.get('[placeholder="DD/MM/YYYY"]').eq(1).clear();

      // Klik tombol Apply / Filter
      cy.get('.MuiGrid2-container > .MuiButton-contained').click();

      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(formatDate(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });
    });

  });

  it('TC-0029 Reset Pagination Ke Halaman 1 Saat Filter Tanggal', () => {
    // cy.intercept()
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.get('.MuiGrid2-container > .MuiButton-contained').click()
    cy.get('.qcw-trigger-btn').click()

    cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
    cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('be.enabled')

    cy.get('[placeholder="Cari"]').type('INV/0020')
    cy.contains('Tidak ada data').should('not.exist')
    cy.contains('INV/0020').should('exist')

    cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.disabled')
    cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('be.enabled')
    cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.disabled')

    cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', 'Menampilkan 1 - 1 dari 1 data')
  });

  it('TC-0030 Pengujian Pagination Arrow', () => {
    // Helper format tanggal
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };
    cy.reload()
    cy.get('.qcw-trigger-btn').click()
    cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01**').as('getData')
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.get('.MuiGrid2-container > .MuiButton-contained').click()

    cy.wait('@getData').then(({ response }) => {

      const totalData = response.body.totalData;
      const apiData = response.body.results;
      const pageAkhir = Math.ceil(totalData / 10);
      cy.wait(1000);
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.disabled')
      cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
      cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('have.text', '2')
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '3')
      cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '4')
      cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5')
      cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
      cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
      cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')



      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);

      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(formatDate(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });
      cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 1 - 10 dari ${totalData} data`)
    })

    cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').click()
    cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01**').as('getDataPage3')
    cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').click()
    cy.wait('@getDataPage3').then(({ response }) => {

      const totalData = response.body.totalData;
      const apiData = response.body.results;
      const pageAkhir = Math.ceil(totalData / 10);
      cy.wait(1000);
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.enabled')
      cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
      cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('have.text', '2')
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '3')
      cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '4')
      cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5')
      cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
      cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
      cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')

      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);
      console.log(apiData)
      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(formatDate(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });
      cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 21 - 30 dari ${totalData} data`)
    })

    cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
    cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01**').as('getDataPageFirst')
    cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
    cy.wait('@getDataPageFirst').then(({ response }) => {

      const totalData = response.body.totalData;
      const apiData = response.body.results;
      const pageAkhir = Math.ceil(totalData / 10);
      cy.wait(1000);
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.disabled')
      cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
      cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('have.text', '2')
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '3')
      cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '4')
      cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5')
      cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
      cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
      cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')

      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);

      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(formatDate(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });
      cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 1 - 10 dari ${totalData} data`)
    })
  })

  it('TC-0031 Pengujian Pagination Dengan Memilih Angka Tengah', () => {
    // Helper format tanggal
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };

    cy.get('.qcw-trigger-btn').click()
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.get('.MuiGrid2-container > .MuiButton-contained').click()

    cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01**').as('getDataPage5')
    cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5').click()

    cy.wait('@getDataPage5').then(({ response }) => {
      const totalData = response.body.totalData;
      const apiData = response.body.results;
      const pageAkhir = Math.ceil(totalData / 10);
      cy.wait(1000);
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.enabled')
      cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
      cy.get(':nth-child(3) > .MuiPaginationItem-root').should('have.text', '…')
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '4')
      cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '5')
      cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '6')
      cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
      cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
      cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')

      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);

      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(formatDate(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });
      cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 41 - 50 dari ${totalData} data`)
    });
  });

  it('TC-0032 Pagination Memilih Angka Akhir', () => {
    // Helper format tanggal
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };
    cy.get('.qcw-trigger-btn').click()
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.get('.MuiGrid2-container > .MuiButton-contained').click()
    cy.wait(2000)
    cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=**').as('getDataLastPage')
    cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').click()

    cy.wait('@getDataLastPage').then(({ response }) => {
      const totalData = response.body.totalData;
      const apiData = response.body.results;
      const pageAkhir = Math.ceil(totalData / 10);
      cy.log(pageAkhir)
      const pageAkhirBefore1 = pageAkhir - 1;
      const pageAkhirBefore2 = pageAkhir - 2;
      const pageAkhirBefore3 = pageAkhir - 3;
      const pageAkhirBefore4 = pageAkhir - 4;

      const dataAwalPage = (pageAkhir - 1) * 10 + 1;
      cy.wait(1000);
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.enabled')
      cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
      cy.get(':nth-child(3) > .MuiPaginationItem-root').should('have.text', '…')
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', pageAkhirBefore4)
      cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', pageAkhirBefore3)
      cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', pageAkhirBefore2)
      cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', pageAkhirBefore1)
      cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
      cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.disabled')

      // Pastikan jumlah row tabel sama dengan data API
      cy.get("table tbody tr").should("have.length", apiData.length);
      console.log(apiData)
      cy.get("table tbody tr").each(($row, index) => {
        const rowData = apiData[index];
        if (!rowData) return;

        const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

        expect(clean($row.find("td").eq(0)))
          .to.eq(formatDate(rowData.tanggal_transaksi));

        expect(clean($row.find("td").eq(1)))
          .to.eq(rowData.nomor);

        expect(clean($row.find("td").eq(2)))
          .to.eq(rowData.customer?.nama || "");

        expect(clean($row.find("td").eq(3)))
          .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

        expect(clean($row.find("td").eq(4)))
          .to.eq(rowData.status);

        expect(clean($row.find("td").eq(5)))
          .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(6)))
          .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);

        expect(clean($row.find("td").eq(7)))
          .to.eq(`${rowData.created_name}`);
      });
      cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan ${dataAwalPage} - ${totalData} dari ${totalData} data`)
    });
  });

  it('TC-0033 Melihat Detail Kontak Pelanggan', () => {
    cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=**').as('getDataLastPage')

    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.get('.MuiGrid2-container > .MuiButton-contained').click()
    cy.wait('@getDataLastPage').then(({ response }) => {
      const idPelanggan = response.body.results[0].pelanggan_id;

      cy.intercept('GET', '**/api/kontak/getDetail/**').as('getNama')

      cy.get(':nth-child(1) > :nth-child(3) > [aria-label="Detail Pelanggan"] > a > .MuiButtonBase-root').click()



      cy.getCookie('token').then((cookie) => {
        const token = cookie?.value;

        cy.wait('@getNama').then(({ response }) => {
          const nama = response.body.results[0].nama;
          cy.log(`Nama pelanggan: ${nama}`);
          expect(nama).to.exist
          cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should('have.text', nama)
        })
      })
    })
  })

})




