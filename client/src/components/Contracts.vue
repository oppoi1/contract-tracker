<template>
  <v-layout row wrap>
    <CategoryPanel/>
    <v-flex xs8 offset-xs1>
      <contract-panel/>
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../services/ContractsService';
import ContractPanel from './Panels/ContractPanel';
import CategoryPanel from '../components/Panels/CategoryPanel';

export default {
  components: {
    ContractsService,
    ContractPanel,
    CategoryPanel
  },
  data () {
    return {
      contracts: null
    }
  },
  async mounted () {
    // do request to backend for all Contracts
    // unnecessary
    // this.contracts = (await ContractsService.index()).data   
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
