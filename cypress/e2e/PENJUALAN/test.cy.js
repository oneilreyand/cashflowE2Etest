// const companyId = "ab78f6b2-afdd-11f0-9aae-9bbc0c8b2cba";
const companyId = Cypress.env('companyId');
import * as s from "./PENJUALAN-Selector";
describe("Test", () => {
  beforeEach(() => {
    cy.handleUncaughtExceptions();
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
    cy.visitDashboard(companyId);
    cy.get('[data-testid="drawer-item-sales"]').click(); //ke halaman sales
    cy.get('.qcw-trigger-btn').click()
  });

  it.only('Penjualan', () => {
    // cy.viewport(1180, 650)
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
      .should('contains','- ').and('contains', 'dari ').and('contains', 'data');
  
  });

  it("test wait element", () => {

    cy.window().then(async (win) => {
      const tdText = await new Promise((resolve) => {
        const check = () => {
          const td = win.document.getElementsByTagName("td")[0]; // ambil td pertama
          if (td && td.textContent.trim() !== "") {
            return resolve(td.textContent.trim()); // resolve dengan teks
          }
          requestAnimationFrame(check); // cek lagi di frame berikutnya
        };
        check();
      });

      // sekarang tdText pasti memiliki nilai
      cy.log("Teks dalam td:", tdText);
      cy.wrap(tdText).should("not.be.empty"); // assertion aman

    });

    cy.window().then(async (win) => {
      const tdText = await new Promise((resolve, reject) => {
        const startTime = Date.now();
        const timeout = 5000; // 5 detik maksimum menunggu

        const check = () => {
          const td = win.document.getElementsByTagName("h5")[0];
          console.log(td)

          // cek timeout
          if (Date.now() - startTime > timeout) {
            return reject(new Error("Timeout: td belum berisi teks"));
          }

          // jika td ada dan memiliki teks, resolve
          if (td && td.textContent.trim() !== "") {
            return resolve(td.textContent.trim());
          }

          // cek lagi di frame berikutnya
          requestAnimationFrame(check);
        };

        check(); // start loop
      });

      // sekarang tdText pasti memiliki nilai (jika tidak timeout)
      cy.log("Teks dalam td:", tdText);
      cy.wrap(tdText).should("not.be.empty"); // assertion aman
    });


  });



})
