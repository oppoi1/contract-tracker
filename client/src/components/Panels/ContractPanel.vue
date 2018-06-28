<template>
  <panel title="Contracts">
    <v-btn slot="action" to="create" class="white accent-2" light fab small absolute right middle>
      <v-icon>add</v-icon>
    </v-btn>
    <div class="contracts" v-for="contract in contracts" :key="contract.id">
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
          <v-btn class="blue" dark :to="{name: 'contract', params: {contractId: contract.id}}">
            View
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <div class="contract-duration">
            {{contract.duration}}
          </div>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import ContractsService from '../../services/ContractsService';
export default {
  data () {
    return {
      contracts: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.contracts = (await ContractsService.index(value)).data
      }
    }
  }
}
</script>

<style>

</style>
