<template>
  <v-layout>
    <v-flex xs4>
    <panel title="Contract Metadata">
      <v-text-field
        label="Identifier"
        :rules="[required]"
        v-model="contract.number"
      ></v-text-field>
      <v-text-field
        label="Partner"
        :rules="[required]"
        v-model="contract.partner"
      ></v-text-field>
      <v-text-field
        label="optionalPartner"
        :rules="[required]"
        v-model="contract.optionalPartner"
      ></v-text-field>
      <v-text-field
        label="Start"
        type="date"
        :rules="[required]"
        v-model="contract.start.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]"
      ></v-text-field>
      <v-text-field
        label="End"
        type="date"
        :rules="[required]"
        v-model="contract.duration.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]"
      ></v-text-field>
      <v-text-field
        label="Other"
        :rules="[required]"
        v-model="contract.other"
      ></v-text-field>

    </panel>
   </v-flex>
   <v-flex xs8>
     <panel title="Contract Objectives" class="ml-2">
      <v-flex xs12>
        <v-combobox
          v-model="contract.categories"
          :items="catArray"
          label="Selected category"
          chips
        ></v-combobox>
      </v-flex>
      <v-textarea
        label="Objectives"
        :rules="[required]"
        multi-line
        v-model="contract.objectives"
      ></v-textarea>

      <v-textarea
        label="FutureObjectives"
        :rules="[required]"
        multi-line
        v-model="contract.futureobjectives"
      ></v-textarea>
    </panel>
    <div class="danger-alert" v-if="error">
      {{error}}
    </div>
    <v-btn dark class="blue" @click="save">
      Save Contract
    </v-btn>
   </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../services/ContractsService'
import CategoryService from '../services/CategoryService'
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
        modifiedBy: this.$store.state.user.name
      },
      categories: [],
      catArray: [],
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
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
       * call api
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

      const contractId = this.$store.state.route.params.contractId

      // call api
      try {
        await ContractsService.put(this.contract)
        // TODO: send category to db
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
  }
}
</script>

<style scoped>

</style>
