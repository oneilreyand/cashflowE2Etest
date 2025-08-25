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

    it.only('Tambah Produk sukses dengan mengisi semua data dnegan valid', () => {
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
          .contains('unit 15')  
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
        cy.contains('unit 15').should('be.visible');
        cy.contains('Barang').should('be.visible');
        cy.contains('Rp 0').should('be.visible');  // harga beli
        cy.contains('Rp 15.000').should('be.visible');  // harga jual
        cy.contains('Pajak Beli').should('be.visible'); // pajak beli & jual
        });

});







 
