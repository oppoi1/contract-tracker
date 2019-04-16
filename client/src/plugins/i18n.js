import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store/store'

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
    save: 'save',

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

    // contract details
    detailId: 'Identifier',
    detailResponsible: 'Responsible for this contract',
    detailPartner: 'Select a Company or create a new one',
    detailoptionalPartner: 'Enter a Partner',
    detailStart: 'Start' ,
    detailEnd: 'End',
    detailPpM: 'per Month',
    detailCancel: 'Cancel period',
    detailCategories: 'Select a category or create a new one',
    detailObjectives: 'Objectives',
    detailfObjectives: 'Objectives for the future',
    detailOther: 'Comments / Specifics',

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
    save: 'Speichern',

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

    // contract details
    detailId: 'Nummer',
    detailResponsible: 'Verantwortlicher',
    detailPartner: 'Eine Firma auswählen oder eine neue Eingeben',
    detailoptionalPartner: 'Einen Partner eingeben',
    detailStart: 'Beginnt' ,
    detailEnd: 'Endet',
    detailPpM: 'Pro Monat',
    detailCancel: 'Kündigungsfrist',
    detailCategories: 'Wählen Sie eine Kategory aus oder erstellen Sie eine neue',
    detailObjectives: 'Ziele',
    detailfObjectives: 'Ziele für die Zukunft',
    detailOther: 'Kommentare / Weitere Informationen',

    // search label
    lblSearch: 'Vertragsnummer eingeben',
  }
}

const i18n = new VueI18n({
  locale: store.state.language || 'en', // set locale
  fallbackLocale: 'de', // set fallback locale
  messages, // set locale messages
})

export default i18n