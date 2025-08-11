describe('AIM-LOGIN-EMAIL', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('harus memuat halaman login dan memeriksa kolom email dan password', () => {
        // cy.url().should('eq', 'https://cashflow.assist.id/')
        cy.get('.makeStyles-logo-4').should('be.visible')
        cy.get('[data-testid="login-title"]').should('be.visible').and('contain', 'Masuk ke akunmu')
        cy.get('[data-testid="login-subtitle"]').should('be.visible').and('contain', 'Masukkan email dan passwordmu yang terdaftar dibawah ini')
        cy.get('#email').should('be.visible')
        cy.get(':nth-child(1) > .MuiFormLabel-root').should('be.visible').and('contain', 'Alamat email')
        cy.get('#password').should('be.visible')
        cy.get(':nth-child(2) > .MuiFormLabel-root').should('be.visible').and('contain', 'Password')
        cy.get('[data-testid="login-submit-button"]').should('be.visible')
        cy.get('[data-testid="login-google-button"]').should('be.visible')
     
        // Ambil screenshot
        // cy.screenshot('halaman-login-termuat');
      })

    it('harus menampilkan pesan kesalahan untuk format email yang kosong', () => {
        cy.get('#email').clear()
        cy.get('#password').should('be.visible').type('23482349327')
        cy.get('[data-testid="login-submit-button"]').click()
        cy.get('#email-helper-text').should('be.visible').and('contain', 'Email adalah bidang yang diperlukan')
    })

    it('harus menampilkan pesan kesalahan untuk format email tidak valid', () => {
        cy.get('#email').should('be.visible').type('invalid-email')
        cy.get('#password').should('be.visible').type('23482349327')
        cy.get('[data-testid="login-submit-button"]').click()
        cy.get('#email-helper-text').should('be.visible').and('contain', 'Email harus menjadi email yang valid')
    })

    it('harus menampilkan pesan kesalahan untuk format password yang kosong', () => {
        cy.get('#email').type('reyand.oneil@assist.id')
        cy.get('#password').should('be.visible').clear()
        cy.get('[data-testid="login-submit-button"]').click()
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Password adalah bidang yang diperlukan')
    })

    it('harus mengubah visibilitas password saat tombol diklik dari password menjadi text', () => {
        cy.get('#email').type('reyand.oneil@assist.id');
        cy.get('#password').type('PasswordRahasia123');
        cy.get('#password').should('have.attr', 'type', 'password');
        cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get('#password').should('have.attr', 'type', 'text');
    });

    it('harus mengubah visibilitas password saat tombol diklik dari text menjadi password', () => {
    cy.get('#email').type('reyand.oneil@assist.id');
    cy.get('#password').type('PasswordRahasia123');
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('#password').should('have.attr', 'type', 'password');
    });

    it('menampilkan pesan kesalahan jika email atau password salah', () => {
        cy.get('#email').type('email.salah@assist.id');
        cy.get('#password').type('passwordSalah123');
        cy.get('[data-testid="login-submit-button"]').click();
     
        // Verifikasi pesan kesalahan muncul
        // Catatan error messagenya harus di sesuaikan ke bahasa indonesia agar konsisten APP
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Login failed: Error: Account not found');
    });

    it('mengalihkan ke halaman login jika mencoba mengakses dashboard tanpa autentikasi', () => {
        cy.visit('/admin/dashboard', { failOnStatusCode: false });
        cy.url().should('include', '/auth/login');
        cy.get('[data-testid="login-title"]').should('be.visible').and('contain', 'Masuk ke akunmu');
    });

    it('login dengan format email dan password yang valid', () => {
        const expectedUrl = `${Cypress.config('baseUrl')}/admin/dashboard`
        cy.get('#email').type('reyand.oneil@assist.id');
        cy.get('#password').type('12345678');
        cy.get('[data-testid="login-submit-button"]').click();
        cy.url().should('eq', expectedUrl);
        // Verifikasi elemen dengan teks 'Dashboard' muncul
    });
})