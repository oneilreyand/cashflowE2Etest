const companyId = Cypress.env('companyId');

describe("PENJUALAN", () => {
  beforeEach(() => {
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
    cy.visitDashboard(companyId);
    cy.navigateToPenjualan();
  });

    it.only('Validasi Penulisan Komponen UI Statis Halaman Penjualan', () => {
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

  it("Validasi Isi Tabel Penjualan Berdasarkan Data API Asli", () => {
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

it('Skeleton Loading Saat Fetch Data', () => {
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

it('Tampilkan "Tidak Ada Data" Saat Data Kosong', () => {
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

it('Pengujian Breadcrumbs Pada Halaman Penjualan', () => {
  cy.get('.MuiTypography-h5 > span').should('have.text','Penjualan')
  cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan')

  cy.get('.MuiBreadcrumbs-ol > :nth-child(1)').click()

  cy.get('.MuiTypography-h5').should('have.text','Beranda')
  cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Dashboard')
});

it('Breadcrumbs Halaman Penjualan Baru', () => {
  cy.contains('Penjualan Baru').click()
  cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan/Penjualan Baru')
  cy.get(':nth-child(3) > .MuiTypography-root > span').click()

  cy.get('.MuiTypography-h5 > span').should('have.text','Penjualan')
  cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan')
  cy.get(':nth-child(3) > .MuiTypography-root > span').click()

  cy.contains('Penjualan Baru').click()
  cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Beranda/Penjualan/Penjualan Baru')
  cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()

  cy.get('.MuiTypography-h5').should('have.text', 'Beranda');
  cy.get('.MuiBreadcrumbs-ol').should('have.text', 'Dashboard')
});

it('Breadcrumbs Halaman Detail Pembayaran', () => {
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

it('Memastikan Perubahan Summary Card Belum Dibayar', () => {
  let apiAwalBelum; // simpan nilai awal API

  // Pasang intercept
  cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
  cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
  cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

  // === CEK NILAI AWAL ===
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
    cy.get(`[data-value="${pelanggan.id}"]`).click();
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

      // Intercept untuk data setelah simpan
      cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard2');

      // Submit form
      cy.get('.MuiButton-contained').click();
      cy.get('[data-testid="alert-dialog-submit-button"]').click();

      // Tunggu data summary card terbaru
      cy.wait('@waitDataCard2').then(({ response }) => {
        const apiAkhirBelum = Math.round(response.body.belumDibayar.nominal);
        const formattedAkhir = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiAkhirBelum)}`;

        // Cek nilai UI sama persis dengan API
        cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
          .should('have.text', formattedAkhir);

        // Cek logika perubahan
        expect(apiAkhirBelum).to.eq(apiAwalBelum + totalDibayar);
      });
    });
});

it('Memastikan Perubahan Summary Card Telat Dibayar', () => {
  let apiTelatSebelum; // simpan di scope luar

  // Pasang intercept
  cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
  cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
  cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

  // === CEK NILAI AWAL ===
  cy.wait('@waitDataCard').then(({ response }) => {
    apiTelatSebelum = Math.round(response.body.telatBayar.nominal);
    const formattedTelatSebelum = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiTelatSebelum)}`;
    cy.contains(':nth-child(2) .MuiTypography-h5', 'Rp')
      .should('have.text', formattedTelatSebelum);
  });

  // === TAMBAH PENJUALAN BARU ===
  cy.contains('Penjualan Baru').click();

  // Pilih pelanggan
  cy.wait('@waitPelanggan').then(({ response }) => {
    const pelanggan = response.body.results[0];
    cy.get('#idPelanggan').click();
    cy.get(`[data-value="${pelanggan.id}"]`).click();
  });

  // Isi alamat dan tanggal
  cy.get('#address').clear().type('Jalan Palaraya');
  cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");

  // Pilih produk
  cy.wait('@productsData').then(({ response }) => {
    const produk = response.body.results.find(p => p.is_sell);
    cy.get('[id="penjualan.0.product_id"]').click();
    cy.get(`[data-value="${produk.id}"]`).click();
  });

  // Isi harga produk
  cy.get('[name="penjualan.0.price"]').clear().type('10000');

  // Ambil total dibayar
  cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2)')
    .invoke('text')
    .then((totalText) => {
      const totalDibayar = Number(totalText.replace(/[^0-9]/g, ''));

      // Siapkan intercept untuk update summary card setelah simpan
      cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard2');

      // Submit form
      cy.get('.MuiButton-contained').click();
      cy.get('[data-testid="alert-dialog-submit-button"]').click();

      // Tunggu data summary card terbaru
      cy.wait('@waitDataCard2').then(({ response }) => {
        const apiTelatSesudah = Math.round(response.body.telatBayar.nominal);
        const formattedTelatSesudah = `Rp\u00A0${new Intl.NumberFormat('id-ID').format(apiTelatSesudah)}`;

        // Cek nilai UI sama persis dengan API (format Rp)
        cy.contains(':nth-child(2) .MuiTypography-h5', 'Rp')
          .should('have.text', formattedTelatSesudah);

        // Cek logika perubahan sesuai penambahan total dibayar
        expect(apiTelatSesudah).to.eq(apiTelatSebelum + totalDibayar);
      });
    });
});

it('Memastikan Perubahan Summary Card Pelunasan', () => {
  // Pasang intercept awal
  cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCard');
  cy.intercept('GET', `**/api/productList/productWithStock?companyId=${companyId}`).as('productsData');
  cy.intercept('GET', `**/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${companyId}`).as('waitPelanggan');

  let apiPelunasan;

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
  cy.get('.MuiButton-contained').click();
  cy.get('[data-testid="alert-dialog-submit-button"]').click();

  // Ambil data awal pelunasan
  cy.intercept('GET', `**/api/penjualan/overview?companyId=${companyId}`).as('waitDataCardAfterAdd');
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
  cy.get('[data-value="payment"]').click();

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
});
  
it('Filter Status Penjualan (Functional Tab Semua)', () => {
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
    `**/api/penjualan?keyword=&status=&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
  ).as("getPenjualanSemua");

  // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  cy.contains("Apply").click();

  // Tunggu request API asli
  cy.wait(1000);
  cy.wait("@getPenjualanSemua").then(({ response }) => {
    expect(response.statusCode).to.eq(200);

    const apiData = response.body.results;

    // Pastikan jumlah row tabel sama dengan data API
    cy.get("table tbody tr").should("have.length", apiData.length);

    // Cek setiap row
    cy.get("table tbody tr").each(($row, index) => {
      const rowData = apiData[index];
      if (!rowData) return;

      const clean = (el) => Cypress.$(el).text().replace(/\s+/g, " ").trim();

      // Validasi tampilan tanggal jatuh tempo
      expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

      // Tentukan status yang seharusnya
      const today = new Date();
      const dueDate = new Date(rowData.tanggal_jatuh_tempo);
      let expectedStatus;

      if (rowData.sisa_tagihan === 0 || rowData.status === "Lunas") {
        expectedStatus = "Lunas";
      } 
      else if (
        rowData.sisa_tagihan > 0 &&
        rowData.sisa_tagihan < rowData.total_tagihan
      ) {
        expectedStatus = "Dibayar Sebagian";
      } 
      else if (dueDate <= today) {
        expectedStatus = "Jatuh Tempo";
      } 
      else {
        expectedStatus = rowData.status;
      }

      // Validasi status di UI sesuai logika
      expect(clean($row.find("td").eq(4))).to.eq(expectedStatus);
    });
  });
});


it('Filter Status Penjualan (Functional Tab Belum Dibayar)', () => {
  // Helper format tanggal
  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  return `${day}/${month}/${year}`;
};

  // Spy API penjualan dengan filter "Belum Dibayar"
  cy.intercept(
    "GET",
    `**/api/penjualan?keyword=&status=Belum+Dibayar&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
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

      // Validasi tanggal jatuh tempo di UI
      expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

      // Tentukan status seharusnya
      const today = new Date();
      const dueDate = new Date(rowData.tanggal_jatuh_tempo);

      const expectedStatus = dueDate <= today ? "Jatuh Tempo" : "Belum Dibayar";

      // Validasi status di UI
      expect(clean($row.find("td").eq(4))).to.eq(expectedStatus);
    });
})  
});

it('Filter Status Penjualan (Functional Tab Lunas)', () => {
  // Helper format tanggal
  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  return `${day}/${month}/${year}`;
};


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

it('Filter Status Penjualan (Functional Tab Dibayar Sebagian)', () => {
  // Helper format tanggal
  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  return `${day}/${month}/${year}`;
};

  // Intercept API
  cy.intercept(
    "GET",
    `**/api/penjualan?keyword=&status=Dibayar+Sebagian&**-01-01&**&skip=0&limit=10&companyId=${companyId}`
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

      // Validasi tanggal jatuh tempo
      expect(clean($row.find("td").eq(3))).to.eq(formatDate(rowData.tanggal_jatuh_tempo));

      // Ambil status dari UI dan API
      const statusUI = clean($row.find("td").eq(4));
      const statusAPI = rowData.status;

      // Validasi status hanya "Dibayar Sebagian"
      expect(statusAPI).to.eq("Dibayar Sebagian");
      expect(statusUI).to.eq("Dibayar Sebagian");

      // Validasi sisa tagihan antara 0 dan total
      expect(rowData.sisa_tagihan).to.be.greaterThan(0);
      expect(rowData.sisa_tagihan).to.be.lessThan(rowData.total);
    });
  });
});

it('Filter Status Penjualan (Functional Tab Void)', () => {
  // Helper format tanggal
  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
  return `${day}/${month}/${year}`;
};


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

it('Mencari Data Berdasarkan Nama', () => {

  // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  cy.contains("Apply").click();

  cy.get('[placeholder="Cari"]').type('rayhan')
  cy.get(':nth-child(1) > :nth-child(3) > span > a > .MuiButtonBase-root').should('contain', 'rayhan')
});

})
