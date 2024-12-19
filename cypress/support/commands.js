// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('handleUncaughtExceptions', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Prevent Cypress from failing the test on uncaught exceptions
        return false;
    });
});

Cypress.Commands.add('apiLogin', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://api-cashflow.assist.id/api/login', // Pastikan ini URL API login yang benar
        headers: {
            'Content-Type': 'application/json'
        },
        body: { email, password }
    }).then((response) => {
        // Verifikasi bahwa login berhasil
        expect(response.status).to.eq(200);

        // Ambil token dari respons
        const token = response.body.token;
        
        // Simpan token di cookie dan localStorage sesuai kebutuhan aplikasi
        cy.setCookie('token', token);
        window.localStorage.setItem('token', token); // Simpan juga di localStorage
    });
});

Cypress.Commands.add('visitDashboard', () => {
    cy.visit('/admin/dashboard', {
        onBeforeLoad(win) {
            // Inject token sebelum halaman dimuat jika aplikasi membacanya dari localStorage
            win.localStorage.setItem('token', window.localStorage.getItem('token'));
        }
    });
});

Cypress.Commands.add('verifyVisibility', (selector, text = '', timeout = 10000) => {
    cy.get(selector, { timeout }).should('be.visible');
    if (text) {
      cy.get(selector).should('contain', text);
    }
  });
  
  Cypress.Commands.add('verifyPageContent', (selector, text, timeout) => {
    cy.get(selector, { timeout }).should('be.visible').and('contain', text);
  });

  Cypress.Commands.add('navigateToKontak', (selector, text, timeout) => {
    cy.get('[data-testid="drawer-item-contacts"]').click();
    cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts');
  });