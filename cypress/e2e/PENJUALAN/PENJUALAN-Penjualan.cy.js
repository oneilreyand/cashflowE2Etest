import { PT_ARSYA, apiDomain } from "../../data";

describe("PENJUALAN", () => {
  beforeEach(() => {
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
    cy.visitDashboard(PT_ARSYA);
    cy.navigateToPenjualan();
  });

    it('Validasi Penulisan Komponen UI Statis Halaman Penjualan', () => {
    cy.get('.css-fyc6bt > .MuiTypography-h5').should('have.text', 'Penjualan');
    cy.get('.MuiBreadcrumbs-ol').should('have.text', "Beranda/Penjualan");

    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiTypography-root')
      .should('have.text', "Belum Dibayar");
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2')
      .should('have.text', 'Total Penjualan');

    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiTypography-root')
      .should('have.text', 'Telat Dibayar');
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2')
      .should('have.text', 'Total Penjualan');

    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root')
      .should('have.text', 'Pelunasan Diterima (30 Hari Terakhir)');
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2')
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
    const dateOnly = dateStr.split("T")[0];
    const [year, month, day] = dateOnly.split("-");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year.slice(2)}`;
  };

  // Spy API penjualan tanpa memanipulasi
  cy.intercept(
    "GET",
    `${apiDomain}/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=2025-08-31&skip=0&limit=10&companyId=${PT_ARSYA}`
  ).as("getPenjualan");

  // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  cy.contains("Apply").click();

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
  cy.intercept('GET', `${apiDomain}/api/penjualan?**companyId=${PT_ARSYA}`,
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

it.only('Memastikan Perubahan Summary Card', () => {
  // Pasang intercept sekali
  cy.intercept('GET', `${apiDomain}/api/penjualan/overview?companyId=${PT_ARSYA}`).as('waitDataCard');
  cy.intercept('GET', `${apiDomain}/api/productList/productWithStock?companyId=${PT_ARSYA}`).as('productsData');
  cy.intercept('GET', `${apiDomain}/api/kontak/list?jenisKontak=pelanggan&limit=999&companyId=${PT_ARSYA}`).as('waitPelanggan');

  // ===== BELUM DIBAYAR =====
  cy.wait('@waitDataCard').then(({ response }) => {
    const apiAwalBelum = Math.round(response.body.belumDibayar.nominal);

    cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
      .invoke('text')
      .then((text) => {
        const uiAwalBelum = parseInt(text.replace(/[^\d]/g, ''), 10);
        cy.log(`💰 API: ${apiAwalBelum}`);
        cy.log(`💻 UI : ${uiAwalBelum}`);
        expect(uiAwalBelum).to.eq(apiAwalBelum);
      });

    // Proses tambah penjualan normal
    cy.contains('Penjualan Baru').click();

    cy.wait('@waitPelanggan').then(({ response }) => {
      const pelanggan = response.body.results[0];
      cy.get('#idPelanggan').click();
      cy.get(`[data-value="${pelanggan.id}"]`).click();
    });

    cy.get('#address').clear().type('Jalan Palaraya');

    cy.wait('@productsData').then(({ response }) => {
      const produk = response.body.results.find(p => p.is_sell);
      cy.get('[id="penjualan.0.product_id"]').click();
      cy.get(`[data-value="${produk.id}"]`).click();
    });

    cy.get('[name="penjualan.0.price"]').clear().type('10000');

    cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2)')
      .invoke('text')
      .then((totalText) => {
        const totalDibayar = parseInt(totalText.replace(/[^\d]/g, ''), 10);

        cy.intercept('GET', `${apiDomain}/api/penjualan/overview?companyId=${PT_ARSYA}`).as('waitDataCard2');
        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.wait('@waitDataCard2').then(() => {
          cy.contains(':nth-child(1) .MuiTypography-h5', 'Rp')
            .invoke('text')
            .then((akhirText) => {
              const akhirBelum = parseInt(akhirText.replace(/[^\d]/g, ''), 10);
              expect(akhirBelum).to.eq(apiAwalBelum + totalDibayar);
            });
        });
      });
  });

  // ===== TELAT DIBAYAR =====
  // Trigger reload data lagi dengan klik "Tambah Penjualan"
  cy.contains('Penjualan Baru').click();

  cy.wait('@waitPelanggan').then(({ response }) => {
    const pelanggan = response.body.results[0];
    cy.get('#idPelanggan').click();
    cy.get(`[data-value="${pelanggan.id}"]`).click();
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
      const totalDibayar = parseInt(totalText.replace(/[^\d]/g, ''), 10);

      // Ambil nilai awal Telat sebelum submit
      cy.wait('@waitDataCard').then(({ response }) => {
        const apiAwalTelat = Math.round(response.body.telatBayar.nominal);

        cy.get('.MuiButton-contained').click();
        cy.get('[data-testid="alert-dialog-submit-button"]').click();

        cy.wait('@waitDataCard').then(() => {
          cy.contains(':nth-child(2) .MuiTypography-h5', 'Rp')
            .invoke('text')
            .then((akhirText) => {
              const akhirTelat = parseInt(akhirText.replace(/[^\d]/g, ''), 10);
              expect(akhirTelat).to.eq(apiAwalTelat + totalDibayar);
            });
        });
      });

      // tambahkan kondisi dimana bayar lunas dan data tersebut terlihat di pembayaran 30hari terakhir
    });
});

})  


