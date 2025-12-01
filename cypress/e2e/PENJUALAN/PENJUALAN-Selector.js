// JUDUL
export const judulH5 = () => cy.get('.MuiTypography-h5 > span');


// BREADCRUMB
export const breadcrumb = () => cy.get('.MuiBreadcrumbs-ol > li');
export const breadcrumb1 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(1)');
export const breadcrumb2 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(2)');
export const breadcrumb3 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(3)');
export const breadcrumb4 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(4)');
export const breadcrumb5 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(5)');
export const breadcrumb6 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(6)');
export const breadcrumb7 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(7)');
export const breadcrumb8 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(8)');
export const breadcrumb9 = () => cy.get('.MuiBreadcrumbs-ol > :nth-child(9)');


// CARD CONTAINER
export const cardContainer = () => cy.get('.MuiCardContent-root > *');


// CARD TITLE
export const titleCardBelumDibayar = () =>
  cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root');

export const titleCardTelatDibayar = () =>
  cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root');

export const titleCardPelunasan = () =>
  cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root');


// BADGE CARD
export const badgeCardBelumDibayar = () =>
  cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root');

export const badgeCardTelatDibayar = () =>
  cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root');

export const badgeCardPelunasan = () =>
  cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiBadge-root > .MuiTypography-root');


// SUBTITLE
export const subtitleCardBelumDibayar = () =>
  cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2');

export const subtitleCardTelatDibayar = () =>
  cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2');

export const subtitleCardPelunasan = () =>
  cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-body2');


// NOMINAL
export const nominalCardBelumDibayar = () =>
  cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5');

export const nominalCardTelatDibayar = () =>
  cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5');

export const nominalCardPelunasan = () =>
  cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > * > .MuiStack-root > .MuiTypography-h5');


// TAB LIST
export const tabList = () => cy.get('.MuiTabs-list > [role="tab"]');
export const tabListSemua = () => cy.get('.MuiTabs-list > :nth-child(1)');
export const tabListBelumDibayar = () => cy.get('.MuiTabs-list > :nth-child(2)');
export const tabListJatuhTempo = () => cy.get('.MuiTabs-list > :nth-child(3)');
export const tabListLunas = () => cy.get('.MuiTabs-list > :nth-child(4)');
export const tabListDibayarSebagian = () => cy.get('.MuiTabs-list > :nth-child(5)');
export const tabListVoid = () => cy.get('.MuiTabs-list > :nth-child(6)');


// FILTER TANGGAL
export const filterTanggal = () => cy.get('.MuiBox-root > .MuiButtonBase-root');

export const filterTanggalAwalLabel = () =>
  cy.get('.MuiFormLabel-root.MuiInputLabel-root').eq(0);

export const filterTanggalAkhirLabel = () =>
  cy.get('.MuiFormLabel-root.MuiInputLabel-root').eq(1);

export const fieldTanggalAwal = () =>
  cy.get('[placeholder="DD/MM/YYYY"]').eq(0);

export const fieldTanggalAkhir = () =>
  cy.get('[placeholder="DD/MM/YYYY"]').eq(1);

export const tombolResetTanggal = () => cy.get('button').contains('Reset all');
export const tombolApplyTanggal = () => cy.get('button').contains('Apply');


// SEARCH INPUT
export const searchInput = () => cy.get('[placeholder="Cari"]');


// TABLE 
export const table = () => cy.get('table');

export const tableRow = () => cy.get('table tbody tr');

export const tableHead = () => cy.get('.MuiTableCell-head');
export const tableHead1 = () => cy.get('.MuiTableCell-head').eq(0);
export const tableHead2 = () => cy.get('.MuiTableCell-head').eq(1);
export const tableHead3 = () => cy.get('.MuiTableCell-head').eq(2);
export const tableHead4 = () => cy.get('.MuiTableCell-head').eq(3);
export const tableHead5 = () => cy.get('.MuiTableCell-head').eq(4);
export const tableHead6 = () => cy.get('.MuiTableCell-head').eq(5);
export const tableHead7 = () => cy.get('.MuiTableCell-head').eq(6);
export const tableHead8 = () => cy.get('.MuiTableCell-head').eq(7);

export const skeleton = () => cy.get('MuiSkeleton-root');

// PAGINATION
export const paginationLabel = () => cy.contains('p', 'Menampilkan ');

export const paginationButton = () => cy.get('.MuiPagination-ul');
export const paginationButton1 = () => cy.get('.MuiPagination-ul > :nth-child(1)');
export const paginationButton2 = () => cy.get('.MuiPagination-ul > :nth-child(2)');
export const paginationButton3 = () => cy.get('.MuiPagination-ul > :nth-child(3)');
export const paginationButton4 = () => cy.get('.MuiPagination-ul > :nth-child(4)');
export const paginationButton5 = () => cy.get('.MuiPagination-ul > :nth-child(5)');
export const paginationButton6 = () => cy.get('.MuiPagination-ul > :nth-child(6)');
export const paginationButton7 = () => cy.get('.MuiPagination-ul > :nth-child(7)');
export const paginationButton8 = () => cy.get('.MuiPagination-ul > :nth-child(8)');
export const paginationButton9 = () => cy.get('.MuiPagination-ul > :nth-child(9)');

// Alert
export const alert = () => cy.get('.MuiAlert-message');
