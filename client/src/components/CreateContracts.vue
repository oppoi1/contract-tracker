<template>
  <v-layout>
    <v-flex xs4>
    <panel title="Contract Metadata">
      <v-text-field
        label="Identifier"
        required
        :rules="[required]"
        v-model="contract.number"
      ></v-text-field>
      <v-combobox
        v-model="contract.responsible"
        :rules="[required]"
        :items="usrArray"
        label="Responsible for this contract"
        chips
      ></v-combobox>
      <v-combobox
        v-model="contract.partner"
        :rules="[required]"
        :items="prtnrArr"
        label="Select Company or create a new one"
        chips
      ></v-combobox>
      <v-combobox
        label="Enter a Partner"
        required
        :rules="[required]"
        :items="cmpnyPrtnr"
        v-model="contract.optionalPartner"
      ></v-combobox>
      <v-text-field
        label="Start"
        required
        type="date"
        :rules="[required]"
        v-model="contract.start"
      ></v-text-field>
      <v-text-field
        label="End"
        required
        type="date"
        value="date"
        :rules="[required]"
        v-model="contract.duration"
      ></v-text-field>
      <v-text-field
        label="cancelPeriod"
        required
        :rules="[required]"
        placeholder="in Months, ex: 3"
        v-model="contract.cancel"
      ></v-text-field>
      <v-text-field
        label="Price per Month"
        required
        placeholder="per Month"
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
          label="Select a category or create a new one"
          chips
        ></v-combobox>
      </v-flex>
      <v-textarea
        label="Objectives"
        required
        :rules="[required]"
        v-model="contract.objectives"
      ></v-textarea>
      <v-textarea
        label="FutureObjectives"
        required
        :rules="[required]"
        v-model="contract.futureobjectives"
      ></v-textarea>
      <v-textarea
        label="Comments / Specifics"
        required
        :rules="[required]"
        v-model="contract.other"
      ></v-textarea>
    </panel>
    <div class="danger-alert" v-if="error">
      {{error}}
    </div>
    <v-btn dark class="blue" @click="create">
      Create contract
    </v-btn>
   </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../services/ContractsService'
import CategoryService from '../services/CategoryService'
import PartnerService from '../services/PartnerService'
import AuthenticationService from '../services/AuthenticationService'
import _ from 'lodash'
export default {
  data () {
    return {
      contract: {
        number: null,
        partner: null,
        start: null,
        duration: null,
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
      cmpnyPrtnr: [],
      usrArray: [],
      error: null,
      required: (value) => !!value || 'Required.',
      date: new Date().toJSON().slice(0,10).toString(),
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.contract)
        .every(key => !!this.contract[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      
      // call api
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
  async mounted () {
    try {
      this.partner = (await PartnerService.get()).data
      for(var i = 0; i < this.partner.length; i++) {
        this.prtnrArr.push(this.partner[i].company)
      }
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
  },
  watch: {
    'contract.partner': function(val) {
      for(var i = 0; i < this.partner.length; i++) {
        if(this.partner[i].company === val) {         
          this.cmpnyPrtnr.push(this.partner[i].name)
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
