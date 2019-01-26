<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <panel title='Partner'>
        <v-btn slot="action" to="partner/add" class="white accent-2" light fab small absolute right middle>
          <v-icon>add</v-icon>
        </v-btn>
      </panel>
  <v-data-table
    :headers="headers"
    :items="partner"
    hide-actions
    class="elevation-1"
  >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.company }}</td>
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-xs-left" lazy>{{ props.item.branch }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left" lazy>{{ props.item.fax }}</td>
        <td class="text-xs-left">
          <v-btn small color="primary" fab dark :to="{name: 'partner-view', params: {partnerId: props.item.id}}">
            <v-icon dark>list</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import PartnerService from '../../services/PartnerService';
export default {
  components: {
    PartnerService
  },
  data () {
    return {
       headers: [
          {
            text: 'Partner',
            align: 'left',
            sortable: false,
            value: 'id',
          },
          { text: 'Contact', value: 'name' },
          { text: 'Company', value: 'company'},
          { text: 'Address', value: 'address' },
          { text: 'Branch', value: 'branch' },
          { text: 'Phone', value: 'phone' },
          { text: 'Fax', value: 'fax'},
          { text: '', value: 'id'}
        ],
      partner: null,
    }
  },
  async mounted() {
    var partnerId = this.$store.state.route.params.partnerId
    // do request to backend for all Partner
    this.partner = (await PartnerService.get(partnerId)).data
  },
    watch: {
      async '$route' (to, from) {          
        var partnerId = this.$store.state.route.params.partnerId
        this.partner = (await ContractsService.get(partnerId)).data
      }
  }
}
</script>

<style>

</style>
