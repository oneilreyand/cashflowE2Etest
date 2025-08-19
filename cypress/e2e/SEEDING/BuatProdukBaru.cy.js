const companyId = "65800b00-79e4-11f0-af51-11d9de5623a9"; // isi ID valid
describe("Seeding tambah produk", () => {
  beforeEach(() => {
    cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678")
    cy.visitDashboard(companyId)

  })
  it('Metode Valuasi', () => {
    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;
      const companyId = "32a889c2-79ab-11f0-af51-11d9de5623a9"; // isi ID valid
      const preference = "average"; // atau "fifo"

      if (preference === "average") {
        cy.request({
          method: 'POST',
          url: 'https://api-uat-cashbook.assist.id/api/setting-preferensis',
          headers: { Authorization: `Bearer ${token}` },
          body: {
            preference_name: 'metode-valuasi',
            preference_value: 'AVERAGE',
            company_id: companyId
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(JSON.stringify(response.body));
        });
      }
      else if (preference === "fifo") {
        cy.request({
          method: 'POST',
          url: 'https://api-uat-cashbook.assist.id/api/setting-preferensis',
          headers: { Authorization: `Bearer ${token}` },
          body: {
            preference_name: 'metode-valuasi',
            preference_value: 'FIFO',
            company_id: companyId
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(JSON.stringify(response.body));
        });
      }
      else {
        console.error("Preference tidak valid! Harus 'average' atau 'fifo'.");
      }
    });
  })

  it('Tambah Kategori', () => {
    const words = [
      "Merah", "Biru", "Hijau", "Kuning", "Hitam", "Putih", "Coklat", "Abu", "Ungu", "Pink",
      "Besar", "Kecil", "Cepat", "Lambat", "Tinggi", "Pendek", "Tipis", "Tebal", "Panas", "Dingin",
      "Manis", "Asin", "Asam", "Pahit", "Segar", "Lembut", "Keras", "Kering", "Basah", "Licin",
      "Indah", "Cantik", "Ganteng", "Aneh", "Lucu", "Serius", "Tenang", "Ribut", "Sibuk", "Santai",
      "Baru", "Lama", "Mahal", "Murah", "Langka", "Umum", "Kuat", "Lemah", "Ramah", "Galak"
    ];

    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }

    function generateCategoryName() {
      return `${getRandomWord()} ${getRandomWord()} ${getRandomWord()}`;
    }

    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;

      // Contoh membuat 10 kategori
      for (let i = 0; i < 100; i++) {
        const categoryName = generateCategoryName();

        cy.request({
          method: 'POST',
          url: 'https://api-uat-cashbook.assist.id/api/categoryProduct/add',
          headers: { Authorization: `Bearer ${token}` },
          body: {
            category_name: categoryName,
            company_id: companyId
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(`Kategori dibuat: ${categoryName}`);
        });
      }
    });
  });

  it.only('Tambah Satuan', () => {
    const words = [
      "Kilogram", "Gram", "Miligram", "Ton", "Kwintal",
      "Meter", "Centimeter", "Milimeter", "Kilometer", "Inci",
      "Liter", "Mililiter", "Kiloliter", "Galon", "Botol",
      "Bungkus", "Kotak", "Dus", "Pak", "Kardus",
      "Sachet", "Kapsul", "Tablet", "Butir", "Bijian",
      "Unit", "Set", "Pasang", "Paket", "Box",
      "Batang", "Ikat", "Tandan", "Tumpuk", "Gulung",
      "Lembar", "Helai", "Potong", "Pcs", "Buah",
      "Ekor", "Orang", "Pasang", "Keping", "Koin",
      "Ons", "Cup", "Sendok", "Cangkir", "Mangkok"
    ];


    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }

    function generateCategoryName() {
      return `${getRandomWord()} ${getRandomWord()} ${getRandomWord()}`;
    }

    cy.getCookie('token').then((cookie) => {
      const token = cookie?.value;

      // Contoh membuat 10 kategori
      for (let i = 0; i < 100; i++) {
        const categoryName = generateCategoryName();

        cy.request({
          method: 'POST',
          url: 'https://api-uat-cashbook.assist.id/api/setting-satuan',
          headers: { Authorization: `Bearer ${token}` },
          body: {

            unitType: generateCategoryName,
            unitDesc: generateCategoryName,
            company_id: companyId

          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(`Kategori dibuat: ${categoryName}`);
        });
      }
    });
  });

  it('', () => {

  });

  it.only("Kirim request penjualan berulang kali", () => {
    const requestBody = {
      company_id: "65800b00-79e4-11f0-af51-11d9de5623a9",
      nomor: "",
      pelanggan_id: "7b0f9ad0-79e4-11f0-af51-11d9de5623a9",
      tanggal_transaksi: new Date().toISOString(),
      tanggal_jatuh_tempo: "4763-07-13T01:13:16.536Z",
      alamat_penagihan: "Alamat Penagihan",
      deskripsi: "",
      sub_total: 110000,
      discount_type: "percentage",
      discount: 0,
      tax: false,
      tax_value: 12100,
      biaya_kirim: 0,
      total: 122100,
      sisa_tagihan: 122100,
      items: [
        {
          product_id: "dd9aa400-7a35-11f0-9103-2ddaee6d6ff7",
          gudang_id: "659826e0-79e4-11f0-af51-11d9de5623a9",
          deskripsi: "",
          quantity: 1,
          unit_id: "658f7450-79e4-11f0-af51-11d9de5623a9",
          price: 110000,
          discount: 0,
          tax_id: "d24afaf0-7a35-11f0-af51-11d9de5623a9",
          tax_value: 11,
          total: 110000
        }
      ],
      attachments: [],
      total_item_price: 110000,
      total_discount: 0
    };

    // Ambil token dari cookie
    cy.getCookie("token").then((cookie) => {
      const token = cookie?.value;

      // Lakukan loop request (misal 5 kali)
      Cypress._.times(90, (i) => {
        cy.request({
          method: "POST",
          url: "https://api-uat-cashbook.assist.id/api/penjualan",
          headers: { Authorization: `Bearer ${token}` },
          body: requestBody
        }).then((response) => {
          cy.log(`Request ke-${i + 1} status: ${response.status}`);
          expect(response.status).to.eq(200);
        });
      });
    });
  });

})