<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel :title="'Partner: ' + partner.company">
        <v-layout>
          <v-flex xs3 ma-2 text-xs-left ma-3>
            <div class="contract-contact text-xs-left subheading mb-3" v-for="item in items" :key="item">
              {{item}}:
            </div>
          </v-flex>
          <v-flex xs6 ma-2 text-xs-left ma-3 subheading>
            <div class="contract-contact mb-3">
              <span class="font-weight-bold">
                {{this.partner.name}}
              </span>
            </div>
            <div class="contract-start mb-3">
              <span class="font-weight-bold">
                {{this.partner.company}}
              </span>
            </div>
            <div class="contract-end mb-3">
              <span class="font-weight-bold">
                {{this.partner.address}}
              </span>
            </div>
            <div class="contract-categories mb-3">
              <span class="font-weight-bold">
                {{this.partner.branch}}
              </span>
            </div>
            <div class="contract-price mb-3">
              <span class="font-weight-bold">
                {{this.partner.phone}}
              </span>
            </div>
            <div class="contract-objectives mb-3">
              <span class="font-weight-bold">
                {{this.partner.fax}}
              </span>
            </div>
            <div class="contract-futureObjectives mb-3">
              <span class="font-weight-bold">
                {{this.partner.createdAt.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]}}
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
  </v-layout>
</template>

<script>
import PartnerService from '../../services/PartnerService'
export default {
  data () {
    return {
      partner: {},
      // partner properties
      items: ['Name', 'Company', 'Address', 'Branch', 'Phone', 'Fax', 'createdAt'],
    }
  },
  async mounted () {
    const partnerId = this.$store.state.route.params.partnerId
    try {
      this.partner = (await PartnerService.show(partnerId)).data
      } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style>
span + span {
  margin-left: 20px;
}
</style>
