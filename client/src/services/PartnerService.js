import Api from './Api'

export default {
  get () {
    return Api().get('partner')
  },
  getOne(partnerId) {
    return Api().get(`partner/${partnerId}`)
  },
  post (partner) {
    return Api().post('partner', partner)
  }
}