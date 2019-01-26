import Api from './Api'

export default {
  get () {
    return Api().get('partner')
  },
  show(partnerId) {
    return Api().get(`partner/${partnerId}`);
  },
  post (partner) {
    return Api().post('partner', partner)
  }
}