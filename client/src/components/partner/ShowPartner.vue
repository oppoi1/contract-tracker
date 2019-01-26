<template>
  
</template>
<script>
import PartnerService from '../services/PartnerService'
export default {
  data() {
    return {
      partner: [],
      prtnrArr: []
    }
  },
  async mounted() {
    const partnerId = this.$store.state.route.params.partnerId
    
    try {
      this.partner = (await PartnerService.getOne()).data
      for(var i = 0; i < this.partner.length;i++) {
        if(this.partner[i].company === this.contract) {
          // logical mistake 
        }
      }
    } catch (error) {
      
    }
  }
}
</script>
<style scoped>

</style>

