import { medcareVer } from "../../data";

describe('[PENGATURAN-SALESMAN]', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

    //Kesesuaian UI
    it('Cek kesesuainan halaman Pengaturan Salesman dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      //Header
      cy.get('.MuiTypography-h5').should('be.visible').and('contain', 'Pengaturan Salesman')
      cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
      //Search
      cy.get('input[placeholder="Cari Salesman"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Cari Salesman')
      //Tambah Termin Button
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Salesman')
      //Tabel
      cy.contains('Semua Salesman').should('be.visible');
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Keterangan')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible').and('contain', 'Status')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('be.visible').and('contain', 'Aksi')
      //Pegination
      cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root')
      .should('be.visible')
      .invoke('text')
      .should('match', /Menampilkan\s+\d+\s*-\s*\d+\s+dari\s+\d+\s+data/)
      cy.get('.MuiPagination-ul').should('be.visible')
    });

    //Navigation to Beranda
    it('Breadcrumbs harus terlihat dan berfungsi dengan baik', () => {
      cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').and('contain', 'Beranda')
      cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()
      cy.get('.MuiTypography-root > span').should('be.visible').and('contain', 'Dashboard')
    })

    //Empty State
    it('Membuka halaman Pengaturan salesman dengan kondisi data termin tidak ada - Harus ada pesan (Tidak ada data) di tabel', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
      });

    it(' Manipulasi data - Harus berhasil menampilkan tidak ada data, ketika data kosong', () => {
      // Intercept the API request
      cy.intercept('GET', '**/api/setting-salesman*', {
        statusCode: 200, // Simulate a successful response with no data
        body: {
          data: [],
          message: 'No Data',
        },
      }).as('getSalesmanNoData');
    
      // Perform the action to trigger the request
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    
      // Wait for the intercepted request
      cy.wait('@getSalesmanNoData', { timeout: 10000 });
    
      // Assert that the UI displays the correct error message
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible')
        .and('contain', 'Tidak ada data');
    });

    //Create new data success
    it('Cek form tambah data Salesman sesuai dengan design ', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]').should('be.visible')
      cy.get('input[placeholder="Keterangan"]').should('be.visible')
      cy.get('input[name="sales_status"]').should('exist').and('not.be.checked')
      cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan')
    })
  
    it('Berhasil merubah toggle button status menjadi aktif saat tambah data', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()
      cy.get('input[name="sales_status"]').should('exist').and('not.be.checked').click()
      cy.get('input[name="sales_status"]').should('exist').and('be.checked')
    })

    it('Berhasil batal tambah salesman dan form tambah salesman tidak ada di halaman', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()
      cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan').click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]').should('not.exist')
    })

    it('Berhasil menambah data salesman dengan kondisi data valid dan status aktif', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > .MuiButtonBase-root').click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]').should('be.visible').type('ucok 3')
      cy.get('input[placeholder="Keterangan"]').should('be.visible').type('keterangan salesman 1')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').click()
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan').click()
      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Salesman.')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'ucok 3')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'keterangan salesman 1')
      cy.get('input[name="sales_status"]').should('exist').and('be.checked')
    })

    it('Berhasil menambahkan salesman, semua field di isi, status uncheck', () => {

      // Intercept API POST untuk setting salesman
      cy.intercept(
        'POST',
        '**/api/setting-salesman*').as('postSalesmanUnchecked');

      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
        .type('raya 1')
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman 1')
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
        .click()

      cy.wait('@postSalesmanUnchecked').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('Berhasil menambah data salesman dengan kondisi nama salesman spasi depan belakang kemudian di Trim', () => {
      // Intercept API POST untuk setting salesman
      cy.intercept('POST', '**/api/setting-salesman*').as('postSalesmanTrimmed');
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click();
      cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
        .type('   ucok 4  '); // Nama dengan spasi di depan dan belakang
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman 4');
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
        .click();
      cy.wait('@postSalesmanTrimmed').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        // Verifikasi bahwa nama salesman telah di Trim
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
          .should('be.visible')
          .and('contain', 'ucok 4'); // Pastikan nama salesman tidak mengandung spasi
      });
    })

//     it('Spam klik simpan, data yang tersimpan hanya satu', () => {
//       cy.intercept('POST', '**/api/setting-salesman*').as('HitMultiple');

//       // Kunjungi halaman tambah termin
//      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
//       cy.get('.MuiStack-root > .MuiButtonBase-root')
//         .should('be.visible')
//         .click();

//       // Isi form tambah termin
//        cy.get('input[placeholder="Masukkan Nama Salesman"]')
//         .should('be.visible')
//         .type('Salesman 2')
//       cy.get('input[placeholder="Keterangan"]')
//         .should('be.visible')
//         .type('keterangan salesman')

//       // Klik simpan berkali-kali (3x) -> tetap error
//       for (let i = 0; i < 3; i++) {
//       cy.get(':nth-child(4) > div > .MuiButton-contained').click();
//       cy.wait('@HitMultiple');
//       }

//       // Verifikasi data hanya muncul sekali di tabel
//       cy.get('.MuiTableBody-root')
//       .find('tr')
//       .filter(':contains("Salesman 2")')
//       .should('have.length', 1);
// })

    //Create new data failed
    it('Gagal tambah sales, nama dan keterangan kosong', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
      .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .click()
      cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Nama dan Keterangan Salesman harus diisi.')
    })

    it('Gagal tambah sales, keterangan kosong', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
      .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
        .type('Salesman')
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .click()
      cy.get('.MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Nama dan Keterangan Salesman harus diisi.')
    })

    it('Gagal tambah sales, nama kosong', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
      .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman')
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .click()
      cy.get('.MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Nama dan Keterangan Salesman harus diisi.')
    })

    it('Gagal GET data, kondisi error harus muncul', () => {
      // Intercept the API request
      cy.intercept('GET', '**/api/setting-salesman*',{ statusCode: 500,body: {
          message: 'Internal Server Error',
        },
        }).as('getSalesmanSettingsError');

      // Aksi yang memicu request
      cy.get('[data-cy="submenu-item-salesman-setting"] >[data-cy="list-item-button-sub-menu-setting"]').should('be.visible').click();

      // Tunggu sampai request dipanggil
      cy.wait('@getSalesmanSettingsError', {timeout: 10000 });

      // Verifikasi bahwa pesan error muncul
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Kesalahan di server')

      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Error, Gagal mendapatkan data!')
    });

    it('Gagal POST data salesman, error server', () => {

      // Intercept API POST untuk setting salesman
      cy.intercept('POST','**/api/setting-salesman*',
        {
          statusCode: 500,
          body: {
            message: 'Internal Server Error',
          },
        }
      ).as('postSalesmanError');

      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
        .type('ucok')
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman')
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
        .click()

      cy.wait('@postSalesmanError').then((interception) => {
        expect(interception.response.statusCode).to.eq(500);
        expect(interception.response.body.message).to.eq('Internal Server Error');
      });
    });

    it('Gagal GET data saat offline', () => {
      cy.goOffline();

     // Kunjungi halaman ekspedisi
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain','Tidak ada data')
    })

    it('Gagal POST data saat offline', () =>{
    //Kunjungi halaman tambah termin
    cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click();

    //Isi form tambah termin
     cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
        .type('ucok 10')
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman')
      cy.goOffline();
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
        .click()
    //Cek pesan error
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
    })

    //Search
    it('Gagal mencari data sales, list daata tidak ada', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('input[placeholder="Cari Salesman"]').should('be.visible').type('hantu')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
    });

    it('Berhasil Harus bisa mencari salesman dengan keyword yang valid', () => {
     cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      
      cy.get('input[placeholder="Cari Salesman"]') // Seleksi elemen input berdasarkan placeholder
        .should('be.visible') // Pastikan elemen terlihat
        .invoke('attr', 'placeholder') // Ambil nilai atribut placeholder
        .then((placeholder) => {
          expect(placeholder).to.eq('Cari Salesman'); // Verifikasi nilai placeholder
        })
        .then(() => {
          // Ketikkan teks ke dalam input
          cy.get('input[placeholder="Cari Salesman"]')
            .type('reyand 1') // Ketikkan teks 'John Doe'
            .should('have.value', 'reyand 1'); // Verifikasi nilai yang diketik
        });
    })

    it('Berhasil mencari nama salesman dengan sebagian keyword', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('input[placeholder="Cari Salesman"]').should('be.visible').type('uc')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'uc')
    })

    it('Berhasil mencari nama salesman dengan huruf kecil-besar(campur)', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('input[placeholder="Cari Salesman"]').should('be.visible').type('uCoK')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'ucok')
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
        .type('ucok') // Ketikkan teks 'reyand 1'
        .should('have.value', 'ucok'); // Verifikasi nilai input sesuai
    
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


    //Looping add data
    it('Berhasil menambahkan salesman, semua field di isi, status uncheck sebanyak 15 kali', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      for(let i = 0; i < 15; i++) {
        cy.contains('button', 'Tambah Salesman').should('be.visible').click()
        cy.get('input[placeholder="Masukkan Nama Salesman"]').should('be.visible').type(`ucok ${i}`)
        cy.get('input[placeholder="Keterangan"]').should('be.visible').type(`keterangan salesman ${i}`)
        cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan').click()
        }});

    //Hapus
    it('Berhasil menghapus salesman', () => {
      cy.intercept('GET', '**/api/setting-salesman**').as('getSalesman');
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.wait('@getSalesman').then(() => {
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root')
          .click()
        cy.get('[data-testid="alert-dialog-submit-button"]').click()
        // cy.get('[data-testid="alert-dialog-submit-button"]').should('not.exist')
      })
    });

    //Pegination
    it('Berhasil mendapatkan data salesman ketika next page', () => {
      cy.intercept('GET', '**/api/setting-salesman**').as('getSalesman');
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
      cy.wait('@getSalesman')
    })

    it('Berhasil mendapatkan data salesman halaman sebelumnya', () => {
      cy.intercept('GET', '**/api/setting-salesman**').as('getSalesman');
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
      cy.get('[data-testid="NavigateBeforeIcon"]').click()
      cy.wait('@getSalesman')
    })

    //Status non Aktif - Aktif (Page 1)
    it('Berhasil merubah status salesman dari non aktif menjadi aktif, kemudian tampil menjadi opsi di penjualan PG1', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Salesman.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(3) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#salesman').click()
     cy.get('ul[role="listbox"] > li').should('contain', 'ucok 13')
     cy.get('body').click(0, 0)
    })

    //Status non Aktif - Aktif (Page 2)
    it('Berhasil merubah status salesman dari non aktif menjadi aktif, kemudian tampil menjadi opsi di penjualan PG2', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Salesman.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(3) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#salesman').click()
     cy.get('ul[role="listbox"] > li').should('contain', 'ucok 2')
     cy.get('body').click(0, 0)
    })

    //Status Aktif - non Aktif (Page 1)
    it('Berhasil merubah status salesman dari aktif menjadi non aktif, kemudian tampil menjadi opsi di penjualan PG1', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Salesman.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(3) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#salesman').click()
     cy.get('ul[role="listbox"] > li').should('not.contain', 'ucok 13')
     cy.get('body').click(0, 0)
    })

    //Status Aktif - non Aktif (Page 2)
    it('Berhasil merubah status salesman dari aktif menjadi non aktif, kemudian tampil menjadi opsi di penjualan PG2', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Salesman.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(3) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#salesman').click()
     cy.get('ul[role="listbox"] > li').should('not.contain', 'ucok 2')
     cy.get('body').click(0, 0)
    })
});