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
      <v-text-field
        label="Partner"
        required
        :rules="[required]"
        v-model="contract.partner"
      ></v-text-field>
      <v-text-field
        label="optionalPartner"
        required
        :rules="[required]"
        v-model="contract.optionalPartner"
      ></v-text-field>
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
        label="Other"
        required
        :rules="[required]"
        v-model="contract.other"
      ></v-text-field>

    </panel>
   </v-flex>
   <v-flex xs8>
     <panel title="Contract Objectives" class="ml-2">
      <div>
        <v-radio-group v-model="contract.categories">
          <v-radio
            v-for="category in categories"
            :key="category.name"
            :label="`Radio ${category.name}`"
            :value="category.name"
          ></v-radio>
        </v-radio-group>
      </div>

      <v-text-field
        label="Objectives"
        multi-line
        required
        :rules="[required]"
        v-model="contract.objectives"
      ></v-text-field>
      <v-text-field
        label="FutureObjectives"
        required
        :rules="[required]"
        multi-line
        v-model="contract.futureobjectives"
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
        createdBy: this.$store.state.user.name
      },
      categories: {
        id: null,
        name: null
      },
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
      this.categories = (await CategoryService.get()).data
    } catch (e) {
      console.log(e)
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
