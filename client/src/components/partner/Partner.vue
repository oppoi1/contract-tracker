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
        <td class="text-xs-left">{{ props.item.companyName }}</td>
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-xs-left" lazy>{{ props.item.branch }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">
          <v-btn small color="primary" fab dark :to="{name: 'partner-view', params: {partnerId: props.item.id}}">
            <v-icon dark>list</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <div class="danger-alert" v-if="error">
      {{error}}
    </div>
    </v-flex>
  </v-layout>
</template>

<script>
import PartnerService from '../../services/PartnerService';
import CompanyService from '../../services/CompanyService';
export default {
  components: {
    PartnerService,
    CompanyService
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
          { text: '', value: 'id'}
        ],
      partner: null,
      companyArr: [],
      error: null
    }
  },
  async mounted() {
    var partnerId = this.$store.state.route.params.partnerId
    // do request to backend for all Partner and Companies
    try {
      this.companyArr = (await CompanyService.get()).data
      this.partner = (await PartnerService.get(partnerId)).data
    } catch (error) {
      this.error = error
    }
  },
    watch: {
      async '$route' (to, from) {          
        var partnerId = this.$store.state.route.params.partnerId
        this.partner = (await ContractsService.get(partnerId)).data
      },

      /**
       * sequelize bug: can't associate, dunno how to solve
       * work around for now until I've a solution
       * watch if partner changes then associate company name with partner
       */
      'partner': function(val) {
        for(var i = 0; i < this.partner.length; i++) {
          for(var j = 0; j < this.companyArr.length; j++) {
            if (this.partner[i].CompanyId === this.companyArr[j].id) {
              this.partner[i].companyName = this.companyArr[j].name || 'unknown'
            }
          }
        }
      }
  }
}
</script>

<style>

</style>
