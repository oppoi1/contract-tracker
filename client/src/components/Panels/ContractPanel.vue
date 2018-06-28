<template>
<div>
  <panel title="Contracts">
    <v-btn slot="action" to="contracts/add" class="white accent-2" light fab small absolute right middle>
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
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.number }}</td>
        <td class="text-xs-center">{{ props.item.partner }}</td>
        <td class="text-xs-center">{{ props.item.date }}</td>
        <td class="text-xs-center">{{ props.item.duration.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0] }}</td>
        <td class="text-xs-center">{{ props.item.createdBy }}</td>
        <td class="text-xs-center">{{ props.item.createdAt.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0] }}</td>
        <td class="text-xs-center">
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
export default {
  data () {
    return {
      headers: [
          {
            text: 'Contracts',
            align: 'left',
            sortable: false,
            value: 'id',
          },
          { text: 'Number', value: 'number' },
          { text: 'Partner', value: 'partner' },
          { text: 'Date', value: 'date' },
          { text: 'Duration', value: 'duration' },
          { text: 'Created By', value: 'createdBy' },
          { text: 'Created', value: 'createdAt'},
          { text: 'Edit', value: 'id'}
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
  }
}
</script>

<style>

</style>
