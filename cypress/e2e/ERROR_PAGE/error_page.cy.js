describe('ERROR PAGE', () => {
    const navigatePengaturan = () => {
        // cy.get('[data-testid="drawer-item-settings"]').click();
      };
    
      beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
    //   navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

      it('harus bisa menampilkan halaman error ketika urlnya salah', () => {
        cy.visit('http://localhost:5173/admin/dashboard/sahd')
      })
});

describe('[ERROR PAGE] - Kembali ke halaman utama, dengan menekan tombol balik ke halaman utama', () => {
    const navigatePengaturan = () => {
        // cy.get('[data-testid="drawer-item-settings"]').click();
      };
    
      beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
    //   navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

      it('harus bisa kembali ke halaman utama ketika masuk ke error pa', () => {
        cy.visit('http://localhost:5173/admin/dashboard/sahd')
        cy.get('.MuiButton-contained').click()
      })
});

describe('[ERROR PAGE] - Kembali ke halaman utama, balik ke halaman sebelumnya', () => {
    const navigatePengaturan = () => {
        // cy.get('[data-testid="drawer-item-settings"]').click();
      };
    
      beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
    //   navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

      it('harus bisa kembali ke halaman utama ketika masuk ke error pa', () => {
        cy.visit('http://localhost:5173/admin/dashboard/sahd')
        cy.get('.MuiButton-outlined').click()
      })
});

describe('[ERROR PAGE] - Dengan menekan tombol back pada browser', () => {
      beforeEach(() => {
      cy.apiLogin('reyand.oneil@assist.id', '12345678'); // Login using valid credentials
      cy.visitDashboard(); // Visit the dashboard after successful login
    //   navigatePengaturan(); // Navigate to "Tambah Kontak" page for each test
      });

      it('harus bisa kembali ke halaman utama ketika masuk ke error pa', () => {
        cy.visit('http://localhost:5173/admin/dashboard/sahd')
        cy.go('back'); // Atau gunakan cy.go(-1)
      })
});