<template>
  <v-layout>
    <v-flex xs4>
    <panel title="Contract Metadata">
      <v-text-field
        :label="$t('detailId')"
        required
        :rules="[required]"
        v-model="contract.number"
      ></v-text-field>
      <v-text-field
        :label="$t('detailName')"
        required
        :rules="[required]"
        v-model="contract.name"
      ></v-text-field>
      <v-combobox
        v-model="contract.responsible"
        :rules="[required]"
        :items="usrArray"
        :label="$t('detailResponsible')"
        chips
      ></v-combobox>
      <v-combobox
        v-model="contract.partner"
        :rules="[required]"
        :items="prtnrArr"
        :label="$t('detailPartner')"
        chips
      ></v-combobox>
      <v-combobox
        :label="$t('detailoptionalPartner')"
        required
        :rules="[required]"
        :items="cmpnyPrtnr"
        v-model="contract.optionalPartner"
      ></v-combobox>
      <v-text-field
        :label="$t('detailStart')"
        required
        type="date"
        :rules="[required]"
        v-model="contract.start"
      ></v-text-field>
      <v-text-field
        :label="$t('detailEnd')"
        required
        type="date"
        value="date"
        :rules="[required]"
        v-model="contract.end"
      ></v-text-field>
      <v-text-field
        :label="$t('detailCancel')"
        required
        :rules="[required]"
        placeholder="in Months, ex: 3"
        v-model="contract.cancel"
      ></v-text-field>
      <v-text-field
        :label="$t('pricePerMonth')"
        required
        :placeholder="$t('detailPpM')"
        prefix="€"
        v-model="contract.pricePerMonth"
      ></v-text-field>
      <v-select
        :items="items"
        :label="$t('pricePerMonth')"
        solo
        required
        :rules="[required]"
        v-model="contract.pricePerPriod"
      ></v-select>
      <p class="red" style="text-decoration: line-through">p.A: {{ contract.pricePerMonth * 12 }} €</p>
    </panel>
   </v-flex>
   <v-flex xs8>
     <panel title="Contract Objectives" class="ml-2">
      <v-flex xs12>
        <v-combobox
          v-model="contract.categories"
          :items="catArray"
          :label="$t('detailCategories')"
          chips
        ></v-combobox>
      </v-flex>
      <v-textarea
        :label="$t('detailObjectives')"
        required
        :rules="[required]"
        v-model="contract.objectives"
      ></v-textarea>
      <v-textarea
        :label="$t('detailfObjectives')"
        required
        :rules="[required]"
        v-model="contract.futureobjectives"
      ></v-textarea>
      <v-textarea
        :label="$t('detailOther')"
        required
        :rules="[required]"
        v-model="contract.other"
      ></v-textarea>
    </panel>
    <div class="danger-alert" v-if="error">
      {{error}}
    </div>
    <v-btn dark class="blue" @click="create">
      {{$t('create')}}
    </v-btn>
   </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../../services/ContractsService'
import CategoryService from '../../services/CategoryService'
import PartnerService from '../../services/PartnerService'
import AuthenticationService from '../../services/AuthenticationService'
import CompanyService from '../../services/CompanyService'
import _ from 'lodash'
export default {
  data () {
    return {
      contract: {
        number: '',
        name: '',
        partner: null,
        start: null,
        end: null,
        objectives: null,
        futureobjectives: null,
        other: null,
        optionalPartner: null,
        categories: null,
        pricePerMonth: null,
        pricePerPriod: null,
        responsible: null,
        cancel: null,
        createdBy: this.$store.state.user.name
      },
      partner: {
        name: null,
        company: null,
        adress: null,
        branch: null,
        phone: null,
        fax: null,
        contracts: null
      },
      categories: [],
      catArray: [],
      prtnrArr: [],
      companyArr: [],
      cmpnyPrtnr: [],
      usrArray: [],
      error: null,
      required: (value) => !!value || 'Required.',
      date: new Date().toJSON().slice(0,10).toString(),
      items: ['monatlich', 'vierteljährlich', 'halbjährlich', 'jährlich'],
      file: '',
      user: {}
    }
  },
  methods: {
    /**
     * Check if all required fields are filled
     */
    async create () {
      this.error = null
      this.contract.createdBy = this.user.id
      const areAllFieldsFilledIn = Object
        .keys(this.contract)
        .every(key => !!this.contract[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Bitte füllen Sie alle Felder aus.'
        return
      }
      
      // call api to save
      try {
        await ContractsService.post(this.contract)
        this.$router.push({
          name: 'contracts'
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  /**
   * On load
   * Get partner, categories, companies and  users data
   */
  async mounted () {

    this.user = JSON.parse(this.$store.state.user)

    try {
      this.partner = (await PartnerService.get()).data
    } catch (e) {
      console.log(e);
    }
    try {
      this.categories = (await CategoryService.get()).data
      for(var i = 0; i < this.categories.length; i++) {
        this.catArray.push(this.categories[i].name)
      }
    } catch (e) {
      console.log(e)
    }
    try {
      this.users = (await AuthenticationService.get()).data
      for(var i = 0; i < this.users.length; i++) {
        this.usrArray.push(this.users[i].name)
      }
    } catch (e) {
      console.log(e)
    }
    try {
      this.companyArr = (await CompanyService.get()).data
      for(var i = 0; i < this.companyArr.length; i++) {
        this.prtnrArr.push(this.companyArr[i].name)
      }
    } catch (error) {
      console.log(error)
    }
  },

  // assign partner to company
  watch: {
    'contract.partner': function(val) {
      // check in company array
      for(var i = 0; i < this.companyArr.length; i++) {
        // if the name of company is the same as val
        if(this.companyArr[i].name === val) {
          // if the same then look in partner arr where company id = companyarr[i].id
          const result = this.partner.map(partner => {
            if(partner.companyId === this.companyArr[i].id) {
              if(partner.name) {
                return partner.name
              }
            }
          })
          this.cmpnyPrtnr = result
        }
      }
    }
  }
}
</script>

<style scoped>
#checkboxes input{
    display: inline-block;
    margin-right: 10px;
}

#checkboxes label {
    display: inline-block;
}
label {
    display: block;
    margin: 20px 0 10px;
}
</style>
