<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <!-- TODO: Complete Partner and i18n  -->
      <panel :title="'Partner: ' + partner.name">
        <div class="danger-alert mb-3" v-html="error"></div>
        <div class="success-alert mb-3" v-html="success"></div>
        <v-layout justify-start row fill-height>
          <v-flex xs8 ma-2 text-xs-left ma-3 subheading>
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
                Created:  
              </div>
              <div class="font-weight-bold v-badge" v-if="this.partner">
                {{StripAndReverse(this.partner.createdAt)}}
              </div>
              <div class="font-weight-bold v-badge" v-else>
                
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
        <v-btn class="blue" dark @click="delete_partner()">Delete</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import PartnerService from '../../services/PartnerService'
import utilityMixins from '../../mixins/Main'
export default {
  mixins: [utilityMixins],
  data () {
    return {
      partner: {},
      error: null,
      success: null
    }
  },
  async mounted () {
    const partnerId = this.$store.state.route.params.partnerId
    try {
      this.partner = (await PartnerService.show(partnerId)).data
      } catch (error) {
      console.log(error)
      this.error = error
    } 
  },
  methods: {
    /**
     * send delete request to BE
     * then show success message and redirect
     * after three seconds to partner overview
     */
    async delete_partner() {
      try {
        const response = await PartnerService.delete(this.$store.state.route.params.partnerId)
        this.success = response.data.message
        setTimeout(() => {
          this.$router.push('/partner');
        }, 3000)
      } catch (error) {
        console.log(error)
        this.error = error.data.error
      }
    },
  }
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
