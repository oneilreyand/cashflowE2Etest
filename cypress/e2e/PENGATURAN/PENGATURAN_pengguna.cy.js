describe('[PENGATURAN-PENGGUNA] - Membuka halaman Pengaturan Pengguna dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"] > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[data-cy="submenu-item-users-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click(); 
      };
  
    beforeEach(() => {
      cy.apiLogin('erni.yulianti@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

    it('Menampilkan semua daftar pengguna', () => {  
      cy.get('[data-testid="users-management-container"]')
        .should('be.visible')
        .and('contain', 'Daftar Pengguna','Nama','Email', 'Hak Akses','Aksi'); 
    });

    it.only('[PENGATURAN-PENGGUNA] - Menambah Pengguna Baru', () => {
      cy.get('[data-testid="add-user-button"]').should('be.visible').click();
      cy.get('input[name="name"]').type('Nanda Fitra');
      cy.get('input[name="email"]').type('nanda@gmail.com');
      cy.get('[data-testid="user-role-select"]').click();
      cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
      cy.get('[data-testid="submit-user-button"]').click();
    })

    it('[PENGATURAN-PENGGUNA] - Harus bisa menutup modal dengan menekan button close pada modal', () => {
      cy.get('[data-testid="add-user-button"]').should('be.visible').click();
      cy.get('[data-testid="cancel-user-button"]').click();
      cy.get('[data-testid="users-management-container"]')
        .should('be.visible')
        .and('contain', 'Daftar Pengguna','Nama','Email', 'Hak Akses','Aksi'); 
    })

    it('Mengosongkan requirement field pada form menambah pengguna baru', () => {
        cy.get('[data-testid="add-user-button"]').should('be.visible').click();
        cy.get('input[name="name"]').clear();
        cy.get('input[name="email"]').clear();
        cy.get('[data-testid="submit-user-button"]').click();
        cy.get('.MuiFormHelperText-root')
        .invoke('text')
        .should('match', / is required/g);
    });

    it('[PENGATURAN-PENGGUNA] - Menambah pengguna dengan nama yang sangat panjang', () => {
        const longName = 'aqwszxedcrfvtgbyhnujmikolplokmijnuhbygvtfcrdxeszwaqazwsxdeeeeeeeeeeeeerrrrrrrrrrtttttttttttbbbbbbbbbbkkknbbhbvgbhj'; // > 50 karakter
        const maxLength = 50;

        cy.get('[data-testid="add-user-button"]').should('be.visible').click();

        // Input nama panjang
        cy.get('input[name="name"]')
          .type(longName)

        cy.get('input[name="email"]').type('nanda@gmail.com');
        cy.get('[data-testid="user-role-select"]').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
        cy.get('[data-testid="submit-user-button"]').click();

  });


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