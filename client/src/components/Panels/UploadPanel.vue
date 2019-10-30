<template>
<v-layout>
  <v-layout justify-start row fill-height>
    <v-flex xs8 ma-2 text-xs-left ma-3 subheading>
      <div v-if="files">
        <div class="mt-2 downloadField" v-for="file in files" :key="file.filename">
          <p>{{$t('detailFiles')}}: {{file.originalname}}</p>
          <p>{{$t('detailType')}}: {{file.mimetype}}</p>
          <v-btn class="green" dark :href="'http://localhost:3001/' + file.path">
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
                {{$t('detailUploadDescription1')}} {{$t('detailUploadDescription2')}}
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
</v-layout>
</template>
<script>
export default {
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
      createdBy: this.$store.state.user.name
    }
  },
  async mounted () {
    // console.log(JSON.stringify(this.$store.state))
    this.createdBy = JSON.parse(this.$store.state.user).id

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

      FileUploadService.save(formData, this.contract.id, this.createdBy)
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

      console.log(this.createdBy)

      if (!fileList.length) return

      // append files to formdata and save
      Array
      .from(Array(fileList.length).keys())
      .map(data => {
        formData.append(fieldName, fileList[data], fileList[data].name)
      })

      console.log(formData)

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