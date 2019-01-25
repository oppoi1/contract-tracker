<template>
  <v-layout>
    <v-flex xs6>
      <panel :title="contract.partner + ': ' + contract.number">
        <v-layout>
          <v-flex xs3 ma-2 text-xs-left ma-3>
            <div class="contract-contact text-xs-left subheading mb-3">
              Contact: 
            </div>
            <div class="contract-start text-xs-left subheading mb-3">
              Contract begins:
            </div>
            <div class="contract-end text-xs-left subheading mb-3">
              Contract ends: 
            </div>
            <div class="contract-categories text-xs-left subheading mb-3">
              Categories: 
            </div>
            <div class="contract-price text-xs-left subheading mb-3">
              Price per Month:
            </div>
            <div class="contract-objectives text-xs-left subheading mb-3">
              Objectives: 
            </div>
            <div class="contract-futureObjectives text-xs-left subheading mb-3">
              Future objectives: 
            </div>
            <div class="contract-other text-xs-left subheading mb-3">
              Misc
            </div>
          </v-flex>
          <v-flex xs6 ma-2 text-xs-left ma-3 subheading>
            <div class="contract-contact mb-3">
              <span class="font-weight-bold">
                {{contract.optionalPartner}}
              </span>
            </div>
            <div class="contract-start mb-3">
              <span class="font-weight-bold">
                {{contract.start}}
              </span>
            </div>
            <div class="contract-end mb-3">
              <span class="font-weight-bold">
                {{contract.duration}}
              </span>
            </div>
            <div class="contract-categories mb-3">
              <span class="font-weight-bold">
                {{contract.categories}}
              </span>
            </div>
            <div class="contract-price mb-3">
              <span class="font-weight-bold">
                {{contract.pricePerMonth}}
              </span>
            </div>
            <div class="contract-objectives mb-3">
              <span class="font-weight-bold">
                {{contract.objectives}}
              </span>
            </div>
            <div class="contract-futureObjectives mb-3">
              <span class="font-weight-bold">
                {{contract.futureobjectives}}
              </span>
            </div>
            <div class="contract-other mb-3">
              <span class="font-weight-bold">
                {{contract.other}}
              </span>
            </div>
          </v-flex>
        </v-layout>
        <v-btn class="blue" dark :to="{
          name: 'contract-edit',
          params () {
            return {
              contractId: contract.id
            }
          }
        }">Edit</v-btn>
        <v-btn class="blue" dark :to="{
          name: 'contract-edit',
          params () {
            return {
              contractId: contract.id
            }
          }
        }">Delete</v-btn>
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
span + span {
  margin-left: 20px;
}
</style>
