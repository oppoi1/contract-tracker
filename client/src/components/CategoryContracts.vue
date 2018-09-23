<template>
  <v-layout row wrap>
    <CategoryPanel/>
    <v-flex xs8 offset-xs1>
      <panel title='Contracts'>
        <p slot="action">{{cat}}</p>
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
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../services/ContractsService';
import CategoryPanel from '../components/Panels/CategoryPanel';

export default {
  components: {
    ContractsService,
    CategoryPanel
  },
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
      contracts: null,
      cat: null,
    }
  },
  async mounted() {
    const URL = document.URL
    const cat = URL.split('/')
    this.cat = cat[4]
    // do request to backend for all Contracts
    this.contracts  = (await ContractsService.get(cat[4])).data
  },
    watch: {
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
