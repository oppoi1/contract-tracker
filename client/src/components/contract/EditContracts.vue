<template>
  <v-layout>
    <v-flex xs4>
      PartnerArr {{prtnrArr}}
      Partner {{partner}}
      
      Contract {{contract}}

      CompanyArr {{cmpnyPrtnr}}
    <panel title="Contract Metadata">
      <v-text-field
       :label="$t('detailId')"
        :rules="[required]"
        v-model="contract.number"
      ></v-text-field>
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
        type="date"
        :rules="[required]"
        v-model="contract.start.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]"
      ></v-text-field>
      <v-text-field
        :label="$t('detailEnd')"
        type="date"
        :rules="[required]"
        v-model="contract.duration.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]"
      ></v-text-field>
      <v-text-field
        :label="$t('pricePerMonth')"
        required
        :placeholder="$t('detailPpM')"
        prefix="€"
        v-model="contract.pricePerMonth"
      ></v-text-field>

    </panel>
   </v-flex>
   <v-flex xs8>
     <panel title="Contract Objectives" class="ml-2">
      <v-flex xs12>
      <v-text-field
        :label="$t('detailOther')"
        :rules="[required]"
        v-model="contract.other"
      ></v-text-field>
        <v-combobox
          v-model="contract.categories"
          :items="catArray"
          :label="$t('detailCategories')"
          chips
        ></v-combobox>
      </v-flex>
      <v-textarea
        :label="$t('detailObjectives')"
        :rules="[required]"
        multi-line
        v-model="contract.objectives"
      ></v-textarea>

      <v-textarea
        :label="$t('detailfObjectives')"
        :rules="[required]"
        multi-line
        v-model="contract.futureobjectives"
      ></v-textarea>
    </panel>
    <div class="danger-alert" v-if="error">
      {{error}}
    </div>
    <v-btn dark class="blue" @click="save">
      {{$t('save')}}
    </v-btn>
   </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../../services/ContractsService'
import CategoryService from '../../services/CategoryService'
import PartnerService from '../../services/PartnerService'
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
        modifiedBy: this.$store.state.user.name
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
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    /**
     * Check if all required fields are filled
     */
    async save () {
      this.error = null
      this.contract.modifiedBy = this.$store.state.user.name
      const areAllFieldsFilledIn = Object
        .keys(this.contract)
        .every(key => !!this.contract[key])
      
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        
        console.log(this.contract);
        return
      }  

      /* check if in array
       * call api to save data
       */
      const exists = [];
      for(const key in this.categories) {
        exists.push(this.categories[key].name)
      }
      if(!exists.includes(this.contract.categories)) {
        const cntrctCat = {
          name: this.contract.categories
        }
        try {
          await CategoryService.post(cntrctCat)
        } catch (e) {
          console.log(e);
        }
      }

      const checkPartner = [];
      for (const pkey in this.partner) {
        console.log(pkey);
        checkPartner.push(this.partner[pkey].name)
      }
      if(!checkPartner.includes(this.contract.partner)) {
        const newPartner = {
          company: this.contract.partner,
          name: this.contract.optionalPartner
        }
        try {
          await PartnerService.post(newPartner)
        } catch (e) {
          console.log(e);
          }
      }

      // get contract id to push changes to contract
      const contractId = this.$store.state.route.params.contractId

      // call api
      try {
        await ContractsService.put(this.contract)
        // send category to db
        this.$router.push({
          name: 'contracts',
          params: {
            contractId: contractId
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted () {
    // get partner data
    try {
      this.partner = (await PartnerService.get()).data
      for(var i = 0; i < this.partner.length; i++) {
        this.prtnrArr.push(this.partner[i].company)
      }
    } catch (e) {
      console.log(e);
    }
    // get contract data
    try {
      const contractId = this.$store.state.route.params.contractId
      this.contract = (await ContractsService.show(contractId)).data
    } catch (e) {
      console.log(e)
    }
    // get categories
    try {
      this.categories = (await CategoryService.get()).data
      for(var i = 0; i < this.categories.length; i++) {
        this.catArray.push(this.categories[i].name)
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

</style>
