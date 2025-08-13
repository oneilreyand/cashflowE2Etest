import { medcareVer } from "../../data";

describe('[PENGATURAN-SALESMAN] - Membuka halaman Pengaturan Billing dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(medcareVer); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });
  
    it('[PENGATURAN-SALESMAN] - Chek kesesuainan halaman Pengaturan Billing dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    });

    it('[PENGATURAN-SALESMAN] - Harus gagal mendapatkan data, kondisi error harus muncul', () => {
      // Intercept the API request
      cy.intercept(
        'GET',
        'https://api-cashflow.assist.id/api/setting-salesman?search=&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
        {
          statusCode: 500,
          body: {
            message: 'Internal Server Error',
          },
        }
      ).as('getSalesmanSettingsError');
      // Aksi yang memicu request
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      // Tunggu sampai request dipanggil
      cy.wait('@getSalesmanSettingsError');
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Internal Server Error')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Error, Gagal mendapatkan data!')
    });

    it('[PENGATURAN-SALESMAN] - Harus berhasil mendapatkan data, data tidak ada', () => {
      // Intercept the API request
      cy.intercept(
        'GET',
        'https://api-cashflow.assist.id/api/setting-salesman?search=&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
        {
          statusCode: 200,
          body: {
            message: 'Internal Server Error',
          },
        }
      ).as('getSalesmanSettingsError');
      // Aksi yang memicu request
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      // Tunggu sampai request dipanggil
      cy.wait('@getSalesmanSettingsError');
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
    });

    it('[PENGATURAN-SALESMAN] - Harus bisa mencari data sales, list daata tidak ada', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('input[placeholder="Cari Salesman"]').should('be.visible').type('reyand oneil')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
    });

    it('[PENGATURAN-SALESMAN] - Harus bisa membuka section tambah salesman', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
      cy.get('input[name="sales_status"]')
        .should('exist')
        .and('not.be.checked');
      cy.get('.MuiButton-text')
        .should('be.visible')
        .and('contain', 'Batalkan')
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
    });

    it('[PENGATURAN-SALESMAN] - Harus bisa menutup section tambah salesman', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
      .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('.MuiButton-text')
        .should('be.visible')
        .and('contain', 'Batalkan')
        .click()
    })

    it('[PENGATURAN-SALESMAN] - Validasi tambah sales, nama dan keterangan kosong', () => {
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

    it('[PENGATURAN-SALESMAN] - Validasi tambah sales, keterangan kosong', () => {
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

    it('[PENGATURAN-SALESMAN] - Validasi tambah sales, nama kosong', () => {
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

    it('[PENGATURAN-SALESMAN] - harus gagal menambahkan salesman, error server', () => {

      // Intercept API POST untuk setting salesman
      cy.intercept(
        'POST',
        'https://api-cashflow.assist.id/api/setting-salesman',
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
        .type('reyand')
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman')
      cy.get('input[name="sales_status"]')
        .should('exist')
        .and('not.be.checked');
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
        .click()

      cy.wait('@postSalesmanError').then((interception) => {
        expect(interception.response.statusCode).to.eq(500);
        expect(interception.response.body.message).to.eq('Internal Server Error');
      });
    });

    it('[PENGATURAN-SALESMAN] - Harus berhasil menambahkan salesman, semua field di isi, status uncheck', () => {

      // Intercept API POST untuk setting salesman
      cy.intercept(
        'POST',
        'https://api-cashflow.assist.id/api/setting-salesman',
        // {
        //   statusCode: 500,
        //   body: {
        //     message: 'Internal Server Error',
        //   },
        // }
      ).as('postSalesmanError');

      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
        .type('reyand 1')
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman 1')
      cy.get('input[name="sales_status"]')
        .should('exist')
        .and('not.be.checked');
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
        .click()

      cy.wait('@postSalesmanError').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('[PENGATURAN-SALESMAN] - Harus berhasil menambahkan salesman, semua field di isi, status check', () => {

      // Intercept API POST untuk setting salesman
      cy.intercept(
        'POST',
        'https://api-cashflow.assist.id/api/setting-salesman',
        // {
        //   statusCode: 500,
        //   body: {
        //     message: 'Internal Server Error',
        //   },
        // }
      ).as('postSalesmanError');

      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .click();
      cy.contains('button', 'Tambah Salesman')
        .should('be.visible')
        .click()
      cy.get('input[placeholder="Masukkan Nama Salesman"]')
        .should('be.visible')
        .type('reyand 2')
      cy.get('input[placeholder="Keterangan"]')
        .should('be.visible')
        .type('keterangan salesman 2')
        cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')
        .click()
        .should('exist')
        .and('be.checked');
      cy.get(':nth-child(4) > div > .MuiButton-contained')
        .should('be.visible')
        .and('contain', 'Simpan')
        .click()

      cy.wait('@postSalesmanError').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('[PENGATURAN-SALESMAN] - Harus bisa mencari salesman', () => {
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

    it('[PENGATURAN-SALESMAN] - Harus gagal mencari salesman, memanipulasi API setting salesman menjadi error 500', () => {
      // Intercept API GET dan manipulasi semua permintaan ke endpoint setting-salesman menjadi error 500
      cy.intercept(
        'GET',
        '**/api/setting-salesman**', // Tangkap semua request ke endpoint ini
        (req) => {
          req.reply({
            statusCode: 500,
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
        .type('reyand 1') // Ketikkan teks 'reyand 1'
        .should('have.value', 'reyand 1'); // Verifikasi nilai input sesuai
    
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

    it('[PENGATURAN-SALESMAN] - Harus berhasil menghapus salesman', () => {
      cy.intercept('GET', '**/api/setting-salesman**').as('getSalesman');
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.wait('@getSalesman').then(() => {
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root')
          .click()
      })
    });

    it('[PENGATURAN-SALESMAN] - Harus berhasil menambahkan salesman, semua field di isi, status uncheck sebanyak 10 kali', () => {

      // Intercept API POST untuk setting salesman
      cy.intercept(
        'POST',
        'https://api-cashflow.assist.id/api/setting-salesman',
        // {
        //   statusCode: 500,
        //   body: {
        //     message: 'Internal Server Error',
        //   },
        // }
      ).as('postSalesmanError');

      for(let i = 0; i < 15; i++) {
        cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
          .click();
        cy.contains('button', 'Tambah Salesman')
          .should('be.visible')
          .click()
        cy.get('input[placeholder="Masukkan Nama Salesman"]')
          .should('be.visible')
          .type(`reyand ${i}`)
        cy.get('input[placeholder="Keterangan"]')
          .should('be.visible')
          .type(`keterangan salesman ${i}`)
        cy.get('input[name="sales_status"]')
          .should('exist')
          .and('not.be.checked');
        cy.get(':nth-child(4) > div > .MuiButton-contained')
          .should('be.visible')
          .and('contain', 'Simpan')
          .click()
  
        cy.wait('@postSalesmanError').then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
        });
      }

    });

    it('[PENGATURAN-SALESMAN] -  Harus berhasil mendapatkan data salesman ketika next page', () => {
      cy.intercept('GET', '**/api/setting-salesman**').as('getSalesman');
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
      cy.wait('@getSalesman')
    })

    it('[PENGATURAN-SALESMAN] -  Harus berhasil mendapatkan data salesman ketika next page', () => {
      cy.intercept('GET', '**/api/setting-salesman**').as('getSalesman');
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
      cy.wait('@getSalesman')
    })

    it('[PENGATURAN-SALESMAN] - Harus bisa berhasil update status data sales', () => {
      cy.get('[data-cy="submenu-item-salesman-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      cy.get('.MuiAlert-message')
        .should('be.visible')
        .and('contain', 'Berhasil Mengubah Status Salesman.')
    })
});