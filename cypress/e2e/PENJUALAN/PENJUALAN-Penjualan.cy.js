const companyId = Cypress.env('companyId');

describe("PENJUALAN", () => {
  beforeEach(() => {
    cy.handleUncaughtExceptions()

    cy.window().then((win) => {
      const resizeObserverErr = win.onerror
      win.onerror = function (msg, url, line, col, error) {
        if (msg.includes('ResizeObserver loop')) {
          return true // suppress
        }
        if (resizeObserverErr) return resizeObserverErr(msg, url, line, col, error)
      }
    })

    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
    cy.visitDashboard(companyId);
    cy.navigateToPenjualan();
  });

  it('TC-0001 Validasi Penulisan Komponen UI Statis Halaman Penjualan', () => {
    cy.get('.MuiTypography-h5 > span').should('have.text', 'Penjualan');
    cy.get('.MuiBreadcrumbs-ol').should('have.text', "Beranda/Penjualan");

    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root')
      .should('have.text', "Belum Dibayar");
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2')
      .should('have.text', 'Total Penjualan');

    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root')
      .should('have.text', 'Telat Dibayar');
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2')
      .should('have.text', 'Total Penjualan');

    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root')
      .should('have.text', 'Pelunasan Diterima (30 Hari Terakhir)');
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2')
      .should('have.text', 'Total Penjualan');

    cy.get('.MuiTabs-flexContainer > :nth-child(1)').should('have.text', 'Semua');
    cy.get('.MuiTabs-flexContainer > :nth-child(2)').should('have.text', 'Belum Dibayar');
    cy.get('.MuiTabs-flexContainer > :nth-child(3)').should('have.text', 'Jatuh Tempo');
    cy.get('.MuiTabs-flexContainer > :nth-child(4)').should('have.text', 'Lunas');
    cy.get('.MuiTabs-flexContainer > :nth-child(5)').should('have.text', 'Dibayar Sebagian');
    cy.get('.MuiTabs-flexContainer > :nth-child(6)').should('have.text', 'Void');

    cy.get('.MuiBox-root > .MuiButtonBase-root').should('have.text', 'Filter Tanggal');
    cy.get('input[placeholder="Cari"]').should('be.visible');

    cy.get('.MuiTableRow-root > :nth-child(1)').should('have.text', 'Tanggal');
    cy.get('.MuiTableRow-root > :nth-child(2)').should('have.text', 'Nomor');
    cy.get('.MuiTableRow-root > :nth-child(3)').should('have.text', 'Nama Pelanggan');
    cy.get('.MuiTableRow-root > :nth-child(4)').should('have.text', 'Tgl Jatuh Tempo');
    cy.get('.MuiTableRow-root > :nth-child(5)').should('have.text', 'Status');
    cy.get('.MuiTableRow-root > :nth-child(6)').should('have.text', 'Sisa Tagihan');
    cy.get('.MuiTableRow-root > :nth-child(7)').should('have.text', 'Total Tagihan');
  });

  it('TC-0002 Validasi Isi Tabel Penjualan Berdasarkan Data API Asli', () => {
    // Helper format tanggal
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };

    // Spy API penjualan tanpa memanipulasi
    cy.intercept(
      "GET",
      `**/api/penjualan?keyword=&status=&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
    ).as("getPenjualan");

    // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
    cy.contains("Apply").click();
    cy.wait(1000)
    // Tunggu request API asli
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
      });
    });
  });

  it('TC-0003 Pengujian Data Tabel Dengan API CodeStatus 500', () => {
    cy.intercept('GET', `**/api/penjualan?keyword=&status=&startDate=**`, {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    }).as('dataError')
    cy.wait('@dataError')
    cy.contains('Tidak ada data').should('be.visible')
    cy.get('.MuiAlert-message').should('have.text', 'Kesalahan di server')
  });

  it('TC-0004 Skeleton Loading Saat Fetch Data', () => {
    cy.reload()
    // Pastikan skeleton muncul
    cy.get('.MuiSkeleton-root').should('be.visible');
    // Pastikan jumlah skeleton sesuai ekspektasi (misalnya 5 item)
    cy.get('.MuiSkeleton-root').should('have.length', 27);
    // Tunggu skeleton hilang sebelum lanjut tes
    cy.get('.MuiSkeleton-root', { timeout: 10000 }).should('not.exist');
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

  it.only('TC-0009 Memastikan Perubahan Summary Card Belum Dibayar Dengan Menambah Data', () => {
    let countAwal;
    let apiAwalBelum;

    // === PASANG INTERCEPT ===
    cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
    cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
    cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

    cy.reload()

    // === CEK JUMLAH DATA BELUM DIBAYAR DI BE ===
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;

      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum%20Dibayar&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const results = response.body.results || [];
        countAwal = results.length;
        const displayCount = countAwal > 99 ? '99+' : countAwal;

        cy.log(`Total data awal: ${countAwal}`);
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
          .should('contain', `${displayCount}`);
      });
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
      cy.get(`[data-value]`)
        .eq(1).click()
        .scrollIntoView({ block: 'center' }) // pastikan muncul di tengah viewport
        .should('be.visible') // pastikan visible
        .click({ force: true }); // bypass overlay check kalau masih ketutup
    });

    cy.get('#address').clear().type('Jalan Palaraya');

    // Pilih produk
    cy.wait('@productsData').then(({ response }) => {
      const produk = response.body.results.find(p => p.is_sell);
      cy.get('[id="penjualan.0.product_id"]').click();
      cy.get(`[data-value="${produk.id}"]`).click();

    });

    // Isi harga
    cy.get('[name="penjualan.0.price"]').clear().type('10000');

    // Ambil total dibayar
    cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2)')
      .invoke('text')
      .then((totalText) => {
        const totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

        // Intercept data setelah simpan
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
      });

    // === CEK JUMLAH DATA BELUM DIBAYAR SETELAH TAMBAH ===
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;
      cy.request({
        method: 'GET',
        url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum%20Dibayar&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
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

  it.only('TC-0010 Memastikan Perubahan Summary Card Belum Dibayar Dengan Terima Pembayaran Data', () => {
  let countAwal;
  let apiAwalBelum;
  let totalDibayar;
  let invoiceNomor;

  // === PASANG INTERCEPT ===
  cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
  cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
  cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');
  
  cy.reload()

  // === CEK JUMLAH DATA BELUM DIBAYAR DI BE ===
  cy.getCookie('token').then((cookie) => {
    const token = cookie?.value;

    cy.request({
      method: 'GET',
      url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum%20Dibayar&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      const results = response.body.results || [];
      countAwal = results.length;
      const displayCount = countAwal > 99 ? '99+' : countAwal;

      cy.log(`Total data awal: ${countAwal}`);
      cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
        .should('contain', `${displayCount}`);
    });
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
    cy.get('#idPelanggan').click();
    cy.get(`[data-value]`)
    .eq(1)
    .should('be.visible')
    .scrollIntoView()
    .click({ force: true });
  });

  cy.get('#address').clear().type('Jalan Palaraya');

  // Pilih produk
  cy.wait('@productsData').then(({ response }) => {
    const produk = response.body.results.find(p => p.is_sell);
    cy.get('[id="penjualan.0.product_id"]').click();
    cy.get(`[data-value="${produk.id}"]`).click();
  });

  // Isi harga
  cy.get('[name="penjualan.0.price"]').clear().type('10000');

  // Ambil total dibayar
  cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2)')
    .invoke('text')
    .then((totalText) => {
      totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

      // Intercept data setelah simpan
      cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard2');
      cy.intercept('POST', '**/api/penjualan').as('postPenjualan');

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
      url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum%20Dibayar&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      const results = response.body.results || [];
      const countAkhir = results.length;

      expect(countAkhir).to.eq(countAwal + 1);
      cy.log(`Data awal: ${countAwal}`);
      cy.log(`Data akhir: ${countAkhir}`);
    });
  });

  // === AMBIL NOMOR INVOICE DARI RESPONSE PENJUALAN ===
  cy.wait('@postPenjualan').then(({ response }) => {
    invoiceNomor = response.body.nomor;
    cy.log(`Invoice Baru: ${invoiceNomor}`);

    // buka detail invoice & lakukan pembayaran
    cy.contains('td', invoiceNomor).click();
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click();
    cy.get('[data-value="payment"]').click();

    // isi form pembayaran
    cy.get('#metode').click();
    cy.get('[data-value]').eq(1).click();

    cy.get('#nomor_akun').click();
    cy.get('[data-option-index="0"]').click();

    cy.get('[name="sub_total"]').clear().type(`${totalDibayar}`);

    cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard3');

    // submit pembayaran
    cy.get('.MuiButton-contained').click();
    cy.get('[data-testid="alert-dialog-submit-button"]').click();
  });

  // === VALIDASI 2: CEK SUMMARY CARD SETELAH PEMBAYARAN ===
  cy.wait('@waitDataCard3').then(({ response }) => {
    const apiSetelahBayar = Math.round(response.body.belumDibayar.nominal);
    const formatted = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiSetelahBayar)}`;
    cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
      .should('have.text', formatted);

    // nominal harus kembali ke kondisi awal sebelum tambah
    expect(apiSetelahBayar).to.eq(apiAwalBelum);
  });
});


  // it.only('TC-0011 Memastikan Perubahan Summary Card Telat Dibayar Dengan Menambah Data', () => {
  //   let apiTelatSebelum;
  //   let totalCountAwal;
  //   let token;

  //   // Ambil token sekali di awal
  //   cy.getCookie('token').then((cookie) => {
  //     token = cookie?.value;

  //     // === Ambil data awal Jatuh Tempo ===
  //     cy.request({
  //       method: 'GET',
  //       url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Jatuh+Tempo&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
  //       headers: { Authorization: `Bearer ${token}` }
  //     }).then((resJatuhTempo) => {
  //       const countJatuhTempo = resJatuhTempo.body.results.length;

  //       // === Ambil data Dibayar Sebagian ===
  //       cy.request({
  //         method: 'GET',
  //         url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Dibayar+Sebagian&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
  //         headers: { Authorization: `Bearer ${token}` }
  //       }).then((resSebagian) => {
  //         const resultsSebagian = resSebagian.body.results || [];

  //         // Filter yang termasuk jatuh tempo
  //         const sebagianJatuhTempo = resultsSebagian.filter(item => {
  //           const dueDate = item.tanggal_jatuh_tempo;
  //           const transactionDate = item.tanggal_transaksi;
  //           return dueDate < transactionDate; // logika overdue versi kamu
  //         });

  //         // Log semua untuk pengecekan
  //         sebagianJatuhTempo.forEach(item => {
  //           const transactionDate = new Date(item.tanggal_transaksi);
  //           cy.log(`Due Date: ${item.tanggal_jatuh_tempo} | Trans Date: ${transactionDate.toISOString()}`);
  //         });

  //         // Total keseluruhan
  //         const totalCountAwal = countJatuhTempo + sebagianJatuhTempo.length;
  //         console.log(resultsSebagian);


  //         const displayCountAwal = totalCountAwal > 99 ? '99+' : totalCountAwal;
  //         cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //           .should('contain', `${displayCountAwal}`);
  //       });
  //     });
  //   });

  //   // Pasang intercept
  //   cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
  //   cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
  //   cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

  //   // === Cek nilai awal di summary card ===
  //   cy.wait('@waitDataCard').then(({ response }) => {
  //     apiTelatSebelum = Math.round(response.body.telatBayar.nominal);
  //     const formattedTelatSebelum = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiTelatSebelum)}`;
  //     cy.contains(':nth-child(2) .MuiTypography-h5', 'Rp')
  //       .should('have.text', formattedTelatSebelum);
  //   });

  //   // // === Tambah penjualan baru ===
  //   cy.contains('Penjualan Baru').click();

  //   cy.wait('@waitPelanggan').then(({ response }) => {
  //     const pelanggan = response.body.results[0];
  //     cy.get('#idPelanggan').click();
  //     cy.get(`[data-value="${pelanggan.id}"]`).click();
  //   });

  //   cy.get('#address').clear().type('Jalan Palaraya');
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");

  //   cy.wait('@productsData').then(({ response }) => {
  //     const produk = response.body.results.find(p => p.is_sell);
  //     cy.get('[id="penjualan.0.product_id"]').click();
  //     cy.get(`[data-value="${produk.id}"]`).click();
  //   });

  //   cy.get('[name="penjualan.0.price"]').clear().type('10000');

  //   cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2)')
  //     .invoke('text')
  //     .then((totalText) => {
  //       const totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

  //       cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard2');

  //       cy.get('.MuiButton-contained').click();
  //       cy.get('[data-testid="alert-dialog-submit-button"]').click();

  //       cy.wait('@waitDataCard2').then(({ response }) => {
  //         const apiTelatSesudah = Math.round(response.body.telatBayar.nominal);
  //         const formattedTelatSesudah = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiTelatSesudah)}`;
  //         cy.contains(':nth-child(2) .MuiTypography-h5', 'Rp')
  //           .should('have.text', formattedTelatSesudah);

  //         expect(apiTelatSesudah).to.eq(apiTelatSebelum + totalDibayar);
  //       });

  //       // === Ambil data akhir dan cek badge bertambah ===
  //       cy.request({
  //         method: 'GET',
  //         url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Jatuh+Tempo&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
  //         headers: { Authorization: `Bearer ${token}` }
  //       }).then((resJatuhTempo) => {
  //         const countJatuhTempo = resJatuhTempo.body.results.length;

  //         cy.request({
  //           method: 'GET',
  //           url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Dibayar+Sebagian&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
  //           headers: { Authorization: `Bearer ${token}` }
  //         }).then((resSebagian) => {
  //           const resultsSebagian = resSebagian.body.results || [];
  //           const today = new Date();

  //           const sebagianJatuhTempo = resultsSebagian.filter(item => {
  //             const dueDate = new Date(item.jatuhTempo || item.dueDate);
  //             return dueDate < today;
  //           });

  //           const totalCountAkhir = countJatuhTempo + sebagianJatuhTempo.length;
  //           expect(totalCountAkhir).to.eq(totalCountAwal + 1);

  //           const displayCountAkhir = totalCountAkhir > 99 ? '99+' : totalCountAkhir;
  //           cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //             .should('contain', `${displayCountAkhir}`);
  //         });
  //       });
  //     });
  // });

  // it.only('TC-0012 Memastikan Perubahan Summary Card Telat Dibayar Dengan Mengurangi Data', () => {
  //   (error)
  // });

  // it.only('TC-0013 Memastikan Perubahan Summary Card Pelunasan Dengan Menambah Data', () => {
  //   let countAwal;
  //   let apiPelunasan;

  //   // Pasang intercept awal
  //   cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
  //   cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
  //   cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

  //   // === CEK JUMLAH DATA BELUM DIBAYAR DI BE ===
  //   cy.getCookie('token').then((cookie) => {
  //     const token = cookie?.value;

  //     cy.request({
  //       method: 'GET',
  //       url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Lunas&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
  //       headers: { Authorization: `Bearer ${token}` }
  //     }).then((response) => {
  //       const results = response.body.results || [];
  //       countAwal = results.length;
  //       const displayCount = countAwal > 99 ? '99+' : countAwal;

  //       cy.log(`Total data awal: ${countAwal}`);
  //       cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //         .should('contain', `${displayCount}`);
  //     });
  //   });

  //   // === TAMBAH PENJUALAN BARU ===
  //   cy.contains('Penjualan Baru').click();

  //   // Pilih pelanggan
  //   cy.wait('@waitPelanggan').then(({ response }) => {
  //     const pelanggan = response.body.results[0];
  //     cy.get('#idPelanggan').click();
  //     cy.get(`[data-value="${pelanggan.id}"]`).click();
  //   });

  //   // Isi alamat
  //   cy.get('#address').clear().type('Jalan Palaraya');

  //   // Pilih produk
  //   cy.wait('@productsData').then(({ response }) => {
  //     const produk = response.body.results.find(p => p.is_sell);
  //     cy.get('[id="penjualan.0.product_id"]').click();
  //     cy.get(`[data-value="${produk.id}"]`).click();
  //   });

  //   // Isi harga
  //   cy.get('[name="penjualan.0.price"]').clear().type('10000');

  //   // Submit form penjualan
  //   cy.get('.MuiButton-contained').click();
  //   cy.get('[data-testid="alert-dialog-submit-button"]').click();

  //   // Ambil data awal pelunasan
  //   cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCardAfterAdd');
  //   cy.wait(1000)
  //   cy.wait('@waitDataCardAfterAdd').then(({ response }) => {
  //     apiPelunasan = Math.round(response.body.pelunasanDiterima.nominal);
  //     const formattedPelunasan = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiPelunasan)}`;

  //     cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //       .should('have.text', formattedPelunasan);
  //   });

  //   // === MASUK KE DETAIL PENJUALAN DAN LAKUKAN PELUNASAN ===
  //   cy.get(':nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root').click();
  //   cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click();
  //   cy.get('[data-value="payment"]').click();

  //   cy.get('#metode').click();
  //   cy.get('[data-value="Tunai"]').click();

  //   cy.get('#nomor_akun').click();
  //   cy.contains('1-11001 - Kas').click();

  //   // Ambil nilai bayar
  //   cy.get(' * > :nth-child(5) > :nth-child(2)')
  //     .invoke('text')
  //     .then((bayar) => {
  //       const totalBayar = parseInt(bayar.replace(/\D/g, ''), 10);
  //       cy.get('[name="sub_total"]').type(totalBayar);

  //       // Intercept update summary card setelah pelunasan
  //       cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCardAfterPay');

  //       // Submit pelunasan
  //       cy.get('.MuiButton-contained').click();
  //       cy.get('[data-testid="alert-dialog-submit-button"]').click();

  //       // // === Perbaikan pengecekan URL pakai .then() ===
  //       // cy.url().then((currentUrl) => {
  //       //   if (currentUrl === "https://uat-cashbook.assist.id/admin/sales/detail") {
  //       //     cy.visit('https://uat-cashbook.assist.id/admin/sales');
  //       //   } else {
  //       //     cy.log('ganti kodingannya bg maren balikannya gak langsung visit sales');
  //       //   }
  //       // });

  //       // Validasi perubahan summary card
  //       cy.wait("@waitDataCardAfterPay").then(({ response }) => {
  //         const apiPelunasanBaru = Math.round(response.body.pelunasanDiterima.nominal);
  //         const formattedApiPelunasan = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiPelunasanBaru)}`;

  //         cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //           .should('have.text', formattedApiPelunasan);
  //       });
  //     });

  //   cy.getCookie('token').then((cookie) => {
  //     const token = cookie?.value;
  //     cy.request({
  //       method: 'GET',
  //       url: `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Lunas&startDate=0001-08-01&endDate=2025-08-31&skip=0&limit=9999&companyId=${companyId}`,
  //       headers: { Authorization: `Bearer ${token}` }
  //     }).then((response) => {
  //       const results = response.body.results || [];
  //       const countAkhir = results.length;

  //       expect(countAkhir).to.eq(countAwal + 1);
  //       cy.log(`Data awal: ${countAwal}`);
  //       cy.log(`Data akhir: ${countAkhir}`);
  //     });
  //   });
  // });

  // it('TC-0014 Memastikan Kondisi Summary Card Jika Data Tidak Ada', () => {
  //   // 1. Intercept & ubah semua data ke 0
  //   cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`, (req) => {
  //     req.reply((res) => {
  //       res.body = {
  //         belumDibayar: { total: 0, nominal: 0 },
  //         telatBayar: { total: 0, nominal: 0 },
  //         pelunasanDiterima: { total: 0, nominal: 0 }
  //       };
  //     });
  //   }).as('dataKosong');

  //   // 2. Tunggu data termock
  //   cy.wait('@dataKosong');

  //   // 3. Cek badge tidak ada
  //   cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //     .should('not.visible');
  //   cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //     .should('not.visible');
  //   cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //     .should('not.visible');

  //   // 4. Cek nominal "Rp 0" (dengan non-breaking space)
  //   const expectedNominal = 'Rp\u00A00'; // \u00A0 adalah &nbsp;
  //   cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //     .should('contain', expectedNominal);
  //   cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //     .should('contain', expectedNominal);
  //   cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //     .should('contain', expectedNominal);

  // });

  // it('TC-0015 Ketika Card Tidak Memiliki Data', () => {
  //   cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`, {
  //     statusCode: 500,
  //     body: {
  //       message: 'Internal Server Error'
  //     }
  //   }).as('dataError');

  //   cy.wait('@dataError');
  //   // 3. Cek badge tidak ada
  //   cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //     .should('not.visible');
  //   cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //     .should('not.visible');
  //   cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge')
  //     .should('not.visible');

  //   // 4. Cek nominal "Rp 0" (dengan non-breaking space)
  //   const expectedNominal = 'Rp\u00A00'; // \u00A0 adalah &nbsp;
  //   cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //     .should('contain', expectedNominal);
  //   cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //     .should('contain', expectedNominal);
  //   cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5')
  //     .should('contain', expectedNominal);

  //   cy.get('.MuiAlert-message').should('have.text', 'Kesalahan di server')
  // });

  // it('TC-0016 Filter Status Penjualan (Functional Tab Semua)', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };


  //   // Spy API penjualan tanpa manipulasi
  //   cy.intercept(
  //     "GET",
  //     `**/api/penjualan?keyword=&status=&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
  //   ).as("getPenjualanSemua");

  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   // Tunggu request API asli
  //   cy.wait(1000);
  //   cy.wait("@getPenjualanSemua").then(({ response }) => {
  //     expect(response.statusCode).to.eq(200);

  //     const apiData = response.body.results;

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     // Cek setiap row
  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       // Validasi tampilan tanggal jatuh tempo
  //       expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       // Tentukan status yang seharusnya
  //       const today = new Date();
  //       const dueDate = new Date(rowData.tanggal_jatuh_tempo);
  //       let expectedStatus;

  //       if (rowData.sisa_tagihan === 0 || rowData.status === "Lunas") {
  //         expectedStatus = "Lunas";
  //       }
  //       else if (
  //         rowData.sisa_tagihan > 0 &&
  //         rowData.sisa_tagihan < rowData.total_tagihan
  //       ) {
  //         expectedStatus = "Dibayar Sebagian";
  //       }
  //       else if (dueDate <= today) {
  //         expectedStatus = "Jatuh Tempo";
  //       }
  //       else {
  //         expectedStatus = rowData.status;
  //       }

  //       // Validasi status di UI sesuai logika
  //       expect(clean($row.find("td").eq(4))).to.eq(expectedStatus);
  //     });
  //   });
  // });

  // it('TC-0017 Filter Status Penjualan (Functional Tab Belum Dibayar)', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };

  //   // Spy API penjualan dengan filter "Belum Dibayar"
  //   cy.intercept(
  //     "GET",
  //     `**/api/penjualan?keyword=&status=Belum+Dibayar&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
  //   ).as("getPenjualanBelumDibayar");

  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   // Klik tab "Belum Dibayar"
  //   cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();

  //   // Tunggu data API
  //   cy.wait(1000);
  //   cy.wait("@getPenjualanBelumDibayar").then(({ response }) => {
  //     expect(response.statusCode).to.eq(200);
  //     const apiData = response.body.results;

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     // Loop semua row
  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       // Validasi tanggal jatuh tempo di UI
  //       expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       // Tentukan status seharusnya
  //       const today = new Date();
  //       const dueDate = new Date(rowData.tanggal_jatuh_tempo);

  //       const expectedStatus = dueDate <= today ? "Jatuh Tempo" : "Belum Dibayar";

  //       // Validasi status di UI
  //       expect(clean($row.find("td").eq(4))).to.eq(expectedStatus);
  //     });
  //   })
  // });

  // it.only('TC-0018 Filter Status Penjualan (Functional Tab Lunas)', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };


  //   // Spy API penjualan dengan filter "Lunas"
  //   cy.intercept(
  //     "GET",
  //     `**/api/penjualan?keyword=&status=Lunas&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
  //   ).as("getPenjualanLunas");

  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   // Klik tab "Lunas"
  //   cy.get('.MuiTabs-flexContainer > :nth-child(4)').click();

  //   // Tunggu data API
  //   cy.wait(1000);
  //   cy.wait("@getPenjualanLunas").then(({ response }) => {
  //     expect(response.statusCode).to.eq(200);
  //     const apiData = response.body.results;

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     // Loop semua row
  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       // Validasi tanggal jatuh tempo di UI
  //       expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       // Pastikan status hanya "Lunas"
  //       expect(clean($row.find("td").eq(4))).to.eq("Lunas");

  //       // Validasi data API mendukung status "Lunas"
  //       expect(rowData.sisa_tagihan).to.eq(0);
  //       expect(rowData.status).to.eq("Lunas");
  //     });
  //   });
  // });

  // it.only('TC-0019 Filter Status Penjualan (Functional Tab Dibayar Sebagian)', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };

  //   // Intercept API
  //   cy.intercept(
  //     "GET",
  //     `**/api/penjualan?keyword=&status=Dibayar+Sebagian&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
  //   ).as("getPenjualanDibayarSebagian");

  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   // Klik tab Dibayar Sebagian
  //   cy.get('.MuiTabs-flexContainer > :nth-child(5)').click();

  //   // Tunggu API
  //   cy.wait(1000);
  //   cy.wait("@getPenjualanDibayarSebagian").then(({ response }) => {
  //     expect(response.statusCode).to.eq(200);
  //     const apiData = response.body.results;

  //     // Pastikan jumlah row tabel sama
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();
  //       if (!rowData) return;

  //       // Validasi tanggal jatuh tempo
  //       expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       // Ambil status dari UI dan API
  //       const statusUI = clean($row.find("td").eq(4));
  //       const statusAPI = rowData.status;

  //       // Validasi status hanya "Dibayar Sebagian"
  //       expect(statusAPI).to.eq("Dibayar Sebagian");
  //       expect(statusUI).to.eq("Dibayar Sebagian");

  //       // Validasi sisa tagihan antara 0 dan total
  //       expect(rowData.sisa_tagihan).to.be.greaterThan(0);
  //       expect(rowData.sisa_tagihan).to.be.lessThan(rowData.total);
  //     });
  //   });
  // });

  // it.only('TC-0020 Filter Status Penjualan (Functional Tab Void)', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };


  //   // Intercept API untuk status Void
  //   cy.intercept(
  //     "GET",
  //     `**/api/penjualan?keyword=&status=Void&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
  //   ).as("getPenjualanVoid");

  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   // Klik tab Void (pastikan index sesuai di tab)
  //   cy.get('.MuiTabs-flexContainer > :nth-child(6)').click();

  //   // Tunggu API
  //   cy.wait(1000);
  //   cy.wait("@getPenjualanVoid").then(({ response }) => {
  //     expect(response.statusCode).to.eq(200);
  //     const apiData = response.body.results;

  //     // Pastikan jumlah row tabel sama
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();
  //       if (!rowData) return;

  //       // Validasi tanggal jatuh tempo
  //       expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       // Ambil status dari UI dan API
  //       const statusUI = clean($row.find("td").eq(4));
  //       const statusAPI = rowData.status;

  //       // Validasi status hanya "Void"
  //       expect(statusAPI).to.eq("Void");
  //       expect(statusUI).to.eq("Void");
  //     });
  //   });
  // });

  // it.only('TC-0021 Mencari Data Berdasarkan Nama', () => {

  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   cy.get('[placeholder="Cari"]').type('rayhan').wait(3000)
  //   cy.get('tr').should('contain', 'Rayhan')

  //   cy.get('[placeholder="Cari"]').clear().type('rayandra').wait(3000)
  //   cy.get('tr').should('contain', 'Rayandra')
  // });

  // it.only('TC-0022 Mencari Data Berdasarkan Nomor Penjualan', () => {

  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   cy.get('[placeholder="Cari"]').type('INV/0225').wait(3000)
  //   cy.get('tr').should('contain', 'INV/0225')

  //   cy.get('[placeholder="Cari"]').clear().type('V/0225').wait(3000)
  //   cy.get('tr').should('contain', 'INV/0225')
  // });

  // it('TC-0023 Mencari Data Yang Tidak Ada', () => {
  //   // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  //   cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.contains("Apply").click();

  //   cy.get('[placeholder="Cari"]').type('&@#$^@&!TE* V@C!T!R*TVCT#! #!CT&*#T!@*T!@E').wait(3000)
  //   cy.contains('Tidak ada data').should('be.visible')
  // });

  // it('TC-0024 Uji Default Tanggal Awal Dan Tanggal Akhir Filter Penjualan', () => {
  //   function getStartOfCurrentMonth() {
  //     const now = new Date();
  //     const year = now.getFullYear();
  //     const month = String(now.getMonth() + 1).padStart(2, '0');
  //     return `01/${month}/${year}`;
  //   }
  //   // Tanggal akhir bulan ini
  //   function getEndOfCurrentMonth() {
  //     const now = new Date();
  //     const year = now.getFullYear();
  //     const month = now.getMonth(); // bulan saat ini - 0 based
  //     const lastDay = new Date(year, month + 1, 0).getDate(); // 0 = hari terakhir bulan sebelumnya
  //     return `${String(lastDay).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
  //   }
  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).should('have.value', getStartOfCurrentMonth())
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(1).should('have.value', getEndOfCurrentMonth())
  //   cy.get('.MuiButton-outlined').should('have.text', 'Reset all')
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').should('have.text', 'Apply')

  // });

  // it.only('TC-0025 Filter Tanggal Penjualan Dengan Waktu Awal Dan Akhir Yang Sama', () => {

  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("10072025");
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(1).clear().type("10072025");
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').click()

  //   cy.wait(3000)
  //   // Ambil semua data di kolom pertama (field a)
  //   cy.get('tr td:nth-child(1)').each(($td) => {
  //     const text = $td.text().trim();
  //     expect(text).to.contain('10/07/25');
  //   });
  // });

  // it.only('TC-0026 Filter Tanggal Penjualan Dengan Rentang Waktu Tertentu', () => {
  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("10072025");
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(1).clear().type("20072025");
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').click()

  //   cy.wait(3000)

  //   const startDate = new Date(2025, 6, 10);
  //   const endDate = new Date(2025, 6, 20);

  //   cy.get('tr td:nth-child(1)').each(($td) => {
  //     const text = $td.text().trim();
  //     const [day, month, year] = text.split('/');
  //     const cellDate = new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));

  //     // Jika cellDate di luar range → fail langsung
  //     expect(cellDate, `Tanggal ${text} di luar rentang`).to.be.within(startDate, endDate);
  //   });
  // });

  // it('TC-0027 Filter Tanggal Penjualan Dengan Field Kosong', () => {
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };

  //   function getStartOfCurrentMonth() {
  //     const now = new Date();
  //     const year = now.getFullYear();
  //     const month = String(now.getMonth() + 1).padStart(2, '0');
  //     return `01/${month}/${year}`;
  //   }

  //   cy.intercept(
  //     "GET",
  //     `**/api/penjualan?keyword=&status=&**&**&skip=0&limit=10&companyId=${companyId}`
  //   ).as("getPenjualan");
  //   // Optional: spy API kalau ada
  //   cy.wait("@getPenjualan").then(({ response }) => {
  //     expect(response.statusCode).to.eq(200);
  //     const apiData = response.body.results;

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       expect(clean($row.find("td").eq(0)))
  //         .to.eq(formatDate(rowData.tanggal_transaksi));

  //       expect(clean($row.find("td").eq(1)))
  //         .to.eq(rowData.nomor);

  //       expect(clean($row.find("td").eq(2)))
  //         .to.eq(rowData.customer?.nama || "");

  //       expect(clean($row.find("td").eq(3)))
  //         .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       expect(clean($row.find("td").eq(4)))
  //         .to.eq(rowData.status);

  //       expect(clean($row.find("td").eq(5)))
  //         .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

  //       expect(clean($row.find("td").eq(6)))
  //         .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
  //     });

  //     cy.get('.MuiBox-root > .MuiButtonBase-root').click();

  //     // Field pertama terisi tanggal awal bulan
  //     cy.get('[placeholder="DD/MM/YYYY"]').eq(0)
  //       .should('have.value', getStartOfCurrentMonth());

  //     // Field kedua dikosongkan
  //     cy.get('[placeholder="DD/MM/YYYY"]').eq(1).clear();

  //     // Klik tombol Apply / Filter
  //     cy.get('.MuiGrid2-container > .MuiButton-contained').click();

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       expect(clean($row.find("td").eq(0)))
  //         .to.eq(formatDate(rowData.tanggal_transaksi));

  //       expect(clean($row.find("td").eq(1)))
  //         .to.eq(rowData.nomor);

  //       expect(clean($row.find("td").eq(2)))
  //         .to.eq(rowData.customer?.nama || "");

  //       expect(clean($row.find("td").eq(3)))
  //         .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       expect(clean($row.find("td").eq(4)))
  //         .to.eq(rowData.status);

  //       expect(clean($row.find("td").eq(5)))
  //         .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

  //       expect(clean($row.find("td").eq(6)))
  //         .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
  //     });
  //   });

  // });

  // it.only('TC-0028 Reset Pagination Ke Halaman 1 Saat Filter Tanggal', () => {

  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').click()

  //   cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
  //   cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('be.enabled')

  //   cy.get('[placeholder="Cari"]').type('INV/0200')
  //   cy.contains('Tidak ada data').should('not.exist')
  //   cy.contains('INV/0200').should('exist')

  //   cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.disabled')
  //   cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('be.enabled')
  //   cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.disabled')

  //   cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', 'Menampilkan 1 - 1 dari 1 data')
  // });

  // it.only('TC-0029 Pengujian Pagination Arrow', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };

  //   cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=2025-08-31&skip=0&limit=10**').as('getData')
  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').click()

  //   cy.wait('@getData').then(({ response }) => {

  //     const totalData = response.body.totalData;
  //     const apiData = response.body.results;
  //     const pageAkhir = Math.ceil(totalData / 10);
  //     cy.wait(1000);
  //     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.disabled')
  //     cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
  //     cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('have.text', '2')
  //     cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '3')
  //     cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '4')
  //     cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5')
  //     cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
  //     cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
  //     cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')



  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       expect(clean($row.find("td").eq(0)))
  //         .to.eq(formatDate(rowData.tanggal_transaksi));

  //       expect(clean($row.find("td").eq(1)))
  //         .to.eq(rowData.nomor);

  //       expect(clean($row.find("td").eq(2)))
  //         .to.eq(rowData.customer?.nama || "");

  //       expect(clean($row.find("td").eq(3)))
  //         .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       expect(clean($row.find("td").eq(4)))
  //         .to.eq(rowData.status);

  //       expect(clean($row.find("td").eq(5)))
  //         .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

  //       expect(clean($row.find("td").eq(6)))
  //         .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
  //     });
  //     cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 1 - 10 dari ${totalData} data`)
  //   })

  //   cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=2025-08-31&skip=20&limit=10**').as('getDataPage3')
  //   cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').click()
  //   cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').click()
  //   cy.wait('@getDataPage3').then(({ response }) => {

  //     const totalData = response.body.totalData;
  //     const apiData = response.body.results;
  //     const pageAkhir = Math.ceil(totalData / 10);
  //     cy.wait(1000);
  //     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.enabled')
  //     cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
  //     cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('have.text', '2')
  //     cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '3')
  //     cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '4')
  //     cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5')
  //     cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
  //     cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
  //     cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       expect(clean($row.find("td").eq(0)))
  //         .to.eq(formatDate(rowData.tanggal_transaksi));

  //       expect(clean($row.find("td").eq(1)))
  //         .to.eq(rowData.nomor);

  //       expect(clean($row.find("td").eq(2)))
  //         .to.eq(rowData.customer?.nama || "");

  //       expect(clean($row.find("td").eq(3)))
  //         .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       expect(clean($row.find("td").eq(4)))
  //         .to.eq(rowData.status);

  //       expect(clean($row.find("td").eq(5)))
  //         .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

  //       expect(clean($row.find("td").eq(6)))
  //         .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
  //     });
  //     cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 21 - 30 dari ${totalData} data`)
  //   })

  //   cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=2025-08-31&skip=0&limit=10**').as('getDataPageFirst')
  //   cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
  //   cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
  //   cy.wait('@getDataPageFirst').then(({ response }) => {

  //     const totalData = response.body.totalData;
  //     const apiData = response.body.results;
  //     const pageAkhir = Math.ceil(totalData / 10);
  //     cy.wait(1000);
  //     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.disabled')
  //     cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
  //     cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('have.text', '2')
  //     cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '3')
  //     cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '4')
  //     cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5')
  //     cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
  //     cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
  //     cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       expect(clean($row.find("td").eq(0)))
  //         .to.eq(formatDate(rowData.tanggal_transaksi));

  //       expect(clean($row.find("td").eq(1)))
  //         .to.eq(rowData.nomor);

  //       expect(clean($row.find("td").eq(2)))
  //         .to.eq(rowData.customer?.nama || "");

  //       expect(clean($row.find("td").eq(3)))
  //         .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       expect(clean($row.find("td").eq(4)))
  //         .to.eq(rowData.status);

  //       expect(clean($row.find("td").eq(5)))
  //         .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

  //       expect(clean($row.find("td").eq(6)))
  //         .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
  //     });
  //     cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 1 - 10 dari ${totalData} data`)
  //   })
  // })

  // it.only('TC-0030 Pengujian Pagination Dengan Memilih Angka Tengah', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };

  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').click()

  //   cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=2025-08-31&skip=40&limit=10**').as('getDataPage5')
  //   cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '5').click()

  //   cy.wait('@getDataPage5').then(({ response }) => {
  //     const totalData = response.body.totalData;
  //     const apiData = response.body.results;
  //     const pageAkhir = Math.ceil(totalData / 10);
  //     cy.wait(1000);
  //     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.enabled')
  //     cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
  //     cy.get(':nth-child(3) > .MuiPaginationItem-root').should('have.text', '…')
  //     cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', '4')
  //     cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', '5')
  //     cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', '6')
  //     cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', '…')
  //     cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
  //     cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.enabled')

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);

  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       expect(clean($row.find("td").eq(0)))
  //         .to.eq(formatDate(rowData.tanggal_transaksi));

  //       expect(clean($row.find("td").eq(1)))
  //         .to.eq(rowData.nomor);

  //       expect(clean($row.find("td").eq(2)))
  //         .to.eq(rowData.customer?.nama || "");

  //       expect(clean($row.find("td").eq(3)))
  //         .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       expect(clean($row.find("td").eq(4)))
  //         .to.eq(rowData.status);

  //       expect(clean($row.find("td").eq(5)))
  //         .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

  //       expect(clean($row.find("td").eq(6)))
  //         .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
  //     });
  //     cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan 41 - 50 dari ${totalData} data`)
  //   });
  // });

  // it.only('TC-0031 Pagination Memilih Angka Akhir', () => {
  //   // Helper format tanggal
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return "";
  //     const dateObj = new Date(dateStr);
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  //     return `${day}/${month}/${year}`;
  //   };

  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').click()
  //   cy.wait(2000)
  //   cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=**').as('getDataLastPage')
  //   cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').click()

  //   cy.wait('@getDataLastPage').then(({ response }) => {
  //     const totalData = response.body.totalData;
  //     const apiData = response.body.results;
  //     const pageAkhir = Math.ceil(totalData / 10);
  //     cy.log(pageAkhir)
  //     const pageAkhirBefore1 = pageAkhir - 1;
  //     const pageAkhirBefore2 = pageAkhir - 2;
  //     const pageAkhirBefore3 = pageAkhir - 3;
  //     const pageAkhirBefore4 = pageAkhir - 4;

  //     const dataAwalPage = (pageAkhir - 1) * 10 + 1;
  //     cy.wait(1000);
  //     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.enabled')
  //     cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.text', '1')
  //     cy.get(':nth-child(3) > .MuiPaginationItem-root').should('have.text', '…')
  //     cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.text', pageAkhirBefore4)
  //     cy.get('.MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root').should('have.text', pageAkhirBefore3)
  //     cy.get('.MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root').should('have.text', pageAkhirBefore2)
  //     cy.get(':nth-child(7) > .MuiPaginationItem-root').should('have.text', pageAkhirBefore1)
  //     cy.get('.MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root').contains(pageAkhir)
  //     cy.get('.MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root').should('be.disabled')

  //     // Pastikan jumlah row tabel sama dengan data API
  //     cy.get("table tbody tr").should("have.length", apiData.length);
  //     console.log(apiData)
  //     cy.get("table tbody tr").each(($row, index) => {
  //       const rowData = apiData[index];
  //       if (!rowData) return;

  //       const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

  //       expect(clean($row.find("td").eq(0)))
  //         .to.eq(formatDate(rowData.tanggal_transaksi));

  //       expect(clean($row.find("td").eq(1)))
  //         .to.eq(rowData.nomor);

  //       expect(clean($row.find("td").eq(2)))
  //         .to.eq(rowData.customer?.nama || "");

  //       expect(clean($row.find("td").eq(3)))
  //         .to.eq(formatDate(rowData.tanggal_jatuh_tempo));

  //       expect(clean($row.find("td").eq(4)))
  //         .to.eq(rowData.status);

  //       expect(clean($row.find("td").eq(5)))
  //         .to.eq(`Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

  //       expect(clean($row.find("td").eq(6)))
  //         .to.eq(`Rp ${rowData.total.toLocaleString("id-ID")}`);
  //     });
  //     cy.get('.MuiPaper-elevation > .MuiStack-root > .MuiTypography-root').should('have.text', `Menampilkan ${dataAwalPage} - ${totalData} dari ${totalData} data`)
  //   });
  // });

  // it('TC-0032 Melihat Detail Kontak Pelanggan', () => {
  //   cy.intercept('GET', '**/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=**').as('getDataLastPage')

  //   cy.get('.MuiBox-root > .MuiButtonBase-root').click()
  //   cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  //   cy.get('.MuiGrid2-container > .MuiButton-contained').click()
  //   cy.wait('@getDataLastPage').then(({ response }) => {
  //     const idPelanggan = response.body.results[0].pelanggan_id;

  //   cy.intercept('GET', '**/api/kontak/getDetail/**').as('getNama')

  //   cy.get(':nth-child(1) > :nth-child(3) > [aria-label="Detail Pelanggan"] > a > .MuiButtonBase-root').click()



  //     cy.getCookie('token').then((cookie) => {
  //       const token = cookie?.value;

  //       cy.wait('@getNama').then(({ response }) => {
  //         const nama = response.body.results[0].nama;
  //         cy.log(`Nama pelanggan: ${nama}`);
  //         expect(nama).to.exist
  //         cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should('have.text', nama)
  //       })
  //     })
  //   })
  // })

})



