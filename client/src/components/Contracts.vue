<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <contract-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../services/ContractsService';
import ContractPanel from './Panels/ContractPanel';
export default {
  components: {
    ContractsService,
    ContractPanel,
  },
  data () {
    return {
      contracts: null
    }
  },
  async mounted () {
    // do request to backend for all songs
    this.contracts = (await ContractsService.index()).data   
  }
}
</script>

<style>
.contract {
  padding: 20px;
  height: 150px;
  overflow: hidden;
}

.contract-number {
 font-size: 24px;
}

.contract-partner {
font-size: 20px;
}

.contract-start {
font-size: 16px;
}
</style>
