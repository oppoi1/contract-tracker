<template>
  <v-layout row wrap>
    <CategoryPanel/>
    <v-flex xs8 offset-xs1>
      <panel :title="$t('menuContracts')">
        <p slot="action">{{replaceSpace(cat)}}</p>
        <v-btn slot="action" to="contract/add" class="white accent-2" light fab small absolute right middle>
          <v-icon>add</v-icon>
        </v-btn>
      </panel>
  <v-data-table
    :headers="headers"
    :items="contracts"
    hide-actions
    class="elevation-1"
  >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.number }}</td>
        <td class="text-xs-left">{{ firstLetterUC(props.item.partner) }}</td>
        <td class="text-xs-left">{{ props.item.category }}</td>
        <td class="text-xs-left">{{ StripAndReverse(props.item.start) }}</td>
        <td class="text-xs-left" lazy>{{ StripAndReverse(props.item.end) }}</td>
        <td class="text-xs-left">{{ firstLetterUC(props.item.createdBy) }}</td>
        <td class="text-xs-left" lazy>{{ StripAndReverse(props.item.createdAt) }}</td>
        <td class="text-xs-left">
          <v-btn small color="primary" fab dark :to="{name: 'contract', params: {contractId: props.item.id}}">
            <v-icon dark>list</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../../services/ContractsService';
import CategoryPanel from '../../components/Panels/CategoryPanel';
import utilityMixins from '../../mixins/Main'
export default {
  components: {
    ContractsService,
    CategoryPanel
  },
  mixins: [utilityMixins],
  data () {
    return {
      /**
       * Create Datatable with header data
       */
       headers: [
          {
            text: this.$t('tblContract'),
            align: 'left',
            sortable: false,
            value: 'id',
          },
          { text: this.$t('tblPartner'), value: 'partner' },
          { text: this.$t('tblCategory'), value: 'categories'},
          { text: this.$t('tblDate'), value: 'start' },
          { text: this.$t('tblEnd'), value: 'end' },
          { text: this.$t('tblCreatedBy'), value: 'createdBy' },
          { text: this.$t('tblCreated'), value: 'createdAt'},
          { text: '', value: 'id'}
        ],
      contracts: null,
      cat: null,
    }
  },
  async mounted() {
    /**
     * Get Category and query all Contracts within that category 
     */
    const URL = document.URL
    const cat = URL.split('/')
    this.cat = cat[4]
    // do request to backend for all Contracts
    this.contracts  = (await ContractsService.get(cat[4])).data
  },
  watch: {
    /**
     * I have no clue why I did this
     */
    async '$route' (to, from) {          
      const URL = document.URL
      const cat = URL.split('/')
      this.cat = cat[4]
      this.contracts  = (await ContractsService.get(cat[4])).data
    }
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
