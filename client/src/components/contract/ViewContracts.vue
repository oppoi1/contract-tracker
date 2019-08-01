<template>
  <v-layout>
    <v-flex xs6>
      <panel :title="$t('contract') + ' ' + contract[0].number">
        <div class="danger-alert mb-3" v-html="error"></div>
        <div class="success-alert mb-3" v-html="success"></div>
        <v-layout justify-start row fill-height>
          <v-flex xs8 ma-2 text-xs-left ma-3 subheading>
            <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('contract')}}
              </div>
              <div style="display:inline-table" class="contract-contact v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].number}}
                </span>
              </div>
            </div>
            <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('name')}}
              </div>
              <div style="display:inline-table" class="contract-contact v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].name}}
                </span>
              </div>
            </div>
            <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('contractStart')}}
              </div>
              <div style="display:inline-table" class="contract-start v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].start}}
                </span>
              </div>
            </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('contractEnds')}}
              </div>
              <div style="display:inline-table" class="contract-end v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].end}}
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="contract">
                {{$t('contractCat')}}
              </div>
              <div style="display:inline-table" class="contract-categories v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].categoryName}}
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('pricePerMonth')}}
              </div>
              <div style="display:inline-table" class="contract-price v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].pricePerMonth}}&euro;
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('pricePerPeriod')}}
              </div>
              <div style="display:inline-table" class="contract-price v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].pricePerPeriod}}&euro;
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('contractObjectives')}}
              </div>
              <div style="display:inline-table" class="contract-objectives v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].objectives}}
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('futuresObjectives')}}
              </div>
              <div style="display:inline-table" class="contract-futureObjectives v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].futureobjectives}}
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('misc')}}
              </div>
              <div class="contract-other v-badge">
                <span class="font-weight-bold contract">
                  {{contract[0].other}}
                </span>
              </div>
            </div>
          </v-flex> 
        </v-layout>
        <v-btn class="blue" dark :to="{
          name: 'contract-edit',
          params () {
            return {
              contractId: contract[0].id
            }
          }
        }">{{$t('edit')}}</v-btn>
        <v-btn class="blue" dark @click="delete_contract">{{$t('delete')}}</v-btn>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel :title="$t('partnerDetails') + contract[0].companyName" class="ml-2">
        <v-layout>
          <v-flex xs3 ma-2 text-xs-left ma-3>
            <div class="text-xs-left subheading mb-3">
              {{$t('company')}}
            </div>
            <div class="text-xs-left subheading mb-3">
              {{$t('contact')}} 
            </div>
            <div class="text-xs-left subheading mb-3">
              {{$t('address')}} 
            </div>
            <div class="text-xs-left subheading mb-3">
              {{$t('branch')}}
            </div>
            <div class="text-xs-left subheading mb-3">
              {{$t('phone')}}
            </div>
          </v-flex>
          <v-flex xs6 ma-2 text-xs-left ma-3 subheading>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{firstLetterUC(contract[0].companyName)}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{firstLetterUC(partner[0].name)}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{contract[0].address}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{partner[0].branch}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{partner[0].phone}}
              </span>
            </div>
          </v-flex>
        </v-layout>
        <v-btn class="blue" dark :to="{
          name: 'contract-edit',
          params () {
            return {
              contractId: contract[0].id
            }
          }
        }">{{$t('edit')}}</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../../services/ContractsService'
import PartnerService from '../../services/PartnerService'
import CompanyService from '../../services/CompanyService'
import utilityMixins from '../../mixins/Main'
export default {
  mixins: [utilityMixins],
  data () {
    return {
      contract: {},
      partner: {},
      company: {},
      companyArr: [],
      // contract properties
      // items: ['Contract ID', 'Contract begins', 'Contract ends', 'Categories', 'Price per Month', 'Objectives', 'Future objectives', 'Miscellaneous'],
      success: null,
      error: null
    }
  },
  async mounted () {
    // get contract id to get contract data
    const contractId = this.$store.state.route.params.contractId
    try {
      this.contract = (await ContractsService.show(contractId)).data
      } catch (error) {
      console.log(error)
    }

    // find partner
    try {
      this.partner = (await PartnerService.get()).data
    } catch (e) {
      console.log(e)
    }

    // find company
    try {
      this.companyArr = (await CompanyService.get()).data
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    // calculate date difference / 30 and return costs from creating contract and today
    date_difference(date1) {
      var dt1 = new Date(date1)
      var dt2 = new Date()

      return Math.floor((Date.UTC(dt2.getFullYear(),dt2.getMonth(),dt2.getDate()) - Date.UTC(dt1.getFullYear(),dt1.getMonth(),dt1.getDate())))
    },
    /**
     * api call to "delete" a contract
     */
    async delete_contract() {
      let confirmation = confirm(`Wollen Sie Vertrag ${this.contract[0].number} entfernen?`)
      if (confirmation) {
        try {
          const response = await ContractsService.delete(this.$store.state.route.params.contractId)
          this.success = response.data.message
          setTimeout(() => {
            this.$router.push('/');
          }, 3000)
        } catch (error) {
          console.log(error)
          this.error = error.response.data.error
        }
      }
    }
  }
}
</script>

<style>
span + span {
  margin-left: 20px;
}
.contract {
  width: 40%
}
</style>
