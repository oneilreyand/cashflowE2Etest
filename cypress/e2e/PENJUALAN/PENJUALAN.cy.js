import { PT_ARSYA } from "../../data";

describe("PENJUALAN", () => {
  beforeEach(() => {
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
    cy.visitDashboard(PT_ARSYA);
    cy.navigateToPenjualan();
  });

  it("Validasi Komponen Statis UI Halaman Penjualan", () => {
    // Judul & Breadcrumb
    cy.get(".css-fyc6bt > .MuiTypography-h5").should("have.text", "Penjualan");
    cy.get(".MuiBreadcrumbs-ol").should("have.text", "Beranda/Penjualan");

    // Kartu Ringkasan
    cy.get(":nth-child(1) .MuiBadge-root > .MuiTypography-root").should("have.text", "Belum Dibayar");
    cy.get(":nth-child(1) .MuiTypography-body2").should("have.text", "Total Penjualan");
    cy.get(":nth-child(2) .MuiBadge-root > .MuiTypography-root").should("have.text", "Telat Dibayar");
    cy.get(":nth-child(2) .MuiTypography-body2").should("have.text", "Total Penjualan");
    cy.get(":nth-child(3) .MuiBadge-root").should("have.text", "Pelunasan Diterima (30 Hari Terakhir)");
    cy.get(":nth-child(3) .MuiTypography-body2").should("have.text", "Total Penjualan");

    // Tab Navigasi
    const tabs = ["Semua", "Belum Dibayar", "Jatuh Tempo", "Lunas", "Dibayar Sebagian", "Void"];
    tabs.forEach((text, i) => {
      cy.get(`.MuiTabs-flexContainer > :nth-child(${i + 1})`).should("have.text", text);
    });

    // Filter & Pencarian
    cy.get(".MuiBox-root > .MuiButtonBase-root").should("have.text", "Filter Tanggal");
    cy.get('input[placeholder="Cari"]').should("be.visible");

    // Header Tabel
    const headers = ["Tanggal", "Nomor", "Nama Pelanggan", "Tgl Jatuh Tempo", "Status", "Sisa Tagihan", "Total Tagihan"];
    headers.forEach((text, i) => {
      cy.get(`.MuiTableRow-root > :nth-child(${i + 1})`).should("have.text", text);
    });
  });

  it.only("Validasi Isi Tabel Penjualan Berdasarkan Data API Asli", () => {
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
    `https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=&startDate=0001-01-01&endDate=2025-08-31&skip=0&limit=10&companyId=c9b9b760-306f-11f0-ac00-4581423404ed`
  ).as("getPenjualan");

  // Filter tanggal awal jadi 01/01/0001 supaya semua data keluar
  cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  cy.get('[placeholder="DD/MM/YYYY"]').eq(0).clear().type("01010001");
  cy.contains("Apply").click();

  // Tunggu request API asli
  cy.wait("@getPenjualan").then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    const apiData = response.body.response;
    console.log(apiData)
    // Pastikan jumlah row tabel sama dengan data API
    cy.get("table tbody tr").should("have.length", apiData.body.results.length);

    cy.get("table tbody tr").each(($row, index) => {
      const rowData = apiData[index];
      if (!rowData) return;

      cy.wrap($row).find("td").eq(0)
        .should("contain", formatDate(rowData.tanggal_transaksi));

      cy.wrap($row).find("td").eq(1)
        .should("contain", rowData.nomor);

      cy.wrap($row).find("td").eq(2)
        .should("contain", rowData.customer?.nama || "");

      cy.wrap($row).find("td").eq(3)
        .should("contain", formatDate(rowData.tanggal_jatuh_tempo));

      cy.wrap($row).find("td").eq(4)
        .should("contain", rowData.status);

      cy.wrap($row).find("td").eq(5)
        .should("contain", `Rp ${rowData.sisa_tagihan.toLocaleString("id-ID")}`);

      cy.wrap($row).find("td").eq(6)
        .should("contain", `Rp ${rowData.total.toLocaleString("id-ID")}`);
    });
  });
});
});
