const companyId = "65800b00-79e4-11f0-af51-11d9de5623a9";
const jumlahKontakPerTipe = 20; // atur jumlah kontak per tipe di sini
const tipeKontakList = ["pelanggan", "suplier", "karyawan", "lainnya"];

function capitalizeEachWord(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

describe("Buat Kontak Baru Berbagai Tipe", () => {
  beforeEach(() => {
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
  });

  tipeKontakList.forEach(tipe => {
    it(`Buat ${jumlahKontakPerTipe} kontak tipe ${capitalizeEachWord(tipe)}`, () => {
      cy.getCookie('token').then((cookie) => {
        const token = cookie.value;
        expect(token).to.exist;

        // Pastikan grup kontak ada
        cy.request({
          method: 'GET',
          url: 'https://api-uat-cashbook.assist.id/api/grupkontak/list',
          qs: { companyId },
          headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
          expect(res.status).to.eq(200);

          let grupId;
          const grupList = res.body;
          const grupExist = grupList.find(g => g.grup_name.toLowerCase() === `grup${tipe}`);

          if (!grupExist) {
            cy.log(`Grup${capitalizeEachWord(tipe)} tidak ditemukan, membuat grup baru...`);
            cy.request({
              method: 'POST',
              url: 'https://api-uat-cashbook.assist.id/api/grupkontak/add',
              headers: { Authorization: `Bearer ${token}` },
              body: { grup_name: `Grup${capitalizeEachWord(tipe)}`, company_id: companyId }
            }).then((postRes) => {
              expect(postRes.status).to.eq(200);
              grupId = postRes.body.id;
              cy.log(`Grup${capitalizeEachWord(tipe)} berhasil dibuat`);
            });
          } else {
            grupId = grupExist.id;
            cy.log(`Grup${capitalizeEachWord(tipe)} sudah ada`);
          }

          // Buat beberapa kontak
          for (let i = 1; i <= jumlahKontakPerTipe; i++) {
            const namaKontak = `${capitalizeEachWord(tipe)} ${Date.now()}-${i}`;
            cy.request({
              method: 'POST',
              url: 'https://api-uat-cashbook.assist.id/api/kontak/add',
              headers: { Authorization: `Bearer ${token}` },
              body: {
                active_piutang_max: 0,
                alamat_penagihan: "Alamat Penagihan",
                alamat_pengiriman: "",
                company_id: companyId,
                email: [`${tipe}${i}@example.com`],
                fk_grup: [grupId],
                data_bank: [
                  { bank_branch: "", bank_name: "", holder_name: "", rek_no: "" }
                ],
                nama: namaKontak,
                nama_perusahaan: "",
                no_identitas: "",
                no_fax: "",
                no_hp: "",
                no_npwp: "",
                no_telp: "",
                nitku: "",
                piutang_max: 0,
                fk_akun_hutang: "",
                fk_akun_piutang: "",
                sapaan: "",
                syarat_pembayaran: "",
                tipe_identitas: "",
                tipe_kontak: tipe,
                active_hutang_max: 0,
                hutang_max: 0
              }
            }).then((postRes) => {
              expect(postRes.status).to.eq(200);
              cy.log(`Kontak ${namaKontak} berhasil dibuat`);
            });
          }
        });
      });
    });
  });
});
