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
      <p class="red">p.A: {{ contract.pricePerMonth * 12 }} €</p>
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
        partner: null,
        start: null,
        end: null,
        objectives: null,
        futureobjectives: null,
        other: null,
        optionalPartner: null,
        categories: null,
        pricePerMonth: null,
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
    }
  },
  methods: {
    /**
     * Check if all required fields are filled
     */
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.contract)
        .every(key => !!this.contract[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
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
      console.log(this.users)
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
            var newObj = {}
            partner.companyId === this.companyArr[i].id ? newObj = partner.name : undefined
            return newObj
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
