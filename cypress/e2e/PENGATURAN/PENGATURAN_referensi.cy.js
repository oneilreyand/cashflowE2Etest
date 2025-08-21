describe('[PENGATURAN-REFERENSI]', () => {
  const navigatePengaturan = () => {
    cy.get('[data-testid="drawer-item-settings"]').click();
  };

  beforeEach(() => {
    cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
    cy.visitDashboard(Cypress.env('companyId')) // Visit the dashboard after successful login
    navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
  });

  //Kesesuaian UI
  it('Cek kesesuainan halaman Pengaturan Referensi dengan design yang ada', () => {
        cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
        //Header
        cy.get('.MuiTypography-root').should('be.visible').and('contain', 'Pengaturan Referensi')
        cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
        //Search
        cy.get('input[placeholder="Cari Referensi"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Cari Referensi');
        //Tambah Termin Button
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Referensi');
        //Tabel
        cy.contains('Semua Referensi').should('be.visible');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Referensi');
        //Pegination
        cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root').should('be.visible')
        .invoke('text')
        .should('match', /Menampilkan\s+\d+\s*-\s*\d+\s+dari\s+\d+\s+data/)
        cy.get('.MuiPagination-ul').should('be.visible')
  });

  //Navigation to Beranda
  it('Breadcrumbs dapat berfungsi dengan baik -> membawa halaman pengaturan ke beranda', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').and('contain', 'Beranda')
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()
    cy.get('.MuiTypography-root > span').should('be.visible').and('contain', 'Dashboard')
    }) 
    
   //Empty State
  it('Membuka halaman Pengaturan Referensi dengan kondisi data referensi tidak ada - Harus ada pesan (Tidak ada data) di tabel', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
    });

  it(' Manipulasi data - Harus berhasil menampilkan tidak ada data, ketika data kosong', () => {
      // Intercept the API request
      cy.intercept('GET', '**api/setting-preferensis*', {
        statusCode: 200, // Simulate a successful response with no data
        body: {
          data: [],
          message: 'No Data',
        },
      }).as('getReferensiNoData');
    
      // Perform the action to trigger the request
      cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    
      // Wait for the intercepted request
      cy.wait('@getReferensiNoData', { timeout: 10000 });
    
      // Assert that the UI displays the correct error message
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible')
        .and('contain', 'Tidak ada data');
    });

  //Create New Data Success
  it('Cek kesesuaian form tambah referensi dengan design', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Referensi');
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Referensi');
    cy.get('.MuiButton-contained').should('be.visible').and('contain', 'Simpan')
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batal')
  })

  it('Berhasil GET data opsi nama referensi', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click()
    cy.get('ul[role="listbox"] > li').should('be.visible').and('contain', 'Metode Valuasi')
  })

  it('Berhasil GET data opsi referensi', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    cy.get('ul[role="listbox"] > li').should('contain','FIFO').and('contain', 'AVERAGE')
  })

  it('Berhasil membatalkan tambah referensi', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batal').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
  })

  it('Berhasil menambah referensi, semua field di isi dengan data yang valid', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click()
    cy.get('ul[role="listbox"] > li').contains('Metode Valuasi').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    cy.get('ul[role="listbox"] > li').contains('FIFO').click()
    cy.get(':nth-child(3) > div > .MuiButton-contained').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Metode Valuasi')
  })

  //Create new data failed
  it('Gagal menambahkan data baru', () => {
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click()
    cy.get('ul[role="listbox"] > li').contains('Metode Valuasi').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    cy.get('ul[role="listbox"] > li').contains('AVERAGE').click()
    cy.get(':nth-child(3) > div > .MuiButton-contained').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Nama Referensi sudah digunakan.');
  })

  it('Gagal menambahkan data baru nama referensi kosong', () =>{
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    // cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click()
    // cy.get('ul[role="listbox"] > li').contains('Metode Valuasi').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    cy.get('ul[role="listbox"] > li').contains('AVERAGE').click()
    cy.get(':nth-child(3) > div > .MuiButton-contained').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Nama Referensi dan Referensi harus diisi.');
  })

  it('Gagal menambahkan data baru referensi kosong', () =>{
    cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click()
    cy.get('ul[role="listbox"] > li').contains('Metode Valuasi').click()
    // cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    // cy.get('ul[role="listbox"] > li').contains('AVERAGE').click()
    cy.get(':nth-child(3) > div > .MuiButton-contained').click()
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Nama Referensi dan Referensi harus diisi.');
  })

  it('Gagal GET data, kondisi error harus muncul', () => {
    // Intercept the API request
      cy.intercept('GET', '**api/setting-preferensis*',{ statusCode: 500,body: {
          message: 'Internal Server Error',
        },
        }).as('getReferensiSettingsError');

      // Aksi yang memicu request
      cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()

      // Tunggu sampai request dipanggil
      cy.wait('@getReferensiSettingsError', {timeout: 10000 });

      // Verifikasi bahwa pesan error muncul
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Kesalahan di server')

      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Error, Gagal mendapatkan data!')
  })

  it('Gagal GET data saat offline', () => {
    cy.goOffline();

     // Kunjungi halaman ekspedisi
      cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain','Tidak ada data')
  })

  //Search
  it('Gagal mencari data referensi, list data tidak ada', () => {
      cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('input[placeholder="Cari Referensi"]').should('be.visible').type('hantu')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
    });

  it('Berhasil Harus bisa mencari salesman dengan keyword yang valid', () => {
     cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      
      cy.get('input[placeholder="Cari Referensi"]') // Seleksi elemen input berdasarkan placeholder
        .should('be.visible') // Pastikan elemen terlihat
        .invoke('attr', 'placeholder') // Ambil nilai atribut placeholder
        .then((placeholder) => {
          expect(placeholder).to.eq('Cari Referensi'); // Verifikasi nilai placeholder
        })
        .then(() => {
          // Ketikkan teks ke dalam input
          cy.get('input[placeholder="Cari Referensi"]')
            .type('Metode valuasi') // Ketikkan teks 'John Doe'
            .should('have.value', 'Metode valuasi'); // Verifikasi nilai yang diketik
        });
    })

  it('Berhasil mencari nama salesman dengan sebagian keyword', () => {
      cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('input[placeholder="Cari Referensi"]').should('be.visible').type('Fif')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'FIFO')
    })

  it('Berhasil mencari nama salesman dengan huruf kecil-besar(campur)', () => {
      cy.get('[data-cy="submenu-item-reference-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('input[placeholder="Cari Referensi"]').should('be.visible').type('meTodE')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Metode')
    })

  it('Gagal mencari salesman, memanipulasi API setting salesman menjadi error 500', () => {
      // Intercept API GET dan manipulasi semua permintaan ke endpoint setting-salesman menjadi error 500
      cy.intercept(
        'GET',
        '**/api/setting-salesman**', // Tangkap semua request ke endpoint ini
        (req) => {
          req.reply({statusCode: 500,
            body: {
              message: 'Internal Server Error', // Isi pesan error
            },
          });
        }
      ).as('casiSalesman');
    
      // Klik submenu untuk membuka halaman setting salesman
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    
      // Verifikasi placeholder input "Cari Salesman"
      cy.get('input[placeholder="Cari Salesman"]')
        .should('be.visible') // Pastikan input terlihat
        .invoke('attr', 'placeholder') // Ambil nilai placeholder
        .then((placeholder) => {
          expect(placeholder).to.eq('Cari Salesman'); // Verifikasi placeholder sesuai
        });
    
      // Ketikkan teks ke dalam input
      cy.get('input[placeholder="Cari Salesman"]')
        .type('metode') // Ketikkan teks 'reyand 1'
        .should('have.value', 'metode'); // Verifikasi nilai input sesuai
    
      // Tunggu intercept pertama untuk API request tanpa pencarian
      cy.wait('@casiSalesman').then((interception) => {
        // Validasi bahwa intercept menghasilkan error 500
        expect(interception.response.statusCode).to.eq(500);
    
        // Log respons untuk debugging
        cy.log('Intercepted Response:', JSON.stringify(interception.response));
    
        // Validasi body respons error
        expect(interception.response.body).to.have.property('message', 'Internal Server Error');
      });
    
      // Tunggu intercept untuk API request dengan pencarian
      cy.wait('@casiSalesman').then((interception) => {
        // Validasi bahwa intercept menghasilkan error 500
        expect(interception.response.statusCode).to.eq(500);
    
        // Log respons untuk debugging
        cy.log('Intercepted Search Response:', JSON.stringify(interception.response));
    
        // Validasi body respons error
        expect(interception.response.body).to.have.property('message', 'Internal Server Error');
      });
    
      // Validasi UI: Pastikan aplikasi menampilkan pesan error (jika ada)
      // Tambahkan selector sesuai kebutuhan aplikasi Anda
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible') // Pastikan elemen error terlihat
        .and('contain', 'Error, Gagal mendapatkan data!'); // Pastikan pesan error sesuai
    });

});