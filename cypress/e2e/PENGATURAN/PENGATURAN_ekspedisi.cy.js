import { medcareVer } from "../../data";
describe('TEST CASE PENGATURAN EKSPEDISI', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      
    };

    beforeEach(() => {
      cy.apiLogin('rahmadea.putri@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
    });

  const counterFile = 'cypress/fixtures/counter.json';

    //Kesesuaian UI
    it('Cek kesesuainan halaman Pengaturan Ekspedisi dengan design yang ada', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
    //Header
      cy.get('.MuiTypography-h5').should('be.visible').and('contain', 'Pengaturan Ekspedisi')
      cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
    //Fitur Search
      cy.get('input[placeholder="Cari Ekspedisi"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Cari Ekspedisi');
    //Fitur Tambah Ekspedisi
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').and('contain', 'Tambah Ekspedisi')
    //Tabel Ekspedisi
      cy.contains('Semua Ekspedisi').should('be.visible');
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Keterangan')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)')
      .scrollIntoView()
      .should('be.visible')
      .and('contain', 'Status')
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)')
      .scrollIntoView()
      .should('be.visible')
      .and('contain', 'Aksi')
    //Pagination
      cy.get('.MuiPaper-root > div > .MuiTypography-root')
      .should('be.visible')
      .invoke('text')
      .should('match', /Menampilkan\s+\d+\s*-\s*\d+\s+dari\s+\d+\s+data/)
      cy.get('.MuiPagination-ul > :nth-child(1)').should('be.visible')
      cy.get('.MuiPagination-ul').should('be.visible')
    });

    //Navigation to Beranda
    it('Breadcrumbs harus terlihat dan berfungsi dengan baik', () => {
      cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').and('contain', 'Beranda')
      cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click()
      cy.get('.MuiTypography-root > span').should('be.visible').and('contain', 'Dashboard')
    })
    
    //Empty State
    it('Membuka halaman Pengaturan Ekspedisi dengan kondisi data ekspedisi tidak ada - Harus ada pesan (Tidak ada data) di tabel', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .should('be.visible')
        .click();
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
    }); 

    it('Manipulasi data - Harus berhasil menampilkan tidak ada data, ketika data kosong', () => {
      // Intercept the API request
      cy.intercept('GET', '**/api/setting-expedition*', {
        statusCode: 200, // Simulate a successful response with no data
        body: {
          data: [],
          message: 'No Data',
        },
      }).as('getEkspedisi');
    
      // Perform the action to trigger the request
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]')
        .should('be.visible')
        .click();
    
      // Wait for the intercepted request
      cy.wait('@getEkspedisi', { timeout: 10000 });
    
      // Assert that the UI displays the correct error message
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root')
        .should('be.visible')
        .and('contain', 'Tidak ada data');
    });

    //Create New Data Success
    it('Kesesuaian form tambah data salesman dengan design', () => {
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
     cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
     cy.get('input[placeholder="Masukkan nama ekspedisi"]').should('be.visible')
     cy.get('input[placeholder="Keterangan"]').should('be.visible')
     cy.get('input[name="expedition_status"]').should('exist').and('not.be.checked');
     cy.get('.MuiButton-text').should('be.visible').and('contain', 'Batalkan')
     cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').and('contain', 'Simpan')
    })

    it('Berhasil merubah toggle button status menjadi aktif saat tambah data', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('input[name="expedition_status"]').should('exist').and('not.be.checked');
      cy.get('input[name="expedition_status"]').click()
      cy.get('input[name="expedition_status"]').should('exist').and('be.checked');
    })

    it('Berhasil batal tambah ekspedisi dan form tambah ekspedisi tidak ada di halaman', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('.MuiButton-text').click()
      cy.get('input[placeholder="Masukkan nama ekspedisi"]').should('not.exist')
    })

    it('Berhasil tambah data ekspedisi dengan status aktif', () => {
     cy.readFile(counterFile).then((data) => {
      const nextNumber = data.lastNumber + 1;
      const expeditionName = `JNT ${nextNumber}`;

      // Update file dengan angka baru
      cy.writeFile(counterFile, { lastNumber: nextNumber });

      // Jalankan langkah input form
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click();
      cy.get('[name="expedition_name"]').should('be.visible').type(expeditionName);
      cy.get('[name="expedition_desc"]').should('be.visible').type(`JNT Cabang ${nextNumber}`);
      cy.get('input[name="expedition_status"]').check({ force: true });
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click();
      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Berhasil Menambahkan Data Ekspedisi.');
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', expeditionName);
      cy.get('input[name="expedition_status"]').should('exist').and('be.checked');
      });
   });

    it('Nama ekspedisi berhasil di Trim (spasi depan dan belakang)', () => {
      //Intercept the API request
      cy.intercept('POST', '**/api/setting-expedition*', (req) => {
      }).as('postExpedition'); // Alias untuk memantau request

      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_name"]')
      .should('be.visible')
      .type('   Pos 9  ')
      cy.get('[name="expedition_desc"]')
      .should('be.visible')
      .type('Cabang Medan')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()

      cy.wait('@postExpedition').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);

        expect(interception.request.body.expedition_name.trim()).to.equal('Pos 9');
        expect(interception.request.body.expedition_desc).to.equal('Cabang Medan');
      });
     })

    // it('Spam hit tambah ekspedisi', () => {
    //    cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    //    cy.get('.MuiStack-root > .MuiButtonBase-root').click()
    //    cy.get('[name="expedition_name"]')
    //   .should('be.visible')
    //   .type('   Pos 10  ')
    //   cy.get('[name="expedition_desc"]')
    //   .should('be.visible')
    //   .type('Cabang Medan')

    //   // Mock API untuk menangkap permintaan
    //   cy.intercept('PUT', '**/api/setting-expedition*', {
    //     statusCode: 200,
    //     body: { message: 'Success' },
    //   }).as('updateSettings');
    //   // Simulasi spam dengan klik tombol "Simpan" sebanyak 10 kali
    //   for (let i = 0; i < 10; i++) {
    //     cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
    //   }
    // })

     //Create new data failed
    it('Gagal menambahkan data ekspekssisi, field nama ekspedisi tidak di isi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      //cy.get('[name="expedition_name"').should('be.visible').type('Pos Indonesia')
      cy.get('[name="expedition_desc"').should('be.visible').type('Cabang Padang')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').and('contain', 'Nama Ekspedisi wajib diisi')
     })

    it('Gagal menambahkan data ekspekssisi, field keterangan tidak di isi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_name"').should('be.visible').type('Pos Indonesia')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').and('contain', 'Keterangan wajib diisi')
     })

    it('Gagal menambahkan data ekspekssisi, semua field tidak di isi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      //cy.get('[name="expedition_name"').should('be.visible').type('JNT')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').and('contain', 'Nama Ekspedisi wajib diisi')
       cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').and('contain', 'Keterangan wajib diisi')
     })

    it('Gagal GET data, kondisi error harus muncul', () => {
      // Intercept the API request
      cy.intercept('GET', '**/api/setting-expedition*',{ statusCode: 500,body: {
          message: 'Internal Server Error',
        },
        }).as('getSalesmanSettingsError');

      // Aksi yang memicu request
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').should('be.visible').click();

      // Tunggu sampai request dipanggil
      cy.wait('@getSalesmanSettingsError', {timeout: 10000 });

      // Verifikasi bahwa pesan error muncul
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Kesalahan di server')

      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Error, Gagal mendapatkan data!')
    });

    it('Gagal POST data, error server', () => {

      // Intercept API POST untuk setting salesman
      cy.intercept('POST','**/api/setting-expedition*',
        {
          statusCode: 500,
          body: {
            message: 'Internal Server Error',
          },
        }
      ).as('postSalesmanError');

      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_name"]')
      .should('be.visible')
      .type('   Pos 10  ')
      cy.get('[name="expedition_desc"]')
      .should('be.visible')
      .type('Cabang Medan')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()

      cy.wait('@postSalesmanError').then((interception) => {
        expect(interception.response.statusCode).to.eq(500);
        expect(interception.response.body.message).to.eq('Internal Server Error');
      });
    });

    it('Gagal GET data saat offline', () => {
      cy.goOffline();

     // Kunjungi halaman ekspedisi
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').should('be.visible').click();
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain','Tidak ada data')
    })

    it('Gagal POST data saat offline', () =>{
    //Kunjungi halaman tambah termin
    cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').should('be.visible').click();
    cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()

    //Isi form tambah termin
    cy.get('[name="expedition_name"').should('be.visible').type('JNT Pos')
    cy.get('[name="expedition_desc"').should('be.visible').type('JNT Pos')
    cy.goOffline()
    cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()

    //Cek pesan error
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Tidak ada koneksi internet. Silakan periksa koneksi Anda.');
    })

    it('Data Gagal tersimpan spam hit simpan ketika error', () => {
      // Stub API simpan agar pertama2 error
      cy.intercept('POST', '**/api/setting-expedition*', {
      statusCode: 500,
      body: { message: 'Server error' }
      }).as('saveError');

      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_name"]')
      .should('be.visible')
      .type('   Pos 18  ')
      cy.get('[name="expedition_desc"]')
      .should('be.visible')
      .type('Cabang Medan')

  // Klik simpan berkali-kali (3x) -> tetap error
    for (let i = 0; i < 3; i++) {
      cy.get(':nth-child(4) > div > .MuiButton-contained').click();
      cy.wait('@saveError');
    }
    })

    it('Gagal menyimpan data spam hit error', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.should("not.contain", "Spam Klik Termin")
    })

    it('Gagal menyimpan nama dengan nama yang sama (duplikat)', () => {
       cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
       cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="expedition_name"]')
      .should('be.visible')
      .type('   Pos 10  ')
      cy.get('[name="expedition_desc"]')
      .should('be.visible')
      .type('Cabang Medan')
      cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Nama Ekspedisi sudah ada')
    })

    //Looping
    it('Berhasil menambahkan data ekspedisi sebanyak 15 kali', () => {

      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();

        for (let i = 0; i < 15; i++) {
          cy.contains('button', 'Tambah Ekspedisi').should('be.visible').click();
          cy.get('input[placeholder="Masukkan nama ekspedisi"]').should('be.visible').type(`Amazon ${i}`);
          cy.get('input[placeholder="Keterangan"]').should('be.visible').type(`Cabang Marpoyan ${i}`);
          cy.get(':nth-child(4) > div > .MuiButton-contained').should('be.visible').click();
          cy.wait(3000)
          }
  });

    // Fitur Search
    it('Berhasil mencari data ekspedisi dengan data yang valid (Nama ekspedisi lengkap)', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.css-egm0ks > .MuiStack-root > .MuiFormControl-root > .MuiInputBase-root').should('be.visible').type('Amazon 0')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').contains('Amazon 0')
      })

    it('Berhasil mencari nama ekpedisi dengan sebagian keyword', () => {
       cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.css-egm0ks > .MuiStack-root > .MuiFormControl-root > .MuiInputBase-root').should('be.visible').type('JN')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').contains('JN')
    })

    it('Berhasil mencari nama ekspedisi dengan huruf kecil-besar(campur)', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.css-egm0ks > .MuiStack-root > .MuiFormControl-root > .MuiInputBase-root').should('be.visible').type('AMaZoN 6')
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').contains('Amazon 6')
    })

    it('Tidak ada data saat mencari nama ekspedisi yg tidak valid', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.css-egm0ks > .MuiStack-root > .MuiFormControl-root > .MuiInputBase-root').should('be.visible').type('hantu')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').contains('Tidak ada data')
    })


     //Aksi
    it('Berhasli menghapus data ekspedisi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root').click()
      cy.get('[data-testid="alert-dialog-submit-button"]').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Menghapus Data Expedisi.')
      cy.get('.css-1nqp4xj').should('be.visible').and('contain', 'Semua Ekspedisi')
     })

    it('Validasi pop up hapus sesuai design', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root').click()
      cy.get('[data-testid="alert-dialog-title"]').should('be.visible').contains('Hapus Ekspedisi?')
      cy.get('[data-testid="alert-dialog-cancel-button"]').should('be.visible').and('contain', 'Batal')
      cy.get('[data-testid="alert-dialog-submit-button"]').should('be.visible').and('contain', 'Hapus')
     })

    it('Pop up hapus ketika batal hapus harus kembali ke tabel ekspedisi', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root').click()
      cy.get('[data-testid="alert-dialog-cancel-button"]').click()
      cy.get('.css-1nqp4xj').should('be.visible').and('contain', 'Semua Ekspedisi')
     })

     //pegination
    it('Bisa menampilkan data ekspedisi, ketika menekan tombol next', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] >[data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
      cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root')
      .invoke('text')
      .should('match', /^Menampilkan 11 - \d+ dari \d+ data\.$/);
    })

    it('Bisa menampilkan data ekspedisi, ketika menekan tombol sebelumnya', () => {
      cy.get('[data-cy="submenu-item-expedition-setting"] >[data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
      cy.get('[data-testid="NavigateBeforeIcon"]').click()
      cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root').invoke('text').should('match', /^Menampilkan 1 - 10 dari \d+ data\.$/);
    })
    
    //Status non Aktif - Aktif (Page 1)
    it('Berhasil merubah status ekspedisi dari non aktif menjadi aktif, kemudian tampil menjadi opsi di penjualan PG1', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Ekspedisi.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(2) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#expedition').click()
     cy.get('ul[role="listbox"] > li').should('contain', 'Amazon 13')
     cy.get('body').click(0, 0)
    })

    //Status non Aktif - Aktif (Page 2)
    it('Berhasil merubah status ekspedisi dari non aktif menjadi aktif, kemudian tampil menjadi opsi di penjualan PG2', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Ekspedisi.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(2) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#expedition').click()
     cy.get('ul[role="listbox"] > li').should('contain', 'Amazon 3')
     cy.get('body').click(0, 0)
    })

    //Status Aktif - non Aktif (Page 1)
    it('Berhasil merubah status ekspedisi dari aktif menjadi non aktif, kemudian tampil menjadi opsi di penjualan PG1', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Ekspedisi.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(2) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#expedition').click()
     cy.get('ul[role="listbox"] > li').should('not.contain', 'Amazon 13')
     cy.get('body').click(0, 0)
    })

    //Status Aktif - non Aktif (Page 2)
   it('Berhasil merubah status ekspedisi dari aktif menjadi non aktif, kemudian tampil menjadi opsi di penjualan PG2', () => {
     //Mengunjungi halaman salesman
     cy.get('[data-cy="submenu-item-expedition-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('[data-testid="NavigateNextIcon"]').click()
     //Ubah status salesman non aktif menjadi aktif
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
     cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Status Ekspedisi.')
     cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('not.be.checked')

     //Ke halaman penjualan
     cy.get('[data-testid="drawer-item-sales"]').click()
     cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').click()
     cy.get(':nth-child(2) > .MuiGrid2-container > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
     cy.get('#expedition').click()
     cy.get('ul[role="listbox"] > li').should('not.contain', 'Amazon 3')
     cy.get('body').click(0, 0)
    })
});
