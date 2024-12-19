describe('[PENGATURAN-SATUAN]', () => {
    const navigatePengaturan = () => {
        cy.get('[data-testid="drawer-item-settings"]').click();
      };
  
    beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
      navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });
  
    it('Chek kesesuainan halaman Pengaturan Satuan dengan design yang ada', () => {
       cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
       cy.get('.MuiTypography-h5').should('be.visible').and('contain', 'Pengaturan Satuan')
       cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').and('contain', 'Tambah Satuan')
       cy.get('[data-cy="all-units-title-settings-unit"]').should('be.visible').and('contain', 'Semua Satuan')
    });

    it('Harus memunculkan tulisan tidak ada data pada data tabel satuan, dan posisinya harus di tengah', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
    })

    it('Harus memunculkan tulisan tidak ada data pada data tabel satuan, dan posisinya harus di tengah', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[data-cy="all-units-title-settings-unit"]').should('be.visible').and('contain', 'Semua Satuan')
      cy.get('[data-cy="unit-type-header-settings-unit"]')
      cy.get('[data-cy="unit-desc-header-settings-unit"]')
      cy.get('[data-cy="unit-action-header-settings-unit"]')
      cy.get('[name="unitType"]')
      .invoke('attr', 'placeholder')
      .should('eq', 'Masukkan jenis satuan');
      cy.get('[name="unitDesc"]')
      .invoke('attr', 'placeholder')
      .should('eq', 'Keterangan disini');
      cy.get('[data-cy="cancel-button-settings-unit"]').should('be.visible').and('contain', 'Batalkan')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').should('be.visible').and('contain', 'Simpan')
    })

    it('harus bisa menampilkan modal batal menambah satuan data', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[data-cy="cancel-button-settings-unit"]').should('be.visible').click()
    })

    it('harus bisa menambah data satuan dengan keterangan tidak di isi', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitType"]').type('unit')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('harus bisa menambah data satuan dengan jenis satuan tidak di isi', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitDesc"]').type('unit')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('harus bisa menambah data satuan dengan semua data di isi', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitType"]').type('unit')
      cy.get('[name="unitDesc"]').type('unit')
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('harus bisa menambah data satuan dengan dengan semua data tidak', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
      cy.get('[name="unitType"]').clear()
      cy.get('[name="unitDesc"]').clear()
      cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
    })

    it('Dapat mencari data satuan dengan keyword yg ada pada list data', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      // cy.get('[data-cy="delete-unit-button-0-settings-unit"]').should('be.visible').click()
      cy.get('[data-cy="search-unit-input-settings-unit"] > .MuiInputBase-root').type('unit')
    })

    it('Dapat mencari data satuan dengan keyword yg tidak ada pada list data', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      // cy.get('[data-cy="delete-unit-button-0-settings-unit"]').should('be.visible').click()
      cy.get('[data-cy="search-unit-input-settings-unit"] > .MuiInputBase-root').type('asist')
      cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
    })

    it('Dapat mencari data satuan dengan keyword yg tidak ada pada list data', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
      cy.get('[data-cy="delete-unit-button-0-settings-unit"]').click()
      cy.get('.MuiAlert-message')
    })

    it('harus bisa menambah data satuan dengan semua data di isi sebanyak 15 kali', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
    
      for (let i = 1; i <= 15; i++) {
        cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click();
        
        cy.get('[name="unitType"]').type(`unit ${i}`);
        cy.get('[name="unitDesc"]').type(`deskripsi unit ${i}`);
        
        cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click();
      }
    });

    it('Harus bisa mengganti pagination ke halaman selanjutnya', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4)').click()
    })

    it('Harus bisa mengganti pagination ke halaman sebelumnya', () => {
      cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
      cy.get('.MuiPagination-ul > :nth-child(4)').click()
      cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
    })
});

// describe('[PENGATURAN-SATUAN] - Membuka halaman pengaturan satuan data tidak ada', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Harus memunculkan tulisan tidak ada data pada data tabel satuan, dan posisinya harus di tengah', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data')
//   })
// })

// describe('[PENGATURAN-SATUAN] - Membuka modal tambah satuan dan melihat kesesuaian form dengan design', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Harus memunculkan tulisan tidak ada data pada data tabel satuan, dan posisinya harus di tengah', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
//     cy.get('[data-cy="all-units-title-settings-unit"]').should('be.visible').and('contain', 'Semua Satuan')
//     cy.get('[data-cy="unit-type-header-settings-unit"]')
//     cy.get('[data-cy="unit-desc-header-settings-unit"]')
//     cy.get('[data-cy="unit-action-header-settings-unit"]')
//     cy.get('[name="unitType"]')
//     .invoke('attr', 'placeholder')
//     .should('eq', 'Masukkan jenis satuan');
//     cy.get('[name="unitDesc"]')
//     .invoke('attr', 'placeholder')
//     .should('eq', 'Keterangan disini');
//     cy.get('[data-cy="cancel-button-settings-unit"]').should('be.visible').and('contain', 'Batalkan')
//     cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').should('be.visible').and('contain', 'Simpan')
//   })
// })

// describe('[PENGATURAN-SATUAN] - Batal menambah satuan data', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa menampilkan modal batal menambah satuan data', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
//     cy.get('[data-cy="cancel-button-settings-unit"]').should('be.visible').click()
//   })
// })

// describe('[PENGATURAN-SATUAN] - Menambah satuan data, data keterangan tidak diisi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa menambah data satuan dengan keterangan tidak di isi', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
//     cy.get('[name="unitType"]').type('unit')
//     cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
//   })
// })

// describe('[PENGATURAN-SATUAN] - Menambah satuan data, data jenis satuan tidak diisi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa menambah data satuan dengan jenis satuan tidak di isi', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
//     cy.get('[name="unitDesc"]').type('unit')
//     cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
//   })
// })

// describe('[PENGATURAN-SATUAN] - Menambah satuan data, semua data di isi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa menambah data satuan dengan semua data di isi', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
//     cy.get('[name="unitType"]').type('unit')
//     cy.get('[name="unitDesc"]').type('unit')
//     cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
//   })
// })

// describe('[PENGATURAN-SATUAN] - Menambah satuan data, semua data tidak di isi', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa menambah data satuan dengan dengan semua data tidak', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click()
//     cy.get('[name="unitType"]').clear()
//     cy.get('[name="unitDesc"]').clear()
//     cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click()
//   })
// })

// describe('[PENGATURAN-SATUAN] - Mencari data satuan, data ada', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Dapat mencari data satuan dengan keyword yg ada pada list data', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     // cy.get('[data-cy="delete-unit-button-0-settings-unit"]').should('be.visible').click()
//     cy.get('[data-cy="search-unit-input-settings-unit"] > .MuiInputBase-root').type('unit')
//   })
// })

// describe('[PENGATURAN-SATUAN] - Mencari data satuan, data tidak ada', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Dapat mencari data satuan dengan keyword yg tidak ada pada list data', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     // cy.get('[data-cy="delete-unit-button-0-settings-unit"]').should('be.visible').click()
//     cy.get('[data-cy="search-unit-input-settings-unit"] > .MuiInputBase-root').type('asist')
//     cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('be.visible').and('contain', 'Tidak ada data.')
//   })
// })

// describe('[PENGATURAN-SATUAN] - Mencari data satuan, data tidak ada', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('Dapat mencari data satuan dengan keyword yg tidak ada pada list data', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click()
//     cy.get('[data-cy="delete-unit-button-0-settings-unit"]').click()
//     cy.get('.MuiAlert-message')
//   })
// })

// describe('[PENGATURAN-SATUAN] - Menambah data satuan dengan semua data di isi sebanyak 10 kali', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });

//   it('harus bisa menambah data satuan dengan semua data di isi sebanyak 10 kali', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
  
//     for (let i = 1; i <= 10; i++) {
//       cy.get('.MuiStack-root > [data-cy="add-unit-button-settings-unit"]').should('be.visible').click();
      
//       cy.get('[name="unitType"]').type(`unit ${i}`);
//       cy.get('[name="unitDesc"]').type(`deskripsi unit ${i}`);
      
//       cy.get('[data-cy="button-save-new-data-unit-settings-unit"]').click();
//     }
//   });
// })

// describe('[PENGATURAN-SATUAN] - Next pagination', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });
//   it('Harus bisa mengganti pagination ke halaman selanjutnya', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
//     cy.get('.MuiPagination-ul > :nth-child(4)').click()
//   })
// })

// describe('[PENGATURAN-SATUAN] - prev pagination', () => {
//   const navigatePengaturan = () => {
//     cy.get('[data-testid="drawer-item-settings"]').click();
//   };

//   beforeEach(() => {
//     cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
//     cy.visitDashboard(); // Visit the dashboard after successful login
//     navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
//   });
//   it('Harus bisa mengganti pagination ke halaman sebelumnya', () => {
//     cy.get('[data-cy="submenu-item-unit-setting"] > [data-cy="list-item-button-sub-menu-setting"]').click();
//     cy.get('.MuiPagination-ul > :nth-child(4)').click()
//     cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').click()
//   })
// })
