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
  },
  put(partner) {
    return Api().put(`partner/${partnerId}/edit`, partner)
  },
  delete(partner) {
    return Api().delete(`partner/${partnerId}/edit`, partner)
  }
}