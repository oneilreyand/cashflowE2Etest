describe('Fitur ini memungkinkan user (admin/staff perusahaan) untuk mengelola data produk, menambahkan data produk, melihat detail produk, dan mengubah produk.		', () => {
    const navigateProduk = () => {
        cy.get('[data-testid="drawer-item-products"] > .MuiListItemText-root > .MuiTypography-root').click();
    };
  
    beforeEach(() => {
      cy.apiLogin('erni.yulianti@assist.id', '12345678'); 
      cy.visitDashboard(Cypress.env('companyId')); 
      navigateProduk(); 
      });
    it('Tampilan Laman daftar produk sesuai dengan desain', () => {
    cy.get('[data-testid="drawer-item-products"]')
      .should('be.visible')
      .and('contain.text', 'Produk');

    // Header judul halaman
    cy.get('.MuiTypography-root')
      .contains('Produk')
      .should('be.visible');

    // Tab navigasi "Barang dan Jasa" dan "Pengelolaan Inventori"
    cy.get('button').contains('Barang dan Jasa').should('be.visible');
    cy.get('button').contains('Pengelolaan Inventori').should('be.visible');

    // Kartu ringkasan stok
    cy.contains('Stok Tersedia').should('be.visible');
    cy.contains('Stok Segera Habis').should('be.visible');
    cy.contains('Stok Habis').should('be.visible');

    // Tombol tambah produk
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible');

    // Tab "Daftar Produk" & "Membutuhkan Persetujuan"
    cy.contains('Daftar Produk').should('be.visible');
    cy.contains('Membutuhkan Persetujuan').should('be.visible');

    // Tabel produk harus muncul
    cy.get('table').should('be.visible');
    // Validasi header tabel langsung by text
    cy.contains('th', 'Kode Produk').should('be.visible');
    cy.contains('th', 'Nama Produk').should('be.visible');
    cy.contains('th', 'Kategori Produk').should('be.visible');
    cy.contains('th', 'Total Stok').should('be.visible');
    cy.contains('th', 'Harga Beli').should('be.visible');
    cy.contains('th', 'Harga Jual').should('be.visible');

    // Pagination
    cy.get('.MuiPaper-root > .MuiStack-root').should('be.visible');
  });

    it('Tampilan Awal - Verifikasi Kondisi Data (Empty State atau Ada Data)', () => {
    cy.get('table').should('be.visible');

    cy.get('table tbody tr').then(($rows) => {
        if ($rows.length === 1 && $rows.text().includes('Tidak ada data')) {
        // Kondisi Empty State
        cy.log('✅ Kondisi Empty State');
        cy.get('[data-testid="stok-tersedia"] > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root').should('have.text', '0');
        cy.get('[data-testid="stok-segera-habis"] > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root').should('have.text', '0');
        cy.get('[data-testid="stok-habis"] > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root').should('have.text', '0');

        cy.contains('td', 'Tidak ada data').should('be.visible');
        cy.get('.MuiPagination-ul').should('exist');
        cy.get('[aria-label="Go to next page"]').should('be.disabled');
        } else {
        // Kondisi Ada Data
        cy.log('✅ Kondisi Ada Data');
        }
    });
    });

    it('Tambah Produk kemudian klik batal)', () => {
        cy.get('table').should('be.visible');
        cy.get('.MuiStack-root > .MuiButtonBase-root').click();

        //input data
        cy.get('[class="MuiBox-root css-pqcax2"]').click();
        const fileName = 'Kamarmedis.png'; // Ganti dengan nama file yang sesuai
        cy.fixture(fileName).then(fileContent => {
            cy.get('[aria-label="File upload dropzone"] input[type="file"]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/.png/.jpg/.jpeg'
            });
        cy.get('#sku_code').type('001');
        cy.get('#product_name').type('Amoxilin');
        cy.get('#category_id').click({force: true})
        cy.get('ul[role="listbox"] li')
          .contains('Obat')  
          .click()

        cy.get('#unit_id').click({ force: true });
        cy.get('ul[role="listbox"] li')
          .contains('tablet')  
          .click();

        cy.get('#product_type').click({force: true});
        cy.get('ul[role="listbox"] li')
          .contains('Barang')  
          .click();  

        cy.get('[data-testid="input-is_buy"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga beli"]').type('10000', { force: true });
        cy.get('#tax_buy').click({ force: true });
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();

        cy.get('[data-testid="input-is_sell"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga jual"]').type('15000', { force: true });
        cy.get('#tax_sell').click({force: true});
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();

        cy.contains('a.MuiButton-root', 'Batal').click({force: true});
        cy.log('Produk yang dibuat tidak terbentuk')
    });
});

    it('Tambah Produk sukses dengan mengisi semua data dnegan valid', () => {
        cy.get('table').should('be.visible');
        cy.get('.MuiStack-root > .MuiButtonBase-root').click();

        //input data
        cy.get('[aria-label="File upload dropzone"]').click();
        const fileName = 'Kamarmedis.png'; // Ganti dengan nama file yang sesuai
        cy.fixture(fileName).then(fileContent => {
            cy.get('[aria-label="File upload dropzone"] input[type="file"]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/.png/.jpg/.jpeg'
            });
        cy.get('#sku_code').type('A-001');
        cy.get('#product_name').type('Amoxilin');
        cy.get('#category_id').click({force: true})
        cy.get('ul[role="listbox"] li')
          .contains('Obat')  
          .click()

        cy.get('body').click(0,0); 

        cy.get('#unit_id').click({ force: true });
        cy.get('ul[role="listbox"] li')
          .contains('tablet')  
          .click();

        cy.get('#product_type').click({force: true});
        cy.get('ul[role="listbox"] li')
          .contains('Barang')  
          .click();  

        cy.get('[data-testid="input-is_buy"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga beli"]').type('10000', { force: true });
        cy.get('#tax_buy').click({ force: true });
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();

        cy.get('[data-testid="input-is_sell"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga jual"]').type('15000', { force: true });
        cy.get('#tax_sell').click({force: true});
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();

        cy.get('.MuiButton-contained').click({force: true});
        cy.log('Produk yang dibuat terbentuk');

    });
});

    it('Melihat detail produk setelah berhasil ditambahkan', () => {
        cy.get('table').should('be.visible');
        cy.contains('td', 'Amoxilin').should('be.visible');
        cy.get('.MuiTableRow-root > :nth-child(3) > .MuiButtonBase-root')
            .contains('Amoxilin')
            .click();

        cy.url().should('include', '/admin/products/'); 
        cy.contains('Amoxilin').should('be.visible');
        cy.contains('A-001').should('be.visible');
        cy.contains('Obat').should('be.visible');
        cy.contains('pcs').should('be.visible');
        cy.contains('Barang').should('be.visible');
        cy.contains('Rp 0').should('be.visible');  // harga beli
        cy.contains('Rp 15.000').should('be.visible');  // harga jual
        cy.contains('Pajak Beli').should('be.visible'); // pajak beli & jual
        });

    it('Gagal menambahkan produk dengan mengosongkan salah satu field', () => {
        cy.get('table').should('be.visible');
        cy.get('.MuiStack-root > .MuiButtonBase-root').click();
        cy.get('#sku_code');
        cy.get('#product_name').type('Amoxilin');
        cy.get('#category_id');
        cy.get('#unit_id');
        cy.get('#product_type');

        cy.get('[data-testid="input-is_buy"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga beli"]').type('10000', { force: true });
        cy.get('#tax_buy').click({ force: true });
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();


        cy.get('[data-testid="input-is_sell"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga jual"]').type('15000', { force: true });
        cy.get('#tax_sell').click({force: true});
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();

        cy.get('.MuiButton-contained').click({force: true});
        cy.get('#sku_code-helper-text').contains('Kode SKU wajib diisi');
        cy.get('#unit_id-helper-text').contains('Satuan produk wajib diisi'); 
    });

    it('Gagal menambahkan produk dengan (Kode SKU Duplikat)', () => {
        cy.get('table').should('be.visible');
        cy.get('.MuiStack-root > .MuiButtonBase-root').click();
        cy.get('#sku_code').type('A-001');
        cy.get('#product_name').type('Albendazole');
        cy.get('#category_id').click({force: true})
        cy.get('ul[role="listbox"] li')
          .contains('Obat')  
          .click()
        cy.get('body').click(0,0); 
        cy.get('#unit_id').click({ force: true });
        cy.get('ul[role="listbox"] li')
          .contains('tablet')  
          .click();

        cy.get('#product_type').click({force: true});
        cy.get('ul[role="listbox"] li')
          .contains('Barang')  
          .click();  

        cy.get('[data-testid="input-is_buy"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga beli"]').type('10000', { force: true });
        cy.get('#tax_buy').click({ force: true });
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();


        cy.get('[data-testid="input-is_sell"]').click({ force: true });
        cy.get('[placeholder="Masukkan harga jual"]').type('15000', { force: true });
        cy.get('#tax_sell').click({force: true});
        cy.get('ul[role="listbox"] li')
          .contains('Pajak Beli')
          .click();

        cy.get('.MuiButton-contained').click({force: true});
        cy.get('.MuiAlert-message').should('be.visible')
          .contains('Kode "A-001" telah terdaftar. Kode Produk tidak boleh sama.');
    });

    // Helper function untuk memilih item dari dropdown
    const selectFromDropdown = (selector, optionText) => {
      cy.get(selector).click({ force: true }); // buka dropdown
      cy.get('ul[role="listbox"] li')
        .contains(optionText)
        .should('be.visible')
        .click(); // pilih opsi
    };

    it('Menambah produk dan memilih Dropdown Kategori/Satuan', () => {
      cy.get('table').should('be.visible');
      cy.get('.MuiStack-root > .MuiButtonBase-root').click();
      selectFromDropdown('#category_id', 'Obat');
      selectFromDropdown('#category_id', 'Alat Medis');
      selectFromDropdown('#category_id', 'Alat Medis');
      
    });

    it('Menambah produk dan memilih Dropdown Kategori/Satuan dan memilih opsi tambah baru dan akan gagal jika data yang diinput sama ', () => {
      cy.get('table').should('be.visible');
      cy.get('.MuiStack-root > .MuiButtonBase-root').click();
      cy.get('#category_id').click({ force: true });
    
      cy.get('ul[role="listbox"] li')
        .contains('Tambah Baru')
        .should('be.visible')
        .click();

      cy.get('[placeholder="Masukkan data baru"]').type('Suplemen');
      cy.get('.css-euo9o1').click();

      cy.get('body').then(($body) => {
        if ($body.text().includes('Data sudah ada')) {
          cy.contains('Data sudah ada').should('be.visible');
        } else {
          cy.get('#category_id')
            .click({ force: true })
          cy.get('ul[role="listbox"] li')
            .contains('Suplemen')
            .should('be.visible')
            .click();
        }
      });
    });
    it('klik silang ketika ingin menyimpan kategori baru', () => {
      cy.get('table').should('be.visible');
      cy.get('.MuiStack-root > .MuiButtonBase-root').click();
      cy.get('#category_id').click({ force: true });
    
      cy.get('ul[role="listbox"] li')
        .contains('Tambah Baru')
        .should('be.visible')
        .click();

      cy.get('[placeholder="Masukkan data baru"]').type('Suplemen');
      cy.get('.MuiIconButton-colorError').click();
      cy.log('Nama kategori tidak tersimpan')
    });

    it('Klik batal saat buat satuan baru pada form', () => {
      cy.get('table').should('be.visible');
      cy.get('.MuiStack-root > .MuiButtonBase-root').click();
      cy.get('#unit_id').click({ force: true });    
      cy.get('ul[role="listbox"] li')
        .contains('Tambah Baru')
        .should('be.visible')
        .click();

      cy.get('[placeholder="Masukkan satuan produk"]').type('Kg');
      cy.get('[placeholder="Masukkan deskripsi satuan"]').type('Kilogram');

      cy.get('.MuiStack-root > .MuiButton-text').click();
    });

    it('Memilih Dropdown Satuan dan memilih opsi tambah baru dan akan gagal jika data yang diinput sama ', () => {
      cy.get('table').should('be.visible');
      cy.get('.MuiStack-root > .MuiButtonBase-root').click();
      cy.get('#unit_id').click({ force: true });    
      cy.get('ul[role="listbox"] li')
        .contains('Tambah Baru')
        .should('be.visible')
        .click();

      cy.get('[placeholder="Masukkan satuan produk"]').type('Kg');
      cy.get('[placeholder="Masukkan deskripsi satuan"]').type('Kilogram');

      cy.get('.MuiStack-root > .MuiButton-contained').click();

      cy.get('body').then(($body) => {
        if ($body.text().includes('Satuan produk sudah ada, gunakan nama lain')) {
          cy.contains('Satuan produk sudah ada, gunakan nama lain').should('be.visible');
        } else {
          cy.get('#unit_id').click({ force: true });    
          cy.get('ul[role="listbox"] li')
            .contains('Kg')
            .should('be.visible')
            .click();
          }
      });
    });

   it.only('Melakukan Penyesuaian produk', () => {
      cy.get('table').should('be.visible');
      cy.contains('td', 'Amoxilin').should('be.visible');
      cy.get('.MuiTableRow-root > :nth-child(3) > .MuiButtonBase-root')
        .contains('Amoxilin')
        .click();

      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select')
        .should('be.visible')
        .click();
      cy.get('[data-value="stockOpname"]')
        .should('exist')      
        .should('be.visible')  
        .click();
  });

  it('test login aja', () => {

  });

});








 
