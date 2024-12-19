describe('[PENGATURAN-PENGGUNA]', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      cy.get('[data-cy="submenu-item-usage-setting"]').click()
      });

    //   it.only('check list data pengguna, kalau ada datanya hapus semua', () => {
    //   cy.get('[data-cy="submenu-item-usage-setting"]').click()

    //     // Intercept the API call
    //     cy.intercept('GET', '/api/setting-accesses*').as('getSettingAccesses');

    //     cy.wait('@getSettingAccesses');
    //   });
      
  
    // it('[PENGATURAN-PENGGUNA] - Chek kesesuainan halaman Pengaturan Billing dengan design yang ada - data tidak ada', () => {
      
    //   // Memicu navigasi atau tindakan
    //   cy.get('[data-cy="submenu-item-usage-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    //   cy.intercept(
    //     'GET',
    //     'https://api-cashflow.assist.id/api/setting-accesses?skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
    //   ).as('getSettingAccesses');
      
    //   // Tunggu respons API
    //   cy.wait('@getSettingAccesses').then((interception) => {
    //     expect(interception.response.statusCode).to.eq(200);
    //     console.log('Response Body:', interception.response.body);
    //     if(interception.response.body.result === 0) {
    //       cy.get('.MuiPaper-root > .MuiStack-root > .MuiTypography-root').should('be.visible').and('contain', 'Semua Pengguna')
    //       cy.get('.MuiPaper-root > .MuiStack-root > .MuiTypography-root').should('be.visible')
    //       cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Nama Peran')
    //       cy.get('.MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Keterangan')
    //       cy.get('.MuiTableRow-root > :nth-child(3)').should('be.visible').and('contain', 'Status')
    //       cy.get('.MuiTableRow-root > :nth-child(4)').should('be.visible').and('contain', 'Aksi')
    //       cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
    //       cy.get('[style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;"] > .MuiTypography-root').should('be.visible').and('contain', 'Menampilkan 0 dari 0 data')
    //     }
    //   });
    // });

    it('[PENGATURAN-PENGGUNA] - Harus bisa membuka modal tambah pengguna dan mengecek kesesuaian designnya', () => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get(':nth-child(1) > .MuiFormLabel-root').should('be.visible').and('contain', 'Nama Pengguna')
      cy.get(':nth-child(3) > .MuiFormLabel-root').should('be.visible').and('contain', 'Keterangan')
      cy.get('form > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('be.visible').and('contain', 'Fitur')
      cy.get('form > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('be.visible').and('contain', 'Buat')
      cy.get('form > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('be.visible').and('contain', 'Lihat')
      cy.get('form > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('be.visible').and('contain', 'Ubah')
      cy.get('form > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should('be.visible').and('contain', 'Hapus')
      cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').check();
      cy.get('.MuiButton-containedDefault')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'Batalkan')
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'Buat Pengguna')
    })

    it('[PENGATURAN-PENGGUNA] - Harus bisa menutup modal dengan menekan button close pada modal', () => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('.css-1j72te2 > .MuiButtonBase-root').click()
    })

    it('[PENGATURAN-PENGGUNA] - Harus bisa menutup modal dengan menekan button close pada modal', () => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('.MuiButton-containedDefault')
      .scrollIntoView()
      .click()
    })

    it('[PENGATURAN-PENGGUNA] - Harus memunculkan warding error pada field yang tidak di isi', () => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'Buat Pengguna')
        .click()
      cy.contains('p', 'Nama Pengguna is required') // Cari elemen <p> dengan teks spesifik
        .scrollIntoView()
        .should('be.visible');
      cy.contains('p', 'Keterangan is required') // Cari elemen <p> dengan teks spesifik
      .scrollIntoView()
      .should('be.visible');
    })

    it('[PENGATURAN-PENGGUNA] - Harus memunculkan warding error pada nama pengguna yang tidak di isi', () => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="access_description"').type('hak aksess owner')
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'Buat Pengguna')
        .click()
      cy.get('[class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"]')
      .scrollIntoView()
      .should('be.visible')
      .and('contain', 'Nama Pengguna is required')
    })

    it('[PENGATURAN-PENGGUNA] - Harus memunculkan warding error pada keterangan field yang tidak di isi', () => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'Buat Pengguna')
        .click()
      cy.get('[name="access_name"')
      .type('owner')
      cy.get('[class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"]')
      .scrollIntoView()
      .should('be.visible')
      .and('contain', 'Keterangan is required')
    })

    it('[PENGATURAN-PENGGUNA] - Harus berhasil menambahkan hak akses ketika memasukkan semua field yg ada', () => {
      cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
      cy.get('[name="access_name"]')
      .type('owner')
      cy.get('[name="access_description"]')
      .type('hak akses owner')
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
      .scrollIntoView()
      .should('be.visible')
      .and('contain', 'Buat Pengguna')
      cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').check();
  
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary').click()
    })

    it('[PENGATURAN-PENGGUNA] -  Harus bisa mengaktifkan toogle hak akses yang sesuai dengan yang dipilih', () => {
      cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Ubah Status Pengguna')
    })

    it('[PENGATURAN-PENGGUNA] -  Harus bisa mengnonaktifkan toogle hak akses yang sesuai dengan yang dipilih', () => {
      cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Ubah Status Pengguna')
    })

    it('[PENGATURAN-PENGGUNA] -  Harus berhasil edit hak akses yang dipilih', () => {
      cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click()
      cy.get('.MuiList-root')
        .contains('Ubah') // Cari elemen dengan teks "Ubah"
        .click();
      cy.get('[name="access_name"]')
        .clear()
        .type('admin')
      cy.get('[name="access_description"]')
        .clear()
        .type('hak akses admin')
      cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').uncheck();
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
        .scrollIntoView()
        .should('be.visible')
        .click()
    })

    it('[PENGATURAN-PENGGUNA] - Harus gagal edit hak akses yang dipilih, karena server error 500', () => {
      // Intercept request PATCH untuk edit hak akses
      cy.intercept('PATCH', 'https://api-cashflow.assist.id/api/setting-accesses/*', {
        statusCode: 500, // Mengatur agar responsnya adalah 500 (server error)
        body: { message: 'Request failed with status code 500' }, // Contoh pesan error dari server
      }).as('editAccess');
    
      // Melakukan aksi untuk mengedit hak akses
      cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click();
      cy.get('.MuiList-root')
        .contains('Ubah') // Cari elemen dengan teks "Ubah"
        .click();
      
      cy.get('[name="access_name"]')
        .clear()
        .type('admin');
      
      cy.get('[name="access_description"]')
        .clear()
        .type('hak akses admin');
      
      // Uncheck checkbox
      cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').uncheck();
    
      // Klik tombol untuk submit form
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
        .scrollIntoView()
        .should('be.visible')
        .click();
    
      // Tunggu request PATCH dan verifikasi status 500
      cy.wait('@editAccess').then((interception) => {
        if (interception.response.statusCode === 500) {
          cy.log('Edit gagal: Server error 500');
          // Verifikasi UI error atau tindakan lain
          cy.get('.MuiAlert-message') // Misalnya elemen yang menunjukkan error di UI
            .should('be.visible')
            .and('contain', 'Request failed with status code 500');
        } else {
          cy.log('Edit berhasil');
        }
      });
    });

    it('[PENGATURAN-PENGGUNA] - Harus gagal edit hak akses yang dipilih, karena id kosong', () => {
      // Intercept request PATCH untuk edit hak akses dan mensimulasikan ID kosong
      cy.intercept('PATCH', 'https://api-cashflow.assist.id/api/setting-accesses/*', (req) => {
        // Memodifikasi payload request jika ID kosong
        const modifiedRequestBody = { ...req.body, id: '' }; // Mengosongkan ID
        req.body = modifiedRequestBody;
    
        // Menanggapi dengan status 500 jika ID kosong
        if (req.body.id === '') {
          req.reply({
            statusCode: 500, // Mengatur agar responsnya adalah 500 (server error)
            // body: { message: 'Request failed with status code 500' }, // Pesan error server
          });
        } else {
          req.reply(); // Jika ID valid, lanjutkan normal
        }
      }).as('editAccess');
      
      // Melakukan aksi untuk mengedit hak akses
      cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click();
      cy.get('.MuiList-root')
        .contains('Ubah') // Cari elemen dengan teks "Ubah"
        .click();
    
      cy.get('[name="access_name"]')
        .clear()
        .type('admin');
    
      cy.get('[name="access_description"]')
        .clear()
        .type('hak akses admin');
    
      // Uncheck checkbox
      cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').uncheck();
    
      // Klik tombol untuk submit form
      cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'Edit Pengguna')
        .click();
    
      // Tunggu request PATCH dan verifikasi status 500
      cy.wait('@editAccess').then((interception) => {
        if (interception.response.statusCode === 500) {
          cy.log('Edit gagal: Server error 500');
          // Verifikasi UI error atau tindakan lain
          cy.get('.MuiAlert-message') // Misalnya elemen yang menunjukkan error di UI
            .should('be.visible')
            .and('contain', 'Request failed with status code 500');
        } else {
          cy.log('Edit berhasil');
        }
      });
    });

    it('[PENGATURAN-PENGGUNA] - Harus berhasil menghapus hak akses yang dipilih', () => {
      cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click()
      cy.get('.css-1vg9tid-MuiButtonBase-root-MuiMenuItem-root').click();
    })

    it('[PENGATURAN-PENGGUNA] - Harus berhasil menambahkan hak akses sebanyak 15 kali ketika memasukkan semua field yang ada', () => {
      for (let i = 0; i < 15; i++) {
        cy.get('.MuiStack-root > .MuiButtonBase-root').first() // Menambahkan .first() untuk klik elemen pertama
          .should('be.visible')
          .click();
        cy.get('[name="access_name"]')
          .type(`owner ${i}`);
        cy.get('[name="access_description"]')
          .type(`hak akses owner ${i}`);
        cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
          .scrollIntoView()
          .should('be.visible')
          .and('contain', 'Buat Pengguna');
        cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').check();
        cy.get('form > .MuiStack-root > .MuiButton-containedPrimary').click();
      }
    });

    it('[PENGATURAN-PENGGUNA] -  Harus berhasil next page, dan menampilkan data yang benar', () => {
      cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
    })

    it('[PENGATURAN-PENGGUNA] -  Harus berhasil prev page, dan menampilkan data yang benar', () => {
      cy.get('.MuiPagination-ul > :nth-child(1)').click()
    })

    // it.only('[PENGATURAN-PENGGUNA] - Hapus semua data', () => {
    //   cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click()
     

    //   // Pilih elemen dengan role=menuitem yang memiliki teks 'Hapus'
    //   // cy.get('[role="menuitem"]')
    //   //   .should('be.visible')
    //   //   .click();
    
  
    // })
    
});
