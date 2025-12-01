const companyId = "ab78f6b2-afdd-11f0-9aae-9bbc0c8b2cba";

describe("AUTO SEEDING PENJUALAN", () => {
  beforeEach(() => {
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
    cy.visitDashboard(companyId);
  });

  it.only("Auto Tambah Penjualan (Loop Request)", () => {
    const requestBody = {
      company_id: companyId,
      nomor: "",
      pelanggan_id: "55084ec2-b3ac-11f0-8183-b3e17c70cd6d",
      tanggal_transaksi: new Date().toISOString(),
      tanggal_jatuh_tempo: new Date().toISOString(),
      alamat_penagihan: "Jln Pajajaran",
      deskripsi: "",
      sub_total: 50,
      discount_type: "percentage",
      discount: 0,
      tax: false,
      tax_value: 0,
      biaya_kirim: 0,
      total: 50,
      sisa_tagihan: 50,
      items: [
        {
          product_id: "6754b7c0-b85d-11f0-a8e1-8b79420c9be3",
          gudang_id: "acc10710-afdd-11f0-9aae-9bbc0c8b2cba",
          deskripsi: "",
          quantity: 1,
          unit_id: "acbdf9d0-afdd-11f0-9aae-9bbc0c8b2cba",
          price: 50,
          price_include_tax: 50,  // << HARUS NUMBER
          discount: 0,
          tax_id: "",
          tax_value: 0,
          total: 50
        }
      ],
      attachments: [],
      total_item_price: 50,
      total_discount: 0
    };

    const loopCount = 1000; // ubah sesuai kebutuhan

    cy.getCookie("token").then((cookie) => {
      const token = cookie?.value;

      Cypress._.times(loopCount, (i) => {
        const finalBody = {
          ...requestBody,
          tanggal_transaksi: new Date().toISOString(),
          tanggal_jatuh_tempo: new Date().toISOString(),
          nomor: "" // biarkan API meng-generate nomor otomatis
        };

        cy.request({
          method: "POST",
          url: "https://api-uat-cashbook.assist.id/api/penjualan",
          headers: { Authorization: `Bearer ${token}` },
          body: finalBody
        }).then((response) => {
          cy.log(`Request ke-${i + 1} | Status: ${response.status}`);
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});
