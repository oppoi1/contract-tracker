import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  'en': {
    // partner details
    partnerDetails: 'Partner details: ',
    company: 'Company:',
    contact: 'Contact:',
    address: 'Address:',
    branch: 'Branch:',
    phone: 'Phone:',

    // contract details
    contract: 'Contract Id:',
    contractStart: 'Contract Start:',
    contractEnds: 'Contract Ends:',
    contractCat: 'Contract Category:',
    contractObjectives: 'Contract Objectives:',
    pricePerMonth: 'Price per Month: ',
    futuresObjectives: 'Future Objectives',
    misc: 'Miscellaneous:',

    // buttons
    create: 'create',
    edit: 'edit',
    delete: 'delete',
    logout: 'logout',
    signUp: 'sign Up',
    login: 'login',

    // menu items
    menuContracts: 'Contracts',
    menuOverview: 'Overview',
    menuAddContracts: 'Add Contracts',
    menuAddPartner: 'Add Partner',
    menuCategories: 'Categories',

    // contract table
    tblContract: 'Contract',
    tblPartner: 'Partner',
    tblCategory: 'Category',
    tblDate: 'Date',
    tblDuration: 'Duration',
    tblCreatedBy: 'Created By',
    tblCreated: 'Created',

    // search label
    lblSearch: 'Search by Number',
  },
  'de': {
    // partner details
    partnerDetails: 'Partner Eigenschaften: ',
    company: 'Firma:',
    contact: 'Kontakt:',
    address: 'Adresse:',
    branch: 'Abteilung:',
    phone: 'Telefon:',

    // contract details
    contract: 'Vertragsnummer:',
    contractStart: 'Vertragsstart:',
    contractEnds: 'Vertragsende:',
    contractCat: 'Vertragskategorie:',
    contractObjectives: 'Vertragsziele:',
    pricePerMonth: 'Preis pro Monat: ',
    futuresObjectives: 'Geplante Ziele',
    misc: 'Sonstiges:',

    // buttons
    create: 'Erstellen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    logout: 'Ausloggen',
    signUp: 'Registrieren',
    login: 'Anmelden',

    // menu items
    menuContracts: 'Verträge',
    menuOverview: 'Übersicht',
    menuAddContracts: 'Vertrag hinzufügen',
    menuAddPartner: 'Partner hinzufügen',
    menuCategories: 'Kategorien',

    // contract table
    tblContract: 'Vertrag',
    tblPartner: 'Partner',
    tblCategory: 'Kategorie',
    tblDate: 'Beginnt',
    tblDuration: 'Endet',
    tblCreatedBy: 'Erstellt durch',
    tblCreated: 'Erstellt am',

    // search label
    lblSearch: 'Vertragsnummer eingeben',
  }
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'de', // set fallback locale
  messages, // set locale messages
})

export default i18n