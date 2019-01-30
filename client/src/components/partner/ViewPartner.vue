<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel :title="'Partner: ' + partner.name">
        <v-layout justify-start row fill-height>
          <v-flex xs6 ma-2 text-xs-left ma-3 subheading>
            <div class="partner mb-3">
              <div class="v-badge partner">
                Name:
              </div>
              <div class="font-weight-bold v-badge">
                {{this.partner.name}}
              </div>
            </div>
            <div class="partner mb-3">
              <div class="v-badge partner">
                Company:
             </div>
              <div class="font-weight-bold v-badge">
                {{this.partner.company}}
              </div>
            </div>
            <div class="partnerd mb-3">
              <div class="v-badge partner">
                Address:
              </div>
              <div class="font-weight-bold v-badge">
                {{this.partner.address}}
              </div>
            </div>
            <div class="partner mb-3">
              <div class="v-badge partner">
                Branch:
              </div>
              <div class="font-weight-bold v-badge">
                {{this.partner.branch}}
              </div>
            </div>
            <div class="partner mb-3">
              <div class="v-badge partner">
                Phone:
              </div>
              <div class="font-weight-bold v-badge">
                {{this.partner.phone}}
              </div>
            </div>
            <div class="partner mb-3">
              <div class="v-badge partner">
                Fax:
              </div>
              <div class="font-weight-bold v-badge">
                {{this.partner.fax}}
              </div>
            </div>
            <div class="partner mb-3">
              <div class="v-badge partner">
                Created:  
              </div>
              <div class="font-weight-bold v-badge">
                {{this.partner.createdAt.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]}}
              </div>
            </div>
          </v-flex>
        </v-layout>
        <v-btn class="blue" dark :to="{
          name: 'partner-edit',
          params () {
            return {
              partnerId: this.partner.id
            }
          }
        }">Edit</v-btn>
        <v-btn class="blue" dark :to="{
          name: 'partner-edit',
          params () {
            return {
              contractId: this.partner.id
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
      partner: {}
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
.partner {
  width: 50%
}
</style>
