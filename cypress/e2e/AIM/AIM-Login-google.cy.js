describe('AIM - LOGIN - GOOGLE', () => {
    it('should login to Google and save session', () => {
      cy.visit('https://accounts.google.com');
      
      // Masukkan email dan lanjutkan
      cy.get('input[type="email"]').type('reyand.oneil@assist.id'); // Ganti dengan email Google Anda
      cy.get('#identifierNext').click();
  
      // Masukkan password dan lanjutkan
      cy.get('#password').should('be.visible').type('12345678'); // Ganti dengan password Google Anda
      cy.get('#passwordNext').click();
  
      // Tunggu hingga login selesai dan simpan sesi
      cy.wait(3000); // Tunggu beberapa detik hingga login selesai
      cy.getCookies().then((cookies) => {
        cy.writeFile('cypress/fixtures/google-session.json', cookies);
      });
    });
  });
  