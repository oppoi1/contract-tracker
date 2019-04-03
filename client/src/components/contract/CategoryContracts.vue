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
        <td class="text-xs-left" lazy>{{ StripAndReverse(props.item.duration) }}</td>
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

export default {
  components: {
    ContractsService,
    CategoryPanel
  },
  data () {
    return {
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
          { text: this.$t('tblDuration'), value: 'duration' },
          { text: this.$t('tblCreatedBy'), value: 'createdBy' },
          { text: this.$t('tblCreated'), value: 'createdAt'},
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
  },
  methods: {
    StripAndReverse(val) {
      val = val.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]
      return val.split('-').reverse().join('-')
    },
    firstLetterUC(val) {
      var length = val.length
      return val.substring(0,1).toUpperCase() + val.substring(1, length)
    },
    replaceSpace(val) {
      return val.replace('%20', ' ')
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
