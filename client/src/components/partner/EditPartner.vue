<template>
  <v-layout justify-start row fill-height>
    <v-flex xs6 offset-xs3>
    <panel title="Contract Metadata">
      <div class="danger-alert mt-3" v-if="error">
        {{error}}
      </div>
      <v-text-field
        :rules="[required]"
        v-model="partner.name"
        :label="$t('tblPartner')"
      ></v-text-field>
      <v-combobox
        v-model="partner.company"
        :rules="[required]"
        :items="companyArr"
        :label="$t('company')"
        chips
      ></v-combobox>
      <v-text-field
        :label="$t('branch')"
        v-model="partner.branch"
      ></v-text-field>
      <v-text-field
        :label="$t('phone')"
        v-model="partner.phone"
      ></v-text-field>
    <v-btn dark class="blue" @click="save">
      {{$t('save')}}
    </v-btn>
    </panel>
   </v-flex>
  </v-layout>
</template>

<script>
import PartnerService from '../../services/PartnerService'
import CompanyService from '../../services/CompanyService';
export default {
  data () {
    return {
      partner: {
        name: null,
        branch: null,
        phone: null,
        companyName: null
      },
      company: null,
      companyName: null,
      error: null,
      companyArr: [],
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    /**
     * check if all required fields are filled
     * then post to api
     */
    async save () {
      this.error = null
      // later
      // this.partner.modifiedBy = this.$store.state.user.name
      const areAllFieldsFilledIn = Object
        .keys(this.partner)
        .every(key => !!this.partner[key])
      
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        
        console.log(this.partner);
        return
      }

      // todo: call api to save partner
      const partnerId = this.$store.state.route.params.partnerId

      try {
        await PartnerService.put(this.partner)
        this.$router.push({
          name: 'partner-view',
          params: {
            partnerId: partnerId
          }
        })
      } catch (error) {
        this.error = error.response.data
      }
    }
  },
  async mounted () {
    const partnerId = this.$store.state.route.params.partnerId
    // get partner data
    try {
      this.partner = (await PartnerService.show(partnerId)).data
    } catch (e) {
      console.log(e);
    }
    // get company
    try {
      this.company = (await CompanyService.get()).data
      for(var i = 0; i < this.company.length; i++) {
        if(this.partner.CompanyId === this.company[i].id) {
          this.partner.companyName = this.company[i].name
        }
        this.companyArr.push(this.company[i].name)
      }
    } catch (e) {
      console.log(e)
    }
  },
  // watch: {
  //   'contract.partner': function(val) {
  //     for(var i = 0; i < this.partner.length; i++) {
  //       if(this.partner[i].company === val) {         
  //         this.cmpnyPrtnr.push(this.partner[i].name)
  //       }
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>
