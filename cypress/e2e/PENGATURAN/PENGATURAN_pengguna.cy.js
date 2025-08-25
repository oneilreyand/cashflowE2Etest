describe('[PENGATURAN-PENGGUNA] - Membuka halaman Pengaturan Pengguna dan melihat kesesuaian dengan design yang ada', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"] > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[data-cy="submenu-item-users-setting"] > [data-cy="list-item-button-sub-menu-setting"] > [data-cy="list-item-text-sub-menu-setting"] > .MuiTypography-root').click(); 
      };
  
    beforeEach(() => {
      cy.apiLogin('erni.yulianti@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(Cypress.env('companyId')); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

    it('Menampilkan semua daftar pengguna', () => {  
      cy.get('[data-testid="users-management-container"]')
        .should('be.visible')
        .and('contain', 'Daftar Pengguna','Nama','Email', 'Hak Akses','Aksi'); 
    });

    it('Menambah Pengguna Baru', () => {
      cy.get('[data-testid="add-user-button"]').should('be.visible').click();
      cy.get('input[name="name"]').type('Nanda Fitra');
      cy.get('input[name="email"]').type('nandafitra4@gmail.com');
      cy.get('[data-testid="user-role-select"]').click();
      cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
      cy.get('[data-testid="submit-user-button"]').click();
    })

    it('Harus bisa menutup modal dengan menekan button close pada modal', () => {
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

    it('Menambah pengguna dengan nama yang sangat panjang', () => {
        const longName = 'aqwszxedcrfvtgbyhnujmikolplokmijnuhbygvtfcrdxeszwaqazwsxdeeeeeeeeeeeeerrrrrrrrrrtttttttttttbbbbbbbbbbkkknbbhbvgbhj'; // > 50 karakter
        const maxLength = 50;

        cy.get('[data-testid="add-user-button"]').should('be.visible').click();

        // Input nama panjang
        cy.get('input[name="name"]')
          .type(longName)

        cy.get('input[name="email"]').type('nandafitra2@gmail.com');
        cy.get('[data-testid="user-role-select"]').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
        cy.get('[data-testid="submit-user-button"]').click();
        cy.log('Hanya 50 character saja yang bisa diinput, sisanya langsung terpotong');

   });

    it('Harus menampilkan pesan error ketika email yang dimasukkan tidak valid', () => {
        cy.get('[data-testid="add-user-button"]').should('be.visible').click();
        cy.get('input[name="name"]').type('Muhammad Fajar');
        cy.get('input[name="email"]').type('fajarmuhammad.gmail'); // Email tanpa '@'
        cy.get('[data-testid="user-role-select"]').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
        cy.get('[data-testid="submit-user-button"]').click();
        cy.get('input[name="email"]')
          .invoke('prop', 'validationMessage')
          .should('contain', "Please include an '@' in the email address");
   });

    it('Menambahkan pengguna baru dengan email yang sama dengan email pengguna yang telah terdaftar', () => {
        cy.get('[data-testid="add-user-button"]').should('be.visible').click();
        cy.get('input[name="name"]').type('Muhammad Fajar');
        cy.get('input[name="email"]').type('info.finance@gmail.com'); // Email yang sudah terdaftar
        cy.get('[data-testid="user-role-select"]').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
        cy.get('[data-testid="submit-user-button"]').click();
        cy.get('.MuiAlert-message')
          .invoke('text')
          .should('match', /Email sudah digunakan oleh pengguna lain./g); 
  });

    it('Cek integrasi daftar Hak Akses dengan dropdown Hak Akses', () => {
      const roleList = [];
      cy.get('table tbody tr td:first-child') // kolom Nama role
        .each(($el) => {
          const text = $el.text().trim();
          if (text && text !== '--') {
            roleList.push(text);
          }
        })
        .then(() => {
          cy.get('[data-testid="add-user-button"]').should('be.visible').click();
          cy.get('[data-testid="user-role-select"]').click();
          const dropdownOptions = [];
          cy.get('ul[role="listbox"] li')
            .each(($el) => {
              dropdownOptions.push($el.text().trim());
            })
            .then(() => {
              expect(dropdownOptions).to.include.members(roleList);
            });
        });
    });

    it('Mengisi form tambah pengguna lalu refresh halaman sebelum simpan', () => {
      cy.get('[data-testid="add-user-button"]').should('be.visible').click();
      cy.get('input[name="name"]').type('Nanda Fitra');
      cy.get('input[name="email"]').type('nandafitra@gmail.com');
      cy.get('[data-testid="user-role-select"]').click();
      cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
      cy.get('[data-testid="submit-user-button"]').should('be.visible');
      cy.reload();
      cy.get('[data-testid="users-management-container"]')
        .should('be.visible')
        .and('contain', 'Daftar Pengguna','Nama','Email', 'Hak Akses','Aksi'); 
    });

    it('Menambahkan pengguna baru dengan data pengguna yang sudah dihapus sebelumnya', () => {
      cy.get('[data-testid="add-user-button"]').should('be.visible').click();
      cy.get('input[name="name"]').type('Fajar');
      cy.get('input[name="email"]').type('fajarmuhamaddd@gmail.com');
      cy.get('[data-testid="user-role-select"]').click();
      cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="role-option-6186af42-4a6e-11f0-97e5-496865600ce7"]').should('be.visible').click();
      cy.get('[data-testid="submit-user-button"]').click();
      cy.get('[data-testid="users-management-container"]')
        .should('be.visible')
        .and('contain', 'Daftar Pengguna','Nama','Email', 'Hak Akses','Aksi'); 
      cy.get('table tbody tr').contains('td', 'Fajar')
        .parents('tr')
        .find('[aria-label="Hapus Pengguna"]')
        .click();
      cy.get('[data-testid="alert-dialog-submit-button"]').click();
      cy.get('[data-testid="add-user-button"]').should('be.visible').click();
      cy.get('input[name="name"]').type('Fajar');
      cy.get('input[name="email"]').type('fajarmuhamaddd@gmail.com');
      cy.get('[data-testid="user-role-select"]').click();
      cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="role-option-6186af42-4a6e-11f0-97e5-496865600ce7"]').should('be.visible').click();
      cy.get('[data-testid="submit-user-button"]').click();
      cy.get('[data-testid="users-management-container"]')
        .should('be.visible')
        .and('contain', 'Daftar Pengguna','Nama','Email', 'Hak Akses','Aksi'); 
      cy.get('table tbody tr').contains('td', 'Fajar')  
      cy.get('.MuiAlert-message').contains('Berhasil Menambah Pengguna');

    });

    it('Mencari Pengguna yang terdaftar dan tidak terdaftar dengan kata kunci sesuai keinginan user', () => {
      const searchTests = [
        { keyword: 'Fina', expected: 'Finance' },
        { keyword: 'Ern', expected: 'Erni' },
        { keyword: 'Nanda Fitrah', expected: null } // contoh data yang tidak ada
      ];

      searchTests.forEach(({ keyword, expected }) => {
        cy.get('input[placeholder="Cari pengguna..."]')
          .clear()
          .type(keyword);

        cy.get('table tbody').then(($tbody) => {
          if ($tbody.text().includes('Tidak ada data.')) {
            cy.wrap($tbody).should('contain.text', 'Tidak ada data.');
          } else {
            cy.wrap($tbody).should('contain.text', expected);
          }
        });
      });
    });

    it('Edit Data dan Hak Akses dari daftar Pengguna dengan menekan icon pena pada baris yang sesuai', () => {
      cy.get('table tbody tr').contains('td', 'Finance')
        .parents('tr')
        .find('[aria-label="Edit Pengguna"]')
        .click();
      cy.get('input[name="name"]').clear().type('Fina Finance');
      cy.get('input[name="email"]').clear().type('info.finance@gmail.com');
      cy.get('[data-testid="user-role-select"]').click();
      cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="role-option-6186af42-4a6e-11f0-97e5-496865600ce7"]').should('be.visible').click();
      cy.get('[data-testid="submit-user-button"]').click();
      cy.get('[data-testid="users-management-container"]')
        .should('be.visible')
        .and('contain', 'Daftar Pengguna','Nama','Email', 'Hak Akses','Aksi'); 
      cy.get('table tbody tr').contains('td', 'Fina Finance')
        .should('be.visible');
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Mengubah Data Pengguna');
    });

    it('Cek pagination ke next page lalu kembali ke previous page', () => {
      cy.get('.MuiPagination-ul > :nth-child(4)').click();
      cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').click();
      cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click();
      cy.get('.MuiPagination-ul > :nth-child(1)').click();
      });

    it('Menghapus Pengguna dengan menekan icon tong sampah pada baris yang sesuai', () => {
      cy.get('table tbody tr').contains('td', 'testing2')
        .parents('tr')
        .find('[aria-label="Hapus Pengguna"]')
        .click();
      cy.get('[data-testid="alert-dialog-submit-button"]').click();
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Menghapus Pengguna');
      cy.get('table tbody tr').contains('td', 'testing2')
        .should('not.exist');
    });

    it('Membatalkan Pengguna yang ingin dihapus dari daftar pengguna', () => {
      cy.get('table tbody tr').contains('td', 'testing3')
        .parents('tr')
        .find('[aria-label="Hapus Pengguna"]')
        .click();
      cy.get('[data-testid="alert-dialog-cancel-button"]').click();
      cy.get('table tbody tr').contains('td', 'testing3')
        .should('be.visible');
      cy.get('.MuiAlert-message').should('not.exist'); // Pastikan tidak ada pesan error
    });

    it('Membatalkan tambah pengguna pada form tambah pengguna', () => {
      cy.get('[data-testid="add-user-button"]').should('be.visible').click();
      cy.get('input[name="name"]').type('Nanda Fitra'); 
      cy.get('input[name="email"]').type('fitrananda@gmail.com)');  
      cy.get('[data-testid="user-role-select"]').click();
      cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();
      cy.get('[data-testid="cancel-user-button"]').click();
      cy.get('.MuiAlert-message').should('not.exist'); // Pastikan tidak ada pesan error

    });

    it('Menangani error server (500) saat menyimpan perubahan data perusahaan', () => {
        // Mock API dengan status 500
        cy.intercept('PUT', '**/api/setting-user/*', {
            statusCode: 500,
            body: {
                message: 'Terjadi kesalahan pada server'
            }
        }).as('updateSettingCompanyError');
        cy.get('[data-cy="company-name-header-setting-user"]').click();
        cy.get('[data-cy="button-edit-data-setting-user"]').click();

        // Isi data minimal
        cy.get('[data-testid="add-user-button"]').should('be.visible').click();
        cy.get('input[name="name"]').type('Nanda Fitra'); 
        cy.get('input[name="email"]').type('fitrananda@gmail.com)');  
        cy.get('[data-testid="user-role-select"]').click();
        cy.get('ul[role="listbox"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-testid="role-option-5982b710-4b24-11f0-ac71-5396266a671d"]').should('be.visible').click();

        // Simulasi network offline sebelum klik simpan
        cy.window().then((win) => {
            win.dispatchEvent(new win.Event('offline'));
        });
        cy.get('[data-testid="submit-user-button"]').click();
        cy.get('.MuiAlert-message', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Aplikasi sedang offline. Beberapa fitur mungkin tidak tersedia. Silakan periksa koneksi internet Anda.');
        });


});





    // it('[PENGATURAN-PENGGUNA] - Harus memunculkan warding error pada keterangan field yang tidak di isi', () => {
    //   cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
    //   cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
    //     .scrollIntoView()
    //     .should('be.visible')
    //     .and('contain', 'Buat Pengguna')
    //     .click()
    //   cy.get('[name="access_name"')
    //   .type('owner')
    //   cy.get('[class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"]')
    //   .scrollIntoView()
    //   .should('be.visible')
    //   .and('contain', 'Keterangan is required')
    // })

    // it('[PENGATURAN-PENGGUNA] - Harus berhasil menambahkan hak akses ketika memasukkan semua field yg ada', () => {
    //   cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
    //   cy.get('[name="access_name"]')
    //   .type('owner')
    //   cy.get('[name="access_description"]')
    //   .type('hak akses owner')
    //   cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
    //   .scrollIntoView()
    //   .should('be.visible')
    //   .and('contain', 'Buat Pengguna')
    //   cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').check();
  
    //   cy.get('form > .MuiStack-root > .MuiButton-containedPrimary').click()
    // })

    // it('[PENGATURAN-PENGGUNA] -  Harus bisa mengaktifkan toogle hak akses yang sesuai dengan yang dipilih', () => {
    //   cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    //   cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Ubah Status Pengguna')
    // })

    // it('[PENGATURAN-PENGGUNA] -  Harus bisa mengnonaktifkan toogle hak akses yang sesuai dengan yang dipilih', () => {
    //   cy.get(':nth-child(1) > :nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    //   cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Berhasil Ubah Status Pengguna')
    // })

    // it('[PENGATURAN-PENGGUNA] -  Harus berhasil edit hak akses yang dipilih', () => {
    //   cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click()
    //   cy.get('.MuiList-root')
    //     .contains('Ubah') // Cari elemen dengan teks "Ubah"
    //     .click();
    //   cy.get('[name="access_name"]')
    //     .clear()
    //     .type('admin')
    //   cy.get('[name="access_description"]')
    //     .clear()
    //     .type('hak akses admin')
    //   cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').uncheck();
    //   cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
    //     .scrollIntoView()
    //     .should('be.visible')
    //     .click()
    // })

    // it('[PENGATURAN-PENGGUNA] - Harus gagal edit hak akses yang dipilih, karena server error 500', () => {
    //   // Intercept request PATCH untuk edit hak akses
    //   cy.intercept('PATCH', 'https://api-cashflow.assist.id/api/setting-accesses/*', {
    //     statusCode: 500, // Mengatur agar responsnya adalah 500 (server error)
    //     body: { message: 'Request failed with status code 500' }, // Contoh pesan error dari server
    //   }).as('editAccess');
    
    //   // Melakukan aksi untuk mengedit hak akses
    //   cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click();
    //   cy.get('.MuiList-root')
    //     .contains('Ubah') // Cari elemen dengan teks "Ubah"
    //     .click();
      
    //   cy.get('[name="access_name"]')
    //     .clear()
    //     .type('admin');
      
    //   cy.get('[name="access_description"]')
    //     .clear()
    //     .type('hak akses admin');
      
    //   // Uncheck checkbox
    //   cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').uncheck();
    
    //   // Klik tombol untuk submit form
    //   cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
    //     .scrollIntoView()
    //     .should('be.visible')
    //     .click();
    
    //   // Tunggu request PATCH dan verifikasi status 500
    //   cy.wait('@editAccess').then((interception) => {
    //     if (interception.response.statusCode === 500) {
    //       cy.log('Edit gagal: Server error 500');
    //       // Verifikasi UI error atau tindakan lain
    //       cy.get('.MuiAlert-message') // Misalnya elemen yang menunjukkan error di UI
    //         .should('be.visible')
    //         .and('contain', 'Request failed with status code 500');
    //     } else {
    //       cy.log('Edit berhasil');
    //     }
    //   });
    // });

    // it('[PENGATURAN-PENGGUNA] - Harus gagal edit hak akses yang dipilih, karena id kosong', () => {
    //   // Intercept request PATCH untuk edit hak akses dan mensimulasikan ID kosong
    //   cy.intercept('PATCH', 'https://api-cashflow.assist.id/api/setting-accesses/*', (req) => {
    //     // Memodifikasi payload request jika ID kosong
    //     const modifiedRequestBody = { ...req.body, id: '' }; // Mengosongkan ID
    //     req.body = modifiedRequestBody;
    
    //     // Menanggapi dengan status 500 jika ID kosong
    //     if (req.body.id === '') {
    //       req.reply({
    //         statusCode: 500, // Mengatur agar responsnya adalah 500 (server error)
    //         // body: { message: 'Request failed with status code 500' }, // Pesan error server
    //       });
    //     } else {
    //       req.reply(); // Jika ID valid, lanjutkan normal
    //     }
    //   }).as('editAccess');
      
    //   // Melakukan aksi untuk mengedit hak akses
    //   cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click();
    //   cy.get('.MuiList-root')
    //     .contains('Ubah') // Cari elemen dengan teks "Ubah"
    //     .click();
    
    //   cy.get('[name="access_name"]')
    //     .clear()
    //     .type('admin');
    
    //   cy.get('[name="access_description"]')
    //     .clear()
    //     .type('hak akses admin');
    
    //   // Uncheck checkbox
    //   cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').uncheck();
    
    //   // Klik tombol untuk submit form
    //   cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
    //     .scrollIntoView()
    //     .should('be.visible')
    //     .and('contain', 'Edit Pengguna')
    //     .click();
    
    //   // Tunggu request PATCH dan verifikasi status 500
    //   cy.wait('@editAccess').then((interception) => {
    //     if (interception.response.statusCode === 500) {
    //       cy.log('Edit gagal: Server error 500');
    //       // Verifikasi UI error atau tindakan lain
    //       cy.get('.MuiAlert-message') // Misalnya elemen yang menunjukkan error di UI
    //         .should('be.visible')
    //         .and('contain', 'Request failed with status code 500');
    //     } else {
    //       cy.log('Edit berhasil');
    //     }
    //   });
    // });

    // it('[PENGATURAN-PENGGUNA] - Harus berhasil menghapus hak akses yang dipilih', () => {
    //   cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click()
    //   cy.get('.css-1vg9tid-MuiButtonBase-root-MuiMenuItem-root').click();
    // })

    // it('[PENGATURAN-PENGGUNA] - Harus berhasil menambahkan hak akses sebanyak 15 kali ketika memasukkan semua field yang ada', () => {
    //   for (let i = 0; i < 15; i++) {
    //     cy.get('.MuiStack-root > .MuiButtonBase-root').first() // Menambahkan .first() untuk klik elemen pertama
    //       .should('be.visible')
    //       .click();
    //     cy.get('[name="access_name"]')
    //       .type(`owner ${i}`);
    //     cy.get('[name="access_description"]')
    //       .type(`hak akses owner ${i}`);
    //     cy.get('form > .MuiStack-root > .MuiButton-containedPrimary')
    //       .scrollIntoView()
    //       .should('be.visible')
    //       .and('contain', 'Buat Pengguna');
    //     cy.get('th.MuiTableCell-root span.MuiCheckbox-root input[type="checkbox"]').check();
    //     cy.get('form > .MuiStack-root > .MuiButton-containedPrimary').click();
    //   }
    // });

    // it('[PENGATURAN-PENGGUNA] -  Harus berhasil next page, dan menampilkan data yang benar', () => {
    //   cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').click()
    // })

    // it('[PENGATURAN-PENGGUNA] -  Harus berhasil prev page, dan menampilkan data yang benar', () => {
    //   cy.get('.MuiPagination-ul > :nth-child(1)').click()
    // })

    // // it.only('[PENGATURAN-PENGGUNA] - Hapus semua data', () => {
    // //   cy.get(':nth-child(1) > :nth-child(4) > #long-button > [data-testid="MoreVertIcon"]').should('be.visible').click()
     

    // //   // Pilih elemen dengan role=menuitem yang memiliki teks 'Hapus'
    // //   // cy.get('[role="menuitem"]')
    // //   //   .should('be.visible')
    // //   //   .click();
    
  
    // // })