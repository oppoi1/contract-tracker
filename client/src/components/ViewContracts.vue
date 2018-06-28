<template>
  <v-layout>
    <v-flex xs6>
      <panel title="Edit Contract">
        <v-layout>
          <v-flex xs6>
            <div class="contract-number">
              {{contract.number}}
            </div>
            <div class="contract-partner">
              {{contract.partner}}
            </div>
            <div class="contract-start">
              {{contract.start}}
            </div>
            <v-btn class="blue" dark :to="{
              name: 'contract-edit',
              params () {
                return {
                  contractId: contract.id
                }
              }
            }">Edit</v-btn>
          </v-flex>
        </v-layout>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel title="Other" class="ml-2">
        {{contract.other}}
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../services/ContractsService';
export default {
  data () {
    return {
      contract: {}
    }
  },
  async mounted () {
    const contractId = this.$store.state.route.params.contractId
    this.contract = (await ContractsService.show(contractId)).data
  }
}
</script>

<style>

</style>
