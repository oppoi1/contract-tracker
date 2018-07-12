<template>
<div>
  <panel title="Contracts">
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
        <td class="text-xs-left">{{ props.item.partner }}</td>
        <td class="text-xs-left">{{ props.item.categories }}</td>
        <td class="text-xs-left">{{ props.item.start }}</td>
        <td class="text-xs-left" lazy>{{ props.item.duration.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0] }}</td>
        <td class="text-xs-left">{{ props.item.createdBy }}</td>
        <td class="text-xs-left" lazy>{{ props.item.createdAt.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0] }}</td>
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
export default {
  data () {
    return {
      headers: [
          {
            text: 'Contract',
            align: 'left',
            sortable: false,
            value: 'id',
          },
          { text: 'Partner', value: 'partner' },
          { text: 'Category', value: 'categories'},
          { text: 'Date', value: 'start' },
          { text: 'Duration', value: 'duration' },
          { text: 'Created By', value: 'createdBy' },
          { text: 'Created', value: 'createdAt'},
          { text: '', value: 'id'}
        ],
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
  },
  components: {
    SearchPanel: SearchPanel
  }
}
</script>

<style>

</style>
