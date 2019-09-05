<template>
  <v-layout>
    <v-flex xs6>
      <panel :title="$t('contract') + ' ' + contract.number">
        <div class="danger-alert mb-3" v-html="error"></div>
        <div class="success-alert mb-3" v-html="success"></div>
        <v-layout justify-start row fill-height>
          <v-flex xs8 ma-2 text-xs-left ma-3 subheading>
            <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{firstLetterUC($t('detailName'))}}:
              </div>
              <div style="display:inline-table" class="contract-contact v-badge">
                <span class="font-weight-bold contract">
                  {{contract.name}}
                </span>
              </div>
            </div>
            <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('contractStart')}}
              </div>
              <div style="display:inline-table" class="contract-start v-badge">
                <span class="font-weight-bold contract">
                  {{StripAndReverse(contract.start)}}
                </span>
              </div>
            </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('contractEnds')}}
              </div>
              <div style="display:inline-table" class="contract-end v-badge">
                <span class="font-weight-bold contract">
                  {{StripAndReverse(contract.end)}}
                </span>
              </div>
             </div>
            <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('detailCancel')}}:
              </div>
              <div style="display:inline-table" class="contract-start v-badge">
                <span class="font-weight-bold contract">
                  {{contract.cancel}} {{$t('month')}}
                </span>
              </div>
            </div>
            <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('detailCancelDate')}}:
              </div>
              <div style="display:inline-table" class="contract-start v-badge">
                <span class="font-weight-bold contract">
                  {{StripAndReverse(contract.cancelDate)}}
                </span>
              </div>
            </div>
             <div class="mb-3">
              <div style="display:inline-table" class="contract">
                {{$t('contractCat')}}
              </div>
              <div style="display:inline-table" class="contract-categories v-badge">
                <span class="font-weight-bold contract">
                  {{contract.categoryName}}
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('pricePerMonth')}}
              </div>
              <div style="display:inline-table" class="contract-price v-badge">
                <span class="font-weight-bold contract">
                  {{contract.pricePerPeriod}} &euro;
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('contractObjectives')}}
              </div>
              <div style="display:inline-table" class="contract-objectives v-badge">
                <span class="font-weight-bold contract">
                  {{contract.objectives}}
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('futuresObjectives')}}
              </div>
              <div style="display:inline-table" class="contract-futureObjectives v-badge">
                <span class="font-weight-bold contract">
                  {{contract.futureobjectives}}
                </span>
              </div>
             </div>
             <div class="mb-3">
              <div style="display:inline-table" class="v-badge contract">
                {{$t('misc')}}
              </div>
              <div class="contract-other v-badge">
                <span class="font-weight-bold contract">
                  {{contract.other}}
                </span>
              </div>
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
        }">{{$t('edit')}}</v-btn>
        <v-btn class="blue" dark @click="delete_contract">{{$t('delete')}}</v-btn>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel :title="$t('partnerDetails') + contract.companyName" class="ml-2">
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
                {{firstLetterUC(contract.companyName)}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold" v-if="contract.partnerName">
                {{firstLetterUC(contract.partnerName)}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{contract.address}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{contract.branch}}
              </span>
            </div>
            <div class="mb-3">
              <span class="font-weight-bold">
                {{contract.phone}}
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
        }">{{$t('edit')}}</v-btn>
      </panel>
      <!-- File Upload panel -->
      <panel :title="$t('detailFiles')" class="ml-2 mt-2">
        <v-layout justify-start row fill-height>
          <v-flex xs8 ma-2 text-xs-left ma-3 subheading>
            <div v-if="files">
              <div class="mt-2 downloadField" v-for="file in files" :key="file.filename">
                <p>{{$t('detailFiles')}}: {{file.originalname}}</p>
                <p>{{$t('detailType')}}: {{file.mimetype}}</p>
                <v-btn class="green" dark :href="'http://S190018:3001/' + file.path">
                  DOWNLOAD
                </v-btn>
                <hr class="mt-2">
              </div>
            </div>
            <!--UPLOAD-->
            <div class="mt-2">
              <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                <h1>{{$t('detailFiles')}} {{$t('detailUpload')}} </h1>
                <div class="dropbox">
                  <input type="file" multiple name="documents" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                    accept="image/*" class="input-file">
                    <p v-if="isInitial">
                      {{$t('detailUploadDescription1')}}<br> {{$t('detailUploadDescription2')}}
                    </p>
                    <p v-if="isSaving">
                      {{$t('detailUploading1')}} {{ fileCount }} {{$t('detailUploading2')}}
                    </p>
                </div>
              </form>
            </div>
          </v-flex>
        </v-layout>
         <!--SUCCESS-->
        <div v-if="isSuccess">
          <h2>{{$t('detailUploadSuccess1')}} {{ uploadedFiles.length }} {{$t('detailUploadSuccess2')}}</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">{{$t('detailRetryUpload')}}</a>
          </p>
          <ul class="list-unstyled">
            <li v-for="item in uploadedFiles" :key="item.url">
              <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
            </li>
          </ul>
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
          <h2>{{$t('detailUploadFailed')}}</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">{{$t('detailRetryUpload')}}</a>
          </p>
          <pre>{{ uploadError }}</pre>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import ContractsService from '../../services/ContractsService'
import PartnerService from '../../services/PartnerService'
import CompanyService from '../../services/CompanyService'
import FileUploadService from '../../services/FileUploadService';
import utilityMixins from '../../mixins/Main'

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
  mixins: [utilityMixins],
  data () {
    return {
      contract: {},
      files: {},
      partner: {},
      company: {},
      companyArr: [],
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'documents',
      success: null,
      error: null,
    }
  },
  async mounted () {
    // reset document form
    this.reset()
    // get contract id to get contract data
    const contractId = this.$store.state.route.params.contractId
    try {
      let data = (await ContractsService.show(contractId)).data
      this.contract = data.contract[0]
      this.files = data.files
      console.log(this.contract)
      } catch (error) {
      console.log(error)
    }

    // find partner
    // try {
    //   this.partner = (await PartnerService.show(this.contract.partnerId)).data
    // } catch (e) {
    //   console.log(e)
    // }

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
      let confirmation = confirm(`Wollen Sie Vertrag ${this.contract.number} entfernen?`)
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
    },
    /**
     * Reset form to initial state
     */
    reset() {
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    /**
     * Upload data to server
     */
    save(formData) {
      this.currentStatus = STATUS_SAVING

      FileUploadService.save(formData, this.contract.id)
      .then(data => {
        console.log(data)
        this.uploadedFiles = [].concat(data)
        this.currentStatus = STATUS_SUCCESS
      })
      .catch(err => {
        this.uploadError = err.response
        this.currentStatus = STATUS_FAILED
      })
    },
    /**
     * Check for new files
     */
    filesChange(fieldName, fileList) {
      const formData = new FormData()

      if (!fileList.length) return

      // append files to formdata and save
      Array
      .from(Array(fileList.length).keys())
      .map(data => {
        formData.append(fieldName, fileList[data], fileList[data].name)
      })

      this.save(formData)
    }
  },
  /**
   * File Upload status
   */
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
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
.dropbox {
  outline: 2px dashed gray;
  outline-offset: -10px;
  color: dimgray;
  padding: 10px 10px;
  min-height: 125px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 125px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: lightblue;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
