describe("Seeding add new company", () => {
beforeEach(() => {
  cy.apiLogin("rayhanrayandra.work.id@gmail.com", "12345678");
});

it('Request Buat Company', () => {
  // Ambil token dari cookie
  cy.getCookie('token').then((cookie) => {
    const token = cookie.value;

    // Pastikan token ada
    expect(token).to.exist;

    cy.request({
      method: 'POST',
      url: 'https://api-uat-cashbook.assist.id/api/companies',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        companyName: "ElixirChemical",
        officePhoneNumber: "621234567890",
        officeEmail: "Exl.Chemics@gmail.com",
        officeAddress: "alamat",
        province: "RIAU",
        city: "PEKANBARU",
        postalCode: "28288",
        industry: "Layanan Kesehatan",
        companySize: "0 - 10 Karyawan"
      }
    }).then((response) => {
      // Cek status respons
      expect(response.status).to.eq(200); // biasanya create return 201
      cy.log('Company berhasil dibuat dengan id: ' + response.body.id);
    });
  });
});

});

