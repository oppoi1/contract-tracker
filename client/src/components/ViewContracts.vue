<template>
  <v-layout>
    <v-flex xs6>
      <panel :title="contract.number">
        <v-layout>
          <v-flex xs6>
            <div class="contract-number">
              {{contract.number}}
            </div>
            <div class="contract-partner">
              {{contract.partner}}
              {{contract.optionalPartner}}
            </div>
            <div class="contract-start">
              {{contract.start}}
            </div>
            {{contract.duration}}
            {{contract.objectives}}
            {{contract.futureObjectives}}
            {{contract.other}}
            {{contract.pricePerMonth}}
            {{contract.categories}}
            <v-btn class="blue" dark :to="{
              name: 'contract-edit',
              params () {
                return {
                  contractId: contract.id
                }
              }
            }">Edit</v-btn>
          </v-flex>
        </v-layout>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel title="About the Partner" class="ml-2">
        {{prtnrArr[0].company}}
        {{prtnrArr[0].name}}
        {{prtnrArr[0].adress}}
        {{prtnrArr[0].branch}}
        {{prtnrArr[0].phone}}
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../services/ContractsService';
import PartnerService from '../services/PartnerService'
export default {
  data () {
    return {
      contract: {},
      partner: {},
      prtnrArr: []
    }
  },
  async mounted () {
    const contractId = this.$store.state.route.params.contractId
    this.contract = (await ContractsService.show(contractId)).data

    try {
      this.partner = (await PartnerService.get()).data
      for(var i = 0; i < this.partner.length; i++) {      
        if(this.partner[i].company === this.contract.partner)
          this.prtnrArr.push(this.partner[i])
      }
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style>

</style>
