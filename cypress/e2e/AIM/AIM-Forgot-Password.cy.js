describe('AIM-Forgot Password', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Memuat halaman login, periksa form email dan password, lalu navigasi ke halaman lupa password', () => {
        cy.get('.makeStyles-logo-4').should('be.visible');
      cy.get('[data-testid="login-title"]').should('be.visible').and('contain', 'Masuk ke akunmu');
      cy.get('[data-testid="login-forgot-password"]').should('be.visible').click();
  
      // Pastikan navigasi ke halaman lupa password berhasil
    //   cy.url().should('eq', '/auth/forgot-password');
      cy.get('[data-testid="forgotPassword-title"]').should('be.visible').and('contain', 'Pulihkan Akun Sekarang');
      cy.get('#email').should('be.visible');
      cy.get('[data-testid="forgotPassword-submit-button"]').should('be.visible').and('contain', 'Kirim Reset Link');
    });
  
    it('Menampilkan pesan kesalahan ketika mencoba mengirim form lupa password dengan email kosong', () => {
      cy.get('[data-testid="login-forgot-password"]').click();
    //   cy.url().should('eq', '/auth/forgot-password');
  
      // Klik tombol submit tanpa mengisi email
      cy.get('[data-testid="forgotPassword-submit-button"]').click();
  
      // Verifikasi pesan error untuk email kosong
      cy.get('#email-helper-text').should('be.visible').and('contain', 'Email adalah bidang yang diperlukan');
    });
  
    it('Menampilkan pesan kesalahan ketika mengirim form dengan format email yang salah (tanpa simbol "@")', () => {
      cy.get('[data-testid="login-forgot-password"]').click();
    //   cy.url().should('eq', '/auth/forgot-password');
  
      // Masukkan email yang tidak valid (tanpa '@')
      cy.get('#email').type('usergmail.com');
  
      // Klik tombol submit
      cy.get('[data-testid="forgotPassword-submit-button"]').click();
  
      // Verifikasi pesan error untuk format email yang salah
      cy.get('#email-helper-text').should('be.visible').and('contain', 'Email harus menjadi email yang valid');
    });
  
    it('Menampilkan pesan kesalahan ketika mengirim form dengan format email yang salah (hanya domain)', () => {
      cy.get('[data-testid="login-forgot-password"]').click();
    //   cy.url().should('eq', '/auth/forgot-password');
  
      // Masukkan email yang tidak valid (hanya domain)
      cy.get('#email').type('@gmail.com');
  
      // Klik tombol submit
      cy.get('[data-testid="forgotPassword-submit-button"]').click();
  
      // Verifikasi pesan error untuk format email yang salah
      cy.get('#email-helper-text').should('be.visible').and('contain', 'Email harus menjadi email yang valid');
    });
  
    it('Menampilkan pesan kesalahan ketika mengirim form lupa password dengan email yang tidak terdaftar', () => {
      cy.get('[data-testid="login-forgot-password"]').click();
    //   cy.url().should('eq', '/auth/forgot-password');
  
      // Masukkan email yang tidak terdaftar
      cy.get('#email').type('tidak.ada@assist.id');
  
      // Klik tombol submit
      cy.get('[data-testid="forgotPassword-submit-button"]').click();
  
      // Verifikasi pesan error untuk email yang tidak ditemukan
      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('be.visible').and('contain', 'Account not found');
    });
  
    it('Berhasil mengirim form lupa password dengan email yang benar', () => {
      cy.get('[data-testid="login-forgot-password"]').click();
    //   cy.url().should('eq', '/auth/forgot-password');
  
      cy.get('#email').type('reyand.oneil@assist.id');
  
      cy.intercept('POST', 'https://api-cashflow.assist.id/api/forgot-password').as('forgotPasswordRequest');
  
      cy.get('[data-testid="forgotPassword-submit-button"]').click();
  
      cy.wait('@forgotPasswordRequest').then((interception) => {
        if (interception.response && interception.response.statusCode === 200) {
          cy.get('.MuiSnackbar-root > .MuiPaper-root')
            .should('be.visible')
            .and('contain', 'Reset link telah dikirim ke email kamu')
            .then(() => {
              // Ambil screenshot jika permintaan berhasil
              cy.screenshot('forgot-password-success');
            });
        } else {
          cy.log('Request gagal atau status kode bukan 200');
          // Ambil screenshot jika permintaan gagal
          cy.screenshot('forgot-password-failure');
        }
      });
  
      cy.get('[data-testid="forgotPassword-success-image"]').should('be.visible');
      cy.get('[data-testid="forgotPassword-success-message"]')
        .should('be.visible')
        .and('contain', 'Silahkan cek inbox di email kamu');
      cy.get('[data-testid="forgotPassword-login-button"]').should('be.visible').click();
    });
  
    it('Dapat kembali ke halaman login dari halaman lupa password', () => {
      cy.get('[data-testid="login-forgot-password"]').click();
      cy.get('[data-testid="forgotPassword-back-to-login-button"]').click();
      cy.get('[data-testid="login-title"]').should('be.visible').and('contain', 'Masuk ke akunmu');
    });
  });