<template>
  <v-layout>
    <v-flex xs4>
    <panel title="Contract Metadata">
      <v-text-field
        label="Number"
        required
        :rules="[required]"
        v-model="contract.number"
      ></v-text-field>
      <v-text-field
        label="Partner"
        required
        :rules="[required]"
        v-model="contract.partner"
      ></v-text-field>
      <v-text-field
        label="Objectives"
        required
        :rules="[required]"
        v-model="contract.objectives"
      ></v-text-field>
      <v-text-field
        label="FutureObjectives"
        required
        :rules="[required]"
        v-model="contract.futureobjectives"
      ></v-text-field>

    </panel>
   </v-flex>
   <v-flex xs8>
     <panel title="contract Structure" class="ml-2">
      <v-text-field
        label="Other"
        required
        :rules="[required]"
        multi-line
        v-model="contract.other"
      ></v-text-field>

      <v-text-field
        label="optionalPartner"
        required
        :rules="[required]"
        multi-line
        v-model="contract.optionalPartner"
      ></v-text-field>
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
export default {
  data () {
    return {
      contract: {
        number: null,
        partner: null,
        // start: null,
        // duration: null,
        objectives: null,
        futureobjectives: null,
        other: null,
        optionalPartner: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
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
  }
}
</script>

<style scoped>

</style>
