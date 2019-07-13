<template>
<div>
  <panel :title="$t('menuContracts')">
    <v-btn slot="action" to="contract/add" class="white accent-2" light fab small absolute right middle>
      <v-icon>add</v-icon>
    </v-btn>
    <search-panel/>
  </panel>
  <v-data-table
    :headers="headers"
    :items="contracts"
    hide-actions
    class="elevation-1"
  >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.number }}</td>
        <td class="text-xs-left">{{ props.item.CompanyId }}</td>
        <td class="text-xs-left">{{ firstLetterUC(props.item.partner) }}</td>
        <td class="text-xs-left">{{ props.item.category }}</td>
        <td class="text-xs-left">{{ props.item.responsible }}</td>
        <td class="text-xs-left">{{ props.item.duration }}</td>
        <td class="text-xs-left">
          <v-btn small color="primary" fab dark :to="{name: 'contract', params: {contractId: props.item.id}}">
            <v-icon dark>list</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ContractsService from '../../services/ContractsService';
import SearchPanel from './ContractSearchPanel';
import utilityMixins from '../../mixins/Main'
export default {
  mixins: [utilityMixins],
  data () {
    return {
      headers: [
          {
            text: this.$t('tblContract'),
            align: 'left',
            sortable: false,
            value: 'id',
          },
          { text: this.$t('tblCompany'), value: 'CompanyId' },
          { text: this.$t('tblPartner'), value: 'partner' },
          { text: this.$t('tblCategory'), value: 'categories'},
          { text: this.$t('tblResponsible'), value: 'responsible' },
          { text: this.$t('tblDuration'), value: 'duration' },
          { text: '', value: 'id'}
        ],
      contracts: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.contracts = (await ContractsService.index(value)).data
      }
    }
  },
  components: {
    SearchPanel: SearchPanel
  }
}
</script>

<style>

</style>
